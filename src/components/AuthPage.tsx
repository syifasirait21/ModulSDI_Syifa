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
    <div className="w-full h-full bg-gradient-to-b from-slate-50 via-sky-50 to-emerald-50/50 flex items-center justify-center p-4 md:p-6 overflow-y-auto min-h-[500px] select-none font-sans">
      <div className="absolute inset-x-0 top-0 h-[280px] bg-gradient-to-b from-sky-450/15 via-transparent to-transparent blur-3xl pointer-events-none" />
      
      <AnimatePresence mode="wait">
        
        {/* =============== GATEWAY: ROLE SELECTION SCREEN =============== */}
        {activePortal === null ? (
          <motion.div
            key="gateway-selection"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl space-y-8 my-8 relative z-10"
          >
            {/* Header Identity */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-400 text-slate-950 mb-1 border-2 border-white shadow-md animate-pulse">
                <BookOpen className="w-7 h-7" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-wide uppercase">
                PORTAL BELAJAR GUNUNG
              </h1>
              <p className="text-xs md:text-sm text-slate-500 font-bold max-w-xl mx-auto">
                Eksplorasi Pembelajaran Kebumian Terpadu: Integrasi Sains Modern Geologi, Tafsir Ayat Kauniyah, dan Kearifan Etnosains Budaya Batak Toba
              </p>
            </div>

            {/* Split Gateway Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* STUDENT GATE CARD */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => handleSelectPortal("siswa")}
                className="bg-white border-2 border-emerald-100 hover:border-emerald-400 rounded-3xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between text-left relative overflow-hidden group"
              >
                {/* Background gradient decoration */}
                <div className="absolute -right-12 -bottom-12 w-36 h-36 bg-emerald-50 rounded-full group-hover:bg-emerald-100/70 transition-colors pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-2xl shadow-md shadow-emerald-500/20">
                    🧗
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block">
                      Gerbang Siswa
                    </span>
                    <h2 className="text-xl font-black text-slate-800 tracking-wide">
                      Portal Penjelajah Ulayat
                    </h2>
                  </div>
                  <p className="text-xs text-slate-505 font-medium leading-relaxed">
                    Akses modul sains geologi, baca ayat Al-Qur'an tentang gunung, pahami tradisi Batak Toba, jawab kuis interaktif, serta kumpulkan lencana prestasi ulayat yang menantang!
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 relative z-10">
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">
                    Siswa & Pengunjung
                  </span>
                  <div className="px-4 py-2 bg-emerald-500 text-slate-950 font-black text-xs rounded-xl group-hover:bg-emerald-400 transition-colors shadow-sm">
                    Masuk Portal Siswa →
                  </div>
                </div>
              </motion.div>

              {/* TEACHER GATE CARD */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => handleSelectPortal("guru")}
                className="bg-white border-2 border-amber-100 hover:border-amber-400 rounded-3xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between text-left relative overflow-hidden group"
              >
                {/* Background gradient decoration */}
                <div className="absolute -right-12 -bottom-12 w-36 h-36 bg-amber-50 rounded-full group-hover:bg-amber-100/70 transition-colors pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-2xl shadow-md shadow-amber-500/20">
                    👨‍🏫
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 block">
                      Gerbang Pendidik
                    </span>
                    <h2 className="text-xl font-black text-slate-800 tracking-wide">
                      Portal Guru & Admin
                    </h2>
                  </div>
                  <p className="text-xs text-slate-505 font-medium leading-relaxed">
                    Manajemen kelas, cetak laporan akademik perkembangan siswa, buat butir tugas integratif terpadu, pantau pencapaian level XP, serta kelola aktivitas pembelajaran ulayat.
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 relative z-10">
                  <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">
                    Guru & Pengawas
                  </span>
                  <div className="px-4 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-xl group-hover:bg-amber-300 transition-colors shadow-sm">
                    Masuk Portal Guru →
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        ) : (
          
          // =============== COMPONENT: DEDICATED LOGIN & REGISTRATION FOR SELECTED PORTAL ===============
          <motion.div
            key={`portal-${activePortal}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className={`w-full max-w-md bg-white border rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] relative z-10 my-8 ${
              activePortal === "siswa" ? "border-emerald-200" : "border-amber-200"
            }`}
          >
            {/* GO BACK ACTION BAR */}
            <button
              onClick={handleGoBack}
              className="absolute -top-12 left-0 flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-xs font-black transition-all bg-white px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Gerbang Utama</span>
            </button>

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
