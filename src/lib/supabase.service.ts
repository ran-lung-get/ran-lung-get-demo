import { supabase } from "./supabase";
import type { UserRow, CustomerRow } from "./supabase.types";
import type { LiffProfile } from "./liff";
export type LocalAuthUser = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    display_name?: string;
    avatar_url?: string;
    role?: string;
    [key: string]: any;
  };
};

// ─────────────────────────────────────────────────────────────
// User Service — จัดการข้อมูล users table
// ─────────────────────────────────────────────────────────────

/**
 * Upsert ข้อมูลผู้ใช้จาก LINE profile
 * ถ้ามีอยู่แล้ว → อัปเดต display_name, picture_url, last_login_at
 * ถ้าใหม่ → สร้าง record ใหม่
 */
export async function upsertUser(profile: LiffProfile): Promise<UserRow> {
  const now = new Date().toISOString();

  // ใช้ any cast เพราะ Supabase SDK ต้องการ typed schema generation
  // ซึ่งในโปรเจกต์นี้ใช้ manual type ผ่าน supabase.types.ts แทน
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = supabase as any;

  const { data, error } = await client
    .from("users")
    .upsert(
      {
        line_user_id: profile.userId,
        display_name: profile.displayName,
        picture_url: profile.pictureUrl ?? null,
        status_message: profile.statusMessage ?? null,
        is_active: true,
        updated_at: now,
        last_login_at: now,
      },
      {
        onConflict: "line_user_id",
        ignoreDuplicates: false,
      }
    )
    .select()
    .single();

  if (error) {
    console.error("[Supabase] upsertUser error:", error);
    throw error;
  }

  return data as UserRow;
}

/**
 * ดึงข้อมูล user จาก line_user_id
 */
export async function getUserByLineId(lineUserId: string): Promise<UserRow | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = supabase as any;

  const { data, error } = await client
    .from("users")
    .select("*")
    .eq("line_user_id", lineUserId)
    .maybeSingle();

  if (error) {
    console.error("[Supabase] getUserByLineId error:", error);
    throw error;
  }

  return data as UserRow | null;
}

// ─────────────────────────────────────────────────────────────
// Customer Service — จัดการข้อมูล customers table
// ─────────────────────────────────────────────────────────────

/**
 * Upsert ข้อมูลลูกค้า — สร้าง/อัปเดต customer profile ที่ผูกกับ user
 */
export async function upsertCustomer(
  user: UserRow,
  extra?: {
    phone?: string;
    email?: string;
    default_address?: string;
    default_address_type?: "home" | "work" | "dorm";
    notes?: string;
  }
): Promise<CustomerRow> {
  const now = new Date().toISOString();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = supabase as any;

  const { data, error } = await client
    .from("customers")
    .upsert(
      {
        user_id: user.id,
        line_user_id: user.line_user_id,
        display_name: user.display_name,
        updated_at: now,
        ...(extra?.phone !== undefined && { phone: extra.phone }),
        ...(extra?.email !== undefined && { email: extra.email }),
        ...(extra?.default_address !== undefined && { default_address: extra.default_address }),
        ...(extra?.default_address_type !== undefined && { default_address_type: extra.default_address_type }),
        ...(extra?.notes !== undefined && { notes: extra.notes }),
      },
      {
        onConflict: "line_user_id",
        ignoreDuplicates: false,
      }
    )
    .select()
    .single();

  if (error) {
    console.error("[Supabase] upsertCustomer error:", error);
    throw error;
  }

  return data as CustomerRow;
}

/**
 * ดึงข้อมูลลูกค้าจาก line_user_id
 */
export async function getCustomerByLineId(lineUserId: string): Promise<CustomerRow | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = supabase as any;

  const { data, error } = await client
    .from("customers")
    .select("*")
    .eq("line_user_id", lineUserId)
    .maybeSingle();

  if (error) {
    console.error("[Supabase] getCustomerByLineId error:", error);
    throw error;
  }

  return data as CustomerRow | null;
}

/**
 * อัปเดตยอดซื้อสะสมของลูกค้าหลังจากสั่งอาหาร
 */
export async function incrementCustomerStats(
  lineUserId: string,
  orderTotal: number
): Promise<void> {
  const customer = await getCustomerByLineId(lineUserId);
  if (!customer) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = supabase as any;

  const { error } = await client
    .from("customers")
    .update({
      total_orders: customer.total_orders + 1,
      total_spent: customer.total_spent + orderTotal,
      updated_at: new Date().toISOString(),
    })
    .eq("line_user_id", lineUserId);

  if (error) {
    console.error("[Supabase] incrementCustomerStats error:", error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
// Login Flow — เรียกทั้งสองพร้อมกัน
// ─────────────────────────────────────────────────────────────

/**
 * เรียกใช้หลังจาก LINE login สำเร็จ:
 * 1. Upsert user record
 * 2. Upsert customer record
 * คืนค่า { user, customer }
 */
export async function syncLineUserToSupabase(profile: LiffProfile): Promise<{
  user: UserRow;
  customer: CustomerRow;
}> {
  const user = await upsertUser(profile);
  const customer = await upsertCustomer(user);
  return { user, customer };
}

/**
 * เรียกใช้หลังจาก Email/Password หรือ Google login สำเร็จ:
 * 1. Upsert user record โดยใช้ auth_user_id
 * 2. Upsert customer record
 * คืนค่า { user, customer }
 */
export async function syncAuthUserToSupabase(authUser: LocalAuthUser): Promise<{
  user: UserRow;
  customer: CustomerRow;
}> {
  const now = new Date().toISOString();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = supabase as any;

  // 1. Check if user already exists to preserve their role
  const { data: existingUser } = await client
    .from("users")
    .select("role, is_active")
    .eq("auth_user_id", authUser.id)
    .maybeSingle();

  const userRole = existingUser?.role || authUser.user_metadata?.role || "customer";

  let isActive = true;
  if (existingUser) {
    isActive = existingUser.is_active !== false;
  } else {
    isActive = (userRole === "admin" || userRole === "captain" || userRole === "staff") ? false : true;
  }

  // 2. Upsert User
  const displayName = authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "User";
  const { data: dbUser, error: userError } = await client
    .from("users")
    .upsert(
      {
        auth_user_id: authUser.id,
        display_name: displayName,
        email: authUser.email,
        picture_url: authUser.user_metadata?.avatar_url ?? null,
        role: userRole,
        is_active: isActive,
        updated_at: now,
        last_login_at: now,
      },
      {
        onConflict: "auth_user_id",
        ignoreDuplicates: false,
      }
    )
    .select()
    .single();

  if (userError) {
    console.error("[Supabase] syncAuthUserToSupabase (users) error:", userError);
    throw userError;
  }

  // 2. Upsert Customer
  const { data: dbCustomer, error: custError } = await client
    .from("customers")
    .upsert(
      {
        user_id: dbUser.id,
        auth_user_id: authUser.id,
        display_name: dbUser.display_name,
        email: dbUser.email,
        updated_at: now,
      },
      {
        onConflict: "auth_user_id",
        ignoreDuplicates: false,
      }
    )
    .select()
    .single();

  if (custError) {
    console.error("[Supabase] syncAuthUserToSupabase (customers) error:", custError);
    throw custError;
  }

  return { user: dbUser as UserRow, customer: dbCustomer as CustomerRow };
}

/**
 * ดึงรายการวัตถุดิบทั้งหมดจาก Supabase
 */
export async function getIngredients() {
  const client = supabase as any;
  const { data, error } = await client
    .from("ingredients")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("[Supabase] getIngredients error:", error);
    throw error;
  }
  return data;
}

/**
 * อัปเดตปริมาณวัตถุดิบในสต็อก
 */
export async function updateIngredientStock(id: string, quantity: number, name?: string, unit?: string, minThreshold?: number) {
  const client = supabase as any;
  const updates: any = { quantity, updated_at: new Date().toISOString() };
  if (name !== undefined) updates.name = name;
  if (unit !== undefined) updates.unit = unit;
  if (minThreshold !== undefined) updates.min_threshold = minThreshold;

  const { data, error } = await client
    .from("ingredients")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("[Supabase] updateIngredientStock error:", error);
    throw error;
  }
  return data;
}

/**
 * เพิ่มวัตถุดิบใหม่เข้าระบบ
 */
export async function addIngredient(name: string, quantity: number, unit: string, minThreshold: number) {
  const client = supabase as any;
  const { data, error } = await client
    .from("ingredients")
    .insert({
      name,
      quantity,
      unit,
      min_threshold: minThreshold,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select();

  if (error) {
    console.error("[Supabase] addIngredient error:", error);
    throw error;
  }
  return data;
}

/**
 * ลบวัตถุดิบออกจากระบบ
 */
export async function deleteIngredient(id: string) {
  const client = supabase as any;
  const { error } = await client
    .from("ingredients")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[Supabase] deleteIngredient error:", error);
    throw error;
  }
}

/**
 * ปรับปรุงสต็อกวัตถุดิบอัตโนมัติตามเมนู ตัวเลือก และท็อปปิ้งเสริม (Addons) ในออเดอร์
 * รองรับทั้งการตัดสต็อกเมื่อสั่ง (deduct) และการคืนสต็อกเมื่อยกเลิก (add)
 */
export async function adjustStockFromOrder(
  orderItems: {
    name: string;
    qty: number;
    addons?: { id?: string; name: string; price?: number }[];
    options?: Record<string, string>;
    note?: string;
  }[],
  direction: "deduct" | "add" = "deduct"
) {
  if (!orderItems || orderItems.length === 0) return;

  try {
    const client = supabase as any;

    // 1. ดึงวัตถุดิบทั้งหมดที่มีอยู่ในระบบ (Supabase หรือ Local Storage)
    let ingredients: any[] = [];
    try {
      const { data, error } = await client.from("ingredients").select("*");
      if (!error && data && data.length > 0) {
        ingredients = data;
      }
    } catch {}

    if (ingredients.length === 0 && typeof window !== "undefined") {
      const local = localStorage.getItem("ran-lung-get-mock-ingredients");
      if (local) {
        try {
          ingredients = JSON.parse(local);
        } catch {}
      }
    }

    if (ingredients.length === 0) {
      ingredients = [
        { id: "ing_1", name: "หมูสับ", quantity: 1000, unit: "g", min_threshold: 200 },
        { id: "ing_2", name: "หมูกรอบ", quantity: 1000, unit: "g", min_threshold: 200 },
        { id: "ing_3", name: "หมูชิ้น", quantity: 1000, unit: "g", min_threshold: 200 },
        { id: "ing_4", name: "ไก่สับ", quantity: 1000, unit: "g", min_threshold: 200 },
        { id: "ing_5", name: "ไก่ต้ม", quantity: 1000, unit: "g", min_threshold: 200 },
        { id: "ing_6", name: "เนื้อ", quantity: 1000, unit: "g", min_threshold: 200 },
        { id: "ing_7", name: "หมึก", quantity: 1000, unit: "g", min_threshold: 200 },
        { id: "ing_8", name: "กุ้ง", quantity: 1000, unit: "g", min_threshold: 200 },
        { id: "ing_9", name: "หอยลาย", quantity: 1000, unit: "g", min_threshold: 200 },
        { id: "ing_10", name: "ไข่ไก่", quantity: 100, unit: "pcs", min_threshold: 15 },
        { id: "ing_11", name: "ไส้กรอก", quantity: 50, unit: "pcs", min_threshold: 10 },
        { id: "ing_12", name: "กุนเชียง", quantity: 50, unit: "pcs", min_threshold: 10 },
      ];
    }

    // Map: ingredientName -> accumulated change amount
    const deductionMap = new Map<string, number>();

    const addDeduction = (ingName: string, amount: number) => {
      const current = deductionMap.get(ingName) || 0;
      deductionMap.set(ingName, current + amount);
    };

    for (const item of orderItems) {
      const name = item.name || "";
      const qty = Number(item.qty) || 1;

      // 1. ตรวจสอบจากชื่อเมนู (Main Item Name)
      if (name.includes("หมูกรอบ")) {
        addDeduction("หมูกรอบ", 100 * qty);
      } else if (name.includes("หมูสับ")) {
        addDeduction("หมูสับ", 120 * qty);
      } else if (name.includes("หมูชิ้น") || name.includes("หมูนุ่ม")) {
        addDeduction("หมูชิ้น", 120 * qty);
      } else if (name.includes("ไก่สับ")) {
        addDeduction("ไก่สับ", 120 * qty);
      } else if (name.includes("ไก่ต้ม") || name.includes("ไก่ชิ้น") || (name.includes("ไก่") && !name.includes("ไข่"))) {
        addDeduction("ไก่ต้ม", 100 * qty);
      } else if (name.includes("เนื้อ") || name.includes("เนื้อวัว")) {
        addDeduction("เนื้อ", 120 * qty);
      } else if (name.includes("หมึก") || name.includes("ปลาหมึก")) {
        addDeduction("หมึก", 120 * qty);
      } else if (name.includes("กุ้ง")) {
        addDeduction("กุ้ง", 120 * qty);
      } else if (name.includes("หอยลาย") || name.includes("หอย")) {
        addDeduction("หอยลาย", 120 * qty);
      } else if (name.includes("ทะเล") || name.includes("ซีฟู้ด")) {
        addDeduction("กุ้ง", 60 * qty);
        addDeduction("หมึก", 60 * qty);
      }

      // 2. ตรวจสอบจากตัวเลือก (Options เช่น meat: 'crispy_pork' หรือ meat: 'pork')
      if (item.options) {
        for (const [_, val] of Object.entries(item.options)) {
          const valStr = String(val).toLowerCase();
          if (valStr.includes("crispy_pork") || valStr.includes("หมูกรอบ")) {
            addDeduction("หมูกรอบ", 100 * qty);
          } else if (valStr.includes("minced_pork") || valStr.includes("หมูสับ")) {
            addDeduction("หมูสับ", 120 * qty);
          } else if (valStr.includes("sliced_pork") || valStr.includes("pork") || valStr.includes("หมู")) {
            addDeduction("หมูชิ้น", 120 * qty);
          } else if (valStr.includes("chicken") || valStr.includes("ไก่")) {
            addDeduction("ไก่ต้ม", 100 * qty);
          } else if (valStr.includes("beef") || valStr.includes("เนื้อ")) {
            addDeduction("เนื้อ", 120 * qty);
          } else if (valStr.includes("squid") || valStr.includes("หมึก")) {
            addDeduction("หมึก", 120 * qty);
          } else if (valStr.includes("shrimp") || valStr.includes("กุ้ง")) {
            addDeduction("กุ้ง", 120 * qty);
          } else if (valStr.includes("seafood") || valStr.includes("ทะเล")) {
            addDeduction("กุ้ง", 60 * qty);
            addDeduction("หมึก", 60 * qty);
          }
        }
      }

      // 3. ตรวจสอบท็อปปิ้งเสริม (Addons)
      if (Array.isArray(item.addons)) {
        for (const addon of item.addons) {
          const aName = (addon.name || addon.id || "").toLowerCase();
          if (aName.includes("ไข่") || aName.includes("egg")) {
            addDeduction("ไข่ไก่", 1 * qty);
          } else if (aName.includes("หมูกรอบ") || aName.includes("bacon") || aName.includes("crispy")) {
            addDeduction("หมูกรอบ", 60 * qty);
          } else if (aName.includes("ไส้กรอก") || aName.includes("sausage")) {
            addDeduction("ไส้กรอก", 1 * qty);
          } else if (aName.includes("กุนเชียง")) {
            addDeduction("กุนเชียง", 1 * qty);
          } else if (aName.includes("หมูสับ")) {
            addDeduction("หมูสับ", 60 * qty);
          } else if (aName.includes("กุ้ง")) {
            addDeduction("กุ้ง", 60 * qty);
          }
        }
      }

      // 4. ตรวจสอบไข่จากชื่อเมนูตรงๆ (เช่น ไข่ดาว, ไข่เจียว)
      if (name.includes("ไข่ดาว") || name.includes("ไข่เจียว") || name.includes("ไข่ต้ม")) {
        addDeduction("ไข่ไก่", 1 * qty);
      }
    }

    if (deductionMap.size === 0) return;

    const coefficient = direction === "deduct" ? -1 : 1;
    const updatedIngredients = ingredients.map((ing: any) => {
      // Find matching deduction by name
      let deduction = 0;
      for (const [ingKey, amount] of deductionMap.entries()) {
        if (ing.name === ingKey || ing.name.includes(ingKey) || ingKey.includes(ing.name)) {
          deduction += amount;
        }
      }

      if (deduction === 0) return ing;

      const currentQty = Number(ing.quantity) || 0;
      const nextQty = Math.max(0, currentQty + deduction * coefficient);
      return {
        ...ing,
        quantity: nextQty,
        updated_at: new Date().toISOString(),
      };
    });

    // 1. บันทึกลง LocalStorage และกระจาย Events
    if (typeof window !== "undefined") {
      localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(updatedIngredients));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "ran-lung-get-mock-ingredients",
          newValue: JSON.stringify(updatedIngredients),
        })
      );
      try {
        window.dispatchEvent(
          new CustomEvent("ran-lung-get-stock-updated", { detail: updatedIngredients })
        );
      } catch {}
    }

    // 2. บันทึกลง Supabase Database
    for (const ing of updatedIngredients) {
      const original = ingredients.find((i: any) => i.id === ing.id || i.name === ing.name);
      if (original && Number(original.quantity) !== Number(ing.quantity)) {
        try {
          await client
            .from("ingredients")
            .update({ quantity: ing.quantity, updated_at: new Date().toISOString() })
            .eq("id", ing.id);
        } catch (dbErr) {
          console.warn(`[adjustStockFromOrder] Supabase update skipped for ${ing.name}:`, dbErr);
        }
      }
    }
  } catch (err) {
    console.error("[adjustStockFromOrder] Exception:", err);
  }
}


// ─────────────────────────────────────────────────────────────
// Store Settings
// ─────────────────────────────────────────────────────────────

export async function getNextQueueNumber(): Promise<number> {
  try {
    // get current
    const { data } = await supabase.from("store_settings").select("value").eq("id", "takeaway_queue").single();
    let current = 1;
    if (data && data.value && data.value.counter) {
      current = data.value.counter;
    }
    const nextQueue = current + 1;
    await supabase.from("store_settings").upsert({ 
      id: "takeaway_queue", 
      value: { counter: nextQueue },
      updated_at: new Date().toISOString()
    });
    return current;
  } catch (err) {
    console.error("Queue counter failed:", err);
    return Date.now() % 1000;
  }
}

// ─────────────────────────────────────────────────────────────
// Reset & Clear Orders (Admin Danger Zone)
// ─────────────────────────────────────────────────────────────

/**
 * ล้างข้อมูลออเดอร์ทั้งหมดในระบบ:
 * 1. ลบรายการ order_items ทั้งหมด
 * 2. ลบรายการ orders ทั้งหมด
 * 3. รีเซ็ตสถานะโต๊ะ restaurant_tables ทุกโต๊ะกลับเป็น available
 * 4. รีเซ็ตตัวนับคิว takeaway_queue เป็น 1
 * 5. ล้างแคชใน LocalStorage และส่งสัญญาณ realtime ให้หน้าอื่นๆ อัปเดต
 */
export async function clearAllOrdersData(): Promise<{ success: boolean; error?: string; count?: number }> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const client = supabase as any;

    // 1. Delete order_items
    const { error: itemsError } = await client
      .from("order_items")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (itemsError) {
      console.warn("[clearAllOrdersData] order_items delete warning:", itemsError);
    }

    // 2. Delete orders
    const { data: deletedOrders, error: ordersError } = await client
      .from("orders")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000")
      .select("id");

    if (ordersError) {
      console.warn("[clearAllOrdersData] orders delete warning:", ordersError);
    }

    // 3. Reset table status to 'available'
    const { error: tableError } = await client
      .from("restaurant_tables")
      .update({ status: "available" })
      .neq("status", "available");

    if (tableError) {
      console.warn("[clearAllOrdersData] restaurant_tables reset warning:", tableError);
    }

    try {
      await client
        .from("tables")
        .update({ status: "available" })
        .neq("status", "available");
    } catch {
      // Ignored if table 'tables' doesn't exist
    }

    // 4. Reset takeaway queue
    try {
      await client.from("store_settings").upsert({
        id: "takeaway_queue",
        value: { counter: 1 },
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn("[clearAllOrdersData] queue reset warning:", e);
    }

    // 5. Clear localStorage mock & caches
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("ran-lung-get-orders");
        localStorage.removeItem("ran-lung-get-cart");
        localStorage.removeItem("ran-lung-get-order-history");
        
        const dbStr = localStorage.getItem("ran-lung-get-mock-db");
        if (dbStr) {
          const db = JSON.parse(dbStr);
          db.orders = [];
          db.order_items = [];
          if (Array.isArray(db.restaurant_tables)) {
            db.restaurant_tables = db.restaurant_tables.map((t: any) => ({ ...t, status: "available" }));
          }
          localStorage.setItem("ran-lung-get-mock-db", JSON.stringify(db));
        }

        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new CustomEvent("ran-lung-get-orders-cleared"));
      } catch (e) {
        console.warn("[clearAllOrdersData] localStorage clean error:", e);
      }
    }

    return { success: true, count: deletedOrders?.length || 0 };
  } catch (err: any) {
    console.error("[clearAllOrdersData] error:", err);
    return { success: false, error: err?.message || "ไม่สามารถล้างข้อมูลออเดอร์ได้" };
  }
}

