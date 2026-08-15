import {
  ChefHat,
  RotateCcw,
  LayoutDashboard,
  ClipboardList,
  Bell,
  Home,
} from "lucide-react";

export function KitchenSidebarContent({
  view,
  setView,
  onClose,
  refundCount = 0,
}: {
  view: "kitchen" | "dashboard" | "menu" | "refunds";
  setView: (v: "kitchen" | "dashboard" | "menu" | "refunds") => void;
  onClose?: () => void;
  refundCount?: number;
}) {
  return (
    <div className="flex flex-col h-full bg-[#002e47] text-white select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white border border-white/15 shadow-xs relative overflow-hidden group">
            <ChefHat className="h-5.5 w-5.5 text-[#fcc14a]" />
          </div>
          <div>
            <h2 className="font-black text-sm tracking-tight text-white uppercase">
              ระบบจัดการร้าน
            </h2>
            <p className="text-[10px] font-bold text-[#fcc14a] tracking-wider uppercase">
              หลังบ้านลุงเกตุ
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            aria-label="ปิดเมนูนำทาง"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer md:hidden"
          >
            <RotateCcw size={16} className="rotate-45" />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block px-2">
            เมนูจัดการระบบ
          </span>
          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => {
                setView("kitchen");
                if (onClose) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${
                view === "kitchen"
                  ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]"
                  : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"
              }`}
            >
              <ChefHat size={18} className={view === "kitchen" ? "text-[#fcc14a]" : "text-white/60"} />
              <span className="text-sm">จอจัดการครัว</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setView("dashboard");
                if (onClose) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${
                view === "dashboard"
                  ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]"
                  : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"
              }`}
            >
              <LayoutDashboard size={18} className={view === "dashboard" ? "text-[#fcc14a]" : "text-white/60"} />
              <span className="text-sm">แดชบอร์ด</span>
            </button>
            
            <button
              type="button"
              onClick={() => {
                setView("menu");
                if (onClose) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${
                view === "menu"
                  ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]"
                  : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"
              }`}
            >
              <ClipboardList size={18} className={view === "menu" ? "text-[#fcc14a]" : "text-white/60"} />
              <span className="text-sm">จัดการวัตถุดิบ</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setView("refunds");
                if (onClose) onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${
                view === "refunds"
                  ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]"
                  : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell size={18} className={view === "refunds" ? "text-[#fcc14a]" : "text-white/60"} />
                <span className="text-sm">แจ้งเตือนการยกเลิก</span>
              </div>
              {refundCount > 0 && (
                <span className="bg-red-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full animate-bounce">
                  {refundCount}
                </span>
              )}
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
              <span className="text-sm">สั่งอาหาร (หน้าลูกค้า)</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/10 bg-white/2 shrink-0">
        <p className="text-[9px] text-white/40 text-center font-semibold">
          ระบบจัดการร้านค้า v1.2.0 · ครัวลุงเกตุ
        </p>
      </div>
    </div>
  );
}
