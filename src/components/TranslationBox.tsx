import { useState } from "react";
import { 
  Languages, 
  ArrowLeftRight, 
  Copy, 
  Check, 
  X, 
  Sparkles,
  Loader2
} from "lucide-react";
import { translateApi } from "../lib/api/translation.functions";

type LanguageCode = "auto" | "th" | "en" | "zh";
type TargetLanguageCode = "th" | "en" | "zh";

const languages = [
  { code: "auto", name: "ตรวจจับภาษาอัตโนมัติ (Auto Detect)" },
  { code: "th", name: "ภาษาไทย (Thai)" },
  { code: "en", name: "English" },
  { code: "zh", name: "中文 (Chinese)" }
];

const targetLanguages = [
  { code: "th", name: "ภาษาไทย (Thai)" },
  { code: "en", name: "English" },
  { code: "zh", name: "中文 (Chinese)" }
];

export function TranslationBox() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState<LanguageCode>("auto");
  const [targetLang, setTargetLang] = useState<TargetLanguageCode>("en");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const characterLimit = 5000;

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await translateApi({
        data: {
          text: sourceText,
          sourceLang,
          targetLang
        }
      });
      setTranslatedText(response.translatedText);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "การแปลภาษาล้มเหลว กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    // If sourceLang is 'auto', we map it to 'th' as default when swapping target back
    const nextTarget = sourceLang === "auto" ? "th" : (sourceLang as TargetLanguageCode);
    const nextSource = targetLang as LanguageCode;

    setSourceLang(nextSource);
    setTargetLang(nextTarget);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setSourceText("");
    setTranslatedText("");
    setError(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-md border border-[#ece4d6] rounded-3xl shadow-xl overflow-hidden text-[#002e47]">
      {/* Box Header */}
      <div className="bg-[#002e47] text-white p-5 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="bg-white/10 p-2 rounded-xl border border-white/15">
            <Languages className="h-5 w-5 text-[#fcc14a]" />
          </div>
          <div>
            <h3 className="font-black text-sm tracking-tight uppercase">ระบบแปลภาษาเรียลไทม์</h3>
            <p className="text-[10px] font-bold text-[#fcc14a] tracking-wider uppercase">Translate Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#fcc14a]/10 border border-[#fcc14a]/20 text-[#fcc14a] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
          <Sparkles className="h-3 w-3 animate-pulse" />
          <span>Auto Cache Enabled</span>
        </div>
      </div>

      {/* Language Selector Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#fcfbf9] px-6 py-4 border-b border-[#ece4d6]">
        {/* Source Language Selector */}
        <div className="w-full sm:w-auto flex-1 flex flex-col gap-1.5">
          <label className="text-[10px] font-extrabold text-[#5a6e7a] uppercase tracking-wider">ภาษาต้นทาง (Source)</label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value as LanguageCode)}
            className="w-full px-3 py-2.5 bg-white border border-[#ece4d6] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#002e47]/20 focus:border-[#002e47] cursor-pointer"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="pt-5 shrink-0">
          <button
            onClick={handleSwap}
            disabled={sourceLang === "auto"}
            title={sourceLang === "auto" ? "ไม่สามารถสลับภาษาได้หากเลือกตรวจจับอัตโนมัติ" : "สลับภาษา"}
            className="p-3 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white border border-[#ece4d6] rounded-full shadow-sm hover:shadow active:scale-95 transition cursor-pointer"
          >
            <ArrowLeftRight className="h-4 w-4 text-[#002e47]" />
          </button>
        </div>

        {/* Target Language Selector */}
        <div className="w-full sm:w-auto flex-1 flex flex-col gap-1.5">
          <label className="text-[10px] font-extrabold text-[#5a6e7a] uppercase tracking-wider">ภาษาปลายทาง (Target)</label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value as TargetLanguageCode)}
            className="w-full px-3 py-2.5 bg-white border border-[#ece4d6] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#002e47]/20 focus:border-[#002e47] cursor-pointer"
          >
            {targetLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Text Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#ece4d6]">
        {/* Left Side: Input Textarea */}
        <div className="p-6 space-y-3 relative flex flex-col min-h-[280px]">
          <div className="flex-1 relative">
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="พิมพ์ข้อความที่ต้องการแปลที่นี่..."
              maxLength={characterLimit}
              className="w-full h-full min-h-[200px] resize-none bg-transparent border-0 focus:outline-none focus:ring-0 text-sm font-semibold leading-relaxed placeholder-slate-400"
            />
            {sourceText && (
              <button
                onClick={handleClear}
                className="absolute top-0 right-0 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer active:scale-95 transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 shrink-0">
            <span className={`text-[10px] font-bold ${
              sourceText.length >= characterLimit - 200 ? "text-red-500" : "text-slate-400"
            }`}>
              {sourceText.length.toLocaleString()} / {characterLimit.toLocaleString()} ตัวอักษร
            </span>
            <button
              onClick={handleTranslate}
              disabled={loading || !sourceText.trim()}
              className="px-6 py-2.5 bg-[#002e47] hover:opacity-95 disabled:opacity-40 text-white rounded-xl text-xs font-black cursor-pointer transition active:scale-95 flex items-center gap-1.5"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>กำลังแปล...</span>
                </>
              ) : (
                <span>แปลภาษา (Translate)</span>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Output Textarea */}
        <div className="p-6 bg-slate-50/50 flex flex-col justify-between min-h-[280px]">
          <div className="flex-1 w-full relative">
            {error ? (
              <div className="text-red-500 text-xs font-bold p-3 bg-red-50 rounded-xl border border-red-200">
                {error}
              </div>
            ) : translatedText ? (
              <div className="w-full text-sm font-semibold leading-relaxed text-[#002e47] break-words whitespace-pre-wrap select-all">
                {translatedText}
              </div>
            ) : (
              <div className="text-slate-400 text-sm font-semibold italic">
                ผลลัพธ์คำแปลจะแสดงผลตรงนี้...
              </div>
            )}
          </div>

          <div className="flex items-center justify-end pt-3 border-t border-slate-100/60 shrink-0">
            {translatedText && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-4 py-2 bg-white hover:bg-slate-50 border border-[#ece4d6] rounded-xl text-xs font-bold text-[#002e47] cursor-pointer transition active:scale-95 shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600">คัดลอกแล้ว</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-500" />
                    <span>คัดลอก (Copy)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
