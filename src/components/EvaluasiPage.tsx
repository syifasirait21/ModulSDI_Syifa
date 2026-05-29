import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Timer, Trophy, RotateCcw, CheckCircle, XCircle, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { StudentProfile } from "../types";

interface EvaluasiPageProps {
  profile: StudentProfile;
  onAddXP: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const EVAL_QUESTIONS: ExamQuestion[] = [
  {
    id: "eval_1",
    question: "Konsep 'Awtad' dalam Surah An-Naba' sejalan dengan geologi modern karena...",
    options: [
      "Gunung berdiri melayang tinggi di atmosfer",
      "Gunung memiliki 'akar' dalam litosfer yang menstabilkan kerak bumi",
      "Dinding luar kawah relatif berpasir",
      "Inti bumi terdiri dari belerang murni"
    ],
    correctIndex: 1,
    explanation: "Awtad berarti pasak. Penemuan geologis abad ke-20 membuktikan adanya akar gunung yang masuk kedalam kerak bumi sedalam 5-6 kali tinggi puncaknya untuk bertindak sebagai penyeimbang hidrostatis lempeng (Isostasi)."
  },
  {
    id: "eval_2",
    question: "Letusan kaldera manakah di Sumatera Utara yang melahirkan Danau Toba dan Pulau Samosir sekitarnya?",
    options: [
      "Erupsi Gunung Sinabung Purba",
      "Erupsi Supervolcano Toba Purba 74.000 tahun silam",
      "Erupsi Geothermal Gunung Sibayak",
      "Gempa Tektonik Sesar Mentawai"
    ],
    correctIndex: 1,
    explanation: "Erupsi Gunung Toba Purba (Supervolcano Toba) memuntahkan ribuan kilometer kubik magma rontok, membentuk cekungan kaldera terisi air hujan raksasa."
  },
  {
    id: "eval_3",
    question: "Dinamika bumi yang bergerak lambat namun pasti diungkap dalam Surah An-Naml Ayat 88 melalui analogi pergerakan...",
    options: [
      "Aliran air laut dunia",
      "Jalannya awan di langit ditiup angin",
      "Pertumbuhan tunas tanaman hijau",
      "Guguran dedaunan pohon kering"
    ],
    correctIndex: 1,
    explanation: "Tafsir ayat menerangkan gunung berjalan layaknya pergerakan awan (Marras Sahaab). Hal ini sesuai dengan bergesernya lempeng benua bumi."
  },
  {
    id: "eval_4",
    question: "Suku Batak Toba menghormati hutan pegunungan di sekitar 'Mual' (Mata Air) melalui penerapan zonasi adat bernama...",
    options: [
      "Sopo Saba Sopo Bona",
      "Tombak Pamulaan / Tombak Larangan",
      "Parhalaan Solu Bolon",
      "Adat Horas Samosir"
    ],
    correctIndex: 1,
    explanation: "Tombak Pamulaan atau Tombak Larangan merupakan hutan pegunungan konservasi primer yang sakral demi menjaga ekosistem pasokan air tawar ulayat."
  },
  {
    id: "eval_5",
    question: "Ketinggian tempat pegunungan sekitar Danau Toba menghasilkan rasa herba berkelas pada produk kopi arabika unggulan...",
    options: [
      "Kopi Gayo",
      "Kopi Lintong",
      "Kopi Toraja",
      "Kopi Luwak Lampung"
    ],
    correctIndex: 1,
    explanation: "Kopi Lintong tumbuh subur di dataran tinggi tanah andosol vulkanis pegunungan keliling Toba rasa khas rempah alami."
  },
  {
    id: "eval_6",
    question: "Apakah nama teori geofisika yang membahas kesetimbangan massa kerak bumi melayang keras di atas mantel lembek?",
    options: [
      "Teori Relativitas Massa",
      "Teori Isostasi",
      "Teori Gravitasi Mekanis",
      "Teori Orografis Kondensasi"
    ],
    correctIndex: 1,
    explanation: "Isostasi menggambarkan keseimbangan tekanan hidrostatik sehingga bentuk tinggi rendah kerak bumi tetap stabil di bawah pengaruh rotasi bumi."
  },
  {
    id: "eval_7",
    question: "Istilah Al-Qur'an 'Mauzun' dalam QS. Al-Hijr:19 menerangkan pertumbuhan tanaman di pegunungan dalam takaran...",
    options: [
      "Kelimpaan acak tanpa aturan",
      "Kadar mineral berimbang secara presisi",
      "Campuran kimia beracun",
      "Suhu beku kutub ekstrem"
    ],
    correctIndex: 1,
    explanation: "Mauzun (موزون) berarti seimbang ukuran kadarnya secara sangat pas untuk kesuburan ekosistem flora."
  },
  {
    id: "eval_8",
    question: "Siapakah sosok naga raksasa dalam tutur lisan kosmologi Batak kuno yang dikaitkan dengan goncangan gempa tektonik samudera?",
    options: [
      "Raja Sisingamangaraja",
      "Naga Padoha Niaji",
      "Si Boru Deak Parujar",
      "Mulajadi Na Bolon"
    ],
    correctIndex: 1,
    explanation: "Naga Padoha Niaji dipercaya bersemayam di perut bumi bawah tanah ulayat, merefleksikan getaran gempa patahan Semangko."
  },
  {
    id: "eval_9",
    question: "Istilah air yang bersumber dari gunung dalam QS. Al-Mursalat:27 diberi sifat sangat tawar, yaitu...",
    options: [
      "Maa-an Furaatan",
      "Maa-an Thahuuran",
      "Kautsar Barakah",
      "Zamzam Khalis"
    ],
    correctIndex: 0,
    explanation: "Maa-an Furaatan (ماء فراتا) merujuk kepada air penyejuk yang tawar murni pasca filtrasi alami bebatuan celah tebing gunung tinggi."
  },
  {
    id: "eval_10",
    question: "Bagaimanakah landmark Dolok Tolong atau Pusuk buhit menolong nelayan solu bolon parahu kuno?",
    options: [
      "Sebagai tempat singgah membakar ikan",
      "Sebagai mercu suar arah visual angin & koordinat Toba",
      "Sebagai benteng perang suku",
      "Tempat bercocok tanam kelapa sawit"
    ],
    correctIndex: 1,
    explanation: "Penampakan drajat siluet dua dolok besar tersebut memandu kemudi spasial saat menembus pekatnya embun kabut Danau Toba."
  }
];

export default function EvaluasiPage({ profile, onAddXP, onUnlockBadge }: EvaluasiPageProps) {
  const [examState, setExamState] = useState<"intro" | "running" | "ended">("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes total countdown
  const [score, setScore] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examState === "running" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examState, timeLeft]);

  const handleStartExam = () => {
    setAnswers({});
    setCurrentIdx(0);
    setTimeLeft(180);
    setExamState("running");
  };

  const handleSelectAnswer = (optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleNext = () => {
    if (currentIdx < EVAL_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      handleFinishExam();
    }
  };

  const handleFinishExam = () => {
    // Count correctness
    let correctCount = 0;
    EVAL_QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / EVAL_QUESTIONS.length) * 100);
    setScore(calculatedScore);
    setExamState("ended");

    // Award rewards
    if (calculatedScore >= 70) {
      onUnlockBadge("badge_conqueror");
      onAddXP(100 + calculatedScore);
    } else {
      onAddXP(calculatedScore);
    }
  };

  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 pb-24 font-sans select-none overflow-y-auto">
      <AnimatePresence mode="wait">
        {/* INTRO SCREEN STATE */}
        {examState === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 flex flex-col items-center justify-center my-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl mb-5 animate-pulse text-amber-600">
              🏆
            </div>

            <h2 className="text-xl font-black text-slate-800 tracking-wide uppercase">Evaluasi Akhir Modul</h2>
            <p className="text-xs text-slate-600 mt-2 max-w-sm leading-relaxed px-4">
              Uji pemahaman mendalammu mengenai keterpaduan aspek Geologi Sains IPA, Rahasia Tafsir Quraniyah, dan Kearifan Alam Batak Toba.
            </p>

            <div className="w-full max-w-sm mt-8 space-y-3.5 bg-white border border-slate-200 p-5 rounded-3xl text-left shadow-md">
              <div className="flex items-center gap-3">
                <Timer className="w-4.5 h-4.5 text-sky-550 shrink-0 animate-pulse" />
                <div>
                  <h4 className="text-xs font-black text-slate-700 uppercase">Batas Waktu</h4>
                  <p className="text-[10px] text-slate-505 font-bold">3 Menit (180 detik)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Trophy className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-xs font-black text-slate-700 uppercase">Syarat Kelulusan lencana</h4>
                  <p className="text-[10px] text-slate-505 font-bold">Skor minimal 70 untuk membuka Lencana Penakluk Samosir</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartExam}
              id="btn_eval_start"
              className="mt-10 px-8 py-3.5 w-60 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_4px_15px_rgba(245,158,11,0.25)] cursor-pointer"
            >
              Mulai Ujian
            </button>
          </motion.div>
        )}

        {/* RUNNING EXAM SCREEN STATE */}
        {examState === "running" && (
          <motion.div
            key="running"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            {/* TIMER & PROGRESS ROW CONTAINER */}
            <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10 shrink-0">
              <div className="flex items-center gap-2">
                <Timer className="w-4.5 h-4.5 text-orange-600 animate-spin" />
                <span className="text-sm font-mono font-black text-orange-600">{formatTime(timeLeft)}</span>
              </div>

              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
                No. {currentIdx + 1} / {EVAL_QUESTIONS.length}
              </span>
            </div>

            {/* TIMELINE TIMER BAR */}
            <div className="w-full h-1.5 bg-slate-100">
              <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${(timeLeft / 180) * 100}%` }} />
            </div>

            {/* QUESTION DISPLAY CONTAINER */}
            <div className="flex-1 p-6 space-y-5">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md">
                <p className="text-sm font-extrabold text-slate-800 leading-relaxed font-sans">{EVAL_QUESTIONS[currentIdx].question}</p>
              </div>

              {/* OPTIONS ROW BUTTONS */}
              <div className="space-y-2.5">
                {EVAL_QUESTIONS[currentIdx].options.map((opt, oidx) => {
                  const isSelected = answers[currentIdx] === oidx;
                  return (
                    <button
                      key={oidx}
                      onClick={() => handleSelectAnswer(oidx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-amber-400/20 border-amber-400 text-slate-900 font-extrabold shadow-sm"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100/60"
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-105 flex items-center justify-center border border-slate-200 font-bold text-[10px] text-slate-600">
                        {String.fromCharCode(65 + oidx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="p-5 bg-white border-t border-slate-200 flex justify-end sticky bottom-0 shadow-inner">
              <button
                onClick={handleNext}
                disabled={answers[currentIdx] === undefined}
                className="px-6 py-3 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-amber-300 disabled:opacity-50 transition-all cursor-pointer shadow-md"
              >
                {currentIdx === EVAL_QUESTIONS.length - 1 ? "Selesaikan" : "Lanjut"}
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </motion.div>
        )}

        {/* RESULTS SCREEN FINISH STATE */}
        {examState === "ended" && (
          <motion.div
            key="ended"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 space-y-6"
          >
            {/* SCORE GAUGE BANNER */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 text-center flex flex-col items-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400" />
              
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-500 p-0.5 mt-2 shadow-inner flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-2xl font-black text-slate-800">{score}</span>
                </div>
              </div>

              <h2 className="text-lg font-black text-slate-800 uppercase tracking-wide mt-4">
                {score >= 70 ? "Alhamdulillah! Kamu Lulus" : "Ayo Belajar Lagi!"}
              </h2>
              <p className="text-[10px] text-slate-500 max-w-xs mt-1 leading-relaxed font-bold">
                {score >= 70
                  ? "Kamu telah menguasai intisari ayat tanziliyah dan tanda kauniyah geologi bumi ulayat Danau Toba dengan cemerlang!"
                  : "Jangan berkecil hati, luangkan beberapa menit meninjau kembali tab sains, Al-Qur'an dan etnosains lalu coba lagi."}
              </p>

              {/* Lencana Kelulusan Badge Block */}
              {score >= 70 && (
                <div className="mt-5 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 max-w-sm justify-center shadow-inner">
                  <span className="text-3xl">🏆</span>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-amber-700 uppercase leading-none">Membuka Lencana Ultimate</p>
                    <p className="text-xs font-black text-slate-800 mt-1">Penakluk Puncak Toba</p>
                  </div>
                </div>
              )}
            </div>

            {/* SCORE HISTORY ACTIONS ROW */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleStartExam}
                className="px-6 py-2.5 rounded-full border border-slate-250 bg-white text-slate-700 text-xs font-black hover:bg-slate-100 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-4 h-4 text-slate-600" />
                Ulangi Ujian
              </button>
            </div>

            {/* SOLUTIONS REVIEW PANEL SECTION */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Pembahasan Setiap Soal</h3>

              {EVAL_QUESTIONS.map((q, idx) => {
                const selected = answers[idx];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border ${
                      isCorrect ? "bg-emerald-50 border border-emerald-200 shadow-sm" : "bg-rose-50 border border-rose-200 shadow-sm"
                    }`}
                  >
                    <div className="flex gap-2.5 items-start">
                      {isCorrect ? (
                        <CheckCircle className="w-4.5 h-4.5 text-emerald-650 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4.5 h-4.5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className="text-[11px] font-black text-slate-800 mb-1.5 font-sans">Soal {idx + 1}: {q.question}</h4>
                        
                        <p className="text-[10px] text-slate-600">
                          Jawaban kamu: <span className={isCorrect ? "text-emerald-700 font-extrabold" : "text-rose-700 font-extrabold"}>
                            {selected !== undefined ? q.options[selected] : "Tidak dijawab"}
                          </span>
                        </p>
                        
                        {!isCorrect && (
                          <p className="text-[10px] text-emerald-700 mt-0.5">
                            Jawaban benar: <span className="font-extrabold">{q.options[q.correctIndex]}</span>
                          </p>
                        )}

                        {/* EXPLANATORY TAFSIR PANEL */}
                        <div className="mt-3.5 p-3.5 bg-amber-50/50 border border-amber-200/50 rounded-xl text-[9.5px] leading-relaxed text-slate-600 font-sans shadow-inner">
                          <strong className="text-amber-800 block mb-1">Rangkuman Pembahasan:</strong>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
