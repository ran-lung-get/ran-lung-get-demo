import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { liffLogout } from "../../lib/liff";
import { supabase } from "../../lib/supabase";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "../../lib/i18n";
import { ShoppingBag, ChevronRight } from "lucide-react";

import {
  BRAND,
  GOLD,
  MENU,
  type OrderType,
  type MenuItem,
  type CartLine,
  type OrderHistory,
  type Addon,
  type ActiveCoupon,
} from "../../features/customer";

import {
  TablePickerBottomSheet,
  ItemModal,
  MenuOverlay,
  CartDrawer,
  OrderConfirmOverlay,
  PaymentOverlay,
  StatusScreen,
  HistoryOverlay,
  ContactOverlay,
  StoreClosedOverlay,
  CustomerSidebar,
  HomeScreen,
  SuccessFlash,
  RandomDishModal,
  GachaModal,
  MiniGamesModal,
} from "../../features/customer/components";

import {
  useWebAvatar,
  useCustomerAuth,
  useCustomerTables,
  useCustomerMenuAndStock,
  useCustomerOrders,
  useStoreStatus,
  useCustomerCart,
  useStripeCheckoutVerification,
} from "../../features/customer/hooks";

// Re-export types and menu for backward compatibility
export type { Addon, MenuItem, CartLine, OrderType, OrderHistory, ActiveCoupon };
export { MENU };

export const Route = createFileRoute("/customer/")({
  head: () => ({
    meta: [
      { title: "DineOS" },
      { name: "description", content: "สั่งอาหารจานด่วน สด สะอาด อร่อย ส่งไว จาก DineOS" },
      { property: "og:title", content: "DineOS" },
      { property: "og:description", content: "สั่งอาหารจานด่วน สด สะอาด อร่อย ส่งไว จาก DineOS" },
    ],
  }),
  component: LiffApp,
});

function LiffApp() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // 1. Auth and WebAvatar
  const { liffReady, setLiffReady, profile, dbUser, dbCustomer } = useCustomerAuth(navigate);
  useWebAvatar(navigate);

  // 2. Tables, Menu, Stock, Orders & Store Status
  const {
    tables,
    setTables,
    selectedTable,
    setSelectedTable,
    showTablePicker,
    setShowTablePicker,
    handleSelectTable,
  } = useCustomerTables();

  const { menuItems, checkOptionOutOfStock } = useCustomerMenuAndStock();

  const {
    orderHistory,
    setOrderHistory,
    hasActiveOrder,
    activeOrderNumber,
    saveOrderToHistory,
    clearOrderHistory,
  } = useCustomerOrders({ dbUser, dbCustomer, profile, setTables });

  const {
    isCurrentlyClosed,
    simulateClosed,
    setSimulateClosed,
    bypassRealClosed,
    setBypassRealClosed,
  } = useStoreStatus();

  // 3. Cart & Navigation States
  const {
    cart,
    setCart,
    cartDrawer,
    setCartDrawer,
    subtotal,
    totalQty,
    addToCart,
    removeLine,
    updateLine,
  } = useCustomerCart();

  const [tab, setTab] = useState<"home" | "status">("home");
  const [overlay, setOverlay] = useState<
    null | "menu" | "orderConfirm" | "payment" | "history" | "contact"
  >(null);
  const [sidebar, setSidebar] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [showGachaModal, setShowGachaModal] = useState(false);
  const [gachaInitialTab, setGachaInitialTab] = useState<
    "wish" | "games" | "album" | "wallet" | "history"
  >("wish");
  const [earnedTicketsAmount, setEarnedTicketsAmount] = useState<number>(0);
  const [activeCoupon, setActiveCoupon] = useState<ActiveCoupon | null>(null);

  const [orderType, setOrderType] = useState<OrderType | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [editingCartLine, setEditingCartLine] = useState<CartLine | null>(null);

  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState<"home" | "work" | "dorm">("home");
  const [deliveryMethod, setDeliveryMethod] = useState<"leave" | "pickup" | null>(null);
  const [showAddressError, setShowAddressError] = useState(false);
  const [showTypeError, setShowTypeError] = useState(false);

  const deliveryFee = orderType === "delivery" ? 40 : 0;

  const selectedItemToEdit = useMemo(() => {
    if (editingCartLine) {
      return menuItems.find((m) => m.id === editingCartLine.itemId) || null;
    }
    return null;
  }, [editingCartLine, menuItems]);

  // Clean pending stripe order and auto-close checkout if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem("ran-lung-get-pending-stripe-order");
      if (overlay === "orderConfirm" || overlay === "payment") {
        setOverlay(null);
      }
    }
  }, [cart, overlay]);

  // 4. Stripe Checkout Session Verification
  useStripeCheckoutVerification({
    liffReady,
    setCart,
    setShowSuccess,
    setOverlay,
    setTab,
    saveOrderToHistory,
    tables,
  });

  const shouldShowClosedOverlay =
    isCurrentlyClosed &&
    tab === "home" &&
    (overlay === null || overlay === "menu" || overlay === "orderConfirm" || overlay === "payment");

  const resetAll = () => {
    setCart([]);
    setOverlay(null);
    setCartDrawer(false);
    setSelectedItem(null);
    setTab("home");
    setShowAddressError(false);
    setShowTypeError(false);
  };

  if (!liffReady) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center relative"
        style={{
          background: "radial-gradient(circle at 20% 20%, #0d2d42 0%, #050d15 65%, #020609 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(252,193,74,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="flex flex-col items-center gap-4 z-10">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,0.1)",
              borderTopColor: "#fcc14a",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[var(--linen)]">
      <main
        aria-label="แอปพลิเคชันสั่งอาหาร DineOS"
        className="relative overflow-hidden bg-[var(--linen)] no-scrollbar z-10 w-full"
        style={{ height: "100dvh" }}
      >
        <div className="absolute inset-0 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: tab === "status" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: tab === "status" ? -20 : 20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="h-full"
            >
              {tab === "home" && (
                <HomeScreen
                  menuItems={menuItems}
                  onOpenSidebar={() => setSidebar(true)}
                  orderType={orderType}
                  isCurrentlyClosed={isCurrentlyClosed}
                  bypassRealClosed={bypassRealClosed}
                  setOrderType={setOrderType}
                  onPickItem={(it) => setSelectedItem(it)}
                  onOpenCart={() => setCartDrawer(true)}
                  totalQty={totalQty}
                  subtotal={subtotal}
                  onOpenMenu={() => setOverlay("menu")}
                  onOpenRandomModal={() => setShowRandomModal(true)}
                  onOpenGacha={() => {
                    setGachaInitialTab("wish");
                    setShowGachaModal(true);
                  }}
                  onOpenMiniGames={() => {
                    setGachaInitialTab("games");
                    setShowGachaModal(true);
                  }}
                  hasActiveOrder={hasActiveOrder}
                  activeOrderNumber={activeOrderNumber}
                  onGoToStatus={() => setTab("status")}
                  selectedTable={selectedTable}
                  setSelectedTable={setSelectedTable}
                  tables={tables}
                  onOpenTablePicker={() => setShowTablePicker(true)}
                  activeOrderType={
                    orderHistory.find((o) => o.orderNumber === activeOrderNumber)?.orderType
                  }
                  activeOrderStatus={
                    orderHistory.find((o) => o.orderNumber === activeOrderNumber)?.status
                  }
                  address={address}
                  setAddress={setAddress}
                  addressType={addressType}
                  setAddressType={setAddressType}
                  deliveryMethod={deliveryMethod}
                  setDeliveryMethod={setDeliveryMethod}
                  showAddressError={showAddressError}
                  setShowAddressError={setShowAddressError}
                  showTypeError={showTypeError}
                  setShowTypeError={setShowTypeError}
                />
              )}
              {tab === "status" && (
                <StatusScreen
                  onOpenSidebar={() => setSidebar(true)}
                  onOpenGacha={() => setShowGachaModal(true)}
                  activeOrder={
                    orderHistory.find((o) => o.orderNumber === activeOrderNumber) || orderHistory[0]
                  }
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Item Customizer Modal */}
        <AnimatePresence>
          {(selectedItem || editingCartLine) && (selectedItem || selectedItemToEdit) && (
            <ItemModal
              key="item"
              item={selectedItem || selectedItemToEdit!}
              cartLine={editingCartLine || undefined}
              onClose={() => {
                setSelectedItem(null);
                setEditingCartLine(null);
              }}
              onAdd={(line) => {
                if (editingCartLine) {
                  updateLine(line);
                } else {
                  addToCart(line);
                }
                setSelectedItem(null);
                setEditingCartLine(null);
              }}
              checkOptionOutOfStock={checkOptionOutOfStock}
            />
          )}
        </AnimatePresence>

        {/* Menu & Checkout Overlays */}
        <AnimatePresence>
          {overlay === "menu" && (
            <MenuOverlay
              key="menu"
              menuItems={menuItems}
              onBack={() => setOverlay(null)}
              onPickItem={(it) => setSelectedItem(it)}
              onOpenCart={() => setCartDrawer(true)}
              totalQty={totalQty}
              subtotal={subtotal}
            />
          )}
          {overlay === "orderConfirm" && (
            <OrderConfirmOverlay
              key="confirm"
              cart={cart}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              activeCoupon={activeCoupon}
              onBack={() => setOverlay("menu")}
              onRemove={removeLine}
              onEdit={(line) => setEditingCartLine(line)}
              onProceed={() => setOverlay("payment")}
            />
          )}
          {overlay === "payment" && (
            <PaymentOverlay
              key="pay"
              total={
                Math.max(
                  0,
                  subtotal -
                    (activeCoupon
                      ? activeCoupon.discountPercent
                        ? Math.round((subtotal * activeCoupon.discountPercent) / 100)
                        : activeCoupon.discountAmount || 0
                      : 0)
                ) + deliveryFee
              }
              cart={cart}
              orderType={orderType || "delivery"}
              deliveryFee={deliveryFee}
              subtotal={subtotal}
              selectedTable={selectedTable}
              address={address}
              onBack={() => setOverlay("orderConfirm")}
              onSuccess={() => {
                saveOrderToHistory(cart, orderType, selectedTable, address, tables);

                const finalTotal = Math.max(
                  0,
                  subtotal -
                    (activeCoupon
                      ? activeCoupon.discountPercent
                        ? Math.round((subtotal * activeCoupon.discountPercent) / 100)
                        : activeCoupon.discountAmount || 0
                      : 0)
                ) + deliveryFee;

                const earned = Math.max(1, Math.floor(finalTotal / 60));

                try {
                  const STORAGE_KEY_GACHA = "ran-lung-get-gacha-state";
                  const saved = localStorage.getItem(STORAGE_KEY_GACHA);
                  const curr = saved ? JSON.parse(saved) : { tickets: 10 };
                  curr.tickets = (curr.tickets || 0) + earned;
                  localStorage.setItem(STORAGE_KEY_GACHA, JSON.stringify(curr));
                } catch {
                  // ignore
                }

                setEarnedTicketsAmount(earned);
                setShowSuccess(true);
                setTimeout(() => {
                  setShowSuccess(false);
                  setOverlay(null);
                  setCart([]);
                  setActiveCoupon(null);
                  setTab("status");
                }, 1800);
              }}
            />
          )}
        </AnimatePresence>

        {/* History & Contact Overlays */}
        <AnimatePresence>
          {overlay === "history" && (
            <HistoryOverlay
              key="history"
              orderHistory={orderHistory}
              onBack={() => setOverlay(null)}
              onClearHistory={clearOrderHistory}
            />
          )}
          {overlay === "contact" && (
            <ContactOverlay key="contact" onBack={() => setOverlay(null)} />
          )}
        </AnimatePresence>

        {/* Cart Drawer */}
        <AnimatePresence>
          {cartDrawer && (
            <CartDrawer
              key="cd"
              cart={cart}
              subtotal={subtotal}
              activeCoupon={activeCoupon}
              onApplyCoupon={(c) => setActiveCoupon(c)}
              onRemoveCoupon={() => setActiveCoupon(null)}
              onClose={() => setCartDrawer(false)}
              onRemove={removeLine}
              onEdit={(line) => {
                setEditingCartLine(line);
                setCartDrawer(false);
              }}
              onCheckout={() => {
                setCartDrawer(false);
                setOverlay("orderConfirm");
              }}
            />
          )}
        </AnimatePresence>

        {/* Customer Navigation Sidebar */}
        <AnimatePresence>
          {sidebar && (
            <CustomerSidebar
              key="sb"
              onClose={() => setSidebar(false)}
              onNavigate={(tNav) => {
                setSidebar(false);
                if (tNav === "home" || tNav === "status") setTab(tNav);
                if (tNav === "gacha") {
                  setGachaInitialTab("wish");
                  setShowGachaModal(true);
                }
                if (tNav === "minigames") {
                  setGachaInitialTab("games");
                  setShowGachaModal(true);
                }
                if (tNav === "history") setOverlay("history");
                if (tNav === "contact") setOverlay("contact");
              }}
              orderHistory={orderHistory}
              simulateClosed={simulateClosed}
              setSimulateClosed={(val) => {
                setSimulateClosed(val);
                if (val) {
                  setBypassRealClosed(false);
                }
              }}
              profile={profile}
            />
          )}
        </AnimatePresence>

        {/* Store Closed Overlay */}
        <AnimatePresence>
          {shouldShowClosedOverlay && (
            <StoreClosedOverlay
              key="closed"
              onBypass={() => {
                setBypassRealClosed(true);
                setSimulateClosed(false);
              }}
              onOpenSidebar={() => setSidebar(true)}
            />
          )}
        </AnimatePresence>

        {/* Table Picker BottomSheet */}
        <AnimatePresence>
          {showTablePicker && (
            <TablePickerBottomSheet
              key="table-picker"
              tables={tables}
              selectedTable={selectedTable}
              onSelect={async (tableId) => {
                setOrderType("dine-in");
                await handleSelectTable(tableId);
                setTimeout(() => {
                  setShowTablePicker(false);
                  setOverlay("menu");
                }, 200);
              }}
              onClose={() => setShowTablePicker(false)}
            />
          )}
        </AnimatePresence>

        {/* Success Animation Flash */}
        <AnimatePresence>
          {showSuccess && <SuccessFlash key="sf" earnedTickets={earnedTicketsAmount} />}
        </AnimatePresence>

        {/* Random Dish Generator Modal */}
        <RandomDishModal
          isOpen={showRandomModal}
          onClose={() => setShowRandomModal(false)}
          menuItems={menuItems}
          onSelectDish={(dish) => {
            setShowRandomModal(false);
            setSelectedItem(dish);
          }}
        />

        {/* Gacha & Collectible Cards Modal (Unified with Mini-Games) */}
        <AnimatePresence>
          {showGachaModal && (
            <GachaModal
              isOpen={showGachaModal}
              initialTab={gachaInitialTab}
              onClose={() => setShowGachaModal(false)}
              onApplyCoupon={(coupon) => {
                setActiveCoupon(coupon);
                setCartDrawer(true);
              }}
              onSelectDish={(dishName) => {
                const item = menuItems.find(
                  (m) =>
                    m.name.includes(dishName) ||
                    dishName.includes(m.name) ||
                    dishName.replace(/\s*\(.*?\)\s*/g, "") === m.name.replace(/\s*\(.*?\)\s*/g, "")
                );
                if (item) {
                  setSelectedItem(item);
                } else {
                  setOverlay("menu");
                }
              }}
            />
          )}
        </AnimatePresence>

        {/* Floating Cart Bar */}
        <AnimatePresence>
          {totalQty > 0 && tab !== "status" && (
            <motion.div
              key="fixed-cart-bar"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute z-20"
              style={{
                left: 16,
                right: 16,
                bottom: 24,
                maxWidth: 600,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <button
                type="button"
                onClick={() => setCartDrawer(true)}
                className="w-full rounded-2xl px-5 py-4 flex items-center justify-between shadow-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer border border-[#fcc14a]/20"
                style={{
                  background: `linear-gradient(135deg, ${BRAND} 0%, #001f30 100%)`,
                  color: "white",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="relative grid h-10 w-10 place-items-center rounded-xl backdrop-blur-md"
                    style={{ background: "rgba(252,193,74,0.18)" }}
                  >
                    <ShoppingBag size={20} style={{ color: GOLD }} />
                    <span
                      className="absolute -top-1.5 -right-1.5 grid h-5 min-w-5 px-1 place-items-center rounded-full text-[10px] font-extrabold shadow-xs border border-white"
                      style={{ background: GOLD, color: BRAND }}
                    >
                      {totalQty}
                    </span>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-sm leading-tight">{t("ตะกร้าสินค้า")}</span>
                    <span className="text-[11px] text-white/60 font-light">
                      {t("กดเพื่อดูและสั่งซื้อ")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg" style={{ color: GOLD }}>
                    ฿{subtotal}
                  </span>
                  <ChevronRight size={18} className="text-[#fcc14a]" />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {tab === "status" && (
          <div className="absolute bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-xs p-4 flex justify-center">
            <button
              type="button"
              onClick={resetAll}
              className="w-full max-w-md h-12 rounded-full font-semibold cursor-pointer shadow-md active:scale-[0.98] transition-all"
              style={{ background: BRAND, color: "white" }}
            >
              {t("กลับไปยังหน้าหลัก")}
            </button>
          </div>
        )}

        {/* WebAvatar container */}
        <div
          id="webavatar-container"
          className={`absolute bottom-6 right-4 z-40 transition-opacity duration-300 ${
            tab === "home" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{
            width: "100px",
            height: "100px",
          }}
        />
      </main>
    </div>
  );
}