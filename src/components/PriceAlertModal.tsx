import React, { useState } from 'react';
import { X, Bell, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/formatters';

interface PriceAlertModalProps {
  product: Product | null;
  onClose: () => void;
  onSaveAlert: (productId: string, targetPrice: number, contact: string) => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  product,
  onClose,
  onSaveAlert,
}) => {
  const [targetPrice, setTargetPrice] = useState(
    product ? Math.round(product.price * 0.9) : 10000
  );
  const [contact, setContact] = useState('');
  const [alertType, setAlertType] = useState<'whatsapp' | 'sms' | 'email'>('whatsapp');
  const [isSaved, setIsSaved] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    onSaveAlert(product.id, targetPrice, contact);
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-['Space_Grotesk']">
              Set Price Drop Alert
            </h3>
            <p className="text-xs text-slate-400">Get notified the instant the price drops</p>
          </div>
        </div>

        {isSaved ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-white">Alert Configured!</h4>
            <p className="text-xs text-slate-300">
              We will ping you on <span className="text-cyan-300 font-bold">{contact}</span> as soon as this item reaches {formatINR(targetPrice)}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Product Summary */}
            <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-800 flex items-center space-x-3">
              <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white truncate">{product.name}</div>
                <div className="text-slate-400">Current: <span className="text-cyan-400 font-bold">{formatINR(product.price)}</span></div>
              </div>
            </div>

            {/* Target Price */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Alert me when price drops to or below:</label>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Notification Channel */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Notify me via:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['whatsapp', 'sms', 'email'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAlertType(t)}
                    className={`py-2 rounded-xl font-bold capitalize border ${
                      alertType === t ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Input */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                {alertType === 'email' ? 'Email Address' : '10-Digit Mobile Number'} *
              </label>
              <input
                type={alertType === 'email' ? 'email' : 'tel'}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={alertType === 'email' ? 'you@example.com' : '9876543210'}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 shadow-lg"
            >
              Activate Price Drop Tracker
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
