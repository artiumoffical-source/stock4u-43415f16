

## Diagnosis

Both `ClaimStockGift.tsx` (line 230) and `Login.tsx` (line 41) already use `window.location.origin` dynamically:

- **ClaimStockGift.tsx**: `` `${window.location.origin}/claim?giftId=${giftId}` ``
- **Login.tsx**: `` `${window.location.origin}/dashboard` ``

The code is correct. The `CONNECTION_REFUSED` / localhost redirect issue is caused by your **Supabase project's Site URL and Redirect URL settings**, not the application code.

## What You Need to Do (Supabase Dashboard)

Go to **Supabase Dashboard → Authentication → URL Configuration**:

1. **Site URL**: Set to `https://stock4u.lovable.app` (your published URL)
2. **Redirect URLs**: Add both:
   - `https://stock4u.lovable.app/**`
   - `https://id-preview--cbb5078a-3742-4a28-ae5f-8a9ae3faedab.lovable.app/**`

The wildcard `/**` allows any path on those domains. The preview URL is needed for testing before publishing.

## No Code Changes Needed

The codebase is already correctly using `window.location.origin`. Once you update the Supabase settings above, magic links will redirect to the correct URL.

