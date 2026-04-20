"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { FormInput, FormTextarea } from "@/components/ui/FormFields";

export default function ContactFormClient() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setTimeout(() => {
            setStatus("success");
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
            >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 mb-4">
                    <Send className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-1 tracking-[-0.02em]">Message Sent!</h3>
                <p className="text-neutral-900/55 text-[15px]">We'll get back to you shortly.</p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-7">
            <FormInput label="Name" name="name" placeholder="Your Name" required />
            <FormInput label="Email" name="email" type="email" placeholder="your@email.com" required />
            <FormInput label="Subject" name="subject" placeholder="Inquiry about..." required />
            <FormTextarea label="Message" name="message" placeholder="How can we help you?" rows={4} required />

            <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full h-14 bg-black text-white font-medium uppercase tracking-wide rounded-xl hover:bg-neutral-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
}
