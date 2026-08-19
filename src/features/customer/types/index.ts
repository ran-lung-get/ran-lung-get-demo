export type OrderType = "dine-in" | "takeaway" | "delivery";

export type Addon = { 
  id: string; 
  name: string; 
  price: number; 
};

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
  spicy?: boolean;
  options?: { id: string; name: string; choices: { id: string; label: string; price?: number }[] }[];
  addons?: Addon[];
  isAvailable?: boolean;
  isSpicy?: boolean;
};

export type CartLine = {
  id: string; // unique line id
  itemId: string;
  name: string;
  price: number; // unit price w/ addons
  qty: number;
  addons: Addon[];
  options: Record<string, string>;
  note: string;
  image: string;
};

export type OrderItem = {
  name: string;
  qty: number;
  price: number;
  image?: string;
  addons?: Addon[] | { id?: string; name: string; price?: number }[];
  options?: Record<string, string>;
  note?: string;
};

export type OrderHistory = {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  total: number;
  status: "สำเร็จ" | "กำลังจัดส่ง" | "กำลังเตรียม" | "รอรับออเดอร์" | "ขอคืนเงิน" | "ยกเลิกแล้ว" | "รอดำเนินการ";
  orderType?: OrderType;
  customerName?: string;
  cancelReason?: string;
  cancelNote?: string;
  refundPromptPay?: string;
  queueNumber?: string;
  tableNumber?: string;
  note?: string;
};

export * from "./gacha";
