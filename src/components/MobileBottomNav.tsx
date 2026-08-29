import React from 'react';
import { 
  Home, 
  Grid, 
  Sparkles, 
  ShoppingCart, 
  User, 
  Package, 
  Heart,
  Bot
} from 'lucide-react';
import { UserAccount } from '../types';

export type MobileTab = 'home' | 'categories' | 'ai' | 'orders' | 'cart' | 'account';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  cartCount: number;
  wishlistCount: number;
  currentUser: UserAccount | null;
  onOpenAiBot: () => void;
  onOpenCart: () => void;
  onOpenCategories: () => void;
  onOpenOrders: () => void;
  onOpenAccount: () => void;
  onGoHome: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  wishlistCount,
  currentUser,
  onOpenAiBot,
  onOpenCart,
  onOpenCategories,
  onOpenOrders,
  onOpenAccount,
  onGoHome,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 shadow-[0_-8px_30px_rgba(0,0,0,0.6)] px-2 py-1.5 transition-all">
      <nav className="max-w-md mx-auto grid grid-cols-5 items-center justify-around">
        
        {/* TAB 1: Home */}
        <button
          onClick={() => {
            onSelectTab('home');
            onGoHome();
          }}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            activeTab === 'home'
              ? 'text-cyan-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200 active:scale-95'
          }`}
          id="mobile-tab-home"
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {activeTab === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Home</span>
        </button>

        {/* TAB 2: Categories */}
        <button
          onClick={() => {
            onSelectTab('categories');
            onOpenCategories();
          }}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            activeTab === 'categories'
              ? 'text-cyan-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200 active:scale-95'
          }`}
          id="mobile-tab-categories"
        >
          <div className="relative">
            <Grid className="w-5 h-5" />
            {activeTab === 'categories' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Categories</span>
        </button>

        {/* TAB 3: AI Advisor (Center Floating Glow Button) */}
        <button
          onClick={() => {
            onOpenAiBot();
          }}
          className="flex flex-col items-center justify-center -mt-4 py-1 px-1 group"
          id="mobile-tab-ai"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-blue-500 p-0.5 shadow-lg shadow-cyan-500/30 group-active:scale-95 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 to-cyan-500/30 animate-pulse" />
              <Bot className="w-6 h-6 text-cyan-300 relative z-10" />
              <Sparkles className="w-3 h-3 text-amber-300 absolute top-1 right-1 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </div>
          <span className="text-[10px] font-bold text-cyan-300 mt-1 tracking-tight">AI Tech</span>
        </button>

        {/* TAB 4: Orders / Track */}
        <button
          onClick={() => {
            onSelectTab('orders');
            onOpenOrders();
          }}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            activeTab === 'orders'
              ? 'text-cyan-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200 active:scale-95'
          }`}
          id="mobile-tab-orders"
        >
          <div className="relative">
            <Package className="w-5 h-5" />
            {activeTab === 'orders' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Orders</span>
        </button>

        {/* TAB 5: Cart (or Profile if cart empty) */}
        <button
          onClick={() => {
            onSelectTab('cart');
            onOpenCart();
          }}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl relative transition-all ${
            activeTab === 'cart'
              ? 'text-cyan-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200 active:scale-95'
          }`}
          id="mobile-tab-cart"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
            {activeTab === 'cart' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Cart</span>
        </button>

      </nav>
    </div>
  );
};
