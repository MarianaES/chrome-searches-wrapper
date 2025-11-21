"use client";

import { SetStateAction, useState } from "react";
import { Stats } from "../page";
import FileUpload from "./FileUpload";

function HeroSection() {
  const [stats, setStats] = useState<Stats | null>(null);

  const handleSuccess = (data: { stats: SetStateAction<Stats | null> }) => {
    console.log("Browsing history data:", data);
    if (data.stats) {
      setStats(data.stats);
    }
  };

  const handleError = (msg: string) => {
    console.error(msg);
    // Error handling can be done here
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <div className="flex flex-col items-center max-w-6xl">
        <div className="mb-10 px-6 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-cyan-400 rounded-full text-sm font-bold">
          Your Search Story
        </div>
        <h1 className="text-[clamp(40px,15vw,60px)] font-black leading-none mb-8 text-center bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 bg-clip-text text-transparent">
          2025 Wrapped
        </h1>
        <p className="text-[clamp(18px, 3vw, 28px)] text-gray-400 font-bold mb-12 text-center max-w-4xl px-4">
          A year of curiosity, discovery, and endless questions.
        </p>
        <FileUpload onSuccess={handleSuccess} onError={handleError} />
      </div>
    </div>
  );
}

export default HeroSection;
