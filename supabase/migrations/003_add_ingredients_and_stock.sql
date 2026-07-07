-- ========================================================
-- ระบบจัดการสต็อกและสูตรอาหาร (Ingredients & Recipes)
-- วิธีใช้: คัดลอกไปรันใน Supabase SQL Editor
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. สร้างตารางวัตถุดิบ (Ingredients)
CREATE TABLE IF NOT EXISTS public.ingredients (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL UNIQUE,
  quantity        NUMERIC(10,2) NOT NULL DEFAULT 0, -- ปริมาณคงเหลือ (เช่น กรัม สำหรับเนื้อสัตว์ หรือชิ้น สำหรับไข่)
  unit            TEXT NOT NULL,              -- 'g' (กรัม), 'pcs' (ชิ้น/ฟอง), 'ml' (มิลลิลิตร)
  min_threshold   NUMERIC(10,2) NOT NULL DEFAULT 0, -- เกณฑ์แจ้งเตือนของใกล้หมด
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. สร้างตารางความสัมพันธ์สูตรอาหาร (Recipe Items)
CREATE TABLE IF NOT EXISTS public.recipe_items (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id        TEXT, -- เมนูหลัก เช่น 'm1', 'm2' (NULL ได้ถ้าเป็นสูตรสำหรับตัวเลือกทั่วไป)
  option_id           TEXT, -- รหัสตัวเลือก เช่น 'p_minced_pork', 't_fried_egg' (NULL ได้ถ้าเป็นสูตรสำหรับจานหลัก)
  ingredient_id       UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
  quantity_required   NUMERIC(10,2) NOT NULL, -- ปริมาณที่ต้องใช้ต่อหน่วย
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT check_recipe_target CHECK (
    (menu_item_id IS NOT NULL AND option_id IS NULL) OR 
    (menu_item_id IS NULL AND option_id IS NOT NULL) OR
    (menu_item_id IS NOT NULL AND option_id IS NOT NULL)
  ),
  UNIQUE(menu_item_id, option_id, ingredient_id)
);

-- 3. เปิดใช้งาน Row Level Security (RLS)
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_items ENABLE ROW LEVEL SECURITY;

-- 4. สร้างนโยบายการเข้าถึง (Policies) สำหรับ ingredients
CREATE POLICY "ingredients_select" ON public.ingredients FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "ingredients_insert" ON public.ingredients FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "ingredients_update" ON public.ingredients FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "ingredients_delete" ON public.ingredients FOR DELETE TO anon, authenticated USING (true);

-- 5. สร้างนโยบายการเข้าถึง (Policies) สำหรับ recipe_items
CREATE POLICY "recipe_items_select" ON public.recipe_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "recipe_items_insert" ON public.recipe_items FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "recipe_items_update" ON public.recipe_items FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "recipe_items_delete" ON public.recipe_items FOR DELETE TO anon, authenticated USING (true);

-- 6. ทริกเกอร์อัปเดต updated_at อัตโนมัติ
CREATE TRIGGER trg_ingredients_updated_at
  BEFORE UPDATE ON public.ingredients FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 7. ป้อนข้อมูลวัตถุดิบเริ่มต้น (เริ่มต้นที่ 1,000 กรัม หรือ 1 kg และ ไข่ไก่/ท็อปปิ้งตามปริมาณ)
INSERT INTO public.ingredients (name, quantity, unit, min_threshold) VALUES
  ('หมูสับ', 1000.00, 'g', 200.00),
  ('หมูกรอบ', 1000.00, 'g', 200.00),
  ('หมูชิ้น', 1000.00, 'g', 200.00),
  ('ไก่สับ', 1000.00, 'g', 200.00),
  ('ไก่ต้ม', 1000.00, 'g', 200.00),
  ('เนื้อ', 1000.00, 'g', 200.00),
  ('หมึก', 1000.00, 'g', 200.00),
  ('กุ้ง', 1000.00, 'g', 200.00),
  ('หอยลาย', 1000.00, 'g', 200.00),
  ('ไข่ไก่', 100.00, 'pcs', 15.00),
  ('ไส้กรอก', 50.00, 'pcs', 10.00),
  ('กุนเชียง', 50.00, 'pcs', 10.00)
ON CONFLICT (name) DO UPDATE 
SET quantity = EXCLUDED.quantity, unit = EXCLUDED.unit, min_threshold = EXCLUDED.min_threshold;

-- 8. ผูกตัวเลือกอาหารกับสูตรวัตถุดิบ (ตัวเลือกเหล่านี้จะถูกใช้อัตโนมัติเมื่อกดเลือกสั่งในแอป)
-- ค้นหา UUID ของวัตถุดิบที่เพิ่มไปเพื่อเชื่อมความสัมพันธ์
INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 'p_minced_pork', id, 120.00 FROM public.ingredients WHERE name = 'หมูสับ'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 'p_crispy_pork', id, 100.00 FROM public.ingredients WHERE name = 'หมูกรอบ'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 'p_sliced_pork', id, 120.00 FROM public.ingredients WHERE name = 'หมูชิ้น'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 'p_minced_chicken', id, 120.00 FROM public.ingredients WHERE name = 'ไก่สับ'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 'p_boiled_chicken', id, 100.00 FROM public.ingredients WHERE name = 'ไก่ต้ม'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 'p_beef', id, 120.00 FROM public.ingredients WHERE name = 'เนื้อ'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 'p_squid', id, 120.00 FROM public.ingredients WHERE name = 'หมึก'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 'p_shrimp', id, 120.00 FROM public.ingredients WHERE name = 'กุ้ง'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 'p_clam', id, 120.00 FROM public.ingredients WHERE name = 'หอยลาย'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

-- สูตรสำหรับท็อปปิ้ง (ไข่ต่างๆ และเครื่องเคียง)
INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 't_omelet', id, 1.00 FROM public.ingredients WHERE name = 'ไข่ไก่'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 't_fried_egg', id, 1.00 FROM public.ingredients WHERE name = 'ไข่ไก่'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 't_soft_boiled_egg', id, 1.00 FROM public.ingredients WHERE name = 'ไข่ไก่'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 't_boiled_egg', id, 1.00 FROM public.ingredients WHERE name = 'ไข่ไก่'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 't_sausage', id, 1.00 FROM public.ingredients WHERE name = 'ไส้กรอก'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;

INSERT INTO public.recipe_items (option_id, ingredient_id, quantity_required)
SELECT 't_chinese_sausage', id, 1.00 FROM public.ingredients WHERE name = 'กุนเชียง'
ON CONFLICT (menu_item_id, option_id, ingredient_id) DO NOTHING;
