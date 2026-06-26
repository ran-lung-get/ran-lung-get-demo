import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/staff/")({
  component: StaffDashboard,
});

function StaffDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center">
      <div className="p-8 bg-white rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-[#002e47] mb-2">Staff Dashboard</h1>
        <p className="text-gray-500 mb-6">ระบบจัดการออเดอร์สำหรับพนักงาน</p>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl text-left border border-blue-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">ออเดอร์ที่เข้ามาใหม่</h3>
              <p className="text-sm text-blue-600">รอยืนยันการทำ</p>
            </div>
            <span className="bg-blue-600 text-white font-bold py-1 px-3 rounded-full">3</span>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-xl text-left border border-yellow-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-yellow-900">กำลังเตรียมอาหาร</h3>
              <p className="text-sm text-yellow-600">อยู่ในครัว</p>
            </div>
            <span className="bg-yellow-500 text-white font-bold py-1 px-3 rounded-full">1</span>
          </div>
          
          <div className="p-4 bg-green-50 rounded-xl text-left border border-green-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-900">ออเดอร์เสร็จแล้ว</h3>
              <p className="text-sm text-green-600">รอเสิร์ฟ/รอไรเดอร์</p>
            </div>
            <span className="bg-green-600 text-white font-bold py-1 px-3 rounded-full">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
