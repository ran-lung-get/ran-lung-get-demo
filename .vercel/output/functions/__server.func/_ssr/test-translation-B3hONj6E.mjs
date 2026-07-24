import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { V as Languages, _t as ArrowLeftRight, dt as Check, t as X, tt as Copy, v as Sparkles, z as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as translateApi } from "./translation.functions-CL9HGddj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/test-translation-B3hONj6E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var languages = [
	{
		code: "auto",
		name: "ตรวจจับภาษาอัตโนมัติ (Auto Detect)"
	},
	{
		code: "th",
		name: "ภาษาไทย (Thai)"
	},
	{
		code: "en",
		name: "English"
	},
	{
		code: "zh",
		name: "中文 (Chinese)"
	}
];
var targetLanguages = [
	{
		code: "th",
		name: "ภาษาไทย (Thai)"
	},
	{
		code: "en",
		name: "English"
	},
	{
		code: "zh",
		name: "中文 (Chinese)"
	}
];
function TranslationBox() {
	const [sourceText, setSourceText] = (0, import_react.useState)("");
	const [translatedText, setTranslatedText] = (0, import_react.useState)("");
	const [sourceLang, setSourceLang] = (0, import_react.useState)("auto");
	const [targetLang, setTargetLang] = (0, import_react.useState)("en");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const characterLimit = 5e3;
	const handleTranslate = async () => {
		if (!sourceText.trim()) return;
		setLoading(true);
		setError(null);
		try {
			setTranslatedText((await translateApi({ data: {
				text: sourceText,
				sourceLang,
				targetLang
			} })).translatedText);
		} catch (e) {
			console.error(e);
			setError(e.message || "การแปลภาษาล้มเหลว กรุณาลองใหม่อีกครั้ง");
		} finally {
			setLoading(false);
		}
	};
	const handleSwap = () => {
		const nextTarget = sourceLang === "auto" ? "th" : sourceLang;
		setSourceLang(targetLang);
		setTargetLang(nextTarget);
		setSourceText(translatedText);
		setTranslatedText(sourceText);
	};
	const handleCopy = () => {
		if (!translatedText) return;
		navigator.clipboard.writeText(translatedText).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		});
	};
	const handleClear = () => {
		setSourceText("");
		setTranslatedText("");
		setError(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-5xl mx-auto bg-white/70 backdrop-blur-md border border-[#ece4d6] rounded-3xl shadow-xl overflow-hidden text-[#002e47]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#002e47] text-white p-5 flex items-center justify-between border-b border-white/10 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white/10 p-2 rounded-xl border border-white/15",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-5 w-5 text-[#fcc14a]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-black text-sm tracking-tight uppercase",
						children: "ระบบแปลภาษาเรียลไทม์"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-bold text-[#fcc14a] tracking-wider uppercase",
						children: "Translate Engine"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 bg-[#fcc14a]/10 border border-[#fcc14a]/20 text-[#fcc14a] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Auto Cache Enabled" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#fcfbf9] px-6 py-4 border-b border-[#ece4d6]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full sm:w-auto flex-1 flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[10px] font-extrabold text-[#5a6e7a] uppercase tracking-wider",
							children: "ภาษาต้นทาง (Source)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: sourceLang,
							onChange: (e) => setSourceLang(e.target.value),
							className: "w-full px-3 py-2.5 bg-white border border-[#ece4d6] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#002e47]/20 focus:border-[#002e47] cursor-pointer",
							children: languages.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: lang.code,
								children: lang.name
							}, lang.code))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-5 shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleSwap,
							disabled: sourceLang === "auto",
							title: sourceLang === "auto" ? "ไม่สามารถสลับภาษาได้หากเลือกตรวจจับอัตโนมัติ" : "สลับภาษา",
							className: "p-3 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white border border-[#ece4d6] rounded-full shadow-sm hover:shadow active:scale-95 transition cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "h-4 w-4 text-[#002e47]" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full sm:w-auto flex-1 flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[10px] font-extrabold text-[#5a6e7a] uppercase tracking-wider",
							children: "ภาษาปลายทาง (Target)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: targetLang,
							onChange: (e) => setTargetLang(e.target.value),
							className: "w-full px-3 py-2.5 bg-white border border-[#ece4d6] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#002e47]/20 focus:border-[#002e47] cursor-pointer",
							children: targetLanguages.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: lang.code,
								children: lang.name
							}, lang.code))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#ece4d6]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 space-y-3 relative flex flex-col min-h-[280px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: sourceText,
							onChange: (e) => setSourceText(e.target.value),
							placeholder: "พิมพ์ข้อความที่ต้องการแปลที่นี่...",
							maxLength: characterLimit,
							className: "w-full h-full min-h-[200px] resize-none bg-transparent border-0 focus:outline-none focus:ring-0 text-sm font-semibold leading-relaxed placeholder-slate-400"
						}), sourceText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleClear,
							className: "absolute top-0 right-0 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer active:scale-95 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pt-3 border-t border-slate-100 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `text-[10px] font-bold ${sourceText.length >= characterLimit - 200 ? "text-red-500" : "text-slate-400"}`,
							children: [
								sourceText.length.toLocaleString(),
								" / ",
								characterLimit.toLocaleString(),
								" ตัวอักษร"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleTranslate,
							disabled: loading || !sourceText.trim(),
							className: "px-6 py-2.5 bg-[#002e47] hover:opacity-95 disabled:opacity-40 text-white rounded-xl text-xs font-black cursor-pointer transition active:scale-95 flex items-center gap-1.5",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "กำลังแปล..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "แปลภาษา (Translate)" })
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 bg-slate-50/50 flex flex-col justify-between min-h-[280px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 w-full relative",
						children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-red-500 text-xs font-bold p-3 bg-red-50 rounded-xl border border-red-200",
							children: error
						}) : translatedText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full text-sm font-semibold leading-relaxed text-[#002e47] break-words whitespace-pre-wrap select-all",
							children: translatedText
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-slate-400 text-sm font-semibold italic",
							children: "ผลลัพธ์คำแปลจะแสดงผลตรงนี้..."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-end pt-3 border-t border-slate-100/60 shrink-0",
						children: translatedText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleCopy,
							className: "flex items-center gap-1 px-4 py-2 bg-white hover:bg-slate-50 border border-[#ece4d6] rounded-xl text-xs font-bold text-[#002e47] cursor-pointer transition active:scale-95 shadow-sm",
							children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-emerald-600",
								children: "คัดลอกแล้ว"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "คัดลอก (Copy)" })] })
						})
					})]
				})]
			})
		]
	});
}
function TestTranslationPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[#fff8f2] py-12 px-4 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-4xl mx-auto space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-extrabold text-[#002e47]",
					children: "ทดสอบระบบแปลภาษา"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-[#5a6e7a]",
					children: "ทดสอบการทำงานของระบบแปลภาษา Google Translate & OpenAI Fallback พร้อมระบบ Auto Cache"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslationBox, {})]
		})
	});
}
//#endregion
export { TestTranslationPage as component };
