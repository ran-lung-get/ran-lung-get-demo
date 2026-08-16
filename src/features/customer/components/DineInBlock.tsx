import { Utensils } from "lucide-react";
import { BRAND, INK_MUTED, LINEN } from "../constants/colors";
import { useLanguage } from "../../../lib/i18n";

export function formatTableLabel(label: string, lang: string): string {
  if (!label) return label;
  const walkInMatch = label.toLowerCase().includes("walk-in") || label.includes("หน้าร้าน");
  const numMatch = label.match(/\d+/);
  const tableNum = numMatch ? numMatch[0] : label;

  if (lang === "zh") {
    return walkInMatch ? `${tableNum}号桌 (散客)` : `${tableNum}号桌`;
  }
  if (lang === "en") {
    return walkInMatch ? `Table ${tableNum} (Walk-in)` : `Table ${tableNum}`;
  }
  return walkInMatch ? `โต๊ะ ${tableNum} (Walk-in)` : `โต๊ะ ${tableNum}`;
}

export function DineInBlock({ selectedTable, onOpenPicker }: { selectedTable: string; onOpenPicker: () => void }) {
  const { t, language } = useLanguage();

  const formattedSelectedTable = selectedTable ? formatTableLabel(selectedTable, language) : "";

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full shrink-0" style={{ background: LINEN, color: BRAND }}>
          <Utensils size={18} />
        </div>
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-[0.12em]" style={{ color: INK_MUTED }}>
            {t("ทานที่ร้าน")}
          </p>
          <div className="mt-2">
            <p className="text-sm text-slate-600">{t("เลือกโต๊ะผ่านผังที่นั่งของร้าน")}</p>
            <p className="mt-2 text-sm font-semibold" style={{ color: BRAND }}>
              {selectedTable ? `${t("โต๊ะที่เลือก")}: ${formattedSelectedTable}` : t("ยังไม่ได้เลือกโต๊ะ")}
            </p>
            <div className="mt-3">
              <button
                type="button"
                aria-label={t("เปิดผังที่นั่งเลือกโต๊ะ")}
                onClick={onOpenPicker}
                className="px-4 py-2 rounded-full border cursor-pointer active:scale-95 transition-all"
                style={{ borderColor: BRAND, color: BRAND }}
              >
                {t("เปิดผังที่นั่ง")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
