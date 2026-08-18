import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Crosshair,
  RotateCcw,
  Award,
  Sparkles,
  Zap,
  ShieldAlert,
  Flame,
  Volume2,
  VolumeX,
  Target,
  Trophy,
  Utensils,
} from "lucide-react";
import { useLanguage } from "../../../../lib/i18n";
import type { CouponReward } from "../../types/gacha";
import {
  play8bitGunshot,
  play8bitDryFire,
  play8bitReload,
  play8bitBanditHit,
  play8bitHostageSaved,
  play8bitHostageHurt,
  play8bitSpeedUp,
  play8bitBonusAmmo,
  play8bitGameOver,
  play8bitVictory,
} from "../../utils/miniGamesAudio";
import {
  PixelBandit,
  PixelDynamiteBandit,
  PixelHostageUncleGet,
  PixelHostageCustomer,
  PixelHostageCat,
  PixelHoleFrame,
  PixelRevolverHud,
} from "./PixelBanditSprites";

export interface BanditShooterGameProps {
  onAwardTickets: (amount: number) => void;
  onAwardCoupon?: (coupon: CouponReward) => void;
  onClose?: () => void;
  onSelectDish?: (dishName: string) => void;
}

// Target Type inside a hole
type TargetType =
  | "bandit"
  | "dynamite_bandit"
  | "bandit_with_hostage"
  | "hostage_alone"
  | "ammo_crate";

interface HoleState {
  id: number;
  active: boolean;
  targetType: TargetType;
  hostageType?: "uncle" | "customer" | "cat";
  spawnTime: number;
  duration: number; // Duration before attacking / disappearing
  isHit?: boolean;
  isHostageHit?: boolean;
  isHostageRescued?: boolean;
  isAboutToShoot?: boolean;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

interface BulletHole {
  id: number;
  x: number;
  y: number;
}

const TOTAL_HOLES = 6;
const MAX_AMMO = 6;
const INITIAL_TIME = 45; // 45 seconds timer

export function BanditShooterGame({
  onAwardTickets,
  onAwardCoupon,
  onClose,
  onSelectDish,
}: BanditShooterGameProps) {
  const { t, tMenu } = useLanguage();

  // Game state
  const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [lives, setLives] = useState(3);
  const [ammo, setAmmo] = useState(MAX_AMMO);
  const [isReloading, setIsReloading] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // Statistics
  const [banditsShot, setBanditsShot] = useState(0);
  const [hostagesRescued, setHostagesRescued] = useState(0);
  const [shotsFired, setShotsFired] = useState(0);
  const [shotsHit, setShotsHit] = useState(0);

  // Speed level
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [speedUpBanner, setSpeedUpBanner] = useState(false);

  // Holes states
  const [holes, setHoles] = useState<HoleState[]>(
    Array.from({ length: TOTAL_HOLES }, (_, i) => ({
      id: i,
      active: false,
      targetType: "bandit",
      spawnTime: 0,
      duration: 1800,
    }))
  );

  // Visual effects
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [bulletHoles, setBulletHoles] = useState<BulletHole[]>([]);
  const [isScreenShaking, setIsScreenShaking] = useState(false);
  const [isRedFlashing, setIsRedFlashing] = useState(false);
  const [hasAwardedReward, setHasAwardedReward] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Add floating floating text
  const addFloatingText = (x: number, y: number, text: string, color: string = "#fbbf24") => {
    const id = Date.now() + Math.random();
    setFloatingTexts((prev) => [...prev, { id, x, y, text, color }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
    }, 900);
  };

  // Add bullet hole decal
  const addBulletHole = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    setBulletHoles((prev) => [...prev.slice(-8), { id, x, y }]);
    setTimeout(() => {
      setBulletHoles((prev) => prev.filter((item) => item.id !== id));
    }, 1800);
  };

  // Trigger screen shake
  const triggerShake = () => {
    setIsScreenShaking(true);
    setTimeout(() => setIsScreenShaking(false), 180);
  };

  // Trigger red flash when taking damage
  const triggerDamage = () => {
    setIsRedFlashing(true);
    triggerShake();
    setTimeout(() => setIsRedFlashing(false), 300);
  };

  // Start new game
  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setLives(3);
    setAmmo(MAX_AMMO);
    setIsReloading(false);
    setCombo(0);
    setMaxCombo(0);
    setBanditsShot(0);
    setHostagesRescued(0);
    setShotsFired(0);
    setShotsHit(0);
    setSpeedMultiplier(1.0);
    setHasAwardedReward(false);
    setFloatingTexts([]);
    setBulletHoles([]);

    setHoles(
      Array.from({ length: TOTAL_HOLES }, (_, i) => ({
        id: i,
        active: false,
        targetType: "bandit",
        spawnTime: 0,
        duration: 1800,
      }))
    );

    play8bitReload();
  };

  // Reload revolver
  const handleReload = useCallback(() => {
    if (isReloading || ammo === MAX_AMMO || gameState !== "playing") return;
    setIsReloading(true);
    play8bitReload();

    setTimeout(() => {
      setAmmo(MAX_AMMO);
      setIsReloading(false);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        addFloatingText(rect.width / 2, rect.height - 80, "RELOADED! 💥", "#fde047");
      }
    }, 550);
  }, [isReloading, ammo, gameState]);

  // Keyboard shortcut for reload (R or Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R" || e.key === " ") {
        e.preventDefault();
        handleReload();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleReload]);

  // Main Game Countdown Timer
  useEffect(() => {
    if (gameState !== "playing") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // End game logic
  const endGame = useCallback(() => {
    setGameState("gameover");
    play8bitGameOver();
  }, []);

  // Check lives
  useEffect(() => {
    if (gameState === "playing" && lives <= 0) {
      endGame();
    }
  }, [lives, gameState, endGame]);

  // Dynamic Speed Multiplier calculation based on bandits shot
  useEffect(() => {
    if (gameState !== "playing") return;

    // Speed increases progressively with every bandit hit
    const newSpeed = Math.min(2.6, 1.0 + Math.floor(banditsShot / 3) * 0.18);
    if (newSpeed > speedMultiplier) {
      setSpeedMultiplier(newSpeed);
      setSpeedUpBanner(true);
      play8bitSpeedUp();
      setTimeout(() => setSpeedUpBanner(false), 1200);
    }
  }, [banditsShot, gameState, speedMultiplier]);

  // Spawner loop for Bandit Targets
  useEffect(() => {
    if (gameState !== "playing") return;

    // Spawn rate scales with speedMultiplier
    const baseInterval = Math.max(480, 1400 / speedMultiplier);
    const spawnTimer = setInterval(() => {
      setHoles((prevHoles) => {
        // Count currently active holes
        const activeCount = prevHoles.filter((h) => h.active && !h.isHit).length;
        const maxSimultaneous = speedMultiplier > 1.8 ? 3 : speedMultiplier > 1.3 ? 2 : 1;

        if (activeCount >= maxSimultaneous) return prevHoles;

        // Pick an inactive hole
        const inactiveIndices = prevHoles
          .map((h, i) => (!h.active ? i : -1))
          .filter((i) => i !== -1);

        if (inactiveIndices.length === 0) return prevHoles;

        const targetIndex =
          inactiveIndices[Math.floor(Math.random() * inactiveIndices.length)];

        // Decide target type
        const rand = Math.random();
        let targetType: TargetType = "bandit";
        const hostageTypes: ("uncle" | "customer" | "cat")[] = ["uncle", "customer", "cat"];
        const hostageType = hostageTypes[Math.floor(Math.random() * hostageTypes.length)];

        if (rand < 0.35) {
          targetType = "bandit_with_hostage"; // 35% chance bandit with hostage
        } else if (rand < 0.65) {
          targetType = "bandit"; // 30% normal bandit
        } else if (rand < 0.85) {
          targetType = "dynamite_bandit"; // 20% dynamite bandit
        } else if (rand < 0.94) {
          targetType = "hostage_alone"; // 9% wandering hostage (don't shoot!)
        } else {
          targetType = "ammo_crate"; // 6% ammo crate
        }

        // Duration scales down with speed multiplier
        const baseDuration =
          targetType === "dynamite_bandit"
            ? 1200
            : targetType === "bandit_with_hostage"
            ? 2000
            : 1600;
        const duration = Math.max(650, baseDuration / speedMultiplier);

        return prevHoles.map((h, idx) =>
          idx === targetIndex
            ? {
                ...h,
                active: true,
                targetType,
                hostageType,
                spawnTime: Date.now(),
                duration,
                isHit: false,
                isHostageHit: false,
                isHostageRescued: false,
                isAboutToShoot: false,
              }
            : h
        );
      });
    }, baseInterval);

    return () => clearInterval(spawnTimer);
  }, [gameState, speedMultiplier]);

  // Bandit Attack Timer Check (if player doesn't shoot bandit in time, bandit shoots back!)
  useEffect(() => {
    if (gameState !== "playing") return;

    const checkTimer = setInterval(() => {
      const now = Date.now();

      setHoles((prevHoles) =>
        prevHoles.map((hole) => {
          if (!hole.active || hole.isHit || hole.isHostageHit || hole.isHostageRescued) {
            return hole;
          }

          const elapsed = now - hole.spawnTime;

          // If close to expiration (last 30% of duration), flag isAboutToShoot
          if (
            elapsed > hole.duration * 0.65 &&
            (hole.targetType === "bandit" ||
              hole.targetType === "dynamite_bandit" ||
              hole.targetType === "bandit_with_hostage") &&
            !hole.isAboutToShoot
          ) {
            return { ...hole, isAboutToShoot: true };
          }

          // If expired and bandit was not shot: Bandit attacks player!
          if (elapsed >= hole.duration) {
            if (
              hole.targetType === "bandit" ||
              hole.targetType === "dynamite_bandit" ||
              hole.targetType === "bandit_with_hostage"
            ) {
              // Penalty: Player gets shot by bandit!
              triggerDamage();
              play8bitHostageHurt();
              setLives((l) => Math.max(0, l - 1));
              setCombo(0);
              if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                addFloatingText(rect.width / 2, rect.height / 2, "BANDIT ATTACK! -1 ❤️", "#ef4444");
              }
            }
            return { ...hole, active: false, isAboutToShoot: false };
          }

          return hole;
        })
      );
    }, 80);

    return () => clearInterval(checkTimer);
  }, [gameState]);

  // Shoot Action Handler
  const handleShootingGalleryClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gameState !== "playing" || isReloading) return;

    const rect = containerRef.current?.getBoundingClientRect();
    const clickX = rect ? e.clientX - rect.left : 100;
    const clickY = rect ? e.clientY - rect.top : 100;

    // Check Ammo
    if (ammo <= 0) {
      play8bitDryFire();
      addFloatingText(clickX, clickY, "OUT OF AMMO! 🚫", "#ef4444");
      return;
    }

    // Consume 1 bullet
    setAmmo((prev) => Math.max(0, prev - 1));
    setShotsFired((prev) => prev + 1);
    play8bitGunshot();
    triggerShake();
    addBulletHole(clickX, clickY);
  };

  // Hit Target Logic
  const handleHitTarget = (
    holeId: number,
    partClicked: "bandit" | "hostage" | "ammo_crate",
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    if (gameState !== "playing" || isReloading) return;
    if (ammo <= 0) {
      play8bitDryFire();
      const rect = containerRef.current?.getBoundingClientRect();
      const clickX = rect ? e.clientX - rect.left : 100;
      const clickY = rect ? e.clientY - rect.top : 100;
      addFloatingText(clickX, clickY, "CLICK! NO AMMO! 🚫", "#ef4444");
      return;
    }

    // Consume 1 bullet
    setAmmo((prev) => Math.max(0, prev - 1));
    setShotsFired((prev) => prev + 1);
    setShotsHit((prev) => prev + 1);
    play8bitGunshot();
    triggerShake();

    const rect = containerRef.current?.getBoundingClientRect();
    const clickX = rect ? e.clientX - rect.left : 100;
    const clickY = rect ? e.clientY - rect.top : 100;
    addBulletHole(clickX, clickY);

    const hole = holes.find((h) => h.id === holeId);
    if (!hole || !hole.active || hole.isHit) return;

    // 1. CLICKED ON BANDIT (Rescues hostage if present, or defeats bandit)
    if (partClicked === "bandit") {
      play8bitBanditHit();

      // Check if this was a Hostage Situation
      if (hole.targetType === "bandit_with_hostage") {
        // RESCUED HOSTAGE!
        play8bitHostageSaved();
        setHostagesRescued((prev) => prev + 1);
        setBanditsShot((prev) => prev + 1);

        const currentCombo = combo + 1;
        setCombo(currentCombo);
        if (currentCombo > maxCombo) setMaxCombo(currentCombo);

        const pts = 300 + currentCombo * 50;
        setScore((prev) => prev + pts);

        // Guaranteed Ammo Recovery on Hostage Rescue!
        const ammoGain = Math.min(MAX_AMMO, ammo + 3);
        setAmmo(ammoGain);
        play8bitBonusAmmo();

        // Extra time bonus (+2 seconds)
        setTimeLeft((t) => Math.min(60, t + 2));

        addFloatingText(clickX, clickY, `RESCUED! +${pts} 💖 +3 AMMO`, "#34d399");

        // Update hole state to rescued
        setHoles((prev) =>
          prev.map((h) =>
            h.id === holeId
              ? { ...h, isHit: true, isHostageRescued: true }
              : h
          )
        );

        setTimeout(() => {
          setHoles((prev) =>
            prev.map((h) => (h.id === holeId ? { ...h, active: false } : h))
          );
        }, 500);
      } else {
        // Normal or Dynamite Bandit defeated
        setBanditsShot((prev) => prev + 1);
        const currentCombo = combo + 1;
        setCombo(currentCombo);
        if (currentCombo > maxCombo) setMaxCombo(currentCombo);

        const basePts = hole.targetType === "dynamite_bandit" ? 150 : 100;
        const pts = basePts + currentCombo * 25;
        setScore((prev) => prev + pts);

        // Random Ammo Drop (45% chance to get +1 or +2 ammo)
        const rollAmmo = Math.random();
        let ammoText = "";
        if (rollAmmo < 0.45 && ammo < MAX_AMMO) {
          const gain = rollAmmo < 0.15 ? 2 : 1;
          setAmmo((a) => Math.min(MAX_AMMO, a + gain));
          play8bitBonusAmmo();
          ammoText = ` +${gain} AMMO 💥`;
        }

        addFloatingText(clickX, clickY, `+${pts}${ammoText}`, "#fbbf24");

        // Mark as hit
        setHoles((prev) =>
          prev.map((h) => (h.id === holeId ? { ...h, isHit: true } : h))
        );

        setTimeout(() => {
          setHoles((prev) =>
            prev.map((h) => (h.id === holeId ? { ...h, active: false } : h))
          );
        }, 350);
      }
    }

    // 2. CLICKED ON HOSTAGE BY MISTAKE (Penalty!)
    else if (partClicked === "hostage") {
      play8bitHostageHurt();
      triggerDamage();
      setLives((l) => Math.max(0, l - 1));
      setCombo(0);

      addFloatingText(clickX, clickY, "OUCH! DON'T SHOOT HOSTAGE! ❌ -1 ❤️", "#ef4444");

      setHoles((prev) =>
        prev.map((h) =>
          h.id === holeId ? { ...h, isHostageHit: true, isHit: true } : h
        )
      );

      setTimeout(() => {
        setHoles((prev) =>
          prev.map((h) => (h.id === holeId ? { ...h, active: false } : h))
        );
      }, 400);
    }

    // 3. CLICKED ON AMMO CRATE
    else if (partClicked === "ammo_crate") {
      play8bitBonusAmmo();
      setAmmo(MAX_AMMO);
      setScore((s) => s + 50);
      addFloatingText(clickX, clickY, "FULL AMMO 6/6! 📦 +50", "#38bdf8");

      setHoles((prev) =>
        prev.map((h) => (h.id === holeId ? { ...h, isHit: true } : h))
      );

      setTimeout(() => {
        setHoles((prev) =>
          prev.map((h) => (h.id === holeId ? { ...h, active: false } : h))
        );
      }, 300);
    }
  };

  // Rank Calculation
  const getRank = () => {
    if (score >= 1500) return { rank: "SSS", tickets: 5, couponDiscount: 20, color: "text-amber-400" };
    if (score >= 1000) return { rank: "S", tickets: 4, couponDiscount: 15, color: "text-yellow-400" };
    if (score >= 600) return { rank: "A", tickets: 3, couponDiscount: 10, color: "text-purple-400" };
    if (score >= 300) return { rank: "B", tickets: 2, couponDiscount: 10, color: "text-blue-400" };
    return { rank: "C", tickets: 1, couponDiscount: 5, color: "text-slate-400" };
  };

  // Award rewards on Game Over
  useEffect(() => {
    if (gameState === "gameover" && !hasAwardedReward) {
      setHasAwardedReward(true);
      const rankInfo = getRank();
      if (rankInfo.tickets > 0) {
        onAwardTickets(rankInfo.tickets);
      }
      if (onAwardCoupon && rankInfo.couponDiscount > 0) {
        onAwardCoupon({
          id: `shooter-reward-${rankInfo.couponDiscount}`,
          name: `คูปองมือปราบยอดนักยิง ลด ${rankInfo.couponDiscount}฿`,
          nameEn: `Bandit Hunter ${rankInfo.couponDiscount} THB Off`,
          description: `ส่วนลดพิเศษ ${rankInfo.couponDiscount} บาทจากการปราบโจร Rank ${rankInfo.rank}`,
          descriptionEn: `${rankInfo.couponDiscount} THB Discount from 8-Bit Bandit Shootout`,
          rarity: rankInfo.rank === "SSS" || rankInfo.rank === "S" ? 4 : 3,
          type: "discount_fixed",
          discountAmount: rankInfo.couponDiscount,
          minSpend: 50,
          code: `HUNTER${rankInfo.couponDiscount}`,
          image: "/meal/krapao.jpg",
        });
      }
      if (score > highScore) {
        setHighScore(score);
      }
    }
  }, [gameState, hasAwardedReward, score, highScore, onAwardTickets, onAwardCoupon]);

  const accuracy = shotsFired > 0 ? Math.round((shotsHit / shotsFired) * 100) : 0;

  return (
    <div
      ref={containerRef}
      className={`bandit-shooter-game relative flex flex-col items-center justify-between min-h-[490px] w-full text-white select-none overflow-hidden rounded-2xl bg-stone-950 p-2 sm:p-3 border-2 border-amber-600/60 ${
        isScreenShaking ? "animate-[shake_0.18s_ease-in-out]" : ""
      }`}
      onClick={handleShootingGalleryClick}
      style={{
        cursor: gameState === "playing" ? "crosshair" : "default",
        boxShadow: "0 0 40px rgba(217, 119, 6, 0.25), inset 0 0 30px rgba(0,0,0,0.9)",
      }}
    >
      {/* 8-Bit Retro Styles, Fonts & Scanlines */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,500;0,700;0,800;1,700&family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap');

        .bandit-shooter-game {
          font-family: 'Press Start 2P', 'Chakra Petch', 'Silkscreen', 'Courier New', monospace;
          letter-spacing: 0.3px;
        }

        /* 8-Bit CRT Scanline Overlay Effect */
        .bandit-shooter-game::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%), linear-gradient(90deg, rgba(255, 120, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 180, 255, 0.03));
          z-index: 35;
          background-size: 100% 3px, 6px 100%;
          pointer-events: none;
          opacity: 0.8;
        }

        .arcade-pixel-border {
          border: 3px solid #d97706;
          box-shadow: inset 0 0 0 2px #78350f, 0 0 0 2px #000000;
        }

        .pixel-text-shadow {
          text-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
        }

        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-4px, 3px); }
          40% { transform: translate(4px, -3px); }
          60% { transform: translate(-3px, -2px); }
          80% { transform: translate(3px, 2px); }
        }
      `}</style>

      {/* Red Damage Flash Screen */}
      <AnimatePresence>
        {isRedFlashing && (
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-600/40 z-40 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Floating Damage/Score Texts */}
      {floatingTexts.map((ft) => (
        <motion.div
          key={ft.id}
          initial={{ opacity: 1, scale: 0.8, y: ft.y, x: ft.x }}
          animate={{ opacity: 0, scale: 1.25, y: ft.y - 45 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="absolute z-50 pointer-events-none font-black text-xs sm:text-sm pixel-text-shadow whitespace-nowrap"
          style={{ color: ft.color, left: ft.x, top: ft.y }}
        >
          {ft.text}
        </motion.div>
      ))}

      {/* Bullet Hole Decals */}
      {bulletHoles.map((bh) => (
        <motion.div
          key={bh.id}
          initial={{ scale: 1.4, opacity: 1 }}
          animate={{ scale: 1, opacity: 0.7 }}
          className="absolute z-30 pointer-events-none w-3.5 h-3.5 rounded-full bg-stone-900 border-2 border-stone-600 shadow-[0_0_6px_rgba(0,0,0,0.9)] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          style={{ left: bh.x, top: bh.y }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-black" />
        </motion.div>
      ))}

      {/* Speed Up Notification Banner */}
      <AnimatePresence>
        {speedUpBanner && (
          <motion.div
            initial={{ scale: 0.5, y: -20, opacity: 0 }}
            animate={{ scale: 1.1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: -20, opacity: 0 }}
            className="absolute top-16 z-50 bg-linear-to-r from-red-600 via-amber-500 to-yellow-400 text-slate-950 px-4 py-1.5 rounded-xl font-black text-xs shadow-2xl border-2 border-white flex items-center gap-1.5 animate-bounce"
          >
            <Zap size={14} className="fill-slate-950" />
            <span>⚡ SPEED UP! {speedMultiplier.toFixed(1)}X SPEED ⚡</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP ARCADE HUD HEADER */}
      <div className="w-full flex items-center justify-between px-2 pt-1 pb-2 border-b-2 border-amber-600/50 bg-stone-900/90 rounded-xl z-20">
        {/* Left: Game Title & Sheriff Badge */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-linear-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-sm shadow border border-amber-300">
            🤠
          </div>
          <div>
            <h4 className="font-black text-xs text-white pixel-text-shadow flex items-center gap-1.5">
              <span>{t("ดวลเดือด 8-BIT ยิงจับโจร")}</span>
              <span className="text-[9px] bg-red-600/80 text-white px-1.5 py-0.2 rounded font-black">
                {speedMultiplier.toFixed(1)}x
              </span>
            </h4>
            <div className="flex items-center gap-1 text-[9px] text-amber-300 font-bold">
              <span>LIVES:</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className={`transition-opacity ${i < lives ? "opacity-100" : "opacity-25"}`}
                  >
                    ❤️
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Score, Combo & Time */}
        <div className="flex items-center gap-2">
          {/* Combo Badge */}
          {combo > 1 && (
            <div className="bg-red-600/80 text-white px-2 py-0.5 rounded-lg text-[10px] font-black animate-pulse border border-yellow-300">
              {combo}x COMBO!
            </div>
          )}

          {/* Time Counter */}
          <div className="bg-stone-950 border border-amber-500/60 px-2.5 py-1 rounded-xl text-center">
            <span className="text-[8px] text-amber-400 block font-bold">TIME</span>
            <span
              className={`font-black text-xs ${
                timeLeft <= 10 ? "text-red-400 animate-ping" : "text-white"
              }`}
            >
              {timeLeft}s
            </span>
          </div>

          {/* Score Counter */}
          <div className="bg-stone-950 border border-amber-500/60 px-3 py-1 rounded-xl text-right">
            <span className="text-[8px] text-amber-400 block font-bold">SCORE</span>
            <span className="font-black text-amber-300 text-xs tracking-wider">
              {score.toString().padStart(5, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN GAME VIEWPORT */}
      {gameState === "ready" && (
        /* READY / START SCREEN */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 w-full my-2 flex flex-col items-center justify-center text-center p-3 sm:p-5 bg-linear-to-b from-stone-900 to-black rounded-2xl border-2 border-amber-500/40 relative z-20"
        >
          {/* Wanted Poster Header */}
          <div className="bg-amber-100 text-stone-950 p-3 sm:p-4 rounded-xl border-4 border-amber-900 shadow-2xl max-w-sm w-full mb-3">
            <h2 className="text-sm sm:text-base font-black tracking-widest uppercase border-b-2 border-stone-900 pb-1 mb-2">
              ★ WANTED: BANDITS ★
            </h2>
            <div className="flex items-center justify-center gap-3 py-1">
              <PixelBandit />
              <PixelHostageUncleGet status="tied" />
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-stone-800 leading-relaxed mt-2">
              {t("โจรบุกปล้นร้านลุงเกตุ! เล็งยิงโจรให้ไว อย่าให้โดนตัวประกัน!")}
            </p>
          </div>

          {/* Rules & Features List */}
          <div className="grid grid-cols-2 gap-2 text-left text-[10px] text-amber-200/90 max-w-sm w-full mb-4">
            <div className="bg-stone-900/80 p-2 rounded-lg border border-amber-600/40">
              <span className="text-amber-400 font-bold block">💥 กระสุน 6 นัด:</span>
              <span>ยิงโจรมีโอกาสสุ่มได้กระสุน หรือกด Reload (R)</span>
            </div>
            <div className="bg-stone-900/80 p-2 rounded-lg border border-amber-600/40">
              <span className="text-emerald-400 font-bold block">💖 ช่วยตัวประกัน:</span>
              <span>ยิงโดนโจรที่จับตัวประกัน รับคะแนน x3 + กระสุนฟรี!</span>
            </div>
            <div className="bg-stone-900/80 p-2 rounded-lg border border-amber-600/40">
              <span className="text-red-400 font-bold block">⚡ ความเร็วเพิ่มขึ้น:</span>
              <span>ยิ่งยิงโดนเยอะ โจรจะยิ่งโผล่มาเร็วและไวขึ้น!</span>
            </div>
            <div className="bg-stone-900/80 p-2 rounded-lg border border-amber-600/40">
              <span className="text-yellow-400 font-bold block">🎫 ตั๋วกาชา & คูปอง:</span>
              <span>ทำคะแนนสะสมแลกรางวัลมงคลและตั๋วกาชา</span>
            </div>
          </div>

          {/* Start Button */}
          <button
            type="button"
            onClick={startGame}
            className="w-full max-w-sm py-3.5 rounded-xl bg-linear-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 border-2 border-white"
          >
            <Crosshair size={18} />
            <span>{t("เริ่มดวลปืนล่าโจร! (START GAME)")}</span>
          </button>
        </motion.div>
      )}

      {gameState === "playing" && (
        /* PLAYING VIEW: 6 HOLES GRID (ตีตุ่นสไตล์ยิงโจร) */
        <div className="flex-1 w-full my-2 flex flex-col justify-between z-20">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 flex-1 items-center">
            {holes.map((hole) => (
              <PixelHoleFrame key={hole.id}>
                {hole.active && (
                  <AnimatePresence>
                    {/* 1. NORMAL BANDIT */}
                    {hole.targetType === "bandit" && (
                      <motion.div
                        initial={{ y: 80, scale: 0.8 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 80, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 450, damping: 25 }}
                        onClick={(e) => handleHitTarget(hole.id, "bandit", e)}
                        className="cursor-pointer relative flex flex-col items-center hover:scale-105 active:scale-95 transition-transform"
                      >
                        <PixelBandit
                          isHit={hole.isHit}
                          isAboutToShoot={hole.isAboutToShoot}
                        />
                        {/* Outlaw badge */}
                        <span className="text-[8px] bg-red-600 text-white px-1.5 rounded-full font-black -mt-1 pixel-text-shadow">
                          โจร! 100P
                        </span>
                      </motion.div>
                    )}

                    {/* 2. DYNAMITE CRAZY BANDIT */}
                    {hole.targetType === "dynamite_bandit" && (
                      <motion.div
                        initial={{ y: 80, scale: 0.8 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 80, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 500, damping: 22 }}
                        onClick={(e) => handleHitTarget(hole.id, "bandit", e)}
                        className="cursor-pointer relative flex flex-col items-center hover:scale-105 active:scale-95 transition-transform"
                      >
                        <PixelDynamiteBandit
                          isHit={hole.isHit}
                          isAboutToShoot={hole.isAboutToShoot}
                        />
                        <span className="text-[8px] bg-amber-500 text-slate-950 px-1.5 rounded-full font-black -mt-1 pixel-text-shadow">
                          โจรระเบิด! 150P
                        </span>
                      </motion.div>
                    )}

                    {/* 3. BANDIT HOLDING HOSTAGE (โจรจับตัวประกัน) */}
                    {hole.targetType === "bandit_with_hostage" && (
                      <motion.div
                        initial={{ y: 80, scale: 0.8 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 80, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="relative flex items-end justify-center w-full h-full"
                      >
                        {/* LEFT PART: THE INNOCENT HOSTAGE (DO NOT SHOOT!) */}
                        <div
                          onClick={(e) => handleHitTarget(hole.id, "hostage", e)}
                          className="cursor-pointer relative z-10 hover:brightness-125 active:scale-95 transition -mr-3"
                          title="ตัวประกัน (ห้ามยิง!)"
                        >
                          {hole.hostageType === "uncle" ? (
                            <PixelHostageUncleGet
                              status={
                                hole.isHostageRescued
                                  ? "rescued"
                                  : hole.isHostageHit
                                  ? "hurt"
                                  : "tied"
                              }
                            />
                          ) : hole.hostageType === "cat" ? (
                            <PixelHostageCat
                              status={
                                hole.isHostageRescued
                                  ? "rescued"
                                  : hole.isHostageHit
                                  ? "hurt"
                                  : "tied"
                              }
                            />
                          ) : (
                            <PixelHostageCustomer
                              status={
                                hole.isHostageRescued
                                  ? "rescued"
                                  : hole.isHostageHit
                                  ? "hurt"
                                  : "tied"
                              }
                            />
                          )}
                          <span className="text-[7px] bg-emerald-600 text-white px-1 rounded-full font-black block text-center -mt-1">
                            ตัวประกัน!
                          </span>
                        </div>

                        {/* RIGHT PART: THE BANDIT TO SHOOT (CLICK THIS TO RESCUE!) */}
                        <div
                          onClick={(e) => handleHitTarget(hole.id, "bandit", e)}
                          className="cursor-pointer relative z-20 hover:scale-105 active:scale-95 transition"
                          title="ยิงโจรเพื่อช่วยตัวประกัน!"
                        >
                          <PixelBandit
                            isHit={hole.isHit}
                            isAboutToShoot={hole.isAboutToShoot}
                          />
                          <span className="text-[8px] bg-amber-400 text-slate-950 font-black px-1.5 rounded-full block text-center -mt-1 animate-pulse border border-white">
                            🎯 ยิงโจร! 300P
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* 4. HOSTAGE ALONE (DON'T SHOOT!) */}
                    {hole.targetType === "hostage_alone" && (
                      <motion.div
                        initial={{ y: 80, scale: 0.8 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 80, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={(e) => handleHitTarget(hole.id, "hostage", e)}
                        className="cursor-pointer relative flex flex-col items-center hover:scale-105 active:scale-95 transition-transform"
                      >
                        {hole.hostageType === "uncle" ? (
                          <PixelHostageUncleGet status={hole.isHostageHit ? "hurt" : "tied"} />
                        ) : (
                          <PixelHostageCustomer status={hole.isHostageHit ? "hurt" : "tied"} />
                        )}
                        <span className="text-[8px] bg-purple-600 text-white px-1.5 rounded-full font-black -mt-1">
                          ห้ามยิง! (Hostage)
                        </span>
                      </motion.div>
                    )}

                    {/* 5. AMMO CRATE */}
                    {hole.targetType === "ammo_crate" && (
                      <motion.div
                        initial={{ y: 80, scale: 0.8 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 80, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 450, damping: 25 }}
                        onClick={(e) => handleHitTarget(hole.id, "ammo_crate", e)}
                        className="cursor-pointer relative flex flex-col items-center hover:scale-105 active:scale-95 transition-transform pb-2"
                      >
                        <div className="w-12 h-10 bg-linear-to-b from-amber-400 to-amber-600 rounded-lg border-2 border-yellow-200 shadow-[0_0_12px_rgba(251,191,36,0.8)] flex flex-col items-center justify-center text-slate-950 font-black animate-pulse">
                          <span className="text-base">📦</span>
                          <span className="text-[8px] tracking-wider">+AMMO</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </PixelHoleFrame>
            ))}
          </div>
        </div>
      )}

      {gameState === "gameover" && (
        /* GAME OVER & REWARD SUMMARY SCREEN */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 w-full my-2 flex flex-col items-center justify-between p-3 sm:p-4 bg-linear-to-b from-stone-900 via-stone-950 to-black rounded-2xl border-2 border-amber-500/60 relative z-20 text-center"
        >
          {/* Top Rank Badge */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">
                ★ GAME OVER ★
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white pixel-text-shadow">
              {score >= 1000 ? t("🏆 มือปราบระดับตำนาน!") : t("ปราบโจรสำเร็จ!")}
            </h2>
            <div className="flex items-center justify-center gap-2 my-2">
              <span className="text-xs text-stone-400 font-bold">RANK:</span>
              <span className={`text-2xl font-black ${getRank().color} pixel-text-shadow animate-pulse`}>
                {getRank().rank}
              </span>
            </div>
          </div>

          {/* Stats Breakdown Box */}
          <div className="w-full bg-stone-900/90 border border-amber-500/30 rounded-xl p-3 grid grid-cols-2 gap-2 text-[10px] sm:text-xs text-left">
            <div className="flex justify-between border-b border-stone-700 pb-1">
              <span className="text-stone-400">{t("คะแนนรวม")}:</span>
              <span className="font-black text-amber-300">{score}</span>
            </div>
            <div className="flex justify-between border-b border-stone-700 pb-1">
              <span className="text-stone-400">{t("โจรที่จัดการ")}:</span>
              <span className="font-black text-white">{banditsShot} คน</span>
            </div>
            <div className="flex justify-between border-b border-stone-700 pb-1">
              <span className="text-stone-400">{t("ช่วยตัวประกัน")}:</span>
              <span className="font-black text-emerald-400">{hostagesRescued} คน 💖</span>
            </div>
            <div className="flex justify-between border-b border-stone-700 pb-1">
              <span className="text-stone-400">{t("Max Combo")}:</span>
              <span className="font-black text-red-400">{maxCombo}x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">{t("ความแม่นยำ")}:</span>
              <span className="font-black text-white">{accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">{t("ความเร็วสูงสุด")}:</span>
              <span className="font-black text-yellow-400">{speedMultiplier.toFixed(1)}x</span>
            </div>
          </div>

          {/* Rewards Awarded Box */}
          <div className="w-full bg-linear-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/40 rounded-xl p-2.5 flex items-center justify-between text-xs my-1">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Award size={16} />
              <span>{t("รางวัลที่ได้รับ")}:</span>
            </div>
            <div className="font-black text-white flex items-center gap-2">
              <span className="text-amber-300">🎫 +{getRank().tickets} {t("ตั๋วกาชา")}</span>
              {getRank().couponDiscount > 0 && (
                <span className="text-emerald-300">🏷️ {t("คูปอง")} {getRank().couponDiscount}฿</span>
              )}
            </div>
          </div>

          {/* Lucky Dish Recommendation Button if available */}
          {onSelectDish && (
            <div className="w-full bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-left">
                <span className="text-xl">🥓</span>
                <div>
                  <span className="text-[9px] text-amber-300 font-bold block">
                    🍲 {t("เมนูเสริมพลังมือปราบ")}:
                  </span>
                  <span className="text-xs font-black text-white">
                    {tMenu("กระเพราหมูกรอบ (ข้าวราด)", "name")}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelectDish("กระเพราหมูกรอบ (ข้าวราด)");
                  if (onClose) onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-black shrink-0 transition active:scale-95 flex items-center gap-1 shadow"
              >
                <Utensils size={12} />
                <span>{t("สั่งเลย")}</span>
              </button>
            </div>
          )}

          {/* Bottom Action Buttons */}
          <div className="w-full flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={startGame}
              className="flex-1 py-3 rounded-xl bg-linear-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1.5 border border-white"
            >
              <RotateCcw size={15} />
              <span>{t("เล่นใหม่อีกครั้ง (Play Again)")}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* BOTTOM AMMO & RELOAD CONTROLS BAR (Only visible during gameplay) */}
      {gameState === "playing" && (
        <div className="w-full flex items-center justify-between pt-1 z-20">
          <PixelRevolverHud
            ammo={ammo}
            maxAmmo={MAX_AMMO}
            isReloading={isReloading}
            onReload={handleReload}
          />
          <div className="text-[9px] text-stone-400 font-medium hidden sm:block">
            {t("กด Space หรือ R เพื่อรีโหลดกระสุน")}
          </div>
        </div>
      )}
    </div>
  );
}
