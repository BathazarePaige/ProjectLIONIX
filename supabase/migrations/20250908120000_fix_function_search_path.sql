/*
# [SECURITY] Set Function Search Path
This migration hardens the security of the `handle_new_user` function by explicitly setting its `search_path`. This prevents potential hijacking attacks by ensuring the function resolves objects from trusted schemas only.

## Query Description: This operation modifies the configuration of an existing database function to improve security. It does not alter data or table structures. It is a safe, non-destructive change.

## Metadata:
- Schema-Category: ["Safe", "Security"]
- Impact-Level: ["Low"]
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Function: public.handle_new_user()

## Security Implications:
- RLS Status: Unchanged
- Policy Changes: No
- Auth Requirements: None
- Mitigates: Search path hijacking vulnerability.

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Negligible.
*/
ALTER FUNCTION public.handle_new_user() SET search_path = public;
