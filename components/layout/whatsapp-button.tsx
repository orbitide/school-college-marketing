import { MessageCircle } from "lucide-react";

const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

export function WhatsAppButton() {
  if (!number) return null;
  const text = encodeURIComponent("Hello, I would like to know more about your school management system.");

  return (
    <a
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex size-12 items-center justify-center rounded-full bg-[#1f7a4a] text-white outline-none transition-colors hover:bg-[#186a3f] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}
