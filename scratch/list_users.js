import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vshamisexmjcymsdyhym.supabase.co/';
const supabaseKey = 'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03';
const supabase = createClient(supabaseUrl, supabaseKey);

async function listUsers() {
  console.log("Listing all users from database...");
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    console.error("Error fetching users:", error.message);
  } else {
    console.log("Users in database:");
    console.log(JSON.stringify(data, null, 2));
  }
}

listUsers();
