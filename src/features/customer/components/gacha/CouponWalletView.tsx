import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Ticket,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Trash2,
  RefreshCw,
  AlertTriangle,
  Search,
} from "lucide-react";
import type { CouponReward } from "../../types/gacha";
import { getRarityConfig } from "./CardItem";
import { getCouponRecycleTicketValue } from "../../hooks/useGachaSystem";
import { useLanguage } from "../../../../lib/i18n";
import { playTrashSound, playRecycleSound } from "../../utils/gachaAudio";

export function CouponWalletView({
  coupons,
  onUseCoupon,
  onOpenGacha,
  onDeleteCoupon,
  onRecycleCoupon,
  onClearAllCoupons,
  onRecycleAllCoupons,
}: {
  coupons: CouponReward[];
  onUseCoupon: (coupon: CouponReward) => void;
  onOpenGacha?: () => void;
  onDeleteCoupon?: (couponId: string) => void;
  onRecycleCoupon?: (coupon: CouponReward) => void;
  onClearAllCoupons?: () => void;
  onRecycleAllCoupons?: (couponIds?: string[]) => void;
}) {
  const { t, language } = useLanguage();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "discount_percent" | "free_item" | "delivery">("all");
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "recycle" | "trash" | "copy" } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const showToast = (text: string, type: "recycle" | "trash" | "copy") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 2400);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(t("คัดลอกแล้ว") + ` (${code})`, "copy");
  };

  const handleDeleteOne = (coupon: CouponReward) => {
    playTrashSound();
    setDeletingId(coupon.id);
    setTimeout(() => {
      onDeleteCoupon?.(coupon.id);
      setDeletingId(null);
      showToast(t("ลบคูปองสำเร็จ"), "trash");
    }, 200);
  };

  const handleRecycleOne = (coupon: CouponReward) => {
    playRecycleSound();
    setDeletingId(coupon.id);
    const tickets = getCouponRecycleTicketValue(coupon.rarity || 3);
    setTimeout(() => {
      onRecycleCoupon?.(coupon);
      setDeletingId(null);
      showToast(`♻️ ${t("แลกคูปองสำเร็จ!")} +${tickets} 🎫`, "recycle");
    }, 200);
  };

  const handleRecycleAll = () => {
    if (coupons.length === 0) return;
    playRecycleSound();
    const totalTickets = coupons.reduce(
      (sum, c) => sum + getCouponRecycleTicketValue(c.rarity || 3),
      0
    );
    onRecycleAllCoupons?.();
    showToast(`♻️ ${t("แลกคูปองสำเร็จ!")} +${totalTickets} 🎫`, "recycle");
  };

  const handleConfirmClearAll = () => {
    playTrashSound();
    setShowConfirmClear(false);
    onClearAllCoupons?.();
    showToast(t("ล้างคูปองทั้งหมดแล้ว"), "trash");
  };

  // Filter and search coupons
  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      // Filter by type
      if (filterType === "discount_percent" && coupon.type !== "discount_percent") return false;
      if (filterType === "free_item" && coupon.type !== "free_item") return false;
      if (filterType === "delivery" && coupon.type !== "delivery_free") return false;

      // Filter by search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const name = (coupon.name || "").toLowerCase();
        const desc = (coupon.description || "").toLowerCase();
        const code = (coupon.code || "").toLowerCase();
        return name.includes(q) || desc.includes(q) || code.includes(q);
      }

      return true;
    });
  }, [coupons, filterType, searchQuery]);

  // Calculate total recyclable tickets for visible coupons
  const totalVisibleRecycleTickets = useMemo(() => {
    return coupons.reduce((sum, c) => sum + getCouponRecycleTicketValue(c.rarity || 3), 0);
  }, [coupons]);

  if (coupons.length === 0) {
    return (
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 p-10 sm:p-12 text-center text-white flex flex-col items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-3">
          <Ticket size={28} />
        </div>
        <h4 className="text-base font-bold text-slate-200">{t("ยังไม่มีคูปองส่วนลดในกระเป๋า")}</h4>
        <p className="text-xs text-slate-400 max-w-sm mt-1 mb-5">
          {language === "th"
            ? "หมุนตู้คำอธิษฐานคูปอง DineOS เพื่อลุ้นรับส่วนลด 50%, ฟรีข้าวกะเพราหมูกรอบ, ฟรีไข่ดาว และส่วนลดพิเศษมากมาย!"
            : language === "zh"
            ? "前往 DineOS 祈愿池，抽取50%折扣券、免费打抛猪肉饭、爆浆荷包蛋与众多惊喜好礼！"
            : "Wish on DineOS's lucky banner for 50% discounts, free signature dishes, and perks!"}
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
      {/* Toast Feedback Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl shadow-2xl border text-xs font-black flex items-center gap-2 backdrop-blur-md ${
              toastMessage.type === "recycle"
                ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-300 shadow-emerald-500/20"
                : toastMessage.type === "trash"
                ? "bg-red-950/90 border-red-500/40 text-red-300 shadow-red-500/20"
                : "bg-slate-900/90 border-amber-400/40 text-amber-300 shadow-amber-500/20"
            }`}
          >
            {toastMessage.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header & Batch Actions Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
            <Ticket size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-white">{t("คูปองของคุณ")}</h3>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {coupons.length} {t("ใบ")}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-light">
              {t("กดใช้เพื่อรับส่วนลด หรือแลกเป็นตั๋วสุ่มกาชาได้")}
            </p>
          </div>
        </div>

        {/* Action Buttons: Recycle All & Clear All */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          {/* Recycle All Button */}
          {onRecycleAllCoupons && (
            <button
              type="button"
              onClick={handleRecycleAll}
              title={t("แลกคูปองทั้งหมดเป็นตั๋วสุ่ม")}
              className="px-3 py-1.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-[11px] font-bold shadow-md shadow-emerald-950/40 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 border border-emerald-400/30"
            >
              <RefreshCw size={12} className="animate-spin-slow" />
              <span>{t("แลกทั้งหมด")}</span>
              <span className="bg-black/30 px-1.5 py-0.2 rounded-md text-[10px] text-emerald-200 font-mono">
                +{totalVisibleRecycleTickets} 🎫
              </span>
            </button>
          )}

          {/* Clear All / Trash Bin Button */}
          {onClearAllCoupons && (
            <button
              type="button"
              onClick={() => setShowConfirmClear(true)}
              title={t("ล้างคูปองทั้งหมด")}
              className="px-2.5 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 text-[11px] font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1"
            >
              <Trash2 size={13} className="text-red-400" />
              <span className="hidden sm:inline">{t("ล้างทั้งหมด")}</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === "th" ? "ค้นหาชื่อคูปองหรือโค้ดส่วนลด..." : language === "zh" ? "搜索卡券名称或代码..." : "Search coupon name or code..."}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400/50 transition"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: "all", label: t("คูปองทั้งหมด") },
            { id: "discount_percent", label: "ลด %" },
            { id: "free_item", label: "ฟรีเมนู" },
            { id: "delivery", label: "ส่งฟรี" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id as any)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition cursor-pointer ${
                filterType === tab.id
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-xs"
                  : "bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Coupons List */}
      {filteredCoupons.length === 0 ? (
        <div className="p-8 text-center bg-white/5 border border-white/10 rounded-2xl text-slate-400 text-xs">
          {language === "th" ? "ไม่พบคูปองที่ตรงกับการค้นหา" : language === "zh" ? "未找到匹配的卡券" : "No matching coupons found"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <AnimatePresence mode="popLayout">
            {filteredCoupons.map((coupon, idx) => {
              const config = getRarityConfig(coupon.rarity);
              const recycleValue = getCouponRecycleTicketValue(coupon.rarity || 3);
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
              const isDeleting = deletingId === coupon.id;

              return (
                <motion.div
                  key={coupon.id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: isDeleting ? 0 : 1, scale: isDeleting ? 0.8 : 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{ delay: idx * 0.03 }}
                  className={`relative rounded-2xl border ${config.borderColor} bg-linear-to-r ${config.bgGradient} p-4 text-white shadow-md flex flex-col justify-between gap-3 overflow-hidden group`}
                >
                  {/* Ticket Edge Decor */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-950 border-r border-white/15" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-950 border-l border-white/15" />

                  {/* Top Content Area */}
                  <div className="pl-3 pr-2 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black ${config.badgeBg}`}>
                          {config.label}
                        </span>
                        <span className="text-[10px] text-slate-300 font-mono tracking-wider bg-black/40 px-2 py-0.5 rounded-md border border-white/5">
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

                    {/* Quick Trash Button on Top-Right */}
                    {onDeleteCoupon && (
                      <button
                        type="button"
                        onClick={() => handleDeleteOne(coupon)}
                        title={t("ลบคูปองนี้")}
                        className="h-7 w-7 rounded-lg bg-black/30 hover:bg-red-500/30 text-slate-400 hover:text-red-300 border border-white/10 hover:border-red-500/40 flex items-center justify-center transition active:scale-90 cursor-pointer shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>

                  {/* Bottom Action Buttons Bar */}
                  <div className="pl-3 pr-2 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    {/* Copy Code & Recycle Button */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopy(coupon.code)}
                        className="px-2.5 py-1.5 rounded-lg bg-black/30 hover:bg-white/10 text-slate-300 hover:text-white text-[10px] font-semibold active:scale-95 transition cursor-pointer flex items-center gap-1 border border-white/10"
                      >
                        {copiedCode === coupon.code ? (
                          <>
                            <Check size={11} className="text-emerald-400" />
                            <span className="text-emerald-400 font-bold">{t("คัดลอกแล้ว")}</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>{t("คัดลอก")}</span>
                          </>
                        )}
                      </button>

                      {/* Recycle Single Coupon for Tickets */}
                      {onRecycleCoupon && (
                        <button
                          type="button"
                          onClick={() => handleRecycleOne(coupon)}
                          title={`${t("แลกคูปองเป็นตั๋วสุ่ม")} (+${recycleValue} 🎫)`}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold active:scale-95 transition cursor-pointer flex items-center gap-1"
                        >
                          <RefreshCw size={10} />
                          <span>แลก +{recycleValue} 🎫</span>
                        </button>
                      )}
                    </div>

                    {/* Apply Button */}
                    <button
                      type="button"
                      onClick={() => onUseCoupon(coupon)}
                      className="px-3.5 py-1.5 rounded-xl bg-linear-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <span>{t("ใช้ทันที")}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Confirm Clear All Dialog Modal */}
      <AnimatePresence>
        {showConfirmClear && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmClear(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-sm rounded-3xl bg-slate-900 border border-red-500/30 p-6 text-white shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <h4 className="text-base font-black text-white">{t("ยืนยันการลบคูปองทั้งหมด")}</h4>
                  <p className="text-xs text-slate-400">
                    {t("คุณต้องการลบคูปองทั้งหมดในกระเป๋าใช่หรือไม่?")}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-2">
                <Sparkles size={14} className="shrink-0" />
                <span>
                  {language === "th"
                    ? `แนะนำ: คุณสามารถกด "แลกทั้งหมด" เพื่อรับ +${totalVisibleRecycleTickets} ตั๋วสุ่มแทนการลบทิ้งได้!`
                    : language === "zh"
                    ? `提示：您也可以点击“全部兑换”以换取 +${totalVisibleRecycleTickets} 张祈愿券！`
                    : `Tip: You can "Recycle All" to get +${totalVisibleRecycleTickets} tickets instead of deleting!`}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmClear(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-300 transition active:scale-95 cursor-pointer"
                >
                  {t("ยกเลิก")}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClearAll}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-black text-white transition shadow-lg shadow-red-950 active:scale-95 cursor-pointer"
                >
                  {t("ยืนยันลบ")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
