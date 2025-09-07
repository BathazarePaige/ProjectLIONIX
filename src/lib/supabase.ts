import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour TypeScript
export interface UserProfile {
  id: string;
  username: string;
  phone_number: string;
  phone_country_code: string;
  country_of_residence: string;
  sport_discipline: string;
  created_at: string;
  updated_at: string;
}

export interface SignUpData {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
  phoneCountryCode: string;
  countryOfResidence: string;
  sportDiscipline: string;
}
