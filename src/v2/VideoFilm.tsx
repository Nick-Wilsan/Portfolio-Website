import { motion, useInView, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";

// A rendered product video (made in Remotion) in a framed panel with
// story-style chapter controls. Loops muted while on screen (browsers only
// autoplay silent video), with a sound button to unmute; pauses off screen,
// and waits for a click when the viewer prefers reduced motion.
//
// `chapters` mark where each part of the video starts (seconds), so the
// segments can show progress and jump around.

export type Chapter = { caption: string; start: number };

const ctrlClass =
  "shrink-0 w-9 h-9 rounded-full bg-[var(--film-btn)] border border-[var(--film-edge)] grid place-items-center hover:opacity-75 transition-opacity";

type Props = {
  label: string;
  mp4: string;
  webm?: string;
  poster: string;
  chapters: Chapter[];
  // Brand-colored surface around the video (like a cover), with the ink color
  // that reads on it. Without it the panel uses the page's own surface.
  mat?: { bg: string; ink: string };
};

export default function VideoFilm({ label, mp4, webm, poster, chapters, mat }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(frameRef, { margin: "-15% 0px" });
  const [wantsPlay, setWantsPlay] = useState(!reduce);
  const [index, setIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const progress = useMotionValue(0);

  const chapterEnd = (i: number) => (i + 1 < chapters.length ? chapters[i + 1].start : duration);
  const chapterAt = (t: number) => {
    let i = 0;
    while (i + 1 < chapters.length && t >= chapters[i + 1].start) i++;
    return i;
  };

  // Metadata can arrive before React attaches onLoadedMetadata (cached file).
  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 1 && v.duration) setDuration(v.duration);
  }, []);

  // Play only while visible and wanted.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Only a real autoplay refusal turns autoplay off; an AbortError just means
    // a pause() (e.g. scrolled away) interrupted this play().
    if (inView && wantsPlay)
      v.play().catch((e: DOMException) => e.name === "NotAllowedError" && setWantsPlay(false));
    else v.pause();
  }, [inView, wantsPlay]);

  // Drive the segment bars from the video clock.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !duration) return;
    let raf: number;
    const tick = () => {
      const i = chapterAt(v.currentTime);
      setIndex((prev) => (prev === i ? prev : i));
      const start = chapters[i].start;
      progress.set(Math.min((v.currentTime - start) / Math.max(chapterEnd(i) - start, 0.001), 1));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, chapters, progress]);

  const jump = (i: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = chapters[i].start;
    setIndex(i);
    progress.set(0);
  };

  const fullscreen = () => {
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else v.webkitEnterFullscreen?.(); // iOS Safari
  };

  // The button follows what the video is really doing, not what we asked for
  // (autoplay can be refused by the browser or battery saver).
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      setWantsPlay(false);
    } else {
      setWantsPlay(true);
      v.play().catch(() => {}); // direct call keeps the user gesture
    }
  };

  // Starts muted so autoplay is allowed. Mirrors the element's own state, so
  // toggling sound in the browser's fullscreen controls keeps the icon right.
  const [muted, setMuted] = useState(true);
  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    // Turning sound on for a paused video means "play it with sound"
    if (!v.muted && v.paused) {
      setWantsPlay(true);
      v.play().catch(() => {});
    }
  };

  // Panel colors as local variables, so the plain and branded panel share markup.
  const panel = (
    mat
      ? { "--film-bg": mat.bg, "--film-ink": mat.ink, "--film-btn": "rgba(0,0,0,0.16)", "--film-edge": "transparent", "--film-track": "rgba(0,0,0,0.22)", "--film-fill": mat.ink }
      : { "--film-bg": "var(--surface)", "--film-ink": "var(--ink)", "--film-btn": "var(--raised)", "--film-edge": "var(--line)", "--film-track": "var(--line)", "--film-fill": "var(--accent)" }
  ) as CSSProperties;

  return (
    <div style={panel} className="rounded-[1.75rem] border border-[var(--film-edge)] [background:var(--film-bg)] p-2 md:p-3 text-[var(--film-ink)]">
      <div ref={frameRef} className="relative w-full aspect-video overflow-hidden rounded-[1.25rem] bg-[#070908]">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${label} product video`}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>
      </div>

      {/* Controls: story-style chapter segments, caption, play/pause, sound, fullscreen */}
      <div className="flex items-center gap-4 px-2 pt-3 pb-1">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
          className={ctrlClass}
        >
          {playing ? <Pause size={14} strokeWidth={2.25} /> : <Play size={14} strokeWidth={2.25} />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex gap-1.5">
            {chapters.map((c, i) => (
              <button
                key={c.caption}
                onClick={() => jump(i)}
                aria-label={`Go to ${c.caption}`}
                className="flex-1 py-3"
              >
                <span className="block h-[3px] rounded-full bg-[var(--film-track)] overflow-hidden">
                  <motion.span
                    className="block h-full bg-[var(--film-fill)] origin-left"
                    style={i === index ? { scaleX: progress } : { scaleX: i < index ? 1 : 0 }}
                  />
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs truncate">
            <span className="font-semibold">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-2 opacity-60">/</span>
            <span className="opacity-90">{chapters[index].caption}</span>
          </p>
        </div>
        <button
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!muted}
          className={ctrlClass}
        >
          {muted ? <VolumeX size={14} strokeWidth={2.25} /> : <Volume2 size={14} strokeWidth={2.25} />}
        </button>
        <button
          onClick={fullscreen}
          aria-label="Watch full screen"
          className={ctrlClass}
        >
          <Maximize size={14} strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
