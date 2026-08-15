export type GachaRarity = 3 | 4 | 5 | 6; // 3: R (Blue), 4: SR (Purple), 5: SSR (Gold), 6: UR (Prism Rainbow)

export type GachaBannerType = "coupon" | "card";

export type GachaCardCategory = "character" | "signature" | "wok" | "topping" | "drink" | "secret";

export type CollectibleCard = {
  id: string;
  name: string;
  nameEn: string;
  title: string; // เช่น "ปรมาจารย์กระทะเหล็ก", "ราชาแห่งความเผ็ดร้อน"
  rarity: GachaRarity;
  category: GachaCardCategory;
  image: string;
  flavorPower: number; // พลังความอร่อย (เช่น 9,999)
  secretBuff: string; // บัฟพิเศษ เช่น "เพิ่มความหอมควันกระทะ 100%"
  lore: string; // เรื่องเล่าลับของเมนู / ตัวละคร
  flavorTags: string[];
  setId: string; // ID ของเซ็ตที่การ์ดใบนี้สังกัดอยู่
};

export type CouponReward = {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  rarity: GachaRarity;
  type: "discount_fixed" | "discount_percent" | "free_dish" | "free_addon";
  discountAmount?: number;
  discountPercent?: number;
  minSpend?: number;
  freeDishName?: string;
  freeAddonName?: string;
  code: string;
  image: string;
};

export type ActiveCoupon = CouponReward;

export type CardSet = {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  requiredCardIds: string[];
  rewardDescription: string;
  rewardType: "coupon" | "ticket" | "badge";
  rewardCoupon?: CouponReward;
  rewardTickets?: number;
  badgeTitle?: string;
};

export type GachaPullResult = {
  id: string;
  pulledAt: string;
  bannerType: GachaBannerType;
  rarity: GachaRarity;
  itemType: "card" | "coupon";
  cardData?: CollectibleCard;
  couponData?: CouponReward;
  isNew?: boolean; // ปลดล็อกครั้งแรก
  duplicateCount?: number; // จำนวนซ้ำ
};

export type GachaState = {
  tickets: number;
  pityCountSR: number; // การันตี 4★ ทุก 10 ครั้ง
  pityCountSSR: number; // การันตี 5★ ทุก 50 ครั้ง
  totalPulls: number;
  lastFreePullDate: string | null;
  history: GachaPullResult[];
  cards: Record<string, { count: number; firstObtainedAt: string; lastObtainedAt: string }>;
  coupons: CouponReward[];
  claimedSetIds: string[];
};
