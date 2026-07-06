import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vshamisexmjcymsdyhym.supabase.co/';
const supabaseKey = 'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding Table 9 & 10 into restaurant_tables...");
  
  const tables = [
    { id: '9', label: 'โต๊ะ 9 (Walk-in)', status: 'available', capacity: 4 },
    { id: '10', label: 'โต๊ะ 10 (Walk-in)', status: 'available', capacity: 4 }
  ];

  for (const table of tables) {
    const { data, error } = await supabase
      .from('restaurant_tables')
      .upsert(table, { onConflict: 'id' });
      
    if (error) {
      console.error(`Error seeding table ${table.id}:`, error.message);
    } else {
      console.log(`Successfully seeded table ${table.id}`);
    }
  }
}

seed();
