import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Award,
  BookOpen,
  ArrowRight,
  Anchor,
  Flame,
  Droplets,
  Map,
  Sprout,
  Compass,
  Trophy,
  Search,
  User,
  Heart,
  LogOut,
  Calendar,
  CheckCircle,
  Clock,
  BookOpenCheck
} from "lucide-react";
import { LessonContent, StudentProfile, Badge } from "../types";
import { LESSONS_DATA } from "../data";

interface Assignment {
  id: string;
  title: string;
  instruction: string;
  lessonId: string;
  points: number;
  createdAt: string;
}

interface DashboardProps {
  profile: StudentProfile;
  lessons: LessonContent[];
  onSelectLesson: (id: string) => void;
  onNavigateTab: (tab: string) => void;
  currentTab: string;
  assignments?: Assignment[];
  onLogout?: () => void;
}

export default function Dashboard({
  profile,
  lessons,
  onSelectLesson,
  onNavigateTab,
  currentTab,
  assignments = [],
  onLogout,
}: DashboardProps) {
  // Translate string icon to Lucide component
  const getIcon = (iconName: string, colorClass: string) => {
    const props = { className: `w-6 h-6 ${colorClass}` };
    switch (iconName) {
      case "Anchor":
        return <Anchor {...props} />;
      case "Flame":
        return <Flame {...props} />;
      case "Droplets":
        return <Droplets {...props} />;
      case "Map":
        return <Map {...props} />;
      case "Sprout":
        return <Sprout {...props} />;
      default:
        return <Compass {...props} />;
    }
  };

  // Color mappings for modern aesthetic borders/badges
  const getColorScheme = (color: string) => {
    switch (color) {
      case "emerald":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          progress: "bg-emerald-500",
          text: "text-emerald-700 font-bold",
          gradient: "from-white to-emerald-50/30",
        };
      case "amber":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          progress: "bg-amber-500",
          text: "text-amber-700 font-bold",
          gradient: "from-white to-amber-50/30",
        };
      case "sky":
        return {
          bg: "bg-sky-50",
          border: "border-sky-200",
          progress: "bg-sky-500",
          text: "text-sky-700 font-bold",
          gradient: "from-white to-sky-50/30",
        };
      default:
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          progress: "bg-amber-500",
          text: "text-amber-700 font-bold",
          gradient: "from-white to-amber-50/30",
        };
    }
  };

  // Calculate overall progress across 5 modules
  const currentTotalProgress = Math.round(
    Object.values(profile.progress).reduce((acc, curr) => acc + curr, 0) / 5
  );

  return (
    <div className="flex flex-col h-full bg-transparent text-slate-800 overflow-y-auto pb-24 font-sans select-none">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* HEADER: USER CARD & XP STATS */}
        <div className="relative p-6 bg-white border border-slate-200/80 mt-4 md:mt-6 rounded-3xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-500 p-0.5 shadow-md shrink-0">
                <div className="w-full h-full rounded-full bg-amber-50 flex items-center justify-center text-2xl">
                  {profile.avatar}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-black">Pelajar Rahmatan Lil Alamin</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-slate-800 tracking-wide">{profile.name}</h2>
                  <span className="px-2 py-0.5 text-[9px] font-black bg-sky-50 border border-sky-200 text-sky-700 rounded-full">Siswa</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-black text-amber-700 shadow-sm">
                <Trophy className="w-3.5 h-3.5 text-amber-500 fill-current" />
                {profile.xp} XP
              </span>
              <span className="text-xs text-slate-600 font-extrabold bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">Tingkat {profile.level}</span>
              
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-2 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  title="Keluar Sesi / Ganti Akun"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              )}
            </div>
          </div>

          {/* PROGRESS AT A GLANCE */}
          <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-black text-slate-600">Kemajuan Belajar Total</span>
              <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">{currentTotalProgress}% selesai</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentTotalProgress}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500"
              />
            </div>
          </div>
        </div>

        {/* DYNAMIC ASSIGNMENTS SECTION (IF ACTIVE) */}
        {assignments && assignments.length > 0 && (
          <div className="mt-6 px-1">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <BookOpenCheck className="w-4 h-4 text-emerald-600" />
              <span>Tugas Mandiri dari Guru ({assignments.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {assignments.map((as) => {
                const lessonOfTask = lessons.find((l) => l.id === as.lessonId);
                const progressOfTask = profile.progress[as.lessonId] || 0;
                const completedOfTask = progressOfTask === 100;

                return (
                  <div
                    key={as.id}
                    className="p-4 bg-white border border-emerald-200 rounded-2xl flex flex-col justify-between space-y-3 shadow-sm"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className="px-2 py-0.5 text-[8px] font-black bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full uppercase tracking-wider">
                          🎁 +{as.points} XP Hadiah
                        </span>
                        {completedOfTask ? (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle className="w-3 h-3" />
                            Selesai
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-amber-700 font-extrabold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 animate-pulse">
                            <Clock className="w-3 h-3" />
                            Dalam Sesi
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-black text-slate-800 mt-2 leading-tight">
                        {as.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {as.instruction}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-2">
                      <span className="text-[10px] text-slate-500 font-extrabold truncate max-w-[150px]">
                        📚 {lessonOfTask?.title || "Materi Umum"}
                      </span>
                      <button
                        onClick={() => onSelectLesson(as.lessonId)}
                        className="py-1 px-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span>{completedOfTask ? "Buka Lagi" : "Kerjakan Tugas"}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* HORIZONTAL/GRID ACHIEVEMENT BADGES */}
        <div className="mt-8 px-1">
          <div className="flex items-center justify-between mb-3 text-sm">
            <span className="font-black text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Lencana Prestasi
            </span>
            <span className="text-xs text-sky-600 font-extrabold animate-pulse">
              {profile.badges.filter((b) => b.unlockedAt).length} dari {profile.badges.length} Terbuka
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3 py-2.5">
            {profile.badges.map((badge) => {
              const isUnlocked = !!badge.unlockedAt;
              return (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
                  className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-2xl border transition-all ${
                    isUnlocked
                      ? "bg-white border-amber-300 shadow-[0_4px_12px_rgba(245,158,11,0.08)] text-slate-800"
                      : "bg-slate-100/60 border-slate-200/50 opacity-50"
                  }`}
                  title={badge.description}
                >
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-lg sm:text-xl mb-1.5 sm:mb-2 shrink-0 ${
                      isUnlocked
                        ? "bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-900 font-bold shadow-sm animate-pulse"
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
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-center font-black leading-tight text-slate-700 line-clamp-2">
                    {badge.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CORE SYLLABUS LESSON CARDS */}
        <div className="mt-8 flex flex-col px-1">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Daftar Modul Interaktif</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, idx) => {
              const progressVal = profile.progress[lesson.id] || 0;
              const scheme = getColorScheme(lesson.color);
              const isCompleted = profile.completedLessons.includes(lesson.id);

              return (
                <motion.div
                  key={lesson.id}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectLesson(lesson.id)}
                  className={`relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 cursor-pointer shadow-md transition-all flex flex-col justify-between`}
                >
                  {/* Subtle decorative colored background edge */}
                  <div className={`absolute top-0 inset-x-0 h-1.5 ${scheme.progress}`} />

                  <div className="relative z-10 flex gap-4 h-full pt-1">
                    <div className={`p-3 rounded-2xl ${scheme.bg} flex items-center justify-center self-start shrink-0`}>
                      {getIcon(lesson.icon, scheme.text)}
                    </div>

                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Materi {idx + 1}</span>
                          {isCompleted && (
                            <span className="text-[9px] px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full font-black uppercase tracking-wider">
                              Tuntas
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-black text-slate-800 leading-tight tracking-wide group-hover:text-amber-500 transition-colors">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                          {lesson.shortDesc}
                        </p>
                      </div>

                      {/* Progress Indicator for this specific lesson card */}
                      <div className="mt-5 flex items-center gap-3 w-full">
                        <div className="flex-1 h-1.5 bg-slate-150 rounded-full overflow-hidden border border-slate-100">
                          <div
                            className={`h-full ${scheme.progress}`}
                            style={{ width: `${progressVal}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-slate-600 shrink-0 w-8 text-right">
                          {progressVal}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center self-center pl-1 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-amber-400 hover:text-slate-950 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* QUICK MOTIVATIVE QURANIC STATEMENT */}
        <div className="mx-1 mt-10 p-5 rounded-3xl border border-dashed border-emerald-300 bg-emerald-50/70 text-center flex flex-col items-center shadow-inner">
          <Heart className="w-5 h-5 text-emerald-500 animate-pulse fill-emerald-500/20" />
          <p className="text-xs text-slate-700 font-extrabold italic mt-2.5 font-serif leading-relaxed px-4 max-w-xl">
            "Maka nikmat Tuhanmu yang manakah yang kamu dustakan?" (QS. Ar-Rahman)
          </p>
          <span className="text-[9px] text-emerald-600 tracking-wider uppercase font-black mt-1.5">Renungan Kalbu</span>
        </div>
      </div>
    </div>
  );
}
