import { useState, useEffect, useRef } from "react";
import { 
  Shield, Users, User, ChevronRight, Check, HelpCircle, X, 
  Sparkles, SlidersHorizontal, Layers, Crown, Wrench, Settings 
} from "lucide-react";

export function DevBypassPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<string>("customer");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("dev-bypass-role") || "customer";
      setActiveRole(role);
    }
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleRoleChange = (role: string) => {
    if (role === "none") {
      localStorage.removeItem("dev-bypass-role");
      setActiveRole("none");
      window.location.href = "/login";
    } else {
      localStorage.setItem("dev-bypass-role", role);
      setActiveRole(role);

      // Auto-navigate to the correct dashboard path
      if (role === "admin") {
        window.location.href = "/admin";
      } else if (role === "staff") {
        window.location.href = "/staff";
      } else if (role === "customer") {
        window.location.href = "/customer";
      }
    }
  };

  const roles = [
    { id: "customer", name: "ลูกค้า / สั่งอาหาร (Customer)", icon: User, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    { id: "staff", name: "พนักงานครัว (Kitchen Staff)", icon: Users, color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
    { id: "admin", name: "ผู้ดูแลระบบ (Store Admin)", icon: Shield, color: "text-red-400 bg-red-400/10 border-red-400/20" },
    { id: "none", name: "ระบบล็อคอินหลัก (Main Login)", icon: HelpCircle, color: "text-gray-400 bg-gray-400/10 border-gray-400/20" },
  ];

  const currentRole = roles.find(r => r.id === activeRole) || roles[0];

  return (
    <div ref={panelRef} className="fixed bottom-6 left-6 z-[99999] font-sans">
      {isOpen ? (
        <div className="w-80 rounded-2xl border border-white/15 bg-[#0f1f2b]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md animate-in fade-in zoom-in-95 slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-white p-1 shadow-xs shrink-0 overflow-hidden flex items-center justify-center">
                <img src="/logoHome.png" alt="Logo" className="max-h-full max-w-full object-contain" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                สลับบทบาทเดโม (Demo Mode)
              </span>
            </div>
            <button
              type="button"
              aria-label="ปิดหน้าต่างสลับบทบาท"
              onClick={() => setIsOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-lg bg-white/5 text-white/60 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Description */}
          <div className="py-2 text-[11px] text-white/55 leading-relaxed">
            เลือกบทบาทเพื่อทดสอบระบบในมุมมองต่างๆ สั่งอาหาร จัดการครัว หรือบริหารระบบ
          </div>

          {/* Role List */}
          <div className="mt-1 space-y-2">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = activeRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleChange(role.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer group ${
                    isSelected
                      ? "bg-[#fcc14a]/15 border-[#fcc14a]/50 text-[#fcc14a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                      : "bg-white/5 border-white/5 text-white/75 hover:bg-white/10 hover:border-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg border ${role.color}`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-sm font-semibold">{role.name}</span>
                  </div>
                  {isSelected ? (
                    <Check size={16} className="text-[#fcc14a]" />
                  ) : (
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-white/40" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="mt-3.5 pt-2.5 border-t border-white/10 text-center">
            <span className="text-[10px] text-[#fcc14a]/80 font-medium tracking-wide">
              สลับมุมมองเดโมได้ตลอดเวลา
            </span>
          </div>
        </div>
      ) : (
        <button
          type="button"
          aria-label="สลับบทบาทเดโม"
          title={`สลับบทบาทเดโม (${currentRole.name.split(" (")[0]})`}
          onClick={() => setIsOpen(true)}
          className="group relative h-12 w-12 rounded-2xl border-2 border-[#fcc14a] bg-white text-[#002e47] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_35px_rgba(252,193,74,0.45)] active:scale-95 cursor-pointer flex items-center justify-center p-2 overflow-visible"
        >
          {/* Active status pulse indicator dot */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fcc14a] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#fcc14a] border-2 border-white shadow-xs" />
          </span>

          <div className="h-full w-full flex items-center justify-center overflow-hidden rounded-lg">
            <img 
              src="/logoHome.png" 
              alt="Logo" 
              className="max-h-full max-w-full object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-110" 
            />
          </div>

          {/* Hover tooltip */}
          <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-xl bg-[#0f1f2b]/95 border border-white/15 px-3 py-1.5 text-xs font-semibold text-white shadow-xl opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
            สลับบทบาท: <span className="text-[#fcc14a] font-bold">{currentRole.name.split(" (")[0]}</span>
          </span>
        </button>
      )}
    </div>
  );
}
