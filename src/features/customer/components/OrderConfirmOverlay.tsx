import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Pencil, Trash2, Phone, CreditCard, Ticket, Sparkles } from "lucide-react";
import { useLanguage } from "../../../lib/i18n";
import type { CartLine, ActiveCoupon } from "../types";
import { BRAND, GOLD, INK_MUTED } from "../constants/colors";

function Row({
  label,
  value,
  bold,
  color,
}: {
  label: string;
  value: string;
  bold?: boolean;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span style={{ color: color || (bold ? BRAND : INK_MUTED), fontWeight: bold ? 600 : 400 }}>
        {label}
      </span>
      <span
        className={bold ? "text-lg" : ""}
        style={{ color: color || BRAND, fontWeight: bold ? 700 : 500 }}
      >
        {value}
      </span>
    </div>
  );
}

export function OrderConfirmOverlay({
  cart,
  subtotal,
  deliveryFee,
  activeCoupon,
  onBack,
  onRemove,
  onEdit,
  onProceed,
}: {
  cart: CartLine[];
  subtotal: number;
  deliveryFee: number;
  activeCoupon?: ActiveCoupon | null;
  onBack: () => void;
  onRemove: (id: string) => void;
  onEdit: (line: CartLine) => void;
  onProceed: () => void;
}) {
  const { t, tMenu } = useLanguage();
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");

  const discountVal = activeCoupon
    ? activeCoupon.discountPercent
      ? Math.round((subtotal * activeCoupon.discountPercent) / 100)
      : activeCoupon.discountAmount || 0
    : 0;

  const grand = Math.max(0, subtotal - discountVal) + deliveryFee;

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="absolute inset-0 z-40 bg-[var(--surface)] overflow-y-auto no-scrollbar pb-12"
      >
        <div className="w-full" style={{ background: BRAND, color: "white" }}>
          <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              aria-label="ย้อนกลับ"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20 transition"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-lg font-bold">{t("สรุปคำสั่งซื้อ")}</h1>
            <div className="w-10" />
          </div>
        </div>
        <div className="max-w-md mx-auto px-5 mt-16 text-center text-slate-400">
          <p className="text-sm font-medium">{t("ยังไม่มีรายการในตะกร้า")}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="absolute inset-0 z-40 bg-[var(--surface)] overflow-y-auto no-scrollbar pb-12"
    >
      <div className="w-full sticky top-0 z-10 shadow-xs" style={{ background: BRAND, color: "white" }}>
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="ย้อนกลับ"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-lg font-bold">{t("สรุปคำสั่งซื้อ")}</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-5 mt-4 space-y-4">
        {cart.map((l) => (
          <div key={l.id} className="bg-white rounded-2xl p-4 shadow-xs">
            <div className="flex gap-3">
              <img
                src={encodeURI(String(l.image))}
                alt={tMenu(l.name, "name")}
                className="h-16 w-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-sm truncate" style={{ color: BRAND }}>
                    {tMenu(l.name, "name")}
                  </h3>
                  <span className="font-bold text-sm" style={{ color: BRAND }}>
                    ฿{l.price * l.qty}
                  </span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: INK_MUTED }}>
                  {t("จำนวน")}: {l.qty}
                </p>
                {l.addons.length > 0 && (
                  <p className="text-xs mt-0.5" style={{ color: INK_MUTED }}>
                    {t("ตัวเลือกเสริม")}: {l.addons.map((a) => t(a.name) || tMenu(a.name, "name")).join(", ")}
                  </p>
                )}
                {l.note && (
                  <p className="text-xs mt-0.5 italic" style={{ color: INK_MUTED }}>
                    "{l.note}"
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(l)}
                className="flex-1 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer"
                style={{ background: "rgba(0,46,71,0.06)", color: BRAND }}
              >
                <Pencil size={14} /> {t("แก้ไขรายการ")}
              </button>
              <button
                type="button"
                onClick={() => onRemove(l.id)}
                className="flex-1 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer"
                style={{ background: "#fee2e2", color: "#dc2626" }}
              >
                <Trash2 size={14} /> {t("ลบรายการ")}
              </button>
            </div>
          </div>
        ))}

        {/* Gacha Coupon Applied Badge */}
        {activeCoupon && (
          <div className="bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-amber-500/15 border border-amber-300/60 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket size={18} className="text-amber-600 shrink-0" />
              <div>
                <p className="text-xs font-black text-amber-950">{activeCoupon.name}</p>
                <p className="text-[11px] text-amber-800">{activeCoupon.description}</p>
              </div>
            </div>
            <span className="text-xs font-black text-emerald-600 shrink-0 bg-white px-2 py-1 rounded-full shadow-xs">
              -฿{discountVal}
            </span>
          </div>
        )}

        <div className="bg-white rounded-2xl p-4 shadow-xs space-y-2.5">
          <h3 className="font-semibold mb-2" style={{ color: BRAND }}>
            {t("สรุปคำสั่งซื้อ")}
          </h3>
          <Row label={t("ยอดรวมอาหาร")} value={`฿${subtotal}`} />
          {discountVal > 0 && (
            <Row
              label="ส่วนลดคูปองกาชา"
              value={`-฿${discountVal}`}
              color="#059669"
            />
          )}
          <Row label={t("ค่าจัดส่ง")} value={`฿${deliveryFee}`} />
          <div className="border-t pt-2.5 mt-2.5" style={{ borderColor: "#f1ece4" }}>
            <Row label={t("รวมทั้งหมด")} value={`฿${grand}`} bold />
          </div>

          {/* Ticket Reward Preview */}
          <div className="mt-3 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-black">
            <Ticket size={15} className="text-amber-600 shrink-0" />
            <span>
              {t("สั่งซื้อออเดอร์นี้ รับตั๋วสุ่มกาชาฟรี")} +{Math.max(1, Math.floor(grand / 60))} {t("ใบ")}! 🎫
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-xs">
          <label
            htmlFor="customer-phone"
            className="text-sm font-semibold flex items-center gap-2"
            style={{ color: BRAND }}
          >
            <Phone size={14} /> {t("เบอร์โทรสำหรับติดต่อ")}
          </label>
          <input
            id="customer-phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
              setErr("");
            }}
            placeholder="0XX-XXX-XXXX"
            className="mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2"
            style={{ borderColor: err ? "#ef4444" : "#ece4d6", color: BRAND }}
          />
          {err && <p className="text-xs text-red-500 mt-1">{err}</p>}

          <div className="pb-8 mt-4">
            <button
              type="button"
              onClick={() => {
                if (phone.length < 10) {
                  setErr(t("กรุณากรอกเบอร์โทรให้ครบ 10 หลัก"));
                  return;
                }
                onProceed();
              }}
              className="w-full h-14 rounded-full font-bold text-white shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, #001f30 100%)`,
              }}
            >
              <CreditCard size={18} />
              <span>{t("ดำเนินการชำระเงิน")} · ฿{grand.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
