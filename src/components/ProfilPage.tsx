import React, { useState } from "react";
import { motion } from "motion/react";
import { User, Award, CheckCircle, Flame, ShieldAlert, BookOpen, Edit2, Check } from "lucide-react";
import { StudentProfile, Badge } from "../types";

interface ProfilPageProps {
  profile: StudentProfile;
  onChangeName: (newName: string) => void;
  onChangeAvatar: (newAvatar: string) => void;
}

const AVATAR_OPTIONS = ["🧗", "🌋", "⛰️", "⛺", "🦅", "🛶", "☕", "🌳", "🕌"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const itemVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 15 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 14 }
  }
};

export default function ProfilPage({
  profile,
  onChangeName,
  onChangeAvatar,
}: ProfilPageProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  const saveName = () => {
    if (tempName.trim()) {
      onChangeName(tempName.trim());
      setIsEditingName(false);
    }
  };

  // Counting science, quran, and tapanuli badges
  const catStats = {
    science: profile.badges.filter((b) => b.category === "science" && b.unlockedAt).length,
    quran: profile.badges.filter((b) => b.category === "quran" && b.unlockedAt).length,
    culture: profile.badges.filter((b) => b.category === "culture" && b.unlockedAt).length,
    allCompleted: profile.completedLessons.length,
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 pb-24 font-sans select-none overflow-y-auto">
      {/* BACKGROUND AVATAR HEADER */}
      <div className="relative p-6 bg-white border-b border-slate-200 pt-10 text-center flex flex-col items-center">
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-emerald-500 to-sky-500 p-1 shadow-md">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-5xl">
            {profile.avatar}
          </div>
        </div>

        {/* AVATAR CHOOSER */}
        <div className="flex gap-2 flex-wrap items-center justify-center mt-4 max-w-xs">
          {AVATAR_OPTIONS.map((av) => (
            <button
              key={av}
              onClick={() => onChangeAvatar(av)}
              className={`w-7 h-7 flex items-center justify-center text-sm rounded-full bg-slate-100 border hover:bg-slate-200 transition-all cursor-pointer ${
                profile.avatar === av ? "border-amber-400 bg-amber-50/80 scale-110 shadow-sm font-black" : "border-transparent"
              }`}
            >
              {av}
            </button>
          ))}
        </div>

        {/* STUDENT NAME EDIT FORM */}
        <div className="mt-4 w-full max-w-sm px-4 flex items-center justify-center gap-2">
          {isEditingName ? (
            <div className="flex items-center gap-1.5 w-full bg-slate-100 rounded-xl p-1 border border-amber-400">
              <input
                type="text"
                value={tempName}
                maxLength={20}
                onChange={(e) => setTempName(e.target.value)}
                className="bg-transparent text-slate-800 px-2 py-1 text-sm outline-none w-full font-black"
              />
              <button
                onClick={saveName}
                className="p-1.5 rounded-lg bg-emerald-500 text-white font-black hover:bg-emerald-400 active:scale-95 cursor-pointer"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-800 tracking-wide">{profile.name}</h3>
              <button
                onClick={() => {
                  setTempName(profile.name);
                  setIsEditingName(true);
                }}
                className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-xs text-amber-700 mt-1.5 font-bold uppercase tracking-wider">Tingkat {profile.level} • Penjelajah Ulayat</p>
      </div>

      {/* CORE STATS BOARD (XP & MATERI) */}
      <div className="grid grid-cols-2 gap-4 px-6 mt-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
          <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Total XP</p>
          <span className="text-2xl font-black text-amber-600">{profile.xp}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
          <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Selesai Belajar</p>
          <span className="text-2xl font-black text-emerald-600">{profile.completedLessons.length} / 5</span>
        </div>
      </div>

      {/* ANALYSIS CHART METERS */}
      <div className="px-6 mt-6">
        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Analisis Kecerdasan Interdisipliner</h4>
        <div className="space-y-4 p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
          {/* SCIENCE METER */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-sky-750 font-black">Sains Fisika & Geologi (IPA)</span>
              <span className="text-slate-600">{Math.round((catStats.science / 2) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(catStats.science / 2) * 100}%` }} />
            </div>
          </div>

          {/* QURAN METER */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-emerald-750 font-black">Integrasi Tafsir Al-Qur'an</span>
              <span className="text-slate-600">{Math.round((catStats.quran / 1) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(catStats.quran / 1) * 100}%` }} />
            </div>
          </div>

          {/* CULTURE / ETHNOSCIENCE METER */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-amber-700 font-black">Etnosains Batak Toba</span>
              <span className="text-slate-600">{Math.round((catStats.culture / 2) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(catStats.culture / 2) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED LIST OF BADGES WITH STATUS LOCKED/UNLOCKED */}
      <div className="px-6 mt-6">
        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-between">
          <span>Daftar Rincian Lencana</span>
          <span className="text-[10px] text-amber-600 font-extrabold normal-case">
            {profile.badges.filter((b) => b.unlockedAt).length} dari {profile.badges.length} Terbuka
          </span>
        </h4>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {profile.badges.map((badge) => {
            const isUnlocked = !!badge.unlockedAt;
            return (
              <motion.div
                key={badge.id}
                variants={itemVariants}
                whileHover={isUnlocked ? { 
                  scale: 1.02, 
                  y: -2, 
                  borderColor: "#fbbf24",
                  boxShadow: "0 10px 20px -5px rgba(245, 158, 11, 0.15)"
                } : { scale: 0.99 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3.5 rounded-2xl flex items-center gap-3.5 border transition-all cursor-pointer relative overflow-hidden ${
                  isUnlocked
                    ? "bg-white border-slate-200 shadow-sm"
                    : "bg-slate-100/50 border-slate-200/60 opacity-60"
                }`}
              >
                {/* Subtle glittering background effect for unlocked badges */}
                {isUnlocked && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />
                )}

                <div
                  className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-lg transition-transform duration-300 relative ${
                    isUnlocked
                      ? "bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md scale-105"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {badge.icon === "Compass" && "🧭"}
                  {badge.icon === "Anchor" && "⚓"}
                  {badge.icon === "Flame" && "🔥"}
                  {badge.icon === "Droplets" && "💧"}
                  {badge.icon === "Map" && "🗺️"}
                  {badge.icon === "Sprout" && "🌱"}
                  {badge.icon === "Trophy" && "🏆"}

                  {/* Glowing ring for unlocked badges */}
                  {isUnlocked && (
                    <span className="absolute inset-0 rounded-full border-2 border-amber-305/40 animate-ping pointer-events-none opacity-40" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center gap-2">
                    <span className={`text-xs font-black truncate ${isUnlocked ? "text-slate-800" : "text-slate-500"}`}>
                      {badge.title}
                    </span>
                    <span
                      className={`text-[8px] uppercase tracking-wider font-extrabold shrink-0 px-2 py-0.5 rounded-full ${
                        isUnlocked 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {isUnlocked ? "Terbuka" : "Terkunci"}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed font-semibold line-clamp-2">
                    {badge.description}
                  </p>
                  {isUnlocked && badge.unlockedAt && (
                    <p className="text-[8px] text-slate-400 mt-1 font-mono">
                      Didapat: {new Date(badge.unlockedAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
