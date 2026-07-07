import { supabase } from "../supabase";

interface TranslateParams {
  text: string;
  sourceLang: string; // "auto", "th", "en", "zh"
  targetLang: string; // "th", "en", "zh"
}

export async function translateText({ text, sourceLang, targetLang }: TranslateParams) {
  const src = sourceLang === "auto" ? "" : sourceLang;
  
  // 1. Check cache first
  const cacheSourceLang = sourceLang === "auto" ? "auto" : sourceLang;
  const { data: cached, error: cacheErr } = await supabase
    .from("translation_cache")
    .select("translated_text")
    .eq("source_text", text)
    .eq("source_lang", cacheSourceLang)
    .eq("target_lang", targetLang)
    .maybeSingle();

  if (!cacheErr && cached) {
    console.log("Translation cache hit!");
    return { translatedText: cached.translated_text, cached: true };
  }

  let translatedText = "";
  let detectedSourceLang = sourceLang;

  // 2. Try Google Translate API first
  const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY || process.env.GOOGLE_API_KEY;
  let googleSuccess = false;

  if (googleApiKey) {
    try {
      console.log("Calling Google Translate API...");
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: text,
            source: src || undefined,
            target: targetLang,
            format: "text",
          }),
        }
      );

      if (response.ok) {
        const resJson = await response.json();
        const translation = resJson?.data?.translations?.[0];
        if (translation) {
          translatedText = translation.translatedText;
          if (sourceLang === "auto" && translation.detectedSourceLanguage) {
            detectedSourceLang = translation.detectedSourceLanguage;
          }
          googleSuccess = true;
          console.log("Google Translate API success!");
        }
      } else {
        const errText = await response.text();
        console.error("Google Translate API error response:", errText);
      }
    } catch (e) {
      console.error("Google Translate API exception:", e);
    }
  } else {
    console.log("Google Translate API key not found. Skipping to fallback...");
  }

  // 3. Fallback to OpenAI API if Google Translate failed or was not configured
  if (!googleSuccess) {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      console.warn("Both Google Translate API Key and OpenAI API Key are missing. Using original text as fallback.");
      translatedText = text;
    } else {
      try {
        console.log("Calling OpenAI API fallback (gpt-4o-mini)...");
        const systemPrompt = `You are a professional translator. Translate the user's text into ${
          targetLang === "th" ? "Thai" : targetLang === "zh" ? "Chinese (Simplified)" : "English"
        }.
${
  sourceLang !== "auto"
    ? `The source language is ${
        sourceLang === "th" ? "Thai" : sourceLang === "zh" ? "Chinese" : "English"
      }.`
    : "Detect the source language automatically."
}
Only output the exact translated text without any explanations, notes, or extra characters.`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: text },
            ],
            temperature: 0.3,
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error(`OpenAI API failed: ${errText}`);
          translatedText = text;
        } else {
          const resJson = await response.json();
          translatedText = resJson?.choices?.[0]?.message?.content?.trim() || text;
          console.log("OpenAI API success!");
        }
      } catch (e: any) {
        console.error("OpenAI API exception:", e);
        translatedText = text;
      }
    }
  }

  // 4. Save to cache in Supabase
  if (translatedText) {
    try {
      await supabase.from("translation_cache").insert({
        source_text: text,
        source_lang: cacheSourceLang,
        target_lang: targetLang,
        translated_text: translatedText,
      });
      console.log("Saved to translation cache.");
    } catch (e) {
      console.warn("Failed to write to translation cache:", e);
    }
  }

  return { translatedText, cached: false };
}
