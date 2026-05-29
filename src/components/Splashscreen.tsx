import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX, HelpCircle, Info, Play, Compass, BookOpen, User } from "lucide-react";

interface SplashscreenProps {
  onStart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onShowHelp: () => void;
  onShowAbout: () => void;
}

export default function Splashscreen({
  onStart,
  isMuted,
  onToggleMute,
  onShowHelp,
  onShowAbout,
}: SplashscreenProps) {
  const [birds, setBirds] = useState<{ id: number; delay: number; y: number }[]>([]);

  useEffect(() => {
    // Generate some randomized flying birds
    const items = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: i * 2,
      y: 15 + Math.random() * 20, // percentage height
    }));
    setBirds(items);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-50/80 overflow-hidden flex flex-col justify-between p-6 select-none font-sans">
      {/* GLOWING AMBIENT SUNRISE */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gradient-to-b from-yellow-300 to-amber-300 opacity-70 blur-3xl pointer-events-none" />

      {/* CLOUDS ANIMATION */}
      <div className="absolute top-10 left-0 w-full h-24 pointer-events-none opacity-90 overflow-hidden">
        <motion.div
          animate={{ x: ["-10vw", "110vw"] }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute text-white"
        >
          <svg width="240" height="80" viewBox="0 0 240 80" fill="currentColor">
            <path d="M50 50c0-11 9-20 20-20 5 0 10 2 13 5 5-11 16-18 29-18 17 0 31 12 33 28 4-3 10-5 15-5 14 0 25 11 25 25s-11 25-25 25H70c-11 0-20-9-20-20z" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ x: ["110vw", "-10vw"] }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          className="absolute top-8 text-white/80"
        >
          <svg width="200" height="70" viewBox="0 0 200 70" fill="currentColor">
            <path d="M40 40c0-9 7-16 16-16 4 0 8 2 10 4 4-9 13-14 23-14 14 0 25 10 26 22 3-2 8-4 12-4 11 0 20 9 20 20s-9 20-20 20H56c-9 0-16-7-16-16z" />
          </svg>
        </motion.div>
      </div>

      {/* FLYING BIRDS ANIMATION */}
      {birds.map((bird) => (
        <motion.div
          key={bird.id}
          initial={{ x: "-10%" }}
          animate={{ x: "110%", y: [`${bird.y}%`, `${bird.y - 4}%`, `${bird.y}%`] }}
          transition={{
            x: { repeat: Infinity, duration: 15, delay: bird.delay, ease: "linear" },
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
          }}
          className="absolute pointer-events-none text-sky-800/40"
          style={{ top: `${bird.y}%` }}
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 5c-1.1 2.2-4.4 3-8 3 1.1-.5 2-1.5 2-3 0-1.5-.9-2.5-2-3 3.6 0 6.9.8 8 3 1.1-2.2 4.4-3 8-3-1.1.5-2 1.5-2 3 0 1.5.9 2.5 2 3-3.6 0-6.9-.8-8-3z" />
          </svg>
        </motion.div>
      ))}

      {/* TOP BAR / UTILITY NAVIGATION */}
      <div className="relative z-20 flex justify-between items-center mt-2">
        <div className="flex gap-2">
          <button
            onClick={onShowAbout}
            id="btn_splash_about"
            className="w-10 h-10 rounded-full border border-sky-200 bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white active:scale-95 transition-all shadow-sm cursor-pointer"
            title="Tentang Modul"
          >
            <Info className="w-5 h-5 text-emerald-600" />
          </button>
          <button
            onClick={onShowHelp}
            id="btn_splash_help"
            className="w-10 h-10 rounded-full border border-sky-200 bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white active:scale-95 transition-all shadow-sm cursor-pointer"
            title="Petunjuk Belajar"
          >
            <HelpCircle className="w-5 h-5 text-sky-600" />
          </button>
        </div>
        <button
          onClick={onToggleMute}
          id="btn_splash_music"
          className="w-10 h-10 rounded-full border border-sky-200 bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:bg-white active:scale-95 transition-all shadow-sm cursor-pointer"
          title={isMuted ? "Hidupkan Musik" : "Sunyikan Musik"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-rose-500" />
          ) : (
            <Volume2 className="w-5 h-5 text-emerald-500" />
          )}
        </button>
      </div>

      {/* HERO HERO TITLE */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto px-4 mt-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block"
        >
          {/* Subtle light glow behind title */}
          <div className="absolute inset-0 bg-yellow-400/25 blur-xl rounded-full" />
          <h1 className="relative font-sans text-5xl md:text-6xl font-black tracking-widest text-sky-950 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] uppercase">
            Gunung
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-lg md:text-xl font-bold text-amber-700 mt-2 tracking-wide drop-shadow-sm"
        >
          “Keajaiban Ciptaan Allah”
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[2.5px] w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-4"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xs md:text-sm font-sans text-emerald-800 font-black tracking-wider uppercase bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full border border-emerald-200 shadow-sm"
        >
          IPA Terpadu • Integrasi Al-Qur'an • Etnosains Batak Toba
        </motion.p>
      </div>

      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping opacity-80" style={{ animationDuration: "3s" }} />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-60" style={{ animationDuration: "5s" }} />
        <div className="absolute top-1/3 left-10 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce opacity-50" style={{ animationDuration: "7s" }} />
        <div className="absolute top-1/2 right-12 w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping opacity-70" style={{ animationDuration: "4s" }} />
      </div>

      {/* CINEMATIC PARALLAX LANDSCAPE ILLUSTRATION */}
      <div className="absolute bottom-0 left-0 w-full h-[45%] pointer-events-none z-10 select-none">
        {/* LANDSCAPE BACKGROUND LAYER (LAKE TOBA IN THE MIDDLE) */}
        <div className="absolute inset-0 bg-gradient-to-t from-sky-200 via-sky-100/50 to-transparent" />

        {/* MAJESTIC MOUNTAIN LEFT (DOLOK PUSUK BUHIT STYLE) */}
        <svg
          className="absolute bottom-0 left-[-10%] w-[65%] h-full text-emerald-600"
          viewBox="0 0 300 200"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0 200 L0 100 L70 60 L140 100 L220 150 L300 200 Z" />
          {/* mountain ridge lines */}
          <path d="M70 60 L80 100" stroke="#059669" strokeWidth="2" opacity="0.4" />
          <path d="M140 100 L120 130" stroke="#059669" strokeWidth="2" opacity="0.4" />
        </svg>

        {/* MIDGROUND MOUNTAINS RIGHT */}
        <svg
          className="absolute bottom-0 right-[-10%] w-[60%] h-[90%] text-emerald-500"
          viewBox="0 0 300 200"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0 200 L100 140 L180 80 L300 120 L300 200 Z" />
          {/* mountain ridge lines */}
          <path d="M180 80 L160 120" stroke="#047857" strokeWidth="2" opacity="0.4" />
        </svg>

        {/* DISTANT SAMOSIR ISLAND PENINSULA (middle background) */}
        <svg
          className="absolute bottom-4 left-1/4 w-[50%] h-[30%] text-sky-500/30"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0 100 Q80 40 160 80 T200 100 Z" />
        </svg>

        {/* TRADITIONAL BATAK HOUSE RIGHT (JABU TOBA RUMAH ADAT) */}
        <div className="absolute bottom-0 right-3 w-32 h-28 flex flex-col justify-end z-20">
          <svg viewBox="0 0 120 100" className="w-full h-full text-[#5c3a21]" fill="currentColor">
            {/* Elegant saddleback boat roof of Jabu Batak */}
            <path
              d="M5 25 Q60 -5 115 25 L105 45 Q60 15 15 45 Z"
              fill="#3a2517"
              className="drop-shadow-md"
            />
            {/* The ornate ends of Batak horn roof */}
            <path d="M5 25 L8 24 Q4 10 0 15 Z" fill="#f59e0b" />
            <path d="M115 25 L112 24 Q116 10 120 15 Z" fill="#f59e0b" />

            {/* House body / wood pillars */}
            <rect x="25" y="42" width="70" height="40" fill="#54311c" />
            
            {/* Front vertical decoration (Gorga ornament style) */}
            <path d="M55 42 L65 42 L65 82 L55 82 Z" fill="#dc2626" />
            <path d="M58 45 L62 45 L60 80 Z" fill="#ffffff" />

            {/* Pillars supporting Jabu on stilts */}
            <line x1="30" y1="82" x2="30" y2="100" stroke="#2c170d" strokeWidth="4" />
            <line x1="45" y1="82" x2="45" y2="100" stroke="#2c170d" strokeWidth="4" />
            <line x1="75" y1="82" x2="75" y2="100" stroke="#2c170d" strokeWidth="4" />
            <line x1="90" y1="82" x2="90" y2="100" stroke="#2c170d" strokeWidth="4" />
          </svg>
        </div>

        {/* MIST / KABUT LAYER */}
        <div className="absolute bottom-10 left-0 w-full h-12 bg-gradient-to-t from-transparent via-white/40 to-transparent pointer-events-none mix-blend-screen opacity-70 animate-pulse" />

        {/* WATER LAKE RIPPLE EFFECT OUT FRONT */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[25%] text-sky-400"
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0 0 Q100 8 200 0 T400 0 L400 60 L0 60 Z" />
          {/* Subtle water lines */}
          <path d="M30 15 Q140 22 230 15 T380 15" stroke="#bae6fd" strokeWidth="2" opacity="0.6" fill="none" />
          <path d="M10 25 Q180 32 290 25 T390 25" stroke="#bae6fd" strokeWidth="2" opacity="0.5" fill="none" />
        </svg>
      </div>

      {/* START CORE BUTTON */}
      <div className="relative z-20 flex flex-col items-center justify-center pb-8 mt-4">
        <motion.button
          onClick={onStart}
          id="btn_splash_start"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="group relative px-8 py-4 w-64 rounded-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-amber-500 text-slate-900 font-extrabold text-lg tracking-wider uppercase shadow-[0_10px_25px_rgba(16,185,129,0.3)] cursor-pointer"
        >
          {/* Glowing boundary rings */}
          <span className="absolute inset-0 rounded-full border-2 border-white/40 group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 via-yellow-300 to-amber-400 opacity-20 group-hover:opacity-75 blur transition duration-500" />
          
          <span className="relative flex items-center justify-center gap-2">
            Mulai Belajar
            <Play className="w-5 h-5 fill-current text-slate-900 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </motion.button>
        <p className="text-[10px] text-emerald-800/80 font-bold tracking-wider mt-3 uppercase">
          Sentuh untuk mulai menjelajah
        </p>
      </div>
    </div>
  );
}
