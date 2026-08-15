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
  queueNumber?: string;
  note?: string;
};

export type MenuItemDB = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  image_url: string | null;
  category: string;
  is_available: boolean;
  is_spicy: boolean;
  sort_order: number;
  options: any[] | null;
  addons: any[] | null;
  staff_note: string | null;
};

export type OptionGroup = {
  id: string;
  name: string;
  choices: { id: string; label: string; price?: number }[];
};

export type AddonItem = {
  id: string;
  name: string;
  price: number;
};
