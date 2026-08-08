"use client";

import { Search } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { luxefinderApi } from "@/lib/api";
import { cn } from "@/lib/utils";

export type SearchSuggestion = {
  label: string;
  brand: string;
  model: string;
};

type Props = {
  onSearch: (query: string) => void;
  disabled?: boolean;
  className?: string;
};

/**
 * Search under the wordmark — suggestions from seed KB + living catalogue.
 * Enter with free text is allowed: the server resolves via Shopping if unknown.
 */
export function ProductSearchBar({ onSearch, disabled, className }: Props) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  useEffect(() => {
    const q = value.trim();
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    let cancelled = false;
    const t = window.setTimeout(async () => {
      try {
        const res = await luxefinderApi.suggest(q);
        if (cancelled) return;
        setSuggestions(
          (res.suggestions || []).map((s) => ({
            label: s.label,
            brand: String(s.brand || ""),
            model: String(s.model || ""),
          }))
        );
      } catch {
        if (!cancelled) setSuggestions([]);
      }
    }, 180);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [value]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setActive(-1);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const commit = useCallback(
    (item: SearchSuggestion) => {
      if (disabled) return;
      setOpen(false);
      setActive(-1);
      setValue(item.label);
      onSearch(item.label);
      inputRef.current?.blur();
    },
    [disabled, onSearch]
  );

  const commitFree = useCallback(
    (raw: string) => {
      if (disabled) return;
      const q = raw.trim();
      if (q.length < 2) return;
      setOpen(false);
      setActive(-1);
      setValue(q);
      onSearch(q);
      inputRef.current?.blur();
    },
    [disabled, onSearch]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (active >= 0 && suggestions[active]) {
      commit(suggestions[active]);
      return;
    }
    if (suggestions[0]) {
      commit(suggestions[0]);
      return;
    }
    commitFree(value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) {
      if (e.key === "Escape") setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  const showList = open && !disabled && value.trim().length >= 2 && suggestions.length > 0;

  return (
    <div ref={rootRef} className={cn("relative w-full max-w-[280px]", className)}>
      <form onSubmit={onSubmit} className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground/30"
          strokeWidth={1.75}
          aria-hidden
        />
        <input
          ref={inputRef}
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          disabled={disabled}
          value={value}
          placeholder="Marque + modèle"
          aria-label="Rechercher un modèle"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={showList}
          role="combobox"
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full rounded-full bg-muted/70 py-2 pl-9 pr-4 text-center text-[13px] font-medium tracking-[-0.01em] text-foreground outline-none ring-1 ring-black/[0.04] placeholder:text-foreground/30 focus:bg-muted focus:ring-black/[0.08] disabled:opacity-50"
        />
      </form>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl bg-white py-1.5 shadow-soft ring-1 ring-black/[0.06]"
        >
          {suggestions.map((s, i) => (
            <li key={`${s.brand}-${s.model}-${s.label}`} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => commit(s)}
                className={cn(
                  "flex w-full flex-col items-start px-3.5 py-2 text-left transition",
                  i === active ? "bg-black/[0.04] text-foreground" : "text-foreground/80 hover:bg-black/[0.03]"
                )}
              >
                <span className="min-w-0 truncate text-[13px] font-medium tracking-[-0.01em]">
                  {s.label}
                </span>
                <span className="text-[11px] text-foreground/35">{s.brand}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
