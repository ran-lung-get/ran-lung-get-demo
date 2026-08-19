import { useMemo } from "react";
import {
  ClipboardList,
  DollarSign,
  Users,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import type { OrderHistory, OrderType } from "../types";
import { getTimestampFromOrderId } from "../utils/sound";

const BASE_RECENT_ORDERS: OrderHistory[] = [
  {
    id: "mock_recent_1",
    orderNumber: "DO-2910",
    date: "25 มิ.ย. 2569 · 11:15 น.",
    items: [{ name: "กระเพราหมูกรอบ (ข้าวราด) (เผ็ดกลาง, ไข่ดาวสุกกรอบๆ)", qty: 1, price: 80, image: "" }],
    subtotal: 80,
    delivery: 0,
    total: 80,
    status: "สำเร็จ",
    orderType: "dine-in",
    customerName: "คุณ นนท์",
    tableNumber: "โต๊ะ 3"
  },
  {
    id: "mock_recent_2",
    orderNumber: "DO-2909",
    date: "25 มิ.ย. 2569 · 11:02 น.",
    items: [
      { name: "ผัดซีอิ๊ว (เส้นใหญ่) (ไม่เผ็ด)", qty: 2, price: 70, image: "" },
      { name: "น้ำลำไย", qty: 2, price: 45, image: "" }
    ],
    subtotal: 230,
    delivery: 0,
    total: 230,
    status: "สำเร็จ",
    orderType: "dine-in",
    customerName: "คุณ แพรว",
    tableNumber: "โต๊ะ 1"
  },
  {
    id: "mock_recent_3",
    orderNumber: "DO-2908",
    date: "25 มิ.ย. 2569 · 10:45 น.",
    items: [{ name: "ผัดคะน้าหมูกรอบ (ข้าวราด) (เผ็ดน้อย)", qty: 1, price: 70, image: "" }],
    subtotal: 70,
    delivery: 40,
    total: 110,
    status: "สำเร็จ",
    orderType: "delivery",
    customerName: "คุณ สมยศ",
    tableNumber: ""
  },
  {
    id: "mock_recent_4",
    orderNumber: "DO-2907",
    date: "25 มิ.ย. 2569 · 10:30 น.",
    items: [
      { name: "กระเพราหมูสับ (ข้าวราด) (เผ็ดมาก)", qty: 1, price: 60, image: "" },
      { name: "เฉาก๊วย", qty: 1, price: 40, image: "" }
    ],
    subtotal: 100,
    delivery: 0,
    total: 100,
    status: "สำเร็จ",
    orderType: "takeaway",
    customerName: "คุณ วิชัย",
    tableNumber: ""
  },
  {
    id: "mock_recent_5",
    orderNumber: "DO-2906",
    date: "25 มิ.ย. 2569 · 10:15 น.",
    items: [{ name: "ข้าวผัดกระเทียม (ข้าวผัด) (ไม่เผ็ด)", qty: 1, price: 70, image: "" }],
    subtotal: 70,
    delivery: 0,
    total: 70,
    status: "สำเร็จ",
    orderType: "dine-in",
    customerName: "คุณ พั้นช์",
    tableNumber: "โต๊ะ 5"
  }
];

const BASE_POPULAR_ITEMS = [
  { name: "กระเพราหมูกรอบ (ข้าวราด)", count: 48 },
  { name: "ผัดคะน้าหมูกรอบ (ข้าวราด)", count: 32 },
  { name: "กระเพราหมูสับ (ข้าวราด)", count: 27 },
  { name: "ผัดซีอิ๊ว (เส้นใหญ่)", count: 19 },
  { name: "น้ำลำไย", count: 15 }
];

export function DashboardView({ orders }: { orders: OrderHistory[] }) {
  const totalOrders = 85 + orders.length;
  const totalRevenue = 48500 + orders.reduce((sum, o) => sum + o.total, 0);
  
  const totalCustomers = 32 + useMemo(() => {
    const seen = new Set<string>();
    orders.forEach(o => {
      if (o.customerName) seen.add(o.customerName);
      else if (o.tableNumber) seen.add(o.tableNumber);
    });
    return seen.size;
  }, [orders]);

  const mergedPopularItems = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach(o => {
      o.items.forEach(item => {
        const baseName = item.name.split(" (")[0];
        counts[baseName] = (counts[baseName] || 0) + item.qty;
      });
    });

    const items = BASE_POPULAR_ITEMS.map(b => ({ ...b }));
    Object.entries(counts).forEach(([name, count]) => {
      const match = items.find(i => i.name === name);
      if (match) {
        match.count += count;
      } else {
        items.push({ name, count });
      }
    });

    return items.sort((a, b) => b.count - a.count);
  }, [orders]);

  const topProduct = mergedPopularItems[0]?.name || "กระเพราหมูกรอบ (ข้าวราด)";

  const mergedRecentOrders = useMemo(() => {
    const active = [...orders].sort((a, b) => getTimestampFromOrderId(b.id) - getTimestampFromOrderId(a.id));
    if (active.length >= 5) {
      return active.slice(0, 5);
    }
    const needed = 5 - active.length;
    return [...active, ...BASE_RECENT_ORDERS.slice(0, needed)];
  }, [orders]);

  const mergedRecentCustomers = useMemo(() => {
    const list: { name: string; info: string; time: string; type: OrderType }[] = [];
    const seen = new Set<string>();

    const sortedOrders = [...orders].sort((a, b) => getTimestampFromOrderId(b.id) - getTimestampFromOrderId(a.id));
    sortedOrders.forEach(o => {
      const key = o.customerName || o.tableNumber;
      if (key && !seen.has(key)) {
        seen.add(key);
        list.push({
          name: o.customerName || "คุณลูกค้า",
          info: o.orderType === "dine-in" ? (o.tableNumber || "ทานที่ร้าน") : o.orderType === "takeaway" ? "รับกลับบ้าน" : "เดลิเวอรี่",
          time: o.date.includes(" · ") ? o.date.split(" · ")[1] : "เมื่อสักครู่",
          type: o.orderType || "dine-in"
        });
      }
    });

    const mockCustomers = [
      { name: "คุณ นนท์", info: "โต๊ะ 3", time: "11:15 น.", type: "dine-in" as OrderType },
      { name: "คุณ แพรว", info: "โต๊ะ 1", time: "11:02 น.", type: "dine-in" as OrderType },
      { name: "คุณ สมยศ", info: "เดลิเวอรี่", time: "10:45 น.", type: "delivery" as OrderType },
      { name: "คุณ วิชัย", info: "รับกลับบ้าน", time: "10:30 น.", type: "takeaway" as OrderType },
      { name: "คุณ พั้นช์", info: "โต๊ะ 5", time: "10:15 น.", type: "dine-in" as OrderType },
    ];

    for (const mc of mockCustomers) {
      if (list.length >= 5) break;
      if (!seen.has(mc.name)) {
        seen.add(mc.name);
        list.push(mc);
      }
    }

    return list.slice(0, 5);
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Orders */}
        <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[140px] hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="text-2xl sm:text-3.5xl font-black tracking-tight text-[#002e47]">
              {totalOrders}
            </div>
            <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-500/10 text-amber-600">
              <ClipboardList size={20} className="stroke-[2.5]" />
            </div>
          </div>
          <h3 className="text-[11px] sm:text-xs font-extrabold text-[#5a6e7a] tracking-wider uppercase mt-4">
            ยอดสั่งซื้อสะสม (ออเดอร์)
          </h3>
        </div>

        {/* Total Revenue */}
        <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[140px] hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="text-2xl sm:text-3.5xl font-black tracking-tight text-[#002e47]">
              ฿{new Intl.NumberFormat("th-TH").format(totalRevenue)}
            </div>
            <div className="p-2 sm:p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600">
              <DollarSign size={20} className="stroke-[2.5]" />
            </div>
          </div>
          <h3 className="text-[11px] sm:text-xs font-extrabold text-[#5a6e7a] tracking-wider uppercase mt-4">
            รายได้สะสมทั้งหมด (บาท)
          </h3>
        </div>

        {/* Total Customers */}
        <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[140px] hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="text-2xl sm:text-3.5xl font-black tracking-tight text-[#002e47]">
              {totalCustomers}
            </div>
            <div className="p-2 sm:p-2.5 rounded-2xl bg-blue-500/10 text-blue-600">
              <Users size={20} className="stroke-[2.5]" />
            </div>
          </div>
          <h3 className="text-[11px] sm:text-xs font-extrabold text-[#5a6e7a] tracking-wider uppercase mt-4">
            ลูกค้าสะสมทั้งหมด (คน)
          </h3>
        </div>

        {/* Popular Menu */}
        <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[140px] hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="text-sm sm:text-base font-black tracking-tight text-[#002e47] line-clamp-2 max-w-[85%] leading-snug">
              {topProduct}
            </div>
            <div className="p-2 sm:p-2.5 rounded-2xl bg-yellow-500/10 text-yellow-600 shrink-0">
              <TrendingUp size={20} className="stroke-[2.5]" />
            </div>
          </div>
          <h3 className="text-[11px] sm:text-xs font-extrabold text-[#5a6e7a] tracking-wider uppercase mt-4">
            เมนูยอดนิยมอันดับ 1
          </h3>
        </div>
      </div>

      {/* Charts & Recent Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={20} className="text-[#002e47] stroke-[2.5]" />
            <h2 className="text-base font-black tracking-tight text-[#002e47]">
              5 อันดับเมนูขายดีที่สุด
            </h2>
          </div>
          
          <div className="space-y-5">
            {mergedPopularItems.slice(0, 5).map((item, index) => {
              const maxCount = mergedPopularItems[0]?.count || 1;
              const pct = (item.count / maxCount) * 100;
              
              let medalColor = "";
              if (index === 0) medalColor = "bg-[#fcc14a] text-[#002e47]";
              else if (index === 1) medalColor = "bg-slate-200 text-slate-700";
              else if (index === 2) medalColor = "bg-amber-600/20 text-amber-800";
              else medalColor = "bg-slate-100 text-slate-500";

              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${medalColor}`}>
                        {index + 1}
                      </span>
                      <span className="font-extrabold text-[#002e47] truncate">{item.name}</span>
                    </div>
                    <span className="font-black text-[#002e47] bg-slate-100 px-2 py-0.5 rounded-lg text-xs shrink-0">
                      {item.count} จาน
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-550"
                      style={{
                        width: `${pct}%`,
                        background: index === 0 ? "#002e47" : "#5a6e7a"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-xs">
            <h2 className="text-base font-black tracking-tight text-[#002e47] mb-4">
              5 ออเดอร์ล่าสุด
            </h2>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                <thead>
                  <tr className="border-b border-slate-100 text-[#5a6e7a] font-bold">
                    <th className="py-2.5 font-bold">ออเดอร์</th>
                    <th className="py-2.5 font-bold">เวลา</th>
                    <th className="py-2.5 font-bold">ประเภท</th>
                    <th className="py-2.5 font-bold text-right">ยอดรวม</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                  {mergedRecentOrders.map((o) => {
                    const typeLabel = o.orderType === "dine-in" 
                      ? (o.tableNumber || "ทานที่ร้าน") 
                      : o.orderType === "delivery" 
                        ? "เดลิเวอรี่" 
                        : "กลับบ้าน";
                    
                    const typeColor = o.orderType === "dine-in"
                      ? "text-amber-600 bg-amber-50"
                      : o.orderType === "delivery"
                        ? "text-blue-600 bg-blue-50"
                        : "text-purple-600 bg-purple-50";

                    return (
                      <tr key={o.id} className="hover:bg-slate-50/50">
                        <td className="py-3 font-extrabold text-[#002e47]">
                          {o.orderNumber}
                        </td>
                        <td className="py-3 text-slate-500 text-[11px] sm:text-xs">
                          {o.date.includes(" · ") ? o.date.split(" · ")[1] : o.date}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${typeColor}`}>
                            {typeLabel}
                          </span>
                        </td>
                        <td className="py-3 text-right font-black text-[#002e47]">
                          ฿{o.total}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-xs">
            <h2 className="text-base font-black tracking-tight text-[#002e47] mb-4">
              5 รายชื่อลูกค้าล่าสุด
            </h2>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                <thead>
                  <tr className="border-b border-slate-100 text-[#5a6e7a] font-bold">
                    <th className="py-2.5 font-bold">ชื่อลูกค้า</th>
                    <th className="py-2.5 font-bold">ช่องทาง/โต๊ะ</th>
                    <th className="py-2.5 font-bold text-right">เวลาเข้าชม</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                  {mergedRecentCustomers.map((c, idx) => {
                    const typeColor = c.type === "dine-in"
                      ? "text-amber-600 bg-amber-50"
                      : c.type === "delivery"
                        ? "text-blue-600 bg-blue-50"
                        : "text-purple-600 bg-purple-50";

                    return (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3 font-extrabold text-[#002e47]">
                          {c.name}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${typeColor}`}>
                            {c.info}
                          </span>
                        </td>
                        <td className="py-3 text-right text-slate-500 text-[11px] sm:text-xs">
                          {c.time}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
