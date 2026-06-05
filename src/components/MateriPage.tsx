import React, { useState, useRef, useEffect } from "react";
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
// @ts-ignore
import sumberkesuburan from "../sumberkesuburan.png";
// @ts-ignore
import gunungpasak from "../gunungpasak.png";
// @ts-ignore
import pasakpasak from "../pasakpasak.png";

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
  { id: "sains", label: "Sains (IPA)" },
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

  // References and helper triggers for the real Al-Quran recitation audio playback
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const activeAudioKeyRef = useRef<string | null>(null);
  const [activeMuted, setActiveMuted] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lesson]);

  const getAudioUrls = (surahName: string, verseRange: string): string[] => {
    const surahMap: Record<string, number> = {
      "An-Naba'": 78,
      "An-Nazi'at": 79,
      "An-Naml": 27,
      "Al-Mursalat": 77,
      "An-Nahl": 16,
      "Al-Hijr": 15
    };
    const surahNum = surahMap[surahName];
    if (!surahNum) return [];

    const pad3 = (num: number) => String(num).padStart(3, '0');
    
    if (verseRange.toString().includes("-")) {
      const [start, end] = verseRange.toString().split("-").map(Number);
      const urls: string[] = [];
      for (let i = start; i <= end; i++) {
        urls.push(`https://everyayah.com/data/Alafasy_128kbps/${pad3(surahNum)}${pad3(i)}.mp3`);
      }
      return urls;
    } else {
      const verseNum = Number(verseRange);
      return [`https://everyayah.com/data/Alafasy_128kbps/${pad3(surahNum)}${pad3(verseNum)}.mp3`];
    }
  };

  const playFallbackSpeech = (verseKey: string, arabicText: string) => {
    setIsPlayingAudio({});
    setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: true }));
    activeAudioKeyRef.current = verseKey;

    let currentVal = 0;
    const interval = setInterval(() => {
      currentVal += 2;
      setAudioProgress((prev) => ({ ...prev, [verseKey]: Math.min(100, currentVal) }));
      if (currentVal >= 100) {
        clearInterval(interval);
        setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: false }));
        setAudioProgress((prev) => ({ ...prev, [verseKey]: 0 }));
        activeAudioKeyRef.current = null;
      }
    }, 150);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const sentence = new SpeechSynthesisUtterance(arabicText);
      sentence.lang = 'ar-SA';
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find((v) => v.lang.startsWith('ar'));
      if (arabicVoice) sentence.voice = arabicVoice;
      sentence.pitch = 0.95;
      sentence.rate = 0.65;

      sentence.onend = () => {
        clearInterval(interval);
        setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: false }));
        setAudioProgress((prev) => ({ ...prev, [verseKey]: 0 }));
        activeAudioKeyRef.current = null;
      };

      sentence.onerror = () => {
        clearInterval(interval);
        setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: false }));
        setAudioProgress((prev) => ({ ...prev, [verseKey]: 0 }));
        activeAudioKeyRef.current = null;
      };

      window.speechSynthesis.speak(sentence);
    }
  };

  // Trigger real-audio streamed recitation from Alafasy
  const handlePlayQuranAudio = (verseKey: string, arabicText: string, surahName: string, verseRange: string) => {
    const isPlaying = isPlayingAudio[verseKey];
    
    // If clicking on the currently active audio, toggle play/pause status
    if (activeAudioKeyRef.current === verseKey && currentAudioRef.current) {
      if (isPlaying) {
        currentAudioRef.current.pause();
        setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: false }));
      } else {
        currentAudioRef.current.play().catch(() => {
          playFallbackSpeech(verseKey, arabicText);
        });
        setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: true }));
      }
      return;
    }

    // Stop and clear anything currently playing
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    // Reset other play indicators
    setIsPlayingAudio({});
    setAudioProgress((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { next[k] = 0; });
      return next;
    });

    const urls = getAudioUrls(surahName, verseRange);
    if (urls.length === 0) {
      playFallbackSpeech(verseKey, arabicText);
      return;
    }

    activeAudioKeyRef.current = verseKey;
    setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: true }));

    let currentTrackIndex = 0;

    const playTrack = (index: number) => {
      if (index >= urls.length) {
        setIsPlayingAudio((prev) => ({ ...prev, [verseKey]: false }));
        setAudioProgress((prev) => ({ ...prev, [verseKey]: 0 }));
        activeAudioKeyRef.current = null;
        currentAudioRef.current = null;
        return;
      }

      const audio = new Audio(urls[index]);
      audio.muted = activeMuted;
      currentAudioRef.current = audio;

      audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
          const percentOfTrack = (audio.currentTime / audio.duration) * 100;
          const weightedPercent = (index * 100 + percentOfTrack) / urls.length;
          setAudioProgress((prev) => ({ ...prev, [verseKey]: Math.min(100, weightedPercent) }));
        }
      });

      audio.addEventListener("ended", () => {
        currentTrackIndex++;
        playTrack(currentTrackIndex);
      });

      audio.addEventListener("error", () => {
        console.warn("Failed to stream mp3. Falling back to speech synthesis.");
        playFallbackSpeech(verseKey, arabicText);
      });

      audio.play().catch((err) => {
        console.warn("Audio play blocked. Doing speech synthesis fallback:", err);
        playFallbackSpeech(verseKey, arabicText);
      });
    };

    playTrack(currentTrackIndex);
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
          <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl bg-gradient-to-b from-sky-50 via-indigo-50/25 to-slate-50 overflow-hidden border border-slate-200 shadow-sm group">
            {/* SVG drawing as the underlying schematic schema */}
            <div className="absolute inset-0 select-none opacity-90">
              <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" stroke="currentColor">
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
              </svg>
            </div>

            {/* Custom high-res overlay from user uploaded/created file "pasakpasak.png" */}
            <img 
              src={pasakpasak}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700 group-hover:scale-[1.015]"
              referrerPolicy="no-referrer"
              alt="Anatomi Pasak Gunung"
              onError={(e) => {
                // Keep the underlying vector vector visible
                e.currentTarget.style.display = "none";
              }}
            />

            {/* Absolute positioned interactive hotspots so they align perfectly over BOTH image and SVG */}
            <div className="absolute inset-0">
              {lesson.sains.hotspots?.map((hs) => (
                <button
                  key={hs.id}
                  onClick={() => setSelectedHotspot(hs)}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/btn cursor-pointer z-10 outline-none"
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      selectedHotspot?.id === hs.id ? "bg-amber-400" : "bg-sky-400"
                    }`}></span>
                    <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white shadow-md transition-colors duration-200 ${
                      selectedHotspot?.id === hs.id ? "bg-amber-400" : "bg-sky-500 group-hover/btn:bg-amber-400"
                    }`}></span>
                  </span>
                </button>
              ))}
            </div>
          </div>
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

              {lesson.id === "materi_pasak" && (
                <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-200/95 bg-white p-3 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-2xl bg-gradient-to-b from-sky-50 via-indigo-50/25 to-slate-50 overflow-hidden group border border-slate-100">
                    
                    {/* Stylized Interactive SVG Schematic Schema for Pasak Bumi & Isostasi (Fallback / Background) */}
                    <div className="absolute inset-0 pointer-events-none opacity-90 select-none">
                      <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* sky background */}
                        <rect width="800" height="450" fill="url(#pasakSkyGrad)" />
                        
                        {/* Soft cloud elements */}
                        <path d="M50 80 Q100 50 150 80 T250 80 L250 100 L50 100 Z" fill="#ffffff" opacity="0.4" />
                        <path d="M550 120 Q600 90 650 120 T750 120 L750 140 L550 140 Z" fill="#ffffff" opacity="0.3" />
                        
                        {/* Upper Crust Area (Kerak Bumi Litosfer) */}
                        <rect x="0" y="220" width="800" height="70" fill="url(#crustGrad)" />
                        
                        {/* Mountain (Awtad/Pasak) */}
                        <path d="M220 220 L350 70 L400 70 L520 220 Z" fill="url(#pasakVolcanoGrad)" />
                        
                        {/* Snow Peak / Summit */}
                        <path d="M333 90 L350 70 L400 70 L415 90 Q375 105 333 90 Z" fill="#f1f5f9" />
                        
                        {/* Deep Roots of Mountain (Akar Gunung) going deep into Asthenosphere (Mantel Bumi) */}
                        <path d="M250 290 L340 420 L420 420 L490 290 Z" fill="url(#rootsGrad)" />
                        
                        {/* Mantle Area (Astenosfer / Mantel Bumi cair elastis) */}
                        <rect x="0" y="290" width="800" height="160" fill="url(#mantleGrad)" opacity="0.85" />
                        
                        {/* Redraw roots semi-transparent over mantle for x-ray preview */}
                        <path d="M250 290 L340 420 L420 420 L490 290 Z" fill="url(#rootsRefGrad)" stroke="#fda4af" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.9" />

                        {/* Force Balance Vectors (Isostasy Forces) */}
                        {/* Weight Force (Gaya Berat ke Bawah) */}
                        <path d="M370 175 L370 235" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#redArrow)" />
                        <text x="382" y="200" fill="#f43f5e" fontSize="10" fontWeight="900">Gaya Gravitasi (g)</text>
                        
                        {/* Buoyancy force (Gaya Apung Mantel ke Atas) */}
                        <path d="M385 410 L385 350" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#blueArrow)" />
                        <text x="397" y="380" fill="#38bdf8" fontSize="10" fontWeight="900">Gaya Apung (Isostase)</text>
                        
                        {/* Labels & Annotations */}
                        <text x="60" y="255" fill="#1e293b" fontSize="11" fontWeight="800" letterSpacing="0.5">KERAK BUMI (LITOSFER)</text>
                        <text x="60" y="270" fill="#cbd5e1" fontSize="9" fontWeight="bold">Massa Jenis Lebih Rendah (ρ ≈ 2.7 g/cm³)</text>
                        
                        <text x="60" y="330" fill="#fff" fontSize="11" fontWeight="800" letterSpacing="0.5" opacity="0.9">MANTEL BUMI (ASTENOSFER)</text>
                        <text x="60" y="345" fill="#94a3b8" fontSize="9" fontWeight="bold" opacity="0.9">Massa Jenis Lebih Tinggi (ρ ≈ 3.3 g/cm³)</text>

                        {/* Concept labels */}
                        <text x="440" y="115" fill="#1e293b" fontSize="10" fontWeight="800">Bagian Terbuka (Puncak)</text>
                        <path d="M435 112 L380 95" stroke="#475569" strokeWidth="1" strokeDasharray="2,2" />

                        <text x="445" y="375" fill="#fff" fontSize="10" fontWeight="800" opacity="0.9">Akar Gunung (Awtad/Pasak)</text>
                        <path d="M440 372 L395 365" stroke="#fff" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />

                        {/* Title Header Board */}
                        <rect x="25" y="25" width="210" height="75" rx="10" fill="#ffffff" fillOpacity="0.85" stroke="#e2e8f0" strokeWidth="1.5" />
                        <text x="35" y="45" fill="#0f172a" fontSize="10" fontWeight="900">SAINS FISIKA KEBUMIAN (IPA)</text>
                        <text x="35" y="60" fill="#334155" fontSize="9" fontWeight="bold">• Teori Isostasi Kerak Bumi</text>
                        <text x="35" y="73" fill="#334155" fontSize="9" fontWeight="bold">• Keseimbangan Hidrostatis</text>
                        <text x="35" y="86" fill="#334155" fontSize="9" fontWeight="bold">• Kedalaman Akar ≈ 5x Tinggi Puncak</text>

                        <circle cx="340" cy="420" r="3" fill="#38bdf8" />
                        <circle cx="420" cy="420" r="3" fill="#38bdf8" />

                        <defs>
                          <marker id="redArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                          </marker>
                          <marker id="blueArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                          </marker>
                          
                          <linearGradient id="pasakSkyGrad" x1="400" y1="0" x2="400" y2="450" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#bae6fd" />
                            <stop offset="0.6" stopColor="#e0f2fe" />
                            <stop offset="1" stopColor="#f8fafc" />
                          </linearGradient>
                          <linearGradient id="crustGrad" x1="400" y1="220" x2="400" y2="290" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#8d99ae" />
                            <stop offset="1" stopColor="#4a5759" />
                          </linearGradient>
                          <linearGradient id="pasakVolcanoGrad" x1="370" y1="70" x2="370" y2="220" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#64748b" />
                            <stop offset="1" stopColor="#334155" />
                          </linearGradient>
                          <linearGradient id="rootsGrad" x1="370" y1="290" x2="370" y2="420" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#1e293b" />
                            <stop offset="1" stopColor="#0f172a" />
                          </linearGradient>
                          <linearGradient id="rootsRefGrad" x1="370" y1="290" x2="370" y2="420" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#fda4af" stopOpacity="0.4" />
                            <stop offset="1" stopColor="#f43f5e" stopOpacity="0.1" />
                          </linearGradient>
                          <linearGradient id="mantleGrad" x1="400" y1="290" x2="400" y2="450" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#3c162f" />
                            <stop offset="0.4" stopColor="#1e0b18" />
                            <stop offset="1" stopColor="#0b0007" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Premium Image overlay */}
                    <img
                      src={gunungpasak}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none group-hover:scale-[1.015]"
                      referrerPolicy="no-referrer"
                      alt="Gunung Sebagai Pasak Bumi"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    {/* Info Overlay Panel */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-900/45 to-transparent p-4 md:p-6 flex flex-col justify-end z-10 pointer-events-none">
                      <span className="self-start text-[9px] md:text-[10px] font-black text-sky-300 bg-sky-950/50 backdrop-blur-md px-3 py-1 rounded-lg uppercase tracking-wider mb-2 border border-sky-500/20 shadow-xs">
                        Sains Isostasi & Geofisika IPA
                      </span>
                      <p className="text-xs md:text-sm font-extrabold text-white tracking-wide leading-snug drop-shadow-sm">
                        Secara Sains, gunung menancap bagai pasak dengan akar yang menjunam sangat dalam ke mantel bumi untuk menyeimbangkan berat jenis kerak bumi.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {lesson.id === "materi_subur" && (
                <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-200/95 bg-white p-3 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-2xl bg-gradient-to-b from-indigo-50/50 via-emerald-50/20 to-slate-50 overflow-hidden group border border-slate-100">
                    
                    {/* Stylized Interactive SVG Schematic Schema for Volcanic Fertility (Fallback / Background) */}
                    <div className="absolute inset-0 pointer-events-none opacity-90 select-none">
                      <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* sky background */}
                        <rect width="800" height="450" fill="url(#skyGradient)" />
                        
                        {/* Sun/Glow */}
                        <circle cx="680" cy="90" r="45" fill="url(#sunGlow)" className="animate-pulse" />
                        
                        {/* Back Mountains silhouettes */}
                        <path d="M100 450 L350 200 L480 320 L680 180 L850 450 Z" fill="#cbd5e1" opacity="0.35" />
                        
                        {/* Main Volcano (Gunung Pusuk Buhit / Vulkanik) */}
                        <path d="M180 450 L400 130 L450 130 L680 450 Z" fill="url(#volcanoGrad)" />
                        
                        {/* Volcano Crater (Kawah & Magma) */}
                        <path d="M400 130 C410 145, 440 145, 450 130 Z" fill="#f43f5e" />
                        <path d="M420 130 L425 250 L435 250 L430 130 Z" fill="url(#magmaChamber)" />
                        <circle cx="425" cy="280" r="40" fill="url(#magmaSource)" />
                        
                        {/* Earthlayers and Roots of Mountain (Sains Isostasi & Pasak Bumi) */}
                        <rect x="0" y="380" width="800" height="70" fill="url(#earthLayers)" />
                        
                        {/* Roots of Mountain stretching deep into Asthenosphere */}
                        <path d="M300 380 L410 445 L450 445 L580 380 Z" fill="#334155" opacity="0.9" />
                        {/* Isostasi arrows indicating pressure balance */}
                        <path d="M425 435 L425 405" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
                        <path d="M435 405 L435 435" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
                        
                        {/* Erupting Ash & Mineral clouds */}
                        <circle cx="425" cy="110" r="30" fill="url(#ashCloud)" opacity="0.75" />
                        <circle cx="465" cy="100" r="25" fill="url(#ashCloud)" opacity="0.65" />
                        <circle cx="385" cy="105" r="22" fill="url(#ashCloud)" opacity="0.65" />
                        
                        {/* Micro Nutrients floating down */}
                        <g opacity="0.8">
                          <circle cx="340" cy="160" r="5" fill="#10b981" />
                          <text x="350" y="164" fill="#047857" fontSize="11" fontWeight="bold">Silika (SiO₂)</text>
                          
                          <circle cx="510" cy="180" r="5" fill="#f59e0b" />
                          <text x="520" y="184" fill="#b45309" fontSize="11" fontWeight="bold">Kalium (K)</text>
                          
                          <circle cx="310" cy="240" r="5" fill="#3b82f6" />
                          <text x="320" y="244" fill="#1d4ed8" fontSize="11" fontWeight="bold">Kalsium (Ca)</text>

                          <circle cx="560" cy="250" r="5" fill="#ec4899" />
                          <text x="570" y="254" fill="#be185d" fontSize="11" fontWeight="bold">Fosfor (P)</text>
                        </g>

                        {/* Plantations / Terraces near Lake Toba */}
                        <path d="M0 410 Q80 405 180 410 Q300 415 420 410 L450 450 L0 450 Z" fill="#059669" opacity="0.7" />
                        <path d="M0 430 Q120 420 280 430 Q450 435 800 425 L800 450 L0 450 Z" fill="#047857" />
                        
                        {/* Water Body (Danau Toba) on the right */}
                        <path d="M580 380 Q660 385 800 380 L800 450 L580 450 Z" fill="url(#lakeTobaGrad)" />
                        
                        {/* Labels */}
                        <rect x="25" y="25" width="160" height="75" rx="10" fill="#ffffff" fillOpacity="0.85" stroke="#e2e8f0" strokeWidth="1.5" />
                        <text x="35" y="45" fill="#1e293b" fontSize="10" fontWeight="900">SAINS VULKANOLOGI IPA</text>
                        <text x="35" y="60" fill="#475569" fontSize="9" fontWeight="bold">• Pelapukan Abu Vulkanik</text>
                        <text x="35" y="73" fill="#475569" fontSize="9" fontWeight="bold">• Unsur Hara Makro Alami</text>
                        <text x="35" y="86" fill="#475569" fontSize="9" fontWeight="bold">• Keseimbangan Isostasi</text>

                        <text x="610" y="415" fill="#ffffff" fontSize="9" fontWeight="bold" opacity="0.9">Danau Toba</text>
                        <text x="100" y="440" fill="#ffffff" fontSize="9" fontWeight="bold" opacity="0.9">Sawah Subur Batak Toba</text>
                        <text x="405" y="365" fill="#cbd5e1" fontSize="9" fontWeight="bold" letterSpacing="1">KERAK BUMI</text>

                        {/* Defs for gradients */}
                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                          </marker>
                          <linearGradient id="skyGradient" x1="400" y1="0" x2="400" y2="450" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#e0f2fe" />
                            <stop offset="0.6" stopColor="#f0f9ff" />
                            <stop offset="1" stopColor="#f8fafc" />
                          </linearGradient>
                          <linearGradient id="sunGlow" x1="680" y1="45" x2="680" y2="135" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#fef08a" stopOpacity="0.6" />
                            <stop offset="1" stopColor="#fef08a" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="volcanoGrad" x1="430" y1="130" x2="430" y2="450" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#475569" />
                            <stop offset="1" stopColor="#1e293b" />
                          </linearGradient>
                          <linearGradient id="magmaChamber" x1="427" y1="130" x2="427" y2="250" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#f43f5e" />
                            <stop offset="1" stopColor="#dc2626" />
                          </linearGradient>
                          <radialGradient id="magmaSource" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#fda4af" />
                            <stop offset="60%" stopColor="#f43f5e" />
                            <stop offset="100%" stopColor="#991b1b" />
                          </radialGradient>
                          <linearGradient id="earthLayers" x1="400" y1="380" x2="400" y2="450" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#0f172a" />
                            <stop offset="1" stopColor="#020617" />
                          </linearGradient>
                          <radialGradient id="ashCloud" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#94a3b8" />
                            <stop offset="80%" stopColor="#cbd5e1" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0" />
                          </radialGradient>
                          <linearGradient id="lakeTobaGrad" x1="690" y1="380" x2="690" y2="450" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#0284c7" />
                            <stop offset="1" stopColor="#0369a1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Premium Image element that overlays beautifully when high-resolution image is supplied */}
                    <img
                      src={sumberkesuburan}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none group-hover:scale-[1.015]"
                      referrerPolicy="no-referrer"
                      alt="Gunung Sebagai Sumber Kesuburan"
                      onError={(e) => {
                        // Keep image hidden and prioritize beautiful SVG schematic fallback if empty/broken
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    {/* Info Overlay Panel */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-900/45 to-transparent p-4 md:p-6 flex flex-col justify-end z-10 pointer-events-none">
                      <span className="self-start text-[9px] md:text-[10px] font-black text-amber-300 bg-amber-950/50 backdrop-blur-md px-3 py-1 rounded-lg uppercase tracking-wider mb-2 border border-amber-500/20 shadow-xs">
                        Sains Vulkanologi & Isostasi IPA
                      </span>
                      <p className="text-xs md:text-sm font-extrabold text-white tracking-wide leading-snug drop-shadow-sm">
                        Kandungan abu vulkanik purba menyuburkan tanah pertanian rakyat sekeliling Danau Toba dengan rilis mineral hara makro secara terus-menerus.
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
                        <span className="text-[9px] font-medium text-slate-400 font-mono hidden sm:inline">Qari: Al-Afasy</span>
                        {isPlaying && (
                          <div className="flex gap-0.5 items-end justify-center h-4 w-6 shrink-0">
                            <span className="w-[3px] h-3 bg-emerald-500 animate-bounce" style={{ animationDelay: "0.1s" }} />
                            <span className="w-[3px] h-4 bg-emerald-500 animate-bounce" style={{ animationDelay: "0.3s" }} />
                            <span className="w-[3px] h-2 bg-emerald-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
                          </div>
                        )}
                        <button
                          onClick={() => handlePlayQuranAudio(verseKey, v.arabic, v.surah, v.verse)}
                          className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 active:scale-90 transition-all shrink-0 cursor-pointer shadow-md shadow-emerald-500/20"
                          title="Lafalkan Ayat"
                        >
                          {isPlaying ? <Pause className="w-4 h-4 fill-current text-white" /> : <Play className="w-4 h-4 fill-current text-white ml-0.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Seekable/visual Progress Bar */}
                    {progressWidth > 0 && (
                      <div className="-mt-1 w-full bg-emerald-50 h-1.5 rounded-full overflow-hidden border border-emerald-100">
                        <div 
                          className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full transition-all duration-100 ease-out rounded-full" 
                          style={{ width: `${progressWidth}%` }}
                        />
                      </div>
                    )}

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

                    {/* Additional Tafsir & IPA Connection when available */}
                    {v.tafsir && (
                      <div className="mt-2 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-[11px] leading-relaxed text-slate-700 font-sans shadow-xs">
                        <strong className="text-indigo-800 flex items-center gap-1.5 text-xs mb-1.5 font-bold uppercase tracking-wider">
                          <BookOpen className="w-3.5 h-3.5 animate-bounce" style={{ animationDuration: "3s" }} /> Tafsir Ayat
                        </strong>
                        {v.tafsir.split('\n\n').map((paragraph, idx) => (
                          <p key={idx} className={idx > 0 ? "mt-2 font-medium" : "font-medium"}>{paragraph}</p>
                        ))}
                      </div>
                    )}

                    {v.ipaConnection && (
                      <div className="mt-1 p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-[11px] leading-relaxed text-slate-700 font-sans shadow-xs">
                        <strong className="text-amber-800 flex items-center gap-1.5 text-xs mb-1.5 font-bold uppercase tracking-wider">
                          <Activity className="w-3.5 h-3.5 animate-pulse" /> Keterkaitan dengan Materi IPA
                        </strong>
                        <p className="font-medium text-amber-950/80">{v.ipaConnection}</p>
                      </div>
                    )}
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
                {lesson.etnosains.ipaConnection && (
                  <div className="mt-3.5 p-4 rounded-xl bg-sky-50 border border-sky-100 text-[11px] leading-relaxed text-slate-700 font-sans shadow-xs">
                    <strong className="text-sky-800 flex items-center gap-1.5 text-xs mb-1.5 font-bold uppercase tracking-wider">
                      <Activity className="w-3.5 h-3.5 animate-pulse text-sky-600" /> Keterkaitan dengan IPA
                    </strong>
                    <p className="font-medium text-slate-700">{lesson.etnosains.ipaConnection}</p>
                  </div>
                )}
              </div>

              <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest mt-4 mb-2">Kearifan Ekologi & Mitologi Praktis</h4>

              <div className="grid grid-cols-1 gap-4">
                {lesson.etnosains.practices.map((pr, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row gap-3.5 shadow-sm">
                    <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">{pr.title}</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-1 font-sans">{pr.desc}</p>
                      {pr.ipaConnection && (
                        <div className="mt-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-100 text-[10.5px] leading-relaxed text-slate-700 font-sans shadow-xs">
                          <strong className="text-amber-800 flex items-center gap-1.5 text-[11px] mb-1 font-bold uppercase tracking-wider">
                            <Activity className="w-3 h-3 animate-pulse text-amber-600" /> Keterkaitan dengan IPA
                          </strong>
                          <p className="font-medium text-slate-700">{pr.ipaConnection}</p>
                        </div>
                      )}
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
