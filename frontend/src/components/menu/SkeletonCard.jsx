// src/components/menu/SkeletonCard.jsx
import React from "react";

const SkeletonCard = () => (
  <div className="relative h-full bg-white/40 dark:bg-black/20 rounded-3xl overflow-hidden border border-white/10 dark:border-black/20">
    {/* Shimmering image placeholder */}
    <div className="w-full h-56 bg-stone-300/50 dark:bg-stone-800/50 shimmer-bg" />
    <div className="p-6">
      {/* Shimmering text line */}
      <div className="h-6 w-3/4 rounded-md bg-stone-300/50 dark:bg-stone-800/50 shimmer-bg mb-4" />
      <div className="flex justify-between items-center mt-4">
        {/* Shimmering price line */}
        <div className="h-8 w-1/2 rounded-md bg-stone-300/50 dark:bg-stone-800/50 shimmer-bg" />
        {/* Shimmering button circle */}
        <div className="h-12 w-12 rounded-full bg-stone-300/50 dark:bg-stone-800/50 shimmer-bg" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
