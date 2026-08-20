import { Shield, LayoutDashboard, Users } from "lucide-react";
import type { AdminViewType } from "../types";
import { useLanguage } from "../../../lib/i18n";

export function AdminSidebarContent({
  view,
  setView,
  setSidebarOpen,
}: {
  view: string;
  setView: (v: AdminViewType) => void;
  setSidebarOpen?: (b: boolean) => void;
  handleLogout?: () => void;
  pendingCount?: number;
  onOpenResetModal?: () => void;
}) {
  const { t } = useLanguage();

  const selectTab = (v: AdminViewType) => {
    setView(v);
    if (setSidebarOpen) setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#002e47] text-white">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#fcc14a] border border-white/15">
            <Shield size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <h2 className="font-black text-sm tracking-tight text-white uppercase">
              {t("ระบบจัดการหลังบ้าน")}
            </h2>
            <p className="text-[9px] font-bold text-[#fcc14a] tracking-wider uppercase">
              ADMIN PANEL
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block px-2 mb-2">
          {t("เมนูเจ้าของร้าน")}
        </span>

        <button
          type="button"
          onClick={() => selectTab("dashboard")}
          className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${
            view === "dashboard"
              ? "bg-white/10 text-white font-black border-l-4 border-[#fcc14a]"
              : "text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
          }`}
        >
          <LayoutDashboard
            size={18}
            className={view === "dashboard" ? "text-[#fcc14a]" : "text-white/60"}
          />
          <span className="text-sm">{t("ภาพรวม")}</span>
        </button>

        <button
          type="button"
          onClick={() => selectTab("staff")}
          className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${
            view === "staff"
              ? "bg-white/10 text-white font-black border-l-4 border-[#fcc14a]"
              : "text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
          }`}
        >
          <Users size={18} className={view === "staff" ? "text-[#fcc14a]" : "text-white/60"} />
          <span className="text-sm">{t("จัดการพนักงาน")}</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-white/2 shrink-0">
        <p className="text-[9px] text-white/40 text-center font-semibold">
          DineOS Admin Panel v1.2.0
        </p>
      </div>
    </div>
  );
}


