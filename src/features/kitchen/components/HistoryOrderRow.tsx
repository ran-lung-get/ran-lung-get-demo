import { Utensils, Bike, ShoppingBag, Check } from "lucide-react";
import type { OrderHistory } from "../types";

export function HistoryOrderRow({ order }: { order: OrderHistory }) {
  const isDelivery = order.orderType === "delivery";
  const isTakeaway = order.orderType === "takeaway";

  let typeLabel = "ทานที่ร้าน";
  let detailsText = order.tableNumber || "ไม่ระบุโต๊ะ";
  let typeIcon = <Utensils size={14} />;

  if (isDelivery) {
    typeLabel = "จัดส่งถึงที่";
    detailsText = order.customerName || "คุณลูกค้า";
    typeIcon = <Bike size={14} />;
  } else if (isTakeaway) {
    typeLabel = "รับกลับบ้าน";
    detailsText = order.customerName || "คุณลูกค้า";
    typeIcon = <ShoppingBag size={14} />;
  }

  const itemsSummary = order.items.map((item) => `${item.name.split(" (")[0]} x${item.qty}`).join(", ");

  return (
    <div className="bg-[#fcfbf9] hover:bg-[#f6f3ed] border border-[#ece4d6] rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4 transition shadow-xs">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-[#5a6e7a]/40 bg-[#f8fafc] text-[#5a6e7a] flex items-center justify-center shrink-0 shadow-xs">
          <Check size={20} className="stroke-[3]" />
        </div>

        <div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#5a6e7a] uppercase tracking-wide">
            {typeIcon}
            <span>{typeLabel}</span>
          </div>
          <p className="text-sm font-black text-[#002e47] mt-0.5">
            {detailsText}
          </p>
        </div>
      </div>

      <div className="text-right flex flex-col justify-between items-end min-w-0 max-w-[55%] sm:max-w-[65%]">
        <p className="text-xs font-bold text-[#002e47] truncate w-full text-right" title={itemsSummary}>
          {itemsSummary}
        </p>
        <span className="text-[10px] font-extrabold text-[#5a6e7a] tracking-wider mt-1">
          ออเดอร์ {order.orderNumber}
        </span>
        <span className="text-[10px] font-black text-[#5a6e7a] mt-1 bg-[#5a6e7a]/10 px-2 py-0.5 rounded-lg">
          ยอดรวม: ฿{order.total}
        </span>
      </div>
    </div>
  );
}
