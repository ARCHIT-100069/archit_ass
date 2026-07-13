"use client";

const WHATSAPP_NUMBER = "918130973844"; // +91 81309 73844
const DEFAULT_MESSAGE = "Hi, I'd like to enquire about your products.";

export default function WhatsAppButton() {
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[60] flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
            <svg
                viewBox="0 0 32 32"
                className="w-7 h-7 fill-white"
                aria-hidden="true"
            >
                <path d="M16.001 0C7.164 0 0 7.163 0 16c0 2.822.738 5.586 2.14 8.018L0 32l8.203-2.126A15.93 15.93 0 0 0 16 32c8.836 0 16-7.163 16-16S24.837 0 16.001 0Zm0 29.09c-2.51 0-4.97-.673-7.117-1.947l-.511-.303-4.87 1.262 1.3-4.748-.332-.487A13.06 13.06 0 0 1 2.91 16C2.91 8.775 8.775 2.91 16 2.91S29.09 8.775 29.09 16 23.226 29.09 16 29.09Zm7.17-9.78c-.393-.197-2.325-1.147-2.686-1.278-.36-.132-.622-.197-.884.197-.262.393-1.015 1.278-1.245 1.54-.229.262-.458.295-.85.098-.393-.197-1.658-.611-3.158-1.949-1.167-1.041-1.955-2.328-2.184-2.72-.229-.394-.024-.607.172-.803.177-.176.393-.459.59-.688.196-.23.262-.394.393-.656.131-.263.065-.492-.033-.689-.098-.196-.884-2.13-1.211-2.918-.319-.767-.643-.664-.884-.676a17.06 17.06 0 0 0-.753-.014.966.966 0 0 0-.786.361c-.262.295-1.049.997-1.049 2.43 0 1.434 1.02 2.822 1.16 3.017.14.196 2.011 3.071 4.87 4.306.68.294 1.212.469 1.626.6.683.217 1.304.187 1.795.113.548-.082 1.658-.678 1.89-1.333.234-.656.234-1.219.164-1.334-.065-.114-.24-.196-.508-.328Z" />
            </svg>
        </a>
    );
}
