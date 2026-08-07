"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function AnimatedDots() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCount((c) => (c % 3) + 1);
    }, 900);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      aria-hidden
      className="inline-block w-[1.1em] text-left tracking-[0.05em]"
    >
      {".".repeat(count)}
    </span>
  );
}

type Props = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  compact?: boolean;
  /** Blue placeholder + pulsing halo — guides the user to the next step. */
  emphasize?: boolean;
};

export function BudgetInput({
  id = "client-budget",
  value,
  onChange,
  disabled,
  className,
  compact = false,
  emphasize = false,
}: Props) {
  const [focused, setFocused] = useState(false);
  const showPlaceholder = !value && !focused;
  /** Halo only while waiting for budget — stops once filled or focused. */
  const showHalo = emphasize && !value && !focused && !disabled;

  return (
    <div className={cn("relative", className)}>
      {showHalo && (
        <span
          aria-hidden
          className="animate-budget-halo pointer-events-none absolute -inset-2 rounded-[1.5rem] bg-[#0071E3]/35 blur-xl"
        />
      )}
      <label htmlFor={id} className="sr-only">
        Votre budget
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "relative z-10 w-full rounded-[1.25rem] border-[#0071E3] bg-muted/80 text-center font-semibold tabular-nums text-foreground outline-none focus:border-[#0071E3] disabled:opacity-50",
          emphasize ? "border-2" : "border",
          compact ? "px-3 py-2.5 text-[15px]" : "px-4 py-3.5 text-[17px]"
        )}
      />
      {showPlaceholder && (
        <span
          className={cn(
            "pointer-events-none absolute inset-0 z-10 flex items-center justify-center font-medium transition-colors duration-300",
            compact ? "text-[13px]" : "text-[15px]",
            emphasize ? "text-[#0071E3]" : "text-foreground/35"
          )}
          aria-hidden
        >
          Votre budget
          <AnimatedDots />
        </span>
      )}
    </div>
  );
}
