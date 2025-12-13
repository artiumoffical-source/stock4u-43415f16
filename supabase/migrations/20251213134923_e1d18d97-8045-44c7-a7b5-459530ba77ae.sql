-- Add KYC POC fields to gift_registrations table
ALTER TABLE public.gift_registrations 
ADD COLUMN IF NOT EXISTS full_name_hebrew TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS street TEXT,
ADD COLUMN IF NOT EXISTS house_number TEXT,
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'ישראל',
ADD COLUMN IF NOT EXISTS consent_acting_own_behalf BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS consent_info_true BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS consent_terms_accepted BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS kyc_started_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS kyc_submitted_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS kyc_rejection_reason TEXT;

-- Update registration_status to support new KYC statuses
-- Status flow: pending -> started_kyc -> submitted -> under_review -> approved/rejected