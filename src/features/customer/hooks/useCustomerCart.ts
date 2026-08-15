import { useState, useMemo } from "react";
import type { CartLine } from "../types";

export function useCustomerCart() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartDrawer, setCartDrawer] = useState(false);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const totalQty = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const addToCart = (line: CartLine) => {
    setCart((prev) => [...prev, line]);
  };

  const removeLine = (id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLine = (line: CartLine) => {
    setCart((prev) => prev.map((l) => (l.id === line.id ? line : l)));
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    setCart,
    cartDrawer,
    setCartDrawer,
    subtotal,
    totalQty,
    addToCart,
    removeLine,
    updateLine,
    clearCart,
  };
}
