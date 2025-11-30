import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
}

const requestSchema = z.object({
  token: z.string().uuid(),
  fileName: z.string().max(100),
  fileData: z.string(), // base64 encoded
  fileType: z.string().regex(/^(image\/(jpeg|jpg|png)|application\/pdf)$/i)
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({
        success: false,
        message: "יותר מדי ניסיונות. אנא נסה שוב מאוחר יותר"
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const rawData = await req.json();
    
    // Validate input
    const validationResult = requestSchema.safeParse(rawData);
    if (!validationResult.success) {
      return new Response(JSON.stringify({
        success: false,
        message: "נתונים לא תקינים"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const { token, fileName, fileData, fileType } = validationResult.data;

    // Verify the gift registration exists and is not already completed
    const { data: giftRegistration, error: regError } = await supabase
      .from('gift_registrations')
      .select('id, registration_status')
      .eq('token', token)
      .single();

    if (regError || !giftRegistration) {
      return new Response(JSON.stringify({
        success: false,
        message: "מתנה לא נמצאה"
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (giftRegistration.registration_status === 'completed') {
      return new Response(JSON.stringify({
        success: false,
        message: "המתנה כבר נרשמה"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Decode base64 file data
    const decoder = new TextDecoder();
    const fileBuffer = Uint8Array.from(atob(fileData), c => c.charCodeAt(0));
    
    // Validate file size (max 5MB)
    if (fileBuffer.length > 5 * 1024 * 1024) {
      return new Response(JSON.stringify({
        success: false,
        message: "הקובץ גדול מדי. מקסימום 5MB"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Generate unique file name with token prefix for isolation
    const timestamp = Date.now();
    const fileExtension = fileName.split('.').pop();
    const storagePath = `${token}/${timestamp}.${fileExtension}`;

    // Upload to storage using service role
    const { error: uploadError } = await supabase.storage
      .from('kyc-documents')
      .upload(storagePath, fileBuffer, {
        contentType: fileType,
        upsert: false
      });

    if (uploadError) {
      return new Response(JSON.stringify({
        success: false,
        message: "שגיאה בהעלאת הקובץ"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Update gift registration with document info
    const { error: updateError } = await supabase
      .from('gift_registrations')
      .update({
        id_document_url: storagePath,
        id_document_type: fileType
      })
      .eq('id', giftRegistration.id);

    if (updateError) {
      // Try to clean up the uploaded file
      await supabase.storage.from('kyc-documents').remove([storagePath]);
      
      return new Response(JSON.stringify({
        success: false,
        message: "שגיאה בעדכון הרישום"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: "הקובץ הועלה בהצלחה",
      documentPath: storagePath
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      message: "שגיאת שרת"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);
