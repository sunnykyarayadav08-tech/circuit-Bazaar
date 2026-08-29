import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CreditCard, 
  Eye, 
  Heart, 
  ShoppingCart, 
  Zap, 
  CheckCircle2, 
  Check, 
  Share2, 
  Cpu, 
  BatteryCharging, 
  Sparkles, 
  MapPin, 
  Clock, 
  ArrowLeft,
  ChevronRight,
  ThumbsUp,
  Flame,
  AlertCircle
} from 'lucide-react';
import { Product } from '../types';
import { formatINR, calculateEMI, formatPincodeEstimate } from '../utils/formatters';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenARTryOut: (product: Product) => void;
  selectedCity: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onOpenARTryOut,
  selectedCity,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [pincodeInput, setPincodeInput] = useState('302001');
  const [pincodeVerified, setPincodeVerified] = useState(true);
  const [pincodeResult, setPincodeResult] = useState({ city: 'Jaipur Hub', days: 2, isExpress: true });
  const [selectedEmiTenure, setSelectedEmiTenure] = useState(6);
  const [selectedWarrantyPlan, setSelectedWarrantyPlan] = useState<'standard' | 'extended_1yr'>('standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'inspection' | 'reviews' | 'emi'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.length === 6) {
      const res = formatPincodeEstimate(pincodeInput);
      setPincodeResult({ city: `${selectedCity} / ${res.city}`, days: res.days, isExpress: res.isExpress });
      setPincodeVerified(true);
    }
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const emiPlans = [
    { months: 3, amount: calculateEMI(product.price, 3), bank: 'HDFC / ICICI / SBI' },
    { months: 6, amount: calculateEMI(product.price, 6), bank: 'All Major Banks (0% Interest)' },
    { months: 9, amount: calculateEMI(product.price, 9), bank: 'Bajaj Finserv' },
    { months: 12, amount: calculateEMI(product.price, 12), bank: 'Debit & Credit Cards' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={onBack}
          className="flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group"
          id="pdp-back-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </button>

        <div className="hidden sm:flex items-center space-x-2">
          <span>Electronics</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="capitalize">{product.category}</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-200 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase (Left: Images + AR, Right: Buying Specs & Cart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Image Gallery & AR Button */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Active Image with Zoom Frame */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Discount Badge */}
            {product.discountPercent > 0 && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-black text-xs px-3 py-1.5 rounded-xl shadow-lg">
                {product.discountPercent}% SAVINGS
              </div>
            )}

            {/* Refurbished Badge */}
            {product.isRefurbished && (
              <div className="absolute top-4 right-4 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md flex items-center shadow-lg">
                <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" />
                {product.refurbishedGrade} • 12M Warranty
              </div>
            )}

            {/* AR Try-Out Button Floating on Image */}
            {product.arModelType && (
              <button
                onClick={() => onOpenARTryOut(product)}
                className="absolute bottom-4 left-4 right-4 bg-slate-950/90 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-cyan-500/50 backdrop-blur-md font-bold text-xs py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 shadow-2xl transition-all"
                id="pdp-launch-ar-btn"
              >
                <Eye className="w-4 h-4" />
                <span>Launch AR Room Try-Out (See True Size on Wall/Desk)</span>
              </button>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-slate-900 ${
                    selectedImageIndex === idx ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* 32-Point Refurbished Guarantee Banner (If applicable) */}
          {product.isRefurbished && (
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-300 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>CircuitCare 32-Point Diagnostic Certification</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                This unit has passed our stringent laboratory tests: OEM Battery health verified at {product.refurbishedDetails?.batteryHealth || '95%+'}, UV-C sanitized, laser-checked display with zero dead pixels, and 12-Month free replacement warranty.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Buying Specifications & Cart Action */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Brand, Name, and Share/Wishlist */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {product.brand} • {product.subcategory}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                {copiedLink && (
                  <span className="text-[10px] text-emerald-400 font-bold">Link copied!</span>
                )}

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-2 rounded-xl transition-colors ${
                    isWishlisted ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Add to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight mt-1 font-['Space_Grotesk']">
              {product.name}
            </h1>

            {/* Ratings & Trending Tier 2/3 tag */}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div className="flex items-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-xs font-bold">
                <span>{product.rating}</span>
                <Star className="w-3.5 h-3.5 ml-1 fill-emerald-400" />
                <span className="text-slate-400 font-normal ml-1.5">
                  ({product.reviewCount.toLocaleString('en-IN')} verified ratings)
                </span>
              </div>

              {product.tierCityPopularity && (
                <div className="text-xs text-amber-300 font-medium flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  {product.tierCityPopularity}
                </div>
              )}
            </div>
          </div>

          {/* Pricing & EMI Information */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-black text-white font-['Space_Grotesk']">
                {formatINR(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-slate-500 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Save {formatINR(product.originalPrice - product.price)} ({product.discountPercent}% OFF)
                  </span>
                </>
              )}
            </div>

            <div className="text-xs text-slate-400 flex items-center space-x-2">
              <span>Inclusive of all GST taxes</span>
              <span>•</span>
              <span className="text-cyan-400 font-semibold">100% Genuine Tax Invoice with Serial Number</span>
            </div>

            {/* No Cost EMI Selector */}
            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                <span className="flex items-center text-indigo-300">
                  <CreditCard className="w-3.5 h-3.5 mr-1" />
                  No Cost EMI Plans (0% Downpayment)
                </span>
                <span className="text-[11px] text-slate-400">Starts at ₹{product.emiStartsAt}/mo</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {emiPlans.map((plan) => (
                  <button
                    key={plan.months}
                    onClick={() => setSelectedEmiTenure(plan.months)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedEmiTenure === plan.months
                        ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-[11px] font-bold">{plan.months} Months</div>
                    <div className="text-xs font-black text-white font-mono">{formatINR(plan.amount)}/m</div>
                    <div className="text-[9px] text-slate-400 truncate">0% Interest</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery & Pincode Speed Estimator */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <div className="flex items-center space-x-1.5">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span>Delivery & Doorstep Service</span>
              </div>
              <span className="text-emerald-400 font-bold">FREE Insured Shipping</span>
            </div>

            <form onSubmit={handlePincodeCheck} className="flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
              </div>
              <button
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs px-4 py-2 rounded-xl border border-slate-700"
              >
                Check
              </button>
            </form>

            {pincodeVerified && (
              <div className="text-xs text-slate-300 space-y-1 bg-slate-800/40 p-2.5 rounded-xl border border-slate-800">
                <div className="flex items-center text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  <span>Delivery to {pincodeResult.city} ({pincodeInput}) within {pincodeResult.days} Business Days</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  ⚡ Doorstep inspection & OTP-verified handoff available.
                </div>
              </div>
            )}
          </div>

          {/* Extended Warranty Add-On Option */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mr-1.5" />
                CircuitCare Protection Plan
              </span>
              <span className="text-emerald-400 font-semibold">Free 1-Year Included</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setSelectedWarrantyPlan('standard')}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  selectedWarrantyPlan === 'standard'
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <div className="font-bold">Standard 1-Year</div>
                <div className="text-[10px] text-slate-400">Included Free</div>
              </button>

              <button
                onClick={() => setSelectedWarrantyPlan('extended_1yr')}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  selectedWarrantyPlan === 'extended_1yr'
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <div className="font-bold">+1 Year Extended Care</div>
                <div className="text-[10px] text-amber-400 font-bold">+₹999 (Doorstep Repair)</div>
              </button>
            </div>
          </div>

          {/* Low Stock Urgency Alert */}
          {product.inStock && product.stockCount > 0 && product.stockCount <= 8 && (
            <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-amber-950/50 border border-rose-500/30 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-rose-400 font-bold">
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
                  <span>Only {product.stockCount} items left in stock — order soon</span>
                </div>
                <span className="text-[10px] text-amber-300 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  High Demand
                </span>
              </div>
              
              {/* Urgency Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full animate-pulse" 
                  style={{ width: `${Math.max(15, (product.stockCount / 10) * 100)}%` }} 
                />
              </div>
              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>🔥 24 people looking at this in the last hour</span>
                <span>Fast Dispatch</span>
              </div>
            </div>
          )}

          {/* Action Buttons: Quantity, Add to Cart & Buy Now */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              {/* Quantity Selector */}
              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-750 text-slate-300 hover:text-white flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-xs text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-slate-750 text-slate-300 hover:text-white flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-750 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400'
                }`}
                id="pdp-add-to-cart-btn"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added ({quantity})!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              {/* Instant Buy Now */}
              <button
                onClick={() => onBuyNow(product)}
                className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2"
                id="pdp-buy-now-btn"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Detailed Specs, 32-Pt Inspection, Customer Reviews, EMI Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6">
        
        {/* Tab Headers */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'specs' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Technical Specifications
          </button>

          {product.isRefurbished && (
            <button
              onClick={() => setActiveTab('inspection')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                activeTab === 'inspection' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              32-Point Inspection Report
            </button>
          )}

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'reviews' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Customer Reviews ({product.reviews.length})
          </button>

          <button
            onClick={() => setActiveTab('emi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'emi' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            EMI & Bank Offers
          </button>
        </div>

        {/* Tab Content: Specs */}
        {activeTab === 'specs' && (
          <div className="space-y-6">
            {/* Key Highlights */}
            <div>
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">Key Highlights</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-center space-x-2 bg-slate-800/50 p-2.5 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Specs Table */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Detailed Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.keySpecs).map(([k, v]) => (
                  <div key={k} className="bg-slate-800/40 p-3 rounded-xl border border-slate-800 flex justify-between text-xs">
                    <span className="text-slate-400 font-semibold">{k}</span>
                    <span className="text-slate-200 font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: 32-Point Inspection */}
        {activeTab === 'inspection' && product.isRefurbished && (
          <div className="space-y-4">
            <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-emerald-300">Certificate of Electronic Verification</div>
                <div className="text-xs text-slate-400">Inspected by Senior Diagnostic Engineers at Mumbai Tech Depot</div>
              </div>
              <div className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/40">
                PASSED 32/32 CHECKS
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {[
                'OEM Battery Capacity & Voltage Curve',
                'Multi-Touch Matrix & Digitizer Uniformity',
                'Camera Sensor Optical Image Stabilization',
                'Loudspeaker Frequency Response (20Hz-20kHz)',
                'Charging IC & Fast Charge Protocol',
                'Processor Thermal Stress Benchmark (24H)',
                'Display Color Delta-E Calibration',
                'Wi-Fi 6 & 5G Band Signal Reception',
                'Microphone Array & Acoustic Noise Reduction',
                'Biometrics (FaceID / Fingerprint Sensor)',
                'Internal Board Cleanliness & Solder Integrity',
                'Hospital-Grade UV-C Sterilization'
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-800 flex items-center space-x-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Verified Indian Buyer Reviews</h4>
                <p className="text-xs text-slate-400">All reviews are verified via OTP parcel delivery</p>
              </div>
            </div>

            <div className="space-y-3">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center">
                          {rev.userName}
                          <span className="text-[10px] text-emerald-400 font-normal ml-2 flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-0.5" />
                            Verified Buyer from {rev.userCity}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500">{rev.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-400 text-xs font-bold">
                      {rev.rating} <Star className="w-3 h-3 ml-1 fill-emerald-400" />
                    </div>
                  </div>

                  <h5 className="text-xs font-bold text-slate-200">{rev.title}</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>

                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 pt-1">
                    <button className="flex items-center space-x-1 hover:text-cyan-400">
                      <ThumbsUp className="w-3 h-3" />
                      <span>Helpful ({rev.helpfulCount})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: EMI & Bank Offers */}
        {activeTab === 'emi' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-white flex items-center">
                  <CreditCard className="w-4 h-4 text-cyan-400 mr-1.5" />
                  HDFC & ICICI Bank Instant Discount
                </div>
                <p className="text-slate-300">
                  Flat ₹1,500 Instant Discount on Credit Card EMI transactions above ₹25,000. Apply coupon <span className="text-cyan-300 font-mono font-bold">CIRCUITFIRST</span> at checkout.
                </p>
              </div>

              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="font-bold text-white flex items-center">
                  <RotateCcw className="w-4 h-4 text-amber-400 mr-1.5" />
                  Bajaj Finserv No Cost EMI
                </div>
                <p className="text-slate-300">
                  Zero Downpayment and zero processing fee for existing Bajaj Finserv Insta EMI card holders across all Tier 1, 2, and 3 cities.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Mobile-Only Sticky Floating Buy / Cart Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 p-3 shadow-[0_-10px_35px_rgba(0,0,0,0.8)] pb-4">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2.5">
          
          {/* Price & EMI on Left */}
          <div className="flex flex-col min-w-0 pr-1">
            <div className="flex items-baseline space-x-1.5 truncate">
              <span className="text-base font-extrabold text-white font-['Space_Grotesk'] leading-tight">
                {formatINR(product.price)}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">
                {product.discountPercent}% OFF
              </span>
            </div>
            <span className="text-[10px] text-cyan-400 font-medium truncate">
              EMI {calculateEMI(product.price)}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <button
              onClick={handleAdd}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 border transition-all ${
                addedAnimation
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-800 text-cyan-300 border-cyan-500/40 active:scale-95'
              }`}
              id="mobile-sticky-add-cart-btn"
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart</span>
                </>
              )}
            </button>

            <button
              onClick={() => onBuyNow(product)}
              className="py-2.5 px-4 rounded-xl text-xs font-black bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/30 flex items-center justify-center space-x-1 active:scale-95 flex-1 max-w-[140px]"
              id="mobile-sticky-buynow-btn"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Buy Now</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
