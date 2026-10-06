import { MessageCircle } from "lucide-react";

const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

export function WhatsAppButton() {
  if (!number) return null;
  const text = encodeURIComponent("Hi, I'd like to know more about your school management system.");

  return (
    <a
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg outline-none transition-transform hover:scale-105 focus-visible:ring-[3px] focus-visible:ring-[#25D366]/50"
    >
      <MessageCircle className="size-7" aria-hidden />
    </a>
  );
}
