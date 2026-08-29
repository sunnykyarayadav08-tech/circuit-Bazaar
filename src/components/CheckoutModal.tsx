import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  QrCode, 
  Building, 
  Banknote, 
  ArrowRight, 
  Sparkles, 
  Package, 
  Clock,
  Download,
  FileText,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order, UserAccount } from '../types';
import { formatINR } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: string;
  onOrderSuccess: (order: Order) => void;
  onTrackOrder?: (orderId: string) => void;
  selectedCity: string;
  currentUser?: UserAccount | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onOrderSuccess,
  onTrackOrder,
  selectedCity,
  currentUser,
}) => {
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  
  // Shipping Form State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: currentUser?.name || 'Aditya Verma',
    phone: currentUser?.phone || '9876543210',
    addressLine: currentUser?.savedAddress?.addressLine || 'Flat 402, Royal Palms Heights, Tech Zone',
    landmark: currentUser?.savedAddress?.landmark || 'Near City Mall',
    city: currentUser?.city || selectedCity || 'Jaipur',
    state: currentUser?.savedAddress?.state || 'Rajasthan',
    pincode: currentUser?.savedAddress?.pincode || '302001',
  });

  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'emi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe');
  const [selectedEmiBank, setSelectedEmiBank] = useState('HDFC Bank');
  const [selectedEmiTenure, setSelectedEmiTenure] = useState(6);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  let discountAmount = 0;
  if (appliedCoupon === 'CIRCUITFIRST') discountAmount = Math.min(1500, Math.round(subtotal * 0.1));
  else if (appliedCoupon === 'TECHFEST500') discountAmount = 500;
  else if (appliedCoupon === 'TIER2BONUS') discountAmount = 750;

  const deliveryFee = deliverySpeed === 'express' ? 199 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder: Order = {
        id: `CB-${Math.floor(100000 + Math.random() * 900000)}`,
        items,
        totalAmount: finalTotal,
        discountAmount,
        deliveryFee,
        appliedCoupon,
        shippingAddress,
        paymentMethod,
        paymentDetails: paymentMethod === 'emi' ? {
          emiBank: selectedEmiBank,
          emiTenureMonths: selectedEmiTenure,
          emiMonthlyAmount: Math.round(finalTotal / selectedEmiTenure),
        } : undefined,
        status: 'confirmed',
        createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        estimatedDeliveryDate: deliverySpeed === 'express' ? 'Tomorrow by 4 PM' : 'In 2 Days',
        trackingSteps: [
          { title: 'Order Confirmed & Payment Verified', date: 'Just now', completed: true, current: false },
          { title: '32-Point Quality Inspection & Packaging', date: 'Within 4 Hours', completed: false, current: true },
          { title: 'Dispatched via Insured Express Hub', date: 'Tomorrow', completed: false, current: false },
          { title: 'Doorstep Delivery with OTP', date: deliverySpeed === 'express' ? 'Tomorrow' : 'In 2 Days', completed: false, current: false },
        ],
      };

      setCompletedOrder(newOrder);
      setStep('success');
      onOrderSuccess(newOrder);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl my-auto">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-['Space_Grotesk']">
                {step === 'success' ? 'Order Confirmed!' : 'Secure Indian Checkout'}
              </h3>
              <p className="text-xs text-slate-400">
                {step === 'address' ? 'Step 1 of 2: Delivery & Contact' : step === 'payment' ? 'Step 2 of 2: Payment Gateway & EMI' : 'Invoice & Live Delivery Tracker'}
              </p>
            </div>
          </div>

          {step !== 'success' && (
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6">
          
          {/* STEP 1: Address & Pincode */}
          {step === 'address' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                  <input
                    type="text"
                    value={shippingAddress.fullName}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    placeholder="Recipient's Name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Mobile Number (for Delivery OTP) *</label>
                  <div className="flex">
                    <span className="bg-slate-800 border border-r-0 border-slate-700 px-3 py-2.5 rounded-l-xl text-xs text-slate-400 font-semibold">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value.replace(/\D/g, '') })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-r-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Flat / House No. / Street Address *</label>
                  <input
                    type="text"
                    value={shippingAddress.addressLine}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    placeholder="Apartment, Colony, Road"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">City / District *</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Pincode *</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={shippingAddress.pincode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value.replace(/\D/g, '') })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Delivery Speed Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Select Delivery Speed
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliverySpeed('standard')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                      deliverySpeed === 'standard'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold">Standard 2-3 Day Delivery</div>
                      <div className="text-[11px] text-emerald-400 font-semibold">FREE (Insured Transit)</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliverySpeed('express')}
                    className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                      deliverySpeed === 'express'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300'
                    }`}
                  >
                    <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold">Priority Next-Day Morning</div>
                      <div className="text-[11px] text-slate-400">+₹199 (Express Dispatch)</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Next Step Button */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-400">
                  Total Payable: <span className="text-sm font-black text-cyan-300 font-['Space_Grotesk']">{formatINR(finalTotal)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl flex items-center space-x-2 transition-all"
                  id="checkout-next-to-payment-btn"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Indian Payment Gateways */}
          {step === 'payment' && (
            <div className="space-y-6">
              
              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: Smartphone },
                  { id: 'emi', label: '0% No Cost EMI', icon: CreditCard },
                  { id: 'card', label: 'Cards (RuPay/Visa)', icon: CreditCard },
                  { id: 'netbanking', label: 'NetBanking', icon: Building },
                  { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 rounded-2xl border text-center flex flex-col items-center space-y-1.5 transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-md shadow-cyan-500/20'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[11px]">{pm.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Payment Details Container */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4">
                
                {/* UPI Mode */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">Scan QR or Pay via UPI App</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                        Instant 0% Fee
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center py-2">
                      <div className="bg-white p-3 rounded-2xl shadow-lg text-center">
                        <QrCode className="w-32 h-32 text-slate-950 mx-auto" />
                        <span className="text-[10px] font-bold text-slate-700 mt-1 block">Scan with any UPI App</span>
                      </div>

                      <div className="space-y-2 text-xs w-full max-w-xs">
                        <div className="text-slate-400 font-semibold">Or Select UPI App:</div>
                        <div className="grid grid-cols-2 gap-2">
                          {['PhonePe', 'Google Pay', 'Paytm', 'BHIM UPI'].map((app) => (
                            <button
                              key={app}
                              type="button"
                              onClick={() => setSelectedUpiApp(app.toLowerCase())}
                              className={`p-2.5 rounded-xl border text-xs font-semibold ${
                                selectedUpiApp === app.toLowerCase()
                                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                  : 'bg-slate-800 border-slate-700 text-slate-300'
                              }`}
                            >
                              {app}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* No Cost EMI Mode */}
                {paymentMethod === 'emi' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">Select Bank for 0% Interest EMI</span>
                      <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded font-bold">
                        Zero Downpayment
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {['HDFC Bank', 'ICICI Bank', 'SBI Card', 'Bajaj Finserv'].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedEmiBank(bank)}
                          className={`p-2.5 rounded-xl border font-semibold ${
                            selectedEmiBank === bank
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-slate-200">{selectedEmiBank} - {selectedEmiTenure} Months No Cost Plan</div>
                        <div className="text-[11px] text-slate-400">Total payable: {formatINR(finalTotal)} in {selectedEmiTenure} equal installments</div>
                      </div>
                      <div className="text-right font-mono font-bold text-cyan-400 text-sm">
                        {formatINR(Math.round(finalTotal / selectedEmiTenure))}/mo
                      </div>
                    </div>
                  </div>
                )}

                {/* Cards Mode */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3 text-xs">
                    <input
                      type="text"
                      placeholder="Card Number (RuPay, Visa, MasterCard)"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                      />
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="CVV"
                        className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                )}

                {/* NetBanking Mode */}
                {paymentMethod === 'netbanking' && (
                  <div className="space-y-3 text-xs">
                    <div className="text-slate-300 font-semibold">Popular Indian Banks</div>
                    <div className="grid grid-cols-3 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National'].map((b) => (
                        <button key={b} type="button" className="p-2 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-slate-300 text-left truncate">
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* COD Mode */}
                {paymentMethod === 'cod' && (
                  <div className="text-xs text-slate-300 space-y-2">
                    <p>
                      Cash on Delivery is available for this address in {shippingAddress.city}. You will receive an SMS OTP when the delivery agent reaches your doorstep.
                    </p>
                    <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-amber-300 font-medium text-[11px]">
                      💡 Pro-Tip: Delivery agent carries a QR code for contactless UPI payment at doorstep.
                    </div>
                  </div>
                )}

              </div>

              {/* Order Summary & Place Order */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Back to Address
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs px-7 py-3.5 rounded-xl flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50"
                  id="checkout-place-order-btn"
                >
                  {isProcessing ? (
                    <span>Verifying with Bank...</span>
                  ) : (
                    <>
                      <span>Confirm & Pay {formatINR(finalTotal)}</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Order Confirmation & Tracking */}
          {step === 'success' && completedOrder && (
            <div className="space-y-6 text-center py-4">
              
              {/* Success Badge */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 animate-scale" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-black text-white font-['Space_Grotesk']">
                  Order Successfully Placed!
                </h4>
                <p className="text-xs text-slate-400">
                  Order ID: <span className="font-mono text-cyan-400 font-bold">{completedOrder.id}</span> • SMS confirmation sent to +91 {completedOrder.shippingAddress.phone}
                </p>
              </div>

              {/* Live Tracking Timeline */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 text-left space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span className="flex items-center">
                    <Package className="w-4 h-4 text-cyan-400 mr-1.5" />
                    Live Parcel Journey Tracker
                  </span>
                  <span className="text-emerald-400">Estimated: {completedOrder.estimatedDeliveryDate}</span>
                </div>

                <div className="space-y-3">
                  {completedOrder.trackingSteps.map((stepItem, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        stepItem.completed ? 'bg-emerald-500 text-slate-950 font-bold' : stepItem.current ? 'bg-cyan-500 text-slate-950 font-bold animate-pulse' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {stepItem.completed ? '✓' : idx + 1}
                      </div>
                      <div>
                        <div className={`font-semibold ${stepItem.completed || stepItem.current ? 'text-white' : 'text-slate-500'}`}>
                          {stepItem.title}
                        </div>
                        <div className="text-[10px] text-slate-400">{stepItem.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {onTrackOrder && (
                  <button
                    onClick={() => {
                      onClose();
                      onTrackOrder(completedOrder.id);
                    }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center space-x-1.5 shadow-lg shadow-cyan-500/20"
                    id="checkout-live-track-btn"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Open in Live Tracking Hub</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-6 py-3 rounded-xl border border-slate-700 transition-all"
                >
                  Continue Browsing CircuitBazaar
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
