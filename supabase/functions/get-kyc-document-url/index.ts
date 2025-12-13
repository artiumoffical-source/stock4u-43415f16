import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { giftId } = await req.json();

    if (!giftId) {
      return new Response(JSON.stringify({
        success: false,
        message: "Missing gift ID"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log(`[GET_KYC_DOC] Fetching document for gift: ${giftId}`);

    // Get the gift registration
    const { data: gift, error: giftError } = await supabase
      .from('gift_registrations')
      .select('id_document_url')
      .eq('id', giftId)
      .single();

    if (giftError || !gift) {
      console.log(`[NOT_FOUND] Gift: ${giftId}`);
      return new Response(JSON.stringify({
        success: false,
        message: "Gift not found"
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!gift.id_document_url) {
      console.log(`[NO_DOCUMENT] Gift: ${giftId}`);
      return new Response(JSON.stringify({
        success: false,
        message: "No document uploaded"
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Generate signed URL (valid for 5 minutes)
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from('kyc-documents')
      .createSignedUrl(gift.id_document_url, 300);

    if (urlError || !signedUrl) {
      console.error(`[URL_ERROR] ${urlError?.message}`);
      return new Response(JSON.stringify({
        success: false,
        message: "Failed to generate document URL"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log(`[SUCCESS] Generated signed URL for gift: ${giftId}`);

    return new Response(JSON.stringify({
      success: true,
      url: signedUrl.signedUrl
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[SERVER_ERROR] ${errorMessage}`);
    return new Response(JSON.stringify({
      success: false,
      message: "Server error"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);