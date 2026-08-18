import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Trophy, RotateCcw, Timer, Award } from "lucide-react";
import { useLanguage } from "../../../../lib/i18n";
import {
  playCatchIngredient,
  playCatchHazard,
  playWheelWin,
} from "../../utils/miniGamesAudio";

interface CatchIngredientsGameProps {
  onAwardTickets: (amount: number) => void;
  onClose: () => void;
}

interface FallingItem {
  id: number;
  x: number; // percentage 5% to 90%
  y: number; // percentage 0% to 100%
  speed: number;
  type: "crispy_pork" | "shrimp" | "egg" | "basil" | "rice" | "bomb";
  emoji: string;
  points: number;
  isHazard: boolean;
}

const ITEM_TYPES: Array<{
  type: FallingItem["type"];
  emoji: string;
  points: number;
  isHazard: boolean;
  weight: number;
}> = [
  { type: "crispy_pork", emoji: "🥓", points: 15, isHazard: false, weight: 25 },
  { type: "shrimp", emoji: "🦐", points: 20, isHazard: false, weight: 20 },
  { type: "egg", emoji: "🍳", points: 25, isHazard: false, weight: 15 },
  { type: "basil", emoji: "🌿", points: 35, isHazard: false, weight: 10 },
  { type: "rice", emoji: "🍚", points: 10, isHazard: false, weight: 15 },
  { type: "bomb", emoji: "💣", points: -30, isHazard: true, weight: 15 },
];

export function CatchIngredientsGame({ onAwardTickets }: CatchIngredientsGameProps) {
  const { t } = useLanguage();

  const [gameState, setGameState] = useState<"ready" | "playing" | "gameover" | "victory">("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [plateX, setPlateX] = useState(50); // percentage 0 to 100
  const [items, setItems] = useState<FallingItem[]>([]);
  const [earnedTickets, setEarnedTickets] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; color: string; id: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  // Pick random item based on weights
  const getRandomItemType = () => {
    const totalWeight = ITEM_TYPES.reduce((sum, it) => sum + it.weight, 0);
    let rand = Math.random() * totalWeight;
    for (const it of ITEM_TYPES) {
      if (rand < it.weight) return it;
      rand -= it.weight;
    }
    return ITEM_TYPES[0];
  };

  const startGame = () => {
    setScore(0);
    setLives(3);
    setTimeLeft(30);
    setPlateX(50);
    setItems([]);
    setFeedback(null);
    setEarnedTickets(0);
    lastSpawnRef.current = Date.now();
    setGameState("playing");
  };

  const endGame = useCallback(
    (isWin: boolean, finalScore: number) => {
      setGameState(isWin ? "victory" : "gameover");

      let tickets = 1;
      if (finalScore >= 450) tickets = 5;
      else if (finalScore >= 300) tickets = 3;
      else if (finalScore >= 150) tickets = 2;

      setEarnedTickets(tickets);
      onAwardTickets(tickets);

      if (isWin) {
        playWheelWin();
      }
    },
    [onAwardTickets]
  );

  // Timer countdown
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame(true, score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, score, endGame]);

  // Main game physics and collision loop
  useEffect(() => {
    if (gameState !== "playing") {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let nextItemId = 1;

    const loop = () => {
      const now = Date.now();

      // Spawn new items every 500ms - 800ms
      if (now - lastSpawnRef.current > 600) {
        const itemType = getRandomItemType();
        const newItem: FallingItem = {
          id: nextItemId++,
          x: 10 + Math.random() * 80,
          y: 0,
          speed: 0.9 + Math.random() * 0.7,
          type: itemType.type,
          emoji: itemType.emoji,
          points: itemType.points,
          isHazard: itemType.isHazard,
        };
        setItems((prev) => [...prev, newItem]);
        lastSpawnRef.current = now;
      }

      // Move items and check collisions
      setItems((prev) => {
        const updated: FallingItem[] = [];
        for (const item of prev) {
          const nextY = item.y + item.speed;

          // Catch collision zone: Y between 82% and 94% and X within plate distance (+/- 14%)
          if (nextY >= 80 && nextY <= 92) {
            const distance = Math.abs(item.x - plateX);
            if (distance < 14) {
              // CAUGHT!
              if (item.isHazard) {
                playCatchHazard();
                setLives((l) => {
                  const nl = l - 1;
                  if (nl <= 0) endGame(false, score);
                  return nl;
                });
                setScore((s) => Math.max(0, s + item.points));
                setFeedback({ text: "💥 ระเบิด! -30", color: "text-red-400", id: Date.now() });
              } else {
                playCatchIngredient();
                setScore((s) => s + item.points);
                setFeedback({ text: `+${item.points} ${item.emoji}`, color: "text-amber-300", id: Date.now() });
              }
              continue; // Item caught and removed
            }
          }

          // If fallen past screen bottom (> 100%)
          if (nextY > 100) {
            continue; // Discard
          }

          updated.push({ ...item, y: nextY });
        }
        return updated;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState, plateX, score, endGame]);

  // Touch / Pointer controls
  const handlePointerMove = (clientX: number) => {
    if (gameState !== "playing" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percent = Math.max(10, Math.min(90, (relativeX / rect.width) * 100));
    setPlateX(percent);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[460px] text-white select-none">
      {/* Top Header & Status */}
      <div className="w-full flex items-center justify-between px-2 pt-1 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-linear-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-lg">
            🥢
          </div>
          <div>
            <h4 className="font-black text-sm text-white flex items-center gap-1.5">
              {t("จานบินรับวัตถุดิบ")}
              <span className="text-[10px] bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded font-black">
                {t("หลบระเบิด")}
              </span>
            </h4>
            <div className="flex items-center gap-1 text-[11px] text-emerald-200/80 font-medium">
              <Timer size={12} />
              <span>
                {t("เวลา")}: {timeLeft}s
              </span>
            </div>
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
          <div className="bg-black/40 border border-emerald-400/30 px-3 py-1 rounded-xl text-right">
            <span className="text-[9px] text-slate-400 block font-bold uppercase">{t("คะแนน")}</span>
            <span className="font-black text-amber-300 text-sm tracking-wide">{score.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Main Gameplay Screen Area */}
      {gameState === "playing" && (
        <div
          ref={containerRef}
          onPointerDown={(e) => {
            isDraggingRef.current = true;
            handlePointerMove(e.clientX);
          }}
          onPointerMove={(e) => {
            if (isDraggingRef.current) handlePointerMove(e.clientX);
          }}
          onPointerUp={() => {
            isDraggingRef.current = false;
          }}
          className="w-full flex-1 relative my-2 bg-radial from-slate-900/60 to-black/80 rounded-3xl border border-white/10 overflow-hidden cursor-ew-resize touch-none min-h-[280px]"
        >
          {/* Ambient Grid Guide */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

          {/* Falling Items */}
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute text-2xl sm:text-3xl transition-transform pointer-events-none drop-shadow-md select-none -translate-x-1/2"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {item.emoji}
            </div>
          ))}

          {/* Player Plate */}
          <div
            className="absolute bottom-4 -translate-x-1/2 w-24 sm:w-28 h-8 rounded-full bg-linear-to-r from-amber-400 via-yellow-200 to-amber-500 border-2 border-white shadow-[0_0_20px_rgba(251,191,36,0.6)] flex items-center justify-center pointer-events-none transition-all duration-75"
            style={{ left: `${plateX}%` }}
          >
            <div className="w-16 h-3 rounded-full bg-white/50 border border-white/80" />
          </div>

          {/* Hit Feedback Popup */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                key={feedback.id}
                initial={{ y: 0, opacity: 1, scale: 0.8 }}
                animate={{ y: -25, opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className={`absolute bottom-16 font-black text-sm drop-shadow-md -translate-x-1/2 ${feedback.color}`}
                style={{ left: `${plateX}%` }}
              >
                {feedback.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Ready Screen */}
      {gameState === "ready" && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-4">
          <div className="h-20 w-20 rounded-3xl bg-linear-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30 animate-bounce">
            🥢
          </div>

          <div>
            <h3 className="text-xl font-black text-white">{t("เกมจานบินรับวัตถุดิบ")}</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xs leading-relaxed">
              {t("เลื่อนจานอาหารเพื่อรับวัตถุดิบสดๆ ที่ตกลงมา และระวังหลบ ")}
              <span className="text-red-400 font-bold">"ลูกระเบิด 💣"</span>
              {t(" เก็บแต้มให้ได้มากที่สุดภายใน 30 วินาที!")}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full max-w-xs text-[11px] font-bold">
            <div className="bg-white/5 border border-white/10 p-2 rounded-2xl text-center">
              <span className="text-xl block">🥓🦐</span>
              <span className="text-amber-300">+15 - 20 แต้ม</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2 rounded-2xl text-center">
              <span className="text-xl block">🍳🌿</span>
              <span className="text-emerald-300">+25 - 35 แต้ม</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-2 rounded-2xl text-center">
              <span className="text-xl block">💣</span>
              <span className="text-red-400">-30 แต้ม / หักชีวิต</span>
            </div>
          </div>
        </div>
      )}

      {/* Game Over / Victory */}
      {(gameState === "gameover" || gameState === "victory") && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-3.5">
          <div className="h-16 w-16 rounded-3xl bg-linear-to-tr from-emerald-400 to-teal-300 text-slate-950 flex items-center justify-center text-3xl shadow-xl shadow-emerald-500/25">
            {gameState === "victory" ? <Trophy size={32} /> : <Award size={32} />}
          </div>

          <div>
            <h3 className="text-xl font-black text-white">
              {gameState === "victory" ? t("🎉 จานบินระดับตำนาน!") : t("💥 จบเกม!")}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {score >= 350 ? t("รับวัตถุดิบได้คล่องแคล่วว่องไวมาก!") : t("เล่นเพลินๆ ฝึกความไวสายตาและมือ!")}
            </p>
          </div>

          <div className="bg-black/40 border border-white/15 rounded-2xl p-3.5 w-full max-w-xs grid grid-cols-2 gap-3 text-left">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">{t("คะแนนรวม")}</span>
              <span className="text-lg font-black text-amber-300">{score.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">{t("เวลาที่ใช้")}</span>
              <span className="text-lg font-black text-emerald-400">{30 - timeLeft}s</span>
            </div>
          </div>

          <div className="bg-linear-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/40 rounded-2xl p-3 w-full max-w-xs flex items-center justify-center gap-2">
            <span className="text-xl">🎫</span>
            <span className="text-xs font-black text-amber-300">
              {t("ได้รับตั๋วสุ่มกาชา")} +{earnedTickets} {t("ใบ")}!
            </span>
          </div>
        </div>
      )}

      {/* Controls / Start Button */}
      <div className="w-full pt-3 pb-1">
        {gameState === "playing" ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPlateX((p) => Math.max(10, p - 15))}
              className="flex-1 py-3 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-2xl font-black text-sm transition"
            >
              ◀ {t("ซ้าย")}
            </button>
            <button
              type="button"
              onClick={() => setPlateX((p) => Math.min(90, p + 15))}
              className="flex-1 py-3 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-2xl font-black text-sm transition"
            >
              {t("ขวา")} ▶
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={startGame}
            className="w-full py-3.5 rounded-2xl bg-linear-to-r from-emerald-400 to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-400/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            <span>{gameState === "ready" ? t("เริ่มเล่นเกม (Start)") : t("เล่นใหม่อีกครั้ง (Play Again)")}</span>
          </button>
        )}
      </div>
    </div>
  );
}
