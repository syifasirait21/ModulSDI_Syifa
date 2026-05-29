import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass,
  Trophy,
  BookOpen,
  User,
  Heart,
  Volume2,
  VolumeX,
  HelpCircle,
  X,
  Sparkles,
  BookMarked,
  Layers,
  ChevronRight,
  Anchor,
  ShieldAlert,
  Flame,
  Droplet,
  Map,
  Sprout
} from "lucide-react";

import { StudentProfile, LessonContent, Badge } from "./types";
import { LESSONS_DATA, BADGES_DATA } from "./data";

import Splashscreen from "./components/Splashscreen";
import Dashboard from "./components/Dashboard";
import MateriPage from "./components/MateriPage";
import EvaluasiPage from "./components/EvaluasiPage";
import GlosariumPage from "./components/GlosariumPage";
import ProfilPage from "./components/ProfilPage";
import AuthPage from "./components/AuthPage";
import TeacherDashboard from "./components/TeacherDashboard";

const LOCAL_STORAGE_KEY = "modul_gunung_user_profile";
const LOCAL_STORAGE_ALL_USERS = "modul_gunung_all_users";
const LOCAL_STORAGE_ACTIVE_USER = "modul_gunung_active_user";
const LOCAL_STORAGE_ASSIGNMENTS = "modul_gunung_assignments";

interface Assignment {
  id: string;
  title: string;
  instruction: string;
  lessonId: string;
  points: number;
  createdAt: string;
}

const DEFAULT_USERS = [
  {
    username: "siswa",
    name: "Syifa Sirait",
    role: "siswa",
    password: "123",
    avatar: "🌋",
    xp: 155,
    level: 2,
    progress: {
      materi_pasak: 100,
      materi_dinamis: 50,
      materi_air: 0,
      materi_arah: 0,
      materi_subur: 0,
    },
    completedLessons: ["materi_pasak"],
    badges: BADGES_DATA,
    lastProgressUpdate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago (active)
    streak: 3,
    lastActiveDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  {
    username: "togar",
    name: "Togar Tambunan",
    role: "siswa",
    password: "123",
    avatar: "🧑‍💻",
    xp: 80,
    level: 1,
    progress: {
      materi_pasak: 20,
      materi_dinamis: 0,
      materi_air: 0,
      materi_arah: 0,
      materi_subur: 0,
    },
    completedLessons: [],
    badges: BADGES_DATA,
    lastProgressUpdate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago (stagnant for 5 days)
    streak: 0,
    lastActiveDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  {
    username: "uli",
    name: "Uli Situmorang",
    role: "siswa",
    password: "123",
    avatar: "🧗",
    xp: 110,
    level: 1,
    progress: {
      materi_pasak: 40,
      materi_dinamis: 0,
      materi_air: 0,
      materi_arah: 0,
      materi_subur: 0,
    },
    completedLessons: [],
    badges: BADGES_DATA,
    lastProgressUpdate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago (stagnant for 4 days)
    streak: 0,
    lastActiveDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  {
    username: "bintang",
    name: "Bintang Nainggolan",
    role: "siswa",
    password: "123",
    avatar: "💫",
    xp: 210,
    level: 2,
    progress: {
      materi_pasak: 100,
      materi_dinamis: 30,
      materi_air: 0,
      materi_arah: 0,
      materi_subur: 0,
    },
    completedLessons: ["materi_pasak"],
    badges: BADGES_DATA,
    lastProgressUpdate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago (active)
    streak: 1,
    lastActiveDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  },
  {
    username: "guru",
    name: "Ibu Siregar, S.Pd.",
    role: "guru",
    password: "123",
    avatar: "👩‍🏫",
  }
];

const DEFAULT_ASSIGNMENTS: Assignment[] = [
  {
    id: "task_1",
    title: "Kemurnian Air Pegunungan Toba",
    instruction: "Lakukan eksplorasi di modul 'Gunung sebagai Tandon Air Raksasa' hingga mendapat progres tuntas, lalu coba Evaluasi Akhirnya.",
    lessonId: "materi_air",
    points: 50,
    createdAt: new Date().toISOString()
  }
];

// Initializing WebAudio API synthesized ambient soundscape
let audioCtx: AudioContext | null = null;
let windOsc: OscillatorNode | null = null;
let windGain: GainNode | null = null;
let chimesTimer: NodeJS.Timeout | null = null;

function startAmbientSynthesizer() {
  try {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtxClass) return;
    if (audioCtx) {
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      return;
    }

    audioCtx = new AudioCtxClass();
    
    // 1. Synthesize smooth ambient low wind drone
    const osc = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(80, audioCtx.currentTime); // Low bass drone

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(150, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime); // very low background volume

    // Slow frequency LFO modulation to simulate gusts of mountain wind
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.setValueAtTime(0.1, audioCtx.currentTime); // very slow 10s cycles
    lfoGain.gain.setValueAtTime(0.02, audioCtx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    lfo.start();

    windOsc = osc;
    windGain = gain;

    // 2. Schedule occasional pleasant high-altitude brass chimes
    chimesTimer = setInterval(() => {
      triggerSynthesizedChime();
    }, 8000);

  } catch (err) {
    console.warn("WebAudio API is not fully active inside iframe context:", err);
  }
}

function triggerSynthesizedChime() {
  if (!audioCtx || audioCtx.state !== "running") return;
  try {
    // randomized high bell pitch
    const frequencies = [523.25, 587.33, 659.25, 783.99, 880.00]; // Pentatonic scale C-D-E-G-A
    const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];

    const bellOsc = audioCtx.createOscillator();
    const bellGain = audioCtx.createGain();

    bellOsc.type = "sine";
    bellOsc.frequency.setValueAtTime(randomFreq, audioCtx.currentTime);

    // Exponential volume decay (bell ring down)
    bellGain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    bellGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3);

    bellOsc.connect(bellGain);
    bellGain.connect(audioCtx.destination);

    bellOsc.start();
    bellOsc.stop(audioCtx.currentTime + 3);
  } catch (e) {
    // ignore iframe audio constraints
  }
}

function stopAmbientSynthesizer() {
  if (audioCtx && audioCtx.state === "running") {
    audioCtx.suspend();
  }
}

function playCelebrationSound() {
  if (!audioCtx || audioCtx.state !== "running") return;
  try {
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // Beautiful C Major / Pentatonic arpeggio
    notes.forEach((freq, idx) => {
      const osc = audioCtx!.createOscillator();
      const gain = audioCtx!.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, audioCtx!.currentTime + idx * 0.12);
      
      gain.gain.setValueAtTime(0, audioCtx!.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, audioCtx!.currentTime + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx!.currentTime + idx * 0.12 + 1.2);
      
      osc.connect(gain);
      gain.connect(audioCtx!.destination);
      osc.start(audioCtx!.currentTime + idx * 0.12);
      osc.stop(audioCtx!.currentTime + idx * 0.12 + 1.2);
    });
  } catch (err) {
    console.warn("Audio celebration failed", err);
  }
}

const BadgeIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
  switch (iconName) {
    case "Compass": return <Compass className={className} />;
    case "Anchor": return <Anchor className={className} />;
    case "Flame": return <Flame className={className} />;
    case "Droplets": return <Droplet className={className} />;
    case "Map": return <Map className={className} />;
    case "Sprout": return <Sprout className={className} />;
    case "Trophy": return <Trophy className={className} />;
    default: return <Trophy className={className} />;
  }
};

export default function App() {
  // 1. Initial State Load
  const [allUsers, setAllUsers] = useState<any[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_ALL_USERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState<any | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_ACTIVE_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_ASSIGNMENTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_ASSIGNMENTS;
  });

  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.badges || parsed.badges.length !== BADGES_DATA.length) {
          parsed.badges = BADGES_DATA;
        }
        return parsed;
      } catch (e) {}
    }
    return {
      name: "Siswa Penjelajah",
      avatar: "🌋",
      score: 0,
      level: 1,
      xp: 0,
      progress: {
        materi_pasak: 0,
        materi_dinamis: 0,
        materi_air: 0,
        materi_arah: 0,
        materi_subur: 0,
      },
      completedLessons: [],
      badges: BADGES_DATA,
      streak: 0,
      lastActiveDate: "",
    };
  });

  const [screen, setScreen] = useState<"splash" | "auth" | "dashboard" | "teacher_dashboard" | "materi" | "evaluasi" | "glosarium" | "profil">("splash");
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  
  const [isMuted, setIsMuted] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState<Badge | null>(null);

  // Sync users to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ALL_USERS, JSON.stringify(allUsers));
  }, [allUsers]);

  // Sync assignments parsing
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ASSIGNMENTS, JSON.stringify(assignments));
  }, [assignments]);

  // Sync profile when current user is a student
  useEffect(() => {
    if (currentUser && currentUser.role === "siswa") {
      setAllUsers((prevUsers) => {
        const updated = prevUsers.map((u) => {
          if (u.username.toLowerCase() === currentUser.username.toLowerCase()) {
            return {
              ...u,
              name: profile.name,
              avatar: profile.avatar,
              xp: profile.xp,
              level: profile.level,
              progress: profile.progress,
              completedLessons: profile.completedLessons,
              badges: profile.badges,
              lastProgressUpdate: profile.lastProgressUpdate || new Date().toISOString(),
              streak: profile.streak,
              lastActiveDate: profile.lastActiveDate,
            };
          }
          return u;
        });
        return updated;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
    }
  }, [profile]);

  // Handle mutable switch
  useEffect(() => {
    if (!isMuted) {
      startAmbientSynthesizer();
    } else {
      stopAmbientSynthesizer();
    }
  }, [isMuted]);

  // Clean ambient clocks
  useEffect(() => {
    return () => {
      if (chimesTimer) clearInterval(chimesTimer);
    };
  }, []);

  // Sync Screen state on refresh if user is active
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "guru") {
        setScreen("teacher_dashboard");
      } else {
        // Fetch student credentials back into profile to sustain progress after browser loads
        const match = allUsers.find((u) => u.username.toLowerCase() === currentUser.username.toLowerCase());
        if (match) {
          setProfile({
            name: match.name,
            avatar: match.avatar || "🌋",
            score: match.score || 0,
            level: match.level || 1,
            xp: match.xp || 0,
            progress: match.progress || {
              materi_pasak: 0,
              materi_dinamis: 0,
              materi_air: 0,
              materi_arah: 0,
              materi_subur: 0,
            },
            completedLessons: match.completedLessons || [],
            badges: match.badges || BADGES_DATA,
            lastProgressUpdate: match.lastProgressUpdate || new Date().toISOString(),
            streak: match.streak || 0,
            lastActiveDate: match.lastActiveDate || "",
          });
        }
        setScreen("dashboard");
      }
    }
  }, []);

  const handleStartApp = () => {
    setIsMuted(false); // start audio procedurally
    if (currentUser) {
      if (currentUser.role === "guru") {
        setScreen("teacher_dashboard");
      } else {
        setScreen("dashboard");
      }
    } else {
      setScreen("auth");
    }
  };

  const handleLoginSuccess = (user: { username: string; name: string; role: "siswa" | "guru"; avatar: string }) => {
    setCurrentUser(user);
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_USER, JSON.stringify(user));

    if (user.role === "siswa") {
      const match = allUsers.find((u) => u.username.toLowerCase() === user.username.toLowerCase());
      if (match) {
        setProfile({
          name: match.name,
          avatar: match.avatar || "🌋",
          score: match.score || 0,
          level: match.level || 1,
          xp: match.xp || 0,
          progress: match.progress || {
            materi_pasak: 0,
            materi_dinamis: 0,
            materi_air: 0,
            materi_arah: 0,
            materi_subur: 0,
          },
          completedLessons: match.completedLessons || [],
          badges: match.badges || BADGES_DATA,
          lastProgressUpdate: match.lastProgressUpdate || new Date().toISOString(),
          streak: match.streak || 0,
          lastActiveDate: match.lastActiveDate || "",
        });
      } else {
        // default fallback
        setProfile({
          name: user.name,
          avatar: user.avatar,
          score: 0,
          level: 1,
          xp: 0,
          progress: {
            materi_pasak: 0,
            materi_dinamis: 0,
            materi_air: 0,
            materi_arah: 0,
            materi_subur: 0,
          },
          completedLessons: [],
          badges: BADGES_DATA,
          lastProgressUpdate: new Date().toISOString(),
          streak: 0,
          lastActiveDate: "",
        });
      }
      setScreen("dashboard");
      handleUnlockBadge("badge_start");
    } else {
      setScreen("teacher_dashboard");
    }
  };

  const handleRegisterUser = (newUser: { username: string; name: string; role: "siswa" | "guru"; avatar: string; password?: string }) => {
    const schemaUser = {
      ...newUser,
      xp: 0,
      level: 1,
      progress: {
        materi_pasak: 0,
        materi_dinamis: 0,
        materi_air: 0,
        materi_arah: 0,
        materi_subur: 0,
      },
      completedLessons: [],
      badges: BADGES_DATA,
      lastProgressUpdate: new Date().toISOString(),
    };
    setAllUsers((prev) => [...prev, schemaUser]);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(LOCAL_STORAGE_ACTIVE_USER);
    setScreen("auth");
  };

  // Teacher specific events
  const handleCreateAssignment = (title: string, instruction: string, lessonId: string, points: number) => {
    const newAs: Assignment = {
      id: "task_" + Date.now(),
      title,
      instruction,
      lessonId,
      points,
      createdAt: new Date().toISOString()
    };
    setAssignments((prev) => [newAs, ...prev]);
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((as) => as.id !== id));
  };

  const handleDeleteStudent = (username: string) => {
    setAllUsers((prev) => prev.filter((u) => u.username.toLowerCase() !== username.toLowerCase()));
  };

  const handleResetStudent = (username: string) => {
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.username.toLowerCase() === username.toLowerCase()) {
          return {
            ...u,
            xp: 0,
            level: 1,
            progress: {
              materi_pasak: 0,
              materi_dinamis: 0,
              materi_air: 0,
              materi_arah: 0,
              materi_subur: 0,
            },
            completedLessons: [],
            badges: BADGES_DATA.map((b) => ({ ...b, unlockedAt: undefined })),
            lastProgressUpdate: new Date().toISOString(),
          };
        }
        return u;
      })
    );

    if (currentUser && currentUser.username.toLowerCase() === username.toLowerCase()) {
      setProfile({
        name: currentUser.name,
        avatar: currentUser.avatar || "🌋",
        score: 0,
        level: 1,
        xp: 0,
        progress: {
          materi_pasak: 0,
          materi_dinamis: 0,
          materi_air: 0,
          materi_arah: 0,
          materi_subur: 0,
        },
        completedLessons: [],
        badges: BADGES_DATA.map((b) => ({ ...b, unlockedAt: undefined })),
        lastProgressUpdate: new Date().toISOString(),
      });
    }
  };

  const checkAndUpdateStreak = () => {
    setProfile((prev) => {
      const today = new Date();
      // Format as YYYY-MM-DD
      const todayStr = today.getFullYear() + "-" + 
                       String(today.getMonth() + 1).padStart(2, "0") + "-" + 
                       String(today.getDate()).padStart(2, "0");
      
      let currentStreak = prev.streak || 0;
      const lastActive = prev.lastActiveDate; // "YYYY-MM-DD"

      if (lastActive === todayStr) {
        // Already updated today!
        return prev;
      }

      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const yesterdayStr = yesterday.getFullYear() + "-" + 
                           String(yesterday.getMonth() + 1).padStart(2, "0") + "-" + 
                           String(yesterday.getDate()).padStart(2, "0");

      if (!lastActive) {
        currentStreak = 1;
      } else if (lastActive === yesterdayStr) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }

      return {
        ...prev,
        streak: currentStreak,
        lastActiveDate: todayStr,
        lastProgressUpdate: new Date().toISOString(),
      };
    });
  };

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setScreen("materi");
    checkAndUpdateStreak();
  };

  const handleUpdateProgress = (lessonId: string, percentage: number) => {
    setProfile((prev) => {
      const updatedProgress = { ...prev.progress, [lessonId]: percentage };
      
      const completed = [...prev.completedLessons];
      if (percentage === 100 && !completed.includes(lessonId)) {
        completed.push(lessonId);
      }

      return {
        ...prev,
        progress: updatedProgress,
        completedLessons: completed,
        lastProgressUpdate: new Date().toISOString(),
      };
    });
  };

  const handleAddXP = (amount: number) => {
    setProfile((prev) => {
      const updatedXP = prev.xp + amount;
      const updatedLevel = Math.floor(updatedXP / 120) + 1;
      return {
        ...prev,
        xp: updatedXP,
        level: updatedLevel > prev.level ? updatedLevel : prev.level,
        lastProgressUpdate: new Date().toISOString(),
      };
    });
  };

  const handleUnlockBadge = (badgeId: string) => {
    let triggeredBadge: Badge | null = null;
    setProfile((prev) => {
      const match = prev.badges.find((b) => b.id === badgeId);
      if (match && !match.unlockedAt) {
        triggeredBadge = { ...match, unlockedAt: new Date().toISOString() };
        const updatedBadges = prev.badges.map((b) => (b.id === badgeId ? triggeredBadge! : b));
        return { ...prev, badges: updatedBadges };
      }
      return prev;
    });

    if (triggeredBadge) {
      setUnlockedBadge(triggeredBadge);
      playCelebrationSound();
    }
  };

  const handleChangeName = (newName: string) => {
    setProfile((prev) => ({ ...prev, name: newName }));
  };

  const handleChangeAvatar = (newAvatar: string) => {
    setProfile((prev) => ({ ...prev, avatar: newAvatar }));
  };

  const activeLesson = LESSONS_DATA.find((l) => l.id === selectedLessonId);

  return (
    <div className="w-screen h-screen bg-[#f3f9fc] flex flex-col selection:bg-amber-100 selection:text-slate-900 font-sans overflow-hidden relative">
      {/* BACKGROUND GRAPHIC OR DECORATIVE BLUR FOR DESKTOP */}
      <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-sky-200/50 via-emerald-100/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-amber-100/40 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* TOP DESKTOP HEADER BAR (active once splash/auth screen is bypassed for students) */}
      {screen !== "splash" && screen !== "auth" && currentUser?.role !== "guru" && (
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white/95 border-b border-slate-200/80 shadow-sm z-40 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-amber-500 to-amber-600 tracking-widest cursor-pointer" onClick={() => setScreen("dashboard")}>
              GUNUNG
            </span>
            <span className="h-4 w-px bg-slate-200" />
            <span className="text-xs text-slate-600 font-bold tracking-wide">
              Integrasi Sains Modern • Quranic Kauniyah • Adat Batak Toba
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setScreen("dashboard")}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                screen === "dashboard" ? "bg-amber-400 text-slate-950 shadow-[0_2px_10px_rgba(245,158,11,0.25)]" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Belajar</span>
            </button>

            <button
              onClick={() => setScreen("glosarium")}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                screen === "glosarium" ? "bg-amber-400 text-slate-950 shadow-[0_2px_10px_rgba(245,158,11,0.25)]" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Glosari</span>
            </button>

            <button
              onClick={() => setScreen("evaluasi")}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                screen === "evaluasi" ? "bg-amber-400 text-slate-950 shadow-[0_2px_10px_rgba(245,158,11,0.25)]" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Evaluasi</span>
            </button>

            <button
              onClick={() => setScreen("profil")}
              className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                screen === "profil" ? "bg-amber-400 text-slate-950 shadow-[0_2px_10px_rgba(245,158,11,0.25)]" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>Profil</span>
            </button>

            <div className="w-px h-6 bg-slate-200 mx-2" />

            <button
              onClick={() => setIsMuted((v) => !v)}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
              title={isMuted ? "Hidupkan Musik" : "Sunyikan Musik"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              )}
            </button>

            <button
              onClick={() => setShowHelpModal(true)}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
              title="Petunjuk Belajar"
            >
              <HelpCircle className="w-4 h-4 text-sky-500" />
            </button>

            <button
              onClick={() => setShowAboutModal(true)}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
              title="Tentang Modul"
            >
              <BookMarked className="w-4 h-4 text-amber-500" />
            </button>
          </div>
        </header>
      )}

      {/* WEB SCREEN PORTAL CONTAINER */}
      <div className="flex-1 overflow-hidden relative w-full h-full flex flex-col z-10">
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {screen === "splash" && (
              <motion.div
                key="splash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <Splashscreen
                  onStart={handleStartApp}
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted((v) => !v)}
                  onShowHelp={() => setShowHelpModal(true)}
                  onShowAbout={() => setShowAboutModal(true)}
                />
              </motion.div>
            )}

            {screen === "auth" && (
              <motion.div
                key="auth"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <AuthPage
                  allUsers={allUsers}
                  onLoginSuccess={handleLoginSuccess}
                  onRegisterUser={handleRegisterUser}
                />
              </motion.div>
            )}

            {screen === "teacher_dashboard" && currentUser && (
              <motion.div
                key="teacher_dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <TeacherDashboard
                  currentUser={currentUser}
                  allUsers={allUsers}
                  lessons={LESSONS_DATA}
                  assignments={assignments}
                  onCreateAssignment={handleCreateAssignment}
                  onDeleteAssignment={handleDeleteAssignment}
                  onDeleteStudent={handleDeleteStudent}
                  onResetStudent={handleResetStudent}
                  onLogout={handleLogout}
                />
              </motion.div>
            )}

            {screen === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <Dashboard
                  profile={profile}
                  lessons={LESSONS_DATA}
                  assignments={assignments}
                  onSelectLesson={handleSelectLesson}
                  onNavigateTab={(tab) => setScreen(tab as any)}
                  currentTab="dashboard"
                  onLogout={handleLogout}
                />
              </motion.div>
            )}

            {screen === "materi" && activeLesson && (
              <motion.div
                key="materi"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="w-full h-full"
              >
                <MateriPage
                  lesson={activeLesson}
                  profile={profile}
                  onBack={() => setScreen("dashboard")}
                  onUpdateProgress={handleUpdateProgress}
                  onAddXP={handleAddXP}
                  onUnlockBadge={handleUnlockBadge}
                />
              </motion.div>
            )}

            {screen === "evaluasi" && (
              <motion.div
                key="evaluasi"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <EvaluasiPage
                  profile={profile}
                  onAddXP={handleAddXP}
                  onUnlockBadge={handleUnlockBadge}
                />
              </motion.div>
            )}

            {screen === "glosarium" && (
              <motion.div
                key="glosarium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <GlosariumPage />
              </motion.div>
            )}

            {screen === "profil" && (
              <motion.div
                key="profil"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <ProfilPage
                  profile={profile}
                  onChangeName={handleChangeName}
                  onChangeAvatar={handleChangeAvatar}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM ACTIVE NAVIGATION TAB BAR (ONLY OPTIMIZED FOR COZY MOBILE VIEWPORT) */}
        {screen !== "splash" && screen !== "auth" && screen !== "teacher_dashboard" && screen !== "materi" && (
          <div className="md:hidden h-18 bg-white border-t border-slate-200 flex items-center justify-around z-10 px-4 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <button
              onClick={() => setScreen("dashboard")}
              id="nav_dashboard"
              className={`flex flex-col items-center justify-center p-2 text-xs font-bold transition-all cursor-pointer ${
                screen === "dashboard" ? "text-amber-600 font-extrabold" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Compass className="w-5 h-5 mb-1" />
              <span>Belajar</span>
            </button>

            <button
              onClick={() => setScreen("glosarium")}
              id="nav_glosarium"
              className={`flex flex-col items-center justify-center p-2 text-xs font-bold transition-all cursor-pointer ${
                screen === "glosarium" ? "text-amber-600 font-extrabold" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <BookOpen className="w-5 h-5 mb-1" />
              <span>Glosari</span>
            </button>

            <button
              onClick={() => setScreen("evaluasi")}
              id="nav_evaluasi"
              className={`flex flex-col items-center justify-center p-2 text-xs font-bold transition-all cursor-pointer ${
                screen === "evaluasi" ? "text-amber-600 font-extrabold" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Trophy className="w-5 h-5 mb-1" />
              <span>Evaluasi</span>
            </button>

            <button
              onClick={() => setScreen("profil")}
              id="nav_profile"
              className={`flex flex-col items-center justify-center p-2 text-xs font-bold transition-all cursor-pointer ${
                screen === "profil" ? "text-amber-600 font-extrabold" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <User className="w-5 h-5 mb-1" />
              <span>Profil</span>
            </button>
          </div>
        )}
      </div>

      {/* HELP GUIDE GLASS MODAL DIALOG */}
      <AnimatePresence>
        {showHelpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-5 select-none"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 max-w-sm w-full relative space-y-4 text-slate-800"
            >
              <button
                onClick={() => setShowHelpModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <HelpCircle className="w-5 h-5 text-sky-500" />
                <h3 className="text-sm font-extrabold text-slate-900 tracking-wider uppercase">Petunjuk Modul</h3>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed font-sans">
                <p>
                  1. 🎒 <strong>Pelajaran Interaktif</strong>: Pilih salah satu materi pada beranda untuk menjelajah isinya.
                </p>
                <p>
                  2. 📊 <strong>Buka Segmen</strong>: Lintasi tab navigasi atas dari Pemantik, Sains hingga Latihan untuk membangun pemahaman integratif.
                </p>
                <p>
                  3. 🧩 <strong>Latihan Kognitif</strong>: Di tab terakhir setiap materi, selesaikan game menghubungkan kata dan kuis mini pilihan ganda untuk mendapatkan XP bonus.
                </p>
                <p>
                  4. 🏆 <strong>Lencana Luhur</strong>: Dapatkan lencana prestasi seiring bertambahnya tingkat XP dan kelulusan Evaluasi Akhir.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ABOUT APP GLASS MODAL DIALOG */}
      <AnimatePresence>
        {showAboutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-5 select-none"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 max-w-sm w-full relative space-y-4 text-slate-800"
            >
              <button
                onClick={() => setShowAboutModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <BookMarked className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-extrabold text-slate-900 tracking-wider uppercase">Tentang Modul</h3>
              </div>

              <div className="space-y-3.5 text-[11px] text-slate-600 leading-relaxed font-sans">
                <p>
                  <strong>Modul Interaktif Gunung</strong> adalah prototipe media pembelajaran hibrida interdisipliner bertemakan alam semesta.
                </p>
                <p>
                  Disusun dengan me-marge 3 pilar:
                  <br />
                  🟢 <strong>Sains Modern</strong>: Fisika, Isostasi, dan Vulkanologi lempeng tektonik Sumatera.
                  <br />
                  🔵 <strong>Pesan Al-Qur'an</strong>: Penyelidikan teologis diksi ilmiah 'Awtad' dan 'Rawasi'.
                  <br />
                  🟡 <strong>Etnosains Batak</strong>: Mitologi, tata ruang 'Ulu-Toru', serta kearifan air Mual pegunungan Danau Toba.
                  </p>
                <p className="text-[10px] text-slate-400 leading-normal border-t border-slate-100 pt-2 text-center">
                  Diriuhkan untuk melayani tantangan belajar mandiri berorientasi literasi kontekstual EdTech.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BADGE UNLOCKED CELEBRATION MODAL OVERLAY */}
      <AnimatePresence>
        {unlockedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-hidden select-none"
          >
            {/* FLOATING CONFETTI */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 25 }).map((_, i) => {
                const colors = ["#f59e0b", "#10b981", "#0ea5e9", "#ec4899", "#84cc16", "#eab308"];
                const randColor = colors[i % colors.length];
                const startX = Math.random() * 100;
                const delay = Math.random() * 1.5;
                const duration = 2.5 + Math.random() * 1.5;
                return (
                  <motion.div
                    key={i}
                    initial={{ y: -50, x: `${startX}vw`, scale: 0.4 + Math.random() * 0.6, opacity: 1, rotate: 0 }}
                    animate={{
                      y: "110vh",
                      x: `${startX + (Math.random() * 10 - 5)}vw`,
                      rotate: 360 + Math.random() * 360,
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: duration,
                      delay: delay,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: randColor }}
                  />
                );
              })}
            </div>

            {/* MAIN AWARD CARD */}
            <motion.div
              initial={{ scale: 0.85, y: 50, opacity: 0 }}
              animate={{ 
                scale: 1, 
                y: 0, 
                opacity: 1,
                transition: { type: "spring", stiffness: 120, damping: 15 }
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-2 border-amber-300 p-6 md:p-8 rounded-3xl max-w-sm w-full relative text-center space-y-6 shadow-[0_20px_50px_rgba(245,158,11,0.3)]"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 border-white">
                🎉
              </div>

              <div className="pt-4 space-y-1">
                <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block animate-pulse">
                  LENCANA TERBUKA!
                </span>
                <h3 className="text-xl font-black text-slate-805 leading-tight">Selamat, Kamu Hebat!</h3>
              </div>

              {/* ROTATING BACKGROUND SHINE */}
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100 via-transparent to-transparent opacity-70 scale-125 pointer-events-none"
                />
                
                {/* INTERACTIVE FLOATING BADGE FRAME */}
                <motion.div
                  initial={{ scale: 0.5, rotate: -30 }}
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                  transition={{ 
                    scale: { delay: 0.2, type: "spring", stiffness: 180, damping: 12 },
                    rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                  }}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black shadow-[0_10px_25px_rgba(245,158,11,0.4)] flex items-center justify-center text-4xl border-4 border-white relative z-10"
                >
                  <BadgeIcon iconName={unlockedBadge.icon} className="w-12 h-12 stroke-[2.5] text-slate-950" />
                </motion.div>

                <span className="absolute top-2 right-2 text-xl animate-ping">✨</span>
                <span className="absolute bottom-2 left-2 text-xl animate-ping duration-1000">✨</span>
              </div>

              {/* CARD DETAILS */}
              <div className="space-y-2">
                <h4 className="text-lg font-black text-slate-900 tracking-wide font-sans">
                  {unlockedBadge.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                  {unlockedBadge.description}
                </p>
                <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  Kategori: {
                    unlockedBadge.category === "quran" 
                      ? "Integrasi Al-Qur'an" 
                      : unlockedBadge.category === "science" 
                        ? "Etnosains & Sains" 
                        : unlockedBadge.category === "culture" 
                          ? "Adat Batak Toba" 
                          : "Umum"
                  }
                </div>
              </div>

              <div className="bg-amber-50/50 border border-amber-200 p-2.5 rounded-2xl flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                <span className="text-xs font-black text-amber-700">Skor XP Kamu Terpelihara dengan Baik!</span>
              </div>

              {/* OK CLOSE BUTTON */}
              <button
                onClick={() => setUnlockedBadge(null)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer transform active:scale-95"
              >
                Alhamdulillah, Mantap! 🚀
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
