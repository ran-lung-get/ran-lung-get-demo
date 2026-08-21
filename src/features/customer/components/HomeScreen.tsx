import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  ShoppingBag,
  ChevronDown,
  Check,
  Utensils,
  Bike,
  ChevronRight,
  ChevronLeft,
  Star,
  Plus,
  Dices,
  Sparkles,
  Gift,
  ThumbsUp,
  Gamepad2,
} from "lucide-react";
import { useLanguage, type Language } from "../../../lib/i18n";
import type { MenuItem, OrderType } from "../types";
import { BRAND, GOLD, INK_MUTED, LINEN, HERO_IMG } from "../constants/colors";
import { FlagIcon } from "./FlagIcon";
import { DineInBlock } from "./DineInBlock";
import { DeliveryBlock } from "./DeliveryBlock";
import { MiniOrderTracker } from "./MiniOrderTracker";

export function HomeScreen({
  menuItems,
  onOpenSidebar,
  orderType,
  setOrderType,
  onPickItem,
  onOpenCart,
  totalQty,
  subtotal: _subtotal,
  onOpenMenu,
  onOpenRandomModal,
  onOpenGacha,
  onOpenMiniGames,
  hasActiveOrder,
  activeOrderNumber,
  onGoToStatus,
  selectedTable,
  setSelectedTable: _setSelectedTable,
  tables: _tables,
  onOpenTablePicker,
  activeOrderType,
  activeOrderStatus,
  address,
  setAddress,
  addressType,
  setAddressType,
  deliveryMethod,
  setDeliveryMethod,
  showAddressError,
  setShowAddressError,
  showTypeError,
  setShowTypeError,
  isCurrentlyClosed,
  bypassRealClosed,
}: {
  menuItems: MenuItem[];
  onOpenSidebar: () => void;
  orderType: OrderType | null;
  setOrderType: (m: OrderType | null) => void;
  onPickItem: (m: MenuItem) => void;
  onOpenCart: () => void;
  totalQty: number;
  subtotal: number;
  onOpenMenu: () => void;
  onOpenRandomModal?: () => void;
  onOpenGacha?: () => void;
  onOpenMiniGames?: () => void;
  hasActiveOrder: boolean;
  activeOrderNumber: string;
  onGoToStatus: () => void;
  selectedTable: string;
  setSelectedTable: (t: string) => void;
  tables: { id: string; label: string; status: string }[];
  onOpenTablePicker: () => void;
  activeOrderType?: OrderType;
  activeOrderStatus?: string;
  address: string;
  setAddress: (val: string) => void;
  addressType: "home" | "work" | "dorm";
  setAddressType: (val: "home" | "work" | "dorm") => void;
  deliveryMethod: "leave" | "pickup" | null;
  setDeliveryMethod: (val: "leave" | "pickup" | null) => void;
  showAddressError: boolean;
  setShowAddressError: (val: boolean) => void;
  showTypeError: boolean;
  setShowTypeError: (val: boolean) => void;
  isCurrentlyClosed: boolean;
  bypassRealClosed: boolean;
}) {
  const { language, setLanguage, t, tMenu } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isAutoScrollPaused = useRef(false);
  const pauseAutoScrollTimeoutRef = useRef<any>(null);

  const pauseAutoScroll = (duration = 4500) => {
    isAutoScrollPaused.current = true;
    if (pauseAutoScrollTimeoutRef.current) {
      clearTimeout(pauseAutoScrollTimeoutRef.current);
    }
    pauseAutoScrollTimeoutRef.current = setTimeout(() => {
      isAutoScrollPaused.current = false;
    }, duration);
  };

  // Continuous 60fps Smooth Auto-scroll for Recommended Menu slider
  useEffect(() => {
    let animId: number;
    const speed = 0.6;

    const step = () => {
      if (scrollRef.current && !isHoveredRef.current && !isAutoScrollPaused.current) {
        const container = scrollRef.current;
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
          container.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animId);
      if (pauseAutoScrollTimeoutRef.current) clearTimeout(pauseAutoScrollTimeoutRef.current);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      pauseAutoScroll(4500);
      const scrollAmount = 240;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const orderTypeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="pb-36" style={{ background: LINEN }}>
      {/* Hero */}
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <img
          src={HERO_IMG}
          alt="restaurant"
          className="absolute inset-0 h-full w-full object-cover object-center scale-110 transition-transform duration-700 ease-out hover:scale-115"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,18,30,0.55) 0%, rgba(0,18,30,0.25) 40%, rgba(0,18,30,0.85) 100%)",
          }}
        />
        <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full px-5 md:px-12 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">
            {/* Top Navigation Bar */}
            <div className="absolute top-5 left-5 right-5 z-30 flex items-center justify-between pointer-events-auto">
              {/* Menu Button */}
              <button
                type="button"
                aria-label="เปิดเมนูด้านข้าง"
                onClick={onOpenSidebar}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <Menu size={20} />
              </button>

              {/* Right Action Group (Language Selector & Cart) */}
              <div className="flex items-center gap-2">
                {/* Language Selector */}
                <div className="relative">
                  <button
                    type="button"
                    aria-label="เปลี่ยนภาษา"
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                    className="flex items-center bg-black/35 hover:bg-black/45 backdrop-blur-md px-3 rounded-full border border-white/20 text-white shadow-md transition-all cursor-pointer min-w-[120px] justify-between h-10 select-none active:scale-95"
                  >
                    <div className="flex items-center gap-1.5">
                      <FlagIcon lang={language} />
                      <span className="font-extrabold text-[11px] tracking-wide whitespace-nowrap">
                        {language === "th" ? "ภาษาไทย" : language === "en" ? "English" : "中文"}
                      </span>
                    </div>
                    <ChevronDown
                      size={13}
                      className={`opacity-75 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Invisible clickaway backdrop */}
                  {langDropdownOpen && (
                    <div
                      className="fixed inset-0 z-40 cursor-default"
                      onClick={() => setLangDropdownOpen(false)}
                    />
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {langDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1.5 w-44 bg-black/85 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5 flex flex-col gap-1"
                      >
                        {[
                          { code: "th", label: "ภาษาไทย", text: "Thai" },
                          { code: "en", label: "English", text: "English" },
                          { code: "zh", label: "中文", text: "Chinese" },
                        ].map((item) => {
                          const isActive = language === item.code;
                          return (
                            <button
                              key={item.code}
                              type="button"
                              aria-label={`เลือกภาษา ${item.label}`}
                              onClick={() => {
                                setLanguage(item.code as Language);
                                setLangDropdownOpen(false);
                              }}
                              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer"
                              style={{
                                background: isActive ? "rgba(252,193,74,0.15)" : "transparent",
                                color: isActive ? "#fcc14a" : "#ffffff",
                                fontWeight: isActive ? "800" : "600",
                              }}
                            >
                              <span className="flex items-center gap-2 tracking-wide">
                                <FlagIcon lang={item.code} />
                                {item.label}
                              </span>
                              {isActive && (
                                <Check size={12} className="text-[#fcc14a]" strokeWidth={3} />
                              )}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cart Button */}
                <button
                  type="button"
                  aria-label={`เปิดตะกร้าสินค้า มีสินค้าทั้งหมด ${totalQty} ชิ้น`}
                  onClick={onOpenCart}
                  className="h-10 px-3.5 flex items-center gap-1.5 text-white/90 text-xs bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-full border border-white/20 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingBag size={15} />
                  {totalQty > 0 && (
                    <span
                      className="ml-0.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[10px] font-bold"
                      style={{ background: GOLD, color: BRAND }}
                    >
                      {totalQty}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">EPICUREAN</p>
              <h1 className="text-2xl font-bold mt-1">{t("สวัสดี, ยินดีต้อนรับ")}</h1>
              <p className="text-sm text-white/80 mt-1">{t("เลือกประสบการณ์การรับประทาน")}</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold border backdrop-blur-xs ${isCurrentlyClosed
                      ? "bg-red-500/20 text-red-400 border-red-500/35"
                      : "bg-emerald-500/20 text-emerald-400 border-emerald-500/35"
                    }`}>
                    <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${isCurrentlyClosed ? "bg-red-400" : "bg-emerald-400"}`} />
                    {isCurrentlyClosed ? t("ปิดบริการ") : t("เปิดบริการ")}
                  </span>
                  <span className="text-xs font-semibold text-white/90">
                    {isCurrentlyClosed ? (language === "th" ? "อา. - ศ. 08:00 - 21:00" : "Sun - Fri 08:00 - 21:00") : "08:00 - 21:00"}
                  </span>
                  {bypassRealClosed && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/25 px-2 py-0.5 text-[9px] font-bold text-amber-300 border border-amber-500/30">
                      {t("โหมดสาธิต")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini order status tracker */}
      <AnimatePresence>
        {hasActiveOrder && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            className="px-5 md:px-12 mt-4 max-w-7xl mx-auto w-full"
          >
            <MiniOrderTracker
              orderNumber={activeOrderNumber}
              onGoToStatus={onGoToStatus}
              orderType={activeOrderType || "delivery"}
              status={activeOrderStatus}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order type tiles */}
      <div ref={orderTypeRef} className="px-5 md:px-12 mt-4 max-w-7xl mx-auto w-full">
        <h3 className="text-sm font-bold mb-3 flex flex-wrap items-center gap-x-1.5" style={{ color: BRAND }}>
          <span>{t("ช่องทางการรับอาหาร")} <span className="text-red-500">*</span></span>
          {orderType === null && (
            <span className="text-xs text-slate-400 font-normal">
              {t("(กรุณาเลือกช่องทางการรับอาหารด้านบนเพื่อระบุรายละเอียด)")}
            </span>
          )}
        </h3>
        {showTypeError && (
          <p className="text-xs text-red-500 font-semibold mb-3">
            {t("* กรุณาเลือกช่องทางการรับอาหาร (ทานที่ร้าน, จัดส่งถึงที่ หรือ รับกลับบ้าน) ก่อนเริ่มสั่งซื้อ")}
          </p>
        )}
        <div className={`grid grid-cols-3 gap-2.5 p-1.5 rounded-2xl transition-all duration-300 ${showTypeError ? "border-2 border-red-500 bg-red-50/20" : "border-2 border-transparent"}`}>
          <button
            type="button"
            aria-label="เลือกทานที่ร้าน"
            onClick={() => {
              setOrderType("dine-in");
              setShowTypeError(false);
              onOpenTablePicker();
            }}
            className="rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-95 bg-white border shadow-xs"
            style={{
              background: orderType === "dine-in" ? BRAND : "white",
              color: orderType === "dine-in" ? GOLD : BRAND,
              borderColor: orderType === "dine-in" ? BRAND : "#ece4d6",
              boxShadow: orderType === "dine-in" ? "0 6px 20px rgba(0,46,71,0.22)" : "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl transition-colors" style={{ background: orderType === "dine-in" ? "rgba(252,193,74,0.18)" : LINEN, color: orderType === "dine-in" ? GOLD : BRAND }}>
              <Utensils size={17} />
            </div>
            <div className="font-bold text-[12px]">{t("ทานที่ร้าน")}</div>
          </button>

          <button
            type="button"
            aria-label="เลือกรับกลับบ้าน"
            onClick={() => {
              setOrderType("takeaway");
              setShowTypeError(false);
            }}
            className="rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-95 bg-white border shadow-xs"
            style={{
              background: orderType === "takeaway" ? BRAND : "white",
              color: orderType === "takeaway" ? GOLD : BRAND,
              borderColor: orderType === "takeaway" ? BRAND : "#ece4d6",
              boxShadow: orderType === "takeaway" ? "0 6px 20px rgba(0,46,71,0.22)" : "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl transition-colors" style={{ background: orderType === "takeaway" ? "rgba(252,193,74,0.18)" : LINEN, color: orderType === "takeaway" ? GOLD : BRAND }}>
              <ShoppingBag size={17} />
            </div>
            <div className="font-bold text-[12px]">{t("รับกลับบ้าน")}</div>
          </button>

          <button
            type="button"
            aria-label="เลือกจัดส่งถึงที่"
            onClick={() => {
              setOrderType("delivery");
              setShowTypeError(false);
            }}
            className="rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-95 bg-white border shadow-xs"
            style={{
              background: orderType === "delivery" ? BRAND : "white",
              color: orderType === "delivery" ? GOLD : BRAND,
              borderColor: orderType === "delivery" ? BRAND : "#ece4d6",
              boxShadow: orderType === "delivery" ? "0 6px 20px rgba(0,46,71,0.22)" : "0 2px 8px rgba(0,0,0,0.03)",
            }}
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl transition-colors" style={{ background: orderType === "delivery" ? "rgba(252,193,74,0.18)" : LINEN, color: orderType === "delivery" ? GOLD : BRAND }}>
              <Bike size={17} />
            </div>
            <div className="font-bold text-[12px]">{t("จัดส่งถึงที่")}</div>
          </button>
        </div>
      </div>

      {/* Conditional input for order type */}
      {orderType !== null && (
        <div className="px-5 md:px-12 mt-6 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={orderType}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="w-full bg-white rounded-2xl px-4 py-4 shadow-xs border border-[#ece4d6]"
            >
              {orderType === "delivery" && (
                <DeliveryBlock
                  onOpenMenu={onOpenMenu}
                  address={address}
                  setAddress={setAddress}
                  addressType={addressType}
                  setAddressType={setAddressType}
                  deliveryMethod={deliveryMethod}
                  setDeliveryMethod={setDeliveryMethod}
                  showAddressError={showAddressError}
                  setShowAddressError={setShowAddressError}
                />
              )}
              {orderType === "dine-in" && (
                <DineInBlock selectedTable={selectedTable} onOpenPicker={onOpenTablePicker} />
              )}
              {orderType === "takeaway" && (
                <div className="space-y-3 p-1">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl shrink-0 mt-0.5" style={{ background: "rgba(0,46,71,0.06)", color: BRAND }}>
                      <ShoppingBag size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-[#002e47] flex items-center gap-1.5">
                        {t("รับกลับบ้าน")} (Take Away)
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                        {t("ร้านจะจัดเตรียมแพ็กอาหารใส่กล่องให้อย่างดี คุณสามารถมารับอาหารได้ที่เคาน์เตอร์ร้านเมื่อสถานะเปลี่ยนเป็น")}
                        <strong className="text-[#059669] font-bold mx-1">"{t("พร้อมเสิร์ฟ")}"</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2.5 pt-2.5 border-t border-[#ece4d6]/60">
                    <button
                      type="button"
                      aria-label={t("ไม่ยอมรับ")}
                      onClick={() => setOrderType(null)}
                      className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer border border-slate-200"
                    >
                      {t("ไม่ยอมรับ")}
                    </button>
                    <button
                      type="button"
                      aria-label={t("ยอมรับ")}
                      onClick={onOpenMenu}
                      className="inline-flex items-center gap-1 px-5 py-2 rounded-full text-xs font-bold shadow-xs hover:shadow-sm transition-all duration-200 active:scale-95 cursor-pointer"
                      style={{ background: BRAND, color: GOLD }}
                    >
                      <span>{t("ยอมรับ")}</span>
                      <ChevronRight size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Unified Gacha & Mini-Games Arcade Banner */}
      {(onOpenGacha || onOpenMiniGames) && (
        <div className="px-5 md:px-12 mt-6 max-w-7xl mx-auto w-full">
          <div
            className="w-full relative rounded-3xl p-5 sm:p-6 bg-white shadow-xs overflow-hidden border border-[#ece4d6] transition-all"
          >
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              {/* Left Info Area */}
              <div className="flex items-start sm:items-center gap-4">
                <div
                  className="h-14 w-14 rounded-2xl flex items-center justify-center font-black shadow-xs shrink-0 text-2xl"
                  style={{
                    background: "rgba(0, 46, 71, 0.06)",
                    color: BRAND,
                    border: "1px solid #ece4d6",
                  }}
                >
                  <ThumbsUp size={26} className="stroke-[2.2]" style={{ color: BRAND }} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider"
                      style={{
                        background: "rgba(0, 46, 71, 0.07)",
                        color: BRAND,
                        border: "1px solid rgba(0, 46, 71, 0.12)",
                      }}
                    >
                      {t("ตู้คำอธิษฐาน & มินิเกม DineOS")}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(252, 193, 74, 0.25)",
                        color: "#92400e",
                        border: "1px solid rgba(252, 193, 74, 0.5)",
                      }}
                    >
                      {t("สุ่มฟรีประจำวัน & เล่นเกมได้ตั๋ว!")} 🎫
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black leading-tight" style={{ color: BRAND }}>
                    {t("ตู้คำอธิษฐาน, สมุดสะสมการ์ด & 3 มินิเกม DineOS")}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal mt-1 max-w-2xl leading-relaxed">
                    {t("ลุ้นรับคูปองส่วนลด 50%, การ์ดระดับตำนาน UR และเล่นเกมศึก 8-Bit Dragon Quest, DineOS ควงกระทะ & วงล้อเสี่ยงทายดวงชะตา")}
                  </p>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 self-stretch sm:self-auto">
                {onOpenGacha && (
                  <button
                    type="button"
                    onClick={onOpenGacha}
                    className="flex-1 sm:flex-none px-4 py-3 rounded-2xl font-black text-xs shadow-md shadow-amber-500/15 hover:shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-amber-400/40"
                    style={{
                      background: GOLD,
                      color: BRAND,
                    }}
                  >
                    <Sparkles size={15} />
                    <span>{t("หมุนกาชา (Wish)")}</span>
                  </button>
                )}

                {onOpenMiniGames && (
                  <button
                    type="button"
                    onClick={onOpenMiniGames}
                    className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-[#002e47]/5 hover:bg-[#002e47]/10 text-[#002e47] font-black text-xs border border-[#002e47]/15 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Gamepad2 size={15} />
                    <span>{t("เล่นมินิเกม (Games)")}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu list (horizontal slider) */}
      <div className="px-5 md:px-12 mt-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold" style={{ color: BRAND }}>
            {t("เมนูแนะนำ")}
          </h2>

          <div className="flex items-center gap-2">
            {onOpenRandomModal && (
              <button
                type="button"
                aria-label="สุ่มเมนูว่าจะกินอะไรดี"
                title="สุ่มเมนูว่าจะกินอะไรดี"
                onClick={onOpenRandomModal}
                className="grid h-8 w-8 place-items-center rounded-full text-[#002e47] bg-[#fcc14a]/30 hover:bg-[#fcc14a]/45 active:scale-95 border border-[#fcc14a]/60 transition-all duration-200 cursor-pointer shadow-xs"
              >
                <Dices size={16} className="text-[#002e47]" />
              </button>
            )}

            <button
              type="button"
              aria-label={t("เมนูทั้งหมด")}
              onClick={onOpenMenu}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002e47] bg-[#fcc14a]/20 hover:bg-[#fcc14a]/30 active:scale-95 px-3.5 py-1.5 rounded-full border border-[#fcc14a]/50 transition-all duration-200 cursor-pointer shadow-xs"
            >
              <Utensils size={13} className="text-[#002e47]" />
              <span>{t("เมนูทั้งหมด")}</span>
              <ChevronRight size={14} className="text-[#002e47]" />
            </button>
          </div>
        </div>
        <div className="relative">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
            className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#002e47] border border-[#ece4d6] hover:bg-[#002e47] hover:text-[#fcc14a] transition-all shadow-md active:scale-90 cursor-pointer"
            aria-label={t("เลื่อนซ้าย")}
          >
            <ChevronLeft size={20} />
          </button>
          <div
            ref={scrollRef}
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
            onTouchStart={() => { isHoveredRef.current = true; }}
            onTouchEnd={() => {
              setTimeout(() => {
                isHoveredRef.current = false;
              }, 2000);
            }}
            className="-mx-5 px-10 overflow-x-auto no-scrollbar"
          >
            <div className="flex gap-4">
              {menuItems
                .filter((m) => m.isAvailable !== false && m.category !== "drinks" && m.category !== "dessert")
                .map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => {
                    if (!orderType) {
                      setShowTypeError(true);
                      orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
                      return;
                    }
                    if (orderType === "dine-in" && !selectedTable) {
                      onOpenTablePicker();
                      return;
                    }
                    if (orderType === "delivery" && (!address || !address.trim() || !deliveryMethod)) {
                      setShowAddressError(true);
                      orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
                      return;
                    }
                    onPickItem(m);
                  }}
                  className="group bg-white rounded-2xl p-3.5 shadow-xs border border-[#ece4d6]/80 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md min-w-[220px] w-56 shrink-0 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-36 w-full overflow-hidden rounded-xl mb-3">
                      <img src={encodeURI(String(m.image))} alt={tMenu(m.name, "name")} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      {(m.category === "signature" || (Array.isArray(m.tags) && m.tags.some((t) => t.toLowerCase() === "signature" || t === "แนะนำ" || t === "ยอดนิยม"))) && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#002e47]/85 text-[#fcc14a] backdrop-blur-md border border-[#fcc14a]/30">
                          Signature
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider" style={{ color: GOLD }}>
                        <Star size={10} fill={GOLD} stroke={GOLD} />
                        <span style={{ color: INK_MUTED }}>{language === "th" ? "Chef's pick" : language === "zh" ? "厨师推荐" : "Chef's pick"}</span>
                      </div>
                      <h3 className="font-bold text-[15px] truncate mt-1 group-hover:text-[#002e47] transition-colors" style={{ color: BRAND }}>
                        {tMenu(m.name, "name")}
                      </h3>
                      <p className="text-xs mt-1 line-clamp-2 font-light" style={{ color: INK_MUTED }}>
                        {tMenu(m.desc, "desc")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3.5 flex items-end justify-between pt-2 border-t border-slate-100">
                    <span className="font-extrabold text-base" style={{ color: BRAND }}>
                      ฿{m.price}
                    </span>
                    <button
                      type="button"
                      aria-label={`หยิบ ${tMenu(m.name, "name")} ใส่ตะกร้า`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!orderType) {
                          setShowTypeError(true);
                          orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
                          return;
                        }
                        if (orderType === "dine-in" && !selectedTable) {
                          onOpenTablePicker();
                          return;
                        }
                        if (orderType === "delivery" && (!address || !address.trim() || !deliveryMethod)) {
                          setShowAddressError(true);
                          orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
                          return;
                        }
                        onPickItem(m);
                      }}
                      className="grid h-9 w-9 place-items-center rounded-full shadow-xs cursor-pointer transition-transform duration-200 active:scale-90 hover:scale-105"
                      style={{ background: BRAND, color: GOLD }}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
            className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[#002e47] border border-[#ece4d6] hover:bg-[#002e47] hover:text-[#fcc14a] transition-all shadow-md active:scale-90 cursor-pointer"
            aria-label={t("เลื่อนขวา")}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
