import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { MENU } from "../constants/menu";
import type { MenuItem } from "../types";

export function useCustomerMenuAndStock() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    async function loadMenu() {
      let outOfStockIds: string[] = [];
      try {
        const savedOut = localStorage.getItem("ran-lung-get-out-of-stock-items");
        if (savedOut) outOfStockIds = JSON.parse(savedOut);
      } catch {}

      try {
        const { data: dbItems, error } = await supabase
          .from("menu_items")
          .select("*")
          .order("sort_order");
        if (!error && dbItems && dbItems.length > 0) {
          const mapped = dbItems.map((item: any) => {
            const defaultItem = MENU.find((m) => m.id === item.id);
            return {
              id: item.id,
              name: item.name,
              desc: item.description || item.desc || defaultItem?.desc || "",
              price: Number(item.price),
              image: item.image_url || item.image || defaultItem?.image || "",
              category: item.category || defaultItem?.category || "main",
              tags: Array.isArray(item.tags) && item.tags.length > 0 
                ? item.tags 
                : (defaultItem?.tags || []),
              isAvailable: (item.is_available !== false) && !outOfStockIds.includes(item.id),
              isSpicy: item.is_spicy ?? defaultItem?.isSpicy ?? false,
              options: item.options || defaultItem?.options || undefined,
              addons: item.addons || defaultItem?.addons || undefined,
            };
          });
          setMenuItems(mapped);
          localStorage.setItem("ran-lung-get-menu-items", JSON.stringify(mapped));
        } else {
          const localMenu = localStorage.getItem("ran-lung-get-menu-items");
          if (localMenu) {
            const parsed = JSON.parse(localMenu).map((item: any) => ({
              ...item,
              isAvailable: item.isAvailable !== false && !outOfStockIds.includes(item.id),
            }));
            setMenuItems(parsed);
          }
        }
      } catch (err) {
        console.warn("Failed to load menu from Supabase:", err);
        const localMenu = localStorage.getItem("ran-lung-get-menu-items");
        if (localMenu) {
          const parsed = JSON.parse(localMenu).map((item: any) => ({
            ...item,
            isAvailable: item.isAvailable !== false && !outOfStockIds.includes(item.id),
          }));
          setMenuItems(parsed);
        }
      }
    }

    async function loadStock() {
      try {
        const { data: ingData } = await supabase.from("ingredients").select("*");
        if (ingData && ingData.length > 0) {
          setIngredients(ingData);
        } else {
          const localIng = localStorage.getItem("ran-lung-get-mock-ingredients");
          if (localIng) {
            setIngredients(JSON.parse(localIng));
          }
        }

        const { data: recData } = await supabase.from("recipe_items").select("*");
        if (recData && recData.length > 0) {
          setRecipes(recData);
        } else {
          const fallbackRecipes = [
            { option_id: "opt-mu-sap", ingredient_id: "mock-1", quantity_required: 80 },
            { option_id: "opt-mu-krob", ingredient_id: "mock-2", quantity_required: 80 },
            { option_id: "opt-mu-chin", ingredient_id: "mock-3", quantity_required: 80 },
            { option_id: "opt-kai-sap", ingredient_id: "mock-4", quantity_required: 80 },
            { option_id: "opt-kai-tom", ingredient_id: "mock-5", quantity_required: 80 },
            { option_id: "opt-nua", ingredient_id: "mock-6", quantity_required: 80 },
            { option_id: "opt-muek", ingredient_id: "mock-7", quantity_required: 80 },
            { option_id: "opt-kung", ingredient_id: "mock-8", quantity_required: 80 },
            { option_id: "opt-hoi-lay", ingredient_id: "mock-9", quantity_required: 80 },
            { option_id: "opt-khai-kai", ingredient_id: "mock-10", quantity_required: 1 },
            { option_id: "opt-sai-krog", ingredient_id: "mock-11", quantity_required: 1 },
            { option_id: "opt-kun-chiang", ingredient_id: "mock-12", quantity_required: 1 },
          ];
          setRecipes(fallbackRecipes);
        }
      } catch (err) {
        console.warn("Error loading stock from database, using local fallback:", err);
        const localIng = localStorage.getItem("ran-lung-get-mock-ingredients");
        if (localIng) {
          setIngredients(JSON.parse(localIng));
        }
      }
    }
    loadMenu();
    loadStock();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ran-lung-get-mock-ingredients" && e.newValue) {
        try {
          setIngredients(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Storage sync parse error:", err);
        }
      }
      if (e.key === "ran-lung-get-menu-items" && e.newValue) {
        try {
          setMenuItems(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Storage sync parse error:", err);
        }
      }
      if (e.key === "ran-lung-get-out-of-stock-items") {
        loadMenu();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    const handleCustomMenuUpdated = () => {
      loadMenu();
      loadStock();
    };
    window.addEventListener("ran-lung-get-menu-updated", handleCustomMenuUpdated);
    window.addEventListener("ran-lung-get-stock-updated", handleCustomMenuUpdated);

    const chMenu = supabase
      .channel("menu-items-realtime-customer")
      .on("postgres_changes", { event: "*", schema: "public", table: "menu_items" }, () => {
        loadMenu();
      })
      .subscribe();

    const chIng = supabase
      .channel("ingredients-realtime-customer")
      .on("postgres_changes", { event: "*", schema: "public", table: "ingredients" }, () => {
        loadStock();
      })
      .subscribe();

    const chRec = supabase
      .channel("recipe_items-realtime-customer")
      .on("postgres_changes", { event: "*", schema: "public", table: "recipe_items" }, () => {
        loadStock();
      })
      .subscribe();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("ran-lung-get-menu-updated", handleCustomMenuUpdated);
      window.removeEventListener("ran-lung-get-stock-updated", handleCustomMenuUpdated);
      supabase.removeChannel(chMenu);
      supabase.removeChannel(chIng);
      supabase.removeChannel(chRec);
    };
  }, []);

  const checkOptionOutOfStock = (optionId: string) => {
    const optionRecipes = recipes.filter((r) => r.option_id === optionId);
    if (optionRecipes.length === 0) return false;

    return optionRecipes.some((recipe) => {
      const ingredient = ingredients.find((i) => {
        return (
          i.id === recipe.ingredient_id ||
          i.name === recipe.ingredient_id ||
          (recipe.ingredient_id && recipe.ingredient_id.includes(i.name))
        );
      });
      if (!ingredient) return true;
      if (ingredient.is_active === false || ingredient.status === "disabled") return true;
      return Number(ingredient.quantity) < Number(recipe.quantity_required);
    });
  };

  return {
    menuItems,
    setMenuItems,
    ingredients,
    recipes,
    checkOptionOutOfStock,
  };
}
