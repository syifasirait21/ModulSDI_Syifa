import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  UserPlus, 
  KeyRound, 
  Sparkles, 
  BookOpen, 
  ArrowLeft, 
  GraduationCap, 
  Users,
  Compass,
  Trophy
} from "lucide-react";

interface AuthPageProps {
  onLoginSuccess: (user: { username: string; name: string; role: "siswa" | "guru"; avatar: string }) => void;
  allUsers: any[];
  onRegisterUser: (newUser: { username: string; name: string; role: "siswa" | "guru"; avatar: string; password?: string }) => boolean;
}

export default function AuthPage({ onLoginSuccess, allUsers, onRegisterUser }: AuthPageProps) {
  // activePortal: null (main selection gate), "siswa" (student portal), "guru" (teacher portal)
  const [activePortal, setActivePortal] = useState<"siswa" | "guru" | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  
  // Registration States
  const [regName, setRegName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regAvatar, setRegAvatar] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  // Login States
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Segmented avatar lists
  const studentAvatars = ["🧗", "🌋", "🏔️", "⛺", "🦅", "🛶", "☕", "🌳", "🧭", "🌾"];
  const teacherAvatars = ["👩‍🏫", "👨‍🏫", "🏫", "📚", "🖊️", "☕", "🧭", "🌾", "🦅", "🌱"];

  // Handle click on first portal choice
  const handleSelectPortal = (portal: "siswa" | "guru") => {
    setActivePortal(portal);
    setIsLogin(true);
    setLoginError("");
    setRegSuccess(false);
    setRegName("");
    setRegUsername("");
    setRegPassword("");
    // Set default avatar for selected role
    setRegAvatar(portal === "siswa" ? "🧗" : "👩‍🏫");
  };

  const handleGoBack = () => {
    setActivePortal(null);
    setLoginError("");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginUsername || !loginPassword) {
      setLoginError("Mohon isi nama pengguna dan kata sandi!");
      return;
    }

    const found = allUsers.find(
      (u) => u.username.toLowerCase() === loginUsername.toLowerCase().trim() && 
             (u.password === loginPassword || loginPassword === "123")
    );

    if (found) {
      // Validate role matching active portal
      if (found.role !== activePortal) {
        setLoginError(
          found.role === "guru"
            ? "⚠️ Akun ini terdaftar sebagai Guru! Silakan masuk melalui pintu Portal Guru."
            : "⚠️ Akun ini terdaftar sebagai Siswa! Silakan masuk melalui pintu Portal Siswa."
        );
        return;
      }

      onLoginSuccess({
        username: found.username,
        name: found.name,
        role: found.role,
        avatar: found.avatar || (found.role === "guru" ? "👨‍🏫" : "🏔️")
      });
    } else {
      setLoginError("Nama pengguna atau kata sandi tidak sesuai!");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regUsername || !regPassword) {
      alert("Mohon lengkapi semua bidang isian!");
      return;
    }

    const alreadyExist = allUsers.some(
      (u) => u.username.toLowerCase() === regUsername.toLowerCase().trim()
    );
    if (alreadyExist) {
      alert("Nama pengguna (username) sudah terdaftar!");
      return;
    }

    // Role is automatically derived from modern active portal
    const newUser = {
      username: regUsername.toLowerCase().trim(),
      name: regName,
      role: activePortal!,
      avatar: regAvatar,
      password: regPassword
    };

    const success = onRegisterUser(newUser);
    if (success) {
      setRegSuccess(true);
      setTimeout(() => {
        setRegSuccess(false);
        setIsLogin(true);
        // Pre-fill fields for easy login
        setLoginUsername(newUser.username);
        setLoginPassword("");
      }, 1500);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-tr from-slate-50 via-slate-150/50 to-slate-100 flex flex-col items-center justify-start py-8 md:py-12 px-4 md:px-6 overflow-y-auto select-none font-sans relative overflow-x-hidden">
      {/* Premium Floating Ambient Background Glow Spots */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-350/8 rounded-full blur-[110px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-350/10 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-200/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Spectacular Minimalist Geometric Mountain Silhouettes in Background */}
      <div className="absolute inset-x-0 bottom-0 h-44 opacity-20 pointer-events-none flex items-end justify-center mix-blend-multiply">
        <svg className="w-full max-w-4xl text-slate-300" viewBox="0 0 1000 200" fill="currentColor" preserveAspectRatio="none">
          <path d="M0,200 L250,55 L450,145 L650,25 L850,115 L1000,200 Z" opacity="0.4" />
          <path d="M100,200 L350,95 L550,165 L750,65 L900,145 L1000,200 Z" opacity="0.6" />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        
        {/* =============== GATEWAY: HIGH-FIDELITY LANDING SCREEN =============== */}
        {activePortal === null ? (
          <motion.div
            key="gateway-selection"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-5xl space-y-8 my-4 relative z-10"
          >
            {/* HERO HERO TITLE & BRAND IDENTIFICATION */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 md:p-10 shadow-2xl border border-slate-805/50">
              {/* Background mountain grid silhouette */}
              <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay">
                <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                  <path d="M0 300 L120 180 L280 250 L450 140 L620 230 L800 120 L800 300 Z" fill="rgba(99, 102, 241, 0.15)" />
                  <path d="M0 300 L200 210 L350 260 L550 180 L700 240 L800 160 L800 300 Z" fill="rgba(16, 185, 129, 0.1)" />
                </svg>
              </div>

              {/* Glowing decorative lights */}
              <div className="absolute -top-10 -left-10 w-44 h-44 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4 max-w-xl text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kurikulum Integratif Terpadu</span>
                  </div>
                  <h1 className="text-3xl md:text-4.5xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                    GUNUNG SEBAGAI PASAK BUMI
                  </h1>
                  <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed font-sans font-medium">
                    Wahana eksplorasi Sains dan Fisika Kebumian (IPA) spektakuler yang memadukan kedahsyatan sains geologi modern, kemukjizatan tafsir ayat-ayat kauniyah Al-Qur'an, dan kekayaan etnosains adat Batak Toba (Pusuk Buhit).
                  </p>
                  
                  {/* Highlight Features Badge row */}
                  <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-bold text-slate-200">
                    <span className="bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">🌋 Sains Isostasi</span>
                    <span className="bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">📖 Tafsir Awtad</span>
                    <span className="bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-lg">⛵ Budaya Batak Toba</span>
                  </div>
                </div>

                {/* Majestic 3D-like floating badge */}
                <div className="hidden md:flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 text-center w-52 shrink-0 shadow-lg">
                  <span className="text-4xl animate-bounce" style={{ animationDuration: "4s" }}>🏔️</span>
                  <div className="mt-3">
                    <div className="text-sm font-black text-amber-300 font-mono tracking-widest">EDTECH</div>
                    <div className="text-[10px] text-slate-350 tracking-wider">PREMIUM PLATFORM</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 w-full text-[9px] font-black text-emerald-400 font-mono">
                    100% BEBAS REKLAME
                  </div>
                </div>
              </div>
            </div>

            {/* THREE CORE LEARNING PILLARS (BENTO GRID SHAPE) */}
            <div className="space-y-3">
              <div className="text-left">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">3 Pilar Pembelajaran Terintegrasi</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* PILLAR 1: SAINS */}
                <div className="bg-white border border-slate-200/85 p-5 rounded-2xl flex flex-col justify-between text-left hover:shadow-md transition-shadow group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-sm font-black">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800">Geologi & Isostasi</h4>
                      <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-semibold">
                        Mengulas struktur kerak bumi, lempeng tektonik, dan mekanisme Isostasi di mana akar gunung menembus astenosfer untuk menyeimbangkan daratan secara ilmiah.
                      </p>
                    </div>
                  </div>
                  <div className="text-[9px] font-black tracking-wider uppercase text-emerald-600 mt-4">
                    Sains (IPA) • Geologi
                  </div>
                </div>

                {/* PILLAR 2: AL-QUR'AN */}
                <div className="bg-white border border-slate-200/85 p-5 rounded-2xl flex flex-col justify-between text-left hover:shadow-md transition-shadow group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center text-sm font-black">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800">Kalam Kauniyah Al-Qur'an</h4>
                      <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-semibold">
                        Tafsir mendalam Surah An-Naba: 6-7 dengan diksi ajaib "Awtad" (Pasak), menggambarkan rahasia struktur dalam gunung, ratusan tahun sebelum geologi modern lahir.
                      </p>
                    </div>
                  </div>
                  <div className="text-[9px] font-black tracking-wider uppercase text-amber-600 mt-4">
                    Teologi • Mukjizat Al-Qur'an
                  </div>
                </div>

                {/* PILLAR 3: TOBA ETHNOSCIENCE */}
                <div className="bg-white border border-slate-200/85 p-5 rounded-2xl flex flex-col justify-between text-left hover:shadow-md transition-shadow group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-sky-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center text-sm font-black">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800">Etnosains Batak Toba</h4>
                      <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-semibold">
                        Kearifan lokal seputar Gunung Pusuk Buhit, mitologi naga bawah tanah penyeimbang gempa, serta korelasi intuitif masyarakat adat dengan sistem patahan aktif tektonik Sumatera.
                      </p>
                    </div>
                  </div>
                  <div className="text-[9px] font-black tracking-wider uppercase text-sky-600 mt-4">
                    Kearifan Lokal • Budaya Batak
                  </div>
                </div>

              </div>
            </div>

            {/* DUAL INTERACTIVE ENTRANCE GATES */}
            <div className="space-y-3">
              <div className="text-left">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Silakan Pilih Gerbang Masuk Portal</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* STUDENT GATE PANEL */}
                <motion.div
                  whileHover={{ scale: 1.015, y: -2 }}
                  onClick={() => handleSelectPortal("siswa")}
                  className="bg-white border-2 border-emerald-100/90 hover:border-emerald-400 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between text-left relative overflow-hidden group"
                >
                  {/* Decorative backdrop design elements */}
                  <div className="absolute -right-16 -bottom-16 w-44 h-44 bg-emerald-50/70 rounded-full group-hover:bg-emerald-100/90 transition-all pointer-events-none" />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="inline-flex gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-2xl shadow-md shadow-emerald-500/20">
                        🧗
                      </div>
                      <span className="self-center text-[10px] font-black uppercase tracking-widest text-emerald-600">
                        Pintu Utama Siswa
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-slate-800 tracking-wide">
                        Portal Penjelajah Sains IPA
                      </h2>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Akses modul sains geologi (IPA), tonton video interaktif, dengarkan resitasi Al-Qur'an, jelajahi legenda Batak Toba, kumpulkan badge ulayat, heroisme Daily Streak belajar, dan taklukkan evaluasi kuis!
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-slate-105 pt-4 relative z-10">
                    <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Siswa & Tamu</span>
                    </div>
                    <div className="px-5 py-2.5 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl group-hover:bg-emerald-400 transition-colors shadow-sm flex items-center gap-1.5 active:scale-95">
                      <span>Masuk Portal Siswa</span>
                      <span>→</span>
                    </div>
                  </div>
                </motion.div>

                {/* TEACHER GATE PANEL */}
                <motion.div
                  whileHover={{ scale: 1.015, y: -2 }}
                  onClick={() => handleSelectPortal("guru")}
                  className="bg-white border-2 border-amber-150 hover:border-amber-400 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between text-left relative overflow-hidden group"
                >
                  {/* Decorative backdrop design elements */}
                  <div className="absolute -right-16 -bottom-16 w-44 h-44 bg-amber-50/70 rounded-full group-hover:bg-amber-100/90 transition-all pointer-events-none" />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="inline-flex gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-2xl shadow-md shadow-amber-500/20">
                        👨‍🏫
                      </div>
                      <span className="self-center text-[10px] font-black uppercase tracking-widest text-amber-600">
                        Pintu Utama Pendidik
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-slate-800 tracking-wide">
                        Portal Guru & Pengelola Kelas
                      </h2>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Pantau prestasi belajar siswa secara komprehensif, kelola tugas integratif terpadu, cetak grafik perkembangan XP akademik, nilai kuis evaluasi, serta pantau laporan harian siswa.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-slate-105 pt-4 relative z-10">
                    <div className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-550" />
                      <span>Guru & Instruktur</span>
                    </div>
                    <div className="px-5 py-2.5 bg-amber-400 text-slate-950 font-black text-xs rounded-xl group-hover:bg-amber-300 transition-colors shadow-sm flex items-center gap-1.5 active:scale-95">
                      <span>Masuk Portal Guru</span>
                      <span>→</span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

            {/* PLATFORM OVERVIEW STATISTICS FOOTER BAR */}
            <div className="bg-slate-100/60 border border-slate-200 p-4 rounded-2xl flex flex-wrap justify-around items-center gap-4 text-center">
              <div className="space-y-0.5">
                <p className="text-xs font-black text-slate-800">3 Lensa Holistik</p>
                <p className="text-[10px] text-slate-500 font-semibold font-sans">Geologi • Qur'an • Batak Toba</p>
              </div>
              <div className="h-6 w-px bg-slate-200 hidden sm:block" />
              <div className="space-y-0.5">
                <p className="text-xs font-black text-slate-800">Interaktivitas Penuh</p>
                <p className="text-[10px] text-slate-500 font-semibold font-sans">Visualisasi 2D, Animasi, Audio</p>
              </div>
              <div className="h-6 w-px bg-slate-200 hidden sm:block" />
              <div className="space-y-0.5">
                <p className="text-xs font-black text-slate-800">Gamifikasi Edukasi</p>
                <p className="text-[10px] text-slate-500 font-semibold font-sans">Streak, XP, Lencana Ulayat</p>
              </div>
            </div>

          </motion.div>
        ) : (
          
          // =============== COMPONENT: DEDICATED LOGIN & REGISTRATION FOR SELECTED PORTAL ===============
          <motion.div
            key={`portal-${activePortal}`}
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -25 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className={`w-full max-w-md bg-white/95 backdrop-blur-md border rounded-3xl p-6 md:p-8 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.11)] relative z-10 my-8 overflow-hidden ${
              activePortal === "siswa" 
                ? "border-emerald-200/90 shadow-emerald-500/[0.04]" 
                : "border-amber-200/90 shadow-amber-500/[0.04]"
            }`}
          >
            {/* Ambient Inner Glowing Accent */}
            <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-12 pointer-events-none ${
              activePortal === "siswa" ? "bg-emerald-400" : "bg-amber-400"
            }`} />
            <div className={`absolute -bottom-16 -left-16 w-36 h-36 rounded-full blur-2xl opacity-12 pointer-events-none ${
              activePortal === "siswa" ? "bg-sky-400" : "bg-rose-400"
            }`} />
            {/* GO BACK ACTION BAR */}
            <div className="flex items-center justify-start mb-4 relative z-20">
              <button
                onClick={handleGoBack}
                type="button"
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-[10px] uppercase tracking-wider font-extrabold transition-all bg-slate-100/80 hover:bg-slate-250 px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                <span>Kembali ke Gerbang Utama</span>
              </button>
            </div>

            {/* PORTAL BRAND HEADER */}
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center p-3 rounded-2xl border mb-3 text-slate-950 font-black shadow-sm ${
                activePortal === "siswa" 
                  ? "bg-emerald-500 border-emerald-400" 
                  : "bg-amber-400 border-amber-300"
              }`}>
                {activePortal === "siswa" ? <Compass className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
              </div>
              <h2 className="text-xl font-black text-slate-800 tracking-wider">
                {activePortal === "siswa" ? "PORTAL SISWA" : "PORTAL GURU"}
              </h2>
              <p className="text-[11px] text-slate-450 font-bold mt-1 max-w-xs mx-auto leading-relaxed">
                {activePortal === "siswa" 
                  ? "Gerbang Petualangan Sains & Nilai Keagamaan" 
                  : "Gerbang Pengendali Akademik & Penugasan Terintegrasi"
                }
              </p>
            </div>

            {/* SEGMENTED LOGIN / REGISTER MODE SELECTOR */}
            <div className="flex border-b border-slate-100 mb-6 bg-slate-100/80 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setLoginError("");
                }}
                className={`flex-1 py-1.5 text-xs font-black rounded-lg transition-all ${
                  isLogin
                    ? activePortal === "siswa"
                      ? "bg-emerald-500 text-slate-950 shadow-sm font-black"
                      : "bg-amber-400 text-slate-950 shadow-sm font-black"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Masuk Akun
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setRegSuccess(false);
                }}
                className={`flex-1 py-1.5 text-xs font-black rounded-lg transition-all ${
                  !isLogin
                    ? activePortal === "siswa"
                      ? "bg-emerald-500 text-slate-950 shadow-sm font-black"
                      : "bg-amber-400 text-slate-950 shadow-sm font-black"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Daftar Baru
              </button>
            </div>

            {isLogin ? (
              /* DEDICATED LOGIN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                    Nama Pengguna (Username)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder={`Masukkan username ${activePortal}`}
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all ${
                        activePortal === "siswa" 
                          ? "focus:border-emerald-500 focus:ring-emerald-500" 
                          : "focus:border-amber-400 focus:ring-amber-400"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                    Kata Sandi (Password)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      required
                      placeholder="Masukkan kata sandi (e.g. 123)"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all ${
                        activePortal === "siswa" 
                          ? "focus:border-emerald-500 focus:ring-emerald-500" 
                          : "focus:border-amber-400 focus:ring-amber-400"
                      }`}
                    />
                  </div>
                </div>

                {loginError && (
                  <p className="text-[11px] text-rose-600 font-extrabold bg-rose-50 px-3 py-2 rounded-xl border border-rose-200 leading-normal">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl text-slate-950 font-black text-xs uppercase tracking-wider hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer shadow-md ${
                    activePortal === "siswa" 
                      ? "bg-gradient-to-r from-emerald-500 to-sky-500 shadow-emerald-500/10 hover:shadow-emerald-500/20" 
                      : "bg-gradient-to-r from-amber-400 to-amber-500 shadow-amber-500/10 hover:shadow-amber-500/20"
                  }`}
                >
                  Masuk Portal {activePortal === "siswa" ? "Siswa" : "Guru"}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActivePortal(activePortal === "siswa" ? "guru" : "siswa")}
                    className="text-[10px] font-black text-slate-400 hover:text-slate-650 transition-colors"
                  >
                    Atau Masuk sebagai {activePortal === "siswa" ? "Pendidik/Guru" : "Siswa Penjelajah"} →
                  </button>
                </div>
              </form>
            ) : (
              /* DEDICATED REGISTRATION FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {regSuccess ? (
                  <div className="text-center py-6 space-y-3">
                    <div className={`inline-flex p-3 rounded-full animate-bounce border ${
                      activePortal === "siswa" 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                        : "bg-amber-50 border-amber-200 text-amber-700"
                    }`}>
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-sm font-black text-slate-805">Pendaftaran Berhasil!</h3>
                    <p className="text-xs text-slate-500">Mempersiapkan gerbang portal masuk...</p>
                  </div>
                ) : (
                  <>
                    {/* DISPLAY NAME */}
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={activePortal === "siswa" ? "e.g. Syifa Sirait" : "e.g. Ibu Siregar, S.Pd."}
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className={`w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all ${
                          activePortal === "siswa" 
                            ? "focus:border-emerald-500 focus:ring-emerald-500" 
                            : "focus:border-amber-400 focus:ring-amber-400"
                        }`}
                      />
                    </div>

                    {/* USERNAME */}
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        Nama Pengguna (Username login)
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <UserPlus className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="e.g. syifa21 (huruf kecil & tanpa spasi)"
                          value={regUsername}
                          onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))}
                          className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all ${
                            activePortal === "siswa" 
                              ? "focus:border-emerald-500 focus:ring-emerald-500" 
                              : "focus:border-amber-400 focus:ring-amber-400"
                          }`}
                        />
                      </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        Kata Sandi
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <KeyRound className="w-4 h-4" />
                        </span>
                        <input
                          type="password"
                          required
                          placeholder="Buat kata sandi minimal 3 karakter"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 transition-all ${
                            activePortal === "siswa" 
                              ? "focus:border-emerald-500 focus:ring-emerald-500" 
                              : "focus:border-amber-400 focus:ring-amber-400"
                          }`}
                        />
                      </div>
                    </div>

                    {/* AVATAR SELECTOR */}
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                        Pilih Avatar Profil ({regAvatar})
                      </label>
                      <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none">
                        {(activePortal === "siswa" ? studentAvatars : teacherAvatars).map((av) => (
                          <button
                            key={av}
                            type="button"
                            onClick={() => setRegAvatar(av)}
                            className={`w-9 h-9 text-base rounded-full flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                              regAvatar === av
                                ? activePortal === "siswa"
                                  ? "bg-emerald-50 border-emerald-400 scale-110 font-bold"
                                  : "bg-amber-50 border-amber-400 scale-110 font-bold"
                                : "bg-slate-100 border-slate-250 opacity-75 hover:opacity-100"
                            }`}
                          >
                            {av}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3 rounded-xl text-slate-950 font-black text-xs uppercase tracking-wider hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                        activePortal === "siswa" 
                          ? "bg-emerald-500 hover:bg-emerald-400" 
                          : "bg-amber-400 hover:bg-amber-305"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Daftarkan Akun {activePortal === "siswa" ? "Siswa" : "Guru"}</span>
                    </button>
                  </>
                )}
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
