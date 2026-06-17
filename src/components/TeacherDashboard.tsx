import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Trophy,
  BookOpen,
  Send,
  Plus,
  Trash2,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  X,
  Award,
  LogOut,
  Sparkles,
  Search,
  BookOpenCheck,
  ShieldAlert,
  RotateCcw,
  UserMinus,
  ChevronLeft,
  CheckCircle2,
  Compass,
  Anchor,
  Flame,
  Droplet,
  Map,
  Sprout,
  Bell,
  AlertCircle
} from "lucide-react";
import { LessonContent, StudentProfile } from "../types";

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

interface Assignment {
  id: string;
  title: string;
  instruction: string;
  lessonId: string;
  points: number;
  createdAt: string;
}

interface TeacherDashboardProps {
  currentUser: { username: string; name: string; avatar: string };
  allUsers: any[];
  lessons: LessonContent[];
  assignments: Assignment[];
  onCreateAssignment: (title: string, instruction: string, lessonId: string, points: number) => void;
  onDeleteAssignment: (id: string) => void;
  onDeleteStudent: (username: string) => void;
  onResetStudent: (username: string) => void;
  onLogout: () => void;
}

export default function TeacherDashboard({
  currentUser,
  allUsers,
  lessons,
  assignments,
  onCreateAssignment,
  onDeleteAssignment,
  onDeleteStudent,
  onResetStudent,
  onLogout,
}: TeacherDashboardProps) {
  // Filter only student accounts
  const students = allUsers.filter((u) => u.role === "siswa");

  // Local state for UI
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isConfirmReset, setIsConfirmReset] = useState(false);

  const handleSelectStudent = (student: any) => {
    setSelectedStudent(student);
    setIsConfirmDelete(false);
    setIsConfirmReset(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedStudent) {
      onDeleteStudent(selectedStudent.username);
      setSelectedStudent(null);
      setIsConfirmDelete(false);
    }
  };

  const handleResetConfirm = () => {
    if (selectedStudent) {
      onResetStudent(selectedStudent.username);
      setSelectedStudent({
        ...selectedStudent,
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
        badges: selectedStudent.badges?.map((b: any) => ({ ...b, unlockedAt: undefined })) || [],
      });
      setIsConfirmReset(false);
    }
  };
  
  // Assignment form state
  const [taskTitle, setTaskTitle] = useState("");
  const [taskInstruction, setTaskInstruction] = useState("");
  const [taskLessonId, setTaskLessonId] = useState(lessons[0]?.id || "");
  const [taskPoints, setTaskPoints] = useState(50);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Stats calculators
  const totalStudents = students.length;
  const averageXP = totalStudents > 0
    ? Math.round(students.reduce((acc: number, curr: any) => acc + (curr.xp || 0), 0) / totalStudents)
    : 0;

  const averageClassProgress = totalStudents > 0
    ? Math.round(
        students.reduce((acc: number, student: any) => {
          const prog = student.progress || {};
          const sum = Object.values(prog).reduce((a: number, b: any) => a + Number(b), 0) as number;
          return acc + (sum / lessons.length);
        }, 0) / totalStudents
      )
    : 0;

  const handlePostTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!taskTitle || !taskInstruction) {
      setFormError("Mohon isi judul dan instruksi tugas!");
      return;
    }

    onCreateAssignment(taskTitle, taskInstruction, taskLessonId, Number(taskPoints));
    setTaskTitle("");
    setTaskInstruction("");
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 2000);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hitung stagnansi belajar siswa (> 3 hari)
  const getDaysStagnant = (lastUpdateStr?: string) => {
    if (!lastUpdateStr) return 0;
    const lastUpdate = new Date(lastUpdateStr);
    const now = new Date();
    const diffTime = now.getTime() - lastUpdate.getTime();
    if (diffTime < 0) return 0;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const stagnantStudents = students.filter((s) => {
    if (!s.lastProgressUpdate) return false;
    return getDaysStagnant(s.lastProgressUpdate) > 3;
  });

  return (
    <div className="w-full h-full bg-slate-50 flex flex-col p-4 md:p-6 text-slate-705 overflow-y-auto font-sans leading-relaxed select-none">
      {/* BRAND HEADER BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 shrink-0 rounded-2xl border border-slate-200 mb-6 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-3xl shadow-md">
            👩‍🏫
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-800 tracking-wide">{currentUser.name}</h1>
              <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 rounded-full">
                GURU / PENDIDIK
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Kelola penjelajahan modul, pantau hasil belajar siswa, & buat penugasan integratif.
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 border border-rose-200 bg-rose-50 hover:bg-rose-100/80 text-rose-700 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm self-stretch md:self-auto justify-center"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Portal</span>
        </button>
      </div>

      {/* NOTIFIKASI SISWA STAGNAN (> 3 HARI) */}
      <AnimatePresence>
        {stagnantStudents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-amber-50/90 border border-amber-200 rounded-2xl shadow-sm flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between text-slate-800"
          >
            <div className="flex gap-3 items-start lg:items-center">
              <span className="p-2.5 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center shrink-0 animate-bounce">
                <Bell className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h4 className="text-xs font-black text-amber-850 uppercase tracking-widest flex items-center gap-1.5">
                  <AlertCircle className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                  <span>Peringatan Stagnansi Belajar Siswa (&gt; 3 Hari)</span>
                </h4>
                <p className="text-xs text-slate-650 font-medium mt-1">
                  Ada <strong className="text-amber-900 font-extrabold">{stagnantStudents.length} siswa</strong> yang progres belajarnya mengendap selama lebih dari 3 hari. Klik tombol siswa di bawah untuk menganalisis kendala mereka.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
              {stagnantStudents.map((st) => {
                const days = getDaysStagnant(st.lastProgressUpdate);
                return (
                  <button
                    key={st.username}
                    onClick={() => handleSelectStudent(st)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-slate-700 hover:text-slate-900 transition-all font-black text-[10px] uppercase tracking-wider cursor-pointer shadow-xs whitespace-nowrap active:scale-95"
                    title={`Belum aktif selama ${days} hari. Klik untuk menganalisis.`}
                  >
                    <span className="text-xs w-4 h-4 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                      {st.avatar && (st.avatar.startsWith("data:") || st.avatar.startsWith("http") || st.avatar.startsWith("/src") || st.avatar.startsWith("blob:")) ? (
                        <img src={st.avatar} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" alt="Avatar" />
                      ) : (
                        st.avatar || "🌋"
                      )}
                    </span>
                    <span>{st.name.split(" ")[0]}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-150/70 text-amber-800 text-[8px] font-black font-mono">
                      {days} Hari
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE TOP CLASSROOM STATISTICS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* STAT CAP 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 text-sky-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              Siswa Terdaftar
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-800">{totalStudents}</span>
              <span className="text-xs text-slate-500 font-bold">orang</span>
            </div>
          </div>
        </div>

        {/* STAT CAP 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-600">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              Rata-Rata Skor Kelas
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-amber-650">{averageXP}</span>
              <span className="text-xs text-slate-500 font-bold">XP</span>
            </div>
          </div>
        </div>

        {/* STAT CAP 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
              Rerata Penguasaan Modul
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-emerald-600">{averageClassProgress}%</span>
              <span className="text-xs text-slate-500 font-bold">Tuntas</span>
            </div>
          </div>
        </div>
      </div>

      {/* MID CONTROLLER GRID: LEADERBOARD & CREATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT 7 COLUMNS: STUDENT LEADERBOARD & INDIVIDUAL STATS */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                  Daftar Prestasi Siswa
                </h3>
                <p className="text-[11px] text-slate-400 font-bold mt-0.5">
                  Klik siswa untuk melihat kartu laporan & lencana kelulusannya secara rinci
                </p>
              </div>

              {/* SEARCH BOX */}
              <div className="relative w-full sm:w-48 shrink-0">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Search className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  placeholder="Cari siswa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:border-amber-400 text-slate-800"
                />
              </div>
            </div>

            {/* LEADERBOARD LIST CONTAINER */}
            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredStudents.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs font-black">Belum ada siswa yang mendaftar.</p>
                  <p className="text-[10px] mt-1">Siswa dapat mendaftar lewat portal daftar baru.</p>
                </div>
              ) : (
                filteredStudents
                  .sort((a, b) => (b.xp || 0) - (a.xp || 0))
                  .map((student, idx) => {
                    const completedCount = student.completedLessons?.length || 0;
                    const completionPercent = Math.round(
                      ((Object.values(student.progress || {}).reduce((sum: number, val: any) => sum + Number(val), 0) as number) /
                        (lessons.length * 100)) *
                        100
                    ) || 0;

                    return (
                      <motion.div
                        key={student.username}
                        whileHover={{ x: 2 }}
                        onClick={() => handleSelectStudent(student)}
                        className="flex items-center justify-between p-3 bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-400/50 rounded-xl transition-all cursor-pointer shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          {/* RANK BADGE */}
                          <span className={`w-5 text-xs font-black text-center ${idx === 0 ? "text-yellow-600" : idx === 1 ? "text-slate-500" : "text-slate-400"}`}>
                            #{idx + 1}
                          </span>
                          {/* AVATAR */}
                          <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-lg overflow-hidden shrink-0">
                            {student.avatar && (student.avatar.startsWith("data:") || student.avatar.startsWith("http") || student.avatar.startsWith("/src") || student.avatar.startsWith("blob:")) ? (
                              <img src={student.avatar} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" alt="Avatar" />
                            ) : (
                              student.avatar || "🌋"
                            )}
                          </div>
                          {/* INFO */}
                          <div>
                            <span className="text-xs font-black text-slate-800 block">{student.name}</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">
                              Level {student.level || 1} • <span className="text-amber-600 font-black">{student.xp || 0} XP</span>
                            </span>
                          </div>
                        </div>

                        {/* STATUS VISUAL / PROGRESS */}
                        <div className="flex items-center gap-4">
                          <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">
                              Komitmen Sesi
                            </span>
                            <div className="flex gap-1.5 mt-0.5">
                              {lessons.map((lesson) => {
                                const prog = student.progress?.[lesson.id] || 0;
                                return (
                                  <div
                                    key={lesson.id}
                                    className={`w-2.5 h-2.5 rounded-full ${
                                      prog === 100
                                        ? "bg-emerald-500"
                                        : prog > 0
                                        ? "bg-amber-400"
                                        : "bg-slate-200 border border-slate-300"
                                    }`}
                                    title={`${lesson.title}: ${prog}%`}
                                  />
                                );
                              })}
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-black text-emerald-600">{completionPercent}%</span>
                            <span className="text-[9px] text-slate-400 block font-bold">Selesai</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: ASSIGNMENT CREATOR / MANAGER */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* POST ASSIGNMENTS FORM */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
              <Plus className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Rancang Tugas Mandiri
              </h3>
            </div>

            <form onSubmit={handlePostTaskSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Pilih Modul Pembelajaran
                </label>
                <select
                  value={taskLessonId}
                  onChange={(e) => setTaskLessonId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400 text-slate-700 font-bold"
                >
                  {lessons.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Judul Penugasan
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kerjakan Kuis & Lengkapi Isostasi"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-amber-400 text-slate-850 font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Petunjuk / Instruksi Siswa
                </label>
                <textarea
                  required
                  placeholder="e.g. Lakukan eksplorasi 100% dan baca kajian Surah An-Naba' bait pasak."
                  value={taskInstruction}
                  onChange={(e) => setTaskInstruction(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-amber-400 text-slate-850 font-bold resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Insentif Hadiah XP ({taskPoints} XP)
                </label>
                <div className="flex gap-2">
                  {[20, 50, 100, 150].map((pt) => (
                    <button
                      type="button"
                      key={pt}
                      onClick={() => setTaskPoints(pt)}
                      className={`flex-1 py-1 rounded-lg text-xs font-black transition-all ${
                        taskPoints === pt
                          ? "bg-amber-400 text-slate-950"
                          : "bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      +{pt}
                    </button>
                  ))}
                </div>
              </div>

              {formSuccess && (
                <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-250 px-3 py-1.5 rounded-lg shadow-inner animate-pulse">
                  Tugas berhasil diposting & disebarkan ke siswa!
                </div>
              )}

              {formError && (
                <div className="text-[11px] text-rose-700 font-bold bg-rose-50 border border-rose-250 px-3 py-1.5 rounded-lg shadow-inner">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-emerald-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Terbitkan Tugas</span>
              </button>
            </form>
          </div>

          {/* ACTIVE ASSIGNMENTS MANAGER */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <h4 className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">
              Daftar Tugas Aktif ({assignments.length})
            </h4>

            {assignments.length === 0 ? (
              <p className="text-[11px] text-slate-400 text-center py-6 font-bold">
                Belum ada penugasan mandiri yang aktif.
              </p>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {assignments.map((as) => {
                  const correlatedLesson = lessons.find((l) => l.id === as.lessonId);
                  
                  // Count completed students
                  const countFinished = students.filter(
                    (s) => (s.progress?.[as.lessonId] || 0) === 100
                  ).length;

                  return (
                    <div
                      key={as.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <h5 className="font-black text-slate-800 line-clamp-1">{as.title}</h5>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium line-clamp-2">{as.instruction}</p>
                        <div className="flex flex-wrap items-center gap-3 text-[9px] text-slate-450 font-black mt-1.5">
                          <span className="text-amber-600">🎁 +{as.points} XP</span>
                          <span>📚 {correlatedLesson?.title || "Umum"}</span>
                          <span>🏆 Tuntas: {countFinished} / {totalStudents}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onDeleteAssignment(as.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer shrink-0"
                        title="Hapus Penugasan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* DETAILED STUDENT PROGRESS REPORT MODAL - FULLSCREEN UPGRADE */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-100 z-50 flex flex-col h-screen w-screen overflow-hidden text-slate-800 font-sans"
          >
            {/* FULLSCREEN HEADER BAR */}
            <div className="w-full bg-white border-b border-slate-200/80 px-4 md:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between shrink-0 gap-3 shadow-sm select-none">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setSelectedStudent(null);
                    setIsConfirmDelete(false);
                    setIsConfirmReset(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-650 hover:text-slate-800 transition-all font-black text-xs cursor-pointer shadow-sm active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-500" />
                  <span>Kembali ke Dashboard Utama</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-center">
                <span className="inline-flex items-center justify-center p-1.5 rounded-lg bg-indigo-50 border border-indigo-150 text-indigo-600 animate-pulse">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <h2 className="text-sm font-black text-slate-800 tracking-wider uppercase">
                  Laporan Kemajuan Komprehensif Siswa
                </h2>
              </div>

              <div className="text-right hidden md:block">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Level Akademik</span>
                <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full inline-block mt-0.5 shadow-sm">
                  Tingkat Level {selectedStudent.level || 1}
                </span>
              </div>
            </div>

            {/* FULLSCREEN WORKSPACE SCROLL AREA */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 via-slate-100/50 to-indigo-50/20 p-4 md:p-8">
              <div className="max-w-6xl mx-auto space-y-6">
                
                {/* 2-COLUMN GRID SYSTEM */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* LEFT COLUMN: IDENTITY & QUICK STAT SUMMARY (4 Span) */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* AVATAR & MAIN BIOMETRIC CARD */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-center relative overflow-hidden group">
                      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500" />
                      
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-full bg-indigo-50 border-2 border-indigo-100 scale-105 animate-pulse" />
                        <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-250 flex items-center justify-center text-5xl shrink-0 shadow-inner relative z-10 select-all group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                          {selectedStudent.avatar && (selectedStudent.avatar.startsWith("data:") || selectedStudent.avatar.startsWith("http") || selectedStudent.avatar.startsWith("/src") || selectedStudent.avatar.startsWith("blob:")) ? (
                            <img src={selectedStudent.avatar} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" alt="Avatar" />
                          ) : (
                            selectedStudent.avatar || "🌋"
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 tracking-wide line-clamp-1">{selectedStudent.name}</h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5 lowercase">@{selectedStudent.username}</p>

                      <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-slate-100">
                        <div className="bg-slate-50 border border-slate-205/60 p-2.5 rounded-xl text-center">
                          <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">Skor Total XP</span>
                          <span className="text-lg font-black text-indigo-650 tracking-wide">{selectedStudent.xp || 0} XP</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-205/60 p-2.5 rounded-xl text-center">
                          <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">Level Saat Ini</span>
                          <span className="text-lg font-black text-emerald-600 tracking-wide">Lvl {selectedStudent.level || 1}</span>
                        </div>
                      </div>

                      {/* LEVEL XP PROGRESS METER */}
                      <div className="mt-4 space-y-1.5 text-left bg-indigo-50/30 border border-indigo-100 p-3.5 rounded-2xl">
                        <div className="flex justify-between items-center text-[10px] font-black text-indigo-805 uppercase tracking-wide">
                          <span>Siklus XP Level Selanjutnya</span>
                          <span>{((selectedStudent.xp || 0) % 1000)} / 1000 XP</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full transition-all duration-500"
                            style={{ width: `${((selectedStudent.xp || 0) % 1000) / 10}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-450 font-bold leading-normal text-center pt-0.5">
                          Butuh {Math.max(0, 1000 - ((selectedStudent.xp || 0) % 1000))} XP lagi untuk melaju ke level berikutnya!
                        </p>
                      </div>
                    </div>

                    {/* ACADEMIC PROGRESS RADAR / NUMERICAL OVERVIEW */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <h4 className="text-xs font-black text-slate-600 uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center justify-between">
                        <span>Ringkasan Statistik Aktivitas</span>
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                      </h4>

                      <div className="space-y-2.5">
                        {/* BADGES COUNT */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-slate-505 font-bold">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            <span>Lencana Terbuka</span>
                          </div>
                          <span className="font-black text-slate-800">
                            {selectedStudent.badges?.filter((b: any) => b.unlockedAt).length || 0} / {selectedStudent.badges?.length || 7}
                          </span>
                        </div>

                        {/* COMPLETED LESSONS COUNT */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-slate-505 font-bold">
                            <BookOpenCheck className="w-4 h-4 text-sky-500" />
                            <span>Materi Tuntas (100%)</span>
                          </div>
                          <span className="font-black text-slate-800">
                            {lessons.filter(l => (selectedStudent.progress?.[l.id] || 0) === 100).length} / {lessons.length}
                          </span>
                        </div>

                        {/* HOMEWORK COMPLETED COUNT */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-slate-505 font-bold">
                            <CheckCircle className="w-4 h-4 text-teal-500" />
                            <span>Tugas Terselesaikan</span>
                          </div>
                          <span className="font-black text-slate-800">
                            {assignments.filter(as => (selectedStudent.progress?.[as.lessonId] || 0) === 100).length} / {assignments.length}
                          </span>
                        </div>

                        {/* ACADEMIC ENGAGEMENT LEVEL STATE */}
                        <div className="flex items-center justify-between text-xs pt-1">
                          <div className="flex items-center gap-1.5 text-slate-505 font-bold">
                            <Clock className="w-4 h-4 text-indigo-400" />
                            <span>Status Akademik</span>
                          </div>
                          <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full ${
                            (selectedStudent.xp || 0) >= 1500 
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                              : (selectedStudent.xp || 0) > 0 
                                ? "bg-amber-50 text-amber-700 border border-amber-100" 
                                : "bg-slate-100 text-slate-400"
                          }`}>
                            {(selectedStudent.xp || 0) >= 1500 
                              ? "🏆 Aktif Berprestasi" 
                              : (selectedStudent.xp || 0) > 0 
                                ? "🧗 Sedang Merintis" 
                                : "💤 Belum Aktif"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DANGER & MANAGEMENT PANEL CARD */}
                    <div className="bg-rose-50/40 border border-rose-100 rounded-3xl p-6 shadow-sm space-y-4">
                      <div className="flex items-center gap-1.5 text-slate-705">
                        <ShieldAlert className="w-4.5 h-4.5 text-rose-500 hover:scale-105 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                          Kontrol Keamanan Akademik
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                        Gunakan tombol di bawah untuk mengelola status akun, baik mereset kemajuan jika terjadi pelanggaran atau menghapus akun siswa secara total.
                      </p>

                      <div className="space-y-2">
                        {isConfirmReset ? (
                          <div className="bg-white border border-amber-200 p-3.5 rounded-2xl text-center space-y-2.5 shadow-sm">
                            <p className="text-[10px] font-extrabold text-amber-900 leading-normal">
                              Apakah Anda yakin ingin menyetel ulang kemajuan <strong>{selectedStudent.name}</strong>? XP, kelulusan modul, serta lencana akan digulung kembali ke nol!
                            </p>
                            <div className="flex justify-center gap-2">
                              <button
                                type="button"
                                onClick={handleResetConfirm}
                                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[9px] uppercase tracking-wide rounded-lg cursor-pointer transition-colors"
                              >
                                Ya, Reset
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsConfirmReset(false)}
                                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[9px] uppercase tracking-wide rounded-lg cursor-pointer transition-colors"
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        ) : isConfirmDelete ? (
                          <div className="bg-white border border-rose-200 p-3.5 rounded-2xl text-center space-y-2.5 shadow-sm">
                            <p className="text-[10px] font-extrabold text-rose-800 leading-normal">
                              Apakah Anda yakin ingin menghapus akun <strong>{selectedStudent.name}</strong>? Pembacaan ini bernilai permanen dan data siswa akan musnah!
                            </p>
                            <div className="flex justify-center gap-2 animate-pulse">
                              <button
                                type="button"
                                onClick={handleDeleteConfirm}
                                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-[9px] uppercase tracking-wide rounded-lg cursor-pointer transition-colors"
                              >
                                Ya, Hapus
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsConfirmDelete(false)}
                                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[9px] uppercase tracking-wide rounded-lg cursor-pointer transition-colors"
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setIsConfirmReset(true);
                                setIsConfirmDelete(false);
                              }}
                              className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Reset Progress</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setIsConfirmDelete(true);
                                setIsConfirmReset(false);
                              }}
                              className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-650 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                            >
                              <UserMinus className="w-3.5 h-3.5" />
                              <span>Hapus Akun</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: LESSON DETAILS, BADGE CASE & ASSIGNMENTS LIST (8 Span) */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* MODUL PROGRESS BAR breakdown */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="p-2 rounded-xl bg-sky-50 border border-sky-100 text-sky-600">
                            <BookOpenCheck className="w-5 h-5" />
                          </span>
                          <div>
                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">
                              Peta Penguasaan Modul Pelajaran
                            </h4>
                            <span className="text-[10px] text-slate-400 font-bold block mt-1">
                              Status capaian geologi sains, integrasi Qur'ani, dan etnosains
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-mono font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-xl">
                          {lessons.filter(l => (selectedStudent.progress?.[l.id] || 0) === 100).length} / {lessons.length} Selesai
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lessons.map((lesson) => {
                          const pct = selectedStudent.progress?.[lesson.id] || 0;
                          return (
                            <div 
                              key={lesson.id} 
                              className={`p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between h-[120px] ${
                                pct === 100 
                                  ? "bg-emerald-50/40 border-emerald-250/70"
                                  : pct > 0 
                                    ? "bg-amber-50/20 border-amber-250/60"
                                    : "bg-slate-50/80 border-slate-200"
                              }`}
                            >
                              {pct === 100 && (
                                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />
                              )}

                              <div className="space-y-1">
                                <span className={`text-[8px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full inline-block ${
                                  pct === 100 
                                    ? "bg-emerald-100 text-emerald-800"
                                    : pct > 0 
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-slate-200 text-slate-500"
                                }`}>
                                  {lesson.shortDesc}
                                </span>
                                <h5 className="font-extrabold text-xs text-slate-800 line-clamp-1 mt-1">{lesson.title}</h5>
                              </div>

                              <div className="space-y-1.5 pt-2">
                                <div className="flex justify-between items-center text-[10px] font-black">
                                  <span className="text-slate-450 uppercase tracking-wider">Persentase</span>
                                  <span className={pct === 100 ? "text-emerald-700" : pct > 0 ? "text-amber-700" : "text-slate-400"}>
                                    {pct}% {pct === 100 ? "Lulus" : pct > 0 ? "Merayap" : "Belum Mulai"}
                                  </span>
                                </div>
                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all duration-700 ${
                                      pct === 100 ? "bg-emerald-500" : "bg-amber-400"
                                    }`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* LEMARI LENCANA PRESTASI GRID CABINET */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="p-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-550">
                            <Award className="w-5 h-5 text-amber-500" />
                          </span>
                          <div>
                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">
                              Kabinet Lencana Penghargaan
                            </h4>
                            <span className="text-[10px] text-slate-400 font-bold block mt-1">
                              Pencapaian medali kehormatan geologi siswa ulayat
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-mono font-black text-slate-450 bg-amber-50 text-amber-800 px-3 py-1 rounded-xl">
                          {selectedStudent.badges?.filter((b: any) => b.unlockedAt).length || 0} Terkumpul
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {(selectedStudent.badges || []).map((badge: any) => {
                          const isUnlocked = !!badge.unlockedAt;
                          return (
                            <div
                              key={badge.id}
                              className={`p-3.5 border rounded-2xl flex items-start gap-3 text-xs relative overflow-hidden transition-all ${
                                isUnlocked
                                  ? "bg-white border-amber-300 shadow-[0_5px_15px_rgba(245,158,11,0.06)] scale-100"
                                  : "bg-slate-50/70 border-slate-200 opacity-50"
                              }`}
                            >
                              {/* Glowing background ring for unlocked medals */}
                              {isUnlocked && (
                                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />
                              )}

                              <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center relative ${
                                isUnlocked 
                                  ? "bg-gradient-to-tr from-amber-450 to-amber-500 text-slate-950 shadow-md font-black" 
                                  : "bg-slate-200 text-slate-400"
                              }`}>
                                <BadgeIcon iconName={badge.icon} className="w-4.5 h-4.5 stroke-[2.5]" />
                                {isUnlocked && (
                                  <span className="absolute inset-0 rounded-full border border-amber-300 animate-ping opacity-35" />
                                )}
                              </div>

                              <div className="min-w-0 flex-1 space-y-0.5">
                                <div className="flex justify-between items-center gap-1.5">
                                  <span className={`font-black text-[11px] truncate ${isUnlocked ? "text-slate-800" : "text-slate-455"}`}>
                                    {badge.title}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">
                                  {badge.description}
                                </p>
                                {isUnlocked && badge.unlockedAt && (
                                  <span className="text-[8px] font-bold text-emerald-600 block pt-0.5 uppercase tracking-wider">
                                    🔓 Terbuka
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ASSIGNMENTS STATUS TRACKER - MASTER CHECK BOX */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                            <CheckCircle2 className="w-5 h-5" />
                          </span>
                          <div>
                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest leading-none">
                              Lembar Pemantauan Tugas Mandiri
                            </h4>
                            <span className="text-[10px] text-slate-400 font-bold block mt-1">
                              Status penyerahan tugas terintegrasi berdasarkan kelulusan modul (100% tuntas)
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
                          {assignments.filter(as => (selectedStudent.progress?.[as.lessonId] || 0) === 100).length} / {assignments.length} Tuntas
                        </span>
                      </div>

                      {assignments.length === 0 ? (
                        <div className="p-8 text-center text-slate-405 space-y-1.5">
                          <p className="text-xs font-extrabold text-slate-400">Tidak ada penugasan terdaftar pada server.</p>
                          <p className="text-[10px] text-slate-400">Anda dapat membagikan modul tugas baru dari halaman dashboard utama guru.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {assignments.map((as) => {
                            const isFinished = (selectedStudent.progress?.[as.lessonId] || 0) === 100;
                            const correlatedLesson = lessons.find((l) => l.id === as.lessonId);
                            
                            return (
                              <div
                                key={as.id}
                                className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all ${
                                  isFinished
                                    ? "bg-emerald-50/30 border-emerald-250/70"
                                    : "bg-slate-50/50 border-slate-200"
                                }`}
                              >
                                <div className="space-y-1 min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded-lg tracking-wide ${
                                      isFinished
                                        ? "bg-emerald-100 text-emerald-750"
                                        : "bg-yellow-105 text-yellow-800 border border-yellow-200"
                                    }`}>
                                      {isFinished ? "TUNTAS & DIKUMPUL" : "BELUM LENGKAP"}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-bold">
                                      {correlatedLesson?.title || "Materi Umum"}
                                    </span>
                                  </div>

                                  <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm tracking-wide line-clamp-1 mt-1">
                                    {as.title}
                                  </h5>
                                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed max-w-xl">
                                    {as.instruction}
                                  </p>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                  <div className="text-right">
                                    <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">Bobot Nilai</span>
                                    <span className="text-xs font-black text-amber-600 block">+{as.points} XP</span>
                                  </div>

                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                    isFinished
                                      ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                                      : "bg-slate-200 text-slate-400"
                                  }`}>
                                    {isFinished ? (
                                      <CheckCircle className="w-5 h-5 text-slate-950 stroke-[3]" />
                                    ) : (
                                      <Clock className="w-4 h-4" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                  </div>

                </div>

              </div>
            </div>

            {/* FULLSCREEN FOOTER CONTROL */}
            <div className="bg-white border-t border-slate-200 p-4 shrink-0 flex justify-center text-center shadow-inner">
              <button
                onClick={() => {
                  setSelectedStudent(null);
                  setIsConfirmDelete(false);
                  setIsConfirmReset(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-black text-white uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95"
              >
                Tutup Analisis Kemajuan Belajar Siswa
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
