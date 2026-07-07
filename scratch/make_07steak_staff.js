import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vshamisexmjcymsdyhym.supabase.co/';
const supabaseKey = 'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03';
const supabase = createClient(supabaseUrl, supabaseKey);

async function makeStaff() {
  const email = '07steakgamebro@gmail.com';
  console.log(`Updating role of ${email} to 'staff'...`);

  const { data, error } = await supabase
    .from('users')
    .update({ role: 'staff' })
    .eq('email', email);

  if (error) {
    console.error(`Error updating role:`, error.message);
  } else {
    console.log(`Successfully updated all accounts of ${email} to 'staff'!`);
  }
}

makeStaff();
