import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vshamisexmjcymsdyhym.supabase.co/';
const supabaseKey = 'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03';
const supabase = createClient(supabaseUrl, supabaseKey);

async function makeAdmin() {
  console.log("Upgrading user roles to 'admin' for testing...");

  const emailsToUpgrade = [
    'staff_test@example.com',
    'testadmin@example.com',
    'admin7@gmail.com'
  ];

  for (const email of emailsToUpgrade) {
    const { data, error } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('email', email);

    if (error) {
      console.error(`Error upgrading ${email}:`, error.message);
    } else {
      console.log(`Successfully upgraded ${email} to admin`);
    }
  }
}

makeAdmin();
