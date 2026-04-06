"use client";

import { useState } from "react";
import { Heart, Award, Send, Star, Sparkles, Trophy, Lightbulb, Target } from "lucide-react";
import TopBar from "@/components/TopBar";
import Avatar from "@/components/Avatar";
import { recognitions as initialRecognitions, users, currentUser } from "@/lib/data";
import { Recognition } from "@/lib/types";

const badges = [
  { name: "Star Performer", icon: Star, color: "text-yellow-500 bg-yellow-50" },
  { name: "Innovator", icon: Lightbulb, color: "text-blue-500 bg-blue-50" },
  { name: "Mentor", icon: Sparkles, color: "text-purple-500 bg-purple-50" },
  { name: "Problem Solver", icon: Target, color: "text-green-500 bg-green-50" },
  { name: "Team Player", icon: Trophy, color: "text-orange-500 bg-orange-50" },
];

export default function RecognitionPage() {
  const [items, setItems] = useState(initialRecognitions);
  const [showForm, setShowForm] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState("Star Performer");
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");

  const toggleLike = (id: string) => {
    setItems((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r
      )
    );
  };

  const sendRecognition = () => {
    if (!selectedUser || !message.trim()) return;
    const toUser = users.find((u) => u.id === selectedUser)!;
    const rec: Recognition = {
      id: Date.now().toString(),
      from: currentUser,
      to: toUser,
      message,
      badge: selectedBadge,
      createdAt: "Just now",
      likes: 0,
      liked: false,
    };
    setItems([rec, ...items]);
    setShowForm(false);
    setMessage("");
    setSelectedUser("");
  };

  return (
    <>
      <TopBar title="Recognition" />
      <main className="pt-16 pb-20 px-4 space-y-4">
        {/* Give kudos button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white rounded-2xl p-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow mt-2"
        >
          <Award size={20} />
          <span className="font-semibold text-sm">Give Recognition</span>
        </button>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl p-4 shadow-sm animate-slide-up space-y-4">
            <div>
              <label className="text-xs font-semibold text-[var(--muted)] mb-1 block">
                Who do you want to recognize?
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full p-2.5 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-30"
              >
                <option value="">Select a person</option>
                {users
                  .filter((u) => u.id !== currentUser.id)
                  .map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} - {u.role}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--muted)] mb-2 block">
                Choose a badge
              </label>
              <div className="flex gap-2 flex-wrap">
                {badges.map((b) => (
                  <button
                    key={b.name}
                    onClick={() => setSelectedBadge(b.name)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedBadge === b.name
                        ? "bg-[var(--primary)] text-white"
                        : b.color
                    }`}
                  >
                    <b.icon size={14} />
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--muted)] mb-1 block">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Why are you recognizing this person?"
                className="w-full p-2.5 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-30 resize-none"
                rows={3}
              />
            </div>

            <button
              onClick={sendRecognition}
              className="w-full py-2.5 bg-[var(--primary)] text-white text-sm font-medium rounded-xl hover:bg-[var(--primary-dark)] transition-colors flex items-center justify-center gap-2"
            >
              <Send size={16} />
              Send Recognition
            </button>
          </div>
        )}

        {/* Recognition feed */}
        {items.map((rec) => {
          const badge = badges.find((b) => b.name === rec.badge) || badges[0];
          return (
            <div key={rec.id} className="bg-white rounded-2xl p-4 shadow-sm animate-slide-up">
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-1.5 rounded-lg ${badge.color}`}>
                  <badge.icon size={16} />
                </div>
                <span className="text-xs font-semibold">{rec.badge}</span>
                <span className="text-[10px] text-[var(--muted)] ml-auto">{rec.createdAt}</span>
              </div>

              <div className="flex items-center gap-2 text-sm mb-2">
                <Avatar
                  initials={rec.from.avatar}
                  size="sm"
                  index={users.findIndex((u) => u.id === rec.from.id)}
                />
                <span className="font-medium">{rec.from.name}</span>
                <span className="text-[var(--muted)]">recognized</span>
                <Avatar
                  initials={rec.to.avatar}
                  size="sm"
                  index={users.findIndex((u) => u.id === rec.to.id)}
                />
                <span className="font-medium">{rec.to.name}</span>
              </div>

              <p className="text-sm text-[var(--muted)] mb-3">{rec.message}</p>

              <button
                onClick={() => toggleLike(rec.id)}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  rec.liked ? "text-red-500" : "text-[var(--muted)] hover:text-red-500"
                }`}
              >
                <Heart size={16} fill={rec.liked ? "currentColor" : "none"} />
                <span>{rec.likes}</span>
              </button>
            </div>
          );
        })}
      </main>
    </>
  );
}
