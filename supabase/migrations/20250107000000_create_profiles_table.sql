/*
# Création de la table des profils d'athlètes
Cette migration crée la table profiles pour stocker les informations des athlètes inscrits sur la plateforme Lionix.

## Query Description: 
Cette opération crée une nouvelle table pour les profils utilisateurs et configure les politiques de sécurité. Aucune donnée existante ne sera affectée car il s'agit d'une nouvelle table. Cette migration est sûre et réversible.

## Metadata:
- Schema-Category: "Safe"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: profiles
- Colonnes: id (UUID), username, phone_number, phone_country_code, country_of_residence, sport_discipline, created_at, updated_at
- Contraintes: Foreign key vers auth.users.id, username unique

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes
- Auth Requirements: Les utilisateurs peuvent lire/modifier leur propre profil

## Performance Impact:
- Indexes: Ajout d'index sur username pour les recherches
- Triggers: Ajout de trigger pour updated_at automatique
- Estimated Impact: Impact minimal, nouvelle table sans données
*/

-- Création de la table profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    phone_number TEXT NOT NULL,
    phone_country_code TEXT NOT NULL DEFAULT '+33',
    country_of_residence TEXT NOT NULL DEFAULT 'FR',
    sport_discipline TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Contraintes
    CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 50),
    CONSTRAINT phone_number_not_empty CHECK (char_length(phone_number) > 0),
    CONSTRAINT sport_discipline_not_empty CHECK (char_length(sport_discipline) > 0)
);

-- Index pour améliorer les performances de recherche
CREATE INDEX IF NOT EXISTS profiles_username_idx ON public.profiles(username);
CREATE INDEX IF NOT EXISTS profiles_sport_discipline_idx ON public.profiles(sport_discipline);
CREATE INDEX IF NOT EXISTS profiles_country_idx ON public.profiles(country_of_residence);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at automatique
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Activation des Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Politique : Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Politique : Les utilisateurs peuvent insérer leur propre profil
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Politique : Les utilisateurs peuvent modifier leur propre profil
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Politique : Les utilisateurs peuvent supprimer leur propre profil
CREATE POLICY "Users can delete own profile" ON public.profiles
    FOR DELETE USING (auth.uid() = id);

-- Vue publique pour les profils (sans informations sensibles)
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
    id,
    username,
    country_of_residence,
    sport_discipline,
    created_at
FROM public.profiles;

-- RLS sur la vue publique
ALTER VIEW public.public_profiles SET (security_invoker = true);

-- Fonction pour obtenir le profil utilisateur actuel
CREATE OR REPLACE FUNCTION public.get_current_user_profile()
RETURNS TABLE (
    id UUID,
    username TEXT,
    phone_number TEXT,
    phone_country_code TEXT,
    country_of_residence TEXT,
    sport_discipline TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) 
LANGUAGE sql SECURITY DEFINER
AS $$
    SELECT 
        p.id,
        p.username,
        p.phone_number,
        p.phone_country_code,
        p.country_of_residence,
        p.sport_discipline,
        p.created_at,
        p.updated_at
    FROM public.profiles p
    WHERE p.id = auth.uid();
$$;

-- Commentaires sur la table et les colonnes
COMMENT ON TABLE public.profiles IS 'Profils des athlètes inscrits sur la plateforme Lionix';
COMMENT ON COLUMN public.profiles.id IS 'Identifiant unique, référence vers auth.users.id';
COMMENT ON COLUMN public.profiles.username IS 'Nom d''utilisateur unique de l''athlète';
COMMENT ON COLUMN public.profiles.phone_number IS 'Numéro de téléphone de l''athlète';
COMMENT ON COLUMN public.profiles.phone_country_code IS 'Code pays du numéro de téléphone';
COMMENT ON COLUMN public.profiles.country_of_residence IS 'Code pays de résidence (ISO 3166-1 alpha-2)';
COMMENT ON COLUMN public.profiles.sport_discipline IS 'Discipline sportive principale de l''athlète';
