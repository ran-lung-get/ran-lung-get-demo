import { useState, useEffect } from "react";
import type { UseNavigateResult } from "@tanstack/react-router";

export function useWebAvatar(navigate?: UseNavigateResult<string>) {
  const [isWebAvatarOpen, setIsWebAvatarOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("avatar-hidden");

    (window as any).ChatWidgetConfig = {
      mode: "realtime-widget",
      avatarUrl: "Botnoi",
      widgetId: "bothotel",
      greetingInstruction: "",
      enableBubble: "false",
      cameraOffset: "0,0,0.5",
      animationUrl: "Greeting",
      defaultAnimationUrl: "Idleloop, idle_breatheloop, Idle_Swayloop",
      randomGeneric: "false",
    };

    if (!document.getElementById("webavatar-jssdk")) {
      const s = document.createElement("script");
      s.id = "webavatar-jssdk";
      s.src = "https://webavatar.didthat.cc/chat-widget.js";
      s.async = true;
      (document.head || document.body).appendChild(s);
    }

    let isConnected = false;
    let animationTimeout: any = null;
    const minInterval = 30;
    const maxInterval = 50;
    const maxLoopTime = 10;
    const animationReset = ["Idleloop", "idle_breatheloop", "Idle_Swayloop"];
    const animations = [
      "GangnamStyle",
      "fusionL",
      "fusionR",
      "Generic_HandFan",
      "Generic_Lazy",
      "Generic_look_around",
      "Generic_Squat",
      "GenericLookAround",
      "Generic_Happy",
      "funnypose",
      "Excited_dance",
      "Emote_OrangeJusticeLoop",
      "Emote_KpopLoop",
      "Emote_InfiniDab_loop",
      "angelTaisou",
      "ArmWaveDanceloop",
      "Bellydancing",
      "chunibyou",
      "Dance_INTERNET_YAMEROloop",
      "Dance_Loli_Kami_Requiem",
      "Dance_monkeyloop",
      "Dance_washing",
      "graceful_dance",
      "HandpumpDanceloop",
      "HipHopDanceloop",
      "Humming",
      "LookAround",
      "LookingBehind",
      "ModelPose",
      "NervouslyLookAround",
      "pose_peace1",
      "Relax",
      "RumbaDanceloop",
      "SalsaDanceloop",
      "SambaDance1loop",
      "SambaDanceloop",
      "ShowFullBody",
      "ToothlessLoop",
    ];

    let resetTimeout: any = null;

    function showAvatar() {
      document.body.classList.remove("avatar-hidden");
      document.body.classList.add("avatar-visible");
    }

    function hideAvatar() {
      document.body.classList.remove("avatar-visible");
      document.body.classList.add("avatar-hidden");
    }

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const root = document.getElementById("root");
      if (root && target && root.contains(target)) return;

      let el: HTMLElement | null = target;
      while (el && el !== document.body) {
        const cls = typeof el.className === "string" ? el.className : "";
        const id = el.id || "";
        if (
          cls.includes("bcw") ||
          cls.includes("fab") ||
          cls.includes("widget-call") ||
          cls.includes("widget-connect") ||
          cls.includes("chat-widget") ||
          id.includes("bcw") ||
          id.includes("widget")
        ) {
          showAvatar();
          break;
        }
        el = el.parentElement;
      }
    };

    document.addEventListener("click", handleGlobalClick, true);

    function clearResetTimeout() {
      if (resetTimeout) {
        clearTimeout(resetTimeout);
        resetTimeout = null;
      }
    }

    function triggerRandomAnimation() {
      if (isConnected) return;
      clearResetTimeout();

      const win = window as any;
      if (win.WebAvatar && typeof win.WebAvatar.loadAnimation === "function") {
        const anim = animations[Math.floor(Math.random() * animations.length)];
        win.WebAvatar.loadAnimation(anim);
        if (typeof win.WebAvatar.setEmotion === "function") {
          win.WebAvatar.setEmotion("happy", 10);
        }

        if (anim.toLowerCase().includes("loop")) {
          resetTimeout = setTimeout(() => {
            if (isConnected) return;
            const resetList = Array.isArray(animationReset)
              ? animationReset
              : typeof animationReset === "string"
              ? (animationReset as string).split(",").map((s) => s.trim()).filter(Boolean)
              : [];
            const resetAnim = resetList[Math.floor(Math.random() * resetList.length)];
            win.WebAvatar.loadAnimation(resetAnim);
            if (typeof win.WebAvatar.setEmotion === "function") {
              win.WebAvatar.setEmotion("idle", 10);
            }
          }, maxLoopTime * 1000);
        }
      }
      scheduleNext();
    }

    function scheduleNext() {
      if (animationTimeout) clearTimeout(animationTimeout);
      const nextInterval = (minInterval + Math.random() * (maxInterval - minInterval)) * 1000;
      animationTimeout = setTimeout(triggerRandomAnimation, nextInterval);
    }

    function startAnimations() {
      scheduleNext();
    }

    function stopAnimations() {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
      }
      clearResetTimeout();
    }

    const handleAvatarReady = () => {
      if (!isConnected) {
        hideAvatar();
        startAnimations();
      } else {
        showAvatar();
      }
    };

    const handleConnect = () => {
      isConnected = true;
      setIsWebAvatarOpen(true);
      showAvatar();
      stopAnimations();
    };

    const handleDisconnect = () => {
      isConnected = false;
      setIsWebAvatarOpen(false);
      hideAvatar();
      startAnimations();
    };

    const handleNavigate = (e: any) => {
      e.preventDefault();
      const target = e.detail?.target;
      if (target && navigate) {
        navigate({ to: target });
      }
    };

    window.addEventListener("avatar-widget-ready", handleAvatarReady);
    window.addEventListener("onConnect", handleConnect);
    window.addEventListener("onDisconnect", handleDisconnect);
    window.addEventListener("webavatar-navigate", handleNavigate);

    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
      window.removeEventListener("avatar-widget-ready", handleAvatarReady);
      window.removeEventListener("onConnect", handleConnect);
      window.removeEventListener("onDisconnect", handleDisconnect);
      window.removeEventListener("webavatar-navigate", handleNavigate);
      stopAnimations();
    };
  }, [navigate]);

  return { isWebAvatarOpen };
}
