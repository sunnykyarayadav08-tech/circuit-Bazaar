import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Percent, 
  RotateCcw, 
  CreditCard, 
  Sparkles, 
  ChevronRight, 
  Cpu, 
  Eye, 
  Clock, 
  Smartphone,
  Tv,
  Gamepad2,
  Laptop
} from 'lucide-react';
import { CategoryId, Product } from '../types';

interface HeroBannerProps {
  onSelectCategory: (category: CategoryId) => void;
  onOpenAIAdvisor: () => void;
  onOpenRefurbished: () => void;
  onSelectProduct: (product: Product) => void;
  featuredProducts: Product[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onOpenAIAdvisor,
  onOpenRefurbished,
  onSelectProduct,
  featuredProducts,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: 'FESTIVAL ELECTRONICS BONANZA',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      title: 'Flagship Tech for Every Corner of India',
      subtitle: 'Smartphones, 4K OLED TVs & RTX Gaming Workstations with up to 50% OFF + 12-Month No Cost EMI across 18,000+ Pincodes.',
      bgGradient: 'from-blue-950 via-slate-900 to-cyan-950',
      actionText: 'Explore Smartphones',
      actionCategory: 'smartphones' as CategoryId,
      featuredProductId: 'cb-phone-01',
      tag: '🔥 0% Downpayment on HDFC/ICICI/Bajaj'
    },
    {
      badge: 'CIRCUITCARE CERTIFIED REFURBISHED',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      title: '32-Point Inspected Flagships. Save up to ₹60,000.',
      subtitle: 'Apple iPhones, ThinkPads, and Sony ANC Headphones inspected with 100% genuine components & 1-Year Doorstep Replacement Warranty.',
      bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
      actionText: 'Shop Refurbished Hub',
      actionCategory: 'refurbished' as CategoryId,
      featuredProductId: 'cb-refurb-01',
      tag: '✨ Battery Health 90%+ Guaranteed'
    },
    {
      badge: 'NEXT-GEN ENTERTAINMENT & LIVING',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      title: 'Transform Your Home with LG OLED & Samsung AI',
      subtitle: 'Experience true cinema black and smart cooling. Use our interactive AR Room Try-Out tool to preview screen size on your actual wall!',
      bgGradient: 'from-purple-950 via-slate-900 to-indigo-950',
      actionText: 'View Smart Appliances',
      actionCategory: 'appliances' as CategoryId,
      featuredProductId: 'cb-app-01',
      tag: '📐 Instant AR Wall Sizing Available'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[currentSlide];

  return (
    <div className="space-y-6">
      {/* Main Interactive Carousel Banner */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${activeSlide.bgGradient} border border-slate-700/60 shadow-2xl p-6 sm:p-10 transition-all duration-700`}>
        
        {/* Subtle decorative glow circuits */}
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full border ${activeSlide.badgeColor}`}>
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                {activeSlide.badge}
              </span>
              <span className="text-xs text-slate-400 font-medium bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700">
                {activeSlide.tag}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-['Space_Grotesk']">
              {activeSlide.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              {activeSlide.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectCategory(activeSlide.actionCategory)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm shadow-lg shadow-cyan-500/25 flex items-center transition-transform hover:scale-105 active:scale-95"
                id="hero-cta-btn"
              >
                {activeSlide.actionText}
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </button>

              <button
                onClick={onOpenAIAdvisor}
                className="bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 px-5 py-3 rounded-xl text-sm font-semibold flex items-center space-x-2 transition-colors hover:border-cyan-500/50"
                id="hero-ask-ai-btn"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Ask AI Gadget Finder</span>
              </button>
            </div>

            {/* Slide Indicator Dots */}
            <div className="pt-4 flex items-center space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            {featuredProducts[currentSlide] && (
              <div 
                onClick={() => onSelectProduct(featuredProducts[currentSlide])}
                className="group cursor-pointer w-full max-w-sm bg-slate-900/90 border border-slate-700/90 rounded-2xl p-4 shadow-xl hover:border-cyan-500/50 transition-all hover:scale-[1.02]"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 mb-3">
                  <img 
                    src={featuredProducts[currentSlide].images[0]} 
                    alt={featuredProducts[currentSlide].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-sm border border-slate-700 text-cyan-400 font-bold text-[11px] px-2.5 py-1 rounded-lg">
                    {featuredProducts[currentSlide].discountPercent}% OFF
                  </div>
                  {featuredProducts[currentSlide].arModelType && (
                    <div className="absolute top-2.5 right-2.5 bg-indigo-600/90 text-white font-medium text-[10px] px-2 py-0.5 rounded flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      AR Ready
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                    {featuredProducts[currentSlide].brand} • {featuredProducts[currentSlide].subcategory}
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm line-clamp-1 group-hover:text-cyan-300 transition-colors">
                    {featuredProducts[currentSlide].name}
                  </h3>
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="text-lg font-black text-white font-['Space_Grotesk']">
                      ₹{featuredProducts[currentSlide].price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-slate-400">
                      EMI from ₹{featuredProducts[currentSlide].emiStartsAt.toLocaleString('en-IN')}/mo
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 5 Core CircuitBazaar Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">100% Genuine</div>
            <div className="text-[11px] text-slate-400">Direct Brand Warranty</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">32-Pt Certified</div>
            <div className="text-[11px] text-slate-400">Refurbished 1-Yr Care</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">0% No Cost EMI</div>
            <div className="text-[11px] text-slate-400">All Indian Banks</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">7-Day Doorstep</div>
            <div className="text-[11px] text-slate-400">Pickup & Instant Refund</div>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">Fast 2-Day Hub</div>
            <div className="text-[11px] text-slate-400">Tier 2 & 3 Express</div>
          </div>
        </div>
      </div>
    </div>
  );
};
