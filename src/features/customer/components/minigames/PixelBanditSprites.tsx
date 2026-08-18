import React from "react";
import { motion } from "motion/react";

// ==========================================
// 8-BIT RETRO BANDIT SHOOTER PIXEL SPRITES
// Crisp pixelated SVG components for arcade feel
// ==========================================

// 1. OUTLAW BANDIT (โจรไอ้เสือ)
export function PixelBandit({
  isHit = false,
  isAboutToShoot = false,
}: {
  isHit?: boolean;
  isAboutToShoot?: boolean;
}) {
  return (
    <motion.div
      animate={
        isHit
          ? { y: [0, 6, 20], rotate: [0, -15, -40], opacity: [1, 0.8, 0] }
          : isAboutToShoot
          ? { x: [-2, 2, -2], scale: [1, 1.06, 1] }
          : { y: [0, -2, 0] }
      }
      transition={
        isHit
          ? { duration: 0.35, ease: "easeOut" }
          : isAboutToShoot
          ? { repeat: Infinity, duration: 0.15 }
          : { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
      }
      className="relative w-20 h-20 sm:w-24 sm:h-24 select-none pointer-events-none"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
      >
        {/* Cowboy / Outlaw Hat */}
        <rect x="7" y="3" width="18" height="2" fill="#78350f" />
        <rect x="10" y="1" width="12" height="3" fill="#92400e" />
        <rect x="9" y="4" width="14" height="2" fill="#b45309" />
        {/* Hat Band */}
        <rect x="9" y="5" width="14" height="1" fill="#dc2626" />

        {/* Head / Mask */}
        <rect x="10" y="6" width="12" height="6" fill="#fcd34d" />
        {/* Evil Eyebrows */}
        <rect x="11" y="7" width="4" height="1" fill="#18181b" />
        <rect x="17" y="7" width="4" height="1" fill="#18181b" />
        {/* Eyes (Fierce Glares) */}
        <rect x="12" y="8" width="2" height="2" fill="#ffffff" />
        <rect x="13" y="8" width="1" height="2" fill="#dc2626" />
        <rect x="17" y="8" width="2" height="2" fill="#ffffff" />
        <rect x="18" y="8" width="1" height="2" fill="#dc2626" />

        {/* Bandit Red Bandana Mask (covers nose & mouth) */}
        <rect x="9" y="10" width="14" height="6" fill="#dc2626" />
        <rect x="11" y="12" width="10" height="4" fill="#b91c1c" />
        {/* Bandana Knots */}
        <rect x="23" y="11" width="2" height="3" fill="#991b1b" />

        {/* Bandit Body / Vest */}
        <rect x="8" y="16" width="16" height="11" fill="#18181b" />
        <rect x="12" y="16" width="8" height="11" fill="#475569" />
        {/* Bullet Belt / Holster */}
        <rect x="9" y="22" width="14" height="2" fill="#78350f" />
        <rect x="11" y="22" width="2" height="2" fill="#fbbf24" />
        <rect x="15" y="22" width="2" height="2" fill="#fbbf24" />
        <rect x="19" y="22" width="2" height="2" fill="#fbbf24" />

        {/* Gun Hand */}
        <rect x="5" y="17" width="3" height="5" fill="#fcd34d" />
        <rect x="3" y="16" width="4" height="3" fill="#71717a" />
        <rect x="2" y="17" width="3" height="1" fill="#18181b" />

        {/* Stolen Gold Sack in other hand */}
        <rect x="22" y="19" width="6" height="7" fill="#d97706" />
        <rect x="24" y="21" width="2" height="3" fill="#fbbf24" />
        <rect x="23" y="18" width="4" height="2" fill="#92400e" />

        {/* Warning Indicator when about to shoot */}
        {isAboutToShoot && (
          <g>
            <rect x="2" y="12" width="5" height="2" fill="#ef4444" />
            <rect x="4" y="10" width="1" height="6" fill="#ef4444" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}

// 2. DYNAMITE CRAZY BANDIT (โจรบ้าพลัง ปาระเบิด)
export function PixelDynamiteBandit({
  isHit = false,
  isAboutToShoot = false,
}: {
  isHit?: boolean;
  isAboutToShoot?: boolean;
}) {
  return (
    <motion.div
      animate={
        isHit
          ? { y: [0, 6, 20], rotate: [0, 25, 60], opacity: [1, 0.8, 0] }
          : isAboutToShoot
          ? { scale: [1, 1.1, 1], rotate: [-4, 4, -4] }
          : { y: [0, -3, 0] }
      }
      transition={
        isHit
          ? { duration: 0.35, ease: "easeOut" }
          : isAboutToShoot
          ? { repeat: Infinity, duration: 0.12 }
          : { repeat: Infinity, duration: 0.6, ease: "easeInOut" }
      }
      className="relative w-20 h-20 sm:w-24 sm:h-24 select-none pointer-events-none"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
      >
        {/* Wild Hair / Bandana */}
        <rect x="8" y="2" width="16" height="4" fill="#451a03" />
        <rect x="6" y="4" width="20" height="3" fill="#1e1b4b" />
        <rect x="7" y="6" width="18" height="2" fill="#3b82f6" />

        {/* Crazy Face */}
        <rect x="9" y="8" width="14" height="9" fill="#fed7aa" />
        {/* Wide Mad Eyes */}
        <rect x="11" y="9" width="3" height="3" fill="#ffffff" />
        <rect x="12" y="10" width="1" height="1" fill="#000000" />
        <rect x="18" y="9" width="3" height="3" fill="#ffffff" />
        <rect x="19" y="10" width="1" height="1" fill="#000000" />

        {/* Evil Wide Grin / Gold Tooth */}
        <rect x="11" y="14" width="10" height="2" fill="#000000" />
        <rect x="12" y="14" width="2" height="1" fill="#ffffff" />
        <rect x="15" y="14" width="2" height="1" fill="#fbbf24" />
        <rect x="18" y="14" width="2" height="1" fill="#ffffff" />

        {/* Body / Shirt */}
        <rect x="8" y="17" width="16" height="10" fill="#ea580c" />
        <rect x="10" y="19" width="12" height="8" fill="#c2410c" />

        {/* Left Hand holding Stick of Dynamite */}
        <rect x="3" y="14" width="4" height="10" fill="#dc2626" />
        <rect x="4" y="11" width="2" height="3" fill="#fde047" />
        {/* Sparking Fuse */}
        <rect x="5" y="9" width="2" height="2" fill="#f97316" />
        <rect x="6" y="7" width="2" height="2" fill="#ef4444" />
        <rect x="4" y="8" width="1" height="1" fill="#ffffff" />

        {/* Right Hand */}
        <rect x="24" y="18" width="4" height="4" fill="#fed7aa" />
      </svg>
    </motion.div>
  );
}

// 3. HOSTAGE: UNCLE GET (ลุงเกตุถูกมัด)
export function PixelHostageUncleGet({
  status = "tied", // "tied" | "rescued" | "hurt"
}: {
  status?: "tied" | "rescued" | "hurt";
}) {
  return (
    <motion.div
      animate={
        status === "rescued"
          ? { y: [0, -12, -4], scale: [1, 1.15, 1.1] }
          : status === "hurt"
          ? { x: [-6, 6, -4, 4, 0], filter: ["brightness(2) saturate(2)", "none"] }
          : { y: [0, -2, 0], rotate: [-2, 2, -2] }
      }
      transition={
        status === "rescued"
          ? { duration: 0.4 }
          : status === "hurt"
          ? { duration: 0.3 }
          : { repeat: Infinity, duration: 0.9, ease: "easeInOut" }
      }
      className="relative w-18 h-18 sm:w-22 sm:h-22 select-none pointer-events-none"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
      >
        {/* Chef Hat */}
        <rect x="11" y="2" width="10" height="3" fill="#ffffff" />
        <rect x="9" y="5" width="14" height="4" fill="#ffffff" />
        <rect x="10" y="9" width="12" height="2" fill="#e4e4e7" />
        <rect x="10" y="11" width="12" height="1" fill="#ef4444" />

        {/* Face */}
        <rect x="10" y="12" width="12" height="7" fill="#fed7aa" />

        {/* Panicked Eyes or Happy Rescued Eyes */}
        {status === "rescued" ? (
          <g>
            {/* Happy ^ ^ eyes */}
            <rect x="12" y="14" width="3" height="1" fill="#18181b" />
            <rect x="13" y="13" width="1" height="1" fill="#18181b" />
            <rect x="17" y="14" width="3" height="1" fill="#18181b" />
            <rect x="18" y="13" width="1" height="1" fill="#18181b" />
          </g>
        ) : (
          <g>
            {/* Worried Wide Eyes */}
            <rect x="12" y="13" width="3" height="3" fill="#ffffff" />
            <rect x="13" y="14" width="2" height="2" fill="#18181b" />
            <rect x="17" y="13" width="3" height="3" fill="#ffffff" />
            <rect x="18" y="14" width="2" height="2" fill="#18181b" />
            {/* Sweat Drop */}
            <rect x="22" y="12" width="2" height="3" fill="#38bdf8" />
          </g>
        )}

        {/* Uncle Get Mustache */}
        <rect x="11" y="17" width="10" height="2" fill="#18181b" />
        <rect x="10" y="18" width="2" height="1" fill="#18181b" />
        <rect x="20" y="18" width="2" height="1" fill="#18181b" />

        {/* Body */}
        <rect x="9" y="19" width="14" height="9" fill="#ffffff" />
        <rect x="12" y="20" width="8" height="6" fill="#f43f5e" />

        {/* Ropes Binding (if tied) */}
        {status !== "rescued" ? (
          <g>
            <rect x="7" y="21" width="18" height="2" fill="#b45309" />
            <rect x="7" y="24" width="18" height="2" fill="#d97706" />
            <rect x="8" y="22" width="3" height="2" fill="#fcd34d" />
            <rect x="14" y="23" width="4" height="2" fill="#fcd34d" />
            <rect x="21" y="22" width="3" height="2" fill="#fcd34d" />
          </g>
        ) : (
          <g>
            {/* Thumbs Up Hands & Sparkles */}
            <rect x="5" y="18" width="4" height="5" fill="#fed7aa" />
            <rect x="6" y="16" width="2" height="3" fill="#fed7aa" />
            <rect x="23" y="18" width="4" height="5" fill="#fed7aa" />
            <rect x="24" y="16" width="2" height="3" fill="#fed7aa" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}

// 4. HOSTAGE: INNOCENT CUSTOMER (ลูกค้าผู้น่าสงสาร)
export function PixelHostageCustomer({
  status = "tied",
}: {
  status?: "tied" | "rescued" | "hurt";
}) {
  return (
    <motion.div
      animate={
        status === "rescued"
          ? { y: [0, -10, -3], scale: [1, 1.15, 1.1] }
          : status === "hurt"
          ? { x: [-6, 6, -4, 4, 0], filter: ["brightness(2) saturate(2)", "none"] }
          : { y: [0, -2, 0] }
      }
      transition={
        status === "rescued"
          ? { duration: 0.4 }
          : status === "hurt"
          ? { duration: 0.3 }
          : { repeat: Infinity, duration: 0.9, ease: "easeInOut" }
      }
      className="relative w-18 h-18 sm:w-22 sm:h-22 select-none pointer-events-none"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
      >
        {/* Hair / Ribbon */}
        <rect x="9" y="3" width="14" height="5" fill="#9333ea" />
        <rect x="7" y="7" width="18" height="6" fill="#7e22ce" />
        <rect x="13" y="2" width="6" height="2" fill="#fbbf24" />

        {/* Face */}
        <rect x="10" y="8" width="12" height="8" fill="#fde047" />

        {status === "rescued" ? (
          <g>
            <rect x="12" y="11" width="3" height="2" fill="#18181b" />
            <rect x="17" y="11" width="3" height="2" fill="#18181b" />
            {/* Rosy Cheeks */}
            <rect x="10" y="13" width="2" height="1" fill="#f43f5e" />
            <rect x="20" y="13" width="2" height="1" fill="#f43f5e" />
            <rect x="14" y="13" width="4" height="2" fill="#dc2626" />
          </g>
        ) : (
          <g>
            {/* Crying Tears */}
            <rect x="12" y="10" width="3" height="3" fill="#ffffff" />
            <rect x="13" y="11" width="2" height="2" fill="#000000" />
            <rect x="17" y="10" width="3" height="3" fill="#ffffff" />
            <rect x="18" y="11" width="2" height="2" fill="#000000" />
            <rect x="11" y="13" width="2" height="4" fill="#38bdf8" />
            <rect x="19" y="13" width="2" height="4" fill="#38bdf8" />
            {/* Screaming mouth */}
            <rect x="14" y="13" width="4" height="2" fill="#991b1b" />
          </g>
        )}

        {/* Dress & Ropes */}
        <rect x="9" y="16" width="14" height="12" fill="#ec4899" />
        {status !== "rescued" && (
          <g>
            <rect x="7" y="19" width="18" height="2" fill="#b45309" />
            <rect x="7" y="23" width="18" height="2" fill="#d97706" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}

// 5. HOSTAGE: LUCKY CAT (น้องแมวร้านลุงเกตุ)
export function PixelHostageCat({
  status = "tied",
}: {
  status?: "tied" | "rescued" | "hurt";
}) {
  return (
    <motion.div
      animate={
        status === "rescued"
          ? { y: [0, -12, -4], rotate: [0, -10, 10, 0] }
          : { y: [0, -3, 0] }
      }
      transition={
        status === "rescued"
          ? { duration: 0.4 }
          : { repeat: Infinity, duration: 0.8, ease: "easeInOut" }
      }
      className="relative w-16 h-16 sm:w-20 sm:h-20 select-none pointer-events-none"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
      >
        {/* Cat Ears */}
        <rect x="8" y="6" width="4" height="4" fill="#f97316" />
        <rect x="9" y="7" width="2" height="2" fill="#fecdd3" />
        <rect x="20" y="6" width="4" height="4" fill="#f97316" />
        <rect x="21" y="7" width="2" height="2" fill="#fecdd3" />

        {/* Head */}
        <rect x="9" y="9" width="14" height="10" fill="#fb923c" />
        <rect x="13" y="10" width="6" height="8" fill="#ffffff" />

        {/* Eyes */}
        <rect x="11" y="11" width="3" height="3" fill="#18181b" />
        <rect x="12" y="11" width="1" height="1" fill="#ffffff" />
        <rect x="18" y="11" width="3" height="3" fill="#18181b" />
        <rect x="19" y="11" width="1" height="1" fill="#ffffff" />

        {/* Nose & Whiskers */}
        <rect x="15" y="14" width="2" height="1" fill="#f43f5e" />
        <rect x="6" y="13" width="4" height="1" fill="#18181b" />
        <rect x="6" y="15" width="4" height="1" fill="#18181b" />
        <rect x="22" y="13" width="4" height="1" fill="#18181b" />
        <rect x="22" y="15" width="4" height="1" fill="#18181b" />

        {/* Body & Rope */}
        <rect x="10" y="19" width="12" height="9" fill="#ea580c" />
        <rect x="13" y="19" width="6" height="7" fill="#ffffff" />
        {status !== "rescued" && (
          <g>
            <rect x="8" y="21" width="16" height="2" fill="#b45309" />
            <rect x="8" y="24" width="16" height="2" fill="#d97706" />
          </g>
        )}
      </svg>
    </motion.div>
  );
}

// 6. POP-UP HIDING SPOT / WOODEN BARREL & WINDOW FRAME
export function PixelHoleFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-28 sm:h-36 bg-linear-to-b from-stone-900 via-stone-950 to-black rounded-2xl border-4 border-amber-800/80 shadow-2xl overflow-hidden flex flex-col items-center justify-end p-1">
      {/* Background Interior Shadow / Wall */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/40 via-stone-900 to-black pointer-events-none" />

      {/* Target popping up inside */}
      <div className="relative z-10 w-full h-full flex items-end justify-center pb-5 overflow-hidden">
        {children}
      </div>

      {/* Front Wooden Crate / Saloon Counter / Parapet */}
      <div className="absolute bottom-0 inset-x-0 h-9 sm:h-12 bg-linear-to-b from-amber-800 to-amber-950 border-t-4 border-amber-600 shadow-inner z-20 flex items-center justify-between px-3 pointer-events-none">
        {/* Wood Texture Planks */}
        <div className="w-full flex items-center justify-between opacity-40">
          <div className="h-full w-1 bg-amber-950" />
          <div className="h-full w-1 bg-amber-950" />
          <div className="h-full w-1 bg-amber-950" />
          <div className="h-full w-1 bg-amber-950" />
        </div>
        {/* Metal Rivet studs */}
        <div className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-amber-300/80 shadow" />
        <div className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-amber-300/80 shadow" />
      </div>
    </div>
  );
}

// 7. 6-BULLET REVOLVER CYLINDER HUD (ลูกโม่ 6 นัด)
export function PixelRevolverHud({
  ammo = 6,
  maxAmmo = 6,
  isReloading = false,
  onReload,
}: {
  ammo: number;
  maxAmmo?: number;
  isReloading?: boolean;
  onReload?: () => void;
}) {
  return (
    <div className="flex items-center gap-2 bg-stone-950/90 border-2 border-amber-500/60 px-3 py-1.5 rounded-xl shadow-lg">
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest mr-1">
          AMMO:
        </span>
        <div className="flex items-center gap-1">
          {Array.from({ length: maxAmmo }).map((_, i) => {
            const hasBullet = i < ammo;
            return (
              <motion.div
                key={i}
                initial={false}
                animate={
                  hasBullet
                    ? { scale: [1.2, 1], opacity: 1 }
                    : { scale: 0.9, opacity: 0.25 }
                }
                className={`w-3.5 h-6 rounded-sm border flex flex-col items-center justify-between p-0.5 transition-colors ${
                  hasBullet
                    ? "bg-linear-to-b from-amber-300 via-amber-400 to-amber-600 border-yellow-200 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                    : "bg-stone-800 border-stone-600"
                }`}
              >
                {/* Bullet Tip */}
                <div
                  className={`w-2 h-2 rounded-t-xs ${
                    hasBullet ? "bg-amber-100" : "bg-stone-700"
                  }`}
                />
                {/* Bullet Body */}
                <div
                  className={`w-2 h-2.5 ${
                    hasBullet ? "bg-amber-500" : "bg-stone-800"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Reload Button / Status */}
      {onReload && (
        <button
          type="button"
          onClick={onReload}
          disabled={isReloading || ammo === maxAmmo}
          className={`ml-2 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition active:scale-95 flex items-center gap-1 cursor-pointer border ${
            ammo === 0
              ? "bg-red-600 hover:bg-red-500 text-white border-white animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.8)]"
              : isReloading
              ? "bg-amber-600/40 text-amber-300 border-amber-500/40 opacity-75"
              : "bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border-amber-500/40"
          }`}
        >
          <motion.span
            animate={isReloading ? { rotate: 360 } : {}}
            transition={isReloading ? { repeat: Infinity, duration: 0.5, ease: "linear" } : {}}
            className="inline-block"
          >
            🔄
          </motion.span>
          <span>{isReloading ? "RELOADING..." : ammo === 0 ? "RELOAD! (R)" : "RELOAD"}</span>
        </button>
      )}
    </div>
  );
}
