import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase.types";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || "https://placeholder-project-url.supabase.co";
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || "placeholder-key";

const originalSupabase = createClient(supabaseUrl, supabaseAnonKey) as any;

// Helper to get active bypass role
export function getDevBypassRole(): string | null {
  if (typeof window === "undefined") return null;
  const localRole = localStorage.getItem("dev-bypass-role");
  if (localRole && localRole !== "none") return localRole;

  const envRole = import.meta.env.VITE_DEV_BYPASS_ROLE as string;
  if (envRole && envRole !== "none") return envRole;

  // Default fallback based on path
  const path = window.location.pathname;
  if (path.includes("/admin")) return "admin";
  if (path.includes("/staff")) return "staff";
  if (path.includes("/captain")) return "captain";
  if (path.includes("/customer")) return "customer";

  return "customer";
}

// Dev mock data generators
const getMockUser = (role: string) => {
  const userId = `dev-user-id-${role}`;
  return {
    id: userId,
    email: `dev-${role}@example.com`,
    role: "authenticated",
    aud: "authenticated",
    app_metadata: { provider: "email" },
    user_metadata: {
      full_name: `Dev ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      display_name: `Dev ${role.charAt(0).toUpperCase() + role.slice(1)}`,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

// ── LOCAL STORAGE DATABASE ENGINE ────────────────────────────
const LOCAL_STORAGE_DB_KEY = "ran-lung-get-mock-db";

const uuid = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Real-time listener callbacks
const realtimeCallbacks: Array<(payload: any) => void> = [];

function triggerRealtimeEvent(table: string, eventType: string, records: any[]) {
  const arr = Array.isArray(records) ? records : [records];
  arr.forEach(rec => {
    const payload = {
      schema: "public",
      table: table,
      eventType: eventType,
      new: eventType !== "DELETE" ? rec : null,
      old: eventType === "DELETE" ? rec : null,
    };
    setTimeout(() => {
      realtimeCallbacks.forEach(cb => {
        try { cb(payload); } catch (e) { console.error("Realtime callback error:", e); }
      });
    }, 10);
  });
}

function seedMockDatabase() {
  const now = new Date().toISOString();
  
  // 1. Seed Users
  const roles = ["admin", "staff", "captain", "customer"];
  const users = roles.map(r => ({
    id: `dev-db-id-${r}`,
    auth_user_id: `dev-user-id-${r}`,
    line_user_id: `dev-line-${r}`,
    display_name: `Dev ${r.charAt(0).toUpperCase() + r.slice(1)}`,
    email: `dev-${r}@example.com`,
    picture_url: null,
    status_message: "Demo Mode Active",
    is_active: true,
    role: r,
    created_at: now,
    updated_at: now,
    last_login_at: now,
  }));

  // 2. Seed Customers
  const customers = roles.map(r => ({
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
    { id: "2", label: "โต๊ะ 2", status: "occupied", capacity: 4, table_type: "normal", created_at: now, updated_at: now },
    { id: "3", label: "โต๊ะ 3", status: "available", capacity: 4, table_type: "normal", created_at: now, updated_at: now },
    { id: "4", label: "โต๊ะ 4", status: "available", capacity: 6, table_type: "normal", created_at: now, updated_at: now },
    { id: "5", label: "โต๊ะ 5", status: "available", capacity: 4, table_type: "normal", created_at: now, updated_at: now },
    { id: "6", label: "โต๊ะ 6", status: "occupied", capacity: 2, table_type: "normal", created_at: now, updated_at: now },
    { id: "7", label: "โต๊ะ 7", status: "available", capacity: 4, table_type: "normal", created_at: now, updated_at: now },
    { id: "8", label: "โต๊ะ 8", status: "available", capacity: 6, table_type: "normal", created_at: now, updated_at: now },
    { id: "9", label: "โต๊ะ 9 (Walk-in)", status: "available", capacity: 4, table_type: "walkin", created_at: now, updated_at: now },
    { id: "10", label: "โต๊ะ 10 (Walk-in)", status: "available", capacity: 4, table_type: "walkin", created_at: now, updated_at: now },
  ];

  // 4. Seed Ingredients
  const ingredients = [
    { id: "ing-1", name: "หมูสับ", quantity: 1000.00, unit: "g", min_threshold: 200.00, created_at: now, updated_at: now },
    { id: "ing-2", name: "หมูกรอบ", quantity: 1000.00, unit: "g", min_threshold: 200.00, created_at: now, updated_at: now },
    { id: "ing-3", name: "หมูชิ้น", quantity: 1000.00, unit: "g", min_threshold: 200.00, created_at: now, updated_at: now },
    { id: "ing-4", name: "ไก่สับ", quantity: 1000.00, unit: "g", min_threshold: 200.00, created_at: now, updated_at: now },
    { id: "ing-5", name: "ไก่ต้ม", quantity: 1000.00, unit: "g", min_threshold: 200.00, created_at: now, updated_at: now },
    { id: "ing-6", name: "เนื้อ", quantity: 1000.00, unit: "g", min_threshold: 200.00, created_at: now, updated_at: now },
    { id: "ing-7", name: "หมึก", quantity: 1000.00, unit: "g", min_threshold: 200.00, created_at: now, updated_at: now },
    { id: "ing-8", name: "กุ้ง", quantity: 1000.00, unit: "g", min_threshold: 200.00, created_at: now, updated_at: now },
    { id: "ing-9", name: "หอยลาย", quantity: 1000.00, unit: "g", min_threshold: 200.00, created_at: now, updated_at: now },
    { id: "ing-10", name: "ไข่ไก่", quantity: 100.00, unit: "pcs", min_threshold: 15.00, created_at: now, updated_at: now },
    { id: "ing-11", name: "ไส้กรอก", quantity: 50.00, unit: "pcs", min_threshold: 10.00, created_at: now, updated_at: now },
    { id: "ing-12", name: "กุนเชียง", quantity: 50.00, unit: "pcs", min_threshold: 10.00, created_at: now, updated_at: now },
  ];

  // 5. Seed Menu Items
  const menu_items = [
    { id: 'm_krapao_pork', name: 'กระเพราหมูสับ (ข้าวราด)', description: 'กระเพราหมูสับผัดกับพริกและกระเทียม เสิร์ฟราดข้าวไทยร้อนๆ', price: 60, image: '/meal/krapao.jpg', category: 'signature', is_available: true, is_spicy: true, sort_order: 1, options: [{ id: "spicy", name: "ระดับความเผ็ด", choices: [{ id: "0", label: "ไม่เผ็ด" }, { id: "1", label: "เผ็ดน้อย" }, { id: "2", label: "เผ็ดกลาง" }, { id: "3", label: "เผ็ดมาก" }] }], addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }, { id: "bacon", name: "หมูกรอบ", price: 20 }] },
    { id: 'm_pad_nam_prik_pao', name: 'ผัดพริกเผา (ข้าวราด)', description: 'ผัดเครื่องพริกเผาเข้มข้น เคล้ากับเนื้อหรือไก่ตามสั่ง เสิร์ฟพร้อมข้าว', price: 65, image: '/meal/pad_tua_sea.jpg', category: 'signature', is_available: true, is_spicy: false, sort_order: 2, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: 'm_pad_nam_oil', name: 'ผัดน้ำมันหอย (ข้าว/เส้น)', description: 'ผัดด้วยน้ำมันหอยหอมหวาน เลือกเนื้อสัตว์และข้าว/เส้นได้ตามต้องการ', price: 65, image: '/meal/khao_moo_garlic.jpg', category: 'main', is_available: true, is_spicy: false, sort_order: 3, options: null, addons: null },
    { id: 'm_pad_see_ew', name: 'ผัดซีอิ๊ว (เส้นใหญ่)', description: 'เส้นใหญ่ผัดซีอิ๊วแบบร้านตามสั่ง ปรุงรสกลมกล่อม เสิร์ฟร้อน', price: 70, image: '/meal/pad_see_ew.jpg', category: 'noodles', is_available: true, is_spicy: false, sort_order: 4, options: null, addons: null },
    { id: 'm_fried_rice', name: 'ข้าวผัดกระเทียม (ข้าวผัด)', description: 'ข้าวผัดกลิ่นกระเทียม เจียวจนหอม พร้อมผักและเนื้อสัตว์เลือกได้', price: 70, image: '/meal/fried_rice.jpg', category: 'rice', is_available: true, is_spicy: false, sort_order: 5, options: null, addons: null },
    { id: 'm_pad_phong_kari', name: 'ผัดผงกะหรี่ (ไก่/หมู)', description: 'ผัดผงกะหรี่รสกลมกล่อม เสิร์ฟพร้อมข้าวร้อนๆ', price: 75, image: '/meal/pad_pong_gari.jpg', category: 'main', is_available: true, is_spicy: false, sort_order: 6, options: null, addons: null },
    { id: 'm_pad_pak', name: 'ผัดผักรวม (กับข้าว)', description: 'ผัดผักสดหลากหลาย ปรุงรสอ่อนๆ ทานคู่กับข้าวสวย', price: 55, image: '/meal/pad_pak.jpg', category: 'vegetarian', is_available: true, is_spicy: false, sort_order: 7, options: null, addons: null },
    { id: 'm_pad_prik_gaeng', name: 'ผัดพริกแกง (ตามสั่ง)', description: 'ผัดพริกแกงกลมกล่อม สามารถเลือกเป็นหมู ไก่ หรือทะเลได้', price: 80, image: '/meal/pad_tua_sea.jpg', category: 'signature', is_available: true, is_spicy: true, sort_order: 8, options: null, addons: null },
    { id: 'd_water', name: 'น้ำเปล่า', description: 'น้ำดื่มเย็นๆ ขวดเล็ก', price: 15, image: '/meal/water.jpg', category: 'drinks', is_available: true, is_spicy: false, sort_order: 9, options: null, addons: null },
    { id: 'd_coke', name: 'โค้ก (ขวด)', description: 'น้ำอัดลม ซีโร่/ปกติ ตามสต็อก', price: 35, image: '/meal/coke.jpg', category: 'drinks', is_available: true, is_spicy: false, sort_order: 10, options: null, addons: null },
    { id: 'd_luangyai', name: 'น้ำลำไย', description: 'น้ำลำไยหวานหอม เสิร์ฟเย็น', price: 45, image: '/meal/longan_juice.jpg', category: 'drinks', is_available: true, is_spicy: false, sort_order: 11, options: null, addons: null },
    { id: 'd_orange', name: 'น้ำส้มคั้น', description: 'น้ำส้มคั้นสด หวานอมเปรี้ยว', price: 50, image: '/meal/orange_juice.jpg', category: 'drinks', is_available: true, is_spicy: false, sort_order: 12, options: null, addons: null },
    { id: 'dess_grass_jelly', name: 'เฉาก๊วย', description: 'เฉาก๊วยเย็นหวานกำลังดี ท็อปด้วยน้ำเชื่อม', price: 40, image: '/meal/grass_jelly.webp', category: 'dessert', is_available: true, is_spicy: false, sort_order: 13, options: null, addons: null },
    { id: 'dess_shaved_ice', name: 'น้ำแข็งไส', description: 'น้ำแข็งไสพร้อมท็อปปิ้งหลากหลาย', price: 55, image: '/meal/shaved_ice.jpg', category: 'dessert', is_available: true, is_spicy: false, sort_order: 14, options: null, addons: null },
    { id: 'm_krapao_crispy_pork', name: 'กระเพราหมูกรอบ (ข้าวราด)', description: 'กระเพราหมูกรอบหนังสามชั้นกรอบนอกนุ่มใน ผัดใบกระเพราแท้รสจัดจ้าน เสิร์ฟราดข้าวหอมมะลิร้อนๆ', price: 70, image: '/meal/krapao.jpg', category: 'signature', is_available: true, is_spicy: true, sort_order: 15, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: 'm_kana_crispy_pork', name: 'ผัดคะน้าหมูกรอบ (ข้าวราด)', description: 'ผัดคะน้าใบเขียวสดกรอบกับหมูกรอบสามชั้น ปรุงรสกลมกล่อม ราดข้าวหอมมะลิร้อนๆ', price: 70, image: '/meal/pad_pak.jpg', category: 'main', is_available: true, is_spicy: false, sort_order: 16, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: 'm_prik_gaeng_crispy_pork', name: 'ผัดพริกแกงหมูกรอบ (ข้าวราด)', description: 'พริกแกงรสเข้มข้นผัดคลุกเคล้ากับหมูกรอบและถั่วฝักยาว ราดข้าวหอมมะลิร้อนๆ', price: 70, image: '/meal/pad_tua_sea.jpg', category: 'main', is_available: true, is_spicy: true, sort_order: 17, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: 'm_garlic_sliced_pork', name: 'กระเทียมพริกไทยหมูชิ้น (ข้าวราด)', description: 'หมูชิ้นนุ่มๆ ผัดซอสกระเทียมพริกไทยรสเข้มข้น หอมกระเทียมเจียว ราดข้าว', price: 60, image: '/meal/khao_moo_garlic.jpg', category: 'main', is_available: true, is_spicy: false, sort_order: 18, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: 'm_pong_kari_sea', name: 'ผัดผงกะหรี่ทะเล (ข้าวราด)', description: 'เนื้อกุ้งและปลาหมึกสดผัดผงกะหรี่เข้มข้น ไข่นุ่มละมุนลิ้น ราดข้าวหอมมะลิ', price: 70, image: '/meal/pad_pong_gari.jpg', category: 'signature', is_available: true, is_spicy: false, sort_order: 19, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: 'm_khua_prik_beef', name: 'คั่วพริกแกงเนื้อ (ข้าวราด)', description: 'เนื้อวัวเกรดดีผัดคั่วพริกแกงตำมือ รสจัดจ้านถึงใจ สมุนไพรไทยครบเครื่อง ราดข้าว', price: 60, image: '/meal/pad_tua_sea.jpg', category: 'main', is_available: true, is_spicy: true, sort_order: 20, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: 'm_see_ew_crispy_pork', name: 'ผัดซีอิ๊วเส้นใหญ่หมูกรอบ', description: 'เส้นใหญ่เหนียวนุ่มผัดซีอิ๊วดำหอมกลิ่นกระทะ คลุกเคล้ากับหมูกรอบและคะน้าสด', price: 75, image: '/meal/pad_see_ew.jpg', category: 'noodles', is_available: true, is_spicy: false, sort_order: 21, options: null, addons: null },
    { id: 'm_mama_prik_gaeng_shrimp', name: 'มาม่าผัดคั่วพริกแกงกุ้ง', description: 'เส้นมาม่าเหนียวนุ่มผัดซอสพริกแกงเข้มข้นและกุ้งสดเด้งๆ สมุนไพรหอมกรุ่น', price: 65, image: '/meal/pad_tua_sea.jpg', category: 'noodles', is_available: true, is_spicy: true, sort_order: 22, options: null, addons: null },
    { id: 'm_prik_pao_clam', name: 'ผัดพริกเผาหอยลาย (ข้าวราด)', description: 'หอยลายสดผัดน้ำพริกเผาสูตรเด็ด รสชาติหวานเค็มเผ็ดลงตัว หอมใบโหระพา ราดข้าว', price: 60, image: '/meal/pad_tua_sea.jpg', category: 'main', is_available: true, is_spicy: false, sort_order: 23, options: null, addons: [{ id: "egg", name: "ไข่ดาว", price: 10 }] },
    { id: 'm_pad_pak_no_meat', name: 'ผัดผักรวมมิตร (ข้าวราด / มังสวิรัติ)', description: 'ผัดผักสดรวมมิตรรสชาติเบาๆ สุขภาพดี ปรุงด้วยซีอิ๊วขาวและน้ำมันหอยสูตรเจ ราดข้าว', price: 50, image: '/meal/pad_pak.jpg', category: 'vegetarian', is_available: true, is_spicy: false, sort_order: 24, options: null, addons: null }
  ];

  // 6. Seed Recipe Items (Option overrides to ingredients)
  const recipe_items = [
    { id: "rec-1", option_id: "p_minced_pork", ingredient_id: "ing-1", quantity_required: 120.00, created_at: now },
    { id: "rec-2", option_id: "p_crispy_pork", ingredient_id: "ing-2", quantity_required: 100.00, created_at: now },
    { id: "rec-3", option_id: "p_sliced_pork", ingredient_id: "ing-3", quantity_required: 120.00, created_at: now },
    { id: "rec-4", option_id: "p_minced_chicken", ingredient_id: "ing-4", quantity_required: 120.00, created_at: now },
    { id: "rec-5", option_id: "p_boiled_chicken", ingredient_id: "ing-5", quantity_required: 100.00, created_at: now },
    { id: "rec-6", option_id: "p_beef", ingredient_id: "ing-6", quantity_required: 120.00, created_at: now },
    { id: "rec-7", option_id: "p_squid", ingredient_id: "ing-7", quantity_required: 120.00, created_at: now },
    { id: "rec-8", option_id: "p_shrimp", ingredient_id: "ing-8", quantity_required: 100.00, created_at: now },
    { id: "rec-9", option_id: "p_clam", ingredient_id: "ing-9", quantity_required: 120.00, created_at: now },
  ];

  const store_settings = [
    { id: "takeaway_queue", value: "0" }
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
    translation_cache: []
  };
}

function loadLocalDb(): any {
  if (typeof window === "undefined") return seedMockDatabase();
  const stored = localStorage.getItem(LOCAL_STORAGE_DB_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Local db parse failed, seeding default database.", e);
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
  private data: any[];
  private filters: Array<(row: any) => boolean> = [];
  private sorts: Array<(a: any, b: any) => number> = [];
  private limitCount: number | null = null;
  private isSingle = false;
  private isMaybeSingle = false;

  constructor(private table: string) {
    const db = loadLocalDb();
    this.data = db[table] || [];
  }

  select(fields?: string) {
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push((row) => {
      // Allow searching auth_user_id or id
      return row[column] === value;
    });
    return this;
  }

  neq(column: string, value: any) {
    this.filters.push((row) => row[column] !== value);
    return this;
  }

  in(column: string, values: any[]) {
    this.filters.push((row) => values.includes(row[column]));
    return this;
  }

  like(column: string, pattern: string) {
    const regex = new RegExp(pattern.replace(/%/g, ".*"), "i");
    this.filters.push((row) => regex.test(row[column]));
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

  // Inserts
  insert(records: any | any[]) {
    const arr = Array.isArray(records) ? records : [records];
    const db = loadLocalDb();
    const tableData = db[this.table] || [];

    const newRecords = arr.map((rec: any) => {
      const newRec = {
        id: rec.id || uuid(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...rec
      };
      tableData.push(newRec);
      return newRec;
    });

    db[this.table] = tableData;
    saveLocalDb(db);
    this.data = newRecords;

    triggerRealtimeEvent(this.table, "INSERT", newRecords);
    return this;
  }

  // Updates
  update(updates: any) {
    const db = loadLocalDb();
    const tableData = db[this.table] || [];

    const updatedRecords: any[] = [];
    const newTableData = tableData.map((row: any) => {
      const matches = this.filters.every(f => f(row));
      if (matches) {
        const updated = {
          ...row,
          ...updates,
          updated_at: new Date().toISOString()
        };
        updatedRecords.push(updated);
        return updated;
      }
      return row;
    });

    db[this.table] = newTableData;
    saveLocalDb(db);
    this.data = updatedRecords;

    triggerRealtimeEvent(this.table, "UPDATE", updatedRecords);
    return this;
  }

  // Upsert
  upsert(records: any | any[], options?: { onConflict?: string }) {
    const arr = Array.isArray(records) ? records : [records];
    const conflictField = options?.onConflict || "id";
    const db = loadLocalDb();
    const tableData = db[this.table] || [];

    const upserted: any[] = [];
    arr.forEach(rec => {
      const existingIdx = tableData.findIndex((row: any) => row[conflictField] === rec[conflictField]);
      const now = new Date().toISOString();
      if (existingIdx > -1) {
        tableData[existingIdx] = {
          ...tableData[existingIdx],
          ...rec,
          updated_at: now
        };
        upserted.push(tableData[existingIdx]);
      } else {
        const newRec = {
          id: rec.id || uuid(),
          created_at: now,
          updated_at: now,
          ...rec
        };
        tableData.push(newRec);
        upserted.push(newRec);
      }
    });

    db[this.table] = tableData;
    saveLocalDb(db);
    this.data = upserted;

    triggerRealtimeEvent(this.table, "UPDATE", upserted);
    return this;
  }

  // Deletes
  delete() {
    const db = loadLocalDb();
    const tableData = db[this.table] || [];

    const deleted: any[] = [];
    const newTableData = tableData.filter((row: any) => {
      const matches = this.filters.every(f => f(row));
      if (matches) {
        deleted.push(row);
        return false;
      }
      return true;
    });

    db[this.table] = newTableData;
    saveLocalDb(db);
    this.data = deleted;

    triggerRealtimeEvent(this.table, "DELETE", deleted);
    return this;
  }

  private resolveRelations(rows: any[]) {
    const db = loadLocalDb();
    
    if (this.table === "orders") {
      const orderItems = db["order_items"] || [];
      const customers = db["customers"] || [];
      return rows.map((order: any) => {
        const items = orderItems.filter((item: any) => item.order_id === order.id);
        const customer = customers.find((c: any) => c.auth_user_id === order.auth_user_id || c.id === order.customer_id);
        return {
          ...order,
          order_items: items,
          customers: customer || null
        };
      });
    }
    
    if (this.table === "recipe_items") {
      const ingredients = db["ingredients"] || [];
      return rows.map((recipe: any) => {
        const ing = ingredients.find((i: any) => i.id === recipe.ingredient_id);
        return {
          ...recipe,
          ingredients: ing || null
        };
      });
    }

    return rows;
  }

  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    let result = this.data.filter((row: any) => this.filters.every(f => f(row)));

    result = this.resolveRelations(result);

    this.sorts.forEach(sort => {
      result.sort(sort);
    });

    if (this.limitCount !== null) {
      result = result.slice(0, this.limitCount);
    }

    let finalResult: any = result;
    if (this.isSingle || this.isMaybeSingle) {
      finalResult = result.length > 0 ? result[0] : null;
    }

    const response = {
      data: finalResult,
      error: null,
      count: result.length
    };

    return Promise.resolve(response).then(onfulfilled, onrejected);
  }
}

// Proxied Supabase client
export const supabase = new Proxy(originalSupabase, {
  get(target, prop, receiver) {
    if (prop === "auth") {
      const auth = Reflect.get(target, prop, receiver);
      return new Proxy(auth, {
        get(authTarget, authProp) {
          if (authProp === "signOut") {
            return async (...args: any[]) => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("dev-bypass-role");
              }
              return authTarget.signOut(...args);
            };
          }
          const bypassRole = getDevBypassRole();
          if (bypassRole) {
            if (authProp === "getSession") {
              return async () => {
                const user = getMockUser(bypassRole);
                return {
                  data: {
                    session: {
                      access_token: "mock-dev-token",
                      refresh_token: "mock-dev-token",
                      expires_in: 3600,
                      expires_at: Math.floor(Date.now() / 1000) + 3600,
                      token_type: "bearer",
                      user,
                    },
                  },
                  error: null,
                };
              };
            }
            if (authProp === "getUser") {
              return async () => {
                const user = getMockUser(bypassRole);
                return {
                  data: { user },
                  error: null,
                };
              };
            }
            if (authProp === "onAuthStateChange") {
              return (callback: any) => {
                const user = getMockUser(bypassRole);
                const session = {
                  access_token: "mock-dev-token",
                  refresh_token: "mock-dev-token",
                  expires_in: 3600,
                  expires_at: Math.floor(Date.now() / 1000) + 3600,
                  token_type: "bearer",
                  user,
                };
                setTimeout(() => {
                  callback("SIGNED_IN", session);
                }, 0);
                return {
                  data: {
                    subscription: {
                      unsubscribe: () => {},
                    },
                  },
                };
              };
            }
          }
          return Reflect.get(authTarget, authProp);
        },
      });
    }

    if (prop === "channel") {
      return function (channelName: string) {
        return {
          on(type: string, filter: any, callback: (payload: any) => void) {
            realtimeCallbacks.push(callback);
            return this;
          },
          subscribe() {
            return this;
          }
        };
      };
    }

    if (prop === "removeChannel") {
      return function () {
        return Promise.resolve();
      };
    }

    if (prop === "from") {
      return function (table: string) {
        // Unconditionally return the local in-memory/localStorage query builder for all tables
        return new MockQueryBuilder(table);
      };
    }

    return Reflect.get(target, prop, receiver);
  },
});
