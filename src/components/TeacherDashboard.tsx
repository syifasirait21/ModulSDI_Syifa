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
  onCreateLesson: (lesson: LessonContent) => void;
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
  onCreateLesson,
}: TeacherDashboardProps) {
  // Filter only student accounts
  const students = allUsers.filter((u) => u.role === "siswa");

  // Local state for UI
  const [dashboardTab, setDashboardTab] = useState<"siswa" | "tugas" | "materi">("siswa");
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

  // States for adding a new lesson (materi)
  const [isLessonFormOpen, setIsLessonFormOpen] = useState(false);
  const [creatorTab, setCreatorTab] = useState("dasar"); // dasar, pemantik, eksplorasi, sains, quran, etnosains, kuis
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDesc, setNewLessonDesc] = useState("");
  const [newLessonIcon, setNewLessonIcon] = useState("🏔️");
  const [newLessonColor, setNewLessonColor] = useState("emerald");
  
  // Tab 1: Pemantik
  const [newLessonPemantikQuestion, setNewLessonPemantikQuestion] = useState("Bagaimana peranan murni sistem pegunungan menjaga keseimbangan daerah Danau Toba?");
  const [newLessonPemantikText, setNewLessonPemantikText] = useState("Kawasan Danau Toba dilingkari oleh jajaran patahan dan gunung vulkanik aktif. Mari selidiki mengapa tatanan ini diciptakan sedemikian rupa.");

  // Tab 2: Eksplorasi
  const [newLessonEksplorasiText, setNewLessonEksplorasiText] = useState("Berikut adalah poin eksplorasi mendalam tentang integrasi paku bumi di wilayah pegunungan Tapanuli Utara.");
  const [newLessonEksplorasiPoint1Title, setNewLessonEksplorasiPoint1Title] = useState("Mekanisme Penahan Lempeng");
  const [newLessonEksplorasiPoint1Desc, setNewLessonEksplorasiPoint1Desc] = useState("Secara dinamis, deretan perbukitan mereduksi dampak sismik akibat pergerakan patahan besar Sumatra (Sesar Besar Semangko).");
  const [newLessonEksplorasiPoint2Title, setNewLessonEksplorasiPoint2Title] = useState("Preservasi Mata Air (Mual)");
  const [newLessonEksplorasiPoint2Desc, setNewLessonEksplorasiPoint2Desc] = useState("Hutan pegunungan yang terpelihara bertindak sebagai spons alami yang murni menyerap curah hujan tinggi.");

  // Tab 3: Sains (IPA)
  const [newLessonSainsTitle, setNewLessonSainsTitle] = useState("Analisis Geologi Tektonik");
  const [newLessonSainsText, setNewLessonSainsText] = useState("Secara geofisika, kehadiran akar paku bumi memperkukuh lempeng agar tidak bergeser tak beraturan.");
  const [newLessonDiagramType, setNewLessonDiagramType] = useState("volcano");

  // Tab 4: Al-Qur'an
  const [newLessonQuranVerse, setNewLessonQuranVerse] = useState("Al-Anbiya' : 31");
  const [newLessonQuranArabic, setNewLessonQuranArabic] = useState("وَجَعَلْنَا فِي الْاَرْضِ رَوَاسِيَ اَنْ تَمِيدَ بِهِمْۗ");
  const [newLessonQuranTranslation, setNewLessonQuranTranslation] = useState("Dan Kami telah menciptakan di bumi ini gunung-gunung yang kokoh agar ia tidak guncang bersama mereka.");
  const [newLessonQuranHikmah, setNewLessonQuranHikmah] = useState("Rawasiya bermakna gunung yang menancap kuat sebagai penyeimbang mekanis kerak bumi.");
  
  // Tab 5: Etnosains Batak
  const [newLessonBatakTitle, setNewLessonBatakTitle] = useState("Kearifan Dolok ni Danau Toba");
  const [newLessonBatakNarrative, setNewLessonBatakNarrative] = useState("Suku Batak menghormati puncak dolok (gunung) sebagai wilayah suci penjaga ekosistem penampung air.");
  
  // Tab 6: Latihan & Rangkuman
  const [newLessonRangkuman1, setNewLessonRangkuman1] = useState("Sains membuktikan struktur pegunungan menyumbang kestabilan kerak bumi (seperti jangkar).");
  const [newLessonRangkuman2, setNewLessonRangkuman2] = useState("Al-Qur'an mengisyaratkan istilah 'Rawasiya' yang sejalan dengan teori isostasi geologi modern.");
  const [newLessonRangkuman3, setNewLessonRangkuman3] = useState("Adat Batak Toba melarang keras penebangan hutan penopang di puncak bukit demi kelestarian mata air.");
  
  const [customQuizzes, setCustomQuizzes] = useState<Array<{
    question: string;
    options: string;
    correctIndex: number;
    explanation: string;
  }>>([
    {
      question: "Maksud kata 'Rawasiya' yang sejalan dengan istilah paku bumi geologi adalah?",
      options: "Gunung yang menancap kokoh, Lembah sungai dalam, Dataran pasir luas, Samudra berombak tinggi",
      correctIndex: 0,
      explanation: "Perpaduan sains, iman, dan adat sejalan mengajarkan pelestarian pegunungan sebagai poros stabilitas bumi."
    }
  ]);
  
  const [newLessonSuccess, setNewLessonSuccess] = useState(false);
  const [newLessonError, setNewLessonError] = useState("");

  const loadExampleTemplate = () => {
    setNewLessonTitle("Konservasi Dolok & Sumber Air Mual");
    setNewLessonDesc("Mengupas peranan gunung vulkanik Pusuk Buhit sebagai penyeimbang air tanah serta kearifan suku Batak.");
    setNewLessonIcon("🌋");
    setNewLessonColor("sky");
    setNewLessonPemantikQuestion("Mengapa Dolok (Bukit) Pusuk Buhit dihormati warga sebagai penopang kehidupan Danau Toba?");
    setNewLessonPemantikText("Bagi suku Batak Toba, puncak perbukitan bukan sekadar pemandangan indah, tetapi hulu air suci yang menjaga kelestarian ekologis.");
    setNewLessonEksplorasiText("Mengintegrasikan ilmu modern hidrologi air pegunungan, firman ilahi Al-Qur'an, dan hukum adat Batak.");
    setNewLessonEksplorasiPoint1Title("Penyerapan Air Hutan Pegunungan");
    setNewLessonEksplorasiPoint1Desc("Akar-akar pepohonan di tebing pegunungan menahan struktur tanah dari kelongsoran sekaligus meningkatkan resistensi simpanan air air tanah.");
    setNewLessonEksplorasiPoint2Title("Tradisi Melindungi Hulu Air (Mual)");
    setNewLessonEksplorasiPoint2Desc("Masyarakat diajarkan menghormati wilayah mual (mata air) dengan melarang keras pemotongan ranting pohon di sekitarnya.");
    setNewLessonSainsTitle("Dinamika Hidrologi Pegunungan Toba");
    setNewLessonSainsText("Secara sains geologi, struktur bebatuan kapur dan lereng curam pegunungan Pusuk Buhit menghasilkan filtrasi air alami yang murni.");
    setNewLessonDiagramType("hydrology");
    setNewLessonQuranVerse("An-Nahl : 15");
    setNewLessonQuranArabic("وَاَلْقٰى فِى الْاَرْضِ رَوَاسِيَ اَنْ تَمِيْدَ بِكُمْ");
    setNewLessonQuranTranslation("Dan Dia menancapkan gunung-gunung di bumi agar bumi itu tidak guncang bersama kamu.");
    setNewLessonQuranHikmah("Ayat ini secara nyata menekankan stabilitas bumi akibat pilar pegunungan laksana pasak pengimbang.");
    setNewLessonBatakTitle("Kepercayaan Harangan Adat Batak Toba");
    setNewLessonBatakNarrative("Suku Batak mengenal wilayah hutan lindung suci bebas industri (Harangan Adat) sebagai bentuk perlindungan tanah bersejarah.");
    setNewLessonRangkuman1("Sains membuktikan struktur pegunungan menyumbang kestabilan kerak bumi (seperti jangkar).");
    setNewLessonRangkuman2("Al-Qur'an mengisyaratkan istilah 'Rawasiya' yang sejalan dengan teori isostasi geologi modern.");
    setNewLessonRangkuman3("Adat Batak Toba melarang keras penebangan hutan penopang di puncak bukit demi kelestarian mata air.");
    
    setCustomQuizzes([
      {
        question: "Teori apa dalam sains geologi modern yang sejalan dengan peran gunung sebagai jangkar (pasak) pengimbang bumi?",
        options: "Teori Isostasi Kerak Bumi, Teori Erosi Angin Gurun, Teori Sedimentasi Sungai, Teori Pasang Surut Laut",
        correctIndex: 0,
        explanation: "Teori Isostasi memaparkan bahwa kerak bumi mengapung seimbang di atas mantel layaknya gunung es terapung."
      },
      {
        question: "Bagaimanakah masyarakat adat Batak Toba menghormati kelestarian puncak perbukitan mual?",
        options: "Melalui sistem perlindungan hutan bernama Tombak Pamulaan, Melakukan pengeboran sumber panas bumi berskala besar, Melompati tumpukan batu dolok murni setiap panen, Meratakan lereng bukit curam untuk penimbunan saba",
        correctIndex: 0,
        explanation: "Tombak Pamulaan (hutan suci adat/larangan) dilindungi keras oleh hukum adat demi sirkulasi mata air ulayat."
      },
      {
        question: "Isyarat ilmiah air minum segar dari pegunungan berdasar Surah Al-Mursalat: 27 mengutarakan istilah...",
        options: "Maa-an Furaatan, Kautsar Jinan, Maa-an Salsabila, Ghassaqan Qatara",
        correctIndex: 0,
        explanation: "Maa-an Furaatan berarti air tawar menyejukkan yang disaring murni oleh formasi batuan pasak bumi pegunungan."
      }
    ]);
    setCreatorTab("dasar");
  };

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

  const handleCreateLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewLessonError("");
    setNewLessonSuccess(false);

    if (!newLessonTitle.trim() || !newLessonDesc.trim()) {
      setNewLessonError("Mohon isi judul dan deskripsi modul materi!");
      return;
    }

    const newId = "materi_custom_" + Date.now();
    
    const quizItems: any[] = [];
    for (let i = 0; i < customQuizzes.length; i++) {
      const q = customQuizzes[i];
      const opts = q.options.split(",").map((o) => o.trim()).filter((o) => o.length > 0);
      if (opts.length < 2) {
        setNewLessonError(`Soal #${i + 1} harus memiliki minimal 2 pilihan jawaban yang sah dipisahkan dengan koma!`);
        return;
      }
      quizItems.push({
        id: `quiz_${newId}_${i + 1}`,
        question: q.question.trim() || `Pertanyaan Evaluasi #${i + 1}`,
        options: opts,
        correctIndex: Number(q.correctIndex) < opts.length ? Number(q.correctIndex) : 0,
        explanation: q.explanation.trim() || "Perpaduan sains, iman, dan adat sejalan mengajarkan pelestarian pegunungan sebagai poros stabilitas bumi."
      });
    }

    if (quizItems.length === 0) {
      setNewLessonError("Mohon masukkan minimal 1 kuis untuk evaluasi materi!");
      return;
    }

    const createdLesson: LessonContent = {
      id: newId,
      title: newLessonTitle,
      shortDesc: newLessonDesc,
      icon: newLessonIcon,
      color: newLessonColor,
      pemantik: {
        question: newLessonPemantikQuestion || "Bagaimana kearifan lokal Toba dan ayat kauniyyah memandang " + newLessonTitle + "?",
        text: newLessonPemantikText || "Modul ini akan merajut keselarasan Al-Qur'an, sains modern geologi, dan adat kebiasaan Batak Toba demi melestarikan alam."
      },
      eksplorasi: {
        text: newLessonEksplorasiText || "Materi Terpadu Mengenai " + newLessonTitle,
        points: [
          {
            title: newLessonEksplorasiPoint1Title || "Mekanisme Penahan Lempeng",
            desc: newLessonEksplorasiPoint1Desc || "Secara dinamis, deretan perbukitan mereduksi dampak sismik akibat pergerakan patahan besar."
          },
          {
            title: newLessonEksplorasiPoint2Title || "Siklus Kehidupan Toba",
            desc: newLessonEksplorasiPoint2Desc || "Hutan pegunungan yang terpelihara bertindak secara sosiologis bagi ketersediaan air."
          }
        ]
      },
      sains: {
        title: newLessonSainsTitle || "Fenomena Geologi & Litosfer",
        text: newLessonSainsText || "Setiap dinamika alam memiliki mekanisme penyeimbang yang mencegah kehancuran masif.",
        diagramType: (newLessonDiagramType as any) || "volcano",
        hotspots: [
          { id: "h1", x: 25, y: 35, title: "Lempeng Tektonik", description: "Lapisan tegar terluar kerak yang disetimbangkan pilar-pilar." },
          { id: "h2", x: 65, y: 45, title: "Akar Pasak Pegunungan", description: "Akar pegunungan menembus litosfer laksana pasak tegar pengimbang semesta." }
        ]
      },
      quran: {
        title: "Ayat Kauniyah Terkait",
        verses: [
          {
            surah: newLessonQuranVerse.split(":")[0]?.trim() || "Ayat Pilihan",
            verse: newLessonQuranVerse.split(":")[1]?.trim() || "Fokus",
            arabic: newLessonQuranArabic || "وَالْجِبَالَ اَوْتَادًا",
            translation: newLessonQuranTranslation || "Dan gunung-gunung sebagai pasak?",
            explanation: newLessonQuranHikmah || "Isyarat ilmiah tentang sistem pasak bumi alami."
          }
        ],
        hikmah: newLessonQuranHikmah || "Pelajaran berharga mengenai konstruksi penyeimbang semesta."
      },
      etnosains: {
        title: newLessonBatakTitle || "Kearifan Leluhur Batak",
        origin: "Kawasan Danau Toba",
         narrative: newLessonBatakNarrative || "Tradisi menghormati bukit hulu air agar ketersediaan air minum dan sawah senantiasa terjaga.",
        practices: [
          {
            title: "Simpanan Air (Mual)",
            desc: "Melarang perusakan vegetasi lereng gunung demi menjaga sumber air bersih lestari.",
            icon: "Droplets"
          },
          {
            title: "Harangan Adat (Hutan Melindung)",
            desc: "Sanksi sosial bagi penebang liar di lereng mual suci adat.",
            icon: "Sprout"
          }
        ]
      },
      rangkuman: [
        newLessonRangkuman1 || "Sains membuktikan struktur pegunungan menyumbang kestabilan kerak bumi (seperti jangkar).",
        newLessonRangkuman2 || "Al-Qur'an mengisyaratkan istilah 'Rawasiya' yang sejalan dengan teori isostasi geologi modern.",
        newLessonRangkuman3 || "Adat Batak Toba melarang keras penebangan hutan penopang di puncak bukit demi kelestarian mata air."
      ],
      quiz: quizItems
    };

    onCreateLesson(createdLesson);
    setNewLessonSuccess(true);
    
    // Reset basic states
    setNewLessonTitle("");
    setNewLessonDesc("");
    setCustomQuizzes([
      {
        question: "Maksud kata 'Rawasiya' yang sejalan dengan istilah paku bumi geologi adalah?",
        options: "Gunung yang menancap kokoh, Lembah sungai dalam, Dataran pasir luas, Samudra berombak tinggi",
        correctIndex: 0,
        explanation: "Perpaduan sains, iman, dan adat sejalan mengajarkan pelestarian pegunungan sebagai poros stabilitas bumi."
      }
    ]);
    setIsLessonFormOpen(false); // Auto Collapse on success to show feedback
    
    setTimeout(() => {
      setNewLessonSuccess(false);
    }, 4500);
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

      {/* WORKSPACE SELECTION TABS BAR */}
      <div className="flex flex-col sm:flex-row bg-slate-100 p-1.5 rounded-2xl gap-1 mb-6 border border-slate-200 shrink-0 select-none">
        <button
          type="button"
          onClick={() => setDashboardTab("siswa")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
            dashboardTab === "siswa"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>📊 Portal Monitoring Siswa</span>
        </button>

        <button
          type="button"
          onClick={() => setDashboardTab("tugas")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
            dashboardTab === "tugas"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
          }`}
        >
          <Send className="w-4 h-4 text-amber-500" />
          <span>📝 Rancang Tugas Mandiri</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setDashboardTab("materi");
            setIsLessonFormOpen(true); // Auto expand in custom builder tab
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
            dashboardTab === "materi"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
          }`}
        >
          <BookOpenCheck className="w-4 h-4 text-emerald-500" />
          <span>✨ Penyusunan Materi Baru</span>
        </button>
      </div>

      {/* DYNAMIC WORKSPACE COMPONENT RENDERING */}
      <AnimatePresence mode="wait">
        {dashboardTab === "siswa" && (
          <motion.div
            key="tab_siswa"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* LEFT 7 COLUMNS: STUDENT LEADERBOARD & INDIVIDUAL STATS */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                      Daftar Prestasi Siswa
                    </h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">
                      Klik nama siswa di bawah untuk menganalisis kartu laporan & lencana kelulusannya secara rinci
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
                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                  {filteredStudents.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p className="text-xs font-black">Belum ada siswa yang terdaftar.</p>
                      <p className="text-[10px] mt-1">Siswa dapat mendaftar lewat portal pembuatan akun baru.</p>
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
                            className="flex items-center justify-between p-3 bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-400/50 rounded-xl transition-all cursor-pointer shadow-sm active:scale-[0.99]"
                          >
                            <div className="flex items-center gap-3">
                              {/* RANK BADGE */}
                              <span className={`w-5 text-xs font-black text-center ${idx === 0 ? "text-yellow-600 font-extrabold text-sm" : idx === 1 ? "text-slate-500 font-bold" : "text-slate-400 font-medium"}`}>
                                #{idx + 1}
                              </span>
                              {/* AVATAR */}
                              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-lg overflow-hidden shrink-0 shadow-inner">
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
                                <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider">
                                  Aktivitas Modul
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
                                <span className="text-[9px] text-slate-400 block font-bold">Tuntas</span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT 5 COLUMNS: CLASS ECOSYSTEM ANALYSIS & ANALYTICS */}
            <div className="lg:col-span-5 space-y-4">
              {/* CURRICULUM CLASS MASTERY BAR CHART INSPIRED CHECKLIST */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                    Rerata Progres Kelas per Modul
                  </h3>
                </div>

                <div className="space-y-4">
                  {lessons.map((lesson) => {
                    const studentCountForLesson = students.length;
                    const totalProgressPct = students.reduce((acc, s) => acc + (s.progress?.[lesson.id] || 0), 0);
                    const avgProgress = studentCountForLesson > 0 ? Math.round(totalProgressPct / studentCountForLesson) : 0;
                    const graduates = students.filter(s => (s.progress?.[lesson.id] || 0) === 100).length;

                    return (
                      <div key={lesson.id} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-1.5 font-bold text-slate-700">
                            <span className="text-sm">{lesson.icon}</span>
                            <span className="truncate max-w-[170px]">{lesson.title}</span>
                          </div>
                          <span className="font-extrabold text-slate-800 font-mono bg-slate-100 px-1.5 py-0.5 rounded-md text-[10px]">{avgProgress}% Rata-Rata</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 rounded-full bg-${
                              lesson.color === "emerald" ? "emerald" : lesson.color === "sky" ? "sky" : "amber"
                            }-500`}
                            style={{ width: `${avgProgress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                          <span>{graduates} dari {totalStudents} anak lulus</span>
                          <span>{lessons.length > 0 ? "Kurikulum Terintegrasi" : "Draf"}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RETRO QUICK PANEL ACCENTS */}
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 md:p-5 shadow-md relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 opacity-10 pointer-events-none">
                  <Compass className="w-44 h-44 animate-spin text-white" style={{ animationDuration: "80s" }} />
                </div>
                <div className="relative z-10 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-black uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 fill-current text-amber-400" />
                    <span>Panel Cepat Edukator</span>
                  </div>
                  <p className="text-[10.5px] text-slate-350 leading-relaxed font-medium">
                    Sebagai guru, Anda memegang hak penuh menentukan target belajar siswa. Integrasikan kearifan lokal <strong>Dolok ni Danau Toba</strong> ke dalam sistem nilai sains murni.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setDashboardTab("tugas")}
                      className="flex-1 py-1 px-2.5 bg-slate-800 hover:bg-slate-755 border border-slate-700 hover:border-slate-600 rounded-xl text-[10px] text-amber-300 font-black uppercase tracking-wide cursor-pointer text-center transition-all shadow-xs"
                    >
                      + Buat Tugas
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDashboardTab("materi");
                        setIsLessonFormOpen(true);
                      }}
                      className="flex-1 py-1 px-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 rounded-xl text-[10px] text-emerald-400 font-black uppercase tracking-wide cursor-pointer text-center transition-all shadow-xs"
                    >
                      + Tulis Modul
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {dashboardTab === "tugas" && (
          <motion.div
            key="tab_tugas"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* LEFT 5 COLUMNS: LIST OF ACTIVE ASSIGNMENTS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <h4 className="text-xs font-black text-slate-750 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Tugas Aktif Terjadwal ({assignments.length})</span>
                  </h4>
                </div>

                {assignments.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Send className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-xs font-black">Tidak ada tugas mandiri yang aktif.</p>
                    <p className="text-[10px] mt-1">Gunakan formulir disamping untuk merancang tugas mandiri baru.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                    {assignments.map((as) => {
                      const correlatedLesson = lessons.find((l) => l.id === as.lessonId);
                      const countFinished = students.filter(
                        (s) => (s.progress?.[as.lessonId] || 0) === 100
                      ).length;

                      return (
                        <div
                          key={as.id}
                          className="p-3 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl flex items-start justify-between gap-3 text-xs shadow-xs"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <h5 className="font-extrabold text-slate-800 line-clamp-1">{as.title}</h5>
                            </div>
                            <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed">{as.instruction}</p>
                            <div className="flex flex-wrap items-center gap-3 text-[9px] text-slate-450 font-black pt-1">
                              <span className="text-amber-600 bg-amber-50 border border-amber-100 rounded-md px-1.5 py-0.5">🎁 +{as.points} XP</span>
                              <span className="text-slate-600 bg-slate-100 border border-slate-150 rounded-md px-1.5 py-0.5">📚 {correlatedLesson?.title || "Materi Umum"}</span>
                              <span className="text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-md px-1.5 py-0.5">🏆 Tuntas: {countFinished} / {students.length}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => onDeleteAssignment(as.id)}
                            className="bg-white max-w-max hover:bg-rose-50 border border-slate-200 hover:border-rose-300 hover:text-rose-600 p-1.5 rounded-xl transition-all cursor-pointer shrink-0 text-slate-400 active:scale-95"
                            title="Hapus Penugasan Mandiri"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT 7 COLUMNS: EXPANDED ASSIGNMENT CREATION FORM */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                  <div className="p-2 bg-amber-50 text-amber-500 rounded-xl">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                      Rancang Tugas Mandiri Baru
                    </h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">Tugas akan langsung disebarkan ke beranda / portal misi siswa secara dinamis.</p>
                  </div>
                </div>

                <form onSubmit={handlePostTaskSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                      PILIH MATERI ACUAN / MODUL RUJUKAN
                    </label>
                    <select
                      value={taskLessonId}
                      onChange={(e) => setTaskLessonId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-400 text-slate-700 font-bold"
                    >
                      {lessons.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.icon} {l.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                      JUDUL PENUGASAN MANDIRI
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Meneliti Isostasi Dolok Toba, Menyelesaikan Tantangan Kuis"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-amber-400 text-slate-850 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                      PETUNJUK DETIL / INSTRUKSI SISWA
                    </label>
                    <textarea
                      required
                      placeholder="Contoh: Bukalah Modul Air Hidup, kemudian pelajari kearifan adat lokal mual serta buatlah catatan pendek relevansinya dengan siklus hidrologi di kawasan Pusuk Buhit."
                      value={taskInstruction}
                      onChange={(e) => setTaskInstruction(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-amber-400 text-slate-850 font-bold resize-none leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                      ALOKASI XP HADIAH ({taskPoints} XP)
                    </label>
                    <div className="flex gap-2">
                      {[20, 50, 100, 150].map((pt) => (
                        <button
                          type="button"
                          key={pt}
                          onClick={() => setTaskPoints(pt)}
                          className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            taskPoints === pt
                              ? "bg-amber-400 text-slate-950 shadow-sm border border-amber-300"
                              : "bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                          }`}
                        >
                          +{pt} XP
                        </button>
                      ))}
                    </div>
                  </div>

                  {formSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-emerald-800 font-black bg-emerald-50 border border-emerald-250 px-3 py-2 rounded-xl shadow-xs"
                    >
                      ✓ Sukses: Tugas berhasil diterbitkan & disebarkan ke semua siswa!
                    </motion.div>
                  )}

                  {formError && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[11px] text-rose-800 font-bold bg-rose-50 border border-rose-250 px-3 py-2 rounded-xl shadow-xs"
                    >
                      ⚠️ {formError}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98] border border-slate-900"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>Terbitkan & Siarkan Tugas Mandiri 🚀</span>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {dashboardTab === "materi" && (
          <motion.div
            key="tab_materi"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start animate-fade-in"
          >
            {/* XL-COL-4: ACTIVE IN-FRAME CURRICULUM OVERVIEW */}
            <div className="xl:col-span-4 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-3">
                  <BookOpen className="w-4 h-4 text-emerald-500 hover:animate-pulse" />
                  <h3 className="text-xs font-black text-slate-750 uppercase tracking-wider">
                    Modul Kurikulum Aktif ({lessons.length})
                  </h3>
                </div>

                <div className="space-y-3 max-h-[510px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all text-xs"
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-base shrink-0">{lesson.icon}</span>
                          <div>
                            <h4 className="font-black text-slate-800 leading-tight block">{lesson.title}</h4>
                            <span className="text-[8.5px] text-slate-400 font-mono">ID: {lesson.id}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider font-mono text-white bg-${lesson.color === "emerald" ? "emerald" : lesson.color === "sky" ? "sky" : "amber"}-500 shadow-xs shrink-0`}>
                          No. {index + 1}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed line-clamp-2">{lesson.shortDesc}</p>
                      
                      <div className="flex flex-wrap items-center gap-1.5 text-[8.5px] font-black uppercase text-slate-450 mt-2">
                        <span className="bg-white border border-slate-150 rounded px-1 py-0.5">🕌 Kauniyah</span>
                        <span className="bg-white border border-slate-150 rounded px-1 py-0.5">🧪 Sains</span>
                        <span className="bg-white border border-slate-150 rounded px-1 py-0.5">⛰️ Adat Batak</span>
                        <span className="bg-amber-400/10 text-amber-600 border border-amber-400/20 rounded px-1.5 py-0.5">✓ {lesson.quiz.length} Kuis</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* XL-COL-8: FULL DYNAMIC CREATOR BOX */}
            <div className="xl:col-span-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm">
                
                {/* DYNAMIC LESSON CREATOR CARD HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4 text-left">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                      <BookOpenCheck className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                        Penyusun Modul Terpadu Terintegrasi
                      </h3>
                      <p className="text-[11px] text-slate-400 font-bold mt-0.5">Kustomisasi kurikulum dengan integrasi multidimensi secara instan.</p>
                    </div>
                  </div>
                </div>

                {/* STATUS INFORMASI JIKA SUKSES */}
                {newLessonSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3.5 bg-emerald-50 text-emerald-850 border border-emerald-200 rounded-xl flex items-center gap-2 text-[11px] font-bold shadow-xs"
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                    <span>Materi modul pembelajaran baru berhasil diterbitkan & terintegrasi penuh ke semua portal siswa!</span>
                  </motion.div>
                )}

                {isLessonFormOpen && (
                  <form onSubmit={handleCreateLessonSubmit} className="space-y-4">
                    {/* TEMPLATE SUGGESTION HEADER ACTION */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 bg-slate-50 border border-slate-150 rounded-2xl shadow-xs">
                      <div>
                        <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                          <span>Butuh inspirasi penyusunan?</span>
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium">Muat draf komplit yang menyatukan Sains, Al-Qur'an, dan adat secara otomatis.</p>
                      </div>
                      <button
                        type="button"
                        onClick={loadExampleTemplate}
                        className="self-start sm:self-auto py-1.5 px-3 bg-emerald-550 hover:bg-emerald-600 text-slate-950 text-[10.5px] font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-[0.97]"
                      >
                        <span>Muat Contoh Integrasi</span>
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    {/* HORIZONTAL MINI-TABS BAR FOR CREATOR STEPPERS */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-100 scrollbar-thin scrollbar-thumb-slate-200">
                      {[
                        { id: "dasar", label: "Dasar", col: "text-slate-500" },
                        { id: "pemantik", label: "Pemantik", col: "text-amber-600" },
                        { id: "eksplorasi", label: "Eksplorasi", col: "text-rose-500" },
                        { id: "sains", label: "Sains IPA", col: "text-sky-500" },
                        { id: "quran", label: "Al-Qur'an", col: "text-emerald-600" },
                        { id: "etnosains", label: "Etnosains", col: "text-teal-600" },
                        { id: "kuis", label: "Kuis", col: "text-indigo-600" }
                      ].map((tab) => {
                        const isSelected = creatorTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setCreatorTab(tab.id)}
                            className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                              isSelected
                                ? "bg-slate-800 text-white shadow-xs"
                                : "bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-150"
                            }`}
                          >
                            <span className="mr-1">{isSelected ? "●" : "○"}</span>
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* ACTIVE TAB CONTENTS */}
                    <AnimatePresence mode="wait">
                      {creatorTab === "dasar" && (
                        <motion.div
                          key="dasar"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="space-y-3.5"
                        >
                          <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl text-[10.5px] font-bold text-slate-600 leading-normal flex gap-2 items-center">
                            <BookOpen className="w-4 h-4 text-slate-500 shrink-0" />
                            <span>Isi identitas awal modul. Atribut ini akan tampil sebagai kartu modul di beranda depan siswa.</span>
                          </div>

                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                              Judul Modul Pembelajaran
                            </label>
                            <input
                              type="text"
                              value={newLessonTitle}
                              onChange={(e) => setNewLessonTitle(e.target.value)}
                              placeholder="Materi utama (misal: Konservasi Ulu Air & Stablitas Alam)"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-400 text-slate-800 font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                              Deskripsi Ringkas Modul
                            </label>
                            <textarea
                              value={newLessonDesc}
                              onChange={(e) => setNewLessonDesc(e.target.value)}
                              placeholder="Terangkan secara ringkas apa yang kelak dipelajari siswa di dalam bab ini..."
                              rows={2.5}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-400 text-slate-800 font-bold resize-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                Simbol Emoji Modul
                              </label>
                              <select
                                value={newLessonIcon}
                                onChange={(e) => setNewLessonIcon(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-400 text-slate-750 font-bold"
                              >
                                <option value="🏔️">🏔️ Gunung Salju</option>
                                <option value="🌋">🌋 Gunung Api</option>
                                <option value="🌊">🌊 Air / Danau</option>
                                <option value="🧭">🧭 Kompas Penunjuk</option>
                                <option value="🌳">🌳 Hutan Lestari</option>
                                <option value="📜">📜 Naskah Adat</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                Warna Aksen Visual
                              </label>
                              <select
                                value={newLessonColor}
                                onChange={(e) => setNewLessonColor(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-400 text-slate-755 font-bold"
                              >
                                <option value="emerald">Hijau Zamrud</option>
                                <option value="sky">Biru Langit</option>
                                <option value="amber">Kuning Emas</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {creatorTab === "pemantik" && (
                        <motion.div
                          key="pemantik"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="space-y-3.5"
                        >
                          <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl text-[10.5px] font-bold text-amber-700 leading-normal flex gap-2 items-center">
                            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 animate-pulse" />
                            <span>Memicu pemikiran kritis awal siswa dengan studi kasus fenomena pegunungan sekitar Danau Toba.</span>
                          </div>

                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                              Pertanyaan Pemantik Aktif
                            </label>
                            <input
                              type="text"
                              value={newLessonPemantikQuestion}
                              onChange={(e) => setNewLessonPemantikQuestion(e.target.value)}
                              placeholder="Pertanyaan berupa problem solving (contoh: Mengapa puncak doli di hargai adat?)"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-400 text-slate-800 font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                              Teks Pengantar Penyelidikan Awal
                            </label>
                            <textarea
                              value={newLessonPemantikText}
                              onChange={(e) => setNewLessonPemantikText(e.target.value)}
                              placeholder="Tulislah narasi pemicu yang menantang mental analisis murid di fase pra-eksplorasi..."
                              rows={3.5}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-400 text-slate-800 font-bold resize-none leading-relaxed"
                            />
                          </div>
                        </motion.div>
                      )}

                      {creatorTab === "eksplorasi" && (
                        <motion.div
                          key="eksplorasi"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="space-y-3.5"
                        >
                          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-[10.5px] font-bold text-rose-800 leading-normal">
                            ✍️ Bagian ini akan muncul di tab <strong className="font-extrabold uppercase">'Eksplorasi'</strong> siswa. Menyajikan pokok-pokok fakta ilmiah terpadu.
                          </div>

                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                              Narasi Pembuka Eksplorasi
                            </label>
                            <textarea
                              value={newLessonEksplorasiText}
                              onChange={(e) => setNewLessonEksplorasiText(e.target.value)}
                              placeholder="Teks analisis pembuka..."
                              rows={2}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-400 text-slate-800 font-bold font-sans resize-none"
                            />
                          </div>

                          {/* POIN 1 */}
                          <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                            <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-wider block">Pilar Fakta 1</span>
                            <input
                              type="text"
                              value={newLessonEksplorasiPoint1Title}
                              onChange={(e) => setNewLessonEksplorasiPoint1Title(e.target.value)}
                              placeholder="Judul Sub-bahasan 1"
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-bold focus:outline-none focus:border-emerald-400"
                            />
                            <textarea
                              value={newLessonEksplorasiPoint1Desc}
                              onChange={(e) => setNewLessonEksplorasiPoint1Desc(e.target.value)}
                              placeholder="Penjelasan esensial sub-bahasan 1"
                              rows={2}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-bold focus:outline-none focus:border-emerald-400 resize-none"
                            />
                          </div>

                          {/* POIN 2 */}
                          <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                            <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-wider block">Pilar Fakta 2</span>
                            <input
                              type="text"
                              value={newLessonEksplorasiPoint2Title}
                              onChange={(e) => setNewLessonEksplorasiPoint2Title(e.target.value)}
                              placeholder="Judul Sub-bahasan 2"
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-bold focus:outline-none focus:border-emerald-400"
                            />
                            <textarea
                              value={newLessonEksplorasiPoint2Desc}
                              onChange={(e) => setNewLessonEksplorasiPoint2Desc(e.target.value)}
                              placeholder="Penjelasan esensial sub-bahasan 2"
                              rows={2}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-bold focus:outline-none focus:border-emerald-400 resize-none"
                            />
                          </div>
                        </motion.div>
                      )}

                      {creatorTab === "sains" && (
                        <motion.div
                          key="sains"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="space-y-3.5"
                        >
                          <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-[10.5px] font-bold text-sky-800 leading-normal flex items-center gap-2">
                            <Compass className="w-4 h-4 text-sky-500 animate-spin shrink-0" style={{ animationDuration: "15s" }} />
                            <span>Materi ini langsung disinkronkan ke tab <strong className="font-extrabold uppercase">'Sains (IPA)'</strong> lengkap dengan simulasi interaktif yang mendalam.</span>
                          </div>

                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                              Judul Kajian Teori Sains
                            </label>
                            <input
                              type="text"
                              value={newLessonSainsTitle}
                              onChange={(e) => setNewLessonSainsTitle(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-400 text-slate-800 font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                              Deskripsi & Analisis Fisika Litosfer
                            </label>
                            <textarea
                              value={newLessonSainsText}
                              onChange={(e) => setNewLessonSainsText(e.target.value)}
                              rows={3.5}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-400 text-slate-800 font-bold resize-none leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                              Gaya Diagram & Metanalogi Visual Sains
                            </label>
                            <select
                              value={newLessonDiagramType}
                              onChange={(e) => setNewLessonDiagramType(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:border-emerald-400 text-slate-700 font-bold"
                            >
                              <option value="volcano">🌋 Hubungan Vulkanisme & Aktivitas Magma</option>
                              <option value="tectonic">🗺️ Konvergensi/Patahan Lempeng Tektonik</option>
                              <option value="hydrology">💧 Siklus Aliran Air & Reservoar Pegunungan</option>
                              <option value="isostasy">⚖️ Prinsip Isostasi Keseimbangan Massa Kerak</option>
                            </select>
                          </div>
                        </motion.div>
                      )}

                      {creatorTab === "quran" && (
                        <motion.div
                          key="quran"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="space-y-3.5"
                        >
                          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[10.5px] font-bold text-emerald-850 leading-normal">
                            🕌 Menyematkan bukti <strong className="font-extrabold uppercase">Ayat Kauniyah</strong> Al-Qur'an terikat dengan penemuan teoretis sains masa kini.
                          </div>

                          <div className="grid grid-cols-3 gap-2.5">
                            <div className="col-span-1">
                              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                Rujukan Surah:Ayat
                              </label>
                              <input
                                type="text"
                                value={newLessonQuranVerse}
                                onChange={(e) => setNewLessonQuranVerse(e.target.value)}
                                placeholder="Al-Anbiya' : 31"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-700 font-bold text-center focus:outline-none focus:border-emerald-400"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                Lafadzh Ayat (Arab)
                              </label>
                              <input
                                type="text"
                                value={newLessonQuranArabic}
                                onChange={(e) => setNewLessonQuranArabic(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] text-slate-750 font-bold text-right focus:outline-none focus:border-emerald-400 font-mono"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                              Terjemahan Resmi Kemenag RI
                            </label>
                            <textarea
                              value={newLessonQuranTranslation}
                              onChange={(e) => setNewLessonQuranTranslation(e.target.value)}
                              rows={2}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 font-bold focus:outline-none focus:border-emerald-400 resize-none leading-relaxed"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                              Ulasan Nilai Hikmah & Analogi Integratif
                            </label>
                            <textarea
                              value={newLessonQuranHikmah}
                              onChange={(e) => setNewLessonQuranHikmah(e.target.value)}
                              rows={2.5}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 font-bold focus:outline-none focus:border-emerald-400 resize-none leading-relaxed"
                            />
                          </div>
                        </motion.div>
                      )}

                      {creatorTab === "etnosains" && (
                        <motion.div
                          key="etnosains"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="space-y-3.5"
                        >
                          <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-[10.5px] font-bold text-teal-850 leading-normal">
                            🌳 Kebudayaan <strong className="font-extrabold uppercase">Etnosains Batak Toba</strong>. Mengungkap aturan pamalation adat melestarikan gunung dan bukit penampung air.
                          </div>

                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                              Judul Adat / Karakter Kearifan Adat
                            </label>
                            <input
                              type="text"
                              value={newLessonBatakTitle}
                              onChange={(e) => setNewLessonBatakTitle(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-400 text-slate-800 font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                              Uraian Kisah Rakyat & Sistem Konservasi Tradisional
                            </label>
                            <textarea
                              value={newLessonBatakNarrative}
                              onChange={(e) => setNewLessonBatakNarrative(e.target.value)}
                              rows={4}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-450 text-slate-800 font-bold resize-none leading-relaxed"
                            />
                          </div>
                        </motion.div>
                      )}

                      {creatorTab === "kuis" && (
                        <motion.div
                          key="kuis"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="space-y-4"
                        >
                          {/* SYNTHESIS / SUMMARIES */}
                          <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Poin-Poin Rangkuman Integratif (Untuk Tab Rangkuman Siswa)</span>
                            <input
                              type="text"
                              value={newLessonRangkuman1}
                              onChange={(e) => setNewLessonRangkuman1(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 font-bold focus:outline-none focus:border-emerald-400"
                              placeholder="Poin 1: Hubungan sains murni"
                            />
                            <input
                              type="text"
                              value={newLessonRangkuman2}
                              onChange={(e) => setNewLessonRangkuman2(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 font-bold focus:outline-none focus:border-emerald-400"
                              placeholder="Poin 2: Hubungan Qurani"
                            />
                            <input
                              type="text"
                              value={newLessonRangkuman3}
                              onChange={(e) => setNewLessonRangkuman3(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 font-bold focus:outline-none focus:border-emerald-400"
                              placeholder="Poin 3: Hubungan adat setempat"
                            />
                          </div>

                          {/* KUIS EVALUASI */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider block">✍️ Evaluasi Pemahaman Siswa (Kuis Mandiri)</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setCustomQuizzes([
                                    ...customQuizzes,
                                    {
                                      question: "",
                                      options: "Opsi A, Opsi B, Opsi C, Opsi D",
                                      correctIndex: 0,
                                      explanation: ""
                                    }
                                  ]);
                                }}
                                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-2 py-1 text-[10px] font-bold shadow-xs transition-colors"
                              >
                                <Plus size={12} />
                                Tambah Soal
                              </button>
                            </div>

                            {customQuizzes.map((quiz, qIdx) => (
                              <div key={qIdx} className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-3 relative">
                                <div className="flex items-center justify-between border-b border-indigo-100 pb-1.5 mb-1">
                                  <span className="text-xs font-black text-indigo-800">Soal #{qIdx + 1}</span>
                                  {customQuizzes.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setCustomQuizzes(customQuizzes.filter((_, idx) => idx !== qIdx));
                                      }}
                                      className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                                      title="Hapus Soal"
                                    >
                                      <Trash2 size={13} strokeWidth={2.5} />
                                    </button>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-[8px] font-extrabold text-slate-400 mb-0.5">Pertanyaan Evaluasi</label>
                                  <input
                                    type="text"
                                    value={quiz.question}
                                    onChange={(e) => {
                                      const updated = [...customQuizzes];
                                      updated[qIdx].question = e.target.value;
                                      setCustomQuizzes(updated);
                                    }}
                                    placeholder="e.g. Maksud kata 'Rawasiya' yang sejalan dengan istilah paku bumi geologi adalah?"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-750 font-bold focus:outline-none"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[8px] font-extrabold text-slate-400 mb-0.5">Pilihan Jawaban (Pisahkan dengan tanda koma)</label>
                                  <input
                                    type="text"
                                    value={quiz.options}
                                    onChange={(e) => {
                                      const updated = [...customQuizzes];
                                      updated[qIdx].options = e.target.value;
                                      setCustomQuizzes(updated);
                                    }}
                                    placeholder="Gunung yang menancap kokoh, Lembah sungai dalam, Dataran pasir luas, Samudra berombak tinggi"
                                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-710 focus:outline-none font-bold"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="block text-[8px] font-extrabold text-slate-400 mb-0.5">Kunci Jawaban Benar</label>
                                    <select
                                      value={quiz.correctIndex}
                                      onChange={(e) => {
                                        const updated = [...customQuizzes];
                                        updated[qIdx].correctIndex = Number(e.target.value);
                                        setCustomQuizzes(updated);
                                      }}
                                      className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 font-bold focus:outline-none"
                                    >
                                      <option value={0}>Opsi 1 (Pertama)</option>
                                      <option value={1}>Opsi 2 (Kedua)</option>
                                      <option value={2}>Opsi 3 (Ketiga)</option>
                                      <option value={3}>Opsi 4 (Keempat)</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-[8px] font-extrabold text-slate-400 mb-0.5">Penjelasan Pembahasan</label>
                                    <input
                                      type="text"
                                      value={quiz.explanation}
                                      onChange={(e) => {
                                        const updated = [...customQuizzes];
                                        updated[qIdx].explanation = e.target.value;
                                        setCustomQuizzes(updated);
                                      }}
                                      placeholder="Penjelas ilmiah atau kontekstual..."
                                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-bold focus:outline-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ERROR NOTIFICATION */}
                    {newLessonError && (
                      <p className="text-[11px] text-rose-600 font-black bg-rose-50 px-3 py-2 rounded-xl border border-rose-200 shadow-xs">
                        ⚠️ {newLessonError}
                      </p>
                    )}

                    {/* STEPPER ACTIONS CONTROLLER */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-2">
                      <button
                        type="button"
                        disabled={creatorTab === "dasar"}
                        onClick={() => {
                          const tabs = ["dasar", "pemantik", "eksplorasi", "sains", "quran", "etnosains", "kuis"];
                          const curIdx = tabs.indexOf(creatorTab);
                          if (curIdx > 0) setCreatorTab(tabs[curIdx - 1]);
                        }}
                        className={`py-1.5 px-3 rounded-xl text-[10.5px] font-black uppercase transition-all cursor-pointer ${
                          creatorTab === "dasar"
                            ? "bg-slate-100/50 text-slate-300 cursor-not-allowed border border-slate-100"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-150"
                        }`}
                      >
                        ⬅ Kembali
                      </button>

                      {creatorTab !== "kuis" ? (
                        <button
                          type="button"
                          onClick={() => {
                            const tabs = ["dasar", "pemantik", "eksplorasi", "sains", "quran", "etnosains", "kuis"];
                            const curIdx = tabs.indexOf(creatorTab);
                            if (curIdx < tabs.length - 1) setCreatorTab(tabs[curIdx + 1]);
                          }}
                          className="py-1.5 px-3 bg-slate-800 hover:bg-slate-900 text-white text-[10.5px] font-black uppercase rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Lanjutkan</span>
                          <span>➔</span>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-[11px] uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
                        >
                          <Sparkles className="w-4 h-4 fill-current text-slate-950" />
                          <span>Terbitkan Modul sebagai Materi Baru 🚀</span>
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
