import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";
import { compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Security-Policy': "default-src 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

interface LoginRequest {
  username: string;
  password: string;
}

// Rate limiting - simple in-memory store (use Redis in production)
const loginAttempts = new Map<string, { count: number; resetTime: number }>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const key = ip;
  
  if (!loginAttempts.has(key)) {
    loginAttempts.set(key, { count: 1, resetTime: now + 15 * 60 * 1000 }); // 15 minutes
    return false;
  }
  
  const attempt = loginAttempts.get(key)!;
  
  if (now > attempt.resetTime) {
    loginAttempts.set(key, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return false;
  }
  
  if (attempt.count >= 10) { // Max 10 attempts per 15 minutes
    return true;
  }
  
  attempt.count++;
  return false;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Too many login attempts. Try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { username, password }: LoginRequest = await req.json();

    // Input validation and sanitization
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid input format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize username
    const sanitizedUsername = username.trim().slice(0, 50);

    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, error: 'Username and password are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get admin user by username
    const { data: adminUser, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', sanitizedUsername)
      .single();

    if (userError || !adminUser) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid credentials' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if account is locked
    if (adminUser.locked_until && new Date(adminUser.locked_until) > new Date()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Account temporarily locked. Try again later.' }),
        { status: 423, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify password with bcrypt
    const isValidPassword = await compare(password, adminUser.password_hash);

    if (!isValidPassword) {
      // Increment failed attempts
      const failedAttempts = (adminUser.failed_attempts || 0) + 1;
      const lockUntil = failedAttempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;

      await supabase
        .from('admin_users')
        .update({ 
          failed_attempts: failedAttempts,
          locked_until: lockUntil?.toISOString() || null
        })
        .eq('id', adminUser.id);

      return new Response(
        JSON.stringify({ success: false, error: 'Invalid credentials' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Successful login - reset failed attempts and update last login
    await supabase
      .from('admin_users')
      .update({ 
        failed_attempts: 0,
        locked_until: null,
        last_login: new Date().toISOString()
      })
      .eq('id', adminUser.id);

    // Create a secure admin session using Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: `admin-${adminUser.id}@admin.local`,
      password: 'temp-password-' + crypto.randomUUID(),
      email_confirm: true,
      user_metadata: {
        admin_id: adminUser.id,
        username: adminUser.username,
        role: 'admin'
      }
    });

    if (authError) {
      return new Response(
        JSON.stringify({ success: false, error: 'Authentication failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert role into user_roles table for server-side validation
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({ user_id: authData.user.id, role: 'admin' });

    if (roleError) {
      // Continue anyway - the auth user was created
    }

    // Generate session token
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: `admin-${adminUser.id}@admin.local`,
    });

    if (sessionError) {
      return new Response(
        JSON.stringify({ success: false, error: 'Session creation failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        session: sessionData,
        user: {
          id: adminUser.id,
          username: adminUser.username
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);