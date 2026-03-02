"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Spinning saw blade SVG
function Blade({ size = 44 }: { size?: number }) {
  const teeth = 16;
  const cx = size / 2;
  const r1 = size * 0.34;
  const r2 = size * 0.50;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.16, ease: "linear", repeat: Infinity }}
      style={{ display: "block", flexShrink: 0 }}
    >
      {Array.from({ length: teeth }).map((_, i) => {
        const a1 = ((i - 0.38) / teeth) * Math.PI * 2;
        const a2 = ((i + 0.38) / teeth) * Math.PI * 2;
        const tip = (i / teeth) * Math.PI * 2;
        return (
          <polygon
            key={i}
            points={[
              `${cx + r1 * Math.cos(a1)},${cx + r1 * Math.sin(a1)}`,
              `${cx + r2 * Math.cos(tip)},${cx + r2 * Math.sin(tip)}`,
              `${cx + r1 * Math.cos(a2)},${cx + r1 * Math.sin(a2)}`,
            ].join(" ")}
            fill="#f59e0b"
          />
        );
      })}
      <circle cx={cx} cy={cx} r={r1} fill="#f59e0b" />
      <circle cx={cx} cy={cx} r={size * 0.09} fill="#14261a" />
    </motion.svg>
  );
}

// Logo is portrait ~600x840. We display it at 280px wide.
// The gold I/C/E letters occupy the left ~24% of the image width.
// The cut falls in the gap between them and the black text — at ~27%.
// We render the logo at natural proportions: 280 wide × 394 tall (280 * 840/600)
const LOGO_W = 280;
const LOGO_H = Math.round(LOGO_W * (841 / 595)); // ~396px tall

// Cut position as % of logo width — sits in the gap between gold ICE and black text
const CUT_PCT = 27;

export default function Preloader() {
  const [phase, setPhase] = useState<"idle" | "cutting" | "split" | "fade">("idle");
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Blade starts cutting immediately on mount
    const t1 = setTimeout(() => setPhase("cutting"), 50);
    // Blade finishes (~1.4s travel) -> right side falls
    const t2 = setTimeout(() => setPhase("split"), 1550);
    // Right side gone -> left side + overlay fades out
    const t3 = setTimeout(() => setPhase("fade"), 2350);
    // All done -> unmount
    const t4 = setTimeout(() => setMounted(false), 3100);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, []);

  if (!mounted) return null;

  const bladeMoving = phase === "cutting" || phase === "split" || phase === "fade";
  const splitNow = phase === "split" || phase === "fade";
  const fadeNow = phase === "fade";

  // CUT_PCT of LOGO_W gives us the pixel x-offset for the blade
  const cutPx = Math.round(LOGO_W * (CUT_PCT / 100));

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className="fixed inset-0 z-[200] bg-forest-900 flex items-center justify-center overflow-hidden pointer-events-none"
          animate={fadeNow ? { opacity: 0 } : { opacity: 1 }}
          transition={fadeNow ? { duration: 0.6, delay: 0.3 } : { duration: 0 }}
        >
          {/* Logo container — matches the logo's natural portrait aspect ratio */}
          <div
            className="relative"
            style={{ width: LOGO_W, height: LOGO_H }}
          >
            {/* LEFT HALF — the gold ICE letters — stays until full fade */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 ${100 - CUT_PCT}% 0 0)`,
              }}
            >
              <Image
                src="/images/logo/logo-full.png"
                alt="Indian Creek Exchange"
                width={LOGO_W}
                height={LOGO_H}
                className="object-fill"
                priority
              />
            </div>

            {/* RIGHT HALF — "ndian / reek / xchange" text — falls away */}
            <motion.div
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 0 0 ${CUT_PCT}%)`,
              }}
              animate={splitNow ? { y: "70vh", opacity: 0 } : { y: 0, opacity: 1 }}
              transition={
                splitNow
                  ? { duration: 0.8, ease: [0.55, 0, 1, 0.45] }
                  : { duration: 0 }
              }
            >
              <Image
                src="/images/logo/logo-full.png"
                alt=""
                width={LOGO_W}
                height={LOGO_H}
                className="object-fill"
                aria-hidden
                priority
              />
            </motion.div>

            {/* SAW BLADE — travels top to bottom along the cut line */}
            {bladeMoving && (
              <div
                className="absolute pointer-events-none"
                style={{
                  left: cutPx,
                  top: 0,
                  bottom: 0,
                  transform: "translateX(-50%)",
                  width: 44,
                }}
              >
                {/* Amber kerf line grows downward as blade passes */}
                <motion.div
                  className="absolute left-1/2 -translate-x-px w-[2px] bg-amber-400/70 top-0"
                  initial={{ height: "0%" }}
                  animate={
                    phase === "cutting"
                      ? { height: "100%" }
                      : { height: "100%", opacity: 0 }
                  }
                  transition={
                    phase === "cutting"
                      ? { duration: 1.3, ease: "easeInOut" }
                      : { duration: 0.25 }
                  }
                />

                {/* Blade travels from -10% to 110% of logo height */}
                <motion.div
                  className="absolute left-1/2"
                  style={{ translateX: "-50%", translateY: "-50%" }}
                  initial={{ top: "-5%" }}
                  animate={
                    phase === "cutting" ? { top: "105%" } : { top: "105%" }
                  }
                  transition={
                    phase === "cutting"
                      ? { duration: 1.3, ease: "easeInOut" }
                      : { duration: 0 }
                  }
                >
                  {/* Sawdust glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-amber-400/30 blur-xl" />
                  <Blade size={44} />
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
