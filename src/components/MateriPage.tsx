import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  Eye,
  Award,
  ChevronRight,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  AlertCircle,
  HelpCircle,
  Clock,
  Compass,
  Smile,
  Activity,
  Heart,
  Network
} from "lucide-react";
import { LessonContent, StudentProfile, QuranVerse, Hotspot, MatchingPair } from "../types";

interface MateriPageProps {
  lesson: LessonContent;
  profile: StudentProfile;
  onBack: () => void;
  onUpdateProgress: (lessonId: string, percentage: number) => void;
  onAddXP: (amount: number) => void;
  onUnlockBadge: (badgeId: string) => void;
}

const TABS = [
  { id: "pemantik", label: "Pemantik" },
  { id: "eksplorasi", label: "Eksplorasi" },
  { id: "sains", label: "Sains Modern" },
  { id: "quran", label: "Al-Qur'an" },
  { id: "etnosains", label: "Etnosains Batak" },
  { id: "rangkuman", label: "Rangkuman" },
  { id: "latihan", label: "Latihan" },
];

export default function MateriPage({
  lesson,
  profile,
  onBack,
  onUpdateProgress,
  onAddXP,
  onUnlockBadge,
}: MateriPageProps) {
  const [activeTab, setActiveTab] = useState("pemantik");
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(
    lesson.sains.hotspots ? lesson.sains.hotspots[0] : null
  );

  // Audio simulation state values
  const [isPlayingAudio, setIsPlayingAudio] = useState<Record<string, boolean>>({});
  const [audioProgress, setAudioProgress] = useState<Record<string, number>>({});

  // Mind map explore state node info
  const [mindMapNode, setMindMapNode] = useState<string>("center");

  // Local state for quizzes
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Matching game interactive state
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // left strings
  const [matchingIncorrect, setMatchingIncorrect] = useState<boolean>(false);

  // Trigger synthetic speech or play audio waves to recite Al-Quran in Arabic
  const handlePlayQuranAudio = (verseKey: string, arabicText: string) => {
    const isPlaying = isPlayingAudio[verseKey];
    if (isPlaying) {
      setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: false }));
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    // Stop other audios
    setIsPlayingAudio({});
    setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: true }));

    // Update progress simulate (adjusted speed for Arabic recitation)
    let currentVal = 0;
    const interval = setInterval(() => {
      currentVal += 3;
      setAudioProgress((prev) => ({ ...prev, [verseKey]: Math.min(100, currentVal) }));
      if (currentVal >= 100) {
        clearInterval(interval);
        setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: false }));
        setAudioProgress((prev) => ({ ...prev, [verseKey]: 0 }));
      }
    }, 200);

    // Speak the actual Quranic Arabic text
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const sentence = new SpeechSynthesisUtterance(arabicText);
      sentence.lang = 'ar-SA';
      
      // Attempt to set an Arabic voice if available
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find((v) => v.lang.startsWith('ar'));
      if (arabicVoice) {
        sentence.voice = arabicVoice;
      }
      
      sentence.pitch = 0.9; // Slightly lower pitch for a respectful, deeper tone
      sentence.rate = 0.7;  // Distinct, slow pace suitable for Quran recitation
      
      sentence.onend = () => {
        setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: false }));
        setAudioProgress((prev) => ({ ...prev, [verseKey]: 0 }));
        clearInterval(interval);
      };
      
      sentence.onerror = () => {
        setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: false }));
        setAudioProgress((prev) => ({ ...prev, [verseKey]: 0 }));
        clearInterval(interval);
      };

      window.speechSynthesis.speak(sentence);
    }
  };

  // Drag Matching connections trigger
  const handleSelectLeft = (leftItem: string) => {
    if (matchedPairs.includes(leftItem)) return;
    setSelectedLeft(leftItem);
  };

  const handleSelectRight = (rightItem: string) => {
    if (!selectedLeft) return;
    const pairs = lesson.matchingGame?.pairs || [];
    const correctPair = pairs.find((p) => p.left === selectedLeft && p.right === rightItem);

    if (correctPair) {
      // It's a correct match!
      const updatedMatches = [...matchedPairs, selectedLeft];
      setMatchedPairs(updatedMatches);
      setSelectedLeft(null);
      // Award partial XP
      onAddXP(10);

      // Check if all matched
      if (updatedMatches.length === pairs.length) {
        onAddXP(50);
        // Set progress jump
        onUpdateProgress(lesson.id, 100);
        triggerUnlockBadgeByLesson();
      }
    } else {
      // Mistake flash
      setMatchingIncorrect(true);
      setTimeout(() => setMatchingIncorrect(false), 800);
      setSelectedLeft(null);
    }
  };

  // Multiple choice selector
  const handleQuizOption = (quizId: string, optIdx: number, correctIdx: number) => {
    if (quizSubmitted[quizId]) return;
    setQuizAnswers((prev) => ({ ...prev, [quizId]: optIdx }));
    setQuizSubmitted((prev) => ({ ...prev, [quizId]: true }));

    const isCorrect = optIdx === correctIdx;
    if (isCorrect) {
      onAddXP(15);
    }

    // Recalculate progress based on tabs opened & quizzes solved
    calculateAndReportProgress();
  };

  const calculateAndReportProgress = () => {
    // Basic progression score calculation
    // Max 100% split over tabs opened and quizzes
    let totalTabsEvaluated = 0;
    const tabProgressMultiplier = 8; // roughly 50% for exploring tabs
    if (activeTab === "eksplorasi") totalTabsEvaluated = 15;
    else if (activeTab === "sains") totalTabsEvaluated = 30;
    else if (activeTab === "quran") totalTabsEvaluated = 45;
    else if (activeTab === "etnosains") totalTabsEvaluated = 60;
    else if (activeTab === "rangkuman") totalTabsEvaluated = 75;
    else if (activeTab === "latihan") totalTabsEvaluated = 90;

    const quizSubmittedCount = Object.keys(quizSubmitted).length;
    const quizAdditive = quizSubmittedCount * 5;

    const aggregate = Math.min(100, Math.max(profile.progress[lesson.id] || 0, tabProgressMultiplier + totalTabsEvaluated + quizAdditive));
    onUpdateProgress(lesson.id, aggregate);

    if (aggregate === 100) {
      triggerUnlockBadgeByLesson();
    }
  };

  const triggerUnlockBadgeByLesson = () => {
    if (lesson.id === "materi_pasak") onUnlockBadge("badge_pasak");
    if (lesson.id === "materi_dinamis") onUnlockBadge("badge_dinamis");
    if (lesson.id === "materi_air") onUnlockBadge("badge_air");
    if (lesson.id === "materi_arah") onUnlockBadge("badge_arah");
    if (lesson.id === "materi_subur") onUnlockBadge("badge_subur");
  };

  // Handle Tab navigation click and progress update
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setTimeout(() => {
      calculateAndReportProgress();
    }, 100);
  };

  // Handle sequential tab navigation step buttons
  const currentTabIndex = TABS.findIndex((t) => t.id === activeTab);

  const handleNextTab = () => {
    if (currentTabIndex < TABS.length - 1) {
      handleTabClick(TABS[currentTabIndex + 1].id);
    } else {
      onBack();
    }
  };

  const handlePrevTab = () => {
    if (currentTabIndex > 0) {
      handleTabClick(TABS[currentTabIndex - 1].id);
    } else {
      onBack();
    }
  };

  // Render highly responsive, stylized educational SVGs based on lessons focal point
  const renderInteractiveDiagram = () => {
    switch (lesson.sains.diagramType) {
      case "isostasy":
        return (
          <svg viewBox="0 0 400 240" className="w-full bg-slate-50 rounded-2xl border border-slate-200" fill="none" stroke="currentColor">
            {/* Atmosphere gradient */}
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#f0f9ff" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#skyGrad)" />
            {/* Ocean layer */}
            <path d="M 0 140 Q 100 135 200 140 T 400 140 L 400 240 L 0 240 Z" fill="#93c5fd" opacity="0.4" stroke="none" />
            <line x1="0" y1="140" x2="400" y2="140" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Mantle layer (astenosfer) */}
            <rect x="0" y="170" width="400" height="70" fill="#fed7aa" stroke="none" />
            <line x1="0" y1="170" x2="400" y2="170" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="310" y="210" className="fill-amber-800 text-[10px] font-sans font-black uppercase tracking-wider">Astenosfer</text>

            {/* Crust layer & deep roots */}
            {/* The root goes deep into mantle (from x=120 to x=280) */}
            <path
              d="M 0 140 L 100 140 L 140 100 L 200 60 L 250 110 L 280 140 L 400 140 L 400 170 L 280 170 C 260 210 140 210 120 170 L 0 170 Z"
              fill="#f5e0c5"
              stroke="#ca8a04"
              strokeWidth="2"
            />
            <text x="15" y="158" className="fill-slate-600 font-extrabold text-[9px] font-bold">Kerak (Sial/Sima)</text>
            <text x="175" y="195" className="fill-amber-800 text-[9px] font-black uppercase">Akar Gunung (Awtad)</text>

            {/* Hotspots clickable */}
            {lesson.sains.hotspots?.map((hs) => (
              <g
                key={hs.id}
                className="cursor-pointer group"
                onClick={() => setSelectedHotspot(hs)}
              >
                <circle
                  cx={`${hs.x}%`}
                  cy={`${hs.y}%`}
                  r="7"
                  className={`${
                    selectedHotspot?.id === hs.id
                      ? "fill-amber-400 stroke-white text-orange-500 animate-pulse"
                      : "fill-sky-500 stroke-slate-900 group-hover:fill-amber-400"
                  }`}
                  strokeWidth="2"
                />
                <circle cx={`${hs.x}%`} cy={`${hs.y}%`} r="12" className="stroke-white/40 fill-none animate-ping" style={{ animationDuration: "3s" }} />
              </g>
            ))}
          </svg>
        );
      case "volcano":
        return (
          <svg viewBox="0 0 400 240" className="w-full bg-slate-50 rounded-2xl border border-slate-200" fill="none" stroke="currentColor">
            <defs>
              <linearGradient id="volcanoSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#f0f9ff" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#volcanoSky)" />

            {/* Volcano crust */}
            <path d="M 0 240 L 120 180 L 170 110 L 200 125 L 230 110 L 270 180 L 400 240 Z" fill="#cbd5e1" stroke="#ca8a04" strokeWidth="1" />

            {/* Magma chamber & conduit */}
            <ellipse cx="200" cy="210" rx="35" ry="20" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
            <path d="M 190 210 L 195 120 L 205 120 L 210 210 Z" fill="#f97316" stroke="#ea580c" strokeWidth="1" />

            {/* Smoke and lava flow */}
            <circle cx="200" cy="85" r="22" fill="#94a3b8" opacity="0.3" />
            <circle cx="180" cy="70" r="15" fill="#cbd5e1" opacity="0.2" />
            <path d="M 200 120 Q 220 140 240 170" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />

            {/* Hotspots clickable */}
            {lesson.sains.hotspots?.map((hs) => (
              <g
                key={hs.id}
                className="cursor-pointer"
                onClick={() => setSelectedHotspot(hs)}
              >
                <circle
                  cx={`${hs.x}%`}
                  cy={`${hs.y}%`}
                  r="7"
                  className={`${
                    selectedHotspot?.id === hs.id
                      ? "fill-amber-400 stroke-white text-orange-500 animate-pulse"
                      : "fill-orange-500 stroke-slate-900"
                  }`}
                  strokeWidth="2"
                />
                <circle cx={`${hs.x}%`} cy={`${hs.y}%`} r="12" className="stroke-orange-400/30 fill-none animate-ping" style={{ animationDuration: "2.5s" }} />
              </g>
            ))}
          </svg>
        );
      case "hydrology":
        return (
          <svg viewBox="0 0 400 240" className="w-full bg-slate-50 rounded-2xl border border-slate-200" fill="none" stroke="currentColor">
            <rect width="400" height="240" fill="#f0f9ff" />

            {/* Water cycle cloud */}
            <path d="M 60 70 Q 75 55 90 70 Q 105 55 120 70 Q 130 80 120 90 L 60 90 Z" fill="#ebf8ff" opacity="0.9" stroke="none" />
            {/* Orografis rain stripes */}
            <line x1="80" y1="95" x2="65" y2="125" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 3" />
            <line x1="100" y1="95" x2="85" y2="125" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 3" />

            {/* Mountain profile */}
            <path d="M 0 240 L 140 120 L 260 120 L 400 240 Z" fill="#e2e8f0" stroke="#ca8a04" strokeWidth="1" />

            {/* Blue Aquifer sponge body inside mountain */}
            <path d="M 160 210 Q 200 170 240 210 Z" fill="#38bdf8" opacity="0.5" stroke="none" />
            {/* Spring pipe leading out */}
            <path d="M 230 195 Q 260 200 280 205" stroke="#0ea5e9" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Hotspots clickable */}
            {lesson.sains.hotspots?.map((hs) => (
              <g
                key={hs.id}
                className="cursor-pointer"
                onClick={() => setSelectedHotspot(hs)}
              >
                <circle
                  cx={`${hs.x}%`}
                  cy={`${hs.y}%`}
                  r="7"
                  className={`${
                    selectedHotspot?.id === hs.id
                      ? "fill-amber-400 stroke-white text-orange-500 animate-pulse"
                      : "fill-sky-500 stroke-slate-900"
                  }`}
                  strokeWidth="2"
                />
                <circle cx={`${hs.x}%`} cy={`${hs.y}%`} r="12" className="stroke-sky-400/40 fill-none animate-ping" style={{ animationDuration: "3s" }} />
              </g>
            ))}
          </svg>
        );
      default:
        // fall back default earth layers diagram
        return (
          <svg viewBox="0 0 400 240" className="w-full bg-slate-50 rounded-2xl border border-slate-200" fill="none" stroke="currentColor">
            <rect width="400" height="240" fill="#f8fafc" />
            <path d="M 0 240 C 150 140 250 140 400 240 Z" fill="#fed7aa" stroke="#ca8a04" strokeWidth="1" />
            <path d="M 0 240 C 150 180 250 180 400 240 Z" fill="#ffedd5" stroke="none" />

            {/* Custom hotspots */}
            {lesson.sains.hotspots?.map((hs) => (
              <g
                key={hs.id}
                className="cursor-pointer"
                onClick={() => setSelectedHotspot(hs)}
              >
                <circle
                  cx={`${hs.x}%`}
                  cy={`${hs.y}%`}
                  r="7"
                  className={`${
                    selectedHotspot?.id === hs.id
                      ? "fill-amber-400 stroke-white animate-pulse"
                      : "fill-amber-500 stroke-slate-900"
                  }`}
                  strokeWidth="2"
                />
              </g>
            ))}
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans select-none overflow-hidden pb-0">
      {/* TOP HEADER PRESTIGE BAR */}
      <div className="p-4 bg-white border-b border-slate-200/80 flex items-center justify-between z-10 shrink-0">
        <button
          onClick={onBack}
          id="btn_materi_back"
          className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center flex-1 px-4">
          <span className="text-[9px] uppercase font-black tracking-widest text-amber-600">
            Modul Interaktif • {TABS.find((t) => t.id === activeTab)?.label}
          </span>
          <h2 className="text-sm font-black text-slate-800 leading-none tracking-wide line-clamp-1 mt-0.5">{lesson.title}</h2>
        </div>

        {/* Small single progress pie chart */}
        <div className="relative w-9 h-9 flex items-center justify-center bg-amber-50 rounded-full border border-amber-200">
          <span className="text-[10px] font-black text-amber-700">
            {profile.progress[lesson.id] || 0}%
          </span>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <AnimatePresence mode="wait">
          {activeTab === "pemantik" && (
            <motion.div
              key="pemantik"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="p-6 rounded-3xl bg-white border border-amber-300 shadow-md text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 text-amber-500 text-xl font-bold animate-pulse">
                  💡
                </div>
                <h3 className="text-base font-black text-amber-800 font-sans tracking-wide leading-snug">
                  "{lesson.pemantik.question}"
                </h3>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 leading-relaxed font-sans text-xs text-slate-600 shadow-sm">
                <p>{lesson.pemantik.text}</p>
              </div>
            </motion.div>
          )}

          {activeTab === "eksplorasi" && (
            <motion.div
              key="eksplorasi"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{lesson.eksplorasi.text}</p>

              <div className="space-y-4">
                {lesson.eksplorasi.points.map((point, i) => (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex gap-3"
                  >
                    <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-black text-slate-800 tracking-wide">{point.title}</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-1">{point.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "sains" && (
            <motion.div
              key="sains"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-500 animate-spin" style={{ animationDuration: "12s" }} />
                Interaktivitas Anatomi Sains
              </h3>

              {/* RENDER DYNAMIC LESSON DIAGRAM */}
              {renderInteractiveDiagram()}

              <p className="text-[10px] text-center text-slate-400 uppercase tracking-wider italic">
                * Sentuh titik radar biru/oranye di atas diagram untuk interaksi penjelasan
              </p>

              {/* HOTSPOT DESCRIPTIONS DETAIL PANEL */}
              {selectedHotspot && (
                <motion.div
                  key={selectedHotspot.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-sky-50 border border-sky-200 shadow-md flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-white text-sky-500 border border-sky-100 flex items-center justify-center shrink-0 shadow-inner">
                    <Eye className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-sky-800 uppercase tracking-wider">{selectedHotspot.title}</h4>
                    <p className="text-[11px] text-slate-700 leading-relaxed mt-1.5 font-sans font-semibold">
                      {selectedHotspot.description}
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm leading-relaxed text-xs text-slate-600">
                <p>{lesson.sains.text}</p>
              </div>
            </motion.div>
          )}

          {activeTab === "quran" && (
            <motion.div
              key="quran"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Al-Qur'anul Karim & Tafsir
                </h3>
              </div>

              {lesson.quran.verses.map((v, i) => {
                const verseKey = `val_v_${i}`;
                const isPlaying = isPlayingAudio[verseKey];
                const progressWidth = audioProgress[verseKey] || 0;

                return (
                  <div key={v.verse} className="p-5 rounded-3xl bg-white border border-emerald-200 shadow-md flex flex-col gap-4">
                    {/* AUDIO HEADER PLAYER PANEL */}
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                      <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        QS. {v.surah}: {v.verse}
                      </span>

                      {/* MICRO AUDIO RECITATION ENGINE */}
                      <div className="flex items-center gap-3 w-1/2 justify-end">
                        {isPlaying && (
                          <div className="flex gap-0.5 items-end justify-center h-4 w-6 shrink-0">
                            <span className="w-0.7 h-3 bg-emerald-500 animate-bounce" style={{ animationDelay: "0.1s" }} />
                            <span className="w-0.7 h-4 bg-emerald-500 animate-bounce" style={{ animationDelay: "0.3s" }} />
                            <span className="w-0.7 h-2 bg-emerald-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
                          </div>
                        )}
                        <button
                          onClick={() => handlePlayQuranAudio(verseKey, v.arabic)}
                          className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 active:scale-90 transition-all shrink-0 cursor-pointer shadow-md shadow-emerald-500/20"
                          title="Lafalkan Ayat"
                        >
                          {isPlaying ? <Pause className="w-4 h-4 fill-current text-white" /> : <Play className="w-4 h-4 fill-current text-white ml-0.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Arabic Text Display */}
                    <div className="text-right font-serif text-2xl sm:text-3xl font-black text-emerald-900 leading-loose py-3 tracking-wide filter drop-shadow-sm select-text">
                      {v.arabic}
                    </div>

                    {/* Translation */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] leading-relaxed italic text-slate-600">
                      "{v.translation}"
                    </div>

                    {/* Tafsir explanation */}
                    <div className="text-[11px] leading-relaxed text-slate-600 font-sans">
                      <strong className="text-emerald-700 block text-xs mb-1">Tinjauan Mukjizat Ilmiah:</strong>
                      {v.explanation}
                    </div>
                  </div>
                );
              })}

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-[11px] text-slate-600 leading-relaxed font-sans shadow-inner">
                <strong className="text-emerald-700 block text-xs mb-1">Kandungan Hikmah:</strong>
                {lesson.quran.hikmah}
              </div>
            </motion.div>
          )}

          {activeTab === "etnosains" && (
            <motion.div
              key="etnosains"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest block mb-1">Sumber Perspektif Budaya Toba</span>
                <h4 className="text-sm font-black text-amber-900">{lesson.etnosains.origin}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-2.5 font-sans">{lesson.etnosains.narrative}</p>
              </div>

              <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest mt-4 mb-2">Kearifan Ekologi & Mitologi Praktis</h4>

              <div className="grid grid-cols-1 gap-4">
                {lesson.etnosains.practices.map((pr, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-205 flex gap-3.5 shadow-sm">
                    <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">{pr.title}</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-1 font-sans">{pr.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* MIND MAP INTERAKTIF SECTION */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 mt-6 shadow-md">
                <h4 className="text-xs font-black text-indigo-700 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <Network className="w-4 h-4 text-indigo-600" />
                  Peta Pikiran Integratif (Mind Map)
                </h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-sans mb-4">
                  Sentuh node-node pilar di bawah untuk memvisualisasikan bagaimana pilar spiritual, sains kebencanaan, dan budaya menyatu di kepingan materi ini.
                </p>

                {/* VISUAL CONNECTED MIND MAP DESIGN */}
                <div className="relative flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-150 min-h-[160px]">
                  {mindMapNode === "center" && (
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-center">
                      <span className="text-[10px] px-2.5 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full font-bold">Subjek Utama</span>
                      <h5 className="text-sm font-black text-slate-800 mt-1.5 leading-snug">{lesson.title}</h5>
                      <p className="text-[10px] text-slate-600 mt-2">Dikuasai lewat 3 pilar utama: Kebenaran Quran, Geologi Bumi, kearifan Toba.</p>
                    </motion.div>
                  )}
                  {mindMapNode === "pillar_quran" && (
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-center">
                      <span className="text-[10px] px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full font-bold">Pilar Al-Qur'an</span>
                      <h5 className="text-sm font-black text-emerald-950 mt-1.5">QS. {lesson.quran.verses[0]?.surah} : {lesson.quran.verses[0]?.verse}</h5>
                      <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">Menjelaskan fungsi penciptaan gunung secara literal teologis yang sarat akan stabilitas, kesuburan, hidrologi.</p>
                    </motion.div>
                  )}
                  {mindMapNode === "pillar_ipa" && (
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-center">
                      <span className="text-[10px] px-2.5 py-0.5 bg-sky-55 border border-sky-200 text-sky-700 rounded-full font-bold">Pilar Geologi IPA</span>
                      <h5 className="text-sm font-black text-sky-950 mt-1.5">Mekanisme Fisika Kerak Bumi</h5>
                      <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">Menelusuri hukum keseimbangan alam, pergerakan andosol lempeng pasifik, sesar Sumatera, hidrologi orografis terasering.</p>
                    </motion.div>
                  )}
                  {mindMapNode === "pillar_etno" && (
                    <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="text-center">
                      <span className="text-[10px] px-2.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-full font-bold">Pilar Etnosains Batak</span>
                      <h5 className="text-sm font-black text-amber-950 mt-1.5">Tradisi & Keseimbangan Ulayat</h5>
                      <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">Tutur tradisional (mitos ditenun naga, hutan mual pamulaan, landmark solu bolon) menjabarkan gejala alam.</p>
                    </motion.div>
                  )}

                  {/* NAV-NODES CONNECTIONS PILLED ROW */}
                  <div className="flex gap-2.5 mt-6 border-t border-slate-200 pt-4 w-full justify-center">
                    <button
                      onClick={() => setMindMapNode("center")}
                      className={`px-2.5 py-1 rounded-lg text-[9px] font-bold ${mindMapNode === "center" ? "bg-slate-800 text-white" : "bg-slate-200/60 text-slate-600 hover:bg-slate-200"}`}
                    >
                      Pondasi
                    </button>
                    <button
                      onClick={() => setMindMapNode("pillar_quran")}
                      className={`px-2.5 py-1 rounded-lg text-[9px] font-bold ${mindMapNode === "pillar_quran" ? "bg-emerald-500 text-white" : "bg-slate-200/60 text-slate-600 hover:bg-slate-200"}`}
                    >
                      Wahyu
                    </button>
                    <button
                      onClick={() => setMindMapNode("pillar_ipa")}
                      className={`px-2.5 py-1 rounded-lg text-[9px] font-bold ${mindMapNode === "pillar_ipa" ? "bg-sky-500 text-white" : "bg-slate-200/60 text-slate-600 hover:bg-slate-200"}`}
                    >
                      Sains
                    </button>
                    <button
                      onClick={() => setMindMapNode("pillar_etno")}
                      className={`px-2.5 py-1 rounded-lg text-[9px] font-bold ${mindMapNode === "pillar_etno" ? "bg-amber-500 text-white" : "bg-slate-200/60 text-slate-600 hover:bg-slate-200"}`}
                    >
                      Batak Toba
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "rangkuman" && (
            <motion.div
              key="rangkuman"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 font-sans"
            >
              <h3 className="text-sm font-black text-amber-800 uppercase tracking-widest flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Rangkuman Intisari Pelajaran
              </h3>

              <div className="space-y-3.5">
                {lesson.rangkuman.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 flex gap-3 text-slate-600 text-xs leading-relaxed shadow-sm">
                    <span className="text-amber-500 font-black shrink-0 mt-0.5">✔</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "latihan" && (
            <motion.div
              key="latihan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8 pb-10"
            >
              {/* INTERACTIVE MATCHING DRAG CLICK GAME */}
              {lesson.matchingGame && (
                <div className={`p-5 rounded-3xl bg-white border border-indigo-200 shadow-md ${matchingIncorrect ? "border-rose-500 animate-shake" : ""}`}>
                  <h4 className="text-xs font-black text-indigo-700 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
                    Permainan Mencocokkan Istilah
                  </h4>
                  <p className="text-[11px] text-slate-600 mb-4">{lesson.matchingGame.instruction}</p>

                  <div className="grid grid-cols-2 gap-4">
                    {/* LEFT LIST ROW PILLS */}
                    <div className="space-y-2.5">
                      {lesson.matchingGame.pairs.map((p) => {
                        const isMatched = matchedPairs.includes(p.left);
                        const isSelected = selectedLeft === p.left;
                        return (
                          <button
                            key={p.left}
                            onClick={() => handleSelectLeft(p.left)}
                            className={`w-full p-2.5 rounded-xl border text-left text-[11px] font-bold transition-all cursor-pointer ${
                              isMatched
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700 opacity-60"
                                : isSelected
                                ? "bg-amber-400 border-amber-400 text-slate-950 shadow-md"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80"
                            }`}
                          >
                            {p.left} {isMatched ? "✓" : ""}
                          </button>
                        );
                      })}
                    </div>

                    {/* RIGHT LIST ROW PILLS */}
                    <div className="space-y-2.5">
                      {lesson.matchingGame.pairs.map((p) => {
                        // Gather matches status
                        const isMatched = matchedPairs.some((leftItem) => {
                          const pair = lesson.matchingGame?.pairs.find((p1) => p1.left === leftItem);
                          return pair?.right === p.right;
                        });

                        return (
                          <button
                            key={p.right}
                            onClick={() => handleSelectRight(p.right)}
                            disabled={!selectedLeft}
                            className={`w-full p-2.5 rounded-xl border text-left text-[11px] font-bold leading-tight transition-all cursor-pointer ${
                              isMatched
                                ? "bg-emerald-50 border border-emerald-250 text-emerald-700 opacity-60 font-black"
                                : selectedLeft
                                ? "bg-indigo-50 border border-indigo-400 text-indigo-900 hover:bg-indigo-100"
                                : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed"
                            }`}
                          >
                            {p.right}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center bg-indigo-50 px-3.5 py-2.5 rounded-xl border border-indigo-150">
                    <span className="text-[10px] text-slate-500 font-bold">Status Menghubungkan:</span>
                    <span className="text-[10px] font-black text-indigo-700 uppercase">
                      {matchedPairs.length} / {lesson.matchingGame.pairs.length} Terpasang
                    </span>
                  </div>
                </div>
              )}

              {/* MULTIPLE CHOICE MINI QUIZZES */}
              <div className="space-y-6">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest">Kuis Pilihan Ganda Interaktif</h4>

                {lesson.quiz.map((q, qidx) => {
                  const hasSubmitted = quizSubmitted[q.id];
                  const chosenIdx = quizAnswers[q.id];

                  return (
                    <div key={q.id} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Pertanyaan {qidx + 1}</span>
                        {hasSubmitted && (
                          <span
                            className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-full ${
                              chosenIdx === q.correctIndex
                                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                : "bg-rose-100 text-rose-700 border border-rose-200"
                            }`}
                          >
                            {chosenIdx === q.correctIndex ? "Benar (+15 XP)" : "Salah"}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-800 font-extrabold leading-relaxed mb-4">{q.question}</p>

                      <div className="space-y-2">
                        {q.options.map((opt, oidx) => {
                          let btnStyle = "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100";
                          if (hasSubmitted) {
                            if (oidx === q.correctIndex) {
                              btnStyle = "bg-emerald-50 border border-emerald-300 text-emerald-800 font-black";
                            } else if (oidx === chosenIdx) {
                              btnStyle = "bg-rose-50 border border-rose-200 text-rose-800 font-semibold";
                            } else {
                              btnStyle = "bg-slate-100 border border-slate-200 text-slate-400 opacity-60";
                            }
                          }

                          return (
                            <button
                              key={oidx}
                              disabled={hasSubmitted}
                              onClick={() => handleQuizOption(q.id, oidx, q.correctIndex)}
                              className={`w-full p-3.5 rounded-2xl border text-left text-xs transition-all flex justify-between items-center cursor-pointer ${btnStyle}`}
                            >
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* QUIZ EXPLANATION FEEDBACK PANEL */}
                      {hasSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[10px] text-slate-700 leading-relaxed font-sans shadow-inner"
                        >
                          <strong className="text-amber-800 block mb-0.5">Penjelasan:</strong>
                          {q.explanation}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM ACTION NAVIGATION CONTROLS */}
      <div className="bg-white border-t border-slate-200/80 px-5 py-3.5 shrink-0 flex items-center justify-between shadow-xl relative z-20">
        <button
          onClick={handlePrevTab}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all cursor-pointer shadow-xs active:scale-95 select-none"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <span>{currentTabIndex === 0 ? "Keluar" : "Kembali"}</span>
        </button>

        {/* Sequential step micro dots */}
        <div className="flex items-center gap-1.5">
          {TABS.map((tab, idx) => (
            <div
              key={tab.id}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                idx === currentTabIndex
                  ? "w-4 md:w-6 bg-amber-400 shadow-xs"
                  : idx < currentTabIndex
                  ? "w-1.5 md:w-2 bg-emerald-400"
                  : "w-1.5 md:w-2 bg-slate-200"
              }`}
              title={tab.label}
            />
          ))}
        </div>

        <button
          onClick={handleNextTab}
          className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-md active:scale-95 select-none font-sans uppercase tracking-wider"
        >
          <span>{currentTabIndex === TABS.length - 1 ? "Selesai" : "Lanjut"}</span>
          <ChevronRight className="w-4 h-4 text-slate-900 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
