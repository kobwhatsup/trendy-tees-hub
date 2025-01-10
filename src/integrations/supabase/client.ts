import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gfraqpwyfxmpzdllsfoc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmcmFxcHd5ZnhtcHpkbGxzZm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5NjE2NDIsImV4cCI6MjA1MTUzNzY0Mn0.he55rOGk4qiPrVPxEFsfvE2c6gYd-HPwTxMMfTB2WJU";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage,
      storageKey: 'sb-gfraqpwyfxmpzdllsfoc-auth-token',
    }
  }
);