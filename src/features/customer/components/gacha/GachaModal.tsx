import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Ticket, Gamepad2, Sparkles } from "lucide-react";
import type {
  GachaBannerType,
  GachaPullResult,
  GachaRarity,
  CouponReward,
} from "../../types/gacha";
import { useLanguage } from "../../../../lib/i18n";
import { useGachaSystem } from "../../hooks/useGachaSystem";
import { GachaBannerCard } from "./GachaBannerCard";
import { CardAlbumView } from "./CardAlbumView";
import { CouponWalletView } from "./CouponWalletView";
import { GachaHistoryView } from "./GachaHistoryView";
import { GachaRatesModal } from "./GachaRatesModal";
import { GachaCinematic } from "./GachaCinematic";
import { playClaimReward } from "../../utils/gachaAudio";
import { WokMasterGame, UncleGetRpgGame, BanditShooterGame } from "../minigames";

export function GachaModal({
  isOpen,
  onClose,
  onApplyCoupon,
  initialTab = "wish",
  onSelectDish,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon?: (coupon: CouponReward) => void;
  initialTab?: "wish" | "games" | "album" | "wallet" | "history";
  onSelectDish?: (dishName: string) => void;
}) {
  const { t } = useLanguage();
  const {
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
  } = useGachaSystem();

  const [activeTab, setActiveTab] = useState<"wish" | "games" | "album" | "wallet" | "history">(
    initialTab
  );
  const [activeMiniGame, setActiveMiniGame] = useState<"rpg" | "wok" | "shooter">("shooter");
  const [activeBanner, setActiveBanner] = useState<GachaBannerType>("coupon");
  const [showRatesModal, setShowRatesModal] = useState(false);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Cinematic State
  const [cinematicData, setCinematicData] = useState<{
    results: GachaPullResult[];
    highestRarity: GachaRarity;
    lastCount: 1 | 10;
    lastBanner: GachaBannerType;
  } | null>(null);

  const [ticketToast, setTicketToast] = useState(false);

  const handleAddFreeTickets = () => {
    addTickets(10);
    playClaimReward();
    setTicketToast(true);
    setTimeout(() => setTicketToast(false), 2500);
  };

  const handlePull = useCallback(
    (count: 1 | 10, isFree = false) => {
      try {
        const { results, highestRarity } = performPulls(activeBanner, count, isFree);
        setCinematicData({
          results,
          highestRarity,
          lastCount: count,
          lastBanner: activeBanner,
        });
      } catch (err: any) {
        alert(err.message || "เกิดข้อผิดพลาดในการสุ่ม");
      }
    },
    [activeBanner, performPulls]
  );

  const handleWishAgain = useCallback(() => {
    if (!cinematicData) return;
    const { lastCount, lastBanner } = cinematicData;
    if (state.tickets < lastCount) return;
    try {
      const { results, highestRarity } = performPulls(lastBanner, lastCount, false);
      setCinematicData({
        results,
        highestRarity,
        lastCount,
        lastBanner,
      });
    } catch {
      // ignore
    }
  }, [cinematicData, performPulls, state.tickets]);

  if (!isOpen) return null;

  const totalCardsUnlocked = Object.keys(state.cards).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 select-none">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-lg"
      />

      {/* Main Gacha Hub Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-5xl h-[92vh] max-h-[850px] rounded-3xl border border-white/15 bg-slate-950 text-white shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-900/60 backdrop-blur-md">
          {/* Title */}
          <div>
            <h2 className="text-base font-black leading-tight flex items-center gap-1.5">
              <span>{t("ตู้คำอธิษฐาน & สะสมการ์ด DineOS")}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                GACHA & CARDS
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-light">
              {t("สุ่มคูปองส่วนลด 50% & สะสมการ์ดเมนูในตำนาน")}
            </p>
          </div>

          {/* Ticket Balance & Add Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <Ticket size={16} className="text-amber-400" />
              <span className="text-xs font-black text-white">{state.tickets}</span>
              <span className="text-[10px] text-slate-400">{t("ใบ")}</span>
              <button
                type="button"
                onClick={handleAddFreeTickets}
                title={t("+ รับตั๋วฟรี 10 ใบ")}
                className="ml-1 h-5 px-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-extrabold flex items-center active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                <span>{t("ฟรี 10")}</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Ticket Toast Notification */}
        <AnimatePresence>
          {ticketToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-1.5"
            >
              <Ticket size={14} />
              <span>{t("ได้รับตั๋วอธิษฐานฟรี +10 ใบ เรียบร้อยแล้ว! 🎫")}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/40 border-b border-white/10 overflow-x-auto no-scrollbar">
          {[
            { id: "wish", label: t("ตู้คำอธิษฐาน") },
            {
              id: "games",
              label: t("🎮 มินิเกม"),
              badge: "ฟรีตั๋ว",
            },
            {
              id: "album",
              label: t("สมุดสะสมการ์ด"),
              badge: `${totalCardsUnlocked}/13`,
            },
            {
              id: "wallet",
              label: t("กระเป๋าคูปอง"),
              badge: state.coupons.length > 0 ? String(state.coupons.length) : undefined,
            },
            { id: "history", label: t("ประวัติการสุ่ม") },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                      isActive
                        ? "bg-slate-950 text-amber-300"
                        : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5">
          {activeTab === "wish" && (
            <div className="space-y-4">
              {/* Banner Switcher Pills */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveBanner("coupon")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    activeBanner === "coupon"
                      ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10"
                      : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <span>{t("ตู้คูปองมหาโชค & เมนูฟรี (Coupon Banner)")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveBanner("card")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    activeBanner === "card"
                      ? "bg-purple-500/20 border-purple-400 text-purple-300 shadow-md shadow-purple-500/10"
                      : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <span>{t("ตู้การ์ดเชฟ & เมนูในตำนาน (Cards Banner)")}</span>
                </button>
              </div>

              {/* Banner Display */}
              <GachaBannerCard
                bannerType={activeBanner}
                hasDailyFree={hasDailyFree}
                tickets={state.tickets}
                pitySR={state.pityCountSR}
                pitySSR={state.pityCountSSR}
                onPull={handlePull}
                onOpenRates={() => setShowRatesModal(true)}
              />
            </div>
          )}

          {activeTab === "games" && (
            <div className="space-y-3">
              {/* Mini Games Selector Sub-tabs */}
              <div className="grid grid-cols-3 gap-1.5 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                {[
                  {
                    id: "shooter",
                    label: t("ดวล 8-Bit ยิงโจร"),
                    emoji: "🤠",
                    color: "from-amber-600 to-red-600",
                  },
                  {
                    id: "rpg",
                    label: t("ศึก 8-Bit Dragon Quest"),
                    emoji: "⚔️",
                    color: "from-blue-600 to-indigo-600",
                  },
                  {
                    id: "wok",
                    label: t("DineOS ควงกระทะ"),
                    emoji: "🍳",
                    color: "from-amber-500 to-red-500",
                  },
                ].map((gm) => (
                  <button
                    key={gm.id}
                    type="button"
                    onClick={() => setActiveMiniGame(gm.id as any)}
                    className={`py-2 px-1 rounded-xl text-xs font-black transition flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
                      activeMiniGame === gm.id
                        ? `bg-linear-to-r ${gm.color} text-white shadow-lg`
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-sm sm:text-base">{gm.emoji}</span>
                    <span className="truncate">{gm.label}</span>
                  </button>
                ))}
              </div>

              {/* Game Screen Area */}
              {activeMiniGame === "shooter" && (
                <BanditShooterGame
                  onAwardTickets={(amount) => {
                    addTickets(amount);
                    setTicketToast(true);
                    setTimeout(() => setTicketToast(false), 2500);
                  }}
                  onAwardCoupon={(coupon) => {
                    addCoupon(coupon);
                  }}
                  onClose={onClose}
                  onSelectDish={onSelectDish}
                />
              )}
              {activeMiniGame === "rpg" && (
                <UncleGetRpgGame
                  onAwardTickets={(amount) => {
                    addTickets(amount);
                    setTicketToast(true);
                    setTimeout(() => setTicketToast(false), 2500);
                  }}
                  onClose={onClose}
                />
              )}
              {activeMiniGame === "wok" && (
                <WokMasterGame
                  onAwardTickets={(amount) => {
                    addTickets(amount);
                    setTicketToast(true);
                    setTimeout(() => setTicketToast(false), 2500);
                  }}
                  onClose={onClose}
                />
              )}
            </div>
          )}

          {activeTab === "album" && (
            <CardAlbumView
              userCards={state.cards}
              claimedSetIds={state.claimedSetIds}
              onClaimSet={claimSetReward}
            />
          )}

          {activeTab === "wallet" && (
            <CouponWalletView
              coupons={state.coupons}
              onUseCoupon={(coupon) => {
                if (onApplyCoupon) {
                  onApplyCoupon(coupon);
                }
                onClose();
              }}
              onOpenGacha={() => setActiveTab("wish")}
              onDeleteCoupon={removeCoupon}
              onRecycleCoupon={recycleCoupon}
              onClearAllCoupons={clearAllCoupons}
              onRecycleAllCoupons={recycleAllCoupons}
            />
          )}

          {activeTab === "history" && <GachaHistoryView history={state.history} />}
        </div>
      </motion.div>

      {/* Cinematic Wishing Cutscene Overlay */}
      <AnimatePresence>
        {cinematicData && (
          <GachaCinematic
            results={cinematicData.results}
            highestRarity={cinematicData.highestRarity}
            onClose={() => setCinematicData(null)}
            onWishAgain={handleWishAgain}
            canWishAgain={state.tickets >= cinematicData.lastCount}
            onApplyCoupon={(coupon) => {
              if (onApplyCoupon) {
                onApplyCoupon(coupon);
              }
              setCinematicData(null);
              onClose();
            }}
          />
        )}
      </AnimatePresence>

      {/* Rates & Pity Modal Overlay */}
      <AnimatePresence>
        {showRatesModal && (
          <GachaRatesModal onClose={() => setShowRatesModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
