"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
    id: string;
    name: string;
    shortDescription: string;
    specifications: string[];
}

interface EnquiryFormProps {
    product: Product;
    onClose: () => void;
}

export default function EnquiryForm({ product, onClose }: EnquiryFormProps) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        // Simulate network request
        setTimeout(() => {
            setStatus("success");
            setTimeout(() => {
                onClose();
                setStatus("idle");
            }, 2000);
        }, 1500);
    };

    if (status === "success") {
        return (
            <div className="text-center py-12">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-50 text-green-800 p-4 rounded-full inline-block mb-4"
                >
                    <Send className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold">Enquiry Sent!</h3>
                <p className="text-neutral-500 mt-2">We will get back to you shortly.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase mb-1">Name</label>
                <input required type="text" className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent" placeholder="Your Name" />
            </div>

            <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase mb-1">Company</label>
                <input type="text" className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent" placeholder="Company Name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-neutral-500 uppercase mb-1">Phone</label>
                    <input required type="tel" className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent" placeholder="+91..." />
                </div>
                <div>
                    <label className="block text-xs font-medium text-neutral-500 uppercase mb-1">Email</label>
                    <input required type="email" className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent" placeholder="name@company.com" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-neutral-500 uppercase mb-1">Product</label>
                    <input type="text" disabled value={product.name} className="w-full border-b border-neutral-300 py-2 bg-neutral-50 text-neutral-500 cursor-not-allowed" />
                </div>
                <div>
                    <label className="block text-xs font-medium text-neutral-500 uppercase mb-1">Quantity</label>
                    <input type="number" min="1" className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent" placeholder="Qty" />
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-neutral-500 uppercase mb-1">Message</label>
                <textarea rows={3} className="w-full border border-neutral-200 p-3 rounded-sm focus:outline-none focus:border-black transition-colors bg-neutral-50 resize-none text-sm" placeholder="Additional details..." />
            </div>

            <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-black text-white py-4 font-medium uppercase tracking-wide hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
                {status === "submitting" ? "Sending..." : "Send Enquiry"}
            </button>
        </form>
    );
}
