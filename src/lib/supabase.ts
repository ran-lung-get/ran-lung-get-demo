import type { Database } from "./supabase.types";

// ── Dev & Bypass Role Helpers ─────────────────────────────────
export function getDevBypassRole(): string | null {
  if (typeof window === "undefined") return "customer";
  const localRole = localStorage.getItem("dev-bypass-role");
  if (localRole && localRole !== "none") return localRole;

  const envRole = import.meta.env.VITE_DEV_BYPASS_ROLE as string;
  if (envRole && envRole !== "none") return envRole;

  // Default fallback based on current path
  const path = window.location.pathname;
  if (path.includes("/admin")) return "admin";
  if (path.includes("/staff")) return "staff";
  if (path.includes("/customer")) return "customer";

  return "customer";
}

export function setDevBypassRole(role: string | null) {
  if (typeof window === "undefined") return;
  if (role) {
    localStorage.setItem("dev-bypass-role", role);
  } else {
    localStorage.removeItem("dev-bypass-role");
  }
}

// Dev mock user generator
const getMockUser = (role: string, customEmail?: string, customName?: string) => {
  const userId = `dev-user-id-${role}`;
  const displayName = customName || `Dev ${role.charAt(0).toUpperCase() + role.slice(1)}`;
  const email = customEmail || `dev-${role}@example.com`;
  return {
    id: userId,
    email,
    role: "authenticated",
    aud: "authenticated",
    app_metadata: { provider: "email" },
    user_metadata: {
      full_name: displayName,
      display_name: displayName,
      role: role,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

// ── LOCAL STORAGE DATABASE ENGINE ────────────────────────────
const LOCAL_STORAGE_DB_KEY = "ran-lung-get-mock-db";
const LOCAL_AUTH_SESSION_KEY = "ran-lung-get-auth-session";

const uuid = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "id_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Real-time listener callbacks
const realtimeCallbacks: Array<(payload: any) => void> = [];

if (typeof window !== "undefined") {
  // Listen for storage events from other tabs
  window.addEventListener("storage", (e) => {
    if (e.key === "ran-lung-get-realtime-event" && e.newValue) {
      try {
        const payload = JSON.parse(e.newValue);
        realtimeCallbacks.forEach((cb) => {
          try { cb(payload); } catch (err) { console.error("Realtime callback error:", err); }
        });
      } catch (err) {
        console.error("Failed to parse realtime event:", err);
      }
    }
  });
}

function triggerRealtimeEvent(table: string, eventType: string, records: any[]) {
  const arr = Array.isArray(records) ? records : [records];
  arr.forEach((rec) => {
    const payload = {
      schema: "public",
      table: table,
      eventType: eventType,
      new: eventType !== "DELETE" ? rec : null,
      old: eventType === "DELETE" ? rec : null,
    };

    if (typeof window !== "undefined") {
      // Trigger local tab listeners
      setTimeout(() => {
        realtimeCallbacks.forEach((cb) => {
          try { cb(payload); } catch (e) { console.error("Realtime callback error:", e); }
        });
      }, 10);

      // Broadcast to other tabs
      try {
        localStorage.setItem("ran-lung-get-realtime-event", JSON.stringify({ ...payload, _ts: Date.now() }));
      } catch {}
    }
  });
}

function seedMockDatabase() {
  const now = new Date().toISOString();

  // 1. Seed Users
  const roles = ["admin", "staff", "captain", "customer"];
  const users = roles.map((r) => ({
    id: `dev-db-id-${r}`,
    auth_user_id: `dev-user-id-${r}`,
    line_user_id: `dev-line-${r}`,
    display_name: `Dev ${r.charAt(0).toUpperCase() + r.slice(1)}`,
    email: `dev-${r}@example.com`,
    picture_url: null,
    status_message: "Local Offline Mode Active",
    is_active: true,
    role: r,
    created_at: now,
    updated_at: now,
    last_login_at: now,
  }));

  // 2. Seed Customers
  const customers = roles.map((r) => ({
    id: `dev-customer-id-${r}`,
    user_id: `dev-db-id-${r}`,
    auth_user_id: `dev-user-id-${r}`,
    line_user_id: `dev-line-${r}`,
    display_name: `Dev ${r.charAt(0).toUpperCase() + r.slice(1)}`,
    phone: "0812345678",
    email: `dev-${r}@example.com`,
    default_address: null,
    default_address_type: null,
    notes: null,
    total_orders: 0,
    total_spent: 0,
    is_blocked: false,
    created_at: now,
    updated_at: now,
  }));

  // 3. Seed Tables
  const restaurant_tables = [
    { id: "1", label: "โต๊ะ 1", status: "available", capacity: 4, table_type: "normal", created_at: now, updated_at: now },
    { id: "2", label: "โต๊ะ 2", status: "available", capacity: 4, table_type: "normal", created_at: now, updated_at: now },
    { id: "3", label: "โต๊ะ 3", status: "available", capacity: 4, table_type: "normal", created_at: now, updated_at: now },
    { id: "4", label: "โต๊ะ 4", status: "available", capacity: 6, table_type: "normal", created_at: now, updated_at: now },
    { id: "5", label: "โต๊ะ 5", status: "available", capacity: 4, table_type: "normal", created_at: now, updated_at: now },
    { id: "6", label: "โต๊ะ 6", status: "available", capacity: 2, table_type: "normal", created_at: now, updated_at: now },
    { id: "7", label: "โต๊ะ 7", status: "available", capacity: 4, table_type: "normal", created_at: now, updated_at: now },
    { id: "8", label: "โต๊ะ 8", status: "available", capacity: 6, table_type: "normal", created_at: now, updated_at: now },
    { id: "9", label: "โต๊ะ 9 (Walk-in)", status: "available", capacity: 4, table_type: "walkin", created_at: now, updated_at: now },
    { id: "10", label: "โต๊ะ 10 (Walk-in)", status: "available", capacity: 4, table_type: "walkin", created_at: now, updated_at: now },
  ];

  // 4. Seed Ingredients
  const ingredients = [
    { id: "ing-1", name: "หมูสับ", quantity: 5000.0, unit: "g", min_threshold: 500.0, is_active: true, created_at: now, updated_at: now },
    { id: "ing-2", name: "หมูกรอบ", quantity: 3000.0, unit: "g", min_threshold: 400.0, is_active: true, created_at: now, updated_at: now },
    { id: "ing-3", name: "หมูชิ้น", quantity: 4000.0, unit: "g", min_threshold: 500.0, is_active: true, created_at: now, updated_at: now },
    { id: "ing-4", name: "ไก่สับ", quantity: 3000.0, unit: "g", min_threshold: 400.0, is_active: true, created_at: now, updated_at: now },
    { id: "ing-5", name: "ไก่ต้ม", quantity: 2500.0, unit: "g", min_threshold: 300.0, is_active: true, created_at: now, updated_at: now },
    { id: "ing-6", name: "เนื้อ", quantity: 2000.0, unit: "g", min_threshold: 300.0, is_active: true, created_at: now, updated_at: now },
    { id: "ing-7", name: "หมึก", quantity: 2000.0, unit: "g", min_threshold: 300.0, is_active: true, created_at: now, updated_at: now },
    { id: "ing-8", name: "กุ้ง", quantity: 2000.0, unit: "g", min_threshold: 300.0, is_active: true, created_at: now, updated_at: now },
    { id: "ing-9", name: "หอยลาย", quantity: 2000.0, unit: "g", min_threshold: 300.0, is_active: true, created_at: now, updated_at: now },
    { id: "ing-10", name: "ไข่ไก่", quantity: 200.0, unit: "pcs", min_threshold: 20.0, is_active: true, created_at: now, updated_at: now },
    { id: "ing-11", name: "ไส้กรอก", quantity: 100.0, unit: "pcs", min_threshold: 15.0, is_active: true, created_at: now, updated_at: now },
    { id: "ing-12", name: "กุนเชียง", quantity: 100.0, unit: "pcs", min_threshold: 15.0, is_active: true, created_at: now, updated_at: now },
  ];

  // 5. Seed Menu Items
  const menu_items = [
    { id: "m_krapao_pork", name: "กระเพราหมูสับ (ข้าวราด)", description: "กระเพราหมูสับผัดกับพริกและกระเทียม เสิร์ฟราดข้าวไทยร้อนๆ", price: 60, image: "/meal/krapao.jpg", image_url: "/meal/krapao.jpg", category: "signature", is_available: true, is_spicy: true, sort_order: 1, options: [{ id: "spicy", name: "ระดับความเผ็ด", choices: [{ id: "0", label: "ไม่เผ็ด" }, { id: "1", label: "เผ็ดน้อย" }, { id: "2", label: "เผ็ดกลาง" }, { id: "3", label: "เผ็ดมาก" }] }], addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }, { id: "bacon", name: "หมูกรอบ", price: 20 }] },
    { id: "m_pad_nam_prik_pao", name: "ผัดพริกเผา (ข้าวราด)", description: "ผัดเครื่องพริกเผาเข้มข้น เคล้ากับเนื้อหรือไก่ตามสั่ง เสิร์ฟพร้อมข้าว", price: 65, image: "/meal/pad_tua_sea.jpg", image_url: "/meal/pad_tua_sea.jpg", category: "signature", is_available: true, is_spicy: false, sort_order: 2, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: "m_pad_nam_oil", name: "ผัดน้ำมันหอย (ข้าว/เส้น)", description: "ผัดด้วยน้ำมันหอยหอมหวาน เลือกเนื้อสัตว์และข้าว/เส้นได้ตามต้องการ", price: 65, image: "/meal/khao_moo_garlic.jpg", image_url: "/meal/khao_moo_garlic.jpg", category: "main", is_available: true, is_spicy: false, sort_order: 3, options: null, addons: null },
    { id: "m_pad_see_ew", name: "ผัดซีอิ๊ว (เส้นใหญ่)", description: "เส้นใหญ่ผัดซีอิ๊วแบบร้านตามสั่ง ปรุงรสกลมกล่อม เสิร์ฟร้อน", price: 70, image: "/meal/pad_see_ew.jpg", image_url: "/meal/pad_see_ew.jpg", category: "noodles", is_available: true, is_spicy: false, sort_order: 4, options: null, addons: null },
    { id: "m_fried_rice", name: "ข้าวผัดกระเทียม (ข้าวผัด)", description: "ข้าวผัดกลิ่นกระเทียม เจียวจนหอม พร้อมผักและเนื้อสัตว์เลือกได้", price: 70, image: "/meal/fried_rice.jpg", image_url: "/meal/fried_rice.jpg", category: "rice", is_available: true, is_spicy: false, sort_order: 5, options: null, addons: null },
    { id: "m_pad_phong_kari", name: "ผัดผงกะหรี่ (ไก่/หมู)", description: "ผัดผงกะหรี่รสกลมกล่อม เสิร์ฟพร้อมข้าวร้อนๆ", price: 75, image: "/meal/pad_pong_gari.jpg", image_url: "/meal/pad_pong_gari.jpg", category: "main", is_available: true, is_spicy: false, sort_order: 6, options: null, addons: null },
    { id: "m_pad_pak", name: "ผัดผักรวม (กับข้าว)", description: "ผัดผักสดหลากหลาย ปรุงรสอ่อนๆ ทานคู่กับข้าวสวย", price: 55, image: "/meal/pad_pak.jpg", image_url: "/meal/pad_pak.jpg", category: "vegetarian", is_available: true, is_spicy: false, sort_order: 7, options: null, addons: null },
    { id: "m_pad_prik_gaeng", name: "ผัดพริกแกง (ตามสั่ง)", description: "ผัดพริกแกงกลมกล่อม สามารถเลือกเป็นหมู ไก่ หรือทะเลได้", price: 80, image: "/meal/pad_tua_sea.jpg", image_url: "/meal/pad_tua_sea.jpg", category: "signature", is_available: true, is_spicy: true, sort_order: 8, options: null, addons: null },
    { id: "d_water", name: "น้ำเปล่า", description: "น้ำดื่มเย็นๆ ขวดเล็ก", price: 15, image: "/meal/water.jpg", image_url: "/meal/water.jpg", category: "drinks", is_available: true, is_spicy: false, sort_order: 9, options: null, addons: null },
    { id: "d_coke", name: "โค้ก (ขวด)", description: "น้ำอัดลม ซีโร่/ปกติ ตามสต็อก", price: 35, image: "/meal/coke.jpg", image_url: "/meal/coke.jpg", category: "drinks", is_available: true, is_spicy: false, sort_order: 10, options: null, addons: null },
    { id: "d_luangyai", name: "น้ำลำไย", description: "น้ำลำไยหวานหอม เสิร์ฟเย็น", price: 45, image: "/meal/longan_juice.jpg", image_url: "/meal/longan_juice.jpg", category: "drinks", is_available: true, is_spicy: false, sort_order: 11, options: null, addons: null },
    { id: "d_orange", name: "น้ำส้มคั้น", description: "น้ำส้มคั้นสด หวานอมเปรี้ยว", price: 50, image: "/meal/orange_juice.jpg", image_url: "/meal/orange_juice.jpg", category: "drinks", is_available: true, is_spicy: false, sort_order: 12, options: null, addons: null },
    { id: "dess_grass_jelly", name: "เฉาก๊วย", description: "เฉาก๊วยเย็นหวานกำลังดี ท็อปด้วยน้ำเชื่อม", price: 40, image: "/meal/grass_jelly.webp", image_url: "/meal/grass_jelly.webp", category: "dessert", is_available: true, is_spicy: false, sort_order: 13, options: null, addons: null },
    { id: "dess_shaved_ice", name: "น้ำแข็งไส", description: "น้ำแข็งไสพร้อมท็อปปิ้งหลากหลาย", price: 55, image: "/meal/shaved_ice.jpg", image_url: "/meal/shaved_ice.jpg", category: "dessert", is_available: true, is_spicy: false, sort_order: 14, options: null, addons: null },
    { id: "m_krapao_crispy_pork", name: "กระเพราหมูกรอบ (ข้าวราด)", description: "กระเพราหมูกรอบหนังสามชั้นกรอบนอกนุ่มใน ผัดใบกระเพราแท้รสจัดจ้าน เสิร์ฟราดข้าวหอมมะลิร้อนๆ", price: 70, image: "/meal/krapao.jpg", image_url: "/meal/krapao.jpg", category: "signature", is_available: true, is_spicy: true, sort_order: 15, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: "m_kana_crispy_pork", name: "ผัดคะน้าหมูกรอบ (ข้าวราด)", description: "ผัดคะน้าใบเขียวสดกรอบกับหมูกรอบสามชั้น ปรุงรสกลมกล่อม ราดข้าวหอมมะลิร้อนๆ", price: 70, image: "/meal/pad_pak.jpg", image_url: "/meal/pad_pak.jpg", category: "main", is_available: true, is_spicy: false, sort_order: 16, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: "m_prik_gaeng_crispy_pork", name: "ผัดพริกแกงหมูกรอบ (ข้าวราด)", description: "พริกแกงรสเข้มข้นผัดคลุกเคล้ากับหมูกรอบและถั่วฝักยาว ราดข้าวหอมมะลิร้อนๆ", price: 70, image: "/meal/pad_tua_sea.jpg", image_url: "/meal/pad_tua_sea.jpg", category: "main", is_available: true, is_spicy: true, sort_order: 17, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: "m_garlic_sliced_pork", name: "กระเทียมพริกไทยหมูชิ้น (ข้าวราด)", description: "หมูชิ้นนุ่มๆ ผัดซอสกระเทียมพริกไทยรสเข้มข้น หอมกระเทียมเจียว ราดข้าว", price: 60, image: "/meal/khao_moo_garlic.jpg", image_url: "/meal/khao_moo_garlic.jpg", category: "main", is_available: true, is_spicy: false, sort_order: 18, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: "m_pong_kari_sea", name: "ผัดผงกะหรี่ทะเล (ข้าวราด)", description: "เนื้อกุ้งและปลาหมึกสดผัดผงกะหรี่เข้มข้น ไข่นุ่มละมุนลิ้น ราดข้าวหอมมะลิ", price: 70, image: "/meal/pad_pong_gari.jpg", image_url: "/meal/pad_pong_gari.jpg", category: "signature", is_available: true, is_spicy: false, sort_order: 19, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: "m_khua_prik_beef", name: "คั่วพริกแกงเนื้อ (ข้าวราด)", description: "เนื้อวัวเกรดดีผัดคั่วพริกแกงตำมือ รสจัดจ้านถึงใจ สมุนไพรไทยครบเครื่อง ราดข้าว", price: 60, image: "/meal/pad_tua_sea.jpg", image_url: "/meal/pad_tua_sea.jpg", category: "main", is_available: true, is_spicy: true, sort_order: 20, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: "m_see_ew_crispy_pork", name: "ผัดซีอิ๊วเส้นใหญ่หมูกรอบ", description: "เส้นใหญ่เหนียวนุ่มผัดซีอิ๊วดำหอมกลิ่นกระทะ คลุกเคล้ากับหมูกรอบและคะน้าสด", price: 75, image: "/meal/pad_see_ew.jpg", image_url: "/meal/pad_see_ew.jpg", category: "noodles", is_available: true, is_spicy: false, sort_order: 21, options: null, addons: null },
    { id: "m_mama_prik_gaeng_shrimp", name: "มาม่าผัดคั่วพริกแกงกุ้ง", description: "เส้นมาม่าเหนียวนุ่มผัดซอสพริกแกงเข้มข้นและกุ้งสดเด้งๆ สมุนไพรหอมกรุ่น", price: 65, image: "/meal/pad_tua_sea.jpg", image_url: "/meal/pad_tua_sea.jpg", category: "noodles", is_available: true, is_spicy: true, sort_order: 22, options: null, addons: null },
    { id: "m_prik_pao_clam", name: "ผัดพริกเผาหอยลาย (ข้าวราด)", description: "หอยลายสดผัดน้ำพริกเผาสูตรเด็ด รสชาติหวานเค็มเผ็ดลงตัว หอมใบโหระพา ราดข้าว", price: 60, image: "/meal/pad_tua_sea.jpg", image_url: "/meal/pad_tua_sea.jpg", category: "main", is_available: true, is_spicy: false, sort_order: 23, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: "m_pad_pak_no_meat", name: "ผัดผักรวมมิตร (ข้าวราด / มังสวิรัติ)", description: "ผัดผักสดรวมมิตรรสชาติเบาๆ สุขภาพดี ปรุงด้วยซีอิ๊วขาวและน้ำมันหอยสูตรเจ ราดข้าว", price: 50, image: "/meal/pad_pak.jpg", image_url: "/meal/pad_pak.jpg", category: "vegetarian", is_available: true, is_spicy: false, sort_order: 24, options: null, addons: null },
  ];

  // 6. Seed Recipe Items
  const recipe_items = [
    { id: "rec-1", option_id: "p_minced_pork", ingredient_id: "ing-1", quantity_required: 120.0, created_at: now },
    { id: "rec-2", option_id: "p_crispy_pork", ingredient_id: "ing-2", quantity_required: 100.0, created_at: now },
    { id: "rec-3", option_id: "p_sliced_pork", ingredient_id: "ing-3", quantity_required: 120.0, created_at: now },
    { id: "rec-4", option_id: "p_minced_chicken", ingredient_id: "ing-4", quantity_required: 120.0, created_at: now },
    { id: "rec-5", option_id: "p_boiled_chicken", ingredient_id: "ing-5", quantity_required: 100.0, created_at: now },
    { id: "rec-6", option_id: "p_beef", ingredient_id: "ing-6", quantity_required: 120.0, created_at: now },
    { id: "rec-7", option_id: "p_squid", ingredient_id: "ing-7", quantity_required: 120.0, created_at: now },
    { id: "rec-8", option_id: "p_shrimp", ingredient_id: "ing-8", quantity_required: 100.0, created_at: now },
    { id: "rec-9", option_id: "p_clam", ingredient_id: "ing-9", quantity_required: 120.0, created_at: now },
  ];

  const store_settings = [
    { id: "takeaway_queue", value: { counter: 1 }, updated_at: now },
  ];

  return {
    users,
    customers,
    restaurant_tables,
    ingredients,
    menu_items,
    recipe_items,
    store_settings,
    orders: [],
    order_items: [],
    translation_cache: [],
  };
}

function loadLocalDb(): any {
  if (typeof window === "undefined") return seedMockDatabase();
  const stored = localStorage.getItem(LOCAL_STORAGE_DB_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Ensure required table arrays exist
      if (parsed && typeof parsed === "object") {
        if (!Array.isArray(parsed.orders)) parsed.orders = [];
        if (!Array.isArray(parsed.order_items)) parsed.order_items = [];
        if (!Array.isArray(parsed.menu_items) || parsed.menu_items.length === 0) {
          parsed.menu_items = seedMockDatabase().menu_items;
        }
        if (!Array.isArray(parsed.ingredients) || parsed.ingredients.length === 0) {
          parsed.ingredients = seedMockDatabase().ingredients;
        }
        if (!Array.isArray(parsed.restaurant_tables) || parsed.restaurant_tables.length === 0) {
          parsed.restaurant_tables = seedMockDatabase().restaurant_tables;
        }
        return parsed;
      }
    } catch (e) {
      console.error("Local db parse failed, reseeding.", e);
    }
  }
  const db = seedMockDatabase();
  localStorage.setItem(LOCAL_STORAGE_DB_KEY, JSON.stringify(db));
  return db;
}

function saveLocalDb(db: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_DB_KEY, JSON.stringify(db));
}

// ── CUSTOM LOCAL DB BUILDER ─────────────────────────────────
class MockQueryBuilder {
  private operation: "select" | "insert" | "update" | "upsert" | "delete" = "select";
  private payload: any = null;
  private upsertOptions?: { onConflict?: string; ignoreDuplicates?: boolean };
  private filters: Array<(row: any) => boolean> = [];
  private sorts: Array<(a: any, b: any) => number> = [];
  private limitCount: number | null = null;
  private isSingle = false;
  private isMaybeSingle = false;
  private executed = false;
  private cachedResult: any = null;

  constructor(private table: string) {
    // Auto-execute mutations in microtask if not awaited via .then()
    setTimeout(() => {
      if (!this.executed && this.operation !== "select") {
        this.execute();
      }
    }, 0);
  }

  select(fields?: string) {
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push((row) => String(row[column]) === String(value));
    return this;
  }

  neq(column: string, value: any) {
    this.filters.push((row) => String(row[column]) !== String(value));
    return this;
  }

  in(column: string, values: any[]) {
    const strVals = values.map((v) => String(v));
    this.filters.push((row) => strVals.includes(String(row[column])));
    return this;
  }

  like(column: string, pattern: string) {
    const regex = new RegExp(pattern.replace(/%/g, ".*"), "i");
    this.filters.push((row) => regex.test(String(row[column] ?? "")));
    return this;
  }

  or(clause: string) {
    if (!clause) return this;
    const subClauses = clause.split(",").map((s) => s.trim()).filter(Boolean);
    this.filters.push((row) => {
      return subClauses.some((sub) => {
        const parts = sub.split(".");
        if (parts.length >= 3) {
          const col = parts[0];
          const op = parts[1];
          const val = parts.slice(2).join(".");
          if (!val) return false;
          if (op === "eq") return String(row[col]) === String(val);
          if (op === "neq") return String(row[col]) !== String(val);
          if (op === "like") return new RegExp(val.replace(/%/g, ".*"), "i").test(String(row[col] ?? ""));
        }
        return false;
      });
    });
    return this;
  }

  gt(column: string, value: any) {
    this.filters.push((row) => row[column] > value);
    return this;
  }

  gte(column: string, value: any) {
    this.filters.push((row) => row[column] >= value);
    return this;
  }

  lt(column: string, value: any) {
    this.filters.push((row) => row[column] < value);
    return this;
  }

  lte(column: string, value: any) {
    this.filters.push((row) => row[column] <= value);
    return this;
  }

  not(column: string, operator: string, value: any) {
    if (operator === "in") {
      const cleanVal = String(value).replace(/^\(/, "").replace(/\)$/, "").replace(/"/g, "");
      const arr = cleanVal.split(",").map((s) => s.trim());
      this.filters.push((row) => !arr.includes(String(row[column])));
    } else if (operator === "eq") {
      this.filters.push((row) => String(row[column]) !== String(value));
    }
    return this;
  }

  is(column: string, value: any) {
    this.filters.push((row) => row[column] === value);
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    const ascending = options?.ascending ?? true;
    this.sorts.push((a, b) => {
      const valA = a[column];
      const valB = b[column];
      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;
      const compare = valA < valB ? -1 : 1;
      return ascending ? compare : -compare;
    });
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  maybeSingle() {
    this.isMaybeSingle = true;
    return this;
  }

  insert(records: any | any[]) {
    this.operation = "insert";
    this.payload = records;
    return this;
  }

  update(updates: any) {
    this.operation = "update";
    this.payload = updates;
    return this;
  }

  upsert(records: any | any[], options?: { onConflict?: string; ignoreDuplicates?: boolean }) {
    this.operation = "upsert";
    this.payload = records;
    this.upsertOptions = options;
    return this;
  }

  delete() {
    this.operation = "delete";
    return this;
  }

  private resolveRelations(rows: any[]) {
    const db = loadLocalDb();

    if (this.table === "orders") {
      const orderItems = db["order_items"] || [];
      const customers = db["customers"] || [];
      return rows.map((order: any) => {
        const items = orderItems.filter((item: any) => String(item.order_id) === String(order.id));
        const customer = customers.find((c: any) => c.auth_user_id === order.auth_user_id || String(c.id) === String(order.customer_id));
        return {
          ...order,
          order_items: items,
          customers: customer || null,
        };
      });
    }

    if (this.table === "recipe_items") {
      const ingredients = db["ingredients"] || [];
      return rows.map((recipe: any) => {
        const ing = ingredients.find((i: any) => String(i.id) === String(recipe.ingredient_id));
        return {
          ...recipe,
          ingredients: ing || null,
        };
      });
    }

    return rows;
  }

  private execute() {
    if (this.executed && this.cachedResult) {
      return this.cachedResult;
    }
    this.executed = true;
    const db = loadLocalDb();
    const tableData: any[] = db[this.table] || [];

    if (this.operation === "insert") {
      const arr = Array.isArray(this.payload) ? this.payload : [this.payload];
      const newRecords = arr.map((rec: any) => {
        const newRec = {
          id: rec.id || uuid(),
          created_at: rec.created_at || new Date().toISOString(),
          updated_at: rec.updated_at || new Date().toISOString(),
          ...rec,
        };
        tableData.push(newRec);
        return newRec;
      });

      db[this.table] = tableData;
      saveLocalDb(db);
      triggerRealtimeEvent(this.table, "INSERT", newRecords);
      const res = {
        data: Array.isArray(this.payload) ? newRecords : newRecords[0],
        error: null,
        count: newRecords.length,
      };
      this.cachedResult = res;
      return res;
    }

    if (this.operation === "update") {
      const updatedRecords: any[] = [];
      const newTableData = tableData.map((row: any) => {
        const matches = this.filters.length > 0 ? this.filters.every((f) => f(row)) : true;
        if (matches) {
          const updated = {
            ...row,
            ...this.payload,
            updated_at: new Date().toISOString(),
          };
          updatedRecords.push(updated);
          return updated;
        }
        return row;
      });

      db[this.table] = newTableData;
      saveLocalDb(db);
      triggerRealtimeEvent(this.table, "UPDATE", updatedRecords);
      const res = {
        data: updatedRecords,
        error: null,
        count: updatedRecords.length,
      };
      this.cachedResult = res;
      return res;
    }

    if (this.operation === "upsert") {
      const arr = Array.isArray(this.payload) ? this.payload : [this.payload];
      const conflictField = this.upsertOptions?.onConflict || "id";
      const upserted: any[] = [];

      arr.forEach((rec) => {
        const existingIdx = tableData.findIndex((row: any) => String(row[conflictField]) === String(rec[conflictField]));
        const now = new Date().toISOString();
        if (existingIdx > -1) {
          if (!this.upsertOptions?.ignoreDuplicates) {
            tableData[existingIdx] = {
              ...tableData[existingIdx],
              ...rec,
              updated_at: now,
            };
            upserted.push(tableData[existingIdx]);
          } else {
            upserted.push(tableData[existingIdx]);
          }
        } else {
          const newRec = {
            id: rec.id || uuid(),
            created_at: now,
            updated_at: now,
            ...rec,
          };
          tableData.push(newRec);
          upserted.push(newRec);
        }
      });

      db[this.table] = tableData;
      saveLocalDb(db);
      triggerRealtimeEvent(this.table, "UPDATE", upserted);
      const res = {
        data: Array.isArray(this.payload) ? upserted : upserted[0],
        error: null,
        count: upserted.length,
      };
      this.cachedResult = res;
      return res;
    }

    if (this.operation === "delete") {
      const deleted: any[] = [];
      const newTableData = tableData.filter((row: any) => {
        const matches = this.filters.length > 0 && this.filters.every((f) => f(row));
        if (matches) {
          deleted.push(row);
          return false;
        }
        return true;
      });

      db[this.table] = newTableData;
      saveLocalDb(db);
      triggerRealtimeEvent(this.table, "DELETE", deleted);
      const res = {
        data: deleted,
        error: null,
        count: deleted.length,
      };
      this.cachedResult = res;
      return res;
    }

    // Default: SELECT
    let result = tableData.filter((row: any) => this.filters.every((f) => f(row)));
    result = this.resolveRelations(result);

    this.sorts.forEach((sort) => {
      result.sort(sort);
    });

    if (this.limitCount !== null) {
      result = result.slice(0, this.limitCount);
    }

    let finalResult: any = result;
    if (this.isSingle || this.isMaybeSingle) {
      finalResult = result.length > 0 ? result[0] : null;
    }

    const res = {
      data: finalResult,
      error: null,
      count: result.length,
    };
    this.cachedResult = res;
    return res;
  }

  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    const response = this.execute();
    return Promise.resolve(response).then(onfulfilled, onrejected);
  }
}

// ── LOCAL AUTH IMPLEMENTATION ─────────────────────────────────
class LocalAuth {
  private getStoredSession(): any | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(LOCAL_AUTH_SESSION_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    const bypassRole = getDevBypassRole();
    if (bypassRole) {
      const user = getMockUser(bypassRole);
      return {
        access_token: "local-token-" + bypassRole,
        refresh_token: "local-token-" + bypassRole,
        expires_in: 86400,
        expires_at: Math.floor(Date.now() / 1000) + 86400,
        token_type: "bearer",
        user,
      };
    }
    return null;
  }

  private setStoredSession(session: any | null) {
    if (typeof window === "undefined") return;
    if (session) {
      localStorage.setItem(LOCAL_AUTH_SESSION_KEY, JSON.stringify(session));
      if (session.user?.user_metadata?.role) {
        localStorage.setItem("dev-bypass-role", session.user.user_metadata.role);
      }
    } else {
      localStorage.removeItem(LOCAL_AUTH_SESSION_KEY);
      localStorage.removeItem("dev-bypass-role");
    }
  }

  async getSession() {
    const session = this.getStoredSession();
    return { data: { session }, error: null };
  }

  async getUser() {
    const session = this.getStoredSession();
    return { data: { user: session?.user || null }, error: null };
  }

  async signInWithPassword({ email, password }: { email: string; password?: string }) {
    const db = loadLocalDb();
    const userInDb = (db.users || []).find((u: any) => u.email?.toLowerCase() === email.toLowerCase());
    const role = userInDb?.role || "customer";
    const displayName = userInDb?.display_name || email.split("@")[0];

    const user = {
      id: userInDb?.auth_user_id || `user_${Date.now()}`,
      email,
      role: "authenticated",
      aud: "authenticated",
      app_metadata: { provider: "email" },
      user_metadata: {
        full_name: displayName,
        display_name: displayName,
        role: role,
      },
      created_at: userInDb?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const session = {
      access_token: "local-token-" + role,
      refresh_token: "local-token-" + role,
      expires_in: 86400,
      expires_at: Math.floor(Date.now() / 1000) + 86400,
      token_type: "bearer",
      user,
    };

    this.setStoredSession(session);
    triggerRealtimeEvent("auth", "SIGNED_IN", [user]);
    return { data: { user, session }, error: null };
  }

  async signUp({ email, password, options }: { email: string; password?: string; options?: any }) {
    const role = options?.data?.role || "customer";
    const displayName = options?.data?.display_name || options?.data?.full_name || email.split("@")[0];
    const userId = `user_${Date.now()}`;

    const user = {
      id: userId,
      email,
      role: "authenticated",
      aud: "authenticated",
      app_metadata: { provider: "email" },
      user_metadata: {
        full_name: displayName,
        display_name: displayName,
        role,
        phone: options?.data?.phone || "",
        gender: options?.data?.gender || "",
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const session = {
      access_token: "local-token-" + role,
      refresh_token: "local-token-" + role,
      expires_in: 86400,
      expires_at: Math.floor(Date.now() / 1000) + 86400,
      token_type: "bearer",
      user,
    };

    this.setStoredSession(session);
    return { data: { user, session }, error: null };
  }

  async signInWithOAuth({ provider }: { provider: string }) {
    const bypassRole = getDevBypassRole() || "customer";
    const user = getMockUser(bypassRole);
    const session = {
      access_token: "local-token-" + bypassRole,
      refresh_token: "local-token-" + bypassRole,
      expires_in: 86400,
      expires_at: Math.floor(Date.now() / 1000) + 86400,
      token_type: "bearer",
      user,
    };
    this.setStoredSession(session);
    return { data: { provider, url: "/" }, error: null };
  }

  async signOut() {
    this.setStoredSession(null);
    return { error: null };
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    const session = this.getStoredSession();
    setTimeout(() => {
      callback(session ? "SIGNED_IN" : "SIGNED_OUT", session);
    }, 0);

    return {
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    };
  }
}

// ── COMPLETE LOCAL SUPABASE CLIENT ────────────────────────────
class LocalSupabaseClient {
  public auth = new LocalAuth();

  from(table: string) {
    return new MockQueryBuilder(table);
  }

  channel(channelName: string) {
    return {
      on(type: string, filter: any, callback: (payload: any) => void) {
        realtimeCallbacks.push(callback);
        return this;
      },
      subscribe() {
        return this;
      },
    };
  }

  removeChannel(channel: any) {
    return Promise.resolve();
  }
}

export const supabase = new LocalSupabaseClient() as any;
