import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Ticket, Copy, Check, Sparkles, ArrowRight, Tag, Percent } from "lucide-react";
import type { CouponReward } from "../../types/gacha";
import { getRarityConfig } from "./CardItem";
import { useLanguage } from "../../../../lib/i18n";

export function CouponWalletView({
  coupons,
  onUseCoupon,
  onOpenGacha,
}: {
  coupons: CouponReward[];
  onUseCoupon: (coupon: CouponReward) => void;
  onOpenGacha?: () => void;
}) {
  const { t, language } = useLanguage();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (coupons.length === 0) {
    return (
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-12 text-center text-white flex flex-col items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-3">
          <Ticket size={28} />
        </div>
        <h4 className="text-base font-bold text-slate-200">{t("ยังไม่มีคูปองส่วนลดในกระเป๋า")}</h4>
        <p className="text-xs text-slate-400 max-w-sm mt-1 mb-5">
          {language === "th"
            ? "หมุนตู้คำอธิษฐานคูปองลุงเกตุเพื่อลุ้นรับส่วนลด 50%, ฟรีข้าวกะเพราหมูกรอบ, ฟรีไข่ดาว และส่วนลดพิเศษมากมาย!"
            : language === "zh"
            ? "前往龙葛特祈愿池，抽取50%折扣券、免费打抛猪肉饭、爆浆荷包蛋与众多惊喜好礼！"
            : "Wish on Uncle Get's lucky banner for 50% discounts, free signature dishes, and perks!"}
        </p>
        {onOpenGacha && (
          <button
            type="button"
            onClick={onOpenGacha}
            className="px-5 py-2.5 rounded-full bg-linear-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles size={14} />
            <span>{t("ไปหมุนตู้คูปองเลย!")}</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Ticket size={15} className="text-amber-400" />
          <span>
            {t("คูปองของคุณ")} ({coupons.length} {t("ใบ")})
          </span>
        </span>
        <span className="text-[11px] text-slate-400">
          {t("กดใช้เพื่อนำไปเป็นส่วนลดในคำสั่งซื้อได้ทันที")}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {coupons.map((coupon, idx) => {
          const config = getRarityConfig(coupon.rarity);
          const couponName =
            language === "th"
              ? coupon.name
              : language === "zh" && coupon.nameZh
              ? coupon.nameZh
              : coupon.nameEn || coupon.name;
          const couponDesc =
            language === "th"
              ? coupon.description
              : language === "zh" && coupon.descriptionZh
              ? coupon.descriptionZh
              : coupon.descriptionEn || coupon.description;

          return (
            <motion.div
              key={coupon.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`relative rounded-2xl border ${config.borderColor} bg-linear-to-r ${config.bgGradient} p-4 text-white shadow-md flex items-center justify-between gap-3 overflow-hidden`}
            >
              {/* Ticket Edge Decor */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-950 border-r border-white/15" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-950 border-l border-white/15" />

              <div className="flex-1 pl-3 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${config.badgeBg}`}>
                    {config.label}
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono tracking-wider bg-black/40 px-2 py-0.5 rounded-md">
                    {coupon.code}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-white truncate leading-tight">
                  {couponName}
                </h4>
                <p className="text-xs text-amber-300 font-medium mt-0.5">
                  {couponDesc}
                </p>
                {coupon.minSpend && (
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    *{language === "th" ? `เมื่อสั่งซื้อขั้นต่ำ ฿${coupon.minSpend}` : language === "zh" ? `最低消费 ฿${coupon.minSpend}` : `Min. spend ฿${coupon.minSpend}`}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 shrink-0 pr-2">
                <button
                  type="button"
                  onClick={() => onUseCoupon(coupon)}
                  className="px-3.5 py-2 rounded-xl bg-linear-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>{t("ใช้ทันที")}</span>
                  <ArrowRight size={13} />
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-[10px] font-semibold active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check size={11} className="text-emerald-400" />
                      <span className="text-emerald-400">{t("คัดลอกแล้ว")}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      <span>{t("คัดลอกโค้ด")}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
