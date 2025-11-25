-- Reset admin password to 031095Ar
-- Enable pgcrypto extension for bcrypt hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Update admin user password and reset failed attempts
UPDATE admin_users
SET 
  password_hash = crypt('031095Ar', gen_salt('bf')),
  failed_attempts = 0,
  locked_until = NULL
WHERE username = 'admin';