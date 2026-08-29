import React, { useState, useEffect } from 'react';
import { Zap, Flame, Clock, Eye, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/formatters';

interface FlashSaleSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenARTryOut: (product: Product) => void;
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onOpenARTryOut,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 42,
    seconds: 18,
  });
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter((p) => p.isFlashSale).slice(0, 4);

  if (flashProducts.length === 0) return null;

  const handleAdd = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    onAddToCart(p);
    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [p.id]: false }));
    }, 2000);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-amber-950/40 via-slate-900/90 to-slate-900/90 border border-amber-500/30 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      
      {/* Background flare */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Live Countdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
                Circuit Lightning Deals
              </h2>
              <span className="bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider animate-pulse">
                Live Now
              </span>
            </div>
            <p className="text-xs text-slate-400">Limited quantity flash clearance with instant extra ₹1,500 bank discount</p>
          </div>
        </div>

        {/* Countdown Timer Blocks */}
        <div className="flex items-center space-x-2 bg-slate-950/80 border border-amber-500/30 px-3.5 py-2 rounded-2xl">
          <Clock className="w-4 h-4 text-amber-400 mr-1" />
          <span className="text-xs text-slate-400 font-medium mr-1">Ends In:</span>
          <div className="flex items-center space-x-1 font-mono text-sm font-bold text-amber-300">
            <div className="bg-amber-500/20 px-2 py-1 rounded-md border border-amber-500/30">
              {String(timeLeft.hours).padStart(2, '0')}h
            </div>
            <span>:</span>
            <div className="bg-amber-500/20 px-2 py-1 rounded-md border border-amber-500/30">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </div>
            <span>:</span>
            <div className="bg-amber-500/20 px-2 py-1 rounded-md border border-amber-500/30">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </div>
          </div>
        </div>
      </div>

      {/* Flash Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {flashProducts.map((product) => {
          const isAdded = addedIds[product.id];
          const stockLeft = product.stockCount || 5;
          const progressPercent = Math.min(100, Math.max(20, 100 - stockLeft * 4));

          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer"
            >
              <div>
                {/* Image & Discount Badges */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-800 mb-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow">
                    {product.discountPercent}% OFF
                  </div>

                  {product.arModelType && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenARTryOut(product);
                      }}
                      className="absolute bottom-2 right-2 bg-slate-900/90 hover:bg-cyan-600 text-white text-[10px] font-semibold px-2 py-1 rounded-md border border-slate-700 flex items-center shadow-lg transition-colors"
                      title="Try in your room with AR"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      AR Try-Out
                    </button>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wide">
                    {product.brand} • {product.subcategory}
                  </div>
                  <h3 className="text-sm font-bold text-slate-100 line-clamp-2 group-hover:text-amber-300 transition-colors">
                    {product.name}
                  </h3>
                </div>
              </div>

              <div className="pt-3 space-y-3">
                {/* Price & Savings */}
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-black text-white font-['Space_Grotesk']">
                      {formatINR(product.price)}
                    </span>
                    <span className="text-xs text-slate-500 line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    Save {formatINR(product.originalPrice - product.price)} + No Cost EMI ₹{product.emiStartsAt}/mo
                  </div>
                </div>

                {/* Stock Left Meter */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-semibold">
                    <span className="text-amber-400">⚡ Claimed {progressPercent}%</span>
                    <span className="text-slate-400">{stockLeft} units left</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-rose-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAdd(e, product)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Claim Deal Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
