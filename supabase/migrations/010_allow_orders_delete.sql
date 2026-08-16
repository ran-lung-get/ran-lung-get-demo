-- ════════════════════════════════════════════════════════
-- Migration 010: Allow Orders & Order Items Delete Policy
-- เพิ่มสิทธิ์การลบข้อมูล orders และ order_items สำหรับการรีเซ็ตข้อมูลในระบบ
-- ════════════════════════════════════════════════════════

DO $$ BEGIN
  DROP POLICY IF EXISTS "orders_all_anon" ON public.orders;
  DROP POLICY IF EXISTS "orders_delete" ON public.orders;
EXCEPTION WHEN undefined_object THEN NULL; END$$;

CREATE POLICY "orders_all_anon" ON public.orders
  FOR ALL USING (true) WITH CHECK (true);

DO $$ BEGIN
  DROP POLICY IF EXISTS "order_items_all_anon" ON public.order_items;
  DROP POLICY IF EXISTS "order_items_delete" ON public.order_items;
EXCEPTION WHEN undefined_object THEN NULL; END$$;

CREATE POLICY "order_items_all_anon" ON public.order_items
  FOR ALL USING (true) WITH CHECK (true);
