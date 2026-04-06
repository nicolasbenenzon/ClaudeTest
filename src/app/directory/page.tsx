"use client";

import { useState } from "react";
import { Search, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import TopBar from "@/components/TopBar";
import Avatar from "@/components/Avatar";
import { users } from "@/lib/data";

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [filterDept, setFilterDept] = useState("All");

  const departments = ["All", ...new Set(users.map((u) => u.department))];

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = filterDept === "All" || u.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const selected = users.find((u) => u.id === selectedUser);

  return (
    <>
      <TopBar title="People" />
      <main className="pt-16 pb-20 px-4">
        {/* Search */}
        <div className="relative mt-2 mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            placeholder="Search people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-30 shadow-sm"
          />
        </div>

        {/* Department filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 py-1">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setFilterDept(dept)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                filterDept === dept
                  ? "bg-[var(--primary)] text-white"
                  : "bg-white text-[var(--muted)] hover:bg-gray-100"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* User list */}
        <div className="space-y-2">
          {filtered.map((user, i) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user.id === selectedUser ? null : user.id)}
              className="w-full bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-all text-left animate-slide-up"
            >
              <Avatar initials={user.avatar} size="lg" index={i} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-[var(--muted)]">{user.role}</p>
                <p className="text-xs text-[var(--primary)]">{user.department}</p>
              </div>
              <ChevronRight size={16} className="text-[var(--muted)]" />
            </button>
          ))}
        </div>

        {/* User detail modal */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/30 z-50 flex items-end justify-center"
            onClick={() => setSelectedUser(null)}
          >
            <div
              className="bg-white rounded-t-3xl w-full max-w-lg p-6 animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
              <div className="flex flex-col items-center">
                <Avatar
                  initials={selected.avatar}
                  size="xl"
                  index={users.findIndex((u) => u.id === selected.id)}
                />
                <h2 className="text-xl font-bold mt-3">{selected.name}</h2>
                <p className="text-sm text-[var(--primary)]">{selected.role}</p>
                <p className="text-xs text-[var(--muted)]">{selected.department}</p>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Mail size={18} className="text-[var(--primary)]" />
                  <span className="text-sm">{selected.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Phone size={18} className="text-[var(--primary)]" />
                  <span className="text-sm">{selected.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin size={18} className="text-[var(--primary)]" />
                  <span className="text-sm">{selected.location}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="flex-1 py-2.5 bg-[var(--primary)] text-white text-sm font-medium rounded-xl hover:bg-[var(--primary-dark)] transition-colors">
                  Message
                </button>
                <button className="flex-1 py-2.5 border border-[var(--border)] text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
