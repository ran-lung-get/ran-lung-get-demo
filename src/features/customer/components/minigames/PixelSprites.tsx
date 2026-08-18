import React from "react";
import { motion } from "motion/react";

// Vintage 4-Shade Monochrome Pixel Art SVG Renderer for 8-Bit Dragon Quest

// 1. Hero: ผู้กล้าลุงเกตุ (Hero Uncle Get) - Vintage Monochrome Sprite
export function PixelUncleGet({
  isAttacking,
  isHit,
}: {
  isAttacking?: boolean;
  isHit?: boolean;
}) {
  return (
    <motion.div
      animate={
        isHit
          ? { x: [-8, 8, -6, 6, 0], filter: ["invert(1)", "invert(0)"] }
          : isAttacking
          ? { x: [0, 20, -4, 0], rotate: [0, 15, -5, 0] }
          : { y: [0, -2, 0] }
      }
      transition={
        isAttacking || isHit
          ? { duration: 0.3 }
          : { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
      }
      className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center select-none"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
        style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
      >
        {/* Chef / Hero Hat */}
        <rect x="11" y="2" width="10" height="3" fill="#ffffff" />
        <rect x="9" y="5" width="14" height="4" fill="#ffffff" />
        <rect x="10" y="9" width="12" height="2" fill="#d4d4d8" />
        {/* Hat Headband */}
        <rect x="10" y="11" width="12" height="2" fill="#71717a" />

        {/* Head / Face */}
        <rect x="11" y="13" width="10" height="7" fill="#ffffff" />
        {/* Hair */}
        <rect x="9" y="11" width="2" height="6" fill="#18181b" />
        <rect x="21" y="11" width="2" height="6" fill="#18181b" />
        {/* Eyes (Pixel) */}
        <rect x="13" y="15" width="2" height="2" fill="#000000" />
        <rect x="17" y="15" width="2" height="2" fill="#000000" />
        {/* Uncle Get's Trademark Mustache */}
        <rect x="12" y="18" width="8" height="2" fill="#18181b" />
        <rect x="11" y="19" width="2" height="1" fill="#18181b" />
        <rect x="19" y="19" width="2" height="1" fill="#18181b" />

        {/* Body / Chef Apron Armor */}
        <rect x="9" y="20" width="14" height="8" fill="#71717a" />
        {/* Apron Emblem */}
        <rect x="12" y="21" width="8" height="6" fill="#ffffff" />
        <rect x="14" y="23" width="4" height="2" fill="#18181b" />

        {/* Arms */}
        <rect x="7" y="21" width="2" height="5" fill="#ffffff" />
        <rect x="23" y="21" width="2" height="5" fill="#ffffff" />

        {/* Left Hand: Wok Shield */}
        <rect x="5" y="22" width="3" height="6" fill="#18181b" />
        <rect x="4" y="23" width="5" height="4" fill="#ffffff" />
        <rect x="5" y="24" width="3" height="2" fill="#71717a" />

        {/* Right Hand: Steel Spatula Blade */}
        <rect x="24" y="19" width="2" height="6" fill="#18181b" />
        <rect x="23" y="15" width="4" height="5" fill="#d4d4d8" />
        <rect x="24" y="14" width="2" height="3" fill="#ffffff" />

        {/* Legs / Boots */}
        <rect x="11" y="28" width="4" height="3" fill="#18181b" />
        <rect x="17" y="28" width="4" height="3" fill="#18181b" />
        <rect x="10" y="30" width="5" height="2" fill="#71717a" />
        <rect x="17" y="30" width="5" height="2" fill="#71717a" />
      </svg>
    </motion.div>
  );
}

// 2. Boss 1: ก็อบลินพริกขี้หนู (Spicy Chili Goblin) - Vintage Monochrome Sprite
export function PixelChiliGoblin({
  isHit,
}: {
  isHit?: boolean;
}) {
  return (
    <motion.div
      animate={
        isHit
          ? { x: [-6, 6, -4, 4, 0], filter: ["invert(1)", "invert(0)"] }
          : { y: [0, -3, 0], rotate: [-2, 2, -2] }
      }
      transition={
        isHit ? { duration: 0.3 } : { repeat: Infinity, duration: 1.0, ease: "easeInOut" }
      }
      className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center select-none"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
        style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
      >
        {/* Chili Stem & Horns */}
        <rect x="15" y="2" width="2" height="5" fill="#ffffff" />
        <rect x="13" y="4" width="6" height="2" fill="#d4d4d8" />
        {/* Goblin Horns */}
        <rect x="8" y="5" width="3" height="3" fill="#18181b" />
        <rect x="7" y="3" width="2" height="2" fill="#71717a" />
        <rect x="21" y="5" width="3" height="3" fill="#18181b" />
        <rect x="23" y="3" width="2" height="2" fill="#71717a" />

        {/* Chili Head Shape */}
        <rect x="9" y="7" width="14" height="10" fill="#71717a" />
        <rect x="11" y="8" width="10" height="8" fill="#d4d4d8" />

        {/* Glowing Eyes */}
        <rect x="11" y="10" width="3" height="3" fill="#ffffff" />
        <rect x="12" y="11" width="1" height="1" fill="#000000" />
        <rect x="18" y="10" width="3" height="3" fill="#ffffff" />
        <rect x="19" y="11" width="1" height="1" fill="#000000" />

        {/* Sharp Fang Mouth */}
        <rect x="12" y="14" width="8" height="2" fill="#000000" />
        <rect x="13" y="14" width="1" height="1" fill="#ffffff" />
        <rect x="15" y="14" width="1" height="1" fill="#ffffff" />
        <rect x="18" y="14" width="1" height="1" fill="#ffffff" />

        {/* Body */}
        <rect x="10" y="17" width="12" height="6" fill="#71717a" />
        <rect x="12" y="23" width="8" height="4" fill="#3f3f46" />
        <rect x="14" y="27" width="4" height="3" fill="#18181b" />

        {/* Claws */}
        <rect x="6" y="17" width="4" height="3" fill="#d4d4d8" />
        <rect x="5" y="18" width="2" height="1" fill="#ffffff" />
        <rect x="22" y="17" width="4" height="3" fill="#d4d4d8" />
        <rect x="25" y="18" width="2" height="1" fill="#ffffff" />
      </svg>
    </motion.div>
  );
}

// 3. Boss 2: โกเลมกุ้งมังกร (Lobster Golem) - Vintage Monochrome Sprite
export function PixelLobsterGolem({
  isHit,
}: {
  isHit?: boolean;
}) {
  return (
    <motion.div
      animate={
        isHit
          ? { x: [-8, 8, -5, 5, 0], filter: ["invert(1)", "invert(0)"] }
          : { y: [0, -2, 0], scale: [1, 1.02, 1] }
      }
      transition={
        isHit ? { duration: 0.3 } : { repeat: Infinity, duration: 1.4, ease: "easeInOut" }
      }
      className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center select-none"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
        style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
      >
        {/* Antennae */}
        <rect x="8" y="2" width="2" height="4" fill="#ffffff" />
        <rect x="6" y="1" width="2" height="2" fill="#d4d4d8" />
        <rect x="22" y="2" width="2" height="4" fill="#ffffff" />
        <rect x="24" y="1" width="2" height="2" fill="#d4d4d8" />

        {/* Stone / Shell Head Helmet */}
        <rect x="10" y="6" width="12" height="8" fill="#18181b" />
        <rect x="11" y="5" width="10" height="2" fill="#71717a" />
        <rect x="13" y="7" width="6" height="3" fill="#d4d4d8" />

        {/* Glowing Eyes */}
        <rect x="12" y="9" width="2" height="2" fill="#ffffff" />
        <rect x="18" y="9" width="2" height="2" fill="#ffffff" />
        <rect x="13" y="9" width="1" height="1" fill="#000000" />
        <rect x="19" y="9" width="1" height="1" fill="#000000" />

        {/* Giant Pincers (Left & Right) */}
        <rect x="2" y="9" width="6" height="7" fill="#71717a" />
        <rect x="1" y="7" width="4" height="4" fill="#ffffff" />
        <rect x="2" y="16" width="4" height="3" fill="#3f3f46" />

        <rect x="24" y="9" width="6" height="7" fill="#71717a" />
        <rect x="27" y="7" width="4" height="4" fill="#ffffff" />
        <rect x="26" y="16" width="4" height="3" fill="#3f3f46" />

        {/* Golem Armored Torso */}
        <rect x="9" y="14" width="14" height="10" fill="#18181b" />
        <rect x="11" y="15" width="10" height="7" fill="#71717a" />
        <rect x="10" y="18" width="12" height="1" fill="#ffffff" />
        <rect x="11" y="21" width="10" height="1" fill="#ffffff" />

        {/* Stone Legs */}
        <rect x="10" y="24" width="4" height="6" fill="#3f3f46" />
        <rect x="18" y="24" width="4" height="6" fill="#3f3f46" />
        <rect x="9" y="29" width="5" height="2" fill="#000000" />
        <rect x="18" y="29" width="5" height="2" fill="#000000" />
      </svg>
    </motion.div>
  );
}

// 4. Final Boss: จอมมารหมูกรอบสามชั้นทองคำ (Lord Crispy Pork) - Vintage Monochrome Sprite
export function PixelCrispyPorkLord({
  isHit,
}: {
  isHit?: boolean;
}) {
  return (
    <motion.div
      animate={
        isHit
          ? { x: [-10, 10, -6, 6, 0], filter: ["invert(1)", "invert(0)"] }
          : { y: [0, -4, 0], rotate: [-1, 1, -1] }
      }
      transition={
        isHit ? { duration: 0.35 } : { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
      }
      className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center select-none"
    >
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)]"
        style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
      >
        {/* Crown */}
        <rect x="11" y="1" width="10" height="2" fill="#ffffff" />
        <rect x="10" y="3" width="3" height="3" fill="#ffffff" />
        <rect x="15" y="2" width="2" height="4" fill="#ffffff" />
        <rect x="19" y="3" width="3" height="3" fill="#ffffff" />
        <rect x="15" y="4" width="2" height="2" fill="#000000" />

        {/* Head */}
        <rect x="8" y="6" width="16" height="8" fill="#71717a" />
        <rect x="9" y="7" width="14" height="6" fill="#a1a1aa" />

        {/* Eyes */}
        <rect x="11" y="9" width="3" height="2" fill="#000000" />
        <rect x="12" y="9" width="1" height="1" fill="#ffffff" />
        <rect x="18" y="9" width="3" height="2" fill="#000000" />
        <rect x="19" y="9" width="1" height="1" fill="#ffffff" />

        {/* Snout */}
        <rect x="13" y="11" width="6" height="3" fill="#3f3f46" />
        <rect x="14" y="12" width="1" height="1" fill="#000000" />
        <rect x="17" y="12" width="1" height="1" fill="#000000" />
        <rect x="15" y="14" width="2" height="2" fill="#ffffff" />

        {/* Layer 1: Skin */}
        <rect x="7" y="15" width="18" height="4" fill="#18181b" />
        <rect x="8" y="16" width="16" height="2" fill="#71717a" />
        <rect x="9" y="16" width="2" height="1" fill="#ffffff" />
        <rect x="14" y="16" width="3" height="1" fill="#ffffff" />
        <rect x="20" y="16" width="2" height="1" fill="#ffffff" />

        {/* Layer 2: Fat */}
        <rect x="7" y="19" width="18" height="3" fill="#ffffff" />

        {/* Layer 3: Meat */}
        <rect x="7" y="22" width="18" height="5" fill="#3f3f46" />
        <rect x="8" y="23" width="16" height="3" fill="#71717a" />

        {/* Cape */}
        <rect x="4" y="15" width="3" height="11" fill="#18181b" />
        <rect x="25" y="15" width="3" height="11" fill="#18181b" />

        {/* Boots */}
        <rect x="9" y="27" width="5" height="4" fill="#18181b" />
        <rect x="18" y="27" width="5" height="4" fill="#18181b" />
        <rect x="8" y="30" width="6" height="2" fill="#ffffff" />
        <rect x="18" y="30" width="6" height="2" fill="#ffffff" />
      </svg>
    </motion.div>
  );
}
