import { History, Star, Sparkles, Ticket } from "lucide-react";
import type { GachaPullResult } from "../../types/gacha";
import { getRarityConfig } from "./CardItem";
import { useLanguage } from "../../../../lib/i18n";

export function GachaHistoryView({ history }: { history: GachaPullResult[] }) {
  const { t, language } = useLanguage();

  if (history.length === 0) {
    return (
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-12 text-center text-white flex flex-col items-center justify-center">
        <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-3">
          <History size={24} />
        </div>
        <h4 className="text-sm font-bold text-slate-200">{t("ยังไม่มีประวัติการอธิษฐาน")}</h4>
        <p className="text-xs text-slate-400 mt-1">
          {language === "th" ? "ประวัติการสุ่ม 100 ครั้งล่าสุดจะแสดงที่นี่" : language === "zh" ? "此处展示最近100次祈愿记录" : "Recent 100 pull history will appear here"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <History size={14} className="text-amber-400" />
          <span>
            {t("ประวัติการสุ่ม")} ({history.length} {language === "th" ? "รายการล่าสุด" : language === "zh" ? "条最新记录" : "recent items"})
          </span>
        </span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950 overflow-hidden text-xs">
        <div className="grid grid-cols-12 bg-white/5 p-3 font-bold text-slate-400 border-b border-white/10">
          <span className="col-span-3 sm:col-span-2">{language === "th" ? "ระดับ" : language === "zh" ? "品级" : "Rarity"}</span>
          <span className="col-span-6 sm:col-span-7">{language === "th" ? "ชื่อรางวัลที่ได้รับ" : language === "zh" ? "获得奖励" : "Reward Name"}</span>
          <span className="col-span-3 text-right">{language === "th" ? "เวลา" : language === "zh" ? "时间" : "Time"}</span>
        </div>

        <div className="divide-y divide-white/5 max-h-[60vh] overflow-y-auto no-scrollbar">
          {history.map((item, idx) => {
            const config = getRarityConfig(item.rarity);
            const title =
              item.itemType === "card"
                ? language === "th" ? item.cardData?.name : item.cardData?.nameEn || item.cardData?.name
                : language === "th" ? item.couponData?.name : item.couponData?.nameEn || item.couponData?.name;

            const timeStr = new Date(item.pulledAt).toLocaleTimeString(language === "th" ? "th-TH" : "en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={item.id || idx}
                className="grid grid-cols-12 p-3 items-center hover:bg-white/5 transition-colors"
              >
                <div className="col-span-3 sm:col-span-2 flex items-center gap-1">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-black ${config.badgeBg}`}
                  >
                    {config.label}
                  </span>
                </div>

                <div className="col-span-6 sm:col-span-7 flex items-center gap-2 min-w-0 pr-2">
                  <span className={`font-semibold truncate ${config.titleColor}`}>
                    {title}
                  </span>
                  {item.isNew && (
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-1.5 py-0.2 rounded-full shrink-0">
                      NEW!
                    </span>
                  )}
                  {item.duplicateCount && item.duplicateCount > 1 && (
                    <span className="text-[9px] text-slate-400 shrink-0">
                      ({language === "th" ? `ใบที่ ${item.duplicateCount}` : `#${item.duplicateCount}`})
                    </span>
                  )}
                </div>

                <div className="col-span-3 text-right text-[11px] text-slate-400">
                  {timeStr}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
