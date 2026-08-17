import type { OrderHistory } from "../types";

export function StaffHistoryOrderRow({ order }: { order: OrderHistory }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex justify-between items-center text-xs">
      <div>
        <span className="font-black text-[#002e47]">{order.orderNumber || order.id}</span>
        <span className="text-[10px] text-slate-400 ml-1.5">{order.date || ""}</span>
        <p className="text-[11px] text-slate-500 mt-0.5 truncate max-w-sm">
          {(order.items || []).map((i) => `${i?.name || "รายการ"} x${i?.qty || 1}`).join(", ")}
        </p>
      </div>
      <div className="text-right shrink-0">
        <span className="font-black block text-[#002e47]">฿{order.total || 0}</span>
        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-black">สำเร็จ</span>
      </div>
    </div>
  );
}
