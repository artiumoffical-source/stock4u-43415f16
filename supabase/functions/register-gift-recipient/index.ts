import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RegistrationData {
  fullName: string;
  idNumber: string;
  address: string;
  phone: string;
  email: string;
}

interface RequestBody {
  token: string;
  registrationData: RegistrationData;
  documentFileName?: string;
  documentType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { token, registrationData, documentFileName, documentType }: RequestBody = await req.json();

    if (!token || !registrationData) {
      return new Response(JSON.stringify({
        success: false,
        message: "Token and registration data are required"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log('Processing registration for token:', token);

    // Find the gift registration
    const { data: giftRegistration, error: regError } = await supabase
      .from('gift_registrations')
      .select('*')
      .eq('token', token)
      .single();

    if (regError || !giftRegistration) {
      console.error('Error finding gift registration:', regError);
      return new Response(JSON.stringify({
        success: false,
        message: "מתנה לא נמצאה או שהקישור לא תקין"
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Check if already registered
    if (giftRegistration.registration_status === 'completed') {
      return new Response(JSON.stringify({
        success: false,
        message: "המתנה כבר נרשמה בעבר"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Prepare update data
    const updateData: any = {
      recipient_name: registrationData.fullName,
      recipient_email: registrationData.email,
      recipient_phone: registrationData.phone,
      id_number: registrationData.idNumber,
      address: registrationData.address,
      registration_status: 'completed',
      registered_at: new Date().toISOString()
    };

    // Add document information if provided
    if (documentFileName && documentType) {
      const documentUrl = `${token}/${Date.now()}.${documentFileName.split('.').pop()}`;
      updateData.id_document_url = documentUrl;
      updateData.id_document_type = documentType;
      updateData.kyc_status = 'submitted';
    }

    // Update the gift registration with the new data
    const { error: updateError } = await supabase
      .from('gift_registrations')
      .update(updateData)
      .eq('id', giftRegistration.id);

    if (updateError) {
      console.error('Error updating gift registration:', updateError);
      return new Response(JSON.stringify({
        success: false,
        message: "שגיאה בעדכון הרישום"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log('Gift registration completed successfully for token:', token);

    // Here you could send confirmation emails to admin, sender, and recipient
    // For now, we'll just return success

    return new Response(JSON.stringify({
      success: true,
      message: "הרישום הושלם בהצלחה"
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in register-gift-recipient function:', error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);