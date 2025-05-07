import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://martoqvmxvbdhxtvctpj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hcnRvcXZteHZiZGh4dHZjdHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDAwMzEsImV4cCI6MjA2MTUxNjAzMX0.DUvpVKj96bhFA6aK-r8zXcPdvoe8-0wMNNGePPGAD5k';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);