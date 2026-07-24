import { t as supabase } from "./supabase-BbREKNGv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase.service-B-38Jtjp.js
/**
* เรียกใช้หลังจาก Email/Password หรือ Google login สำเร็จ:
* 1. Upsert user record โดยใช้ auth_user_id
* 2. Upsert customer record
* คืนค่า { user, customer }
*/
async function syncAuthUserToSupabase(authUser) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const client = supabase;
	const { data: existingUser } = await client.from("users").select("role, is_active").eq("auth_user_id", authUser.id).maybeSingle();
	const userRole = existingUser?.role || authUser.user_metadata?.role || "customer";
	let isActive = true;
	if (existingUser) isActive = existingUser.is_active !== false;
	else isActive = userRole === "admin" || userRole === "captain" || userRole === "staff" ? false : true;
	const displayName = authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "User";
	const { data: dbUser, error: userError } = await client.from("users").upsert({
		auth_user_id: authUser.id,
		display_name: displayName,
		email: authUser.email,
		picture_url: authUser.user_metadata?.avatar_url ?? null,
		role: userRole,
		is_active: isActive,
		updated_at: now,
		last_login_at: now
	}, {
		onConflict: "auth_user_id",
		ignoreDuplicates: false
	}).select().single();
	if (userError) {
		console.error("[Supabase] syncAuthUserToSupabase (users) error:", userError);
		throw userError;
	}
	const { data: dbCustomer, error: custError } = await client.from("customers").upsert({
		user_id: dbUser.id,
		auth_user_id: authUser.id,
		display_name: dbUser.display_name,
		email: dbUser.email,
		updated_at: now
	}, {
		onConflict: "auth_user_id",
		ignoreDuplicates: false
	}).select().single();
	if (custError) {
		console.error("[Supabase] syncAuthUserToSupabase (customers) error:", custError);
		throw custError;
	}
	return {
		user: dbUser,
		customer: dbCustomer
	};
}
/**
* ดึงรายการวัตถุดิบทั้งหมดจาก Supabase
*/
async function getIngredients() {
	const { data, error } = await supabase.from("ingredients").select("*").order("name", { ascending: true });
	if (error) {
		console.error("[Supabase] getIngredients error:", error);
		throw error;
	}
	return data;
}
/**
* อัปเดตปริมาณวัตถุดิบในสต็อก
*/
async function updateIngredientStock(id, quantity, name, unit, minThreshold) {
	const client = supabase;
	const updates = {
		quantity,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	if (name !== void 0) updates.name = name;
	if (unit !== void 0) updates.unit = unit;
	if (minThreshold !== void 0) updates.min_threshold = minThreshold;
	const { data, error } = await client.from("ingredients").update(updates).eq("id", id).select();
	if (error) {
		console.error("[Supabase] updateIngredientStock error:", error);
		throw error;
	}
	return data;
}
/**
* เพิ่มวัตถุดิบใหม่เข้าระบบ
*/
async function addIngredient(name, quantity, unit, minThreshold) {
	const { data, error } = await supabase.from("ingredients").insert({
		name,
		quantity,
		unit,
		min_threshold: minThreshold,
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).select();
	if (error) {
		console.error("[Supabase] addIngredient error:", error);
		throw error;
	}
	return data;
}
/**
* ลบวัตถุดิบออกจากระบบ
*/
async function deleteIngredient(id) {
	const { error } = await supabase.from("ingredients").delete().eq("id", id);
	if (error) {
		console.error("[Supabase] deleteIngredient error:", error);
		throw error;
	}
}
/**
* ปรับปรุงสต็อกวัตถุดิบอัตโนมัติตามเมนูและตัวเลือกในออเดอร์
*/
async function adjustStockFromOrder(orderItems, direction) {
	try {
		const client = supabase;
		const { data: ingredients, error: ingError } = await client.from("ingredients").select("*");
		if (ingError || !ingredients) {
			console.error("[adjustStockFromOrder] failed to fetch ingredients:", ingError);
			return;
		}
		const coefficient = direction === "deduct" ? -1 : 1;
		for (const item of orderItems) {
			const name = item.name;
			const qty = item.qty;
			const updates = [];
			for (const p of [
				{
					key: "หมูสับ",
					name: "หมูสับ",
					req: 120
				},
				{
					key: "หมูกรอบ",
					name: "หมูกรอบ",
					req: 100
				},
				{
					key: "หมูชิ้น",
					name: "หมูชิ้น",
					req: 120
				},
				{
					key: "ไก่สับ",
					name: "ไก่สับ",
					req: 120
				},
				{
					key: "ไก่ต้ม",
					name: "ไก่ต้ม",
					req: 100
				},
				{
					key: "เนื้อ",
					name: "เนื้อ",
					req: 120
				},
				{
					key: "หมึก",
					name: "หมึก",
					req: 120
				},
				{
					key: "กุ้ง",
					name: "กุ้ง",
					req: 120
				},
				{
					key: "หอยลาย",
					name: "หอยลาย",
					req: 120
				}
			]) if (name.includes(p.key)) {
				const ing = ingredients.find((i) => i.name === p.name);
				if (ing) {
					const change = p.req * qty * coefficient;
					updates.push({
						id: ing.id,
						newQty: Math.max(0, Number(ing.quantity) + change)
					});
				}
			}
			if (name.includes("ไข่ดาว") || name.includes("ไข่เจียว") || name.includes("ไข่ต้ม")) {
				const ing = ingredients.find((i) => i.name === "ไข่ไก่");
				if (ing) {
					const change = 1 * qty * coefficient;
					updates.push({
						id: ing.id,
						newQty: Math.max(0, Number(ing.quantity) + change)
					});
				}
			}
			if (name.includes("ไส้กรอก")) {
				const ing = ingredients.find((i) => i.name === "ไส้กรอก");
				if (ing) {
					const change = 1 * qty * coefficient;
					updates.push({
						id: ing.id,
						newQty: Math.max(0, Number(ing.quantity) + change)
					});
				}
			}
			if (name.includes("กุนเชียง")) {
				const ing = ingredients.find((i) => i.name === "กุนเชียง");
				if (ing) {
					const change = 1 * qty * coefficient;
					updates.push({
						id: ing.id,
						newQty: Math.max(0, Number(ing.quantity) + change)
					});
				}
			}
			for (const update of updates) await client.from("ingredients").update({
				quantity: update.newQty,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", update.id);
		}
	} catch (err) {
		console.error("[adjustStockFromOrder] Exception:", err);
	}
}
//#endregion
export { syncAuthUserToSupabase as a, getIngredients as i, adjustStockFromOrder as n, updateIngredientStock as o, deleteIngredient as r, addIngredient as t };
