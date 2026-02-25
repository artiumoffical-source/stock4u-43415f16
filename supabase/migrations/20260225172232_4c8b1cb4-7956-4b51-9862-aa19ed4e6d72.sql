
INSERT INTO storage.buckets (id, name, public)
VALUES ('broker-documents', 'broker-documents', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Service role full access to broker-documents"
ON storage.objects FOR ALL
USING (bucket_id = 'broker-documents')
WITH CHECK (bucket_id = 'broker-documents');
