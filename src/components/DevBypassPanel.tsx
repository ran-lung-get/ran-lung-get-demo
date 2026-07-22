import { useState, useEffect } from "react";
import { Shield, Users, User, ChevronRight, Check, HelpCircle } from "lucide-react";

export function DevBypassPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<string>("customer");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("dev-bypass-role") || "customer";
      setActiveRole(role);
    }
  }, []);

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
      } else if (role === "captain") {
        window.location.href = "/captain";
      } else if (role === "customer") {
        window.location.href = "/customer";
      }
    }
  };

  const roles = [
    { id: "customer", name: "ลูกค้า / สั่งอาหาร (Customer)", icon: User, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    { id: "staff", name: "พนักงานครัว (Kitchen Staff)", icon: Users, color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
    { id: "captain", name: "พนักงานบริการ (Captain)", icon: Users, color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20" },
    { id: "admin", name: "ผู้ดูแลระบบ (Store Admin)", icon: Shield, color: "text-red-400 bg-red-400/10 border-red-400/20" },
    { id: "none", name: "ระบบล็อคอินหลัก (Main Login)", icon: HelpCircle, color: "text-gray-400 bg-gray-400/10 border-gray-400/20" },
  ];

  const currentRoleName = roles.find(r => r.id === activeRole)?.name.split(" (")[0] || "ลูกค้า / สั่งอาหาร";

  return (
    <div className="fixed bottom-6 right-6 z-[99999] font-sans">
      {isOpen ? (
        <div className="w-80 rounded-2xl border border-white/10 bg-[#0f1f2b]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[#fcc14a] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/70">เลือกบทบาทระบบเดโม (Demo Mode)</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-white/40 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-xs"
            >
              ย่อหน้าต่าง
            </button>
          </div>

          {/* Description */}
          <div className="py-2 text-[11px] text-white/50 leading-relaxed">
            เลือกบทบาทผู้ใช้งานเพื่อทดสอบการใช้งานระบบในมุมมองต่างๆ ทุกหน้าสามารถทดลองสั่งและบันทึกออเดอร์จริงได้ทันที
          </div>

          {/* Role List */}
          <div className="mt-1 space-y-2">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = activeRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleChange(role.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer group ${
                    isSelected 
                      ? "bg-white/10 border-[#fcc14a]/40 text-[#fcc14a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                      : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:border-white/10 hover:text-white"
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
          <div className="mt-4 pt-3 border-t border-white/5 text-center">
            <span className="text-[10px] text-[#fcc14a]/75 font-medium tracking-wide">
              สลับมุมมองเดโมได้ตลอดการทดลองใช้ระบบ
            </span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 rounded-full border border-[#fcc14a]/40 bg-[#0f1f2b]/90 px-4 py-3 font-semibold text-white shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105 hover:border-[#fcc14a]/75 active:scale-95 cursor-pointer"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#fcc14a] animate-pulse" />
          <span className="text-xs tracking-wide">
            สลับบทบาทเดโม: <span className="text-[#fcc14a] font-bold">{currentRoleName}</span>
          </span>
        </button>
      )}
    </div>
  );
}
