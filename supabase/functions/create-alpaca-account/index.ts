import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const userDataSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(9).max(15),
  address: z.string().min(2).max(300),
  city: z.string().min(2).max(100),
  postalCode: z.string().min(2).max(10),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  taxId: z.string().regex(/^\d{9}$/),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userData } = await req.json();
    const validated = userDataSchema.parse(userData);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Store onboarding record
    const { data, error: dbError } = await supabase
      .from('alpaca_onboarding')
      .insert({
        first_name: validated.firstName,
        last_name: validated.lastName,
        email: validated.email,
        tax_id: validated.taxId,
        street_address: validated.address,
        city: validated.city,
        postal_code: validated.postalCode,
        date_of_birth: validated.dob,
        status: 'PENDING',
      })
      .select()
      .single();

    if (dbError) {
      console.error('DB error:', dbError);
      throw new Error('Failed to create account record');
    }

    // TODO: Call Alpaca API here when ready
    // For now, just store the record and return success

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Account created successfully',
        accountId: data.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    const message = error instanceof z.ZodError 
      ? 'Invalid input data: ' + error.errors.map(e => e.message).join(', ')
      : error.message || 'Internal server error';
    
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
