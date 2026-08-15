import { useState } from "react";
import { MapPin, Home as HomeIcon, User } from "lucide-react";
import { useLanguage } from "../../../lib/i18n";
import { BRAND, GOLD, INK_MUTED, LINEN } from "../constants/colors";

export function DeliveryBlock({
  onOpenMenu,
  address,
  setAddress,
  addressType,
  setAddressType,
  deliveryMethod,
  setDeliveryMethod,
  showAddressError,
  setShowAddressError,
}: {
  onOpenMenu: () => void;
  address: string;
  setAddress: (val: string) => void;
  addressType: "home" | "work" | "dorm";
  setAddressType: (val: "home" | "work" | "dorm") => void;
  deliveryMethod: "leave" | "pickup" | null;
  setDeliveryMethod: (val: "leave" | "pickup" | null) => void;
  showAddressError: boolean;
  setShowAddressError: (val: boolean) => void;
}) {
  const { t } = useLanguage();
  const [touched, setTouched] = useState(false);

  const DELIVERY_METHODS = [
    {
      id: "leave" as const,
      label: t("วางไว้ที่หน้าประตู"),
      sublabel: t("เราวางอาหารไว้ให้"),
      icon: <HomeIcon size={20} />,
    },
    {
      id: "pickup" as const,
      label: t("ลงมารับเอง"),
      sublabel: t("รับที่จุดรับอาหาร"),
      icon: <User size={20} />,
    },
  ];

  const handleAddressChange = (val: string) => {
    setAddress(val);
    setTouched(true);
    if (val.trim().length > 0) {
      setShowAddressError(false);
    }
  };

  const handleDeliveryMethodChange = (method: "leave" | "pickup") => {
    setDeliveryMethod(method);
    if (!address.trim()) {
      setShowAddressError(true);
      const el = document.getElementById("delivery-address");
      if (el) el.focus();
      return;
    }
    setShowAddressError(false);
    onOpenMenu();
  };

  return (
    <div className="space-y-4">
      {/* Address */}
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full shrink-0" style={{ background: LINEN, color: BRAND }}>
          <MapPin size={18} />
        </div>
        <div className="flex-1">
          <label htmlFor="delivery-address" className="text-[10px] uppercase tracking-[0.12em] mb-1 block font-semibold" style={{ color: INK_MUTED }}>
            {t("ที่อยู่จัดส่ง")}
          </label>
          <input
            id="delivery-address"
            name="delivery-address"
            aria-label={t("ที่อยู่จัดส่ง")}
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder={t("กรอกที่อยู่ เช่น ถนนสุขุมวิท 31")}
            className="w-full rounded-xl border px-3 py-2.5 text-sm transition"
            style={{
              borderColor: showAddressError || (touched && !address.trim()) ? "#ef4444" : address.trim() ? "#16a34a" : "#ece4d6",
              outline: "none",
            }}
          />
          {(showAddressError || (touched && !address.trim())) && (
            <p className="mt-1 text-[11px] text-red-500 font-medium">{t("กรุณากรอกที่อยู่ให้ครบถ้วน")}</p>
          )}
          <div className="mt-2.5 flex gap-2">
            {(["home", "work", "dorm"] as const).map((id) => {
              const labels = { home: t("บ้าน"), work: t("ที่ทำงาน"), dorm: t("หอพัก") };
              return (
                <button
                  key={id}
                  type="button"
                  aria-label={`${t("ประเภทที่อยู่")} ${labels[id]}`}
                  onClick={() => setAddressType(id)}
                  className="px-3.5 py-1.5 rounded-full border text-xs font-semibold transition active:scale-95 cursor-pointer shadow-xs"
                  style={{
                    borderColor: addressType === id ? BRAND : "#ece4d6",
                    background: addressType === id ? BRAND : "white",
                    color: addressType === id ? GOLD : BRAND,
                  }}
                >
                  {labels[id]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Delivery method */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.12em] mb-2 font-semibold" style={{ color: INK_MUTED }}>
          {t("รูปแบบการรับอาหาร")}
        </p>
        {showAddressError && !deliveryMethod && (
          <p className="text-xs text-red-500 font-semibold mb-2">{t("* กรุณาเลือกรูปแบบการรับอาหาร")}</p>
        )}
        <div className="grid grid-cols-2 gap-2.5" style={{ border: showAddressError && !deliveryMethod ? "1px solid #ef4444" : "none", padding: showAddressError && !deliveryMethod ? "4px" : "0px", borderRadius: "14px" }}>
          {DELIVERY_METHODS.map((m) => {
            const active = deliveryMethod === m.id;
            return (
              <button
                key={m.id}
                type="button"
                aria-label={`${t("รูปแบบการรับอาหาร")} ${m.label}`}
                onClick={() => handleDeliveryMethodChange(m.id)}
                className="flex flex-col items-start gap-1.5 rounded-2xl border-2 p-3 text-left transition-all duration-200 active:scale-95 cursor-pointer shadow-xs hover:shadow-sm"
                style={{
                  borderColor: active ? BRAND : "#ece4d6",
                  background: active ? "#f0f6fa" : "white",
                }}
              >
                <div
                  className="grid h-9 w-9 place-items-center rounded-xl transition-colors"
                  style={{ background: active ? BRAND : LINEN, color: active ? GOLD : BRAND }}
                >
                  {m.icon}
                </div>
                <span className="text-xs font-bold leading-tight" style={{ color: BRAND }}>{m.label}</span>
                <span className="text-[10px] line-clamp-1" style={{ color: INK_MUTED }}>{m.sublabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
