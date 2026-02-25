DROP TRIGGER IF EXISTS "Stock4U_to_Make" ON gifts;

CREATE TRIGGER "Stock4U_to_Make"
AFTER INSERT OR UPDATE ON gifts
FOR EACH ROW
EXECUTE FUNCTION supabase_functions.http_request (
  'https://hook.eu1.make.com/nsheed80ifk5hsav9annhzmxfd4rfwm1',
  'POST',
  '{"Content-type":"application/json"}',
  '{}',
  '5000'
);