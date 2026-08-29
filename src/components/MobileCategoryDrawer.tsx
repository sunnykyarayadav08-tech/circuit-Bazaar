import React from 'react';
import { 
  X, 
  Smartphone, 
  Laptop, 
  Tv, 
  Gamepad2, 
  Headphones, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Truck, 
  Gift, 
  RotateCcw, 
  ChevronRight, 
  Flame,
  User,
  LogIn,
  LogOut,
  MapPin,
  Heart
} from 'lucide-react';
import { CategoryId, UserAccount } from '../types';

interface MobileCategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  currentUser: UserAccount | null;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
  selectedCity: string;
  onOpenCitySelector: () => void;
  onOpenOrders: () => void;
  onOpenWishlist: () => void;
  onOpenAIAdvisor: () => void;
}

export const MobileCategoryDrawer: React.FC<MobileCategoryDrawerProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  currentUser,
  onOpenAuthModal,
  onSignOut,
  selectedCity,
  onOpenCitySelector,
  onOpenOrders,
  onOpenWishlist,
  onOpenAIAdvisor,
}) => {
  if (!isOpen) return null;

  const categories = [
    {
      id: 'all' as CategoryId,
      label: 'All Electronics',
      subtitle: 'Complete Catalog & Deals',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      tag: 'Full Store',
    },
    {
      id: 'smartphones' as CategoryId,
      label: 'Smartphones & 5G',
      subtitle: 'OnePlus, iPhone, Samsung & Pixel',
      icon: Smartphone,
      color: 'from-cyan-500 to-teal-500',
      tag: '5G Ready',
    },
    {
      id: 'laptops' as CategoryId,
      label: 'Laptops & Tablets',
      subtitle: 'MacBook, ROG, ThinkPad & iPads',
      icon: Laptop,
      color: 'from-indigo-500 to-purple-500',
      tag: 'RTX & M3',
    },
    {
      id: 'appliances' as CategoryId,
      label: 'Home Appliances',
      subtitle: 'OLED TVs, Smart ACs & Air Purifiers',
      icon: Tv,
      color: 'from-amber-500 to-orange-500',
      tag: 'Smart Living',
    },
    {
      id: 'gaming' as CategoryId,
      label: 'Gaming & VR',
      subtitle: 'PS5 Slim, Xbox Series X, Meta Quest',
      icon: Gamepad2,
      color: 'from-purple-500 to-pink-500',
      tag: '4K 120Hz',
    },
    {
      id: 'wearables' as CategoryId,
      label: 'Wearables & Audio',
      subtitle: 'Sony XM5, Apple Watch, Galaxy Buds',
      icon: Headphones,
      color: 'from-emerald-500 to-teal-500',
      tag: 'ANC Sound',
    },
    {
      id: 'refurbished' as CategoryId,
      label: 'Certified Refurbished',
      subtitle: '32-Point Inspected & 1-Yr Warranty',
      icon: ShieldCheck,
      color: 'from-emerald-600 to-green-600',
      tag: 'Save up to 45%',
      isSpecial: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end animate-fadeIn">
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Slide-Up Bottom Sheet Modal */}
      <div className="relative w-full max-h-[85vh] bg-slate-900 border-t border-slate-700 rounded-t-[28px] shadow-2xl z-10 flex flex-col overflow-hidden animate-slideUp">
        
        {/* Drag Handle Bar */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto my-3" />

        {/* Header */}
        <div className="px-5 pb-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white font-['Space_Grotesk']">
                Explore Categories
              </h3>
              <p className="text-[11px] text-slate-400">Select an electronics department</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Account / Delivery Bar */}
        <div className="bg-slate-950/80 px-5 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
          <button 
            onClick={() => {
              onClose();
              onOpenCitySelector();
            }}
            className="flex items-center space-x-1.5 text-cyan-300 font-semibold hover:text-cyan-200"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Delivering to: <strong className="text-white underline">{selectedCity}</strong></span>
          </button>

          {currentUser ? (
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="text-slate-300 font-medium">Hi, {currentUser.name.split(' ')[0]}</span>
              <button 
                onClick={() => {
                  onSignOut();
                  onClose();
                }}
                className="text-rose-400 hover:underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenAuthModal();
              }}
              className="text-[11px] text-cyan-400 font-bold hover:underline"
            >
              Sign In (0% EMI)
            </button>
          )}
        </div>

        {/* Scrollable Categories List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/60 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                    : cat.isSpecial
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-200 hover:bg-emerald-950/50'
                    : 'bg-slate-800/60 border-slate-800/90 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-white">{cat.label}</span>
                      {cat.tag && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          cat.isSpecial
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-700 text-cyan-300'
                        }`}>
                          {cat.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{cat.subtitle}</p>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
              </button>
            );
          })}

          {/* Quick Shortcuts Grid */}
          <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenOrders();
              }}
              className="p-3 bg-slate-800/80 rounded-xl text-center flex flex-col items-center justify-center space-y-1 hover:bg-slate-800"
            >
              <Truck className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] font-bold text-slate-200">Track Order</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenWishlist();
              }}
              className="p-3 bg-slate-800/80 rounded-xl text-center flex flex-col items-center justify-center space-y-1 hover:bg-slate-800"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span className="text-[11px] font-bold text-slate-200">Wishlist</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenAIAdvisor();
              }}
              className="p-3 bg-slate-800/80 rounded-xl text-center flex flex-col items-center justify-center space-y-1 hover:bg-slate-800"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] font-bold text-slate-200">AI Advisor</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
