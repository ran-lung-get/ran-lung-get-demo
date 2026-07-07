import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vshamisexmjcymsdyhym.supabase.co/';
const supabaseKey = 'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03';
const supabase = createClient(supabaseUrl, supabaseKey);

async function listTriggers() {
  console.log("Listing all database triggers...");
  
  // We can query the pg_trigger and pg_class system tables to find triggers
  const { data, error } = await supabase.rpc('list_all_triggers_debug'); 
  
  if (error) {
    // If RPC doesn't exist, let's try to query via custom sql using raw sql, but we don't have direct SQL.
    // Let's write a query to information_schema.triggers or try to list triggers using select on a system view.
    console.log("RPC list_all_triggers_debug failed, trying direct select on pg_trigger...");
    
    const { data: trigData, error: trigErr } = await supabase
      .from('pg_trigger')
      .select('*')
      .limit(10); // this usually fails because pg_trigger is not exposed via PostgREST by default.
      
    if (trigErr) {
      console.error("Direct query failed:", trigErr.message);
    } else {
      console.log("Triggers:", trigData);
    }
  } else {
    console.log("Triggers from RPC:", data);
  }
}

listTriggers();
