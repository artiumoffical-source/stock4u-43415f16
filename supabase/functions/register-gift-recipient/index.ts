import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
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

// Validation schemas
const israeliIdSchema = z.string().regex(/^\d{9}$/).refine((id) => {
  const digits = id.split('').map(Number);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let num = digits[i] * ((i % 2) + 1);
    sum += num > 9 ? num - 9 : num;
  }
  return sum % 10 === 0;
}, { message: 'Invalid Israeli ID number' });

const registrationSchema = z.object({
  fullName: z.string().min(1).max(100),
  idNumber: israeliIdSchema,
  phone: z.string().regex(/^05\d{8}$|^0[2-4,8-9]\d{7,8}$/),
  email: z.string().email().max(255),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  city: z.string().min(1).max(100),
  street: z.string().min(1).max(150),
  houseNumber: z.string().min(1).max(20),
  country: z.string().default('ישראל'),
  consentActingOwnBehalf: z.boolean().refine(val => val === true),
  consentInfoTrue: z.boolean().refine(val => val === true),
  consentTermsAccepted: z.boolean().refine(val => val === true)
});

const requestSchema = z.object({
  token: z.string().uuid(),
  registrationData: registrationSchema,
  documentFileName: z.string().max(100).optional(),
  documentType: z.string().max(50).optional()
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      console.log(`[RATE_LIMITED] IP: ${ip}`);
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
    console.log(`[REGISTER_KYC] Processing registration request`);
    
    // Validate input
    const validationResult = requestSchema.safeParse(rawData);
    if (!validationResult.success) {
      console.log(`[VALIDATION_ERROR] ${JSON.stringify(validationResult.error.errors)}`);
      return new Response(JSON.stringify({
        success: false,
        message: "נתונים לא תקינים. אנא בדוק את הפרטים ונסה שוב"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const { token, registrationData, documentFileName, documentType } = validationResult.data;

    // Find the gift registration
    const { data: giftRegistration, error: regError } = await supabase
      .from('gift_registrations')
      .select('*')
      .eq('token', token)
      .single();

    if (regError || !giftRegistration) {
      console.log(`[NOT_FOUND] Token: ${token}`);
      return new Response(JSON.stringify({
        success: false,
        message: "מתנה לא נמצאה או שהקישור לא תקין"
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Check if already registered
    if (giftRegistration.registration_status === 'approved' || giftRegistration.registration_status === 'completed') {
      console.log(`[ALREADY_REGISTERED] Token: ${token}, Status: ${giftRegistration.registration_status}`);
      return new Response(JSON.stringify({
        success: false,
        message: "המתנה כבר נרשמה בעבר"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Prepare update data with KYC POC fields
    const updateData: Record<string, unknown> = {
      recipient_name: registrationData.fullName,
      recipient_email: registrationData.email,
      recipient_phone: registrationData.phone,
      id_number: registrationData.idNumber,
      full_name_hebrew: registrationData.fullName,
      date_of_birth: registrationData.dateOfBirth,
      city: registrationData.city,
      street: registrationData.street,
      house_number: registrationData.houseNumber,
      country: registrationData.country,
      address: `${registrationData.street} ${registrationData.houseNumber}, ${registrationData.city}, ${registrationData.country}`,
      consent_acting_own_behalf: registrationData.consentActingOwnBehalf,
      consent_info_true: registrationData.consentInfoTrue,
      consent_terms_accepted: registrationData.consentTermsAccepted,
      registration_status: 'submitted',
      kyc_submitted_at: new Date().toISOString(),
      registered_at: new Date().toISOString()
    };

    // Set kyc_started_at if not already set
    if (!giftRegistration.kyc_started_at) {
      updateData.kyc_started_at = new Date().toISOString();
    }

    // Add document information if provided
    if (documentFileName && documentType) {
      const documentUrl = `${token}/${Date.now()}.${documentFileName.split('.').pop()}`;
      updateData.id_document_url = documentUrl;
      updateData.id_document_type = documentType;
      updateData.kyc_status = 'submitted';
    }

    console.log(`[UPDATE_KYC] Updating gift registration: ${giftRegistration.id}`);

    // Update the gift registration with the new data
    const { error: updateError } = await supabase
      .from('gift_registrations')
      .update(updateData)
      .eq('id', giftRegistration.id);

    if (updateError) {
      console.error(`[UPDATE_ERROR] ${updateError.message}`);
      return new Response(JSON.stringify({
        success: false,
        message: "שגיאה בעדכון הרישום"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log(`[SUCCESS] KYC registration completed for token: ${token}`);

    return new Response(JSON.stringify({
      success: true,
      message: "הרישום הושלם בהצלחה"
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[SERVER_ERROR] ${errorMessage}`);
    return new Response(JSON.stringify({
      success: false,
      message: "שגיאת שרת. אנא נסה שוב מאוחר יותר"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);