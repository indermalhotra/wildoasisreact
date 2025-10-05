
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lhvvzwwpcwspxfjbnesy.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxodnZ6d3dwY3dzcHhmamJuZXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNDc2ODAsImV4cCI6MjA3NDYyMzY4MH0._EPsIk6a0TR115R4AS0YNVyHD63yRM_o3fp2ocjsRM4"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
