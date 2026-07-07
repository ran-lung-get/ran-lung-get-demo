import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vshamisexmjcymsdyhym.supabase.co/';
const supabaseKey = 'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixRoles() {
  console.log("Fixing user roles for testing accounts...");

  // 1. Set testadmin@example.com to customer
  const { error: err1 } = await supabase
    .from('users')
    .update({ role: 'customer' })
    .eq('email', 'testadmin@example.com');
  if (err1) console.error("Error setting testadmin to customer:", err1.message);
  else console.log("Successfully set testadmin@example.com to customer");

  // 2. Set staff_test@example.com to staff
  const { error: err2 } = await supabase
    .from('users')
    .update({ role: 'staff' })
    .eq('email', 'staff_test@example.com');
  if (err2) console.error("Error setting staff_test to staff:", err2.message);
  else console.log("Successfully set staff_test@example.com to staff");

  // 3. Make sure testadmin123@example.com is admin
  const { error: err3 } = await supabase
    .from('users')
    .update({ role: 'admin' })
    .eq('email', 'testadmin123@example.com');
  if (err3) console.error("Error setting testadmin123 to admin:", err3.message);
  else console.log("Successfully set testadmin123@example.com to admin");
}

fixRoles();
