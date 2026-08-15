import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Flame, Star, Gift, Check, ShieldCheck, Sparkles } from "lucide-react";
import type { CollectibleCard, GachaRarity, CardSet } from "../../types/gacha";
import { GACHA_CARDS, GACHA_SETS } from "../../constants/gachaData";
import { CardItem } from "./CardItem";
import { CardDetailModal } from "./CardDetailModal";
import { playClaimReward } from "../../utils/gachaAudio";
import { useLanguage } from "../../../../lib/i18n";

export function CardAlbumView({
  userCards,
  claimedSetIds,
  onClaimSet,
}: {
  userCards: Record<string, { count: number; firstObtainedAt: string; lastObtainedAt: string }>;
  claimedSetIds: string[];
  onClaimSet: (setId: string) => boolean;
}) {
  const { t, language } = useLanguage();
  const [selectedRarity, setSelectedRarity] = useState<"all" | GachaRarity>("all");
  const [inspectCard, setInspectCard] = useState<CollectibleCard | null>(null);
  const [claimSuccessMessage, setClaimSuccessMessage] = useState<string | null>(null);

  // Statistics
  const totalAvailable = GACHA_CARDS.length;
  const totalUnlocked = useMemo(() => {
    return GACHA_CARDS.filter((c) => !!userCards[c.id]).length;
  }, [userCards]);

  const percentage = Math.round((totalUnlocked / totalAvailable) * 100);

  const totalFlavorPower = useMemo(() => {
    return Object.entries(userCards).reduce((acc, [cardId, item]) => {
      const card = GACHA_CARDS.find((c) => c.id === cardId);
      if (!card) return acc;
      return acc + card.flavorPower * item.count;
    }, 0);
  }, [userCards]);

  // Filtered Cards
  const filteredCards = useMemo(() => {
    if (selectedRarity === "all") return GACHA_CARDS;
    return GACHA_CARDS.filter((c) => c.rarity === selectedRarity);
  }, [selectedRarity]);

  const handleClaim = (set: CardSet) => {
    const success = onClaimSet(set.id);
    if (success) {
      playClaimReward();
      setClaimSuccessMessage(
        language === "th"
          ? `ยินดีด้วย! คุณได้รับรางวัลจาก ${set.name} เรียบร้อยแล้ว 🎉`
          : language === "zh"
          ? `恭喜！您已成功领取 ${set.nameEn} 的套装奖励 🎉`
          : `Congratulations! Claimed rewards from ${set.nameEn} 🎉`
      );
      setTimeout(() => setClaimSuccessMessage(null), 3500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats Bar */}
      <div className="rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-white/10 p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-32 w-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-amber-400 uppercase flex items-center gap-1.5">
              <Award size={14} /> {t("สมุดสะสมการ์ดลุงเกตุ")} (Card Album)
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              {t("สะสมแล้ว")} {totalUnlocked} / {totalAvailable} {t("ใบ")} ({percentage}%)
            </h3>
          </div>

          {/* Flavor Power summary */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl shrink-0">
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <Flame size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">{t("พลังความอร่อยรวม")}</p>
              <p className="text-base font-black text-amber-300">
                {totalFlavorPower.toLocaleString()} PTS
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-slate-800/80 h-3 rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-linear-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full"
          />
        </div>
      </div>

      {/* Claim Success Notification Banner */}
      <AnimatePresence>
        {claimSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2"
          >
            <Sparkles size={16} />
            <span>{claimSuccessMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🏆 Card Sets & Bonus Rewards */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <ShieldCheck size={16} className="text-purple-400" />
          <span>{t("เซ็ตสะสม & รางวัลคอมโบ (Set Rewards)")}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {GACHA_SETS.map((set) => {
            const ownedCount = set.requiredCardIds.filter((cid) => !!userCards[cid]).length;
            const isCompleted = ownedCount === set.requiredCardIds.length;
            const isClaimed = claimedSetIds.includes(set.id);

            return (
              <div
                key={set.id}
                className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                  isCompleted
                    ? isClaimed
                      ? "bg-slate-900/60 border-slate-800 text-slate-400"
                      : "bg-linear-to-b from-purple-950/80 to-slate-950 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)] text-white"
                    : "bg-slate-950/50 border-white/10 text-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h5 className="font-bold text-xs leading-snug">
                      {language === "th" ? set.name : set.nameEn}
                    </h5>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                        isCompleted
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {ownedCount}/{set.requiredCardIds.length}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-light mb-3">
                    {set.description}
                  </p>

                  {/* Required Cards Mini Icons */}
                  <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                    {set.requiredCardIds.map((cid) => {
                      const cObj = GACHA_CARDS.find((c) => c.id === cid);
                      const isOwned = !!userCards[cid];
                      return (
                        <div
                          key={cid}
                          title={cObj?.name}
                          className={`h-7 w-7 rounded-lg border overflow-hidden transition-all ${
                            isOwned
                              ? "border-amber-400 opacity-100 shadow-xs"
                              : "border-slate-800 opacity-30 grayscale"
                          }`}
                        >
                          <img
                            src={cObj?.image || "/meal/krapao.jpg"}
                            alt={cObj?.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reward & Button */}
                <div className="pt-2 border-t border-white/10">
                  <p className="text-[10px] text-amber-300 font-medium mb-2">
                    {set.rewardDescription}
                  </p>

                  {isClaimed ? (
                    <button
                      type="button"
                      disabled
                      className="w-full py-2 rounded-xl bg-white/5 text-slate-500 text-xs font-semibold flex items-center justify-center gap-1 cursor-default"
                    >
                      <Check size={14} /> {t("รับรางวัลแล้ว")}
                    </button>
                  ) : isCompleted ? (
                    <button
                      type="button"
                      onClick={() => handleClaim(set)}
                      className="w-full py-2 rounded-xl bg-linear-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-extrabold shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 animate-pulse"
                    >
                      <Gift size={14} /> {t("กดรับรางวัลเซ็ต!")}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="w-full py-2 rounded-xl bg-white/5 text-slate-500 text-xs font-semibold flex items-center justify-center gap-1 cursor-default"
                    >
                      {t("สะสมอีก")} {set.requiredCardIds.length - ownedCount} {t("ใบ")}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rarity Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: "all", label: language === "th" ? "ทั้งหมด (All)" : language === "zh" ? "全部 (All)" : "All" },
          { id: 6, label: "6★ UR", color: "text-fuchsia-400 border-fuchsia-400/40" },
          { id: 5, label: "5★ SSR", color: "text-amber-400 border-amber-400/40" },
          { id: 4, label: "4★ SR", color: "text-purple-400 border-purple-400/40" },
          { id: 3, label: "3★ R", color: "text-blue-400 border-blue-400/40" },
        ].map((tab) => {
          const isActive = selectedRarity === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedRarity(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                isActive
                  ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md"
                  : "bg-slate-900/80 text-slate-400 border-white/10 hover:text-white hover:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {filteredCards.map((card) => {
          const isOwned = !!userCards[card.id];
          const count = userCards[card.id]?.count || 0;
          return (
            <CardItem
              key={card.id}
              card={card}
              isLocked={!isOwned}
              count={count}
              onClick={() => {
                if (isOwned) {
                  setInspectCard(card);
                }
              }}
            />
          );
        })}
      </div>

      {/* Inspection Modal */}
      <AnimatePresence>
        {inspectCard && (
          <CardDetailModal
            card={inspectCard}
            count={userCards[inspectCard.id]?.count || 1}
            firstObtainedAt={userCards[inspectCard.id]?.firstObtainedAt}
            onClose={() => setInspectCard(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
