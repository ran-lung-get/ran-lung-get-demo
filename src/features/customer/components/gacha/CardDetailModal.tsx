import { motion } from "motion/react";
import { X, Sparkles, Star, Flame, ShieldCheck, Tag, Layers, Calendar, Copy } from "lucide-react";
import type { CollectibleCard } from "../../types/gacha";
import { getRarityConfig } from "./CardItem";
import { GACHA_SETS } from "../../constants/gachaData";
import { useLanguage } from "../../../../lib/i18n";

export function CardDetailModal({
  card,
  count = 1,
  firstObtainedAt,
  onClose,
}: {
  card: CollectibleCard;
  count?: number;
  firstObtainedAt?: string;
  onClose: () => void;
}) {
  const { t, language } = useLanguage();
  const config = getRarityConfig(card.rarity);
  const cardSet = GACHA_SETS.find((s) => s.id === card.setId);

  const formattedDate = firstObtainedAt
    ? new Date(firstObtainedAt).toLocaleDateString(language === "th" ? "th-TH" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : language === "th" ? "วันนี้" : "Today";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`relative z-10 w-full max-w-lg rounded-3xl border ${config.borderColor} bg-slate-950 p-6 text-white shadow-2xl overflow-hidden`}
        style={{
          boxShadow: `0 0 50px ${config.glowColor}`,
        }}
      >
        {/* Glow ambient background */}
        <div
          className="absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ background: config.glowColor }}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer z-20"
        >
          <X size={18} />
        </button>

        {/* Header Content */}
        <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
          {/* Card Showcase Left */}
          <div className="w-48 shrink-0 flex flex-col items-center">
            <div
              className={`relative w-full rounded-2xl border-2 ${config.borderColor} bg-linear-to-b ${config.bgGradient} p-3 flex flex-col items-center text-center shadow-xl overflow-hidden`}
            >
              {/* Rarity & Star Header */}
              <div className="w-full flex items-center justify-between mb-2">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-black ${config.badgeBg}`}>
                  {config.label}
                </span>
                <span className="text-xs font-bold text-amber-300">
                  {language === "th" ? "ครอบครอง" : "Owned"}: {count} {t("ใบ")}
                </span>
              </div>

              {/* Artwork */}
              <div className="h-44 w-full rounded-xl overflow-hidden border border-white/20 bg-slate-900 mb-2">
                <img
                  src={card.image}
                  alt={card.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 my-1">
                {Array.from({ length: config.starCount }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={config.starColor}
                    color={config.starColor}
                  />
                ))}
              </div>

              {/* Stat */}
              <div className="w-full mt-2 pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                <span className="text-slate-400">{t("พลังความอร่อยรวม")}</span>
                <span className="font-black text-amber-300">
                  {card.flavorPower.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Details Right */}
          <div className="flex-1 w-full space-y-3.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {card.nameEn}
                </span>
              </div>
              <h3 className={`text-xl font-black ${config.titleColor}`}>
                {language === "th" ? card.name : card.nameEn}
              </h3>
              <p className="text-xs text-amber-200/80 font-medium mt-0.5">
                "{card.title}"
              </p>
            </div>

            {/* Secret Buff / Perk */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                <Sparkles size={14} />
                <span>{language === "th" ? "บัฟลับประจำเมนู:" : language === "zh" ? "专属美食Buff:" : "Secret Menu Buff:"}</span>
              </div>
              <p className="text-slate-200">{card.secretBuff}</p>
            </div>

            {/* Lore Story */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-300">
                <Layers size={13} className="text-slate-400" />
                <span>{language === "th" ? "เรื่องเล่าร้านลุงเกตุ:" : language === "zh" ? "龙葛特风味传说:" : "Uncle Get's Kitchen Lore:"}</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-light italic">
                "{card.lore}"
              </p>
            </div>

            {/* Belonging Set */}
            {cardSet && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
                <span className="text-purple-300 font-semibold flex items-center gap-1">
                  <ShieldCheck size={14} />
                  {language === "th" ? cardSet.name : cardSet.nameEn}
                </span>
                <span className="text-[10px] text-purple-200">
                  {cardSet.requiredCardIds.length} {t("ใบ")}
                </span>
              </div>
            )}

            {/* Tags & Date */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-[11px] text-slate-400">
              <div className="flex flex-wrap gap-1">
                {card.flavorTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-1 text-[10px]">
                <Calendar size={11} /> {language === "th" ? "ได้รับครั้งแรก" : "First obtained"}: {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
