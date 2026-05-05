"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { FormInput, FormTextarea } from "@/components/ui/FormFields";

export default function ContactFormClient() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setStatus("success");
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                alert("Failed to send message. Please try again later.");
                setStatus("idle");
            }
        } catch (error) {
            alert("Failed to send message. Please check your connection.");
            setStatus("idle");
        }
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
