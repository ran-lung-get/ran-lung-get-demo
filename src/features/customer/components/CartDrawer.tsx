import { motion } from "motion/react";
import { ShoppingBag, X, Pencil, Trash2, ChevronRight } from "lucide-react";
import { useLanguage } from "../../../lib/i18n";
import type { CartLine } from "../types";
import { BRAND, GOLD, INK_MUTED } from "../constants/colors";

export function CartDrawer({
  cart,
  subtotal,
  onClose,
  onRemove,
  onEdit,
  onCheckout,
}: {
  cart: CartLine[];
  subtotal: number;
  onClose: () => void;
  onRemove: (id: string) => void;
  onEdit: (line: CartLine) => void;
  onCheckout: () => void;
}) {
  const { t, tMenu } = useLanguage();

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
          className="w-full max-w-[420px] rounded-[28px] bg-white shadow-2xl flex flex-col pointer-events-auto max-h-[82vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 pt-4 pb-3.5 border-b border-[#f1ece4] flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-full" style={{ background: "rgba(0,46,71,0.08)", color: BRAND }}>
                <ShoppingBag size={16} />
              </div>
              <h2 className="text-base font-bold" style={{ color: BRAND }}>
                {t("ตะกร้าของคุณ")}
              </h2>
            </div>
            <motion.button
              whileTap={{ scale: 0.85 }}
              aria-label={t("ปิด")}
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors shrink-0 cursor-pointer"
            >
              <X size={15} />
            </motion.button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-3">
            {cart.length === 0 && (
              <div className="text-center py-12">
                <div className="grid h-14 w-14 place-items-center rounded-full mx-auto mb-3" style={{ background: "rgba(0,46,71,0.05)", color: BRAND }}>
                  <ShoppingBag size={24} />
                </div>
                <p className="text-sm font-semibold" style={{ color: INK_MUTED }}>
                  {t("ยังไม่มีรายการในตะกร้า")}
                </p>
              </div>
            )}
            {cart.map((l) => (
              <div key={l.id} className="flex gap-3 bg-[var(--surface)] rounded-2xl p-3 border border-[#ece4d6]/60 items-center">
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
                    {l.addons.length > 0 && ` · ${l.addons.map((a) => t(a.name) || tMenu(a.name, "name")).join(", ")}`}
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

          {/* Footer */}
          {cart.length > 0 && (
            <div className="px-5 pt-3.5 pb-4 border-t border-[#f1ece4] space-y-3 bg-white shrink-0">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium" style={{ color: INK_MUTED }}>{t("ยอดรวม")}</span>
                <span className="font-extrabold text-lg" style={{ color: BRAND }}>
                  ฿{subtotal}
                </span>
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
        </motion.div>
      </div>
    </>
  );
}
