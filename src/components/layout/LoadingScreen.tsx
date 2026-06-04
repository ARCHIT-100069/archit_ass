"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Keep loader visible for 2.5 seconds as requested
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative w-32 h-32 md:w-48 md:h-48"
                    >
                        {/* 
              Using a placeholder or expecting logo.png 
              User needs to upload logo.png to public folder 
            */}
                        <Image
                            src="https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/customer-logos/ARCHIT_ASS_LOGO.jpg"
                            alt="Archit Associates"
                            width={120}
                            height={40}
                            className="h-[40px] w-auto object-contain"
                            priority
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
