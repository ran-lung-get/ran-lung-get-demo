import { motion } from "motion/react";
import { Info } from "lucide-react";
import type { GachaBannerType } from "../../types/gacha";
import { useLanguage } from "../../../../lib/i18n";

export function GachaBannerCard({
  bannerType,
  hasDailyFree,
  tickets,
  pitySR,
  pitySSR,
  onPull,
  onOpenRates,
}: {
  bannerType: GachaBannerType;
  hasDailyFree: boolean;
  tickets: number;
  pitySR: number;
  pitySSR: number;
  onPull: (count: 1 | 10, isFree?: boolean) => void;
  onOpenRates: () => void;
}) {
  const { t, language } = useLanguage();
  const isCardBanner = bannerType === "card";

  const bannerDetails = isCardBanner
    ? {
        badge: language === "th" ? "⭐ โอกาสพิเศษ: การ์ดระดับ UR & SSR" : language === "zh" ? "⭐ 特别概率UP: UR & SSR卡牌" : "⭐ Special Rate UP: UR & SSR Cards",
        badgeColor: "bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 text-white",
        title: t("ตู้คำอธิษฐานเชฟ & เมนูในตำนาน"),
        subtitle: t("สุ่มสะสมการ์ดลุงเกตุ เทพกระทะเหล็ก, หมูกรอบเพลิงสวรรค์, และราชากะเพรา"),
        bannerBg: "from-purple-950 via-slate-900 to-indigo-950",
        borderColor: "border-purple-500/40",
        accentGlow: "rgba(168,85,247,0.3)",
        featuredItems: [
          { name: language === "th" ? "ลุงเกตุ เทพกระทะเหล็ก" : language === "zh" ? "铁锅食神龙葛特" : "God Chef Lung Get", rarity: "UR 6★", img: "/logoHome.png" },
          { name: language === "th" ? "หมูกรอบเพลิงสวรรค์" : language === "zh" ? "九重天脆皮烧肉" : "Heavenly Crispy Pork", rarity: "UR 6★", img: "/meal/krapao.jpg" },
          { name: language === "th" ? "ราชากะเพราหมูสับ" : language === "zh" ? "打抛猪肉之王" : "King of Krapao", rarity: "SSR 5★", img: "/meal/krapao.jpg" },
          { name: language === "th" ? "ไข่ดาวกรอบลาวา" : language === "zh" ? "爆浆脆皮荷包蛋" : "Golden Lava Egg", rarity: "SSR 5★", img: "/meal/krapao.jpg" },
        ],
      }
    : {
        badge: language === "th" ? "ส่วนลด 50% & ฟรีเมนูดัง" : language === "zh" ? "50%折扣与免费招牌菜" : "50% Off & Free Dishes",
        badgeColor: "bg-linear-to-r from-amber-500 to-yellow-400 text-slate-950 font-black",
        title: t("ตู้คูปองมหาโชค & ของแถมจานโปรด"),
        subtitle: t("สุ่มรับโค้ดส่วนลด 50%, ฟรีข้าวกะเพรา, ฟรีไข่ดาวลาวา, และส่งฟรี ฿40"),
        bannerBg: "from-amber-950/90 via-slate-900 to-slate-950",
        borderColor: "border-amber-500/40",
        accentGlow: "rgba(245,158,11,0.3)",
        featuredItems: [
          { name: language === "th" ? "ส่วนลด 50% มหาเฮง" : language === "zh" ? "50% 惊喜折扣券" : "50% Mega Lucky Off", rarity: "SSR 5★", img: "/meal/krapao.jpg" },
          { name: language === "th" ? "ฟรี! กะเพราหมูสับ" : language === "zh" ? "免费打抛猪肉饭" : "Free Krapao Dish", rarity: "SSR 5★", img: "/meal/krapao.jpg" },
          { name: language === "th" ? "คูปองส่งฟรี ฿40" : language === "zh" ? "฿40 免费配送券" : "Free Delivery ฿40", rarity: "SR 4★", img: "/meal/pad_tua_sea.jpg" },
          { name: language === "th" ? "ฟรี! ไข่ดาวลาวา" : language === "zh" ? "免费荷包蛋" : "Free Lava Egg", rarity: "SR 4★", img: "/meal/krapao.jpg" },
        ],
      };

  const srRemaining = Math.max(1, 10 - pitySR);
  const ssrRemaining = Math.max(1, 50 - pitySSR);

  return (
    <div
      className={`relative rounded-3xl border-2 ${bannerDetails.borderColor} bg-linear-to-b ${bannerDetails.bannerBg} p-6 text-white shadow-2xl overflow-hidden`}
      style={{ boxShadow: `0 0 40px ${bannerDetails.accentGlow}` }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 h-80 w-80 bg-radial from-amber-400/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 shadow-xs ${bannerDetails.badgeColor}`}
          >
            {bannerDetails.badge}
          </span>
          <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
            {bannerDetails.title}
          </h3>
          <p className="text-xs text-slate-300 font-light mt-1 max-w-xl">
            {bannerDetails.subtitle}
          </p>
        </div>

        {/* Rate Info Button (KEEP) */}
        <button
          type="button"
          onClick={onOpenRates}
          className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-semibold backdrop-blur-xs transition-all active:scale-95 cursor-pointer border border-white/10"
        >
          <Info size={13} />
          <span>{t("รายละเอียดเรตสุ่ม")}</span>
        </button>
      </div>

      {/* Featured Items Showcase */}
      <div className="relative z-10 my-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {bannerDetails.featuredItems.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-slate-950/60 border border-white/10 p-2.5 flex flex-col items-center text-center backdrop-blur-xs group hover:border-white/30 transition-all"
          >
            <div className="relative h-20 w-full rounded-xl overflow-hidden mb-2 border border-white/10">
              <img
                src={item.img}
                alt={item.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[9px] font-black text-amber-300">
                {item.rarity}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-200 truncate w-full">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Pity Counter Bar */}
      <div className="relative z-10 rounded-2xl bg-black/40 border border-white/10 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-slate-300">
            {t("การันตี")} <strong className="text-purple-300">4★ (SR)</strong> {t("ในอีก")}{" "}
            <strong className="text-amber-400">{srRemaining}</strong> {t("ครั้ง")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">
            {t("การันตี")} <strong className="text-amber-300">5★ (SSR)</strong> {t("ในอีก")}{" "}
            <strong className="text-amber-400">{ssrRemaining}</strong> {t("ครั้ง")}
          </span>
        </div>
      </div>

      {/* Pull Buttons Area */}
      <div className="relative z-10 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Daily Free Wish or 1 Pull */}
        {hasDailyFree ? (
          <button
            type="button"
            onClick={() => onPull(1, true)}
            className="w-full py-4 rounded-2xl bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-sm shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 border border-emerald-300/40 animate-pulse"
          >
            <span>{t("หมุนฟรีประจำวัน (1 ครั้ง)")}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onPull(1, false)}
            disabled={tickets < 1}
            className={`w-full py-4 rounded-2xl text-sm font-bold shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 border ${
              tickets >= 1
                ? "bg-white/15 hover:bg-white/25 text-white border-white/20 cursor-pointer"
                : "bg-white/5 text-slate-500 border-white/5 cursor-not-allowed"
            }`}
          >
            <span>{t("อธิษฐาน 1 ครั้ง")}</span>
            <span className="text-xs opacity-75 font-normal">(🎫 1 {t("ใบ")})</span>
          </button>
        )}

        {/* 10 Pull Button with 4★+ Guaranteed Badge */}
        <button
          type="button"
          onClick={() => onPull(10, false)}
          disabled={tickets < 10}
          className={`relative w-full py-4 rounded-2xl font-black text-sm shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 border ${
            tickets >= 10
              ? "bg-linear-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 border-amber-300 shadow-amber-500/20 cursor-pointer"
              : "bg-white/5 text-slate-500 border-white/5 cursor-not-allowed"
          }`}
        >
          <span className="absolute -top-2.5 right-4 bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md border border-purple-300">
            {t("การันตี 4★+ แน่นอน")}
          </span>
          <span>{t("อธิษฐาน 10 ครั้งรวด")}</span>
          <span className="text-xs font-semibold opacity-85">(🎫 10 {t("ใบ")})</span>
        </button>
      </div>
    </div>
  );
}
