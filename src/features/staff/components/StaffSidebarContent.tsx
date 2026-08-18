import { ChefHat, X, Table, BookOpen, Inbox, Home } from "lucide-react";
import { useLanguage } from "../../../lib/i18n";

export function StaffSidebarContent({
  view,
  setView,
  onClose,
  handleLogout: _handleLogout,
}: {
  view: "kitchen" | "tables" | "menu" | "stock";
  setView: (v: "kitchen" | "tables" | "menu" | "stock") => void;
  onClose?: () => void;
  handleLogout?: () => void;
}) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full bg-[#002e47] text-white">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#fcc14a] border border-white/15">
            <ChefHat size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <h2 className="font-black text-sm tracking-tight text-white uppercase">{t("ระบบจัดการครัว")}</h2>
            <p className="text-[9px] font-bold text-[#fcc14a] tracking-wider uppercase">KITCHEN MONITOR (STAFF)</p>
          </div>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} aria-label={t("ปิด")} className="md:hidden text-white/50 hover:text-white p-1">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block px-2 mb-2">{t("เมนูพนักงาน")}</span>

          <button
            type="button"
            onClick={() => { setView("kitchen"); if (onClose) onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "kitchen"
              ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]"
              : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"
              }`}
          >
            <ChefHat size={18} className={view === "kitchen" ? "text-[#fcc14a]" : "text-white/60"} />
            <span className="text-sm">{t("กระดานครัว (KDS)")}</span>
          </button>

          <button
            type="button"
            onClick={() => { setView("tables"); if (onClose) onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "tables"
              ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]"
              : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"
              }`}
          >
            <Table size={18} className={view === "tables" ? "text-[#fcc14a]" : "text-white/60"} />
            <span className="text-sm">{t("จัดการโต๊ะ")}</span>
          </button>

          <button
            type="button"
            onClick={() => { setView("menu"); if (onClose) onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "menu"
              ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]"
              : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"
              }`}
          >
            <BookOpen size={18} className={view === "menu" ? "text-[#fcc14a]" : "text-white/60"} />
            <span className="text-sm">{t("จัดการเมนู")}</span>
          </button>

          <button
            type="button"
            onClick={() => { setView("stock"); if (onClose) onClose(); }}
            className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "stock"
              ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]"
              : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"
              }`}
          >
            <Inbox size={18} className={view === "stock" ? "text-[#fcc14a]" : "text-white/60"} />
            <span className="text-sm">{t("สต็อกวัตถุดิบ")}</span>
          </button>

          <a
            href="/customer"
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("ran-lung-get-staff-token");
              if (onClose) onClose();
              window.location.href = "/customer";
            }}
            className="w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left text-white/70 hover:text-white hover:bg-white/5 font-medium transition duration-200 cursor-pointer border-l-4 border-transparent"
          >
            <Home size={18} className="text-white/60" />
            <span className="text-sm">{t("สั่งอาหาร (หน้าลูกค้า)")}</span>
          </a>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/10 bg-white/2 shrink-0 flex flex-col gap-2">
        <p className="text-[9px] text-white/40 text-center font-semibold mt-1">
          ระบบจัดการร้านค้า v1.2.0 · ครัวลุงเกตุ
        </p>
      </div>
    </div>
  );
}
