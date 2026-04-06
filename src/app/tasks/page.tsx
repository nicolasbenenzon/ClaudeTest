"use client";

import { useState } from "react";
import { CheckSquare, Circle, Clock, AlertTriangle, CheckCircle2, MoreVertical } from "lucide-react";
import TopBar from "@/components/TopBar";
import Avatar from "@/components/Avatar";
import { tasks as initialTasks, users } from "@/lib/data";
import { Task } from "@/lib/types";

const statusConfig = {
  todo: { label: "To Do", color: "bg-gray-100 text-gray-600", icon: Circle },
  in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-600", icon: Clock },
  done: { label: "Done", color: "bg-green-100 text-green-600", icon: CheckCircle2 },
};

const priorityConfig = {
  low: { label: "Low", color: "text-gray-400" },
  medium: { label: "Medium", color: "text-orange-400" },
  high: { label: "High", color: "text-red-500" },
};

export default function TasksPage() {
  const [taskList, setTaskList] = useState(initialTasks);
  const [filter, setFilter] = useState<"all" | "todo" | "in_progress" | "done">("all");

  const cycleStatus = (id: string) => {
    const order: Task["status"][] = ["todo", "in_progress", "done"];
    setTaskList((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = order.indexOf(t.status);
        return { ...t, status: order[(idx + 1) % order.length] };
      })
    );
  };

  const filtered = filter === "all" ? taskList : taskList.filter((t) => t.status === filter);
  const counts = {
    all: taskList.length,
    todo: taskList.filter((t) => t.status === "todo").length,
    in_progress: taskList.filter((t) => t.status === "in_progress").length,
    done: taskList.filter((t) => t.status === "done").length,
  };

  return (
    <>
      <TopBar title="Tasks" />
      <main className="pt-16 pb-20 px-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-2 mb-4">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-[var(--foreground)]">{counts.todo}</p>
            <p className="text-[10px] text-[var(--muted)]">To Do</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-500">{counts.in_progress}</p>
            <p className="text-[10px] text-[var(--muted)]">In Progress</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-500">{counts.done}</p>
            <p className="text-[10px] text-[var(--muted)]">Done</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {(["all", "todo", "in_progress", "done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-[var(--primary)] text-white"
                  : "bg-white text-[var(--muted)]"
              }`}
            >
              {f === "all" ? "All" : statusConfig[f].label} ({counts[f]})
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="space-y-2">
          {filtered.map((task) => {
            const status = statusConfig[task.status];
            const priority = priorityConfig[task.priority];
            const daysUntilDue = Math.ceil(
              (new Date(task.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            );
            const overdue = daysUntilDue < 0 && task.status !== "done";

            return (
              <div
                key={task.id}
                className={`bg-white rounded-xl p-3 shadow-sm animate-slide-up ${
                  task.status === "done" ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => cycleStatus(task.id)}
                    className="mt-0.5 flex-shrink-0"
                  >
                    <status.icon
                      size={20}
                      className={
                        task.status === "done"
                          ? "text-green-500"
                          : task.status === "in_progress"
                          ? "text-blue-500"
                          : "text-gray-300"
                      }
                    />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm font-semibold ${
                          task.status === "done" ? "line-through text-[var(--muted)]" : ""
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.priority === "high" && (
                        <AlertTriangle size={14} className={priority.color} />
                      )}
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-0.5 line-clamp-1">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                      <span
                        className={`text-[10px] ${
                          overdue ? "text-red-500 font-medium" : "text-[var(--muted)]"
                        }`}
                      >
                        {overdue
                          ? `${Math.abs(daysUntilDue)}d overdue`
                          : `Due in ${daysUntilDue}d`}
                      </span>
                      <div className="flex items-center gap-1 ml-auto">
                        <Avatar
                          initials={task.assignedBy.avatar}
                          size="sm"
                          index={users.findIndex((u) => u.id === task.assignedBy.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
