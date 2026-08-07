import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  className?: string;
  /** When an article is found — Finder turns blue. */
  found?: boolean;
};

/** LuxeFinder wordmark — Finder gray by default, blue when found. */
export function BrandMark({ href = "/", className, found = false }: Props) {
  const mark = (
    <span
      className={cn(
        "text-[18px] font-semibold tracking-[-0.03em] text-foreground",
        className
      )}
    >
      Luxe
      <span
        className={cn(
          "transition-colors duration-500",
          found ? "text-[#0071E3]" : "text-black/30"
        )}
      >
        Finder
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {mark}
      </Link>
    );
  }

  return mark;
}
