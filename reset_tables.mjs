import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vshamisexmjcymsdyhym.supabase.co',
  'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03'
);

async function run() {
  const { data, error } = await supabase
    .from('tables')
    .update({ status: 'available' })
    .neq('status', 'available');
    
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('All occupied tables have been set to available.');
  }
}

run();
