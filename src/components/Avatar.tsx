const colors = [
  "from-indigo-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-blue-500 to-cyan-500",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-yellow-500",
  "from-violet-500 to-fuchsia-500",
  "from-lime-500 to-green-500",
];

export default function Avatar({
  initials,
  size = "md",
  index = 0,
}: {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  index?: number;
}) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${
        colors[index % colors.length]
      } flex items-center justify-center text-white font-semibold flex-shrink-0`}
    >
      {initials}
    </div>
  );
}
