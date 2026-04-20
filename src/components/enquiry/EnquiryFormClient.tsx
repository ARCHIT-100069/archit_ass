"use client";

import { useState } from "react";
import { Send, FileCheck } from "lucide-react";
import { motion } from "framer-motion";
import { FormInput, FormTextarea, FormSelect, FormFile } from "@/components/ui/FormFields";
import { productCatalog } from "@/data/productCatalog";

const projectTypes = [
    { value: "railway", label: "Railway" },
    { value: "psc-plant", label: "PSC Plant" },
    { value: "laboratory", label: "Laboratory" },
    { value: "industrial", label: "Industrial" },
    { value: "other", label: "Other" },
];

const categoryOptions = productCatalog.map((cat) => ({
    value: cat.id,
    label: cat.title,
}));

export default function EnquiryFormClient() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setTimeout(() => {
            setStatus("success");
        }, 1800);
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
            >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6">
                    <FileCheck className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-2 tracking-[-0.02em]">Quotation Request Submitted!</h2>
                <p className="text-neutral-900/55 max-w-md mx-auto text-[15px] leading-[1.65]">
                    Thank you for your interest. Our team will review your requirements and respond within 24–48 business hours.
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-14">
            {/* Section 1: Contact Details */}
            <section>
                <div className="mb-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                        Contact Details
                    </span>
                    <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] mt-1">Your Information</h2>
                    <div className="w-10 h-px bg-neutral-300 mt-3" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                    <FormInput label="Full Name" name="fullName" placeholder="Your full name" required />
                    <FormInput label="Company Name" name="companyName" placeholder="Company / Organization" required />
                    <FormInput label="Email" name="email" type="email" placeholder="name@company.com" required />
                    <FormInput label="Phone Number" name="phone" type="tel" placeholder="+91..." required />
                    <FormInput label="GST Number (Optional)" name="gstNumber" placeholder="e.g. 07AABCU9603R1ZP" />
                </div>
            </section>

            {/* Section 2: Product Information */}
            <section>
                <div className="mb-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                        Product Information
                    </span>
                    <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] mt-1">What Are You Looking For?</h2>
                    <div className="w-10 h-px bg-neutral-300 mt-3" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                    <FormSelect
                        label="Product Category"
                        name="productCategory"
                        options={categoryOptions}
                        placeholder="Select a category"
                        required
                    />
                    <FormInput label="Product / Equipment Name" name="productName" placeholder="e.g. Toe Gap Gauge, CBR Machine" required />
                    <FormInput label="Quantity Required" name="quantity" type="number" placeholder="Enter quantity" required />
                    <FormInput label="Required Delivery Location" name="deliveryLocation" placeholder="City / Site name" required />
                    <FormSelect
                        label="Project Type"
                        name="projectType"
                        options={projectTypes}
                        placeholder="Select project type"
                        required
                    />
                </div>
            </section>

            {/* Section 3: Additional Details */}
            <section>
                <div className="mb-6">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                        Additional Requirements
                    </span>
                    <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] mt-1">Tell Us More</h2>
                    <div className="w-10 h-px bg-neutral-300 mt-3" />
                </div>
                <div className="space-y-7">
                    <FormTextarea
                        label="Detailed Requirement Description"
                        name="requirementDescription"
                        placeholder="Describe your specific requirements, specifications, or any reference standards..."
                        rows={5}
                    />
                    <FormFile
                        label="Upload Attachment — PDF / Drawing / BOQ (Optional)"
                        name="attachment"
                        accept=".pdf,.doc,.docx,.dwg,.xlsx,.jpg,.png"
                    />
                </div>
            </section>

            {/* Submit */}
            <div className="pt-2">
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full h-14 bg-black text-white font-medium uppercase tracking-wide rounded-xl hover:bg-neutral-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2 cursor-pointer"
                >
                    {status === "submitting" ? (
                        "Submitting..."
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Request Quotation
                        </>
                    )}
                </button>
                <p className="text-[14px] text-neutral-900/50 mt-4 text-center">
                    Our team typically responds within 24–48 business hours.
                </p>
            </div>
        </form>
    );
}
