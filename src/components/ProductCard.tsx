import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Eye, 
  ShieldCheck, 
  Check, 
  Bell, 
  Zap, 
  RotateCcw,
  Flame,
  AlertTriangle
} from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenARTryOut: (product: Product) => void;
  onOpenPriceAlert: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenARTryOut,
  onOpenPriceAlert,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const isLowStock = product.inStock && product.stockCount > 0 && product.stockCount <= 8;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const handlePriceAlert = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenPriceAlert(product);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-2.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer relative active:scale-[0.98]"
      id={`product-card-${product.id}`}
    >
      <div>
        {/* Top Badges & Actions */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-800/80 mb-2.5 sm:mb-3.5">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges Column: Discount & Low Stock Alert */}
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col items-start space-y-1 sm:space-y-1.5 z-10 pointer-events-none">
            {product.discountPercent > 0 && (
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black text-[9px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-md shadow-md">
                {product.discountPercent}% OFF
              </div>
            )}

            {/* Low Stock Urgency Badge */}
            {isLowStock && (
              <div 
                className="bg-gradient-to-r from-rose-600 to-amber-600 text-white font-black text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-md shadow-lg flex items-center space-x-1 border border-rose-400/40 animate-pulse"
                title={`High Demand: Only ${product.stockCount} units remaining in warehouse`}
              >
                <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-200 fill-amber-200" />
                <span>{product.stockCount} left!</span>
              </div>
            )}
          </div>

          {/* Refurbished Badge */}
          {product.isRefurbished && (
            <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 font-semibold text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-md flex items-center shadow-lg backdrop-blur-sm">
              <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 text-emerald-400" />
              <span>Refurb • 1Yr Care</span>
            </div>
          )}

          {/* Wishlist & Price Alert Buttons */}
          <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 flex flex-col space-y-1 sm:space-y-1.5">
            <button
              onClick={handleWishlist}
              className={`p-1.5 sm:p-2 rounded-xl backdrop-blur-md transition-all shadow-md active:scale-90 ${
                isWishlisted
                  ? 'bg-rose-500 text-white'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handlePriceAlert}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-900/80 text-slate-300 hover:text-amber-300 hover:bg-slate-800 backdrop-blur-md transition-all shadow-md active:scale-90"
              title="Set Price Drop Alert"
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* AR Try-Out Overlay Button */}
          {product.arModelType && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenARTryOut(product);
              }}
              className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 bg-slate-950/90 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-cyan-500/40 flex items-center shadow-lg transition-all backdrop-blur-sm"
              title="View true size in your room using Camera/AR"
            >
              <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
              <span>AR</span>
            </button>
          )}
        </div>

        {/* Brand & Subcategory */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-medium mb-1">
          <span className="text-cyan-400 font-semibold uppercase tracking-wider">{product.brand}</span>
          <span className="text-slate-500 truncate max-w-[80px] sm:max-w-[120px]">{product.subcategory}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-slate-100 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors mb-1.5 sm:mb-2">
          {product.name}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs mb-1.5 sm:mb-2">
          <div className="flex items-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-bold text-[10px] sm:text-xs">
            <span>{product.rating}</span>
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5 fill-emerald-400" />
          </div>
          <span className="text-slate-500 text-[10px] sm:text-xs">({product.reviewCount.toLocaleString('en-IN')})</span>
        </div>

        {/* Urgency Line if Low Stock */}
        {isLowStock ? (
          <div className="flex items-center space-x-1 text-[9px] sm:text-[11px] text-rose-400 font-semibold bg-rose-950/40 border border-rose-500/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded mb-2">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-rose-500"></span>
            </span>
            <span className="truncate">Only {product.stockCount} left</span>
          </div>
        ) : (
          /* Key Highlight Pill */
          product.highlights && product.highlights[0] && (
            <div className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-1 bg-slate-800/40 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-slate-800 mb-2">
              ✨ {product.highlights[0]}
            </div>
          )
        )}
      </div>

      {/* Pricing & Add to Cart */}
      <div className="pt-2 border-t border-slate-800/80 space-y-1.5 sm:space-y-2.5">
        <div>
          <div className="flex items-baseline space-x-1.5 sm:space-x-2">
            <span className="text-sm sm:text-lg font-black text-white font-['Space_Grotesk']">
              {formatINR(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] sm:text-xs text-slate-500 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-[9px] sm:text-[11px]">
            <span className="text-cyan-400 font-medium truncate">
              ₹{product.emiStartsAt.toLocaleString('en-IN')}/mo
            </span>
            <span className="text-emerald-400 font-semibold hidden sm:inline">
              Free Delivery
            </span>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className={`w-full py-2 sm:py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1 transition-all shadow-md active:scale-95 ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-cyan-600 hover:bg-cyan-500 text-white'
          }`}
          id={`add-cart-${product.id}`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
