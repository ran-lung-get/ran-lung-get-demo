import { motion } from "motion/react";
import { Star, Sparkles, Flame, Shield, Award } from "lucide-react";
import type { CollectibleCard, GachaRarity } from "../../types/gacha";

export function getRarityConfig(rarity: GachaRarity) {
  switch (rarity) {
    case 6:
      return {
        label: "UR",
        starCount: 6,
        starColor: "#ffd700",
        borderColor: "border-fuchsia-400",
        bgGradient: "from-purple-950 via-slate-900 to-indigo-950",
        badgeBg: "bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500",
        glowColor: "rgba(236, 72, 153, 0.45)",
        shadowClass: "shadow-[0_0_25px_rgba(217,70,239,0.4)]",
        titleColor: "text-transparent bg-clip-text bg-linear-to-r from-pink-300 via-purple-200 to-amber-200",
      };
    case 5:
      return {
        label: "SSR",
        starCount: 5,
        starColor: "#fcc14a",
        borderColor: "border-amber-400",
        bgGradient: "from-amber-950/90 via-slate-900 to-yellow-950/80",
        badgeBg: "bg-linear-to-r from-amber-500 to-yellow-400 text-slate-950 font-black",
        glowColor: "rgba(251, 191, 36, 0.4)",
        shadowClass: "shadow-[0_0_20px_rgba(245,158,11,0.35)]",
        titleColor: "text-amber-300",
      };
    case 4:
      return {
        label: "SR",
        starCount: 4,
        starColor: "#c084fc",
        borderColor: "border-purple-400",
        bgGradient: "from-purple-950/80 via-slate-900 to-purple-900/60",
        badgeBg: "bg-linear-to-r from-purple-600 to-indigo-500 text-white",
        glowColor: "rgba(168, 85, 247, 0.3)",
        shadowClass: "shadow-[0_0_15px_rgba(168,85,247,0.25)]",
        titleColor: "text-purple-300",
      };
    default:
      return {
        label: "R",
        starCount: 3,
        starColor: "#60a5fa",
        borderColor: "border-blue-400/80",
        bgGradient: "from-blue-950/70 via-slate-900 to-slate-900",
        badgeBg: "bg-linear-to-r from-blue-600 to-cyan-500 text-white",
        glowColor: "rgba(59, 130, 246, 0.2)",
        shadowClass: "shadow-[0_0_10px_rgba(59,130,246,0.2)]",
        titleColor: "text-blue-300",
      };
  }
}

export function CardItem({
  card,
  isLocked = false,
  count = 1,
  onClick,
  showCount = true,
  size = "md",
}: {
  card: CollectibleCard;
  isLocked?: boolean;
  count?: number;
  onClick?: () => void;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const config = getRarityConfig(card.rarity);

  if (isLocked) {
    return (
      <div
        onClick={onClick}
        className={`relative rounded-2xl border border-slate-800 bg-slate-950/80 p-3 flex flex-col items-center justify-center text-center overflow-hidden cursor-pointer transition-all duration-200 hover:border-slate-700 ${
          size === "sm" ? "h-44" : size === "lg" ? "h-80" : "h-64"
        }`}
      >
        <div className="absolute inset-0 bg-radial from-slate-800/20 to-transparent pointer-events-none" />
        <div className="h-12 w-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mb-2">
          <Shield size={22} />
        </div>
        <span className="text-xs font-bold text-slate-500">???</span>
        <span className="text-[10px] text-slate-600 mt-1">ยังไม่ปลดล็อก</span>
        <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-0.5 opacity-30">
          {Array.from({ length: card.rarity }).map((_, i) => (
            <Star key={i} size={10} className="text-slate-600" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative rounded-2xl border ${config.borderColor} bg-linear-to-b ${config.bgGradient} p-2.5 flex flex-col justify-between text-white overflow-hidden cursor-pointer transition-all duration-300 ${config.shadowClass} ${
        size === "sm" ? "h-48" : size === "lg" ? "h-92" : "h-70"
      }`}
    >
      {/* Holographic Shimmer Overlay for UR / SSR */}
      {(card.rarity === 6 || card.rarity === 5) && (
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-linear-to-tr from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      )}

      {/* Top Bar: Rarity Badge & Duplicate Count */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider shadow-sm flex items-center gap-1 ${config.badgeBg}`}
        >
          {card.rarity === 6 && <Sparkles size={10} className="animate-spin" />}
          {config.label}
        </span>

        {showCount && count > 1 && (
          <span className="bg-slate-900/80 backdrop-blur-xs border border-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-300">
            ×{count}
          </span>
        )}
      </div>

      {/* Card Artwork */}
      <div className="relative my-2 h-28 md:h-32 w-full rounded-xl overflow-hidden border border-white/15 bg-slate-950/60 flex items-center justify-center">
        <img
          src={card.image}
          alt={card.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Stars overlay at bottom of image */}
        <div className="absolute bottom-1.5 left-2 flex items-center gap-0.5 drop-shadow-md">
          {Array.from({ length: config.starCount }).map((_, i) => (
            <Star
              key={i}
              size={11}
              fill={config.starColor}
              color={config.starColor}
              className="drop-shadow-xs"
            />
          ))}
        </div>
      </div>

      {/* Card Info & Power */}
      <div className="relative z-10 flex flex-col">
        <h4 className={`text-xs md:text-sm font-bold truncate leading-tight ${config.titleColor}`}>
          {card.name}
        </h4>
        <p className="text-[10px] text-slate-400 truncate mt-0.5 font-light">
          {card.title}
        </p>

        {/* Flavor Power Stat Bar */}
        <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-[9px] text-slate-400 uppercase font-semibold flex items-center gap-0.5">
            <Flame size={11} className="text-amber-400" /> รสชาติ
          </span>
          <span className="font-extrabold text-amber-300">
            {card.flavorPower.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
