import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vshamisexmjcymsdyhym.supabase.co/';
const supabaseKey = 'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03';
const supabase = createClient(supabaseUrl, supabaseKey);

async function makeCustomer() {
  const email = '07steakgamebro@gmail.com';
  console.log(`Changing role of ${email} to 'customer'...`);

  const { data, error } = await supabase
    .from('users')
    .update({ role: 'customer' })
    .eq('email', email);

  if (error) {
    console.error(`Error updating ${email}:`, error.message);
  } else {
    console.log(`Successfully changed ${email} to customer!`);
  }
}

makeCustomer();
