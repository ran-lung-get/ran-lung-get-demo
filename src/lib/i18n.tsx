import React, { createContext, useContext, useState, useEffect } from "react";
import { translateApi } from "./api/translation.functions";

export type Language = "th" | "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tMenu: (text: string, field?: "name" | "desc") => string;
  loadingLanguages: Record<string, boolean>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Local memory and localStorage cache for dynamic translations
const dynamicCacheKey = "ran-lung-get-dynamic-translations";
let dynamicCache: Record<string, string> = {};

if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem(dynamicCacheKey);
    if (saved) {
      dynamicCache = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load dynamic translation cache:", e);
  }
}

// ─────────────────────────────────────────────────────────────
// STATIC DICTIONARY FOR UI TEXTS
// ─────────────────────────────────────────────────────────────
const uiDictionary: Record<string, Record<Language, string>> = {
  // Navigation / Headers
  "ร้านลุงเกตุ": { th: "ร้านลุงเกตุ", en: "Ran Lung Get", zh: "龙葛特餐馆" },
  "สั่งอาหารพรีเมียมผ่าน LINE LIFF": {
    th: "สั่งอาหารพรีเมียมผ่าน LINE LIFF",
    en: "Order premium food via LINE LIFF",
    zh: "通过 LINE LIFF 订购优质美食",
  },
  "ระบบแปลภาษาเรียลไทม์": { th: "ระบบแปลภาษาเรียลไทม์", en: "Real-time Translation", zh: "实时翻译系统" },
  "Translate Engine": { th: "Translate Engine", en: "Translate Engine", zh: "翻译引擎" },
  "สวัสดี, ยินดีต้อนรับ": { th: "สวัสดี, ยินดีต้อนรับ", en: "Hello, Welcome", zh: "您好，欢迎光临" },
  "เลือกประสบการณ์การรับประทาน": { th: "เลือกประสบการณ์การรับประทาน", en: "Choose your dining experience", zh: "选择您的用餐体验" },
  "เปิดบริการ": { th: "เปิดบริการ", en: "Open", zh: "营业中" },
  "ปิดบริการ": { th: "ปิดบริการ", en: "Closed", zh: "已关店" },
  "สั่งอาหาร": { th: "สั่งอาหาร", en: "Order Now", zh: "开始点餐" },
  "ช่องทางการรับอาหาร": { th: "ช่องทางการรับอาหาร", en: "Dining Option", zh: "用餐方式" },
  "(กรุณาเลือกช่องทางการรับอาหารด้านบนเพื่อระบุรายละเอียด)": { th: "(กรุณาเลือกช่องทางการรับอาหารด้านบนเพื่อระบุรายละเอียด)", en: "(Please select dining option above to specify details)", zh: "(请在上方选择用餐方式以填写详情)" },
  "* กรุณาเลือกช่องทางการรับอาหาร (ทานที่ร้าน, จัดส่งถึงที่ หรือ รับกลับบ้าน) ก่อนเริ่มสั่งซื้อ": { th: "* กรุณาเลือกช่องทางการรับอาหาร (ทานที่ร้าน, จัดส่งถึงที่ หรือ รับกลับบ้าน) ก่อนเริ่มสั่งซื้อ", en: "* Please select dining channel (dine-in, delivery, or takeaway) before ordering", zh: "* 下单前请选择用餐方式（堂食、外送或外带）" },
  "ร้านจะจัดเตรียมแพ็กอาหารใส่กล่องให้อย่างดี คุณสามารถมารับอาหารได้ที่เคาน์เตอร์ร้านเมื่อสถานะเปลี่ยนเป็น": { th: "ร้านจะจัดเตรียมแพ็กอาหารใส่กล่องให้อย่างดี คุณสามารถมารับอาหารได้ที่เคาน์เตอร์ร้านเมื่อสถานะเปลี่ยนเป็น", en: "The restaurant will package your food nicely. You can pick it up at the counter when the status changes to", zh: "餐厅将为您妥善打包食物。当状态变为时，您可以在柜台取餐" },
  "พร้อมเสิร์ฟ": { th: "พร้อมเสิร์ฟ", en: "Ready to Serve", zh: "准备就绪" },
  "เลื่อนซ้าย": { th: "เลื่อนซ้าย", en: "Scroll Left", zh: "向左滚动" },
  "เลื่อนขวา": { th: "เลื่อนขวา", en: "Scroll Right", zh: "向右滚动" },
  "ค้นหาเมนู...": { th: "ค้นหาเมนู...", en: "Search menu...", zh: "搜索菜单..." },
  "เลือกประเภทอาหาร": { th: "เลือกประเภทอาหาร", en: "Select category", zh: "选择食物类别" },
  "เมนูแนะนำ": { th: "เมนูแนะนำ", en: "Recommended Menus", zh: "推荐菜单" },
  "เมนูทั้งหมด": { th: "เมนูทั้งหมด", en: "All Menus", zh: "全部菜单" },
  "ทั้งหมด": { th: "ทั้งหมด", en: "All", zh: "全部" },
  "Signature": { th: "Signature", en: "Signature", zh: "招牌" },
  "อาหารจานเดียว": { th: "อาหารจานเดียว", en: "Main Dish", zh: "单人餐" },
  "เส้น": { th: "เส้น", en: "Noodles", zh: "面类" },
  "ข้าวผัด": { th: "ข้าวผัด", en: "Fried Rice", zh: "炒饭类" },
  "มังสวิรัติ": { th: "มังสวิรัติ", en: "Vegetarian", zh: "素食" },
  "เครื่องดื่ม": { th: "เครื่องดื่ม", en: "Drinks", zh: "饮料" },
  "ของหวาน": { th: "ของหวาน", en: "Dessert", zh: "甜点" },

  // Cart & Orders
  "รถเข็น": { th: "รถเข็น", en: "Cart", zh: "购物车" },
  "รถเข็นของคุณ": { th: "รถเข็นของคุณ", en: "Your Cart", zh: "您的购物车" },
  "ตะกร้าของคุณ": { th: "ตะกร้าของคุณ", en: "Your Cart", zh: "您的购物车" },
  "ตะกร้าสินค้า": { th: "ตะกร้าสินค้า", en: "Cart", zh: "购物车" },
  "ปิด": { th: "ปิด", en: "Close", zh: "关闭" },
  "ปิดตะกร้า": { th: "ปิดตะกร้า", en: "Close cart", zh: "关闭购物车" },
  "ยังไม่มีรายการในตะกร้า": { th: "ยังไม่มีรายการในตะกร้า", en: "Your cart is empty", zh: "购物车空空如也" },
  "ไม่มีสินค้าในรถเข็น": { th: "ไม่มีสินค้าในรถเข็น", en: "Your cart is empty", zh: "购物车空空如也" },
  "ยอดรวม": { th: "ยอดรวม", en: "Subtotal", zh: "小计" },
  "กดเพื่อดูและสั่งซื้อ": { th: "กดเพื่อดูและสั่งซื้อ", en: "Tap to view & checkout", zh: "点击查看并下单" },
  "แก้ไข": { th: "แก้ไข", en: "Edit", zh: "编辑" },
  "ลบ": { th: "ลบ", en: "Delete", zh: "删除" },
  "แก้ไขรายการ": { th: "แก้ไขรายการ", en: "Edit Item", zh: "修改项目" },
  "ลบรายการ": { th: "ลบรายการ", en: "Remove Item", zh: "删除项目" },
  "เพิ่มลงตะกร้า": { th: "เพิ่มลงตะกร้า", en: "Add to Cart", zh: "加入购物车" },
  "บันทึกการแก้ไข": { th: "บันทึกการแก้ไข", en: "Save Changes", zh: "保存修改" },
  "รายการสั่งซื้อในตะกร้า": { th: "รายการสั่งซื้อในตะกร้า", en: "Cart Items", zh: "购物车商品" },
  "ไม่มีรายการสินค้าในตะกร้าของคุณ": { th: "ไม่มีรายการสินค้าในตะกร้าของคุณ", en: "No items in your cart", zh: "您的购物车中没有商品" },
  "กรุณาเลือกอาหารจากเมนูก่อนทำการชำระเงิน": { th: "กรุณาเลือกอาหารจากเมนูก่อนทำการชำระเงิน", en: "Please select food items from the menu before checkout", zh: "结账前请先在菜单中选择菜品" },
  "กลับไปเลือกซื้ออาหาร": { th: "กลับไปเลือกซื้ออาหาร", en: "Back to Menu", zh: "返回菜单" },
  "ตรวจสอบรายการก่อนชำระเงิน": { th: "ตรวจสอบรายการก่อนชำระเงิน", en: "Review order before payment", zh: "付款前请核对订单" },
  "สรุปคำสั่งซื้อ": { th: "สรุปคำสั่งซื้อ", en: "Order Summary", zh: "订单汇总" },
  "ยอดรวมอาหาร": { th: "ยอดรวมอาหาร", en: "Food Total", zh: "餐品小计" },
  "ค่าจัดส่ง": { th: "ค่าจัดส่ง", en: "Delivery Fee", zh: "配送费" },
  "รวมทั้งหมด": { th: "รวมทั้งหมด", en: "Grand Total", zh: "总计" },
  "ชำระเงินค่าอาหาร": { th: "ชำระเงินค่าอาหาร", en: "Order Payment", zh: "支付餐费" },
  "ยอดชำระทั้งหมด": { th: "ยอดชำระทั้งหมด", en: "Total Payable", zh: "应付总额" },
  "ค่าอาหาร (Subtotal)": { th: "ค่าอาหาร (Subtotal)", en: "Food Subtotal", zh: "餐品小计" },
  "ค่าจัดส่ง (Delivery Fee)": { th: "ค่าจัดส่ง (Delivery Fee)", en: "Delivery Fee", zh: "配送费" },
  "จำนวน": { th: "จำนวน", en: "Quantity", zh: "数量" },
  "ชิ้น": { th: "ชิ้น", en: "items", zh: "份" },
  "ธรรมดา": { th: "ธรรมดา", en: "Regular", zh: "普通" },
  "พิเศษ": { th: "พิเศษ", en: "Special", zh: "加量/特大" },
  "เลือกประเภทการสั่ง": { th: "เลือกประเภทการสั่ง", en: "Select Order Type", zh: "选择用餐方式" },
  "ทานที่ร้าน": { th: "ทานที่ร้าน", en: "Dine-in", zh: "堂食" },
  "รับกลับบ้าน": { th: "รับกลับบ้าน", en: "Takeaway", zh: "外带" },
  "จัดส่งถึงที่": { th: "จัดส่งถึงที่", en: "Delivery", zh: "外送" },
  "ระบุเลขโต๊ะ": { th: "ระบุเลขโต๊ะ", en: "Enter Table Number", zh: "输入桌号" },
  "ชื่อผู้รับ": { th: "ชื่อผู้รับ", en: "Recipient Name", zh: "收件人姓名" },
  "เบอร์โทรศัพท์": { th: "เบอร์โทรศัพท์", en: "Phone Number", zh: "电话号码" },
  "เบอร์โทรสำหรับติดต่อ": { th: "เบอร์โทรสำหรับติดต่อ", en: "Contact Phone Number", zh: "联系电话" },
  "กรุณากรอกเบอร์โทรให้ครบ 10 หลัก": { th: "กรุณากรอกเบอร์โทรให้ครบ 10 หลัก", en: "Please enter a 10-digit phone number", zh: "请输入10位电话号码" },
  "ที่อยู่จัดส่ง": { th: "ที่อยู่จัดส่ง", en: "Delivery Address", zh: "送货地址" },
  "ที่อยู่สำหรับจัดส่ง": { th: "ที่อยู่สำหรับจัดส่ง", en: "Delivery Address", zh: "送货地址" },
  "กรอกที่อยู่ เช่น ถนนสุขุมวิท 31": { th: "กรอกที่อยู่ เช่น ถนนสุขุมวิท 31", en: "Enter address e.g. Sukhumvit 31", zh: "输入地址 例如：素坤逸31巷" },
  "กรุณากรอกที่อยู่ให้ครบถ้วน": { th: "กรุณากรอกที่อยู่ให้ครบถ้วน", en: "Please enter your delivery address", zh: "请填写配送地址" },
  "รูปแบบการรับอาหาร": { th: "รูปแบบการรับอาหาร", en: "Delivery Method", zh: "送餐方式" },
  "* กรุณาเลือกรูปแบบการรับอาหาร": { th: "* กรุณาเลือกรูปแบบการรับอาหาร", en: "* Please select delivery method", zh: "* 请选择送餐方式" },
  "วางไว้ที่หน้าประตู": { th: "วางไว้ที่หน้าประตู", en: "Leave at door", zh: "放在门口" },
  "เราวางอาหารไว้ให้": { th: "เราวางอาหารไว้ให้", en: "Contactless delivery at door", zh: "无接触配送至门口" },
  "ลงมารับเอง": { th: "ลงมารับเอง", en: "Meet in person", zh: "下楼自取" },
  "รับที่จุดรับอาหาร": { th: "รับที่จุดรับอาหาร", en: "Pick up at drop-off point", zh: "在指定取餐点自取" },
  "ประเภทที่อยู่": { th: "ประเภทที่อยู่", en: "Address Type", zh: "地址类型" },
  "บ้าน": { th: "บ้าน", en: "Home", zh: "住宅" },
  "ที่ทำงาน": { th: "ที่ทำงาน", en: "Work", zh: "办公室" },
  "หอพัก": { th: "หอพัก", en: "Dorm", zh: "宿舍" },
  "บันทึกเพิ่มเติม (ตัวอย่าง: เผ็ดน้อย, ไม่ใส่ผัก)": {
    th: "บันทึกเพิ่มเติม (ตัวอย่าง: เผ็ดน้อย, ไม่ใส่ผัก)",
    en: "Additional notes (e.g., mild spicy, no veggies)",
    zh: "备注（例如：微辣、不要葱）",
  },
  "รายละเอียดเพิ่มเติม": { th: "รายละเอียดเพิ่มเติม", en: "Additional Notes", zh: "备注详情" },
  "สรุปรายการสั่งซื้อ": { th: "สรุปรายการสั่งซื้อ", en: "Order Summary", zh: "订单汇总" },
  "ค่าอาหาร": { th: "ค่าอาหาร", en: "Subtotal", zh: "小计" },
  "ค่าส่ง": { th: "ค่าส่ง", en: "Delivery Fee", zh: "配送费" },
  "ยอดรวมทั้งหมด": { th: "ยอดรวมทั้งหมด", en: "Total", zh: "总计" },
  "สั่งซื้อสินค้า": { th: "สั่งซื้อสินค้า", en: "Place Order", zh: "下单" },
  "กำลังสั่งซื้อ...": { th: "กำลังสั่งซื้อ...", en: "Ordering...", zh: "正在下单..." },
  "ดำเนินการสั่งซื้อ": { th: "ดำเนินการสั่งซื้อ", en: "Proceed to Checkout", zh: "去结算" },
  "เลือกช่องทางการชำระเงิน": { th: "เลือกช่องทางการชำระเงิน", en: "Select Payment Method", zh: "选择支付方式" },
  "โอนเงิน (พร้อมเพย์)": { th: "โอนเงิน (พร้อมเพย์)", en: "PromptPay Transfer", zh: "PromptPay转账" },
  "เงินสด": { th: "เงินสด", en: "Cash", zh: "现金支付" },
  "ชำระเงิน": { th: "ชำระเงิน", en: "Pay Now", zh: "立即支付" },
  "ยอมรับ": { th: "ยอมรับ", en: "Accept", zh: "同意" },
  "ไม่ยอมรับ": { th: "ไม่ยอมรับ", en: "Decline", zh: "拒绝" },
  "ยกเลิก": { th: "ยกเลิก", en: "Cancel", zh: "取消" },

  // Order Details / Status
  "รายละเอียดออเดอร์": { th: "รายละเอียดออเดอร์", en: "Order Details", zh: "订单详情" },
  "สถานะออเดอร์": { th: "สถานะออเดอร์", en: "Order Status", zh: "订单状态" },
  "รอดำเนินการ": { th: "รอดำเนินการ", en: "Pending", zh: "等待确认" },
  "กำลังเตรียม": { th: "กำลังเตรียม", en: "Preparing", zh: "正在配餐" },
  "กำลังจัดส่ง": { th: "กำลังจัดส่ง", en: "Out for Delivery", zh: "配送中" },
  "สำเร็จ": { th: "สำเร็จ", en: "Completed", zh: "已完成" },
  "เสร็จสิ้น": { th: "เสร็จสิ้น", en: "Completed", zh: "已完成" },
  "กำลังดำเนินการ": { th: "กำลังดำเนินการ", en: "In Progress", zh: "进行中" },
  "ยกเลิกแล้ว": { th: "ยกเลิกแล้ว", en: "Cancelled", zh: "已取消" },
  "ขอคืนเงิน": { th: "ขอคืนเงิน", en: "Refund Requested", zh: "申请退款" },
  "รอรับออเดอร์": { th: "รอรับออเดอร์", en: "Awaiting Confirmation", zh: "等待接单" },
  "คิว": { th: "คิว", en: "Queue", zh: "排队号" },
  "โต๊ะ": { th: "โต๊ะ", en: "Table", zh: "桌号" },
  "วันเวลาที่สั่ง": { th: "วันเวลาที่สั่ง", en: "Order Date/Time", zh: "下单时间" },
  "หมายเลขออเดอร์": { th: "หมายเลขออเดอร์", en: "Order Number", zh: "订单编号" },
  "ติดตามออเดอร์": { th: "ติดตามออเดอร์", en: "Track Order", zh: "追踪订单" },
  "ประวัติการสั่งซื้อ": { th: "ประวัติการสั่งซื้อ", en: "Order History", zh: "历史订单" },
  "ยังไม่มีประวัติการสั่งซื้อ": { th: "ยังไม่มีประวัติการสั่งซื้อ", en: "No order history yet", zh: "暂无历史订单" },
  "สั่งซื้ออีกครั้ง": { th: "สั่งซื้ออีกครั้ง", en: "Order Again", zh: "再次购买" },

  // Special Requirements Modal
  "ระบุความต้องการพิเศษ": { th: "ระบุความต้องการพิเศษ", en: "Customize Order", zh: "定制要求" },
  "ขนาด": { th: "ขนาด", en: "Size", zh: "分量" },
  "ธรรมดา": { th: "ธรรมดา", en: "Regular", zh: "普通" },
  "พิเศษ": { th: "พิเศษ", en: "Large", zh: "加大" },
  "ระดับความเผ็ด": { th: "ระดับความเผ็ด", en: "Spiciness Level", zh: "辣度选择" },
  "ไม่เผ็ด": { th: "ไม่เผ็ด", en: "Non-spicy", zh: "不辣" },
  "เผ็ดน้อย": { th: "เผ็ดน้อย", en: "Mild", zh: "微辣" },
  "เผ็ดกลาง": { th: "เผ็ดกลาง", en: "Medium", zh: "中辣" },
  "เผ็ดมาก": { th: "เผ็ดมาก", en: "Hot", zh: "特辣" },
  "เลือกเนื้อสัตว์": { th: "เลือกเนื้อสัตว์", en: "Select Protein", zh: "选择肉类" },
  "เลือกท็อปปิ้งเพิ่มเติม": { th: "เลือกท็อปปิ้งเพิ่มเติม", en: "Select Toppings", zh: "加配料" },
  "เพิ่มลงรถเข็น": { th: "เพิ่มลงรถเข็น", en: "Add to Cart", zh: "加入购物车" },
  "อัปเดตรถเข็น": { th: "อัปเดตรถเข็น", en: "Update Cart", zh: "更新购物车" },

  // Toast / Alerts
  "เพิ่มลงในรถเข็นสำเร็จ": { th: "เพิ่มลงในรถเข็นสำเร็จ", en: "Added to cart successfully", zh: "已成功加入购物车" },
  "อัปเดตรายการเรียบร้อย": { th: "อัปเดตรายการเรียบร้อย", en: "Cart updated successfully", zh: "购物车已成功更新" },
  "ลบรายการเรียบร้อย": { th: "ลบรายการเรียบร้อย", en: "Item removed from cart", zh: "已从购物车删除商品" },
  "กรุณากรอกเลขโต๊ะ": { th: "กรุณากรอกเลขโต๊ะ", en: "Please enter table number", zh: "请输入您的桌号" },
  "กรุณากรอกเบอร์โทรศัพท์": { th: "กรุณากรอกเบอร์โทรศัพท์", en: "Please enter phone number", zh: "请输入您的电话号码" },
  "กรุณากรอกที่อยู่สำหรับจัดส่ง": {
    th: "กรุณากรอกที่อยู่สำหรับจัดส่ง",
    en: "Please enter delivery address",
    zh: "请输入您的配送地址",
  },
  "กรุณากรอกชื่อผู้รับ": { th: "กรุณากรอกชื่อผู้รับ", en: "Please enter recipient name", zh: "请输入收件人姓名" },

  // Demo Mode & Store Status
  "โหมดสาธิต": { th: "โหมดสาธิต", en: "Demo Mode", zh: "演示模式" },
  "เข้าสู่หน้าร้าน (โหมดสาธิตสำหรับทดสอบ)": { th: "เข้าสู่หน้าร้าน (โหมดสาธิตสำหรับทดสอบ)", en: "Enter Store (Testing Demo Mode)", zh: "进入店铺（测试演示模式）" },
  "* ปุ่มด้านบนสำหรับผู้ตรวจสอบเพื่อทดสอบการใช้งาน ในวันหยุด/นอกเวลา": {
    th: "* ปุ่มด้านบนสำหรับผู้ตรวจสอบเพื่อทดสอบการใช้งาน ในวันหยุด/นอกเวลา",
    en: "* For evaluators to test the application outside operating hours",
    zh: "* 供测试人员在非营业时间体验使用",
  },
  "วันนี้ร้านปิดทำการ ขออภัยในความไม่สะดวก": {
    th: "วันนี้ร้านปิดทำการ ขออภัยในความไม่สะดวก",
    en: "The store is currently closed. We apologize for the inconvenience.",
    zh: "今日已打烊，给您带来不便敬请谅解",
  },
  "เราจะเปิดบริการอีกครั้งวันอาทิตย์-ศุกร์": {
    th: "เราจะเปิดบริการอีกครั้งวันอาทิตย์-ศุกร์",
    en: "We will open again on Sunday - Friday",
    zh: "我们将于周日至周五重新营业",
  },
  "เวลา": { th: "เวลา", en: "Hours", zh: "营业时间" },
  "8:00 - 21:00 น.": { th: "8:00 - 21:00 น.", en: "08:00 - 21:00", zh: "08:00 - 21:00" },
  "ตารางเวลาให้บริการ": { th: "ตารางเวลาให้บริการ", en: "Operating Schedule", zh: "营业时间表" },
  "วันนี้": { th: "วันนี้", en: "Today", zh: "今日" },
  "ปิดทำการ": { th: "ปิดทำการ", en: "Closed", zh: "休息" },
  "โหมดผู้พัฒนา (Developer Mode)": { th: "โหมดผู้พัฒนา (Developer Mode)", en: "Developer Mode", zh: "开发者模式" },
  "จำลองสถานะร้านปิด": { th: "จำลองสถานะร้านปิด", en: "Simulate Store Closed", zh: "模拟打烊状态" },
  "ออกจากระบบ": { th: "ออกจากระบบ", en: "Log Out", zh: "退出登录" },
  "บัญชีผู้ใช้": { th: "บัญชีผู้ใช้", en: "User Account", zh: "用户账户" },
  "ผู้ใช้งาน": { th: "ผู้ใช้งาน", en: "User", zh: "用户" },

  // Days of Week
  "วันอาทิตย์": { th: "วันอาทิตย์", en: "Sunday", zh: "星期日" },
  "วันจันทร์": { th: "วันจันทร์", en: "Monday", zh: "星期一" },
  "วันอังคาร": { th: "วันอังคาร", en: "Tuesday", zh: "星期二" },
  "วันพุธ": { th: "วันพุธ", en: "Wednesday", zh: "星期三" },
  "วันพฤหัสบดี": { th: "วันพฤหัสบดี", en: "Thursday", zh: "星期四" },
  "วันศุกร์": { th: "วันศุกร์", en: "Friday", zh: "星期五" },
  "วันเสาร์": { th: "วันเสาร์", en: "Saturday", zh: "星期六" },
  "อา.": { th: "อา.", en: "Sun", zh: "日" },
  "จ.": { th: "จ.", en: "Mon", zh: "一" },
  "อ.": { th: "อ.", en: "Tue", zh: "二" },
  "พ.": { th: "พ.", en: "Wed", zh: "三" },
  "พฤ.": { th: "พฤ.", en: "Thu", zh: "四" },
  "ศ.": { th: "ศ.", en: "Fri", zh: "五" },
  "ส.": { th: "ส.", en: "Sat", zh: "六" },

  // Proteins
  "หมูสับ": { th: "หมูสับ", en: "Minced Pork", zh: "猪肉碎" },
  "หมูกรอบ": { th: "หมูกรอบ", en: "Crispy Pork", zh: "脆皮五花肉" },
  "หมูชิ้น": { th: "หมูชิ้น", en: "Sliced Pork", zh: "猪肉片" },
  "ไก่สับ": { th: "ไก่สับ", en: "Minced Chicken", zh: "鸡肉碎" },
  "ไก่ต้ม": { th: "ไก่ต้ม", en: "Boiled Chicken", zh: "白斩鸡" },
  "เนื้อ": { th: "เนื้อ", en: "Beef", zh: "牛肉" },
  "หมึก": { th: "หมึก", en: "Squid", zh: "鱿鱼" },
  "กุ้ง": { th: "กุ้ง", en: "Shrimp", zh: "鲜虾" },
  "หอยลาย": { th: "หอยลาย", en: "Clams", zh: "蛤蜊" },
  "ไม่เอาเนื้อสัตว์": { th: "ไม่เอาเนื้อสัตว์", en: "No Meat (Vegetarian)", zh: "不要肉（素食）" },

  // Toppings
  "ไส้กรอก": { th: "ไส้กรอก", en: "Sausage", zh: "热狗/香肠" },
  "กุนเชียง": { th: "กุนเชียง", en: "Chinese Sausage", zh: "中式腊肠" },
  "ไข่ดาวไม่สุก": { th: "ไข่ดาวไม่สุก", en: "Sunny-side Up Egg", zh: "溏心荷包蛋" },
  "ไข่ดาวสุก": { th: "ไข่ดาวสุก", en: "Fried Egg (Well Done)", zh: "全熟荷包蛋" },
  "ไข่ต้ม": { th: "ไข่ต้ม", en: "Boiled Egg", zh: "水煮蛋" },
  "ไข่เจียว": { th: "ไข่เจียว", en: "Omelet", zh: "煎蛋卷" },
  "ไข่ดาว": { th: "ไข่ดาว", en: "Fried Egg", zh: "荷包蛋" },
  "แนะนำ": { th: "แนะนำ", en: "Recommend", zh: "推荐" },
  "จำเป็น": { th: "จำเป็น", en: "Required", zh: "必选" },
  "อาหารจานหลัก": { th: "อาหารจานหลัก", en: "Main Dish", zh: "主食" },
  "รายการเมนู": { th: "รายการเมนู", en: "Menu List", zh: "菜单列表" },
  "ดูตะกร้าสินค้า": { th: "ดูตะกร้าสินค้า", en: "View Cart", zh: "查看购物车" },
  "เรียงลำดับตาม": { th: "เรียงลำดับตาม", en: "Sort by", zh: "排序方式" },
  "เสร็จสิ้นการเลือก": { th: "เสร็จสิ้นการเลือก", en: "Done", zh: "完成" },
  "🔥 ยอดนิยม (แนะนำ)": { th: "🔥 ยอดนิยม (แนะนำ)", en: "🔥 Popular (Recommend)", zh: "🔥 最受欢迎 (推荐)" },
  "เมนูขายดีประจำสัปดาห์": { th: "เมนูขายดีประจำสัปดาห์", en: "Weekly best sellers", zh: "本周畅销菜单" },
  "💵 ราคา: ต่ำ - สูง": { th: "💵 ราคา: ต่ำ - สูง", en: "💵 Price: Low - High", zh: "💵 价格：低 - 高" },
  "เมนูราคาประหยัด เรียงตามเงินบาท": { th: "เมนูราคาประหยัด เรียงตามเงินบาท", en: "Budget menus, sorted by price", zh: "经济实惠菜单，按价格排序" },
  "💵 ราคา: สูง - ต่ำ": { th: "💵 ราคา: สูง - ต่ำ", en: "💵 Price: High - Low", zh: "💵 价格：高 - 低" },
  "เมนูระดับพรีเมียมคัดสรรพิเศษ": { th: "เมนูระดับพรีเมียมคัดสรรพิเศษ", en: "Premium selection menus", zh: "特别精选优质菜单" },
  "หมด": { th: "หมด", en: "Out of stock", zh: "售罄" },
  "ฟรี": { th: "ฟรี", en: "Free", zh: "免费" },
  "เพิ่มเติม": { th: "เพิ่มเติม", en: "Addons", zh: "加料" },
  // Gacha & Wishing & Random Dish Translations
  "ตู้คำอธิษฐาน & สะสมการ์ด (Gacha)": {
    th: "ตู้คำอธิษฐาน & สะสมการ์ด (Gacha)",
    en: "Wish & Card Collection (Gacha)",
    zh: "祈愿与卡牌收集 (扭蛋)",
  },
  "ตู้คำอธิษฐาน (Gacha)": {
    th: "ตู้คำอธิษฐาน (Gacha)",
    en: "Uncle Get's Wish (Gacha)",
    zh: "龙葛特祈愿 (扭蛋)",
  },
  "ตู้คำอธิษฐานลุงเก็ต": {
    th: "ตู้คำอธิษฐานลุงเก็ต",
    en: "Uncle Get's Celestial Wish",
    zh: "龙葛特星空祈愿",
  },
  "ตู้คำอธิษฐาน & สมุดสะสมการ์ดลุงเกตุ": {
    th: "ตู้คำอธิษฐาน & สมุดสะสมการ์ดลุงเกตุ",
    en: "Uncle Get's Wish & Card Album",
    zh: "龙葛特星空祈愿与卡牌图鉴",
  },
  "ตู้คำอธิษฐาน & สะสมการ์ดลุงเกตุ": {
    th: "ตู้คำอธิษฐาน & สะสมการ์ดลุงเกตุ",
    en: "Uncle Get's Wish & Card Collection",
    zh: "龙葛特祈愿与美食卡牌收集",
  },
  "ตู้คำอธิษฐาน & สมุดสะสมการ์ด": {
    th: "ตู้คำอธิษฐาน & สะสมการ์ด",
    en: "Wish & Card Album",
    zh: "祈愿与卡牌图鉴",
  },
  "สุ่มฟรีประจำวัน!": {
    th: "สุ่มฟรีประจำวัน!",
    en: "Daily Free Wish!",
    zh: "每日免费祈愿！",
  },
  "หมุนฟรีประจำวัน (1 ครั้ง) ": {
    th: "หมุนฟรีประจำวัน (1 ครั้ง) ",
    en: "Daily Free Wish (×1) ",
    zh: "每日免费祈愿 (1次) ",
  },
  "หมุนกาชาเลย": {
    th: "หมุนกาชาเลย",
    en: "Wish Now",
    zh: "立即祈愿",
  },
  "ลุ้นรับส่วนลด 50%, ฟรีอาหารจานเด็ด และสะสมการ์ดระดับ UR/SSR ครบเซ็ตรับรางวัลใหญ่!": {
    th: "ลุ้นรับส่วนลด 50%, ฟรีอาหารจานเด็ด และสะสมการ์ดระดับ UR/SSR ครบเซ็ตรับรางวัลใหญ่!",
    en: "Win 50% off, free signature dishes, and collect UR/SSR cards to claim grand set rewards!",
    zh: "赢取50%折扣券、免费招牌菜，收集UR/SSR全套卡牌兑换大奖！",
  },
  "ตู้คำอธิษฐาน": {
    th: "ตู้คำอธิษฐาน",
    en: "Wish Banner",
    zh: "祈愿池",
  },
  "สมุดสะสมการ์ด": {
    th: "สมุดสะสมการ์ด",
    en: "Card Album",
    zh: "卡牌图鉴",
  },
  "กระเป๋าคูปอง": {
    th: "กระเป๋าคูปอง",
    en: "Coupon Wallet",
    zh: "卡券包",
  },
  "ประวัติการสุ่ม": {
    th: "ประวัติการสุ่ม",
    en: "Wish History",
    zh: "祈愿记录",
  },
  "ตู้คูปองมหาโชค & เมนูฟรี (Coupon Banner)": {
    th: "ตู้คูปองมหาโชค & เมนูฟรี (Coupon Banner)",
    en: "Lucky Coupon & Free Dishes",
    zh: "幸运卡券与免费美食",
  },
  "ตู้การ์ดเชฟ & เมนูในตำนาน (Cards Banner)": {
    th: "ตู้การ์ดเชฟ & เมนูในตำนาน (Cards Banner)",
    en: "Legendary Chef & Food Cards",
    zh: "传奇大厨与美食卡牌",
  },
  "ตู้คูปองมหาโชค & ของแถมจานโปรด": {
    th: "ตู้คูปองมหาโชค & ของแถมจานโปรด",
    en: "Lucky Coupon & Favorite Dishes",
    zh: "幸运折扣券与精选加料",
  },
  "สุ่มรับโค้ดส่วนลด 50%, ฟรีข้าวกะเพรา, ฟรีไข่ดาวลาวา, และส่งฟรี ฿40": {
    th: "สุ่มรับโค้ดส่วนลด 50%, ฟรีข้าวกะเพรา, ฟรีไข่ดาวลาวา, และส่งฟรี ฿40",
    en: "Win 50% discount, free Krapao dish, free crispy lava egg, and ฿40 free delivery",
    zh: "抽取50%折扣券、免费打抛猪肉饭、爆浆荷包蛋与 ฿40 免费配送",
  },
  "ตู้คำอธิษฐานเชฟ & เมนูในตำนาน": {
    th: "ตู้คำอธิษฐานเชฟ & เมนูในตำนาน",
    en: "Celestial Chef & Legendary Dish Wish",
    zh: "传奇大厨与经典名菜祈愿",
  },
  "สุ่มสะสมการ์ดลุงเกตุ เทพกระทะเหล็ก, หมูกรอบเพลิงสวรรค์, และราชากะเพรา": {
    th: "สุ่มสะสมการ์ดลุงเกตุ เทพกระทะเหล็ก, หมูกรอบเพลิงสวรรค์, และราชากะเพรา",
    en: "Collect God Chef Lung Get, Heavenly Crispy Pork, and King of Krapao cards",
    zh: "抽取收集铁锅食神龙葛特、九重天脆皮烧肉与打抛之王卡牌",
  },
  "สุ่มคูปองส่วนลด 50% & สะสมการ์ดเมนูในตำนาน": {
    th: "สุ่มคูปองส่วนลด 50% & สะสมการ์ดเมนูในตำนาน",
    en: "Win 50% off coupons & collect legendary dish cards",
    zh: "抽取50%折扣券并收集传奇美食卡牌",
  },
  "รายละเอียดเรตสุ่ม": {
    th: "รายละเอียดเรตสุ่ม",
    en: "Drop Rates",
    zh: "概率详情",
  },
  "การันตี": {
    th: "การันตี",
    en: "Guaranteed",
    zh: "保底",
  },
  "ในอีก": {
    th: "ในอีก",
    en: "in",
    zh: "还需",
  },
  "อธิษฐาน 10 ครั้งรวด": {
    th: "อธิษฐาน 10 ครั้งรวด",
    en: "Wish ×10",
    zh: "十连祈愿",
  },
  "การันตี 4★+ แน่นอน": {
    th: "การันตี 4★+ แน่นอน",
    en: "Guaranteed 4★+",
    zh: "必得 4★+",
  },
  "ใบ": {
    th: "ใบ",
    en: "tickets",
    zh: "张",
  },
  "ฟรี 10": {
    th: "ฟรี 10",
    en: "Free +10",
    zh: "免费 +10",
  },
  "ได้รับตั๋วอธิษฐานฟรี +10 ใบ เรียบร้อยแล้ว! 🎫": {
    th: "ได้รับตั๋วอธิษฐานฟรี +10 ใบ เรียบร้อยแล้ว! 🎫",
    en: "Claimed 10 Free Wish Tickets! 🎫",
    zh: "已成功领取 10 张免费祈愿券！🎫",
  },
  "พลังความอร่อยรวม": {
    th: "พลังความอร่อยรวม",
    en: "Total Flavor Power",
    zh: "总美味战力",
  },
  "สะสมแล้ว": {
    th: "สะสมแล้ว",
    en: "Collected",
    zh: "已收集",
  },
  "เซ็ตสะสม & รางวัลคอมโบ (Set Rewards)": {
    th: "เซ็ตสะสม & รางวัลคอมโบ (Set Rewards)",
    en: "Collection Sets & Combo Rewards",
    zh: "套装收集与组合奖励",
  },
  "กดรับรางวัลเซ็ต!": {
    th: "กดรับรางวัลเซ็ต!",
    en: "Claim Set Reward!",
    zh: "领取套装奖励！",
  },
  "รับรางวัลแล้ว": {
    th: "รับรางวัลแล้ว",
    en: "Claimed",
    zh: "已领取",
  },
  "สะสมอีก": {
    th: "สะสมอีก",
    en: "Need",
    zh: "还需收集",
  },
  "คูปองของคุณ": {
    th: "คูปองของคุณ",
    en: "Your Coupons",
    zh: "您的优惠券",
  },
  "ยังไม่มีคูปองส่วนลดในกระเป๋า": {
    th: "ยังไม่มีคูปองส่วนลดในกระเป๋า",
    en: "No coupons in wallet yet",
    zh: "卡券包中暂无优惠券",
  },
  "ไปหมุนตู้คูปองเลย!": {
    th: "ไปหมุนตู้คูปองเลย!",
    en: "Spin Coupon Gacha Now!",
    zh: "去抽取优惠券！",
  },
  "กดใช้เพื่อนำไปเป็นส่วนลดในคำสั่งซื้อได้ทันที": {
    th: "กดใช้เพื่อนำไปเป็นส่วนลดในคำสั่งซื้อได้ทันที",
    en: "Apply to get instant discounts on checkout",
    zh: "结账时可立即抵扣",
  },
  "ใช้ทันที": {
    th: "ใช้ทันที",
    en: "Apply",
    zh: "立即使用",
  },
  "คัดลอกโค้ด": {
    th: "คัดลอกโค้ด",
    en: "Copy Code",
    zh: "复制代码",
  },
  "คัดลอกแล้ว": {
    th: "คัดลอกแล้ว",
    en: "Copied!",
    zh: "已复制！",
  },
  "ยังไม่มีประวัติการอธิษฐาน": {
    th: "ยังไม่มีประวัติการอธิษฐาน",
    en: "No wish history yet",
    zh: "暂无祈愿记录",
  },
  "ผลการอธิษฐานคำขอพร (Wish Results)": {
    th: "ผลการอธิษฐานคำขอพร (Wish Results)",
    en: "Wish Results",
    zh: "祈愿结果",
  },
  "ได้รับรางวัล 1 รายการ": {
    th: "ได้รับรางวัล 1 รายการ",
    en: "Obtained 1 Item",
    zh: "获得 1 件奖励",
  },
  "ได้รับรางวัล 10 รายการ": {
    th: "ได้รับรางวัล 10 รายการ",
    en: "Obtained 10 Items",
    zh: "获得 10 件奖励",
  },
  "อธิษฐานอีกครั้ง": {
    th: "อธิษฐานอีกครั้ง",
    en: "Wish Again",
    zh: "再祈愿一次",
  },
  "ตกลง (รับรางวัล)": {
    th: "ตกลง (รับรางวัล)",
    en: "Confirm",
    zh: "确认 (领取)",
  },
  "ปลดล็อกการ์ดใหม่! (NEW!)": {
    th: "ปลดล็อกการ์ดใหม่! (NEW!)",
    en: "New Card Unlocked! (NEW!)",
    zh: "解锁新卡牌！(NEW!)",
  },
  "อัตราการสุ่ม & ระบบการันตี (Rates & Pity)": {
    th: "อัตราการสุ่ม & ระบบการันตี (Rates & Pity)",
    en: "Drop Rates & Pity System",
    zh: "概率公示与保底规则",
  },
  "ระบบสุ่มโปร่งใส มาตรฐานสากล": {
    th: "ระบบสุ่มโปร่งใส มาตรฐานสากล",
    en: "Transparent & Verified Rates",
    zh: "透明公正，行业标准",
  },
  "ตารางอัตราความน่าจะเป็น (Drop Rates)": {
    th: "ตารางอัตราความน่าจะเป็น (Drop Rates)",
    en: "Drop Rates Probability Table",
    zh: "概率分布表",
  },
  "ระดับความหายาก": {
    th: "ระดับความหายาก",
    en: "Rarity",
    zh: "稀有度",
  },
  "เปอร์เซ็นต์พื้นฐาน": {
    th: "เปอร์เซ็นต์พื้นฐาน",
    en: "Base Rate",
    zh: "基础概率",
  },
  "สีออร่า": {
    th: "สีออร่า",
    en: "Aura Color",
    zh: "光芒颜色",
  },
  "กฎระบบการันตี (Pity System)": {
    th: "กฎระบบการันตี (Pity System)",
    en: "Pity System Rules",
    zh: "保底机制说明",
  },
  "ลุ้นส่วนลด 50% & กล่องสุ่ม ฿65!": {
    th: "ลุ้นส่วนลด 50% & กล่องสุ่ม ฿65!",
    en: "Win 50% Off & ฿65 Mystery Blind Box!",
    zh: "赢取五折优惠券与 ฿65 盲盒！",
  },
  "ลุ้นรับส่วนลด & กล่องสุ่มอาหาร": {
    th: "ลุ้นรับส่วนลด & กล่องสุ่มอาหาร",
    en: "Win coupons & mystery meal boxes",
    zh: "赢取优惠券与惊喜美食盲盒",
  },
  "หมุนกาชา": {
    th: "หมุนกาชา",
    en: "Make a Wish",
    zh: "开始祈愿",
  },
  "คำอธิษฐานคูปอง": {
    th: "คำอธิษฐานคูปอง",
    en: "Coupon Wish",
    zh: "优惠券祈愿",
  },
  "กล่องสุ่ม ฿65": {
    th: "กล่องสุ่ม ฿65",
    en: "Blind Box ฿65",
    zh: "惊喜盲盒 ฿65",
  },
  "🍱 กล่องสุ่ม ฿65": {
    th: "🍱 กล่องสุ่ม ฿65",
    en: "🍱 Blind Box ฿65",
    zh: "🍱 惊喜盲盒 ฿65",
  },
  "ยังไม่มีคูปองในกระเป๋าของคุณ": {
    th: "ยังไม่มีคูปองในกระเป๋าของคุณ",
    en: "No coupons in your wallet yet",
    zh: "您的卡券包中暂无优惠券",
  },
  "หมุนตู้คำอธิษฐานกาชาเพื่อลุ้นรับคูปองเด็ดๆ!": {
    th: "หมุนตู้คำอธิษฐานกาชาเพื่อลุ้นรับคูปองเด็ดๆ!",
    en: "Wish on the Gacha banner to win exclusive coupons!",
    zh: "前往祈愿池抽取专属优惠大礼包！",
  },
  "ต้องการใช้คูปองนี้กับคำสั่งซื้อเลยไหม?": {
    th: "ต้องการใช้คูปองนี้กับคำสั่งซื้อเลยไหม?",
    en: "Would you like to use this coupon now?",
    zh: "是否立即在订单中使用此优惠券？",
  },
  "⚡ ใช้คูปองนี้เลย (สั่งอาหารทันที)": {
    th: "⚡ ใช้คูปองนี้เลย (สั่งอาหารทันที)",
    en: "⚡ Use Coupon Now (Order Food)",
    zh: "⚡ 立即使用此券 (前往点餐)",
  },
  "📥 เก็บเข้ากระเป๋าไว้ก่อน": {
    th: "📥 เก็บเข้ากระเป๋าไว้ก่อน",
    en: "📥 Save to Wallet",
    zh: "📥 先存入卡券包",
  },
  "⚡ ใช้คูปองที่ดีที่สุดเลย": {
    th: "⚡ ใช้คูปองที่ดีที่สุดเลย",
    en: "⚡ Use Best Coupon Now",
    zh: "⚡ 立即使用最佳优惠券",
  },
  "📥 เก็บรางวัลทั้งหมดเข้ากระเป๋า": {
    th: "📥 เก็บรางวัลทั้งหมดเข้ากระเป๋า",
    en: "📥 Save All to Wallet",
    zh: "📥 全部存入卡券包",
  },
  "คุณได้รับคูปองสุดคุ้ม! สามารถกด 'ใช้เลย' เพื่อนำไปเป็นส่วนลดได้ทันที": {
    th: "คุณได้รับคูปองสุดคุ้ม! สามารถกด 'ใช้เลย' เพื่อนำไปเป็นส่วนลดได้ทันที",
    en: "Lucky coupon obtained! Tap 'Apply' to get instant discount on your order.",
    zh: "恭喜抽中幸运卡券！点击“立即使用”即可在订单中抵扣优惠。",
  },
  "ใช้คูปองนี้": {
    th: "ใช้คูปองนี้",
    en: "Apply this coupon",
    zh: "使用此券",
  },
  "สั่งซื้อออเดอร์นี้ รับตั๋วสุ่มกาชาฟรี": {
    th: "สั่งซื้อออเดอร์นี้ รับตั๋วสุ่มกาชาฟรี",
    en: "Place this order & get Free Wish Tickets",
    zh: "完成此订单即可获赠免费祈愿券",
  },
  "ได้รับตั๋วสุ่มกาชา": {
    th: "ได้รับตั๋วสุ่มกาชา",
    en: "Received Wish Tickets",
    zh: "获得祈愿券",
  },
  "ได้รับตั๋วสุ่มกาชาจากออเดอร์นี้!": {
    th: "ได้รับตั๋วสุ่มกาชาจากออเดอร์นี้!",
    en: "Earned Wish Tickets from this order!",
    zh: "从本次订单中获得了祈愿券！",
  },
  "นำตั๋วไปสุ่มลุ้นรับส่วนลด 50% และสะสมการ์ดลุงเกตุ": {
    th: "นำตั๋วไปสุ่มลุ้นรับส่วนลด 50% และสะสมการ์ดลุงเกตุ",
    en: "Use tickets to win 50% off & collect legendary cards",
    zh: "使用祈愿券抽取五折卡券与收集龙葛特卡牌",
  },
  "ดำเนินการชำระเงิน": {
    th: "ดำเนินการชำระเงิน",
    en: "Proceed to Payment",
    zh: "前往支付",
  },
  "พร้อมเพย์ QR Code": {
    th: "พร้อมเพย์ QR Code",
    en: "PromptPay QR Code",
    zh: "PromptPay 二维码",
  },
  "เงินสด / ชำระที่เคาน์เตอร์": {
    th: "เงินสด / ชำระที่เคาน์เตอร์",
    en: "Cash / Pay at Counter",
    zh: "现金 / 柜台支付",
  },
  "เก็บเงินสดปลายทาง": {
    th: "เก็บเงินสดปลายทาง",
    en: "Cash on Delivery",
    zh: "货到付款",
  },
  "สแกน QR Code เพื่อชำระเงิน": {
    th: "สแกน QR Code เพื่อชำระเงิน",
    en: "Scan QR Code to Pay",
    zh: "扫描二维码支付",
  },
  "ร้านอาหารตามสั่ง ลุงเกตุ": {
    th: "ร้านอาหารตามสั่ง ลุงเกตุ",
    en: "Uncle Get Kitchen",
    zh: "龙葛特美食厨房",
  },
  "ยืนยันว่าชำระเงินแล้ว": {
    th: "ยืนยันว่าชำระเงินแล้ว",
    en: "I Have Paid / Confirm Order",
    zh: "确认已支付 / 提交订单",
  },
  "ยืนยันคำสั่งซื้อ (จ่ายเงินสด)": {
    th: "ยืนยันคำสั่งซื้อ (จ่ายเงินสด)",
    en: "Confirm Order (Cash)",
    zh: "确认订单（现金支付）",
  },
  "กรุณาเตรียมเงินสดให้พอดีกับยอดสั่งซื้อเมื่อรับอาหาร": {
    th: "กรุณาเตรียมเงินสดให้พอดีกับยอดสั่งซื้อเมื่อรับอาหาร",
    en: "Please prepare exact cash when receiving your food",
    zh: "取餐或送达时请准备相应现金",
  },
  "คลังสมบัติลุงเก็ต": {
    th: "คลังสมบัติลุงเก็ต",
    en: "Uncle Get's Vault",
    zh: "龙葛特宝库",
  },
  "ฟรี! กระเพราหมูกรอบ & ส่วนลด 50%": {
    th: "ฟรี! กระเพราหมูกรอบ & ส่วนลด 50%",
    en: "Free Crispy Pork Basil & 50% Off!",
    zh: "免费脆皮猪肉罗勒饭 & 50%折扣！",
  },
  "อธิษฐานลุ้นรับคูปองส่วนลด อาหารจานเด็ด และท็อปปิ้งฟรี พร้อมการันตี 4 ดาวขึ้นไปทุกๆ 10 ครั้ง!": {
    th: "อธิษฐานลุ้นรับคูปองส่วนลด อาหารจานเด็ด และท็อปปิ้งฟรี พร้อมการันตี 4 ดาวขึ้นไปทุกๆ 10 ครั้ง!",
    en: "Wish for discount coupons, signature dishes, and free toppings with guaranteed 4★ every 10 pulls!",
    zh: "祈愿赢取折扣券、招牌美食和免费配料，每10抽必得4星以上！",
  },
  "กล่องสุ่มอาหารลุงเก็ต": {
    th: "กล่องสุ่มอาหารลุงเก็ต",
    en: "Uncle Get's Mystery Meal Box",
    zh: "龙葛特美食盲盒",
  },
  "เหมาจ่ายเพียง ฿65 เท่านั้น!": {
    th: "เหมาจ่ายเพียง ฿65 เท่านั้น!",
    en: "Flat rate only ฿65!",
    zh: "一口价仅需 ฿65！",
  },
  "สุ่มลุ้นเมนูจานโปรดสุดเซอร์ไพรส์ มีโอกาสได้เมนูพรีเมียมราคา ฿75 - ฿100+ ในราคา ฿65 คุ้มสุดๆ!": {
    th: "สุ่มลุ้นเมนูจานโปรดสุดเซอร์ไพรส์ มีโอกาสได้เมนูพรีเมียมราคา ฿75 - ฿100+ ในราคา ฿65 คุ้มสุดๆ!",
    en: "Roll for a surprise favorite dish with chance to get ฿75 - ฿100+ premium meals for only ฿65!",
    zh: "随机抽取惊喜招牌菜，有机会以 ฿65 获得价值 ฿75 - ฿100+ 的高端美食！",
  },
  "รับอาหารใส่ตะกร้าทันทีหลังสุ่มเสร็จ": {
    th: "รับอาหารใส่ตะกร้าทันทีหลังสุ่มเสร็จ",
    en: "Dish added to cart instantly after pulling",
    zh: "抽中后立即加入购物车",
  },
  "⚡ รับอาหารใส่ตะกร้าทันทีหลังสุ่มเสร็จ": {
    th: "⚡ รับอาหารใส่ตะกร้าทันทีหลังสุ่มเสร็จ",
    en: "⚡ Dish added to cart instantly after pulling",
    zh: "⚡ 抽中后立即加入购物车",
  },
  "ตั๋วอธิษฐานคงเหลือ:": {
    th: "ตั๋วอธิษฐานคงเหลือ:",
    en: "Wishes Remaining:",
    zh: "剩余祈愿券：",
  },
  "+ รับตั๋วฟรี 10 ใบ": {
    th: "+ รับตั๋วฟรี 10 ใบ",
    en: "+ Get 10 Free Wishes",
    zh: "+ 免费领取10张祈愿券",
  },
  "อธิษฐาน 1 ครั้ง": {
    th: "อธิษฐาน 1 ครั้ง",
    en: "Wish ×1",
    zh: "祈愿 1 次",
  },
  "อธิษฐาน 10 ครั้ง": {
    th: "อธิษฐาน 10 ครั้ง",
    en: "Wish ×10",
    zh: "祈愿 10 次",
  },
  "1 ตั๋ว": {
    th: "1 ตั๋ว",
    en: "1 Wish",
    zh: "1 张",
  },
  "10 ตั๋ว (การันตี 4★)": {
    th: "10 ตั๋ว (การันตี 4★)",
    en: "10 Wishes (Guaranteed 4★)",
    zh: "10 张 (保底4★)",
  },
  "การันตี 5★ ในอีก": {
    th: "การันตี 5★ ในอีก",
    en: "Guaranteed 5★ in",
    zh: "5★ 保底还需",
  },
  "ครั้ง": {
    th: "ครั้ง",
    en: "pulls",
    zh: "次",
  },
  "ข้าม": {
    th: "ข้าม",
    en: "Skip",
    zh: "跳过",
  },
  "ถัดไป": {
    th: "ถัดไป",
    en: "Next",
    zh: "下一步",
  },
  "ใช้เลย": {
    th: "ใช้เลย",
    en: "Apply Now",
    zh: "立即使用",
  },
  "สั่ง ฿65": {
    th: "สั่ง ฿65",
    en: "Order ฿65",
    zh: "点餐 ฿65",
  },
  "รับรางวัลทั้งหมด": {
    th: "รับรางวัลทั้งหมด",
    en: "Claim All Rewards",
    zh: "领取全部奖励",
  },
  "ผลลัพธ์คำอธิษฐาน": {
    th: "ผลลัพธ์คำอธิษฐาน",
    en: "Wish Results",
    zh: "祈愿结果",
  },
  "กำลังอธิษฐานสู่ฟากฟ้า...": {
    th: "กำลังอธิษฐานสู่ฟากฟ้า...",
    en: "Reaching for the stars...",
    zh: "正在向星空祈愿...",
  },
  "ตั๋วคำอธิษฐาน": {
    th: "ตั๋วคำอธิษฐาน",
    en: "Celestial Wish Ticket",
    zh: "祈愿礼券",
  },
  "ตั๋วกล่องสุ่ม ฿65": {
    th: "ตั๋วกล่องสุ่ม ฿65",
    en: "฿65 Blind Box Pass",
    zh: "฿65 盲盒通票",
  },
  "ฉีกตั๋ว": {
    th: "ฉีกตั๋ว",
    en: "Rip Ticket",
    zh: "撕开礼券",
  },
  "การันตีรางวัล 4 ดาวขึ้นไปแน่นอน": {
    th: "การันตีรางวัล 4 ดาวขึ้นไปแน่นอน",
    en: "Guaranteed 4★ or higher reward",
    zh: "保底获得4星及以上奖励",
  },
  "อธิษฐานสู่ฟากฟ้าเพื่อรับรางวัล": {
    th: "อธิษฐานสู่ฟากฟ้าเพื่อรับรางวัล",
    en: "Reach for the stars for exclusive rewards",
    zh: "向星空祈愿赢取丰厚奖励",
  },
  "กำลังเปิดผนึกคำอธิษฐาน...": {
    th: "กำลังเปิดผนึกคำอธิษฐาน...",
    en: "Unsealing your wishes...",
    zh: "正在解开祈愿封印...",
  },
  "กำลังฉีกตั๋วคำอธิษฐาน...": {
    th: "กำลังฉีกตั๋วคำอธิษฐาน...",
    en: "Ripping wish ticket...",
    zh: "正在撕开祈愿礼券...",
  },
  "รูดเพื่อฉีกตั๋ว": {
    th: "รูดเพื่อฉีกตั๋ว",
    en: "Slide to Rip",
    zh: "滑动撕开",
  },
  "แตะเพื่อฉีกตั๋วทันที": {
    th: "แตะเพื่อฉีกตั๋วทันที",
    en: "Tap to Rip Instantly",
    zh: "点击直接撕开",
  },
  "คำอธิษฐานปริศนา": {
    th: "คำอธิษฐานปริศนา",
    en: "Mystery Wish",
    zh: "神秘祈愿",
  },
  "รางวัลของคุณถูกผนึกอยู่ข้างใน": {
    th: "รางวัลของคุณถูกผนึกอยู่ข้างใน",
    en: "Your exclusive reward is sealed inside",
    zh: "您的专属奖励已封存于此",
  },
  "แตะเพื่อเปิดเผยรางวัล": {
    th: "แตะเพื่อเปิดเผยรางวัล",
    en: "Tap to Reveal Reward",
    zh: "点击揭晓奖励",
  },
  "ดูผลสรุปทั้งหมด ➔": {
    th: "ดูผลสรุปทั้งหมด ➔",
    en: "View All Results ➔",
    zh: "查看所有结果 ➔",
  },
  "เลื่อนขึ้นเพื่อเปิดผนึก": {
    th: "เลื่อนขึ้นเพื่อเปิดผนึก",
    en: "Swipe up to unseal",
    zh: "上滑解封",
  },
  "สุ่มเมนูว่าจะกินอะไรดี": {
    th: "สุ่มเมนูว่าจะกินอะไรดี",
    en: "Random Dish Generator",
    zh: "随机菜品推荐",
  },
  "คิดไม่ออกว่าจะกินอะไร?": {
    th: "คิดไม่ออกว่าจะกินอะไร?",
    en: "Can't decide what to eat?",
    zh: "不知道吃什么？",
  },
  "วงล้อสุ่มเมนูเด็ดมื้อนี้ให้คุณ": {
    th: "วงล้อสุ่มเมนูเด็ดมื้อนี้ให้คุณ",
    en: "Random meal wheel for you",
    zh: "专属您的随机美食转盘",
  },
  "สุ่มเลย": {
    th: "สุ่มเลย",
    en: "Spin Now",
    zh: "立即抽取",
  },
  "คูปองส่วนลดของฉัน": {
    th: "คูปองส่วนลดของฉัน",
    en: "My Coupons",
    zh: "我的优惠券",
  },
  "เลือกใช้คูปองส่วนลดกาชา": {
    th: "เลือกใช้คูปองส่วนลดกาชา",
    en: "Use Gacha Coupon",
    zh: "使用祈愿优惠券",
  },
  "ใช้คูปอง": {
    th: "ใช้คูปอง",
    en: "Use Coupon",
    zh: "使用券",
  },
  "สุ่มเมนูมื้อนี้": {
    th: "สุ่มเมนูมื้อนี้",
    en: "Random Dish",
    zh: "随机菜品",
  },
  "เมนูนำโชคของคุณมื้อนี้!": {
    th: "เมนูนำโชคของคุณมื้อนี้!",
    en: "Your Lucky Dish for Today!",
    zh: "您今日的幸运菜品！",
  },
  "กำลังหมุนเลือกเมนูแสนอร่อย...": {
    th: "กำลังหมุนเลือกเมนูแสนอร่อย...",
    en: "Selecting a delicious dish...",
    zh: "正在为您挑选美味佳肴...",
  },
  "ราคา": {
    th: "ราคา",
    en: "Price",
    zh: "价格",
  },
  "สั่งเมนูนี้เลย": {
    th: "สั่งเมนูนี้เลย",
    en: "Order This Dish",
    zh: "立即点这道菜",
  },
  "สุ่มใหม่อีกรอบ": {
    th: "สุ่มใหม่อีกรอบ",
    en: "Randomize Again",
    zh: "重新随机",
  },
  "กำลังสุ่ม...": {
    th: "กำลังสุ่ม...",
    en: "Spinning...",
    zh: "正在抽取...",
  },
  "เริ่มสุ่มเมนู!": {
    th: "เริ่มสุ่มเมนู!",
    en: "Spin the Wheel!",
    zh: "开始抽取！",
  },
  "Signature": {
    th: "Signature",
    en: "Signature",
    zh: "招牌推荐",
  },
  "เผ็ด": {
    th: "เผ็ด",
    en: "Spicy",
    zh: "辣",
  },
  "ฉีกตั๋วลุ้นส่วนลด 50% & อาหารฟรี!": {
    th: "ฉีกตั๋วลุ้นส่วนลด 50% & อาหารฟรี!",
    en: "Rip tickets for 50% Off & Free Dishes!",
    zh: "撕开礼券赢取五折优惠与免费餐点！",
  },
  "ฉีกตั๋ว": {
    th: "ฉีกตั๋ว",
    en: "Rip Ticket",
    zh: "撕开礼券",
  },
  "ตั๋วใบที่": {
    th: "ตั๋วใบที่",
    en: "Ticket #",
    zh: "第几张礼券",
  },
  "ฉีกทันที": {
    th: "ฉีกทันที",
    en: "Rip Now",
    zh: "立即撕开",
  },
  "👆 แตะหรือกดเพื่อฉีกตั๋ว!": {
    th: "👆 แตะหรือกดเพื่อฉีกตั๋ว!",
    en: "👆 Tap or slide to rip ticket!",
    zh: "👆 点击或滑动撕开礼券！",
  },
  "กำลังฉีกตั๋ว...": {
    th: "กำลังฉีกตั๋ว...",
    en: "Tearing ticket...",
    zh: "正在撕开礼券...",
  },
  "✨ แสงแห่งโชคลาภกำลังส่องออกมา!": {
    th: "✨ แสงแห่งโชคลาภกำลังส่องออกมา!",
    en: "✨ The aura of fortune is shining through!",
    zh: "✨ 幸运之光正在绽放！",
  },
  "ดึงให้สุดเพื่อเปิดรางวัล": {
    th: "ดึงให้สุดเพื่อเปิดรางวัล",
    en: "Pull all the way to reveal reward",
    zh: "完全撕开以揭晓奖励",
  },
  "ฉีกตั๋วใบถัดไป": {
    th: "ฉีกตั๋วใบถัดไป",
    en: "Rip Next Ticket",
    zh: "撕开下一张",
  },
  "ฉีกตั๋วอีกใบ": {
    th: "ฉีกตั๋วอีกใบ",
    en: "Rip Another Ticket",
    zh: "再撕一张",
  },
  "ฉีกอีก 10 ใบ": {
    th: "ฉีกอีก 10 ใบ",
    en: "Rip 10 More",
    zh: "再撕10张",
  },
  "ฉีกตั๋ว 1 ใบ": {
    th: "ฉีกตั๋ว 1 ใบ",
    en: "Rip 1 Ticket",
    zh: "撕开 1 张",
  },
  "ฉีกตั๋ว 10 ใบ": {
    th: "ฉีกตั๋ว 10 ใบ",
    en: "Rip 10 Tickets",
    zh: "撕开 10 张",
  },
  "ฉีกตั๋วลุ้นรับส่วนลด & กล่องสุ่มอาหาร": {
    th: "ฉีกตั๋วลุ้นรับส่วนลด & กล่องสุ่มอาหาร",
    en: "Rip tickets for discounts & food blind boxes",
    zh: "撕开礼券赢取折扣与美食盲盒",
  },
  "ตั๋วคำอธิษฐานคูปอง": {
    th: "ตั๋วคำอธิษฐานคูปอง",
    en: "Coupon Wish Ticket",
    zh: "优惠券祈愿礼券",
  },
  "ผลลัพธ์คำอธิษฐานทั้งหมด": {
    th: "ผลลัพธ์คำอธิษฐานทั้งหมด",
    en: "All Wish Results",
    zh: "全部祈愿结果",
  },
};

// ─────────────────────────────────────────────────────────────
// STATIC DICTIONARY FOR MENUS (NAMES AND DESCRIPTIONS)
// ─────────────────────────────────────────────────────────────
const menuDictionary: Record<string, Record<Language, { name: string; desc: string }>> = {
  "กระเพราหมูสับ (ข้าวราด)": {
    th: { name: "กระเพราหมูสับ (ข้าวราด)", desc: "กระเพราหมูสับผัดกับพริกและกระเทียม เสิร์ฟราดข้าวไทยร้อนๆ" },
    en: {
      name: "Minced Pork Basil (with Rice)",
      desc: "Stir-fried minced pork with chili and holy basil, served over hot Jasmine rice",
    },
    zh: { name: "泰式罗勒猪肉碎盖饭", desc: "猪肉碎与新鲜辣椒和罗勒叶大火翻炒，浇在热腾腾的米饭上" },
  },
  "ผัดพริกเผา (ข้าวราด)": {
    th: { name: "ผัดพริกเผา (ข้าวราด)", desc: "ผัดเครื่องพริกเผาเข้มข้น เคล้ากับเนื้อหรือไก่ตามสั่ง เสิร์ฟพร้อมข้าว" },
    en: {
      name: "Stir-fried Sweet Chili Paste (with Rice)",
      desc: "Stir-fried rich chili paste mixed with your choice of protein, served with Jasmine rice",
    },
    zh: { name: "泰式辣椒膏炒肉盖饭", desc: "浓郁的泰式辣椒膏翻炒，可自选肉类，配米饭" },
  },
  "ผัดน้ำมันหอย (ข้าว/เส้น)": {
    th: { name: "ผัดน้ำมันหอย (ข้าว/เส้น)", desc: "ผัดด้วยน้ำมันหอยหอมหวาน เลือกเนื้อสัตว์และข้าว/เส้นได้ตามต้องการ" },
    en: {
      name: "Stir-fried with Oyster Sauce (with Rice/Noodles)",
      desc: "Stir-fried with sweet and savory oyster sauce, choose your protein and rice/noodles",
    },
    zh: { name: "蚝油炒肉盖饭/面", desc: "蚝油配以大蒜翻炒，可自选肉类并搭配米饭或面条" },
  },
  "ผัดซีอิ๊ว (เส้นใหญ่)": {
    th: { name: "ผัดซีอิ๊ว (เส้นใหญ่)", desc: "เส้นใหญ่ผัดซีอิ๊วแบบร้านตามสั่ง ปรุงรสกลมกล่อม เสิร์ฟร้อน" },
    en: {
      name: "Stir-fried Soy Sauce Noodles (Wide Noodles)",
      desc: "Stir-fried wide rice noodles with soy sauce and vegetables, seasoned to perfection",
    },
    zh: { name: "泰式酱油炒宽粉", desc: "宽粉与黑酱油和新鲜芥兰大火翻炒，经典街头风味" },
  },
  "ข้าวผัดกระเทียม (ข้าวผัด)": {
    th: { name: "ข้าวผัดกระเทียม (ข้าวผัด)", desc: "ข้าวผัดกลิ่นกระเทียม เจียวจนหอม พร้อมผักและเนื้อสัตว์เลือกได้" },
    en: {
      name: "Garlic Fried Rice",
      desc: "Fried rice infused with garlic aroma, cooked with vegetables and your choice of protein",
    },
    zh: { name: "蒜香炒饭", desc: "充满浓郁蒜香的黄金炒饭，搭配蔬菜和自选肉类" },
  },
  "ผัดผงกะหรี่ (ไก่/หมู)": {
    th: { name: "ผัดผงกะหรี่ (ไก่/หมู)", desc: "ผัดผงกะหรี่รสกลมกล่อม เสิร์ฟพร้อมข้าวร้อนๆ" },
    en: {
      name: "Stir-fried Curry Powder (Chicken/Pork)",
      desc: "Savory stir-fried chicken or pork in a mild yellow curry powder sauce, served with rice",
    },
    zh: { name: "咖喱粉炒肉盖饭（鸡/猪）", desc: "滑蛋咖喱粉翻炒肉类，味道香浓温和，配米饭" },
  },
  "ผัดผักรวม (กับข้าว)": {
    th: { name: "ผัดผักรวม (กับข้าว)", desc: "ผัดผักสดหลากหลาย ปรุงรสอ่อนๆ ทานคู่กับข้าวสวย" },
    en: {
      name: "Stir-fried Mixed Vegetables (A La Carte)",
      desc: "Stir-fried variety of fresh vegetables with mild seasoning, perfect to share",
    },
    zh: { name: "清炒什锦蔬菜（单盘）", desc: "多种新鲜时蔬快火清炒，清淡健康，适合分享" },
  },
  "ผัดพริกแกง (ตามสั่ง)": {
    th: { name: "ผัดพริกแกง (ตามสั่ง)", desc: "ผัดพริกแกงกลมกล่อม สามารถเลือกเป็นหมู ไก่ หรือทะเลได้" },
    en: {
      name: "Stir-fried Chili Curry (Custom)",
      desc: "Savory stir-fried red curry paste, choose from pork, chicken, or seafood, served with rice",
    },
    zh: { name: "红咖喱炒肉盖饭（自选）", desc: "泰式红咖喱与豆角爆炒，口感香辣入味，配米饭" },
  },
  "น้ำเปล่า": {
    th: { name: "น้ำเปล่า", desc: "น้ำดื่มเย็นๆ ขวดเล็ก" },
    en: { name: "Drinking Water", desc: "Cold drinking water, small bottle" },
    zh: { name: "矿泉水", desc: "清凉小瓶装饮用水" },
  },
  "โค้ก (ขวด)": {
    th: { name: "โค้ก (ขวด)", desc: "น้ำอัดลม ซีโร่/ปกติ ตามสต็อก" },
    en: { name: "Coke (Bottle)", desc: "Carbonated soft drink, Sugar Free or Original based on stock" },
    zh: { name: "可口可乐（瓶装）", desc: "冰镇可乐，根据当前库存提供无糖或普通版" },
  },
  "น้ำลำไย": {
    th: { name: "น้ำลำไย", desc: "น้ำลำไยหวานหอม เสิร์ฟเย็น" },
    en: { name: "Longan Juice", desc: "Sweet and fragrant traditional longan juice, served cold" },
    zh: { name: "清甜龙眼水", desc: "传统甜美龙眼果汁，冰凉解暑" },
  },
  "น้ำส้มคั้น": {
    th: { name: "น้ำส้มคั้น", desc: "น้ำส้มคั้นสด หวานอมเปรี้ยว" },
    en: { name: "Orange Juice", desc: "Freshly squeezed orange juice, sweet and tangy" },
    zh: { name: "鲜榨橙汁", desc: "新鲜橙子榨汁，酸甜可口" },
  },
  "เฉาก๊วย": {
    th: { name: "เฉาก๊วย", desc: "เฉาก๊วยเย็นหวานกำลังดี ท็อปด้วยน้ำเชื่อม" },
    en: { name: "Grass Jelly", desc: "Refreshing grass jelly in a perfectly sweet syrup, served cold" },
    zh: { name: "冰镇仙草冻", desc: "口感Q弹的黑色仙草，淋上微甜糖浆" },
  },
  "น้ำแข็งไส": {
    th: { name: "น้ำแข็งไส", desc: "น้ำแข็งไสพร้อมท็อปปิ้งหลากหลาย" },
    en: { name: "Thai Shaved Ice", desc: "Traditional shaved ice served with various sweet toppings and syrup" },
    zh: { name: "泰式刨冰", desc: "细碎的冰沙淋上红绿糖浆和炼乳，搭配各种甜料" },
  },
  "กระเพราหมูกรอบ (ข้าวราด)": {
    th: {
      name: "กระเพราหมูกรอบ (ข้าวราด)",
      desc: "กระเพราหมูกรอบหนังสามชั้นกรอบนอกนุ่มใน ผัดใบกระเพราแท้รสจัดจ้าน เสิร์ฟราดข้าวหอมมะลิร้อนๆ",
    },
    en: {
      name: "Crispy Pork Basil (with Rice)",
      desc: "Crispy pork belly stir-fried with authentic spicy basil leaves, served over hot Jasmine rice",
    },
    zh: { name: "罗勒脆皮猪肉盖饭", desc: "金黄酥脆的五花肉与辣椒和罗勒叶爆炒，香辣诱人" },
  },
  "ผัดคะน้าหมูกรอบ (ข้าวราด)": {
    th: {
      name: "ผัดคะน้าหมูกรอบ (ข้าวราด)",
      desc: "ผัดคะน้าใบเขียวสดกรอบกับหมูกรอบสามชั้น ปรุงรสกลมกล่อม ราดข้าวหอมมะลิร้อนๆ",
    },
    en: {
      name: "Stir-fried Chinese Broccoli with Crispy Pork",
      desc: "Stir-fried crisp Chinese broccoli and crispy pork belly, served over Jasmine rice",
    },
    zh: { name: "芥兰炒脆皮猪肉盖饭", desc: "爽脆的芥兰与肥美多汁的脆皮五花肉大火翻炒，咸香下饭" },
  },
  "ผัดพริกแกงหมูกรอบ (ข้าวราด)": {
    th: {
      name: "ผัดพริกแกงหมูกรอบ (ข้าวราด)",
      desc: "พริกแกงรสเข้มข้นผัดคลุกเคล้ากับหมูกรอบและถั่วฝักยาว ราดข้าวหอมมะลิร้อนๆ",
    },
    en: {
      name: "Stir-fried Red Curry with Crispy Pork",
      desc: "Rich and intense red curry paste stir-fried with crispy pork belly and long green beans, served over Jasmine rice",
    },
    zh: { name: "红咖喱脆皮猪肉盖饭", desc: "香浓的红咖喱酱爆炒脆皮猪肉与爽口豇豆，辣劲十足" },
  },
  "กระเทียมพริกไทยหมูชิ้น (ข้าวราด)": {
    th: { name: "กระเทียมพริกไทยหมูชิ้น (ข้าวราด)", desc: "หมูชิ้นนุ่มๆ ผัดซอสกระเทียมพริกไทยรสเข้มข้น หอมกระเทียมเจียว ราดข้าว" },
    en: {
      name: "Garlic Pepper Sliced Pork",
      desc: "Tender sliced pork stir-fried with rich garlic pepper sauce, topped with fragrant fried garlic",
    },
    zh: { name: "蒜香胡椒猪肉片盖饭", desc: "滑嫩的猪肉片融入浓郁的蒜香胡椒酱翻炒，洒上金黄蒜末" },
  },
  "ผัดผงกะหรี่ทะเล (ข้าวราด)": {
    th: { name: "ผัดผงกะหรี่ทะเล (ข้าวราด)", desc: "เนื้อกุ้งและปลาหมึกสดผัดผงกะหรี่เข้มข้น ไข่นุ่มละมุนลิ้น ราดข้าวหอมมะลิ" },
    en: {
      name: "Stir-fried Curry Powder Seafood",
      desc: "Fresh shrimp and squid stir-fried in rich curry powder with smooth, soft eggs, served over Jasmine rice",
    },
    zh: { name: "咖喱粉炒海鲜盖饭", desc: "新鲜大虾和鱿鱼与滑嫩滑蛋、洋葱翻炒在金黄咖喱粉中" },
  },
  "คั่วพริกแกงเนื้อ (ข้าวราด)": {
    th: {
      name: "คั่วพริกแกงเนื้อ (ข้าวราด)",
      desc: "เนื้อวัวเกรดดีผัดคั่วพริกแกงตำมือ รสจัดจ้านถึงใจ สมุนไพรไทยครบเครื่อง ราดข้าว",
    },
    en: {
      name: "Stir-fried Beef Red Curry",
      desc: "Premium grade beef stir-fried with hand-ground red curry paste, spicy and aromatic with Thai herbs",
    },
    zh: { name: "干炒红咖喱牛肉盖饭", desc: "优质牛肉片与手捣红咖喱干煸，带有浓郁泰国香草气味" },
  },
  "ผัดซีอิ๊วเส้นใหญ่หมูกรอบ": {
    th: { name: "ผัดซีอิ๊วเส้นใหญ่หมูกรอบ", desc: "เส้นใหญ่เหนียวนุ่มผัดซีอิ๊วดำหอมกลิ่นกระทะ คลุกเคล้ากับหมูกรอบและคะน้าสด" },
    en: {
      name: "Stir-fried Wide Noodles with Crispy Pork",
      desc: "Soft and chewy wide rice noodles stir-fried with dark soy sauce, crispy pork belly, and fresh Chinese broccoli",
    },
    zh: { name: "脆皮五花肉炒宽粉", desc: "宽大面条快火爆炒，裹满黑酱油酱汁，搭配香脆猪肉" },
  },
  "มาม่าผัดคั่วพริกแกงกุ้ง": {
    th: { name: "มาม่าผัดคั่วพริกแกงกุ้ง", desc: "เส้นมาม่าเหนียวนุ่มผัดซอสพริกแกงเข้มข้นและกุ้งสดเด้งๆ สมุนไพรหอมกรุ่น" },
    en: {
      name: "Stir-fried Instant Noodles with Red Curry and Shrimp",
      desc: "Soft chewy instant noodles stir-fried with rich red curry sauce, bouncy fresh shrimp, and fragrant herbs",
    },
    zh: { name: "红咖喱鲜虾炒方便面", desc: "方便面与香辣红咖喱、Q弹鲜虾以及柠檬叶等香草热辣爆炒" },
  },
  "ผัดพริกเผาหอยลาย (ข้าวราด)": {
    th: { name: "ผัดพริกเผาหอยลาย (ข้าวราด)", desc: "หอยลายสดผัดน้ำพริกเผาสูตรเด็ด รสชาติหวานเค็มเผ็ดลงตัว หอมใบโหระพา ราดข้าว" },
    en: {
      name: "Stir-fried Chili Paste Clams",
      desc: "Fresh clams stir-fried with special sweet chili paste, sweet and savory with fragrant basil leaves, served over rice",
    },
    zh: { name: "辣椒膏炒蛤蜊盖饭", desc: "鲜活蛤蜊搭配秘制甜辣酱及九层塔快炒，鲜美多汁，配米饭" },
  },
  "ผัดผักรวมมิตร (ข้าวราด / มังสวิรัติ)": {
    th: {
      name: "ผัดผักรวมมิตร (ข้าวราด / มังสวิรัติ)",
      desc: "ผัดผักสดรวมมิตรรสชาติเบาๆ สุขภาพดี ปรุงด้วยซีอิ๊วขาวและน้ำมันหอยสูตรเจ ราดข้าว",
    },
    en: {
      name: "Stir-fried Mixed Vegetables (Vegetarian)",
      desc: "Healthy, light-flavored stir-fried fresh mixed vegetables, seasoned with light soy sauce and vegetarian sauce, served with rice",
    },
    zh: { name: "清炒什锦蔬菜盖饭（素食）", desc: "清脆蔬菜快炒，少油低脂，采用素食酱油调味，配米饭" },
  },
  "ข้าวต้ม": {
    th: { name: "ข้าวต้ม", desc: "ข้าวต้มร้อนๆ ปรุงรสกลมกล่อม ทานง่ายสบายท้อง" },
    en: { name: "Thai Rice Soup", desc: "Hot and comforting Thai style rice soup, gently seasoned" },
    zh: { name: "泰式泡饭", desc: "热气腾腾的泰式泡饭，清淡开胃" },
  },
  "ข้าวมันไก่": {
    th: { name: "ข้าวมันไก่", desc: "ข้าวมันไก่ต้มเนื้อนุ่ม เสิร์ฟพร้อมข้าวมันหอมๆ และน้ำจิ้มสูตรเด็ด" },
    en: { name: "Hainanese Chicken Rice", desc: "Tender boiled chicken served with fragrant seasoned rice and savory dipping sauce" },
    zh: { name: "海南鸡饭", desc: "鲜嫩白斩鸡配以香气四溢的鸡油饭和秘制蘸酱" },
  },
  "ข้าวซอย": {
    th: { name: "ข้าวซอย", desc: "ข้าวซอยเส้นนุ่มในน้ำแกงกะหรี่เข้มข้น ท็อปด้วยหมี่กรอบรสชาติเหนือแท้ๆ" },
    en: { name: "Khao Soi (Northern Curry Noodles)", desc: "Soft egg noodles in rich yellow curry broth, topped with crispy noodles" },
    zh: { name: "泰北金面", desc: "浓郁黄咖喱椰奶汤底配以软面条，上覆香脆炸面" },
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLangState] = useState<Language>("th");
  const [loadingLanguages, setLoadingLanguages] = useState<Record<string, boolean>>({});
  const [localCache, setLocalCache] = useState<Record<string, string>>(dynamicCache);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("ran-lung-get-lang") as Language;
      if (savedLang === "th" || savedLang === "en" || savedLang === "zh") {
        setLangState(savedLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLangState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("ran-lung-get-lang", lang);
    }
  };

  // Base translation helper for general UI elements
  const t = (key: string): string => {
    if (language === "th") return key;
    const entry = uiDictionary[key];
    if (entry && entry[language]) {
      return entry[language];
    }

    // Try dynamic translation cache (UI keys use format "<lang>:<key>")
    const cacheKey = `${language}:${key}`;
    if (localCache[cacheKey]) {
      return localCache[cacheKey];
    }

    // Attempt dynamic translation in background
    triggerAsyncTranslation(key, "ui");

    return key;
  };

  // Translation helper for Menus (returns name or description)
  // Uses field-qualified cache keys: "<lang>:name:<text>" and "<lang>:desc:<text>"
  // so that name and description for new items never collide in the cache.
  const tMenu = (text: string, field: "name" | "desc" = "name"): string => {
    if (language === "th") return text;

    // 1. Look up by exact Thai name key in the static dictionary
    let foundEntry = menuDictionary[text];

    // 2. For "desc" lookups, find the entry whose Thai desc matches
    if (!foundEntry && field === "desc") {
      const matchedName = Object.keys(menuDictionary).find(
        (k) => menuDictionary[k].th.desc === text
      );
      if (matchedName) foundEntry = menuDictionary[matchedName];
    }

    if (foundEntry && foundEntry[language]) {
      return foundEntry[language][field];
    }

    // 3. Not in static dictionary — use field-qualified dynamic cache
    const cacheKey = `${language}:${field}:${text}`;
    if (localCache[cacheKey]) {
      return localCache[cacheKey];
    }

    // 4. Fire async translation (returns original text until done, then re-renders)
    triggerAsyncTranslation(text, field);

    return text;
  };

  // Triggers API translation in background and stores result in state (causing re-render)
  const triggerAsyncTranslation = async (text: string, field: "name" | "desc" | "ui" = "ui") => {
    if (!text.trim() || language === "th") return;
    const cacheKey = field === "ui" ? `${language}:${text}` : `${language}:${field}:${text}`;

    if (localCache[cacheKey] || loadingLanguages[cacheKey]) return;

    setLoadingLanguages((prev) => ({ ...prev, [cacheKey]: true }));

    try {
      console.log(`[i18n] Translating (${field}) to ${language}:`, text);
      const res = await translateApi({
        data: {
          text,
          sourceLang: "auto",
          targetLang: language,
        },
      });

      if (res && res.translatedText) {
        const updatedCache = { ...dynamicCache, ...localCache, [cacheKey]: res.translatedText };
        dynamicCache = updatedCache;
        setLocalCache(updatedCache);
        if (typeof window !== "undefined") {
          localStorage.setItem(dynamicCacheKey, JSON.stringify(updatedCache));
        }
      }
    } catch (err) {
      console.warn(`[i18n] Dynamic translation failed for: ${text}`, err);
    } finally {
      setLoadingLanguages((prev) => ({ ...prev, [cacheKey]: false }));
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tMenu, loadingLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
