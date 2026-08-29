import React, { useState } from 'react';
import { 
  Flame, 
  Zap, 
  ShieldCheck, 
  Eye, 
  Headphones, 
  Gamepad2, 
  Gift, 
  Truck, 
  X, 
  Sparkles, 
  Check, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { CategoryId } from '../types';

interface StoryItem {
  id: string;
  title: string;
  tag: string;
  icon: any;
  color: string;
  borderColor: string;
  actionType: 'category' | 'coupon' | 'delivery' | 'ar';
  categoryTarget?: CategoryId;
  modalTitle: string;
  modalDescription: string;
  modalHighlights: string[];
  couponCode?: string;
}

interface MobileStoriesBarProps {
  onSelectCategory: (cat: CategoryId) => void;
  onOpenARInfo?: () => void;
  selectedCity: string;
  onApplyCoupon?: (code: string) => void;
}

export const MobileStoriesBar: React.FC<MobileStoriesBarProps> = ({
  onSelectCategory,
  onOpenARInfo,
  selectedCity,
  onApplyCoupon,
}) => {
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const stories: StoryItem[] = [
    {
      id: 'flash_sale',
      title: 'Flash Sale',
      tag: '🔥 40% OFF',
      icon: Flame,
      color: 'from-rose-500 to-amber-500',
      borderColor: 'border-rose-500',
      actionType: 'category',
      categoryTarget: 'all',
      modalTitle: '⚡ Super Flash Sale Live in ' + selectedCity,
      modalDescription: 'Exclusive limited-stock flash deals on flagships, OLED TVs, and RTX laptops with instant bank discounts.',
      modalHighlights: ['Up to 40% Instant Off', 'Pre-Approved 0% Downpayment EMI', 'Same-Day Dispatch'],
    },
    {
      id: '5g_deals',
      title: '5G Phones',
      tag: 'OnePlus 12',
      icon: Zap,
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500',
      actionType: 'category',
      categoryTarget: 'smartphones',
      modalTitle: '📱 5G Flagship Smartphones Collection',
      modalDescription: 'Explore Snapdragon 8 Gen 3 & A17 Pro flagships with official brand warranty & exchange bonus.',
      modalHighlights: ['₹5,000 Exchange Bonus on Old Phone', 'Free 1-Year Screen Protection', 'Doorstep Open-Box Delivery'],
    },
    {
      id: 'refurb_hub',
      title: 'Refurbished',
      tag: '🛡️ 1-Yr War.',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500',
      actionType: 'category',
      categoryTarget: 'refurbished',
      modalTitle: '🛡️ Certified Refurbished Electronics Hub',
      modalDescription: 'Grade-A devices inspected across 32 rigorous hardware points with 1-Year Pan-India Doorstep Warranty.',
      modalHighlights: ['32-Point Diagnostic Test Passed', '1-Year Full Replacement Warranty', 'Save up to 45% vs MRP'],
    },
    {
      id: 'ar_tryout',
      title: 'AR 3D Room',
      tag: 'Live View',
      icon: Eye,
      color: 'from-indigo-500 to-purple-600',
      borderColor: 'border-indigo-500',
      actionType: 'ar',
      modalTitle: '👁️ WebXR Augmented Reality Room Preview',
      modalDescription: 'Check whether a 65" OLED TV fits your living room wall or how a MacBook looks on your work desk in realistic 3D.',
      modalHighlights: ['1:1 Real Scale Dimensional Rendering', 'Works in Any Mobile Browser', 'No App Download Required'],
    },
    {
      id: 'anc_audio',
      title: 'ANC Audio',
      tag: 'Sony XM5',
      icon: Headphones,
      color: 'from-teal-500 to-emerald-600',
      borderColor: 'border-teal-500',
      actionType: 'category',
      categoryTarget: 'wearables',
      modalTitle: '🎧 High-Res Noise Cancelling Audio',
      modalDescription: 'Immerse in studio grade LDAC audio with Sony WH-1000XM5, Galaxy Buds2 Pro, and Apple AirPods Max.',
      modalHighlights: ['Active Noise Cancellation up to 40dB', 'Up to 30 Hours Battery', 'Hi-Res Certified Wireless'],
    },
    {
      id: 'gaming_vr',
      title: 'Gaming & VR',
      tag: 'PS5 Slim',
      icon: Gamepad2,
      color: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-500',
      actionType: 'category',
      categoryTarget: 'gaming',
      modalTitle: '🎮 Next-Gen Gaming Consoles & RTX GPUs',
      modalDescription: 'Experience 4K 120FPS ray-traced gaming with PlayStation 5 Slim, ASUS ROG Strix, and Xbox Series X.',
      modalHighlights: ['Zero Latency 120Hz Support', 'DualSense Haptic Feedback', 'Official India Sealed Stocks'],
    },
    {
      id: 'coupon_500',
      title: '₹500 Coupon',
      tag: 'CIRCUITFIRST',
      icon: Gift,
      color: 'from-amber-400 to-orange-500',
      borderColor: 'border-amber-400',
      actionType: 'coupon',
      couponCode: 'CIRCUITFIRST',
      modalTitle: '🎁 ₹500 Welcome Discount Code',
      modalDescription: 'Use coupon code CIRCUITFIRST at checkout to get flat ₹500 off on any electronics order above ₹10,000.',
      modalHighlights: ['Valid on All Products & Refurbished', 'Can combine with No Cost EMI', 'Instant Cart Discount'],
    },
    {
      id: 'fast_delivery',
      title: '2-Day Express',
      tag: selectedCity,
      icon: Truck,
      color: 'from-blue-500 to-indigo-600',
      borderColor: 'border-blue-500',
      actionType: 'delivery',
      modalTitle: `🚚 Express 2-Day Delivery in ${selectedCity}`,
      modalDescription: `CircuitBazaar operates dedicated regional logistics hubs for Tier-2 cities like ${selectedCity}, ensuring verified safe delivery with live GPS tracking.`,
      modalHighlights: ['Doorstep Open-Box Inspection', 'Zero Damage Transit Guarantee', 'Cash/UPI on Delivery Supported'],
    },
  ];

  const handleStoryClick = (story: StoryItem) => {
    setActiveStory(story);
    setCopiedCoupon(false);
  };

  const handleCopyCoupon = (code?: string) => {
    if (!code) return;
    navigator.clipboard?.writeText(code);
    if (onApplyCoupon) onApplyCoupon(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 3000);
  };

  return (
    <div className="w-full">
      {/* Mobile Stories Scroll Strip */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none px-1 overscroll-x-contain touch-pan-x">
        {stories.map((story) => {
          const Icon = story.icon;
          return (
            <button
              key={story.id}
              onClick={() => handleStoryClick(story)}
              className="flex flex-col items-center space-y-1.5 flex-shrink-0 group focus:outline-none"
              id={`story-btn-${story.id}`}
            >
              {/* Glowing Story Ring */}
              <div className={`p-[2.5px] rounded-full bg-gradient-to-tr ${story.color} group-active:scale-95 transition-transform shadow-md`}>
                <div className="w-14 h-14 rounded-full bg-slate-950 p-1 flex items-center justify-center relative overflow-hidden">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${story.color} opacity-20 absolute inset-0`} />
                  <Icon className="w-6 h-6 text-white relative z-10 drop-shadow" />
                </div>
              </div>

              {/* Title & Tag */}
              <span className="text-[11px] font-bold text-slate-200 tracking-tight leading-tight truncate max-w-[68px] text-center">
                {story.title}
              </span>
              <span className="text-[9px] font-semibold text-cyan-300 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20 truncate max-w-[68px]">
                {story.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Story Detail Pop-Up Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl space-y-4 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${activeStory.color} flex items-center justify-center text-white shadow-lg`}>
                  {React.createElement(activeStory.icon, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white font-['Space_Grotesk'] leading-snug">
                    {activeStory.modalTitle}
                  </h4>
                  <span className="text-[10px] text-cyan-400 font-bold">{activeStory.tag}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveStory(null)}
                className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeStory.modalDescription}
            </p>

            {/* Highlights bullet points */}
            <div className="bg-slate-950/70 rounded-2xl p-3 border border-slate-800 space-y-2">
              {activeStory.modalHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-slate-200">
                  <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Coupon Code specific box if applicable */}
            {activeStory.couponCode && (
              <div className="p-3 bg-gradient-to-r from-amber-950/50 to-orange-950/40 border border-amber-500/40 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-amber-300 font-medium">Coupon Code</div>
                  <div className="text-sm font-black text-white font-mono tracking-wider">{activeStory.couponCode}</div>
                </div>
                <button
                  onClick={() => handleCopyCoupon(activeStory.couponCode)}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow transition-all"
                >
                  {copiedCoupon ? 'Copied & Applied! ✓' : 'Copy Code'}
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 pt-1">
              {activeStory.categoryTarget ? (
                <button
                  onClick={() => {
                    onSelectCategory(activeStory.categoryTarget!);
                    setActiveStory(null);
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs py-3 rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-1.5"
                >
                  <span>Explore {activeStory.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveStory(null)}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-3 rounded-xl"
                >
                  Got it!
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
