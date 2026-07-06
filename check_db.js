import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vshamisexmjcymsdyhym.supabase.co/';
const supabaseKey = 'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03';
const supabase = createClient(supabaseUrl, supabaseKey);

async function simulateCustomerOrder() {
  console.log("Simulating Table 3 order placement...");

  // 1. Mark Table 3 as occupied
  console.log("1. Setting Table 3 status to occupied...");
  const { error: tableError } = await supabase
    .from('restaurant_tables')
    .update({ status: 'occupied' })
    .eq('id', '3');

  if (tableError) {
    console.error("Table update failed:", tableError.message);
    return;
  }
  console.log("Table update success!");

  // 2. Insert order
  console.log("2. Inserting order for Table 3...");
  const orderId = 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d'; // Valid UUID format
  
  // Clean up existing if any
  await supabase.from('orders').delete().eq('id', orderId);

  const { error: orderError } = await supabase
    .from('orders')
    .insert({
      id: orderId,
      order_number: '#AK-SIM333',
      user_id: '4c228cea-510c-4bad-8f1a-32215209ac9d',
      customer_id: '7662a0ad-c2b8-4c0a-8aa9-872a9d5d12bb',
      order_type: 'dine-in',
      status: 'pending',
      subtotal: 120,
      total: 120,
      table_number: 'โต๊ะ 3',
      created_at: new Date().toISOString()
    });

  if (orderError) {
    console.error("Order insert failed:", orderError.message);
    return;
  }
  console.log("Order insert success!");

  // 3. Insert order items
  console.log("3. Inserting order items...");
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert([
      {
        order_id: orderId,
        item_id: 'pad_thai',
        name: 'ผัดไทยกุ้งสด (Simulated)',
        unit_price: 120,
        quantity: 1,
        line_total: 120,
        created_at: new Date().toISOString()
      }
    ]);

  if (itemsError) {
    console.error("Items insert failed:", itemsError.message);
    return;
  }
  console.log("Items insert success! Simulation complete.");
}

simulateCustomerOrder();
