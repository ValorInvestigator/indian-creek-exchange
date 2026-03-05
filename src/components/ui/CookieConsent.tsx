"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user already consented
        const hasConsented = localStorage.getItem("cookieConsent");
        if (!hasConsented) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-forest-900 border-t border-forest-800 text-white p-4 z-50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
            <div className="text-sm text-forest-200">
                <p>
                    We use cookies to improve your experience and analyze site traffic. By continuing to use our site, you agree to our{' '}
                    <Link href="/privacy" className="underline text-white hover:text-amber-400 transition-colors">Privacy Policy</Link> and{' '}
                    <Link href="/terms" className="underline text-white hover:text-amber-400 transition-colors">Terms of Service</Link>.
                </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
                <button
                    onClick={handleAccept}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-colors text-sm"
                >
                    Accept
                </button>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-forest-400 hover:text-white transition-colors p-1"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
            </div>
        </div>
    );
}
