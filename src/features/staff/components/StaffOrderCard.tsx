import { RotateCcw, Check, Trash2 } from "lucide-react";
import type { OrderHistory } from "../types";
import { useLanguage } from "../../../lib/i18n";

export function StaffOrderCard({
  order,
  advanceOrderStatus,
  regressOrderStatus,
  cancelOrder,
}: {
  order: OrderHistory;
  advanceOrderStatus: (id: string) => void;
  regressOrderStatus: (id: string) => void;
  cancelOrder: (id: string) => void;
}) {
  const { t, tMenu, tTable } = useLanguage();
  const isDineIn = order.orderType === "dine-in";
  const isTakeaway = order.orderType === "takeaway";
  const isDelivery = order.orderType === "delivery";
  let typeBadge = t("ทานที่ร้าน");
  let typeColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
  let borderLeftColor = "border-l-[#fcc14a]";
  if (isTakeaway) {
    typeBadge = t("กลับบ้าน");
    typeColor = "bg-blue-50 text-blue-800 border-blue-200";
    borderLeftColor = "border-l-[#5a6e7a]";
  } else if (isDelivery) {
    typeBadge = t("จัดส่ง");
    typeColor = "bg-amber-50 text-amber-800 border-amber-200";
    borderLeftColor = "border-l-[#002e47]";
  }

  const isCooking = (s: string) => s === "กำลังทำ" || s === "กำลังเตรียม" || s === "preparing";
  const isReady = (s: string) => s === "พร้อมเสิร์ฟ" || s === "ready";
  const isDelivering = (s: string) => s === "กำลังจัดส่ง" || s === "delivering";
  const isWaiting = (s: string) => s === "รอดำเนินการ" || s === "รอรับออเดอร์" || s === "pending";

  let nextBtnText = t("เริ่มทำอาหาร");
  let nextBtnColor = "bg-[#002e47] text-white hover:bg-[#003957]";
  if (isCooking(order.status)) {
    nextBtnText = isDelivery ? t("ทำเสร็จแล้ว") + " · " + t("รอไรเดอร์มารับ") : t("ทำเสร็จแล้ว");
    nextBtnColor = "bg-blue-600 text-white hover:bg-blue-700";
  } else if (isReady(order.status)) {
    if (isDelivery) {
      nextBtnText = t("เริ่มจัดส่ง");
      nextBtnColor = "bg-indigo-600 text-white hover:bg-indigo-700";
    } else {
      nextBtnText = t("ส่งมอบสำเร็จ");
      nextBtnColor = "bg-emerald-600 text-white hover:bg-emerald-700";
    }
  } else if (isDelivering(order.status)) {
    nextBtnText = t("สำเร็จ");
    nextBtnColor = "bg-slate-800 text-white hover:bg-slate-900";
  }

  return (
    <div className={`bg-white border-2 border-l-[6px] border-[#ece4d6] ${borderLeftColor} rounded-2xl p-4 shadow-xs hover:shadow-sm transition relative space-y-3`}>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-black text-[#002e47] text-sm">{order.orderNumber || order.id}</span>
          <span className="text-[10px] text-slate-400 ml-1.5 font-bold">
            {order.date?.includes(" · ") ? order.date.split(" · ")[1] : (order.date || "")}
          </span>
        </div>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${typeColor}`}>
          {typeBadge}
        </span>
      </div>
      <div className="pt-2 border-t border-slate-100">
        <p className="text-[10px] font-bold text-slate-400">{t("รายละเอียดลูกค้า")}:</p>
        <p className="text-xs font-black text-[#002e47] mt-0.5">
          {order.customerName || t("คุณลูกค้า")} {isDineIn && order.tableNumber && `(${tTable(order.tableNumber)})`}
        </p>
      </div>
      <div className="space-y-2">
        {(order.items || []).map((i, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-start text-xs gap-2">
              <span className="font-bold text-slate-800 leading-tight">
                {i?.name ? tMenu(i.name, "name") : t("รายการอาหาร")}
              </span>
              <span className="font-black bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[11px] shrink-0">
                x{i?.qty || 1}
              </span>
            </div>

            {/* Addons display */}
            {Array.isArray(i?.addons) && i.addons.length > 0 && (
              <div className="flex flex-wrap gap-1 pl-1.5">
                {i.addons.map((a: any, aIdx: number) => (
                  <span
                    key={aIdx}
                    className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/90 px-1.5 py-0.5 rounded-md flex items-center gap-0.5"
                  >
                    <span className="text-amber-600 font-extrabold">+</span> {t(a.name) || a.name}
                  </span>
                ))}
              </div>
            )}

            {/* Options & Item Note display */}
            {((i?.options && Object.keys(i.options).length > 0) || i?.note) && (
              <div className="flex flex-wrap gap-1 pl-1.5 text-[10px]">
                {i.options &&
                  Object.entries(i.options).map(([k, v]) => (
                    <span key={k} className="bg-slate-100 text-slate-600 font-semibold px-1.5 py-0.2 rounded">
                      {t(String(v))}
                    </span>
                  ))}
                {i.note && (
                  <span className="text-red-700 font-bold bg-red-50 border border-red-100 px-1.5 py-0.2 rounded">
                    *{i.note}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {order.note && (
        <div className="p-2 bg-red-50/50 border border-red-100 rounded-xl text-[10px] font-black text-red-700">
          💡 {t("หมายเหตุ")}: {order.note}
        </div>
      )}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
        <button
          type="button"
          onClick={() => regressOrderStatus(order.id)}
          disabled={isWaiting(order.status)}
          className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-slate-600 transition disabled:opacity-50"
        >
          <RotateCcw size={13} />
        </button>
        <button
          type="button"
          onClick={() => advanceOrderStatus(order.id)}
          className={`flex-1 py-1.5 rounded-xl text-[11px] font-black tracking-wide shadow-xs transition flex items-center justify-center gap-1 cursor-pointer ${nextBtnColor}`}
        >
          <Check size={11} />
          <span>{nextBtnText}</span>
        </button>
        <button
          type="button"
          onClick={() => cancelOrder(order.id)}
          className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl text-red-600 transition"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}
