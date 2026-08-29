import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Zap, 
  CheckCircle2, 
  Truck 
} from 'lucide-react';
import { CartItem } from '../types';
import { formatINR } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (appliedCoupon === 'CIRCUITFIRST') {
    discountAmount = Math.min(1500, Math.round(subtotal * 0.1));
  } else if (appliedCoupon === 'TECHFEST500') {
    discountAmount = 500;
  } else if (appliedCoupon === 'TIER2BONUS') {
    discountAmount = 750;
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const success = onApplyCoupon(couponInput.trim().toUpperCase());
    if (success) {
      setCouponSuccess(true);
      setCouponInput('');
      setTimeout(() => setCouponSuccess(false), 2500);
    } else {
      setCouponError('Invalid coupon. Try CIRCUITFIRST, TECHFEST500 or TIER2BONUS');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-base font-['Space_Grotesk']">
                Your Shopping Cart ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-200">Your cart is empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Explore our smartphones, 4K TVs, gaming consoles, and certified refurbished electronics!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div 
                  key={product.id}
                  className="bg-slate-850/60 border border-slate-800 rounded-2xl p-3.5 flex space-x-3.5 relative group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-18 h-18 rounded-xl object-cover bg-slate-800 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                      {product.brand}
                    </div>
                    <h4 className="text-xs font-bold text-slate-100 line-clamp-2">
                      {product.name}
                    </h4>

                    {product.isRefurbished && (
                      <div className="text-[10px] text-emerald-400 font-semibold flex items-center">
                        <ShieldCheck className="w-3 h-3 mr-0.5" />
                        {product.refurbishedGrade} • 12M Warranty
                      </div>
                    )}

                    <div className="flex items-baseline space-x-2 pt-0.5">
                      <span className="text-sm font-black text-white font-['Space_Grotesk']">
                        {formatINR(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-[10px] text-slate-500 line-through">
                          {formatINR(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Quantity Selector & Delete */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, Math.min(5, quantity + 1))}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-900/95 space-y-4">
              
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1.5 text-emerald-300 font-bold">
                      <Tag className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Coupon '{appliedCoupon}' Applied</span>
                    </div>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-slate-400 hover:text-rose-400 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon (e.g. CIRCUITFIRST)"
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="submit"
                        className="bg-slate-800 hover:bg-slate-750 text-cyan-400 font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-700"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
                    {couponSuccess && <p className="text-[11px] text-emerald-400">Coupon applied successfully!</p>}
                  </form>
                )}
              </div>

              {/* Bill Details */}
              <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-white">{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Savings</span>
                    <span>- {formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Doorstep Delivery</span>
                  <span className="text-emerald-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-white">
                  <span>Grand Total</span>
                  <span className="text-lg font-black text-cyan-300 font-['Space_Grotesk']">
                    {formatINR(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center space-x-2 active:scale-95"
                id="cart-proceed-checkout-btn"
              >
                <span>Proceed to Indian Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-center text-slate-400 flex items-center justify-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>UPI, No Cost EMI & COD Available</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
