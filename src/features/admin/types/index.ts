export type AdminViewType = "dashboard" | "inventory" | "staff" | "approvals";

export type AdminUser = {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  name?: string;
  created_at?: string;
};

export type IngredientItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  min_threshold: number;
};
