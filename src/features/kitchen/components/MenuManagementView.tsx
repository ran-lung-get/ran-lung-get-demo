import { useState, useEffect, useMemo } from "react";
import { MENU } from "../../customer/constants/menu";

export function MenuManagementView() {
  const [outOfStockIds, setOutOfStockIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("ran-lung-get-out-of-stock-items");
    if (saved) {
      try {
        setOutOfStockIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse out-of-stock items:", e);
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ran-lung-get-out-of-stock-items" && e.newValue) {
        try {
          setOutOfStockIds(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Sync error in out-of-stock:", err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleStock = (itemId: string) => {
    let updated: string[];
    if (outOfStockIds.includes(itemId)) {
      updated = outOfStockIds.filter((id) => id !== itemId);
    } else {
      updated = [...outOfStockIds, itemId];
    }
    setOutOfStockIds(updated);
    localStorage.setItem("ran-lung-get-out-of-stock-items", JSON.stringify(updated));
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "ran-lung-get-out-of-stock-items",
        newValue: JSON.stringify(updated),
      })
    );
  };

  const categories = [
    { id: "all", label: "ทั้งหมด" },
    { id: "signature", label: "Signature" },
    { id: "main", label: "อาหารจานเดียว" },
    { id: "noodles", label: "เส้น" },
    { id: "rice", label: "ข้าวผัด" },
    { id: "vegetarian", label: "มังสวิรัติ" },
    { id: "drinks", label: "เครื่องดื่ม" },
    { id: "dessert", label: "ของหวาน" },
  ];

  const filteredMenuItems = useMemo(() => {
    return MENU.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          <h2 className="text-lg font-black tracking-tight text-[#002e47]">
            จัดการวัตถุดิบ — เปิด/ปิดเมนูอาหาร
          </h2>
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="ค้นหาชื่อเมนู..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#fcfbf9] border border-[#ece4d6] rounded-2xl px-4 py-2.5 text-sm font-bold text-[#002e47] placeholder-[#5a6e7a]/50 focus:outline-none focus:border-[#002e47]/30 transition shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs tracking-wider transition cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#002e47] text-white shadow-inner"
                  : "bg-slate-100 text-[#5a6e7a] hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMenuItems.length === 0 ? (
          <div className="py-16 text-center text-slate-400 font-bold col-span-full bg-white rounded-3xl border border-[#ece4d6] p-6 shadow-xs">
            ไม่พบเมนูอาหารที่ค้นหา
          </div>
        ) : (
          filteredMenuItems.map((item) => {
            const isOutOfStock = outOfStockIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`bg-white border rounded-3xl p-4 flex gap-4 transition shadow-xs hover:shadow-md relative overflow-hidden ${
                  isOutOfStock ? "border-red-200 bg-red-50/20" : "border-[#ece4d6]"
                }`}
              >
                <div className="h-20 w-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`h-full w-full object-cover transition duration-300 ${
                      isOutOfStock ? "grayscale opacity-50" : ""
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/thai_food_hero.jpg";
                    }}
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-red-600/10 flex items-center justify-center">
                      <span className="bg-red-600 text-white text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-xs">
                        หมด
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center gap-1.5 justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {item.category.toUpperCase()}
                      </span>
                      <span className="text-xs font-black text-[#002e47]">
                        ฿{item.price}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-[#002e47] mt-0.5 truncate" title={item.name}>
                      {item.name}
                    </h3>
                    <p className="text-[10px] font-semibold text-[#5a6e7a] line-clamp-2 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                    <span
                      className={`text-[10px] font-extrabold tracking-wide ${
                        isOutOfStock ? "text-red-500" : "text-emerald-600"
                      }`}
                    >
                      {isOutOfStock ? "● ปิดการขายชั่วคราว" : "● เปิดขายปกติ"}
                    </span>
                    <button
                      type="button"
                      aria-label={`สลับสถานะของ ${item.name}`}
                      onClick={() => toggleStock(item.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isOutOfStock ? "bg-red-500" : "bg-emerald-500"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          isOutOfStock ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
