export interface StudentProfile {
  name: string;
  avatar: string; // emoji or SVG base64
  score: number;
  level: number;
  xp: number;
  progress: Record<string, number>; // moduleId -> percentage (0-100)
  completedLessons: string[]; // moduleId[]
  badges: Badge[];
  lastProgressUpdate?: string; // Last active/updated ISO timestamp
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name or emoji
  unlockedAt?: string;
  category: "science" | "quran" | "culture" | "general";
}

export interface QuranVerse {
  surah: string;
  verse: string;
  arabic: string;
  translation: string;
  explanation: string;
  audioUrl?: string; // We'll make a custom audio generator or ambient audio web synthesis
}

export interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  description: string;
}

export interface InteractiveQuizItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface LessonContent {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  color: string; // Tailwind class name or hex
  pemantik: {
    question: string;
    text: string;
    imageUrl?: string;
  };
  eksplorasi: {
    text: string;
    points: { title: string; desc: string }[];
  };
  sains: {
    title: string;
    text: string;
    diagramType?: "isostasy" | "tectonic" | "volcano" | "hydrology" | "soil";
    hotspots?: Hotspot[];
  };
  quran: {
    title: string;
    verses: QuranVerse[];
    hikmah: string;
  };
  etnosains: {
    title: string;
    origin: string; // Batak Toba custom perspective
    narrative: string;
    practices: { title: string; desc: string; icon: string }[];
  };
  rangkuman: string[];
  quiz: InteractiveQuizItem[];
  matchingGame?: {
    instruction: string;
    pairs: MatchingPair[];
  };
}

export interface GlossaryItem {
  term: string;
  definition: string;
  category: "Sains" | "Al-Qur'an" | "Etnosains Batak";
}
