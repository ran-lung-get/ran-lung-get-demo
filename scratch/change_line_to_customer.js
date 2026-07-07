import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vshamisexmjcymsdyhym.supabase.co/';
const supabaseKey = 'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03';
const supabase = createClient(supabaseUrl, supabaseKey);

async function changeLineRole() {
  const lineUserId = 'Ud67e2bc3796265c351506b57a31f8477';
  console.log(`Changing role of LINE user ${lineUserId} to 'customer'...`);

  const { data, error } = await supabase
    .from('users')
    .update({ role: 'customer' })
    .eq('line_user_id', lineUserId);

  if (error) {
    console.error(`Error updating:`, error.message);
  } else {
    console.log(`Successfully changed LINE user ${lineUserId} to customer!`);
  }
}

changeLineRole();
