import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vshamisexmjcymsdyhym.supabase.co/';
const supabaseKey = 'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSignup() {
  const email = 'testcustomer' + Math.floor(Math.random() * 1000) + '@example.com';
  const password = 'password123';
  const role = 'customer';

  console.log(`Registering new user ${email} with role '${role}'...`);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: 'Test Customer',
        display_name: 'Test Customer',
        role,
      },
    },
  });

  if (error) {
    console.error("SignUp error:", error.message);
    return;
  }

  console.log("SignUp successful! User ID:", data.user?.id);

  // Wait a moment for auth state change to sync
  await new Promise(r => setTimeout(r, 2000));

  // Query database to see what role was created
  const { data: dbUser, error: dbError } = await supabase
    .from('users')
    .select('*')
    .eq('auth_user_id', data.user?.id)
    .maybeSingle();

  if (dbError) {
    console.error("Fetch DB user error:", dbError.message);
  } else if (!dbUser) {
    console.log("User row not found in public.users yet.");
  } else {
    console.log("DB User Row:", JSON.stringify(dbUser, null, 2));
  }
}

testSignup();
