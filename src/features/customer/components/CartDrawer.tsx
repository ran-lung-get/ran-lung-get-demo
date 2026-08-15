import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  X,
  Pencil,
  Trash2,
  ChevronRight,
  Ticket,
  Sparkles,
  Check,
  Star,
} from "lucide-react";
import { useLanguage } from "../../../lib/i18n";
import type { CartLine, ActiveCoupon } from "../types";
import { BRAND, GOLD, INK_MUTED } from "../constants/colors";

export function CartDrawer({
  cart,
  subtotal,
  activeCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onClose,
  onRemove,
  onEdit,
  onCheckout,
}: {
  cart: CartLine[];
  subtotal: number;
  activeCoupon?: ActiveCoupon | null;
  onApplyCoupon?: (coupon: ActiveCoupon) => void;
  onRemoveCoupon?: () => void;
  onClose: () => void;
  onRemove: (id: string) => void;
  onEdit: (line: CartLine) => void;
  onCheckout: () => void;
}) {
  const { t, tMenu } = useLanguage();
  const [showCouponPicker, setShowCouponPicker] = useState(false);
  const [myCoupons, setMyCoupons] = useState<ActiveCoupon[]>([]);

  // Load saved coupons from user's wallet
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ran-lung-get-my-coupons");
      if (saved) {
        setMyCoupons(JSON.parse(saved));
      }
    } catch {}
  }, [showCouponPicker]);

  // Calculate discount from active gacha coupon
  const discountVal = activeCoupon
    ? activeCoupon.discountPercent
      ? Math.round((subtotal * activeCoupon.discountPercent) / 100)
      : activeCoupon.discountAmount || 0
    : 0;

  const finalTotal = Math.max(0, subtotal - discountVal);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs z-40"
      />

      {/* Centered Modal Container */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          aria-label={t("ตะกร้าของคุณ")}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="w-full max-w-[420px] rounded-[28px] bg-white shadow-2xl flex flex-col pointer-events-auto max-h-[85vh] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 pt-4 pb-3.5 border-b border-[#f1ece4] flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-2.5">
              <div
                className="grid h-8 w-8 place-items-center rounded-full"
                style={{ background: "rgba(0,46,71,0.08)", color: BRAND }}
              >
                <ShoppingBag size={16} />
              </div>
              <h2 className="font-extrabold text-base" style={{ color: BRAND }}>
                {t("ตะกร้าของคุณ")}
              </h2>
            </div>
            <button
              type="button"
              aria-label={t("ปิด")}
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-sm font-medium">
                {t("ยังไม่มีรายการในตะกร้า")}
              </div>
            )}
            {cart.map((l) => (
              <div
                key={l.id}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-[#f1ece4] shadow-xs"
              >
                <img
                  src={encodeURI(String(l.image))}
                  alt={tMenu(l.name, "name")}
                  className="h-16 w-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate" style={{ color: BRAND }}>
                    {tMenu(l.name, "name")}
                  </h3>
                  <p className="text-xs mt-0.5 line-clamp-2" style={{ color: INK_MUTED }}>
                    × {l.qty}
                    {l.addons.length > 0 &&
                      ` · ${l.addons.map((a) => t(a.name) || tMenu(a.name, "name")).join(", ")}`}
                    {l.note && ` · "${l.note}"`}
                  </p>
                  <p className="text-sm font-bold mt-1" style={{ color: BRAND }}>
                    ฿{l.price * l.qty}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    type="button"
                    aria-label={`${t("แก้ไข")} ${tMenu(l.name, "name")}`}
                    onClick={() => onEdit(l)}
                    className="grid h-8 w-8 place-items-center rounded-full transition active:scale-90 cursor-pointer shadow-xs"
                    style={{ background: "rgba(0,46,71,0.06)", color: BRAND }}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    type="button"
                    aria-label={`${t("ลบ")} ${tMenu(l.name, "name")}`}
                    onClick={() => onRemove(l.id)}
                    className="grid h-8 w-8 place-items-center rounded-full transition active:scale-90 cursor-pointer shadow-xs"
                    style={{ background: "#fee2e2", color: "#dc2626" }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Gacha Coupon Applied / Selector Banner */}
          {cart.length > 0 && (
            <div className="px-4 py-2.5 bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-amber-500/15 border-t border-amber-300/40">
              {activeCoupon ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <Ticket size={16} className="text-amber-600 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-black text-amber-900 truncate">
                        {activeCoupon.name}
                      </p>
                      <p className="text-[10px] text-amber-700">
                        ลดทันที {discountVal} บาท ({activeCoupon.code})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {onApplyCoupon && myCoupons.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setShowCouponPicker(true)}
                        className="text-[10px] font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-full hover:bg-amber-200 cursor-pointer"
                      >
                        เปลี่ยน
                      </button>
                    )}
                    {onRemoveCoupon && (
                      <button
                        type="button"
                        onClick={onRemoveCoupon}
                        className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer"
                      >
                        ยกเลิก
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCouponPicker(true)}
                  className="w-full flex items-center justify-between text-xs font-bold text-amber-900 hover:opacity-80 transition cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <Ticket size={15} className="text-amber-600" />
                    <span>
                      {myCoupons.length > 0
                        ? `เลือกใช้คูปองส่วนลดกาชา (${myCoupons.length} ใบ)`
                        : "ใส่โค้ด / เลือกคูปองส่วนลด"}
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-amber-700" />
                </button>
              )}
            </div>
          )}

          {/* Footer */}
          {cart.length > 0 && (
            <div className="px-5 pt-3.5 pb-4 border-t border-[#f1ece4] space-y-3 bg-white shrink-0">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{t("ยอดรวมอาหาร")}</span>
                  <span className="font-semibold">฿{subtotal}</span>
                </div>

                {discountVal > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-600 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles size={12} /> {t("ส่วนลดคูปอง")}
                    </span>
                    <span>-฿{discountVal}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm pt-1 border-t border-slate-100">
                  <span className="font-bold text-slate-700">{t("ยอดชำระ")}</span>
                  <span className="font-black text-xl" style={{ color: BRAND }}>
                    ฿{finalTotal}
                  </span>
                </div>
              </div>

              <button
                type="button"
                aria-label={t("ดำเนินการสั่งซื้อ")}
                onClick={onCheckout}
                className="w-full h-12 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 shadow-md cursor-pointer"
                style={{ background: BRAND, color: GOLD }}
              >
                <span>{t("ดำเนินการสั่งซื้อ")}</span>
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Coupon Picker Modal Overlay */}
          <AnimatePresence>
            {showCouponPicker && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute inset-0 bg-white z-50 flex flex-col"
              >
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ticket size={18} className="text-amber-500" />
                    <h3 className="font-black text-sm" style={{ color: BRAND }}>
                      คูปองส่วนลดของฉัน
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCouponPicker(false)}
                    className="grid h-8 w-8 place-items-center rounded-full hover:bg-slate-100 text-slate-400 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                  {myCoupons.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      <p>{t("ยังไม่มีคูปองในกระเป๋าของคุณ")}</p>
                      <p className="mt-1">{t("หมุนตู้คำอธิษฐานกาชาเพื่อลุ้นรับคูปองเด็ดๆ!")}</p>
                    </div>
                  ) : (
                    myCoupons.map((coupon, i) => {
                      const isSelected = activeCoupon?.id === coupon.id;
                      return (
                        <div
                          key={coupon.id + i}
                          onClick={() => {
                            if (onApplyCoupon) {
                              onApplyCoupon(coupon);
                            }
                            setShowCouponPicker(false);
                          }}
                          className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition active:scale-98 ${
                            isSelected
                              ? "bg-amber-50/60 border-amber-400"
                              : "bg-white border-slate-200 hover:border-amber-300"
                          }`}
                        >
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900 border border-amber-400/40">
                                {coupon.rarity}★
                              </span>
                              <h4 className="font-extrabold text-xs text-slate-900 truncate">
                                {coupon.name}
                              </h4>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                              {coupon.description}
                            </p>
                          </div>

                          <button
                            type="button"
                            className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition ${
                              isSelected
                                ? "bg-[#002e47] text-[#fcc14a]"
                                : "bg-amber-500 text-white"
                            }`}
                          >
                            {isSelected ? "กำลังใช้" : "ใช้คูปอง"}
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
