"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Award,
  ClipboardList,
  Calendar,
  CheckSquare,
  MessageCircle,
} from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Feed" },
  { href: "/directory", icon: Users, label: "People" },
  { href: "/recognition", icon: Award, label: "Kudos" },
  { href: "/surveys", icon: ClipboardList, label: "Surveys" },
  { href: "/events", icon: Calendar, label: "Events" },
  { href: "/tasks", icon: CheckSquare, label: "Tasks" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border)] z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-lg transition-colors min-w-0 ${
                isActive
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] leading-tight ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
              {item.href === "/chat" && (
                <span className="absolute -top-0.5 right-0.5 w-2 h-2 bg-[var(--danger)] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
