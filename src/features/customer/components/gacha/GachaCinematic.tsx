import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Star,
  FastForward,
  Check,
  RotateCw,
  Award,
  Flame,
  ShoppingCart,
  ArrowRight,
  Gift,
} from "lucide-react";
import type { GachaPullResult, GachaRarity, CouponReward } from "../../types/gacha";
import { getRarityConfig, CardItem } from "./CardItem";
import { useLanguage } from "../../../../lib/i18n";
import {
  playWishLaunch,
  playMeteorStreak,
  playRevealSound,
  playCardFlip,
  playClaimReward,
} from "../../utils/gachaAudio";

function ConfettiParticles({ rarity }: { rarity: GachaRarity }) {
  const particles = useMemo(() => {
    const colors =
      rarity === 6
        ? ["#ec4899", "#a855f7", "#3b82f6", "#ffd700", "#10b981", "#ffffff"]
        : rarity === 5
        ? ["#fcc14a", "#fbbf24", "#f59e0b", "#ffffff", "#ffd700"]
        : ["#c084fc", "#a855f7", "#818cf8", "#ffffff"];

    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 450,
      y: (Math.random() - 0.7) * 500,
      scale: Math.random() * 0.8 + 0.5,
      rotate: Math.random() * 720 - 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.15,
    }));
  }, [rarity]);

  return (
    <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [1, 1, 0],
            x: p.x,
            y: p.y,
            scale: [0, p.scale, 0],
            rotate: p.rotate,
          }}
          transition={{ duration: 1.6, delay: p.delay, ease: "easeOut" }}
          className="absolute h-3.5 w-3.5 rounded-full"
          style={{ background: p.color }}
        />
      ))}
    </div>
  );
}

export function GachaCinematic({
  results,
  highestRarity,
  onClose,
  onWishAgain,
  canWishAgain,
  onApplyCoupon,
}: {
  results: GachaPullResult[];
  highestRarity: GachaRarity;
  onClose: () => void;
  onWishAgain?: () => void;
  canWishAgain?: boolean;
  onApplyCoupon?: (coupon: CouponReward) => void;
}) {
  const { t, language } = useLanguage();
  const [phase, setPhase] = useState<"meteor" | "reveal">("meteor");

  // Play Launch & Streak Audio
  useEffect(() => {
    playWishLaunch();
    const streakTimer = setTimeout(() => {
      playMeteorStreak();
    }, 600);

    const revealTimer = setTimeout(() => {
      setPhase("reveal");
      playRevealSound(highestRarity);
    }, 2800);

    return () => {
      clearTimeout(streakTimer);
      clearTimeout(revealTimer);
    };
  }, [highestRarity]);

  const handleSkip = () => {
    setPhase("reveal");
    playRevealSound(highestRarity);
  };

  const meteorConfig = useMemo(() => {
    if (highestRarity === 6) {
      return {
        tailColor: "from-pink-500 via-purple-400 to-amber-300",
        auraGlow: "rgba(236, 72, 153, 0.7)",
        trailText: language === "th" ? "UR 6★ ปาฏิหาริย์แห่งทวยเทพ!" : language === "zh" ? "UR 6★ 降世神迹！" : "UR 6★ Divine Miracle!",
        textColor: "text-fuchsia-300",
      };
    }
    if (highestRarity === 5) {
      return {
        tailColor: "from-amber-400 via-yellow-300 to-yellow-100",
        auraGlow: "rgba(251, 191, 36, 0.7)",
        trailText: language === "th" ? "SSR 5★ ทองคำเจิดจรัส!" : language === "zh" ? "SSR 5★ 金光璀璨！" : "SSR 5★ Radiant Gold!",
        textColor: "text-amber-300",
      };
    }
    if (highestRarity === 4) {
      return {
        tailColor: "from-purple-500 via-indigo-400 to-purple-200",
        auraGlow: "rgba(168, 85, 247, 0.6)",
        trailText: language === "th" ? "SR 4★ เปล่งประกายสีม่วง!" : language === "zh" ? "SR 4★ 紫气东来！" : "SR 4★ Mystic Violet!",
        textColor: "text-purple-300",
      };
    }
    return {
      tailColor: "from-blue-500 via-cyan-400 to-blue-200",
      auraGlow: "rgba(59, 130, 246, 0.5)",
      trailText: language === "th" ? "R 3★ คริสตัลสีคราม" : language === "zh" ? "R 3★ 蔚蓝流星" : "R 3★ Crystal Azure",
      textColor: "text-blue-300",
    };
  }, [highestRarity, language]);

  const isSingle = results.length === 1;

  // Coupons pulled in this session
  const pulledCoupons = useMemo(() => {
    return results
      .filter((r) => r.itemType === "coupon" && !!r.couponData)
      .map((r) => r.couponData!);
  }, [results]);

  const bestCoupon = useMemo(() => {
    if (pulledCoupons.length === 0) return null;
    return [...pulledCoupons].sort((a, b) => b.rarity - a.rarity)[0];
  }, [pulledCoupons]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-white select-none overflow-hidden">
      {/* Background Starry Nebula */}
      <div className="absolute inset-0 bg-radial from-indigo-950/60 via-slate-950 to-black pointer-events-none" />
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Skip Button */}
      {phase === "meteor" && (
        <button
          type="button"
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
        >
          <span>{t("ข้าม")}</span>
          <FastForward size={14} />
        </button>
      )}

      {/* ── PHASE 1: METEOR CUTSCENE ── */}
      <AnimatePresence>
        {phase === "meteor" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            {/* Celestial Shooting Star */}
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                initial={{ x: "-80vw", y: "-40vh", scale: 0.2, opacity: 0 }}
                animate={{
                  x: ["-80vw", "0vw", "40vw"],
                  y: ["-40vh", "0vh", "30vh"],
                  scale: [0.2, 1.4, 2],
                  opacity: [0, 1, 1],
                }}
                transition={{ duration: 2.4, ease: "easeInOut" }}
                className="absolute flex items-center justify-center"
              >
                {/* Meteor Tail */}
                <div
                  className={`h-6 w-96 rounded-full bg-linear-to-r ${meteorConfig.tailColor} blur-xs transform -rotate-25`}
                  style={{
                    boxShadow: `0 0 50px ${meteorConfig.auraGlow}, 0 0 100px ${meteorConfig.auraGlow}`,
                  }}
                />
                {/* Meteor Core Head */}
                <div
                  className="h-16 w-16 rounded-full bg-white blur-[2px] -ml-8 animate-pulse shadow-2xl"
                  style={{
                    boxShadow: `0 0 60px ${meteorConfig.auraGlow}, 0 0 120px #ffffff`,
                  }}
                />
              </motion.div>
            </div>

            {/* Bottom Glow Hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-16 text-center"
            >
              <p className={`text-sm font-black tracking-widest uppercase ${meteorConfig.textColor}`}>
                {meteorConfig.trailText}
              </p>
              <p className="text-xs text-slate-400 mt-1 font-light">
                {language === "th"
                  ? "แตะหน้าจอหรือกดข้ามเพื่อดูผลลัพธ์"
                  : language === "zh"
                  ? "点击屏幕或跳过以查看结果"
                  : "Tap screen or skip to view results"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PHASE 2: REVEAL CUTSCENE ── */}
      {phase === "reveal" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-30 w-full h-full max-h-[94vh] max-w-5xl mx-auto p-4 flex flex-col justify-between items-center"
        >
          {/* Confetti Explosion for 5★ and 6★ */}
          {highestRarity >= 5 && <ConfettiParticles rarity={highestRarity} />}

          {/* Top Title */}
          <div className="text-center pt-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1.5">
              <Sparkles size={13} /> {t("ผลการอธิษฐานคำขอพร (Wish Results)")}
            </span>
            <h3 className="text-lg md:text-xl font-black text-white mt-0.5">
              {isSingle ? t("ได้รับรางวัล 1 รายการ") : t("ได้รับรางวัล 10 รายการ")}
            </h3>
          </div>

          {/* Result Content */}
          <div className="flex-1 w-full flex items-center justify-center py-3 overflow-y-auto no-scrollbar">
            {isSingle ? (
              // ── SINGLE REVEAL SHOWCASE ──
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 260 }}
                className="w-full max-w-md flex flex-col items-center text-center"
              >
                {results[0].itemType === "card" && results[0].cardData ? (
                  <div className="w-72">
                    <CardItem
                      card={results[0].cardData}
                      size="lg"
                      showCount={false}
                    />
                    {results[0].isNew && (
                      <div className="mt-3 inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg animate-bounce">
                        <Sparkles size={14} />
                        <span>{t("ปลดล็อกการ์ดใหม่! (NEW!)")}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  // ── SINGLE COUPON SHOWCASE WITH PHOTO & "USE NOW" CHOICE ──
                  results[0].couponData && (
                    <div
                      className={`w-full rounded-3xl border-2 ${
                        getRarityConfig(results[0].rarity).borderColor
                      } bg-linear-to-b ${
                        getRarityConfig(results[0].rarity).bgGradient
                      } p-5 text-white shadow-2xl overflow-hidden relative`}
                    >
                      {/* Ambient Aura Background */}
                      <div
                        className="absolute -top-12 -right-12 h-40 w-40 rounded-full blur-2xl pointer-events-none opacity-40"
                        style={{ background: getRarityConfig(results[0].rarity).glowColor }}
                      />

                      {/* Food / Reward Artwork Image */}
                      <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden border border-white/20 mb-3.5 shadow-xl bg-slate-900">
                        <img
                          src={results[0].couponData.image || "/meal/krapao.jpg"}
                          alt={results[0].couponData.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none" />

                        {/* Rarity Pill */}
                        <span
                          className={`absolute top-3 left-3 px-3 py-1 rounded-xl text-xs font-black shadow-lg ${
                            getRarityConfig(results[0].rarity).badgeBg
                          }`}
                        >
                          {getRarityConfig(results[0].rarity).label}
                        </span>

                        {/* Promo Code Badge */}
                        <span className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-xs font-mono font-black text-amber-300 shadow-md">
                          {results[0].couponData.code}
                        </span>
                      </div>

                      {/* Title and Descriptions */}
                      <h4 className="text-xl font-black text-white leading-tight">
                        {language === "th"
                          ? results[0].couponData.name
                          : language === "zh" && results[0].couponData.nameZh
                          ? results[0].couponData.nameZh
                          : results[0].couponData.nameEn || results[0].couponData.name}
                      </h4>
                      <p className="text-sm text-amber-300 font-semibold mt-1">
                        {language === "th"
                          ? results[0].couponData.description
                          : language === "zh" && results[0].couponData.descriptionZh
                          ? results[0].couponData.descriptionZh
                          : results[0].couponData.descriptionEn || results[0].couponData.description}
                      </p>
                      {results[0].couponData.minSpend && (
                        <p className="text-xs text-slate-300 mt-1">
                          *{language === "th"
                            ? `สั่งซื้อขั้นต่ำ ฿${results[0].couponData.minSpend}`
                            : language === "zh"
                            ? `最低消费 ฿${results[0].couponData.minSpend}`
                            : `Min. spend ฿${results[0].couponData.minSpend}`}
                        </p>
                      )}

                      {/* "Would you like to use this coupon now?" Interactive Choice */}
                      <div className="mt-5 pt-4 border-t border-white/15 space-y-2.5">
                        <p className="text-xs font-black text-amber-300 flex items-center justify-center gap-1.5 animate-pulse">
                          <Gift size={15} />
                          <span>{t("ต้องการใช้คูปองนี้กับคำสั่งซื้อเลยไหม?")}</span>
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {onApplyCoupon && (
                            <button
                              type="button"
                              onClick={() => {
                                playClaimReward();
                                onApplyCoupon(results[0].couponData!);
                              }}
                              className="w-full py-3.5 px-4 rounded-2xl bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border border-emerald-300/40"
                            >
                              <ShoppingCart size={16} />
                              <span>{t("⚡ ใช้คูปองนี้เลย (สั่งอาหารทันที)")}</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              playClaimReward();
                              onClose();
                            }}
                            className="w-full py-3.5 px-4 rounded-2xl bg-white/15 hover:bg-white/25 text-slate-100 font-bold text-xs border border-white/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Check size={16} />
                            <span>{t("📥 เก็บเข้ากระเป๋าไว้ก่อน")}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </motion.div>
            ) : (
              // ── 10-PULL MULTI-GRID SHOWCASE ──
              <div className="w-full max-w-4xl flex flex-col items-center">
                {pulledCoupons.length > 0 && (
                  <div className="mb-3 px-4 py-2 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold flex items-center gap-2 text-center shadow-md">
                    <Sparkles size={15} />
                    <span>
                      {t("คุณได้รับคูปองสุดคุ้ม! สามารถกด 'ใช้เลย' เพื่อนำไปเป็นส่วนลดได้ทันที")}
                    </span>
                  </div>
                )}

                <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-3 max-h-[58vh] overflow-y-auto no-scrollbar p-1">
                  {results.map((item, idx) => {
                    const config = getRarityConfig(item.rarity);
                    return (
                      <motion.div
                        key={item.id || idx}
                        initial={{ opacity: 0, scale: 0.6, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          delay: idx * 0.06,
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        className="flex flex-col items-center"
                      >
                        {item.itemType === "card" && item.cardData ? (
                          <div className="w-full relative">
                            <CardItem card={item.cardData} size="sm" showCount={false} />
                            {item.isNew && (
                              <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded-full shadow-md">
                                NEW!
                              </span>
                            )}
                          </div>
                        ) : (
                          // Coupon Mini Card with Image & Use Now button
                          <div
                            className={`w-full rounded-2xl border ${config.borderColor} bg-linear-to-b ${config.bgGradient} p-2.5 flex flex-col justify-between text-white text-center shadow-lg relative overflow-hidden group`}
                          >
                            {/* Food Artwork Image */}
                            <div className="relative h-24 w-full rounded-xl overflow-hidden mb-1.5 border border-white/15 bg-slate-900">
                              <img
                                src={item.couponData?.image || "/meal/krapao.jpg"}
                                alt={item.couponData?.name}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <span
                                className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-black ${config.badgeBg}`}
                              >
                                {config.label}
                              </span>
                            </div>

                            <div className="my-auto px-0.5">
                              <h5 className="font-bold text-xs truncate">
                                {language === "th"
                                  ? item.couponData?.name
                                  : language === "zh" && item.couponData?.nameZh
                                  ? item.couponData?.nameZh
                                  : item.couponData?.nameEn || item.couponData?.name}
                              </h5>
                              <p className="text-[10px] text-amber-300 font-medium line-clamp-1 mt-0.5">
                                {language === "th"
                                  ? item.couponData?.description
                                  : language === "zh" && item.couponData?.descriptionZh
                                  ? item.couponData?.descriptionZh
                                  : item.couponData?.descriptionEn || item.couponData?.description}
                              </p>
                            </div>

                            {/* Direct "Use Now" action */}
                            {onApplyCoupon && item.couponData && (
                              <button
                                type="button"
                                onClick={() => {
                                  playClaimReward();
                                  onApplyCoupon(item.couponData!);
                                }}
                                className="mt-2 w-full py-1.5 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-[10px] shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1 border border-emerald-300/30"
                              >
                                <ShoppingCart size={11} />
                                <span>{t("ใช้เลย")}</span>
                              </button>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action Bottom Bar */}
          <div className="w-full pt-3 border-t border-white/10 flex flex-wrap items-center justify-center gap-3">
            {/* If 10-pull contains coupon, offer Best Coupon Apply shortcut */}
            {!isSingle && bestCoupon && onApplyCoupon && (
              <button
                type="button"
                onClick={() => {
                  playClaimReward();
                  onApplyCoupon(bestCoupon);
                }}
                className="px-6 py-3 rounded-full bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-black shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2 border border-emerald-300/40"
              >
                <ShoppingCart size={15} />
                <span>
                  {t("⚡ ใช้คูปองที่ดีที่สุดเลย")} (
                  {language === "th" ? bestCoupon.name : bestCoupon.nameEn})
                </span>
              </button>
            )}

            {onWishAgain && (
              <button
                type="button"
                onClick={onWishAgain}
                disabled={!canWishAgain}
                className={`px-6 py-3 rounded-full text-xs font-black shadow-lg flex items-center gap-2 transition-all active:scale-95 ${
                  canWishAgain
                    ? "bg-white/15 hover:bg-white/25 text-white border border-white/20 cursor-pointer"
                    : "bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed"
                }`}
              >
                <RotateCw size={14} />
                <span>{t("อธิษฐานอีกครั้ง")}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                playClaimReward();
                onClose();
              }}
              className="px-8 py-3 rounded-full bg-linear-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black shadow-xl shadow-amber-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Check size={16} strokeWidth={3} />
              <span>{isSingle ? t("ตกลง (รับรางวัล)") : t("📥 เก็บรางวัลทั้งหมดเข้ากระเป๋า")}</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
