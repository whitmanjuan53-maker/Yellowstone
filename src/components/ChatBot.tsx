import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const quickReplies = [
  'Find available homes',
  'Schedule a tour',
  'Application process',
  'Rent prices',
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Hi there! 👋 Looking for a new home in Houston? I can help you find available units, schedule tours, or answer questions about our properties.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate response delay
    setTimeout(() => {
      const response = getResponse(text.trim());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const getResponse = (input: string): string => {
    const lower = input.toLowerCase();
    if (lower.includes('available') || lower.includes('home') || lower.includes('apartment') || lower.includes('unit')) {
      return 'We have over 2,500 homes available across Houston! You can browse all listings on our Properties page. What area are you interested in?';
    }
    if (lower.includes('tour') || lower.includes('visit') || lower.includes('see')) {
      return 'You can schedule a tour online! We offer both in-person and virtual tours. Most tours can be booked same-day or next-day.';
    }
    if (lower.includes('apply') || lower.includes('application')) {
      return 'Our online application takes about 15 minutes. You\'ll need ID, proof of income, and a small application fee. Most applications are processed within 24-48 hours.';
    }
    if (lower.includes('price') || lower.includes('rent') || lower.includes('cost') || lower.includes('how much')) {
      return 'Rent varies by location and size. Studios start around $1,200/month, 1-bedrooms from $1,500, and 2-bedrooms from $2,000. Browse specific properties for exact pricing.';
    }
    if (lower.includes('pet') || lower.includes('dog') || lower.includes('cat')) {
      return 'Many of our properties are pet-friendly! We typically allow up to 2 pets with a deposit. Breed restrictions may apply. Check individual property pages for details.';
    }
    if (lower.includes('maintenance') || lower.includes('repair')) {
      return 'Current residents can submit maintenance requests through the Resident Portal, or call our 24/7 maintenance hotline at (713) 555-1234.';
    }
    if (lower.includes('location') || lower.includes('area') || lower.includes('neighborhood')) {
      return 'We have properties across Houston including Downtown, Midtown, The Heights, Galleria, and Medical Center areas. Which area interests you most?';
    }
    return 'I\'d be happy to help with that! For the best assistance, you can also call us at (713) 555-1234 or browse our website for more details.';
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gold hover:bg-gold-light text-primary-blue rounded-full shadow-lg flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-40 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-primary-blue px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-primary-blue font-bold">Y</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Yellowstone Assistant</h3>
                  <p className="text-white/60 text-xs">Here to help you find home</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full" />
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                      message.isUser
                        ? 'bg-gold text-primary-blue rounded-br-sm'
                        : 'bg-white border border-gray-200 text-gray-700 rounded-bl-sm'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-gold" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-3 border-t border-gray-100 bg-white">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gold/20 hover:text-primary-blue rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about homes, tours, or applications..."
                  className="flex-1 px-4 py-2.5 bg-gray-100 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
                <Button
                  size="icon"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="bg-gold text-primary-blue hover:bg-gold-light rounded-full disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
