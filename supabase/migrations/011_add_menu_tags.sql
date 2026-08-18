-- 011_add_menu_tags.sql
-- เพิ่มคอลัมน์ tags สำหรับเมนูอาหารในตาราง menu_items

ALTER TABLE public.menu_items
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

COMMENT ON COLUMN public.menu_items.tags IS 'แท็กของเมนูอาหาร เช่น ["signature", "เผ็ด", "หมูกรอบ", "ขายดี"]';
