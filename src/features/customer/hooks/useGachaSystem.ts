import { useState, useEffect, useCallback, useMemo } from "react";
import type {
  GachaBannerType,
  GachaPullResult,
  GachaRarity,
  GachaState,
  CollectibleCard,
  CouponReward,
} from "../types/gacha";
import { GACHA_CARDS, GACHA_COUPONS, GACHA_SETS, GACHA_RATES } from "../constants/gachaData";

const STORAGE_KEY_GACHA = "ran-lung-get-gacha-state";
const STORAGE_KEY_COUPONS = "ran-lung-get-my-coupons";

const INITIAL_STATE: GachaState = {
  tickets: 10,
  pityCountSR: 0,
  pityCountSSR: 0,
  totalPulls: 0,
  lastFreePullDate: null,
  history: [],
  cards: {},
  coupons: [],
  claimedSetIds: [],
};

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function useGachaSystem() {
  const [state, setState] = useState<GachaState>(() => {
    if (typeof window === "undefined") return INITIAL_STATE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GACHA);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_STATE, ...parsed };
      }
    } catch {
      // fallback
    }
    return INITIAL_STATE;
  });

  // Sync state to LocalStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY_GACHA, JSON.stringify(state));
      // Also sync active coupons to CartDrawer wallet
      localStorage.setItem(STORAGE_KEY_COUPONS, JSON.stringify(state.coupons));
    } catch {
      // ignore
    }
  }, [state]);

  // Check if daily free pull is available
  const hasDailyFree = useMemo(() => {
    const today = getTodayString();
    return state.lastFreePullDate !== today;
  }, [state.lastFreePullDate]);

  // Add Free Tickets
  const addTickets = useCallback((amount = 10) => {
    setState((prev) => ({
      ...prev,
      tickets: prev.tickets + amount,
    }));
  }, []);

  // RNG Pull Engine
  const performPulls = useCallback(
    (
      bannerType: GachaBannerType,
      pullCount: 1 | 10,
      isFree = false
    ): { results: GachaPullResult[]; highestRarity: GachaRarity } => {
      let currentTickets = state.tickets;
      let pitySR = state.pityCountSR;
      let pitySSR = state.pityCountSSR;
      let total = state.totalPulls;
      const today = getTodayString();

      // Deduct cost
      if (isFree) {
        // Free pull
      } else {
        if (currentTickets < pullCount) {
          throw new Error("ตั๋วคำอธิษฐานไม่เพียงพอ");
        }
        currentTickets -= pullCount;
      }

      const results: GachaPullResult[] = [];
      let highestRarity: GachaRarity = 3;

      const updatedCards = { ...state.cards };
      const updatedCoupons = [...state.coupons];

      for (let i = 0; i < pullCount; i++) {
        pitySR++;
        pitySSR++;
        total++;

        // Determine Rarity
        let rarity: GachaRarity = 3;

        // SSR Pity check
        if (pitySSR >= 50) {
          // Guaranteed 5★ or 6★
          rarity = Math.random() < 0.2 ? 6 : 5;
        } else if (pitySR >= 10 && i === pullCount - 1) {
          // Guaranteed 4★+ on 10th pull
          const roll = Math.random();
          if (roll < GACHA_RATES.UR) rarity = 6;
          else if (roll < GACHA_RATES.UR + GACHA_RATES.SSR) rarity = 5;
          else rarity = 4;
        } else {
          // Soft pity ramp-up if pitySSR > 35
          let ssrRate = GACHA_RATES.SSR;
          if (pitySSR > 35) {
            ssrRate += (pitySSR - 35) * 0.04;
          }

          const roll = Math.random();
          if (roll < GACHA_RATES.UR) {
            rarity = 6;
          } else if (roll < GACHA_RATES.UR + ssrRate) {
            rarity = 5;
          } else if (roll < GACHA_RATES.UR + ssrRate + GACHA_RATES.SR) {
            rarity = 4;
          } else {
            rarity = 3;
          }
        }

        // Reset Pity counters
        if (rarity === 6 || rarity === 5) {
          pitySSR = 0;
          pitySR = 0;
        } else if (rarity === 4) {
          pitySR = 0;
        }

        if (rarity > highestRarity) {
          highestRarity = rarity;
        }

        // Select Item from pool
        const nowIso = new Date().toISOString();

        if (bannerType === "card") {
          const pool = GACHA_CARDS.filter((c) => c.rarity === rarity);
          const selectedCard = pool[Math.floor(Math.random() * pool.length)] || GACHA_CARDS[0];

          const isNew = !updatedCards[selectedCard.id];
          const prevCount = updatedCards[selectedCard.id]?.count || 0;

          updatedCards[selectedCard.id] = {
            count: prevCount + 1,
            firstObtainedAt: updatedCards[selectedCard.id]?.firstObtainedAt || nowIso,
            lastObtainedAt: nowIso,
          };

          results.push({
            id: `pull_${Date.now()}_${i}`,
            pulledAt: nowIso,
            bannerType: "card",
            rarity,
            itemType: "card",
            cardData: selectedCard,
            isNew,
            duplicateCount: prevCount + 1,
          });
        } else {
          // Coupon Banner
          const pool = GACHA_COUPONS.filter((c) => c.rarity === rarity);
          const selectedCoupon = pool[Math.floor(Math.random() * pool.length)] || GACHA_COUPONS[0];

          const uniqueCoupon: CouponReward = {
            ...selectedCoupon,
            id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          };

          updatedCoupons.push(uniqueCoupon);

          results.push({
            id: `pull_${Date.now()}_${i}`,
            pulledAt: nowIso,
            bannerType: "coupon",
            rarity,
            itemType: "coupon",
            couponData: uniqueCoupon,
          });
        }
      }

      // Update State
      setState((prev) => ({
        ...prev,
        tickets: currentTickets,
        pityCountSR: pitySR,
        pityCountSSR: pitySSR,
        totalPulls: total,
        lastFreePullDate: isFree ? today : prev.lastFreePullDate,
        cards: updatedCards,
        coupons: updatedCoupons,
        history: [...results, ...prev.history].slice(0, 100), // Keep last 100 pulls
      }));

      return { results, highestRarity };
    },
    [state]
  );

  // Claim Set Reward
  const claimSetReward = useCallback(
    (setId: string) => {
      const targetSet = GACHA_SETS.find((s) => s.id === setId);
      if (!targetSet) return false;
      if (state.claimedSetIds.includes(setId)) return false;

      // Check if all cards are collected
      const hasAll = targetSet.requiredCardIds.every((cardId) => !!state.cards[cardId]);
      if (!hasAll) return false;

      setState((prev) => {
        const nextClaimed = [...prev.claimedSetIds, setId];
        let nextTickets = prev.tickets;
        let nextCoupons = [...prev.coupons];

        if (targetSet.rewardTickets) {
          nextTickets += targetSet.rewardTickets;
        }
        if (targetSet.rewardCoupon) {
          nextCoupons.push({
            ...targetSet.rewardCoupon,
            id: `set_reward_${Date.now()}_${targetSet.id}`,
          });
        }

        return {
          ...prev,
          tickets: nextTickets,
          coupons: nextCoupons,
          claimedSetIds: nextClaimed,
        };
      });

      return true;
    },
    [state.claimedSetIds, state.cards]
  );

  // Add coupon directly (e.g. from Fortune Wheel / Mini-games)
  const addCoupon = useCallback((coupon: CouponReward) => {
    setState((prev) => {
      const uniqueCoupon: CouponReward = {
        ...coupon,
        id: `${coupon.id}-${Date.now()}`,
      };
      return {
        ...prev,
        coupons: [uniqueCoupon, ...prev.coupons],
      };
    });
  }, []);

  // Remove / delete single coupon
  const removeCoupon = useCallback((couponId: string) => {
    setState((prev) => ({
      ...prev,
      coupons: prev.coupons.filter((c) => c.id !== couponId),
    }));
  }, []);

  // Recycle single coupon into Gacha tickets based on rarity
  const recycleCoupon = useCallback((coupon: CouponReward): number => {
    const ticketValue = getCouponRecycleTicketValue(coupon.rarity || 3);
    setState((prev) => ({
      ...prev,
      tickets: prev.tickets + ticketValue,
      coupons: prev.coupons.filter((c) => c.id !== coupon.id),
    }));
    return ticketValue;
  }, []);

  // Recycle multiple or all coupons into Gacha tickets
  const recycleAllCoupons = useCallback((couponIds?: string[]): number => {
    let targetCoupons = state.coupons;
    if (couponIds && couponIds.length > 0) {
      targetCoupons = state.coupons.filter((c) => couponIds.includes(c.id));
    }
    if (targetCoupons.length === 0) return 0;

    const totalTickets = targetCoupons.reduce(
      (sum, c) => sum + getCouponRecycleTicketValue(c.rarity || 3),
      0
    );

    const idsToRemove = new Set(targetCoupons.map((c) => c.id));
    setState((prev) => ({
      ...prev,
      tickets: prev.tickets + totalTickets,
      coupons: prev.coupons.filter((c) => !idsToRemove.has(c.id)),
    }));
    return totalTickets;
  }, [state.coupons]);

  // Clear all coupons from wallet
  const clearAllCoupons = useCallback((couponIds?: string[]) => {
    if (couponIds && couponIds.length > 0) {
      const idsToRemove = new Set(couponIds);
      setState((prev) => ({
        ...prev,
        coupons: prev.coupons.filter((c) => !idsToRemove.has(c.id)),
      }));
    } else {
      setState((prev) => ({
        ...prev,
        coupons: [],
      }));
    }
  }, []);

  return {
    state,
    hasDailyFree,
    addTickets,
    addCoupon,
    performPulls,
    claimSetReward,
    removeCoupon,
    recycleCoupon,
    recycleAllCoupons,
    clearAllCoupons,
  };
}

export function getCouponRecycleTicketValue(rarity: GachaRarity): number {
  switch (rarity) {
    case 6:
      return 6; // UR -> 6 Tickets
    case 5:
      return 3; // SSR -> 3 Tickets
    case 4:
      return 2; // SR -> 2 Tickets
    case 3:
    default:
      return 1; // R -> 1 Ticket
  }
}
