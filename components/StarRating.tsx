import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  size?: "sm" | "lg";
};

export function StarRating({ rating, size = "sm" }: StarRatingProps) {
  const starSize = size === "lg" ? "h-5 w-5" : "h-4 w-4";

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.min(Math.max(rating - index, 0), 1);

        return (
          <span key={index} className={`relative inline-block ${starSize}`}>
            <Star className={`${starSize} text-slate-200`} fill="currentColor" stroke="none" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className={`${starSize} text-amber-400`} fill="currentColor" stroke="none" />
            </span>
          </span>
        );
      })}
    </div>
  );
}
