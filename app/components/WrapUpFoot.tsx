"use client";

import { Sparkles, Share2 } from "lucide-react";
import { useState } from "react";
import { Stats } from "../page";
import { SearchQuery } from "./FileUpload";

interface WrapUpFootProps {
  stats: Stats;
  topSearches: SearchQuery[];
}

function WrapUpFoot({ stats, topSearches }: WrapUpFootProps) {
  const [copied, setCopied] = useState(false);

  const urlSafeBase64Encode = (str: string): string => {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  };

  const handleShare = async () => {
    try {
      const shareData = {
        totalVisits: stats.totalVisits,
        totalDays: stats.totalDays,
        avgPerDay: stats.avgPerDay,
        maxDay: {
          dateString: stats.maxDay.dateString,
          value: stats.maxDay.value,
        },
        topSearches: topSearches.slice(0, 10),
      };

      const encoded = urlSafeBase64Encode(JSON.stringify(shareData));
      const shareUrl = `${window.location.origin}/shared/${encoded}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: "2025 Wrapped - My Browsing History",
            text: `I had ${stats.totalVisits.toLocaleString()} visits this year!`,
            url: shareUrl,
          });
          return;
        } catch (err) {
          console.log("Share cancelled or failed:", err);
        }
      }

      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to share:", err);
      alert("Failed to create share link. Try again!");
    }
  };

  return (
    <div className="w-full px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-cyan-400 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-black" strokeWidth={2.5} />
          </div>
        </div>
        <h2 className="text-[clamp(40px,10vw,72px)] font-black mb-6">
          That&apos;s a Wrap!
        </h2>
        <p className="text-[clamp(16px, 3vw, 24px)] text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Here&apos;s to another year of curiosity, discovery, and finding
          answers to life&apos;s questions
        </p>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:opacity-90 transition-opacity px-8 py-4 rounded-full font-semibold text-lg text-black"
        >
          <Share2 className="w-5 h-5" />
          {copied ? "Link Copied!" : "Share Your Wrapped"}
        </button>
        <p className="text-gray-500 text-sm mt-12">
          Google Search Wrapped 2025
        </p>
      </div>
    </div>
  );
}

export default WrapUpFoot;
