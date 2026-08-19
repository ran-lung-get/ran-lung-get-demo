import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Swords, RotateCcw, Award, Trophy, ChevronRight } from "lucide-react";
import { useLanguage } from "../../../../lib/i18n";
import {
  play8bitSelect,
  play8bitSlash,
  play8bitMagic,
  play8bitHit,
  play8bitHeal,
  play8bitVictory,
} from "../../utils/miniGamesAudio";
import {
  PixelUncleGet,
  PixelChiliGoblin,
  PixelLobsterGolem,
  PixelCrispyPorkLord,
} from "./PixelSprites";

interface UncleGetRpgGameProps {
  onAwardTickets: (amount: number) => void;
  onClose: () => void;
}

interface Enemy {
  id: string;
  name: string;
  title: string;
  maxHp: number;
  hp: number;
  atkMin: number;
  atkMax: number;
  specialMove: string;
  specialMsg: string;
}

const STAGES: Enemy[] = [
  {
    id: "goblin",
    name: "ก็อบลินพริกขี้หนู",
    title: "STAGE 1 : SPICY GOBLIN",
    maxHp: 220,
    hp: 220,
    atkMin: 22,
    atkMax: 38,
    specialMove: "พ่นเมล็ดพริกไฟ",
    specialMsg: "ก็อบลินพริกขี้หนู พ่นเมล็ดพริกไฟแสบร้อน!",
  },
  {
    id: "golem",
    name: "โกเลมกุ้งมังกรกระทะเดือด",
    title: "STAGE 2 : LOBSTER GOLEM",
    maxHp: 480,
    hp: 480,
    atkMin: 38,
    atkMax: 58,
    specialMove: "ก้ามยักษ์กระแทกหม้อ",
    specialMsg: "โกเลมกุ้งมังกร ใช้ก้ามยักษ์ฟาดใส่ผู้กล้าอย่างรุนแรง!",
  },
  {
    id: "boss",
    name: "จอมมารหมูกรอบสามชั้นทองคำ",
    title: "FINAL BOSS : LORD CRISPY PORK",
    maxHp: 850,
    hp: 850,
    atkMin: 55,
    atkMax: 88,
    specialMove: "ระเบิดน้ำมันเดือด 300°C",
    specialMsg: "จอมมารหมูกรอบ ปลดปล่อยพายุระเบิดน้ำมันเดือด 300°C!",
  },
];

export function UncleGetRpgGame({ onAwardTickets }: UncleGetRpgGameProps) {
  const { t } = useLanguage();

  const [gameState, setGameState] = useState<"ready" | "battle" | "gameover" | "victory">("ready");
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [enemy, setEnemy] = useState<Enemy>(STAGES[0]);

  // Player Stats
  const [playerHp, setPlayerHp] = useState(300);
  const maxPlayerHp = 300;
  const [playerMp, setPlayerMp] = useState(100);
  const maxPlayerMp = 100;
  const [atkBuffTurns, setAtkBuffTurns] = useState(0);
  const [isDefending, setIsDefending] = useState(false);
  const [isStunnedEnemy, setIsStunnedEnemy] = useState(false);

  // Items inventory
  const [friedEggs, setFriedEggs] = useState(2);
  const [garlics, setGarlics] = useState(1);

  // Turn and animation flags
  const [menuMode, setMenuMode] = useState<"main" | "skills" | "items">("main");
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isEnemyShaking, setIsEnemyShaking] = useState(false);
  const [isPlayerShaking, setIsPlayerShaking] = useState(false);
  const [isSlashEffect, setIsSlashEffect] = useState(false);
  const [isMagicEffect, setIsMagicEffect] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [earnedTickets, setEarnedTickets] = useState(0);

  const logBoxRef = useRef<HTMLDivElement>(null);

  // Auto-scroll battle log
  useEffect(() => {
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [battleLog]);

  const addLog = (msg: string) => {
    setBattleLog((prev) => [...prev.slice(-6), msg]);
  };

  const startQuest = () => {
    setCurrentStageIdx(0);
    const firstEnemy = { ...STAGES[0], hp: STAGES[0].maxHp };
    setEnemy(firstEnemy);
    setPlayerHp(300);
    setPlayerMp(100);
    setAtkBuffTurns(0);
    setIsDefending(false);
    setIsStunnedEnemy(false);
    setFriedEggs(2);
    setGarlics(1);
    setMenuMode("main");
    setEarnedTickets(0);
    setBattleLog([
      t("⚔️ ผู้กล้า DineOS ชักตะหลิวเหล็กกล้าก้าวเข้าสู่สนามรบ!"),
      `${t("ปรากฏตัวแล้ว!")} "${firstEnemy.name}"!`,
    ]);
    setGameState("battle");
    setIsPlayerTurn(true);
  };

  const nextStage = (nextIdx: number) => {
    if (nextIdx >= STAGES.length) {
      play8bitVictory();
      setGameState("victory");
      const tickets = 5;
      setEarnedTickets(tickets);
      onAwardTickets(tickets);
      return;
    }

    setCurrentStageIdx(nextIdx);
    const nextEnemy = { ...STAGES[nextIdx], hp: STAGES[nextIdx].maxHp };
    setEnemy(nextEnemy);
    setIsStunnedEnemy(false);
    setPlayerMp((mp) => Math.min(maxPlayerMp, mp + 40));
    setPlayerHp((hp) => Math.min(maxPlayerHp, hp + 60));
    addLog(`✨ ด่านต่อไป! "${nextEnemy.name}" ยืนตระหง่านขวางทาง!`);
    setIsPlayerTurn(true);
  };

  // --- PLAYER ACTIONS ---
  const handleAttack = () => {
    if (!isPlayerTurn || gameState !== "battle") return;
    setIsPlayerTurn(false);
    play8bitSelect();

    setTimeout(() => {
      play8bitSlash();
      setIsSlashEffect(true);
      setIsEnemyShaking(true);
      setTimeout(() => {
        setIsSlashEffect(false);
        setIsEnemyShaking(false);
      }, 350);

      const isCrit = Math.random() < 0.25;
      const baseDmg = Math.floor(75 + Math.random() * 35);
      const buffMultiplier = atkBuffTurns > 0 ? 1.5 : 1.0;
      const dmg = Math.floor((isCrit ? baseDmg * 2 : baseDmg) * buffMultiplier);

      const remainingHp = Math.max(0, enemy.hp - dmg);
      setEnemy((e) => ({ ...e, hp: remainingHp }));

      if (isCrit) {
        addLog(`💥 CRITICAL HIT! เพลงดาบสร้างดาเมจ ${dmg} แต้ม!`);
      } else {
        addLog(`🗡️ DineOS ฟาดตะหลิวใส่ ${enemy.name} เป็นดาเมจ ${dmg} แต้ม!`);
      }

      checkEnemyDefeated(remainingHp);
    }, 200);
  };

  const handleUseSkill = (skill: "flame" | "thunder" | "heal") => {
    if (!isPlayerTurn || gameState !== "battle") return;
    play8bitSelect();

    if (skill === "flame") {
      if (playerMp < 25) {
        addLog("⚠️ MP ไม่เพียงพอสำหรับเพลิงผัดกระเพรา!");
        return;
      }
      setIsPlayerTurn(false);
      setPlayerMp((mp) => mp - 25);

      setTimeout(() => {
        play8bitMagic();
        setIsMagicEffect(true);
        setIsEnemyShaking(true);
        setTimeout(() => {
          setIsMagicEffect(false);
          setIsEnemyShaking(false);
        }, 400);

        const buffMultiplier = atkBuffTurns > 0 ? 1.5 : 1.0;
        const dmg = Math.floor((175 + Math.random() * 55) * buffMultiplier);
        const remainingHp = Math.max(0, enemy.hp - dmg);
        setEnemy((e) => ({ ...e, hp: remainingHp }));

        addLog(`🔥 "เพลิงผัดกระเพรา!" โจมตี ${enemy.name} อย่างรุนแรง ${dmg} แต้ม!`);
        checkEnemyDefeated(remainingHp);
      }, 200);
    } else if (skill === "thunder") {
      if (playerMp < 35) {
        addLog("⚠️ MP ไม่เพียงพอสำหรับพริกแกงสายฟ้า!");
        return;
      }
      setIsPlayerTurn(false);
      setPlayerMp((mp) => mp - 35);

      setTimeout(() => {
        play8bitMagic();
        setIsMagicEffect(true);
        setIsEnemyShaking(true);
        setTimeout(() => {
          setIsMagicEffect(false);
          setIsEnemyShaking(false);
        }, 400);

        const buffMultiplier = atkBuffTurns > 0 ? 1.5 : 1.0;
        const dmg = Math.floor((240 + Math.random() * 60) * buffMultiplier);
        const remainingHp = Math.max(0, enemy.hp - dmg);
        setEnemy((e) => ({ ...e, hp: remainingHp }));
        setIsStunnedEnemy(true);

        addLog(`⚡ "พริกแกงสายฟ้า!" ช็อต ${enemy.name} ดาเมจ ${dmg} แต้ม และติด Stun!`);
        checkEnemyDefeated(remainingHp);
      }, 200);
    } else if (skill === "heal") {
      if (playerMp < 20) {
        addLog("⚠️ MP ไม่เพียงพอสำหรับซดต้มยำ!");
        return;
      }
      setIsPlayerTurn(false);
      setPlayerMp((mp) => mp - 20);

      setTimeout(() => {
        play8bitHeal();
        const healAmt = 130;
        setPlayerHp((hp) => Math.min(maxPlayerHp, hp + healAmt));
        addLog(`💖 "ซดต้มยำกุ้ง" ฟื้นฟูพลังชีวิต +${healAmt} HP!`);

        setTimeout(enemyTurn, 1000);
      }, 200);
    }
  };

  const handleDefend = () => {
    if (!isPlayerTurn || gameState !== "battle") return;
    setIsPlayerTurn(false);
    play8bitSelect();

    setIsDefending(true);
    setPlayerMp((mp) => Math.min(maxPlayerMp, mp + 15));
    addLog(`🛡️ DineOS ยกฝาหม้อขึ้นตั้งการ์ด! (ลดดาเมจ 60% + ฟื้น 15 MP)`);

    setTimeout(enemyTurn, 1000);
  };

  const handleUseItem = (itemType: "egg" | "garlic") => {
    if (!isPlayerTurn || gameState !== "battle") return;
    play8bitSelect();

    if (itemType === "egg") {
      if (friedEggs <= 0) return;
      setIsPlayerTurn(false);
      setFriedEggs((n) => n - 1);
      play8bitHeal();
      setPlayerHp((hp) => Math.min(maxPlayerHp, hp + 140));
      addLog(`🍳 ทาน "ไข่ดาวกรอบ" ฟื้นฟูพลังชีวิต +140 HP!`);
      setTimeout(enemyTurn, 1000);
    } else if (itemType === "garlic") {
      if (garlics <= 0) return;
      setIsPlayerTurn(false);
      setGarlics((n) => n - 1);
      play8bitHeal();
      setAtkBuffTurns(3);
      addLog(`🧄 เคี้ยว "กระเทียม" เพิ่ม ATK +50% เป็นเวลา 3 เทิร์น!`);
      setTimeout(enemyTurn, 1000);
    }
  };

  const checkEnemyDefeated = (remainingHp: number) => {
    if (remainingHp <= 0) {
      setTimeout(() => {
        play8bitVictory();
        addLog(`🎉 "${enemy.name}" ถูกปราบลงเรียบร้อยแล้ว!`);
        setTimeout(() => {
          nextStage(currentStageIdx + 1);
        }, 1200);
      }, 500);
    } else {
      setTimeout(enemyTurn, 1100);
    }
  };

  // --- ENEMY TURN ---
  const enemyTurn = () => {
    if (gameState !== "battle") return;

    if (isStunnedEnemy) {
      setIsStunnedEnemy(false);
      addLog(`💫 ${enemy.name} ยังคงติดสตั๊นท์ ไม่สามารถขยับได้!`);
      endRoundTurn();
      return;
    }

    const isSpecial = Math.random() < 0.35;
    let enemyDmg = Math.floor(enemy.atkMin + Math.random() * (enemy.atkMax - enemy.atkMin));
    if (isSpecial) {
      enemyDmg = Math.floor(enemyDmg * 1.4);
      addLog(enemy.specialMsg);
    } else {
      addLog(`👿 ${enemy.name} โจมตีใส่ผู้กล้า DineOS!`);
    }

    if (isDefending) {
      enemyDmg = Math.floor(enemyDmg * 0.4);
      addLog(`🛡️ ฝาหม้อช่วยป้องกัน! ได้รับดาเมจเพียง ${enemyDmg} แต้ม!`);
    } else {
      addLog(`💥 DineOS ได้รับความเสียหาย ${enemyDmg} แต้ม!`);
    }

    play8bitHit();
    setIsPlayerShaking(true);
    setTimeout(() => setIsPlayerShaking(false), 300);

    const nextPlayerHp = Math.max(0, playerHp - enemyDmg);
    setPlayerHp(nextPlayerHp);

    if (nextPlayerHp <= 0) {
      setTimeout(() => {
        setGameState("gameover");
        addLog("💀 ผู้กล้า DineOS หมดสติลง... ความหิวเข้าครอบงำ!");
        const tickets = currentStageIdx >= 1 ? 2 : 1;
        setEarnedTickets(tickets);
        onAwardTickets(tickets);
      }, 600);
    } else {
      endRoundTurn();
    }
  };

  const endRoundTurn = () => {
    setIsDefending(false);
    if (atkBuffTurns > 0) setAtkBuffTurns((t) => t - 1);
    setIsPlayerTurn(true);
    setMenuMode("main");
  };

  return (
    <div className="dq-vintage-mono flex flex-col items-center justify-between min-h-[490px] text-white select-none relative overflow-hidden bg-black p-1 sm:p-2">
      {/* Vintage Monochrome 8-Bit Styles & Scanlines Texture */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,500;0,700;0,800;1,700&family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap');

        .dq-vintage-mono {
          font-family: 'Press Start 2P', 'Chakra Petch', 'Silkscreen', 'Courier New', monospace;
          letter-spacing: 0.3px;
          background-color: #050505;
        }

        /* CRT Scanline Overlay Effect */
        .dq-vintage-mono::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          z-index: 40;
          background-size: 100% 3px, 6px 100%;
          pointer-events: none;
          opacity: 0.85;
        }

        .dq-mono-border {
          border: 3px double #ffffff;
          box-shadow: inset 0 0 0 2px #000000, 0 0 0 1px #000000;
        }

        .dq-mono-outline {
          text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
        }

        .dq-mono-btn {
          border: 2px solid #ffffff;
          background-color: #000000;
          color: #ffffff;
          transition: background-color 0.1s, color 0.1s;
        }
        .dq-mono-btn:hover:not(:disabled) {
          background-color: #ffffff;
          color: #000000;
        }
        .dq-mono-btn:active:not(:disabled) {
          transform: scale(0.97);
        }
      `}</style>

      {/* Top Monochrome Header */}
      <div className="w-full flex items-center justify-between px-2 pt-1 pb-2 border-b-2 border-white/40 bg-black">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 border-2 border-white bg-black flex items-center justify-center font-black text-white text-xs">
            ⚔
          </div>
          <div>
            <h4 className="font-black text-xs sm:text-sm text-white tracking-wider dq-mono-outline">
              {t("DRAGON QUEST 8-BIT")}
            </h4>
            <span className="text-[9px] text-zinc-400 font-bold block">
              {enemy.title}
            </span>
          </div>
        </div>

        <div className="border border-white bg-black px-2 py-0.5 text-right">
          <span className="text-[8px] text-zinc-400 block font-bold">TURN</span>
          <span className="font-black text-white text-xs">
            {isPlayerTurn ? "▶ PLAYER" : "⏳ ENEMY"}
          </span>
        </div>
      </div>

      {/* Battle Screen Area */}
      {gameState === "battle" && (
        <div className="w-full flex-1 flex flex-col justify-between my-2 relative z-10">
          {/* Enemy Display Card (Vintage Monochrome Box) */}
          <div className="w-full bg-black dq-mono-border p-3 flex flex-col items-center justify-center relative overflow-hidden min-h-[145px]">
            {/* Stage Boss Name & HP Status */}
            <div className="w-full max-w-xs flex items-center justify-between text-xs font-black mb-1 px-1 text-white">
              <span>{enemy.name}</span>
              <span>
                HP {enemy.hp}/{enemy.maxHp}
              </span>
            </div>

            {/* Monochrome Segmented HP Bar */}
            <div className="w-full max-w-xs h-2.5 bg-black border border-white p-0.5 mb-2">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
              />
            </div>

            {/* 8-Bit Pixel Monster Sprite */}
            <div className="relative my-1 flex items-center justify-center min-h-[105px]">
              {/* Slash Visual FX */}
              <AnimatePresence>
                {isSlashEffect && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1.4, rotate: 15 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center text-4xl text-white font-black"
                  >
                    / / /
                  </motion.div>
                )}
                {isMagicEffect && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1.6 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center text-4xl text-white font-black"
                  >
                    * * *
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 8-Bit Monochrome Monster Sprites */}
              {enemy.id === "goblin" && <PixelChiliGoblin isHit={isEnemyShaking} />}
              {enemy.id === "golem" && <PixelLobsterGolem isHit={isEnemyShaking} />}
              {enemy.id === "boss" && <PixelCrispyPorkLord isHit={isEnemyShaking} />}
            </div>
          </div>

          {/* Battle Dialogue Text Box */}
          <div
            ref={logBoxRef}
            className="w-full h-20 my-2 bg-black dq-mono-border p-2.5 overflow-y-auto no-scrollbar text-[11px] sm:text-xs text-white leading-relaxed flex flex-col justify-end space-y-1"
          >
            {battleLog.map((log, idx) => (
              <div key={idx} className="tracking-wide">
                &gt; {log}
              </div>
            ))}
          </div>

          {/* Bottom Combat Area: Player Stats (Left) & Command Window (Right) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
            {/* Player Stats Box with 8-Bit Hero Sprite */}
            <div className="bg-black dq-mono-border p-2 sm:p-2.5 flex items-center gap-2 sm:gap-3 text-xs">
              {/* Hero 8-Bit Sprite */}
              <div className="shrink-0 flex items-center justify-center">
                <PixelUncleGet
                  isAttacking={!isPlayerTurn && (isSlashEffect || isMagicEffect)}
                  isHit={isPlayerShaking}
                />
              </div>

              {/* Status Info & HP/MP */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-white text-xs sm:text-sm">
                    {t("ผู้กล้า DineOS")}
                  </span>
                  {atkBuffTurns > 0 && (
                    <span className="text-[9px] border border-white px-1 font-black">
                      ATK+ ({atkBuffTurns})
                    </span>
                  )}
                  {isDefending && (
                    <span className="text-[9px] border border-white px-1 font-black">
                      GUARD
                    </span>
                  )}
                </div>

                {/* HP Bar */}
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-300">
                    <span>HP</span>
                    <span>
                      {playerHp}/{maxPlayerHp}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-black border border-white p-0.5">
                    <div
                      className="h-full bg-white transition-all duration-300"
                      style={{ width: `${(playerHp / maxPlayerHp) * 100}%` }}
                    />
                  </div>
                </div>

                {/* MP Bar */}
                <div className="space-y-0.5 mt-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-300">
                    <span>MP</span>
                    <span>
                      {playerMp}/{maxPlayerMp}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-black border border-white p-0.5">
                    <div
                      className="h-full bg-white transition-all duration-300"
                      style={{ width: `${(playerMp / maxPlayerMp) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 8-Bit Dragon Quest Style Command Menu */}
            <div className="bg-black dq-mono-border p-2 flex flex-col justify-center min-h-[95px]">
              {menuMode === "main" && (
                <div className="grid grid-cols-2 gap-1.5 text-xs font-black">
                  <button
                    type="button"
                    disabled={!isPlayerTurn}
                    onClick={handleAttack}
                    className="py-2 px-1.5 dq-mono-btn rounded-none text-left pl-2 flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    <span>▶</span>
                    <span>{t("โจมตี")}</span>
                  </button>

                  <button
                    type="button"
                    disabled={!isPlayerTurn}
                    onClick={() => {
                      play8bitSelect();
                      setMenuMode("skills");
                    }}
                    className="py-2 px-1.5 dq-mono-btn rounded-none text-left pl-2 flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    <span>▶</span>
                    <span>{t("คาถา/สกิล")}</span>
                  </button>

                  <button
                    type="button"
                    disabled={!isPlayerTurn}
                    onClick={() => {
                      play8bitSelect();
                      setMenuMode("items");
                    }}
                    className="py-2 px-1.5 dq-mono-btn rounded-none text-left pl-2 flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    <span>▶</span>
                    <span>{t("ไอเทม")}</span>
                  </button>

                  <button
                    type="button"
                    disabled={!isPlayerTurn}
                    onClick={handleDefend}
                    className="py-2 px-1.5 dq-mono-btn rounded-none text-left pl-2 flex items-center gap-1 cursor-pointer disabled:opacity-40"
                  >
                    <span>▶</span>
                    <span>{t("ป้องกัน")}</span>
                  </button>
                </div>
              )}

              {/* Skills Sub-menu */}
              {menuMode === "skills" && (
                <div className="flex flex-col gap-1 text-[11px] font-bold">
                  <div className="flex items-center justify-between text-[10px] text-white mb-0.5">
                    <span>{t("เลือกคาถา")}</span>
                    <button
                      type="button"
                      onClick={() => setMenuMode("main")}
                      className="text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      [{t("ย้อนกลับ")}]
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={playerMp < 25}
                    onClick={() => handleUseSkill("flame")}
                    className="p-1 dq-mono-btn flex items-center justify-between cursor-pointer disabled:opacity-40 text-[10px]"
                  >
                    <span>▶ {t("เพลิงผัดกระเพรา")}</span>
                    <span>25MP</span>
                  </button>

                  <button
                    type="button"
                    disabled={playerMp < 35}
                    onClick={() => handleUseSkill("thunder")}
                    className="p-1 dq-mono-btn flex items-center justify-between cursor-pointer disabled:opacity-40 text-[10px]"
                  >
                    <span>▶ {t("พริกแกงสายฟ้า")}</span>
                    <span>35MP</span>
                  </button>

                  <button
                    type="button"
                    disabled={playerMp < 20}
                    onClick={() => handleUseSkill("heal")}
                    className="p-1 dq-mono-btn flex items-center justify-between cursor-pointer disabled:opacity-40 text-[10px]"
                  >
                    <span>▶ {t("ซดต้มยำกุ้ง")}</span>
                    <span>20MP</span>
                  </button>
                </div>
              )}

              {/* Items Sub-menu */}
              {menuMode === "items" && (
                <div className="flex flex-col gap-1 text-[11px] font-bold">
                  <div className="flex items-center justify-between text-[10px] text-white mb-0.5">
                    <span>{t("กระเป๋าเสบียง")}</span>
                    <button
                      type="button"
                      onClick={() => setMenuMode("main")}
                      className="text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      [{t("ย้อนกลับ")}]
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={friedEggs <= 0}
                    onClick={() => handleUseItem("egg")}
                    className="p-1 dq-mono-btn flex items-center justify-between cursor-pointer disabled:opacity-40 text-[10px]"
                  >
                    <span>▶ {t("ไข่ดาวกรอบ (+140 HP)")}</span>
                    <span>x{friedEggs}</span>
                  </button>

                  <button
                    type="button"
                    disabled={garlics <= 0}
                    onClick={() => handleUseItem("garlic")}
                    className="p-1 dq-mono-btn flex items-center justify-between cursor-pointer disabled:opacity-40 text-[10px]"
                  >
                    <span>▶ {t("กระเทียมทองคำ (+50% ATK)")}</span>
                    <span>x{garlics}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Start / Ready Screen (Vintage Monochrome) */}
      {gameState === "ready" && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-3 sm:p-4 space-y-3 relative z-10">
          <div className="flex items-center justify-center gap-4 my-1">
            <PixelUncleGet />
            <span className="text-2xl font-black text-white">VS</span>
            <PixelCrispyPorkLord />
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-wider">
              {t("DRAGON QUEST 8-BIT BATTLE")}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 max-w-xs leading-relaxed">
              {t("สวมบทบาทเป็น ")}
              <span className="text-white font-bold">"{t("ผู้กล้า DineOS")}"</span>
              {t(" ถือตะหลิวคู่ใจประลองยุทธสไตล์ Turn-based RPG 8-Bit ปราบ 3 จอมมารวัตถุดิบ!")}
            </p>
          </div>

          {/* 3 Stage Preview with Monochrome Sprites */}
          <div className="grid grid-cols-3 gap-2 w-full max-w-xs text-[10px] font-bold">
            <div className="bg-black dq-mono-border p-2 flex flex-col items-center justify-center">
              <div className="scale-75 origin-center h-14 w-14 flex items-center justify-center">
                <PixelChiliGoblin />
              </div>
              <span className="text-zinc-300 mt-1">Stage 1</span>
            </div>
            <div className="bg-black dq-mono-border p-2 flex flex-col items-center justify-center">
              <div className="scale-75 origin-center h-14 w-14 flex items-center justify-center">
                <PixelLobsterGolem />
              </div>
              <span className="text-zinc-300 mt-1">Stage 2</span>
            </div>
            <div className="bg-black dq-mono-border p-2 flex flex-col items-center justify-center">
              <div className="scale-75 origin-center h-14 w-14 flex items-center justify-center">
                <PixelCrispyPorkLord />
              </div>
              <span className="text-zinc-300 mt-1">FINAL</span>
            </div>
          </div>

          <button
            type="button"
            onClick={startQuest}
            className="w-full max-w-xs py-3 dq-mono-btn font-black text-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <Swords size={16} />
            <span>{t("เริ่มการผจญภัย (Start Quest)")}</span>
          </button>
        </div>
      )}

      {/* Game Over / Victory Screen (Vintage Monochrome) */}
      {(gameState === "gameover" || gameState === "victory") && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-3 relative z-10">
          <div className="flex items-center justify-center my-1">
            {gameState === "victory" ? (
              <div className="flex items-center gap-3">
                <PixelUncleGet isAttacking={true} />
                <span className="text-4xl text-white">👑</span>
              </div>
            ) : (
              <PixelCrispyPorkLord />
            )}
          </div>

          <div>
            <h3 className="text-xl font-black text-white">
              {gameState === "victory"
                ? t("🏆 ปราบจอมมารหมูกรอบสำเร็จ!")
                : t("💀 พ่ายแพ้ในการต่อสู้!")}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {gameState === "victory"
                ? t("ความสงบสุขแห่งกระทะทองคำกลับคืนมาอีกครั้ง!")
                : t("DineOS หมดสติลง กลับไปฝึกวิชาผัดกระทะแล้วมาสู้ใหม่!")}
            </p>
          </div>

          <div className="bg-black dq-mono-border p-2.5 w-full max-w-xs flex items-center justify-between text-xs">
            <span className="text-zinc-400">{t("ด่านที่ผ่าน")}:</span>
            <span className="text-white font-bold">
              {currentStageIdx + (gameState === "victory" ? 1 : 0)} / 3
            </span>
          </div>

          <div className="bg-black dq-mono-border p-2.5 w-full max-w-xs flex items-center justify-center gap-2">
            <span className="text-base">🎫</span>
            <span className="text-xs font-black text-white">
              {t("ได้รับตั๋วสุ่มกาชา")} +{earnedTickets} {t("ใบ")}!
            </span>
          </div>

          <button
            type="button"
            onClick={startQuest}
            className="w-full max-w-xs py-3 dq-mono-btn font-black text-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            <span>{t("เล่นใหม่อีกครั้ง (Play Again)")}</span>
          </button>
        </div>
      )}
    </div>
  );
}
