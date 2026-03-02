"use client";

import { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How far it pulls
}

export default function MagneticButton({
    children,
    className = "",
    strength = 30, // Default 30px pull radius
    ...props
}: MagneticButtonProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!wrapperRef.current) return;

        // Get mouse position relative to the element center
        const { clientX, clientY } = e;
        const { height, width, left, top } = wrapperRef.current.getBoundingClientRect();

        // Calculate distance from center (-0.5 to 0.5)
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Apply strength multiplier
        setPosition({
            x: middleX * (strength / 100),
            y: middleY * (strength / 100)
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 }); // Snap back to center
    };

    return (
        <motion.div
            ref={wrapperRef}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-flex ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}
