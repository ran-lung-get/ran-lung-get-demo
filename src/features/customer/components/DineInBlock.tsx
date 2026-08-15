import { Utensils } from "lucide-react";
import { BRAND, INK_MUTED, LINEN } from "../constants/colors";

export function DineInBlock({ selectedTable, onOpenPicker }: { selectedTable: string; onOpenPicker: () => void }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full shrink-0" style={{ background: LINEN, color: BRAND }}>
          <Utensils size={18} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-[0.12em]" style={{ color: INK_MUTED }}>
            ทานที่ร้าน
          </p>
          <div className="mt-2">
            <p className="text-sm text-slate-600">เลือกโต๊ะจะทำผ่านผังที่นั่ง (เปิด modal)</p>
            <p className="mt-2 text-sm font-semibold" style={{ color: BRAND }}>
              {selectedTable ? `โต๊ะที่เลือก: ${selectedTable}` : "ยังไม่ได้เลือกโต๊ะ"}
            </p>
            <div className="mt-3">
              <button
                type="button"
                aria-label="เปิดผังที่นั่งเลือกโต๊ะ"
                onClick={onOpenPicker}
                className="px-4 py-2 rounded-full border cursor-pointer active:scale-95 transition-all"
                style={{ borderColor: BRAND, color: BRAND }}
              >
                เปิดผังที่นั่ง
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
