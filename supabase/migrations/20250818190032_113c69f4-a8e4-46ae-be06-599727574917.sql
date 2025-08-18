-- Create storage bucket for KYC documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('kyc-documents', 'kyc-documents', false);

-- Add KYC document columns to gift_registrations table
ALTER TABLE public.gift_registrations 
ADD COLUMN id_document_url TEXT,
ADD COLUMN id_document_type TEXT,
ADD COLUMN kyc_status TEXT DEFAULT 'pending',
ADD COLUMN kyc_reviewed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN kyc_reviewed_by UUID;

-- Create storage policies for KYC documents
CREATE POLICY "Users can upload their own KYC documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'kyc-documents' AND 
  (storage.foldername(name))[1] = auth.jwt() ->> 'sub'
);

CREATE POLICY "Users can view their own KYC documents" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'kyc-documents' AND 
  (storage.foldername(name))[1] = auth.jwt() ->> 'sub'
);

CREATE POLICY "Admins can view all KYC documents" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'kyc-documents' AND 
  public.is_authenticated_admin()
);

CREATE POLICY "Admins can delete KYC documents" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'kyc-documents' AND 
  public.is_authenticated_admin()
);