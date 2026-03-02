"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [hoverType, setHoverType] = useState<"default" | "magnify" | "pointer">("default");

    useEffect(() => {
        // Hide default cursor globally
        document.body.style.cursor = "none";

        // Track mouse movement
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        // Detect interaction with clickable/hoverable elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check if we're hovering over a link, button, or specific interactive areas
            const isClickable = target.closest("a") || target.closest("button");

            // Specifically check if we are over a product image gallery (for the magnify effect)
            const isGalleryImage = target.closest("[data-gallery-image='true']");

            if (isGalleryImage) {
                setIsHovering(true);
                setHoverType("magnify");
            } else if (isClickable) {
                setIsHovering(true);
                setHoverType("pointer");
            } else {
                setIsHovering(false);
                setHoverType("default");
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            document.body.style.cursor = "auto";
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    // Define the variants for the cursor animation states
    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            height: 16,
            width: 16,
            backgroundColor: "rgba(251, 191, 36, 1)", // Amber 500
            mixBlendMode: "difference" as const, // Inverts colors dynamically over backgrounds
        },
        pointer: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            height: 48,
            width: 48,
            backgroundColor: "rgba(251, 191, 36, 0.4)",
            mixBlendMode: "normal" as const,
        },
        magnify: {
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            height: 80,
            width: 80,
            backgroundColor: "transparent",
            border: "2px solid white",
            backdropFilter: "blur(2px)",
            mixBlendMode: "normal" as const,
        }
    };

    // Only render on client to prevent hydration mismatch for mouse coordinates
    if (typeof window === "undefined") return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center font-bold text-white text-[10px] tracking-widest uppercase"
                variants={variants}
                animate={hoverType}
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 40,
                    mass: 0.5
                }}
            >
                {hoverType === "magnify" && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </motion.span>
                )}
            </motion.div>

            {/* Tiny inner dot for core tracking */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    opacity: hoverType === "default" ? 1 : 0
                }}
                transition={{ type: "tween", duration: 0 }}
            />
        </>
    );
}
