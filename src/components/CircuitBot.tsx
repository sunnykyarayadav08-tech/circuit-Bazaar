import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  ShoppingBag, 
  Eye, 
  ChevronRight, 
  RotateCcw, 
  Check, 
  HelpCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { ChatMessage, Product } from '../types';
import { formatINR } from '../utils/formatters';

interface CircuitBotProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenARTryOut: (product: Product) => void;
  selectedCity: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CircuitBot: React.FC<CircuitBotProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onOpenARTryOut,
  selectedCity,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: `Namaste! 🙏 I am CircuitBot, your personal Indian Electronics & Tech Advisor. Looking for the best smartphone under ₹25,000, 4K OLED TV sizing, or certified refurbished deals for ${selectedCity}? How can I assist your setup today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedQueries: [
        'Top 5G phone under ₹25,000',
        'Compare 55" OLED vs QLED TV',
        'Refurbished iPhone warranty details',
        'Best gaming gear with 0% EMI',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedProductIds, setAddedProductIds] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory: messages.map((m) => ({ sender: m.sender, text: m.text })),
          userCity: selectedCity,
        }),
      });

      const data = await response.json();

      // Find matching products from local catalog
      let matchedProducts: Product[] = [];
      if (data.recommendedProductIds && Array.isArray(data.recommendedProductIds)) {
        matchedProducts = products.filter((p) => data.recommendedProductIds.includes(p.id));
      }

      // If none matched from IDs, do a fallback keyword search
      if (matchedProducts.length === 0) {
        const lowerQ = query.toLowerCase();
        matchedProducts = products.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerQ) ||
            p.category.toLowerCase().includes(lowerQ) ||
            p.brand.toLowerCase().includes(lowerQ) ||
            (p.isRefurbished && lowerQ.includes('refurb'))
        ).slice(0, 2);
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || "Here are the top electronics recommendations based on your preferences:",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProducts: matchedProducts,
        suggestedQueries: data.suggestedFollowUps || ['Show 0% EMI options', 'How to test in AR?'],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      // Friendly fallback
      const fallbackBotMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Based on current electronics trends in ${selectedCity}, here are our highest-rated recommendations with 100% genuine warranty and 0% No Cost EMI:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProducts: products.slice(0, 2),
        suggestedQueries: ['Show smartphone deals', 'Explore 4K TVs'],
      };
      setMessages((prev) => [...prev, fallbackBotMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAddToCart = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    onAddToCart(p);
    setAddedProductIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedProductIds((prev) => ({ ...prev, [p.id]: false }));
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md h-[580px] max-h-[85vh] flex flex-col bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md animate-fadeIn">
      
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-850 to-cyan-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-sm font-['Space_Grotesk']">CircuitBot AI</h3>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Electronics Expert for {selectedCity}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 transition-colors"
          id="close-circuitbot-btn"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none'
              }`}
            >
              <div>{msg.text}</div>

              {/* Product Suggestion Cards inside Chat */}
              {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                    Recommended Gadgets:
                  </div>
                  {msg.suggestedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => onSelectProduct(prod)}
                      className="bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 rounded-xl p-2.5 flex items-center space-x-3 cursor-pointer transition-all hover:bg-slate-850"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-800 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-white text-[11px] truncate">
                          {prod.name}
                        </h5>
                        <div className="flex items-center space-x-2 text-[10px]">
                          <span className="font-black text-cyan-300 font-['Space_Grotesk']">
                            {formatINR(prod.price)}
                          </span>
                          <span className="text-emerald-400 font-semibold">
                            {prod.discountPercent}% OFF
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(e, prod)}
                        className={`p-1.5 rounded-lg text-[10px] font-bold transition-all ${
                          addedProductIds[prod.id]
                            ? 'bg-emerald-600 text-white'
                            : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                        }`}
                        title="Add to Cart"
                      >
                        {addedProductIds[prod.id] ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggested Follow-Up Chips */}
              {msg.suggestedQueries && msg.suggestedQueries.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {msg.suggestedQueries.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-[10px] bg-slate-900/90 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 px-2.5 py-1 rounded-full transition-colors text-left"
                    >
                      💡 {q}
                    </button>
                  ))}
                </div>
              )}

              <div className="text-[9px] text-right opacity-60">
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl rounded-tl-none p-3 text-xs text-cyan-400 flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Indian gadget specs & deals...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask specs, budget recommendations, or comparisons..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-500"
          id="circuitbot-input"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-slate-950 rounded-xl font-bold transition-all shadow-md"
          id="circuitbot-send-btn"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
