// src/layout/Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} TvmEvents. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-700">About</a>
          <a href="#" className="hover:text-slate-700">Contact</a>
          <a href="#" className="hover:text-slate-700">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
