// src/styles/GlobalStyles.jsx
import React from "react";

const GlobalStyles = () => (
  <style>{`
        /* Importing Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        /* Basic HTML and Body styles */
        html {
            scroll-behavior: smooth;
            /* === NEW: Firefox Scrollbar Styles === */
            scrollbar-width: thin;
            scrollbar-color: #eab308 #f1f5f9; /* thumb track */
        }
        
        body {
            font-family: 'Vazirmatn', sans-serif;
            direction: rtl;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: #FFFBF5; /* Light mode background */
            color: #44403c; /* Light mode text */
            transition: background-color 0.5s, color 0.5s;
        }
        body.dark {
            background-color: #1A120B; /* Dark mode background */
            color: #d6d3d1; /* Dark mode text */
        }
        .dark html {
             scrollbar-color: #eab308 #27272a;
        }

        /* Custom scrollbar utility */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
        
        /* Global Keyframe Animations */
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
        
        /* === NEW: High-Level Custom Scrollbar Styles === */
        /* This works in Webkit-based browsers like Chrome, Safari, and Edge */
        
        ::-webkit-scrollbar {
            width: 14px;
        }

        ::-webkit-scrollbar-track {
            background: rgba(241, 245, 249, 0.5); /* Semi-transparent track */
        }
        .dark ::-webkit-scrollbar-track {
            background: rgba(39, 39, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
            background-image: linear-gradient(to bottom, #fde047, #f59e0b);
            border-radius: 10px;
            border: 3px solid transparent;
            background-clip: content-box;
            transition: all 0.2s ease-in-out;
        }

        ::-webkit-scrollbar-thumb:hover {
            background-image: linear-gradient(to bottom, #fef08a, #fbbf24);
        }
        
        ::-webkit-scrollbar-thumb:active {
            transform: scale(0.95);
        }
    `}</style>
);

export default GlobalStyles;
