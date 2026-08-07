"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Volume2, VolumeX } from "lucide-react";

/** Cache-bust after mastering the MP3 quieter (−26 dB). */
const SRC = "/sound/birds.mp3?v=4";
/**
 * Desktop browsers respect this; iOS often ignores it — so the file itself
 * was also mastered ~26 dB quieter.
 */
const VOLUME = 0.004;
const STORAGE_KEY = "luxefinder-ambient-muted";
const HIDE_MS = 2000;

/**
 * Soft birds loop. Starts after first user gesture (browser autoplay policy).
 * Mute control: visible briefly, then hides; reappears on top-right hover (desktop)
 * or top-right tap (mobile).
 */
export function AmbientBirds() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveringRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState(true);

  const clearHide = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearHide();
    hideTimerRef.current = setTimeout(() => {
      if (hoveringRef.current) return;
      setRevealed(false);
      hideTimerRef.current = null;
    }, HIDE_MS);
  }, [clearHide]);

  const reveal = useCallback(() => {
    clearHide();
    setRevealed(true);
  }, [clearHide]);

  useEffect(() => {
    try {
      setMuted(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      /* ignore */
    }
    scheduleHide();
    return () => clearHide();
  }, [scheduleHide, clearHide]);

  useEffect(() => {
    const audio = new Audio(SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = VOLUME;
    audioRef.current = audio;

    const applyVolume = () => {
      if (!audioRef.current) return;
      audioRef.current.volume = VOLUME;
    };

    audio.addEventListener("play", applyVolume);
    audio.addEventListener("playing", applyVolume);
    audio.addEventListener("timeupdate", applyVolume);

    const tryPlay = () => {
      if (!audioRef.current) return;
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
      applyVolume();
      void audioRef.current.play().then(() => setReady(true)).catch(() => {
        /* waiting for gesture */
      });
    };

    tryPlay();

    const unlock = () => {
      tryPlay();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
      audio.removeEventListener("play", applyVolume);
      audio.removeEventListener("playing", applyVolume);
      audio.removeEventListener("timeupdate", applyVolume);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
    audio.volume = VOLUME;
    if (!muted && ready) {
      void audio.play().catch(() => undefined);
    }
  }, [muted, ready]);

  const toggle = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      const audio = audioRef.current;
      if (audio) {
        audio.muted = next;
        if (!next) {
          audio.volume = VOLUME;
          void audio.play().then(() => setReady(true)).catch(() => undefined);
        }
      }
      return next;
    });
    scheduleHide();
  }, [scheduleHide]);

  const onZoneEnter = useCallback(() => {
    hoveringRef.current = true;
    reveal();
  }, [reveal]);

  const onZoneLeave = useCallback(() => {
    hoveringRef.current = false;
    scheduleHide();
  }, [scheduleHide]);

  /** Mobile: tap empty corner to reveal; don't toggle yet. */
  const onZonePointerDown = useCallback(
    (e: ReactPointerEvent) => {
      if (e.pointerType === "mouse") return;
      if (revealed) return;
      e.preventDefault();
      reveal();
      scheduleHide();
    },
    [revealed, reveal, scheduleHide]
  );

  return (
    <div
      className="absolute right-0 top-0 z-30 flex h-14 w-14 items-center justify-center"
      onMouseEnter={onZoneEnter}
      onMouseLeave={onZoneLeave}
      onPointerDown={onZonePointerDown}
      aria-hidden={!revealed}
    >
      <button
        type="button"
        onClick={toggle}
        tabIndex={revealed ? 0 : -1}
        aria-label={muted ? "Activer le son" : "Couper le son"}
        aria-hidden={!revealed}
        className={`flex size-9 items-center justify-center rounded-full text-foreground/30 transition-[opacity,transform,color] duration-300 hover:bg-black/[0.04] hover:text-foreground/55 ${
          revealed
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {muted ? (
          <VolumeX className="size-3.5" strokeWidth={1.5} />
        ) : (
          <Volume2 className="size-3.5" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
