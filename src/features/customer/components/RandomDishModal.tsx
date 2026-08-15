import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Dices, RotateCw, ShoppingBag, Utensils, Star, Flame, ChevronRight } from "lucide-react";
import { useLanguage } from "../../../lib/i18n";
import type { MenuItem } from "../types";
import { BRAND, GOLD, INK_MUTED } from "../constants/colors";

// ── Web Audio Sound Effects (Zero-dependency synthesized audio) ──
function playTickSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(580, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Ignore audio autoplay restrictions
  }
}

function playCelebrationSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.45);
    });
  } catch {
    // Ignore audio autoplay restrictions
  }
}

// ── Confetti Particle Burst ──
function ConfettiExplosion() {
  const particles = useMemo(() => {
    const colors = ["#fcc14a", "#ff5964", "#35a7ff", "#38b000", "#ffaa00", "#e040fb"];
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 320,
      y: (Math.random() - 0.7) * 350,
      scale: Math.random() * 0.7 + 0.6,
      rotate: Math.random() * 720 - 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
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
          transition={{ duration: 1.4, delay: p.delay, ease: "easeOut" }}
          className="absolute h-3 w-3 rounded-full"
          style={{ background: p.color }}
        />
      ))}
    </div>
  );
}

export function RandomDishModal({
  isOpen,
  onClose,
  menuItems,
  onSelectDish,
}: {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onSelectDish: (dish: MenuItem) => void;
}) {
  const { t, tMenu } = useLanguage();
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentDisplayItem, setCurrentDisplayItem] = useState<MenuItem | null>(null);
  const [winnerDish, setWinnerDish] = useState<MenuItem | null>(null);
  const spinIntervalRef = useRef<any>(null);

  // Eligible pool of dishes (excluding drinks & desserts)
  const eligibleDishes = useMemo(() => {
    const foodItems = menuItems.filter(
      (m) => m.category !== "drinks" && m.category !== "dessert"
    );
    return foodItems.length > 0 ? foodItems : menuItems;
  }, [menuItems]);

  const startRandomSpin = () => {
    if (isSpinning || eligibleDishes.length === 0) return;
    setIsSpinning(true);
    setWinnerDish(null);

    let speed = 60;
    let iterations = 0;
    const maxIterations = 24;

    const runShuffle = () => {
      const randomIndex = Math.floor(Math.random() * eligibleDishes.length);
      const chosen = eligibleDishes[randomIndex];
      setCurrentDisplayItem(chosen);
      playTickSound();
      iterations++;

      if (iterations >= maxIterations) {
        // Stop on winning dish
        clearInterval(spinIntervalRef.current);
        setWinnerDish(chosen);
        setIsSpinning(false);
        playCelebrationSound();
      } else {
        // Gradually slow down the shuffle
        if (iterations > maxIterations - 8) {
          speed += 30;
        }
        clearInterval(spinIntervalRef.current);
        spinIntervalRef.current = setTimeout(runShuffle, speed);
      }
    };

    spinIntervalRef.current = setTimeout(runShuffle, speed);
  };

  // Trigger random spin automatically on open if none selected
  useEffect(() => {
    if (isOpen) {
      setWinnerDish(null);
      setCurrentDisplayItem(null);
      const timer = setTimeout(() => {
        startRandomSpin();
      }, 300);
      return () => clearTimeout(timer);
    } else {
      if (spinIntervalRef.current) clearTimeout(spinIntervalRef.current);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const displayDish = winnerDish || currentDisplayItem || eligibleDishes[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-sm rounded-[32px] overflow-hidden bg-white shadow-2xl flex flex-col z-10 border border-[#fcc14a]/30"
          style={{ maxHeight: "90vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Confetti Explosion on win */}
          {winnerDish && <ConfettiExplosion />}

          {/* Header Banner */}
          <div
            className="px-5 pt-5 pb-4 text-white relative overflow-hidden flex items-center justify-between"
            style={{ background: `linear-gradient(135deg, ${BRAND} 0%, #001927 100%)` }}
          >
            <div className="flex items-center gap-2">
              <div
                className="grid h-10 w-10 place-items-center rounded-2xl"
                style={{ background: "rgba(252,193,74,0.2)", color: GOLD }}
              >
                <Dices size={22} className={isSpinning ? "animate-spin" : ""} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-[#fcc14a]">
                  RANDOM DISH
                </p>
                <h2 className="text-base font-extrabold tracking-tight">{t("สุ่มเมนูมื้อนี้")}</h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-90 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Center Display Card */}
          <div className="p-5 flex-1 overflow-y-auto no-scrollbar flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {displayDish && (
                <motion.div
                  key={displayDish.id + (winnerDish ? "-win" : "-spin")}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Dish Photo with Glowing Frame */}
                  <div
                    className="relative h-48 w-full rounded-2xl overflow-hidden shadow-md mb-3.5 border-2 transition-all duration-300 bg-slate-100"
                    style={{
                      borderColor: winnerDish ? GOLD : "transparent",
                      boxShadow: winnerDish ? "0 10px 30px rgba(252,193,74,0.35)" : "none",
                    }}
                  >
                    <img
                      src={encodeURI(String(displayDish.image))}
                      alt={tMenu(displayDish.name, "name")}
                      className={`h-full w-full object-cover transition-transform duration-500 ${
                        isSpinning ? "scale-110 blur-[1px]" : "scale-100"
                      }`}
                    />

                    {/* Dish Type Badge */}
                    <div className="absolute top-2.5 left-2.5 flex gap-1">
                      {displayDish.category === "signature" && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#002e47]/90 text-[#fcc14a] backdrop-blur-md border border-[#fcc14a]/30">
                          ⭐ {t("Signature")}
                        </span>
                      )}
                      {displayDish.options?.some((o) => o.id === "spicy") && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white shadow-sm flex items-center gap-0.5">
                          <Flame size={10} /> {t("เผ็ด")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status / Title */}
                  <div className="space-y-1 w-full px-2">
                    {winnerDish ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black mb-1"
                      >
                        <Sparkles size={13} className="text-amber-500" />
                        <span>{t("เมนูนำโชคของคุณมื้อนี้!")}</span>
                      </motion.div>
                    ) : (
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                        🎲 {t("กำลังหมุนเลือกเมนูแสนอร่อย...")}
                      </p>
                    )}

                    <h3
                      className="font-black text-lg text-slate-900 line-clamp-1 mt-1"
                      style={{ color: BRAND }}
                    >
                      {tMenu(displayDish.name, "name")}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light">
                      {tMenu(displayDish.desc, "desc")}
                    </p>

                    <div className="mt-2.5 flex items-center justify-center gap-1">
                      <span className="text-xs text-slate-400 font-medium">{t("ราคา")}</span>
                      <span className="text-2xl font-black" style={{ color: BRAND }}>
                        ฿{displayDish.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Action Buttons */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
            {winnerDish ? (
              <>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onClose();
                    onSelectDish(winnerDish);
                  }}
                  className="w-full h-12 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND} 0%, #001f30 100%)`,
                    color: GOLD,
                  }}
                >
                  <ShoppingBag size={18} />
                  <span>
                    {t("สั่งเมนูนี้เลย")} (฿{winnerDish.price})
                  </span>
                </motion.button>

                <button
                  type="button"
                  onClick={startRandomSpin}
                  className="w-full h-10 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition active:scale-95 cursor-pointer shadow-xs"
                >
                  <RotateCw size={14} />
                  <span>{t("สุ่มใหม่อีกรอบ")}</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                disabled={isSpinning}
                onClick={startRandomSpin}
                className="w-full h-12 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition disabled:opacity-50"
                style={{ background: BRAND, color: GOLD }}
              >
                <Dices size={18} className={isSpinning ? "animate-spin" : ""} />
                <span>{isSpinning ? t("กำลังสุ่ม...") : t("เริ่มสุ่มเมนู!")}</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
