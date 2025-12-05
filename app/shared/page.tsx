"use client";

import { Suspense } from "react";
import SharedPageContent from "./shared-page-content";

export default function SharedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          Loading...
        </div>
      }
    >
      <SharedPageContent />
    </Suspense>
  );
}
