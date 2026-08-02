// src/styles/GlobalStyles.jsx
import React from "react";

const GlobalStyles = () => (
  <style>{`
        /* Basic HTML and Body styles */
        html {
            scroll-behavior: smooth;
            scrollbar-width: thin;
            scrollbar-color: #C97B2D #EFE7DD;
        }

        body {
            font-family: 'Vazirmatn', sans-serif;
            direction: rtl;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            background-color: #FAF7F2;
            color: #1C1917;
            transition: background-color 0.5s, color 0.5s;
        }
        body.dark {
            background-color: #12100E;
            color: #F5EFE7;
        }
        .dark html {
             scrollbar-color: #E8A44D #2E2924;
        }

        /* Custom scrollbar utility */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        /* Global Keyframe Animations */
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }

        /* Webkit scrollbar */
        ::-webkit-scrollbar {
            width: 12px;
        }
        ::-webkit-scrollbar-track {
            background: rgba(239, 231, 221, 0.5);
        }
        .dark ::-webkit-scrollbar-track {
            background: rgba(46, 41, 36, 0.5);
        }
        ::-webkit-scrollbar-thumb {
            background-image: linear-gradient(to bottom, #E8A44D, #C97B2D);
            border-radius: 10px;
            border: 3px solid transparent;
            background-clip: content-box;
        }

        /* Focus visible — accessibility */
        :focus-visible {
            outline: 2px solid #C97B2D;
            outline-offset: 2px;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        }
    `}</style>
);

export default GlobalStyles;
