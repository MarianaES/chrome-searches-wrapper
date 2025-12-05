"use client";

function HeroSection() {
  return (
    <div className="flex flex-col items-center max-w-6xl">
      <div className="mb-10 px-6 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-cyan-400 rounded-full text-sm font-bold">
        Your Search Story
      </div>
      <h1 className="text-[clamp(40px,15vw,72px)] font-black leading-none mb-8 text-center bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 bg-clip-text text-transparent">
        2025 Wrapped
      </h1>
      <p className="text-[clamp(18px, 3vw, 28px)] text-gray-400 f mb-12 text-center max-w-4xl px-4">
        A year of curiosity, discovery, and endless questions.
      </p>
    </div>
  );
}

export default HeroSection;
