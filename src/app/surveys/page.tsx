"use client";

import { useState } from "react";
import { ClipboardList, Star, CheckCircle, Clock, ArrowLeft, Send } from "lucide-react";
import TopBar from "@/components/TopBar";
import { surveys } from "@/lib/data";

export default function SurveysPage() {
  const [activeSurvey, setActiveSurvey] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Set<string>>(new Set());

  const survey = surveys.find((s) => s.id === activeSurvey);

  if (survey && !submitted.has(survey.id)) {
    return (
      <>
        <TopBar title="Survey" />
        <main className="pt-16 pb-20 px-4">
          <button
            onClick={() => setActiveSurvey(null)}
            className="flex items-center gap-1 text-sm text-[var(--primary)] mt-2 mb-4"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <h2 className="text-lg font-bold mb-1">{survey.title}</h2>
          <p className="text-sm text-[var(--muted)] mb-6">{survey.description}</p>

          <div className="space-y-6">
            {survey.questions.map((q, qi) => (
              <div key={q.id} className="bg-white rounded-2xl p-4 shadow-sm animate-slide-up">
                <p className="text-sm font-semibold mb-3">
                  {qi + 1}. {q.text}
                </p>

                {q.type === "rating" && (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRatings({ ...ratings, [q.id]: star })}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          className={
                            (ratings[q.id] || 0) >= star
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200"
                          }
                        />
                      </button>
                    ))}
                  </div>
                )}

                {q.type === "multiple_choice" && q.options && (
                  <div className="space-y-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelections({ ...selections, [q.id]: opt })}
                        className={`w-full text-left p-3 rounded-xl text-sm transition-all ${
                          selections[q.id] === opt
                            ? "bg-[var(--primary)] text-white"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {q.type === "text" && (
                  <textarea
                    value={textAnswers[q.id] || ""}
                    onChange={(e) =>
                      setTextAnswers({ ...textAnswers, [q.id]: e.target.value })
                    }
                    placeholder="Type your answer..."
                    className="w-full p-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-opacity-30 resize-none"
                    rows={3}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setSubmitted(new Set(submitted).add(survey.id));
              setActiveSurvey(null);
            }}
            className="w-full mt-6 py-3 bg-[var(--primary)] text-white text-sm font-medium rounded-xl hover:bg-[var(--primary-dark)] transition-colors flex items-center justify-center gap-2"
          >
            <Send size={16} /> Submit Survey
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <TopBar title="Surveys" />
      <main className="pt-16 pb-20 px-4 space-y-3 mt-2">
        {surveys.map((s) => {
          const isCompleted = s.completed || submitted.has(s.id);
          const daysLeft = Math.max(
            0,
            Math.ceil(
              (new Date(s.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            )
          );

          return (
            <button
              key={s.id}
              onClick={() => !isCompleted && setActiveSurvey(s.id)}
              className={`w-full text-left bg-white rounded-2xl p-4 shadow-sm transition-all animate-slide-up ${
                isCompleted ? "opacity-60" : "hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    isCompleted ? "bg-green-50" : "bg-indigo-50"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <ClipboardList size={20} className="text-[var(--primary)]" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{s.title}</h3>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{s.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-[var(--muted)]">
                      {s.responses} responses
                    </span>
                    <span className="text-xs text-[var(--muted)]">
                      {s.questions.length} questions
                    </span>
                    {!isCompleted && (
                      <span className="flex items-center gap-1 text-xs text-orange-500">
                        <Clock size={12} /> {daysLeft}d left
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-xs text-green-500 font-medium">Completed</span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </main>
    </>
  );
}
