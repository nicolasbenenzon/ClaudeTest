"use client";

import { useState } from "react";
import { Calendar, MapPin, Clock, Users, Check, Plus } from "lucide-react";
import TopBar from "@/components/TopBar";
import { events as initialEvents } from "@/lib/data";

export default function EventsPage() {
  const [eventList, setEventList] = useState(initialEvents);

  const toggleRsvp = (id: string) => {
    setEventList((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              rsvped: !e.rsvped,
              attendees: e.rsvped ? e.attendees - 1 : e.attendees + 1,
            }
          : e
      )
    );
  };

  return (
    <>
      <TopBar title="Events" />
      <main className="pt-16 pb-20 px-4 space-y-4 mt-2">
        {eventList.map((event) => {
          const date = new Date(event.date);
          const month = date.toLocaleDateString("en-US", { month: "short" });
          const day = date.getDate();
          const spotsLeft = event.maxAttendees - event.attendees;

          return (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm animate-slide-up"
            >
              {/* Color header */}
              <div className="h-2 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]" />

              <div className="p-4">
                <div className="flex gap-3">
                  {/* Date badge */}
                  <div className="flex-shrink-0 w-14 h-14 bg-indigo-50 rounded-xl flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-[var(--primary)] uppercase">
                      {month}
                    </span>
                    <span className="text-xl font-bold text-[var(--foreground)]">{day}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{event.title}</h3>
                    <p className="text-xs text-[var(--muted)] mt-0.5 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-xs text-[var(--muted)]">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {event.location}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-[var(--muted)]" />
                    <span className="text-xs text-[var(--muted)]">
                      {event.attendees} going
                    </span>
                    <span className="text-xs text-orange-500">{spotsLeft} spots left</span>
                  </div>

                  <button
                    onClick={() => toggleRsvp(event.id)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      event.rsvped
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
                    }`}
                  >
                    {event.rsvped ? (
                      <>
                        <Check size={14} /> Going
                      </>
                    ) : (
                      <>
                        <Plus size={14} /> RSVP
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}
