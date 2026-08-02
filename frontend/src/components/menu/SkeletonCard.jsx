// src/components/menu/SkeletonCard.jsx
import React from "react";

const SkeletonCard = () => (
  <div className="relative h-full bg-bone-strong/60 dark:bg-night-soft rounded-3xl overflow-hidden border border-bone-line/40 dark:border-night-line">
    {/* Shimmering image placeholder */}
    <div className="w-full h-56 bg-bone-line/60 dark:bg-night-line shimmer-bg" />
    <div className="p-6">
      {/* Shimmering text line */}
      <div className="h-6 w-3/4 rounded-md bg-bone-line/60 dark:bg-night-line shimmer-bg mb-4" />
      <div className="flex justify-between items-center mt-4">
        {/* Shimmering price line */}
        <div className="h-8 w-1/2 rounded-md bg-bone-line/60 dark:bg-night-line shimmer-bg" />
        {/* Shimmering button circle */}
        <div className="h-12 w-12 rounded-full bg-bone-line/60 dark:bg-night-line shimmer-bg" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
