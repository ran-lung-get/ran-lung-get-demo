export type OrderType = "dine-in" | "takeaway" | "delivery";

export type OrderHistory = {
  id: string;
  orderNumber: string;
  date: string;
  items: { name: string; qty: number; price: number; image: string }[];
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
