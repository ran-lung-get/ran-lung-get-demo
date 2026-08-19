import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Trophy, RotateCcw, Sparkles, Heart, Zap, Award } from "lucide-react";
import { useLanguage } from "../../../../lib/i18n";
import {
  playSizzle,
  playPerfectHit,
  playGoodHit,
  playCatchHazard,
  playWheelWin,
} from "../../utils/miniGamesAudio";

interface WokMasterGameProps {
  onAwardTickets: (amount: number) => void;
  onClose: () => void;
}

const DISHES = [
  { name: "กระเพราหมูกรอบ", emoji: "🥓", color: "from-amber-600 to-red-600" },
  { name: "ผัดผงกะหรี่ทะเล", emoji: "🦐", color: "from-yellow-500 to-amber-600" },
  { name: "ผัดซีอิ๊วเส้นใหญ่", emoji: "🍜", color: "from-orange-600 to-amber-700" },
  { name: "ผัดพริกแกงเนื้อ", emoji: "🥩", color: "from-red-600 to-rose-800" },
  { name: "ข้าวผัดกระเทียม", emoji: "🍚", color: "from-amber-400 to-yellow-600" },
  { name: "ผัดพริกเผาหอยลาย", emoji: "🦪", color: "from-red-500 to-amber-700" },
];

export function WokMasterGame({ onAwardTickets }: WokMasterGameProps) {
  const { t, tMenu } = useLanguage();

  const [gameState, setGameState] = useState<"ready" | "playing" | "gameover" | "victory">("ready");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [dishIndex, setDishIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState<{ text: string; color: string; id: number } | null>(null);
  const [earnedTickets, setEarnedTickets] = useState(0);
  const [needlePos, setNeedlePos] = useState(0); // 0 to 100
  const [isWokShaking, setIsWokShaking] = useState(false);
  const [fireActive, setFireActive] = useState(false);

  const directionRef = useRef<1 | -1>(1);
  const speedRef = useRef(1.8);
  const animFrameRef = useRef<number | null>(null);

  const currentDish = DISHES[dishIndex % DISHES.length];

  // Game loop for needle movement
  useEffect(() => {
    if (gameState !== "playing") {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const updateNeedle = () => {
      setNeedlePos((prev) => {
        let next = prev + directionRef.current * speedRef.current;
        if (next >= 100) {
          next = 100;
          directionRef.current = -1;
        } else if (next <= 0) {
          next = 0;
          directionRef.current = 1;
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(updateNeedle);
    };

    animFrameRef.current = requestAnimationFrame(updateNeedle);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState]);

  const startGame = () => {
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setDishIndex(0);
    setLives(3);
    setNeedlePos(0);
    setFeedback(null);
    setEarnedTickets(0);
    directionRef.current = 1;
    speedRef.current = 1.8;
    setGameState("playing");
  };

  const showHitFeedback = (text: string, color: string) => {
    setFeedback({ text, color, id: Date.now() });
  };

  const handleFlipWok = useCallback(() => {
    if (gameState !== "playing") return;

    setIsWokShaking(true);
    setTimeout(() => setIsWokShaking(false), 250);

    const pos = needlePos; // 0 to 100
    // Perfect zone: 45 - 55 (Width 10%)
    // Great zone: 32 - 45 or 55 - 68 (Width 26%)
    // Good zone: 20 - 32 or 68 - 80 (Width 24%)
    // Miss: < 20 or > 80

    if (pos >= 44 && pos <= 56) {
      // PERFECT HIT
      playPerfectHit();
      playSizzle();
      setFireActive(true);
      setTimeout(() => setFireActive(false), 500);

      const bonusCombo = combo + 1;
      const points = 300 + bonusCombo * 50;
      setScore((s) => s + points);
      setCombo((c) => {
        const next = c + 1;
        setMaxCombo((m) => Math.max(m, next));
        return next;
      });
      showHitFeedback("🔥 PERFECT! หอมกลิ่นกระทะ", "text-amber-400");

      // Advance dish
      advanceDish(true);
    } else if ((pos >= 32 && pos < 44) || (pos > 56 && pos <= 68)) {
      // GREAT HIT
      playGoodHit();
      playSizzle();
      const bonusCombo = combo + 1;
      const points = 150 + bonusCombo * 20;
      setScore((s) => s + points);
      setCombo((c) => {
        const next = c + 1;
        setMaxCombo((m) => Math.max(m, next));
        return next;
      });
      showHitFeedback("✨ GREAT! สุกกำลังดี", "text-emerald-400");
      advanceDish(true);
    } else if ((pos >= 18 && pos < 32) || (pos > 68 && pos <= 82)) {
      // OK / GOOD
      playGoodHit();
      setScore((s) => s + 60);
      setCombo(0);
      showHitFeedback("👍 OK! พอใช้ได้", "text-blue-300");
      advanceDish(false);
    } else {
      // MISS / BURNT
      playCatchHazard();
      setCombo(0);
      showHitFeedback("💥 MISS! กระเพราไหม้", "text-red-400");

      setLives((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          endGame(false, score);
        }
        return next;
      });
    }
  }, [gameState, needlePos, combo, score, dishIndex]);

  const advanceDish = (isHighHit: boolean) => {
    const nextIndex = dishIndex + 1;
    setDishIndex(nextIndex);

    // Increase speed progressively
    speedRef.current = Math.min(4.2, 1.8 + nextIndex * 0.22);

    if (nextIndex >= 12) {
      endGame(true, score + (isHighHit ? 500 : 0));
    }
  };

  const endGame = (isWin: boolean, finalScore: number) => {
    setGameState(isWin ? "victory" : "gameover");

    let ticketsAwarded = 1;
    if (finalScore >= 3500) ticketsAwarded = 5;
    else if (finalScore >= 2400) ticketsAwarded = 3;
    else if (finalScore >= 1200) ticketsAwarded = 2;

    setEarnedTickets(ticketsAwarded);
    onAwardTickets(ticketsAwarded);

    if (isWin) {
      playWheelWin();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[460px] text-white select-none">
      {/* Top Header & Status */}
      <div className="w-full flex items-center justify-between px-2 pt-1 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-linear-to-tr from-amber-500 to-red-500 flex items-center justify-center shadow-lg shadow-amber-500/20 text-lg">
            🍳
          </div>
          <div>
            <h4 className="font-black text-sm text-white flex items-center gap-1.5">
              {t("DineOS ควงกระทะ")}
              <span className="text-[10px] bg-red-500/30 text-red-300 border border-red-500/40 px-1.5 py-0.2 rounded font-black">
                {t("ผัดจับจังหวะ")}
              </span>
            </h4>
            <p className="text-[11px] text-amber-200/80 font-medium">
              {t("จานที่")}: {Math.min(dishIndex + 1, 12)} / 12
            </p>
          </div>
        </div>

        {/* Lives & Score */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3].map((heart) => (
              <Heart
                key={heart}
                size={16}
                className={heart <= lives ? "fill-red-500 text-red-500 animate-pulse" : "text-slate-600 fill-slate-800"}
              />
            ))}
          </div>
          <div className="bg-black/40 border border-amber-400/30 px-3 py-1 rounded-xl text-right">
            <span className="text-[9px] text-slate-400 block font-bold uppercase">{t("คะแนน")}</span>
            <span className="font-black text-amber-300 text-sm tracking-wide">{score.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Game Playing Screen */}
      {gameState === "playing" && (
        <div className="w-full flex-1 flex flex-col items-center justify-center my-4 relative">
          {/* Active Dish Target */}
          <div className="flex items-center gap-2.5 bg-white/10 border border-white/15 px-4 py-2 rounded-2xl mb-4 backdrop-blur-xs">
            <span className="text-2xl animate-bounce">{currentDish.emoji}</span>
            <div>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{t("เมนูปัจจุบัน")}:</p>
              <h5 className="text-sm font-black text-white">{tMenu(currentDish.name, "name")}</h5>
            </div>
            {combo > 1 && (
              <div className="ml-3 px-2 py-0.5 rounded-lg bg-linear-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-black animate-pulse flex items-center gap-1 shadow-md">
                <Zap size={12} className="fill-slate-950" />
                {combo}x COMBO!
              </div>
            )}
          </div>

          {/* Wok Animation Container */}
          <div className="relative my-2 flex flex-col items-center justify-center">
            {/* Fire Burst Effect on Perfect Hit */}
            <AnimatePresence>
              {fireActive && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, y: 10 }}
                  animate={{ scale: 1.3, opacity: 1, y: -20 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="absolute -top-12 z-20 pointer-events-none flex items-center justify-center text-4xl"
                >
                  🔥💥🔥
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Iron Wok Graphics */}
            <motion.div
              animate={isWokShaking ? { rotate: [-12, 12, -8, 8, 0], scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 0.25 }}
              className="relative w-44 h-44 rounded-full bg-linear-to-b from-slate-800 via-slate-900 to-black border-4 border-slate-700 shadow-2xl flex items-center justify-center overflow-hidden"
              style={{
                boxShadow: fireActive ? "0 0 35px rgba(245,158,11,0.6)" : "0 10px 25px rgba(0,0,0,0.5)",
              }}
            >
              <div className="absolute inset-2 rounded-full border border-white/10 bg-radial from-amber-600/20 via-transparent to-transparent flex items-center justify-center">
                <span className="text-5xl drop-shadow-md select-none">{currentDish.emoji}</span>
              </div>
              <div className="absolute bottom-2 font-black text-[10px] text-amber-400 tracking-widest uppercase">
                DINEOS
              </div>
            </motion.div>

            {/* Hit Feedback Popups */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  key={feedback.id}
                  initial={{ y: 0, opacity: 1, scale: 0.8 }}
                  animate={{ y: -30, opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className={`absolute top-2 font-black text-sm sm:text-base drop-shadow-md ${feedback.color}`}
                >
                  {feedback.text}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Timing Heat Gauge Slider */}
          <div className="w-full max-w-xs mt-3 px-2">
            <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1 px-1">
              <span>{t("เร็วไป")}</span>
              <span className="text-amber-300 font-extrabold">🎯 PERFECT</span>
              <span>{t("ช้าไป")}</span>
            </div>

            {/* The Gauge Track */}
            <div className="relative h-6 bg-slate-900 rounded-full border-2 border-slate-700 overflow-hidden shadow-inner flex items-center">
              {/* Outer OK zones */}
              <div className="absolute left-[18%] w-[64%] h-full bg-blue-500/20" />
              {/* Great zones */}
              <div className="absolute left-[32%] w-[36%] h-full bg-emerald-500/35 border-x border-emerald-400/40" />
              {/* Perfect center zone */}
              <div className="absolute left-[44%] w-[12%] h-full bg-linear-to-r from-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />

              {/* Moving Indicator Needle */}
              <div
                className="absolute top-0 bottom-0 w-3 bg-white rounded-full shadow-[0_0_10px_white] -ml-1.5 transition-all duration-0"
                style={{ left: `${needlePos}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Ready / Instructions Screen */}
      {gameState === "ready" && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-4">
          <div className="relative">
            <div className="h-20 w-20 rounded-3xl bg-linear-to-tr from-amber-500 via-orange-500 to-red-600 flex items-center justify-center text-4xl shadow-xl shadow-orange-500/30 animate-bounce">
              🍳
            </div>
            <Sparkles size={24} className="absolute -top-2 -right-2 text-yellow-300 animate-spin" />
          </div>

          <div>
            <h3 className="text-xl font-black text-white">{t("เกม DineOS ควงกระทะ")}</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xs leading-relaxed">
              {t("จับจังหวะสะบัดกระทะให้ลงในโซนสีทอง ")}
              <span className="text-amber-300 font-bold">"PERFECT"</span>
              {t(" ทำคอมโบต่อเนื่องเพื่อสะสมคะแนนแลกตั๋วสุ่มกาชา!")}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full max-w-xs text-[11px] font-bold">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-2xl text-center">
              <span className="text-amber-400 block text-sm">🎯 44-56%</span>
              <span className="text-slate-300">Perfect +300</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-2xl text-center">
              <span className="text-emerald-400 block text-sm">✨ 32-68%</span>
              <span className="text-slate-300">Great +150</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-2xl text-center">
              <span className="text-red-400 block text-sm">💥 &lt;18%</span>
              <span className="text-slate-300">ไหม้! หัก 1 ชีวิต</span>
            </div>
          </div>
        </div>
      )}

      {/* Game Over / Victory Screen */}
      {(gameState === "gameover" || gameState === "victory") && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-3.5">
          <div className="h-16 w-16 rounded-3xl bg-linear-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center text-3xl shadow-xl shadow-amber-500/25">
            {gameState === "victory" ? <Trophy size={32} /> : <Award size={32} />}
          </div>

          <div>
            <h3 className="text-xl font-black text-white">
              {gameState === "victory" ? t("🎉 ยอดเชฟกระทะเหล็ก!") : t("🍲 จบการผัดกระทะ!")}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {score >= 2500 ? t("ฝีมือระดับปรมาจารย์แห่ง DineOS!") : t("พยายามได้ดีมาก ฝึกฝนอีกนิดจะเก่งขึ้นแน่นอน!")}
            </p>
          </div>

          {/* Stats Summary */}
          <div className="bg-black/40 border border-white/15 rounded-2xl p-3.5 w-full max-w-xs grid grid-cols-2 gap-3 text-left">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">{t("คะแนนรวม")}</span>
              <span className="text-lg font-black text-amber-300">{score.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">{t("คอมโบสูงสุด")}</span>
              <span className="text-lg font-black text-emerald-400">{maxCombo}x</span>
            </div>
          </div>

          {/* Reward Ticket Banner */}
          <div className="bg-linear-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/40 rounded-2xl p-3 w-full max-w-xs flex items-center justify-center gap-2">
            <span className="text-xl">🎫</span>
            <span className="text-xs font-black text-amber-300">
              {t("ได้รับตั๋วสุ่มกาชา")} +{earnedTickets} {t("ใบ")}!
            </span>
          </div>
        </div>
      )}

      {/* Bottom Action Button */}
      <div className="w-full pt-3 pb-1">
        {gameState === "playing" ? (
          <button
            type="button"
            onClick={handleFlipWok}
            className="w-full py-4 rounded-2xl bg-linear-to-r from-amber-500 via-orange-500 to-red-500 text-white font-black text-base shadow-xl shadow-orange-500/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Flame size={20} className="fill-white animate-bounce" />
            <span>{t("สะบัดกระทะเลย! (FLIP)")}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={startGame}
            className="w-full py-3.5 rounded-2xl bg-linear-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            <span>{gameState === "ready" ? t("เริ่มเล่นเกม (Start)") : t("เล่นใหม่อีกครั้ง (Play Again)")}</span>
          </button>
        )}
      </div>
    </div>
  );
}
