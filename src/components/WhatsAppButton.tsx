import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '@/data/tourData';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

export function WhatsAppButton({ message, className = '' }: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message || WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5C] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${className}`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="hidden sm:inline font-medium">Chat with us</span>
    </a>
  );
}

export function getWhatsAppLink(customMessage: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(customMessage)}`;
}
