"use client";

import { Bell, Search } from "lucide-react";
import { useState } from "react";

export default function TopBar({ title }: { title: string }) {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-[var(--border)] z-50">
      <div className="max-w-lg mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center">
            <span className="text-white text-sm font-bold">H</span>
          </div>
          <h1 className="text-lg font-bold text-[var(--foreground)]">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Search size={20} className="text-[var(--muted)]" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            onClick={() => setShowNotif(!showNotif)}
          >
            <Bell size={20} className="text-[var(--muted)]" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[var(--danger)] rounded-full border-2 border-white" />
          </button>
        </div>
      </div>
      {showNotif && (
        <div className="absolute top-14 right-2 w-72 bg-white rounded-xl shadow-xl border border-[var(--border)] p-3 animate-slide-up">
          <p className="text-sm font-semibold mb-2">Notifications</p>
          {[
            "Emily Watson posted a new announcement",
            "You were recognized by Sarah Chen",
            "New survey: Office Space Preferences",
          ].map((n, i) => (
            <div key={i} className="text-xs text-[var(--muted)] py-2 border-b border-[var(--border)] last:border-0">
              {n}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
