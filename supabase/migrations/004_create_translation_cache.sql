-- ════════════════════════════════════════════════════════
-- TRANSLATION CACHE TABLE
-- ════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.translation_cache (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_text     TEXT NOT NULL,
  source_lang     VARCHAR(10) NOT NULL,
  target_lang     VARCHAR(10) NOT NULL,
  translated_text TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_translation UNIQUE (source_text, source_lang, target_lang)
);

COMMENT ON TABLE public.translation_cache IS 'เก็บข้อมูลแคชสำหรับฟีเจอร์แปลภาษา';

-- สร้าง Index บนคู่รหัสเพื่อการค้นหาที่รวดเร็วที่สุด
CREATE INDEX IF NOT EXISTS idx_translation_cache_lookup 
ON public.translation_cache (source_text, source_lang, target_lang);
