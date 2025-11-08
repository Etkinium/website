import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bjpbxujzsctzshxzigph.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqcGJ4dWp6c2N0enNoeHppZ3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTQyNzksImV4cCI6MjA3ODE5MDI3OX0.b755STR_23bcxINg3pMShMovb59EKRUGVFp8t0WIi3M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
