import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vshamisexmjcymsdyhym.supabase.co/';
const supabaseKey = 'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log("Checking users table schema...");
  
  const dummyAuthId = '00000000-0000-0000-0000-' + Math.floor(100000000000 + Math.random() * 900000000000);
  console.log(`Inserting dummy user with auth_user_id: ${dummyAuthId}`);
  
  const { data: inserted, error: insertErr } = await supabase
    .from('users')
    .insert({
      auth_user_id: dummyAuthId,
      display_name: 'Dummy Test User',
      is_active: true
    })
    .select();

  if (insertErr) {
    console.error("Insert error:", insertErr.message);
  } else {
    console.log("Inserted user role default:", inserted[0]?.role);
    
    // Clean up
    await supabase.from('users').delete().eq('auth_user_id', dummyAuthId);
  }
}

checkSchema();
