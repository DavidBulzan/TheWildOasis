import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lqvaodmjpdemtoxptkti.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdmFvZG1qcGRlbXRveHB0a3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NTA2MzcsImV4cCI6MjA0NDEyNjYzN30.LwdfkO5IRUjMMlBYTSSOMTVtexr2bZt-zc8YtUlEgDw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
