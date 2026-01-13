import React from "react";

function Footer() {
  return (
    <footer className="mt-16 border-t border-white bg-purple-600 height-16">
      <div className="mx-auto flex max-w-6xl  items-center justify-between gap-3 px-4 py-6 text-xl text-white flex-row">
        <p>© {new Date().getFullYear()} TvmEvents. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-300">
            About
          </a>
          <a href="#" className="hover:text-slate-300">
            Contact
          </a>
          <a href="#" className="hover:text-slate-300">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
