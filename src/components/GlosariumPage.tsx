import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, BookOpen, Layers, Sparkles, Filter } from "lucide-react";
import { GlossaryItem } from "../types";
import { GLOSARI_DATA } from "../data";

export default function GlosariumPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = ["Semua", "Sains", "Al-Qur'an", "Etnosains Batak"];

  const filteredGlossary = GLOSARI_DATA.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Sains":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Al-Qur'an":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Etnosains Batak":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 pb-24 font-sans select-none">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        {/* HEADER SECTION */}
        <div className="p-6 bg-white border border-slate-200 mt-4 rounded-3xl shadow-sm">
          <h2 className="text-xl font-black text-slate-800 tracking-wide uppercase flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            Kamus Glosarium
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Kumpulan rujukan istilah sains bumi geologi, Al-Qur'anul Karim, dan adat istiadat Tapanuli Batak.
          </p>

          {/* SEARCH INPUT BAR */}
          <div className="relative mt-5">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Cari kata kunci atau definisi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
            />
          </div>

          {/* CATEGORY SELECTOR TABS */}
          <div className="flex gap-1.5 overflow-x-auto mt-4 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-amber-400 text-slate-950 shadow-md"
                    : "bg-slate-100 text-slate-650 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GLOSSARY ITEMS GRID / LIST */}
        <div className="flex-1 py-6 overflow-y-auto">
          {filteredGlossary.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredGlossary.map((item, index) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-200 transition-all flex flex-col justify-between gap-2.5 shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h4 className="text-base font-black text-slate-850 tracking-wide">
                        {item.term}
                      </h4>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase border shrink-0 ${getCategoryBadgeColor(
                          item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                      {item.definition}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 font-bold">
              <Layers className="w-12 h-12 text-slate-305 mb-3 stroke-1" />
              <p className="text-sm">Istilah tidak ditemukan</p>
              <p className="text-xs mt-1 px-4 leading-relaxed text-slate-400">
                Coba gunakan filter berlainan atau periksa kembali ejaan kata kunci pencarianmu.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
