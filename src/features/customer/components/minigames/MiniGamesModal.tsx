import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Gamepad2, Flame, Utensils, Compass } from "lucide-react";
import { useLanguage } from "../../../../lib/i18n";
import { useGachaSystem } from "../../hooks/useGachaSystem";
import type { CouponReward } from "../../types/gacha";
import { WokMasterGame } from "./WokMasterGame";
import { UncleGetRpgGame } from "./UncleGetRpgGame";
import { BanditShooterGame } from "./BanditShooterGame";

interface MiniGamesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDish?: (dishName: string) => void;
}

export function MiniGamesModal({ isOpen, onClose, onSelectDish }: MiniGamesModalProps) {
  const { t } = useLanguage();
  const { state, addTickets, addCoupon } = useGachaSystem();

  const [activeGame, setActiveGame] = useState<"wok" | "rpg" | "shooter">("shooter");
  const [ticketToast, setTicketToast] = useState<{ amount: number; id: number } | null>(null);

  if (!isOpen) return null;

  const handleAwardTickets = (amount: number) => {
    addTickets(amount);
    setTicketToast({ amount, id: Date.now() });
    setTimeout(() => setTicketToast(null), 2500);
  };

  const handleAwardCoupon = (coupon: CouponReward) => {
    addCoupon(coupon);
  };

  const gameTabs = [
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
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Main Arcade Hub Modal */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-lg bg-linear-to-b from-slate-900 via-slate-950 to-black rounded-[32px] border border-amber-400/30 p-4 sm:p-6 shadow-2xl z-10 flex flex-col max-h-[92vh] overflow-hidden text-white"
        style={{
          boxShadow: "0 0 50px rgba(245,158,11,0.15), 0 20px 40px rgba(0,0,0,0.8)",
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-2xl bg-linear-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 text-xl">
              🎮
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                {t("ศูนย์มินิเกม DineOS (Mini Games)")}
              </h3>
              <p className="text-[11px] text-amber-300/80 font-medium">
                {t("เล่นเกมสะสมแต้ม แลกตั๋วสุ่มกาชา & ดูดวงเมนูมงคล")}
              </p>
            </div>
          </div>

          {/* Right: Ticket Counter & Close */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-400/30 px-3 py-1.5 rounded-2xl shadow-inner">
              <span className="text-sm">🎫</span>
              <span className="text-xs font-black text-amber-300">{state.tickets}</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-3 gap-1.5 bg-white/5 p-1.5 rounded-2xl my-3 shrink-0 border border-white/10">
          {gameTabs.map((tab) => {
            const isActive = activeGame === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveGame(tab.id as any)}
                className={`py-2 px-1 rounded-xl text-xs font-black transition flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
                  isActive
                    ? `bg-linear-to-r ${tab.color} text-white shadow-lg`
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-sm sm:text-base">{tab.emoji}</span>
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Ticket Award Toast */}
        <AnimatePresence>
          {ticketToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-linear-to-r from-amber-400 to-yellow-300 text-slate-950 px-4 py-2 rounded-full font-black text-xs shadow-2xl flex items-center gap-1.5 border-2 border-white animate-bounce"
            >
              <Sparkles size={14} className="fill-slate-950" />
              <span>
                {t("ได้รับตั๋วสุ่มกาชา")} +{ticketToast.amount} {t("ใบ")}! 🎫
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Mini-Game View */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {activeGame === "shooter" && (
            <BanditShooterGame
              onAwardTickets={handleAwardTickets}
              onAwardCoupon={handleAwardCoupon}
              onClose={onClose}
              onSelectDish={onSelectDish}
            />
          )}
          {activeGame === "rpg" && (
            <UncleGetRpgGame onAwardTickets={handleAwardTickets} onClose={onClose} />
          )}
          {activeGame === "wok" && (
            <WokMasterGame onAwardTickets={handleAwardTickets} onClose={onClose} />
          )}
        </div>
      </motion.div>
    </div>
  );
}
