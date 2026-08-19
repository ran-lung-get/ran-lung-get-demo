import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage, type Language } from "../lib/i18n";
import { FlagIcon } from "../features/customer/components/FlagIcon";

interface LanguageSelectorProps {
  variant?: "light" | "dark" | "pill";
  compact?: boolean;
  className?: string;
}

export function LanguageSelector({
  variant = "light",
  compact = false,
  className = "",
}: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string; subLabel: string }[] = [
    { code: "th", label: "ไทย", subLabel: "ภาษาไทย" },
    { code: "en", label: "EN", subLabel: "English" },
    { code: "zh", label: "中文", subLabel: "中文" },
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  const isDark = variant === "dark";

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        aria-label="เปลี่ยนภาษา (Change Language)"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all duration-150 cursor-pointer active:scale-95 select-none ${
          isDark
            ? "bg-white/10 hover:bg-white/15 border-white/15 text-white shadow-xs"
            : "bg-white hover:bg-slate-50 border-[#ece4d6] text-[#002e47] shadow-xs"
        }`}
      >
        <FlagIcon lang={language} />
        {!compact && (
          <span className="tracking-wide">
            {currentLang.label}
          </span>
        )}
        <ChevronDown
          size={13}
          className={`opacity-60 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Backdrop for clickaway */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 cursor-default"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 top-full mt-1.5 w-40 rounded-2xl shadow-xl overflow-hidden z-50 p-1.5 border flex flex-col gap-1 ${
              isDark
                ? "bg-[#002e47] border-white/15 text-white"
                : "bg-white border-[#ece4d6] text-[#002e47]"
            }`}
          >
            <div className="px-2 py-1 flex items-center gap-1.5 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
              <Globe size={11} />
              <span>เลือกภาษา / Language</span>
            </div>
            {languages.map((item) => {
              const isActive = language === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLanguage(item.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs font-bold transition-all active:scale-[0.98] cursor-pointer ${
                    isActive
                      ? isDark
                        ? "bg-[#fcc14a]/20 text-[#fcc14a]"
                        : "bg-[#002e47]/10 text-[#002e47] font-black"
                      : isDark
                        ? "text-white/80 hover:bg-white/10 hover:text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#002e47]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FlagIcon lang={item.code} />
                    <span>{item.subLabel}</span>
                  </div>
                  {isActive && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md font-black bg-[#fcc14a] text-[#002e47]">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
