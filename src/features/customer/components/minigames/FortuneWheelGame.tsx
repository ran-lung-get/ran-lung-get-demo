import React from "react";
import { BanditShooterGame, type BanditShooterGameProps } from "./BanditShooterGame";

// Backward compatibility alias: FortuneWheel is replaced by 8-Bit Bandit Shooter
export const FortuneWheelGame = BanditShooterGame;
export type { BanditShooterGameProps as FortuneWheelGameProps };
export default BanditShooterGame;
