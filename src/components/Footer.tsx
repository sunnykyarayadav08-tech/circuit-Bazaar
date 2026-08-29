import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  CreditCard, 
  RotateCcw, 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  Truck
} from 'lucide-react';
import { CategoryId } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryId) => void;
  onOpenSupport: () => void;
  onOpenSupportTab?: (tab: 'tracking' | 'returns' | 'warranty' | 'faq' | 'callback') => void;
  onOpenBlog: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSupport,
  onOpenSupportTab,
  onOpenBlog,
}) => {
  const handleOpen = (tab: 'tracking' | 'returns' | 'warranty' | 'faq' | 'callback' = 'tracking') => {
    if (onOpenSupportTab) onOpenSupportTab(tab);
    else onOpenSupport();
  };
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-slate-800/80">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Genuine Tech</h4>
              <p className="text-slate-400 mt-0.5">Original brand serial numbers & tax invoices with GST input credit.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">CircuitCare 32-Pt Diagnostic</h4>
              <p className="text-slate-400 mt-0.5">Refurbished electronics tested with 1-Year Pan-India Doorstep Warranty.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">0% No Cost EMI</h4>
              <p className="text-slate-400 mt-0.5">Available on HDFC, ICICI, SBI, Axis & Bajaj Finserv across 18,000+ pincodes.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">7-Day Doorstep Returns</h4>
              <p className="text-slate-400 mt-0.5">Zero hassle pickup from home with instant UPI or bank account refund.</p>
            </div>
          </div>
        </div>

        {/* Main Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white font-['Space_Grotesk'] tracking-tight">
                Circuit<span className="text-cyan-400">Bazaar</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              India's premier electronics-only marketplace. Bridging top-tier 5G phones, 4K OLED home entertainment, RTX workstations, and certified refurbished flagships to Tier 1, 2, and 3 cities.
            </p>
            <div className="pt-1 flex items-center space-x-3 text-slate-400">
              <span className="flex items-center">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 mr-1" />
                Mumbai • Bengaluru • Jaipur • Patna
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Categories</h5>
            <ul className="space-y-2">
              <li><button onClick={() => onSelectCategory('smartphones')} className="hover:text-cyan-400 transition-colors">Smartphones & 5G</button></li>
              <li><button onClick={() => onSelectCategory('laptops')} className="hover:text-cyan-400 transition-colors">Laptops & Workstations</button></li>
              <li><button onClick={() => onSelectCategory('appliances')} className="hover:text-cyan-400 transition-colors">Smart Home & 4K TVs</button></li>
              <li><button onClick={() => onSelectCategory('gaming')} className="hover:text-cyan-400 transition-colors">Gaming & VR Gear</button></li>
              <li><button onClick={() => onSelectCategory('wearables')} className="hover:text-cyan-400 transition-colors">Smartwatches & Wearables</button></li>
              <li><button onClick={() => onSelectCategory('refurbished')} className="hover:text-emerald-400 transition-colors font-semibold">Refurbished Hub (Save 50%)</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Customer Care</h5>
            <ul className="space-y-2">
              <li><button onClick={() => handleOpen('tracking')} className="hover:text-cyan-400 transition-colors font-medium text-cyan-300 flex items-center"><Truck className="w-3 h-3 mr-1" /> Live Order Tracking</button></li>
              <li><button onClick={() => handleOpen('returns')} className="hover:text-cyan-400 transition-colors">Schedule Doorstep Return</button></li>
              <li><button onClick={() => handleOpen('warranty')} className="hover:text-cyan-400 transition-colors">1-Year Warranty Claim</button></li>
              <li><button onClick={() => handleOpen('faq')} className="hover:text-cyan-400 transition-colors">FAQs & Shipping Policies</button></li>
              <li><button onClick={() => handleOpen('callback')} className="hover:text-cyan-400 transition-colors">Request 15-Min Call Back</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Tech Guides & AI</h5>
            <ul className="space-y-2">
              <li><button onClick={onOpenBlog} className="hover:text-cyan-400 transition-colors">Gadgets Under ₹20,000</button></li>
              <li><button onClick={onOpenBlog} className="hover:text-cyan-400 transition-colors">OLED vs QLED TV Guide</button></li>
              <li><button onClick={onOpenBlog} className="hover:text-cyan-400 transition-colors">32-Point Refurbished Guide</button></li>
              <li><button onClick={onOpenBlog} className="hover:text-cyan-400 transition-colors">Tier 2/3 Electronics Surge</button></li>
              <li><span className="text-cyan-400 font-bold flex items-center"><Sparkles className="w-3 h-3 mr-1" /> CircuitBot 24/7 AI</span></li>
            </ul>
          </div>

        </div>

        {/* Payment Methods & Legal */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-slate-300">
            <span className="text-[11px] font-bold text-slate-200">Payment Modes:</span>
            <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">BHIM UPI</span>
            <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">PhonePe / GPay</span>
            <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">RuPay / Visa / Master</span>
            <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">Bajaj Finserv EMI</span>
            <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">Cash on Delivery</span>
          </div>

          <div className="text-[11px] text-slate-400 text-center md:text-right">
            © {new Date().getFullYear()} CircuitBazaar India Marketplace Pvt. Ltd. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
