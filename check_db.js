import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vshamisexmjcymsdyhym.supabase.co/';
const supabaseKey = 'sb_publishable_viPzmZUj0b2sbHlyWAnz5Q_PntK9O03';
const supabase = createClient(supabaseUrl, supabaseKey);

// Mock process.env keys for the simulation if they aren't set
process.env.GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || '';
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'mock-openai-key-for-testing';

// Mock translation function to simulate the backend behavior
async function simulateTranslate({ text, sourceLang, targetLang }) {
  console.log(`\n--- Starting Translation Simulation ---`);
  console.log(`Input: "${text}" | Source: ${sourceLang} -> Target: ${targetLang}`);

  const cacheSourceLang = sourceLang === "auto" ? "auto" : sourceLang;

  // 1. Check cache in Supabase
  console.log("Step 1: Checking translation_cache table in Supabase...");
  const { data: cached, error: cacheErr } = await supabase
    .from("translation_cache")
    .select("translated_text")
    .eq("source_text", text)
    .eq("source_lang", cacheSourceLang)
    .eq("target_lang", targetLang)
    .maybeSingle();

  if (cacheErr) {
    if (cacheErr.message.includes("does not exist") || cacheErr.code === 'P0001') {
      console.warn("⚠️ Warning: Table 'translation_cache' does not exist in Supabase yet. Please run the SQL migration (004_create_translation_cache.sql) in your Supabase SQL Editor!");
    } else {
      console.error("  Cache query failed:", cacheErr.message);
    }
  } else if (cached) {
    console.log("🎉 SUCCESS: Cache Hit! Found cached translation:", JSON.stringify(cached));
    return { translatedText: cached.translated_text, cached: true };
  } else {
    console.log("  Cache Miss: No matching cached translation found.");
  }

  // 2. Simulate APIs
  let translatedText = "";
  let usedAPI = "";

  if (process.env.GOOGLE_TRANSLATE_API_KEY) {
    console.log("Step 2: Simulating Google Translate API Call...");
    translatedText = `[Google translated to ${targetLang}] ${text}`;
    usedAPI = "Google Translate API";
  } else {
    console.log("Step 2: Google Translate API Key is missing. Falling back to OpenAI...");
    console.log("Step 3: Simulating OpenAI API Call (gpt-4o-mini)...");
    translatedText = `[OpenAI translated to ${targetLang}] ${text}`;
    usedAPI = "OpenAI API (gpt-4o-mini)";
  }

  console.log(`🎉 Translation Success! Result: "${translatedText}" (via ${usedAPI})`);

  // 4. Try saving to Cache
  console.log("Step 4: Attempting to save to translation_cache...");
  const { error: insertErr } = await supabase
    .from("translation_cache")
    .insert({
      source_text: text,
      source_lang: cacheSourceLang,
      target_lang: targetLang,
      translated_text: translatedText,
    });

  if (insertErr) {
    console.error("  Insert cache failed:", insertErr.message);
  } else {
    console.log("🎉 SUCCESS: Saved new translation to cache!");
  }

  return { translatedText, cached: false };
}

async function runTest() {
  // Test 1: First translation (Cache Miss)
  console.log("=========================================");
  console.log("TEST 1: Translate a new sentence (Cache Miss & Save)");
  console.log("=========================================");
  const testText = "สวัสดีตอนเช้าครับเพื่อนๆ";
  await simulateTranslate({ text: testText, sourceLang: "th", targetLang: "en" });

  // Test 2: Second translation (Cache Hit)
  console.log("\n=========================================");
  console.log("TEST 2: Translate the SAME sentence again (Cache Hit)");
  console.log("=========================================");
  await simulateTranslate({ text: testText, sourceLang: "th", targetLang: "en" });
}

runTest();
