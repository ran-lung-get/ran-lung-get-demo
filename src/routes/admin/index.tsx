import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, LogOut } from "lucide-react";
import { supabase } from "../../lib/supabase";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center relative p-4">
      
      {/* ── Top Bar ── */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-white shadow-sm border-b border-gray-100 z-10">
        <button 
          onClick={() => navigate({ to: "/customer" })} 
          className="flex items-center gap-2 text-[#002e47] font-semibold bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">ไปหน้าร้านลูกค้า</span>
          <span className="sm:hidden">หน้าร้าน</span>
        </button>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 font-semibold bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">ออกจากระบบ</span>
          <span className="sm:hidden">ออก</span>
        </button>
      </div>

      <div className="p-8 bg-white rounded-2xl shadow-xl max-w-md w-full text-center mt-16">
        <h1 className="text-3xl font-bold text-[#002e47] mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 mb-6">ยินดีต้อนรับสู่หน้าระบบจัดการของเจ้าของร้าน</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl text-left border border-blue-100">
            <h3 className="font-semibold text-blue-900">จัดการพนักงาน</h3>
            <p className="text-sm text-blue-600">เพิ่ม/ลบ สิทธิ์</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl text-left border border-green-100">
            <h3 className="font-semibold text-green-900">ยอดขาย</h3>
            <p className="text-sm text-green-600">สรุปรายได้</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl text-left border border-orange-100">
            <h3 className="font-semibold text-orange-900">เมนูอาหาร</h3>
            <p className="text-sm text-orange-600">แก้ไขราคา/รูป</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl text-left border border-purple-100">
            <h3 className="font-semibold text-purple-900">ตั้งค่า</h3>
            <p className="text-sm text-purple-600">ระบบทั่วไป</p>
          </div>
        </div>
      </div>
    </div>
  );
}
