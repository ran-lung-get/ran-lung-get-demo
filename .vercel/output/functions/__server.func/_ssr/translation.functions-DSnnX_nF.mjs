import { t as supabase } from "./supabase-BbREKNGv.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/translation.functions-DSnnX_nF.js
async function translateText({ text, sourceLang, targetLang }) {
	const src = sourceLang === "auto" ? "" : sourceLang;
	const cacheSourceLang = sourceLang === "auto" ? "auto" : sourceLang;
	const { data: cached, error: cacheErr } = await supabase.from("translation_cache").select("translated_text").eq("source_text", text).eq("source_lang", cacheSourceLang).eq("target_lang", targetLang).maybeSingle();
	if (!cacheErr && cached) {
		console.log("Translation cache hit!");
		return {
			translatedText: cached.translated_text,
			cached: true
		};
	}
	let translatedText = "";
	const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY || process.env.GOOGLE_API_KEY;
	let googleSuccess = false;
	if (googleApiKey) try {
		console.log("Calling Google Translate API...");
		const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				q: text,
				source: src || void 0,
				target: targetLang,
				format: "text"
			})
		});
		if (response.ok) {
			const translation = (await response.json())?.data?.translations?.[0];
			if (translation) {
				translatedText = translation.translatedText;
				if (sourceLang === "auto" && translation.detectedSourceLanguage) translation.detectedSourceLanguage;
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
	else console.log("Google Translate API key not found. Skipping to fallback...");
	let openaiSuccess = false;
	if (!googleSuccess) {
		const openaiApiKey = process.env.OPENAI_API_KEY;
		if (openaiApiKey) try {
			console.log("Calling OpenAI API fallback (gpt-4o-mini)...");
			const systemPrompt = `You are a professional translator. Translate the user's text into ${targetLang === "th" ? "Thai" : targetLang === "zh" ? "Chinese (Simplified)" : "English"}.
${sourceLang !== "auto" ? `The source language is ${sourceLang === "th" ? "Thai" : sourceLang === "zh" ? "Chinese" : "English"}.` : "Detect the source language automatically."}
Only output the exact translated text without any explanations, notes, or extra characters.`;
			const response = await fetch("https://api.openai.com/v1/chat/completions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${openaiApiKey}`
				},
				body: JSON.stringify({
					model: "gpt-4o-mini",
					messages: [{
						role: "system",
						content: systemPrompt
					}, {
						role: "user",
						content: text
					}],
					temperature: .3
				})
			});
			if (response.ok) {
				translatedText = (await response.json())?.choices?.[0]?.message?.content?.trim() || text;
				openaiSuccess = true;
				console.log("OpenAI API success!");
			} else {
				const errText = await response.text();
				console.error(`OpenAI API failed: ${errText}`);
			}
		} catch (e) {
			console.error("OpenAI API exception:", e);
		}
	}
	if (!googleSuccess && !openaiSuccess) try {
		console.log("Calling Free Google Translate API fallback...");
		const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${src || "auto"}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
		if (response.ok) {
			const translatedParts = (await response.json())?.[0]?.map((part) => part?.[0]).filter(Boolean);
			if (translatedParts && translatedParts.length > 0) {
				translatedText = translatedParts.join("");
				console.log("Free Google Translate API success!");
			} else translatedText = text;
		} else {
			console.error("Free Google Translate API failed");
			translatedText = text;
		}
	} catch (e) {
		console.error("Free Google Translate API exception:", e);
		translatedText = text;
	}
	if (translatedText) try {
		const { error: insertErr } = await supabase.from("translation_cache").insert({
			source_text: text,
			source_lang: cacheSourceLang,
			target_lang: targetLang,
			translated_text: translatedText
		});
		if (insertErr) console.warn("Failed to write to translation cache (DB error):", insertErr.message);
		else console.log("Saved to translation cache.");
	} catch (e) {
		console.warn("Failed to write to translation cache:", e);
	}
	return {
		translatedText,
		cached: false
	};
}
var translateApi_createServerFn_handler = createServerRpc({
	id: "f1d06da6e6d10d0944451595bd9debcef1876485cd34b7e8e03bb58d51ae47ba",
	name: "translateApi",
	filename: "src/lib/api/translation.functions.ts"
}, (opts) => translateApi.__executeServer(opts));
var translateApi = createServerFn({ method: "POST" }).inputValidator(objectType({
	text: stringType().min(1).max(5e3),
	sourceLang: stringType(),
	targetLang: stringType()
})).handler(translateApi_createServerFn_handler, async ({ data }) => {
	return await translateText(data);
});
//#endregion
export { translateApi_createServerFn_handler };
