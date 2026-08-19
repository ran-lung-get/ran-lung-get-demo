export type OrderType = "dine-in" | "takeaway" | "delivery";

export type OrderItem = {
  name: string;
  qty: number;
  price: number;
  image?: string;
  addons?: { id?: string; name: string; price?: number }[];
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
  status: string;
  orderType?: OrderType;
  customerName?: string;
  tableNumber?: string;
  note?: string;
  cancelReason?: string;
  cancelNote?: string;
  refundPromptPay?: string;
};
