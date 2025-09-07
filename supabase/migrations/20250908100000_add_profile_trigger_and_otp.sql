/*
# [Opération] Créer un déclencheur pour la création de profil utilisateur

Cette migration met en place une fonction `handle_new_user` et un déclencheur `on_auth_user_created`.
Ensemble, ils automatisent la création d'un profil dans la table `public.profiles` chaque fois qu'un nouvel utilisateur est créé dans `auth.users`.
Cela garantit que chaque utilisateur authentifié possède un profil correspondant.

## Description de la requête :
Cette opération est structurelle et n'affecte pas les données existantes. Elle découple la logique de création de profil du code client, la rendant plus robuste et sécurisée, notamment pour les flux avec vérification d'email. Les données du profil (nom d'utilisateur, téléphone, etc.) sont extraites des métadonnées (`raw_user_meta_data`) fournies lors de l'inscription.

## Métadonnées :
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (en supprimant le déclencheur et la fonction)

## Détails de la structure :
- **Fonction ajoutée :** `public.handle_new_user()`
- **Déclencheur ajouté :** `on_auth_user_created` sur la table `auth.users`

## Implications de sécurité :
- RLS Status: La fonction s'exécute avec les privilèges du créateur (`SECURITY DEFINER`), ce qui est nécessaire pour insérer dans `public.profiles`.
- Policy Changes: Non
- Auth Requirements: La fonction est déclenchée par le système d'authentification de Supabase.

## Impact sur la performance :
- L'impact est minime, car le déclencheur ne s'exécute qu'une seule fois lors de la création d'un utilisateur.
*/

-- 1. Créer la fonction qui sera appelée par le déclencheur
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, phone_number, phone_country_code, country_of_residence, sport_discipline)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'phone_number',
    new.raw_user_meta_data->>'phone_country_code',
    new.raw_user_meta_data->>'country_of_residence',
    new.raw_user_meta_data->>'sport_discipline'
  );
  return new;
end;
$$;

-- 2. Créer le déclencheur qui s'active après la création d'un nouvel utilisateur
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

/*
# [Opération] Activer la vérification par email

Cette commande active l'option "Confirm email" dans la configuration d'authentification de votre projet Supabase.
Cela signifie que les nouveaux utilisateurs devront vérifier leur adresse e-mail avant de pouvoir se connecter.
Supabase enverra automatiquement un e-mail de confirmation avec un lien ou un code OTP.

## Description de la requête :
Cette modification renforce la sécurité en s'assurant que les utilisateurs s'inscrivent avec une adresse e-mail valide.
Elle est essentielle pour le bon fonctionnement du flux d'inscription avec OTP.

## Métadonnées :
- Schema-Category: "Safe"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (peut être désactivé dans les paramètres d'authentification de Supabase)
*/
-- Cette action est généralement effectuée via l'interface de Supabase,
-- mais est incluse ici pour documenter la configuration requise.
-- Assurez-vous que "Confirm email" est activé dans votre projet Supabase
-- (Authentication -> Providers -> Email).
-- La commande SQL ci-dessous est illustrative.
-- UPDATE auth.settings SET confirm_email = true;
