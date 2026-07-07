-- Migration: Add Walk-in Tables to restaurant_tables
-- Inserts Table 9 and Table 10 marked for Walk-in only service

INSERT INTO public.restaurant_tables (id, label, status, capacity)
VALUES 
  ('9', 'โต๊ะ 9 (Walk-in)', 'available', 4),
  ('10', 'โต๊ะ 10 (Walk-in)', 'available', 4)
ON CONFLICT (id) DO NOTHING;
