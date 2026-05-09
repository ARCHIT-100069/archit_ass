"use client";

import { useState, useRef, useEffect } from "react";

interface FormInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    value?: string;
}

export function FormInput({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    disabled = false,
    value,
}: FormInputProps) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.12em] mb-2"
            >
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                defaultValue={value}
                className="w-full h-12 border border-neutral-200 rounded-lg px-4 bg-white text-[15px] focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-neutral-400 transition-all placeholder:text-neutral-400 disabled:text-neutral-400 disabled:cursor-not-allowed"
            />
        </div>
    );
}

interface FormTextareaProps {
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
}

export function FormTextarea({
    label,
    name,
    placeholder,
    required = false,
    rows = 4,
}: FormTextareaProps) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.12em] mb-2"
            >
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            <textarea
                id={name}
                name={name}
                rows={rows}
                placeholder={placeholder}
                required={required}
                className="w-full border border-neutral-200 rounded-lg p-4 bg-white text-[15px] resize-none focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-neutral-400 transition-all placeholder:text-neutral-400"
            />
        </div>
    );
}

interface FormSelectProps {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    required?: boolean;
}

export function FormSelect({
    label,
    name,
    options,
    placeholder = "Select...",
    required = false,
}: FormSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = options.find((opt) => opt.value === selected)?.label;

    return (
        <div>
            <label
                htmlFor={name}
                className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.12em] mb-2"
            >
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>

            {/* Hidden native select for form submission */}
            <select
                id={name}
                name={name}
                required={required}
                value={selected}
                onChange={() => {}}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

            {/* Custom dropdown */}
            <div ref={dropdownRef} className="relative">
                {/* Trigger button */}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev: boolean) => !prev)}
                    className="w-full h-12 flex items-center justify-between px-4 bg-white border border-neutral-200 rounded-lg text-[15px] cursor-pointer focus:outline-none focus:ring-1 focus:ring-black/20 focus:border-neutral-400 transition-all"
                >
                    <span className={selected ? "text-[#111827]" : "text-neutral-400"}>
                        {selectedLabel || placeholder}
                    </span>
                    <svg
                        className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown panel */}
                {isOpen && (
                    <div
                        className="absolute z-50 mt-1 w-full overflow-hidden"
                        style={{
                            background: '#ffffff',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                            borderRadius: '10px',
                        }}
                    >
                        <div 
                            className="max-h-[300px] overflow-y-auto py-1 overscroll-contain"
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            {options.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                        setSelected(opt.value);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left cursor-pointer"
                                    style={{
                                        padding: '12px 16px',
                                        fontSize: '15px',
                                        fontWeight: 500,
                                        color: selected === opt.value ? '#000000' : '#111827',
                                        background: selected === opt.value ? '#f3f4f6' : 'transparent',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#f3f4f6';
                                        e.currentTarget.style.color = '#000000';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = selected === opt.value ? '#f3f4f6' : 'transparent';
                                        e.currentTarget.style.color = selected === opt.value ? '#000000' : '#111827';
                                    }}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

interface FormFileProps {
    label: string;
    name: string;
    accept?: string;
    required?: boolean;
}

export function FormFile({
    label,
    name,
    accept = ".pdf,.doc,.docx,.dwg,.xlsx,.jpg,.png",
    required = false,
}: FormFileProps) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.12em] mb-2"
            >
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            <input
                id={name}
                name={name}
                type="file"
                accept={accept}
                required={required}
                className="w-full text-sm text-neutral-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border file:border-neutral-200 file:text-xs file:font-medium file:uppercase file:tracking-wider file:bg-white file:text-neutral-700 hover:file:bg-neutral-50 file:cursor-pointer file:transition-colors cursor-pointer"
            />
        </div>
    );
}
