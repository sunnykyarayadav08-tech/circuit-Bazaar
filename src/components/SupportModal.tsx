import React, { useState, useEffect } from 'react';
import { 
  X, 
  RotateCcw, 
  ShieldCheck, 
  HelpCircle, 
  Calendar, 
  Truck, 
  CheckCircle2, 
  PhoneCall, 
  FileText, 
  CreditCard,
  ChevronDown,
  ChevronUp,
  Search,
  Package,
  Clock,
  MapPin,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Phone,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/blogs';
import { Order, CartItem } from '../types';
import { PRODUCTS } from '../data/products';
import { formatINR } from '../utils/formatters';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  orders?: Order[];
  initialTab?: 'tracking' | 'returns' | 'warranty' | 'faq' | 'callback';
  initialOrderId?: string;
}

// Pre-seeded demo orders to provide instant rich tracking data if user hasn't completed checkout yet
const DEMO_ORDERS: Record<string, Order> = {
  'CB-849201': {
    id: 'CB-849201',
    items: [
      { product: PRODUCTS[0], quantity: 1, selectedStorage: '256 GB', selectedColor: 'Emerald Green' },
      { product: PRODUCTS[11], quantity: 1, selectedColor: 'Phantom Black' }
    ],
    totalAmount: 68998,
    discountAmount: 1500,
    deliveryFee: 0,
    appliedCoupon: 'CIRCUITFIRST',
    shippingAddress: {
      fullName: 'Aarav Sharma',
      phone: '9876543210',
      addressLine: 'Plot 42, Malviya Nagar Sector 4',
      landmark: 'Near World Trade Park',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302017'
    },
    paymentMethod: 'upi',
    paymentDetails: { upiId: 'aarav@okaxis' },
    status: 'dispatched',
    createdAt: 'Today, 09:30 AM',
    estimatedDeliveryDate: 'Tomorrow by 2:00 PM',
    trackingSteps: [
      { title: 'Order Confirmed & Payment Verified (BHIM UPI)', date: 'Today, 09:30 AM', completed: true, current: false },
      { title: '32-Point CircuitCare Diagnostic & Secure Packaging', date: 'Today, 11:15 AM', completed: true, current: false },
      { title: 'Dispatched via BlueDart Express Air (AWB: BD-84920199)', date: 'Today, 02:45 PM', completed: true, current: true },
      { title: 'Out for Doorstep Delivery with OTP', date: 'Expected Tomorrow by 10:00 AM', completed: false, current: false },
      { title: 'Delivered & 1-Year Doorstep Warranty Activated', date: 'Expected Tomorrow by 2:00 PM', completed: false, current: false },
    ]
  },
  'CB-719302': {
    id: 'CB-719302',
    items: [
      { product: PRODUCTS[4], quantity: 1, selectedStorage: '512 GB SSD', selectedColor: 'Space Gray' }
    ],
    totalAmount: 124900,
    discountAmount: 5000,
    deliveryFee: 0,
    appliedCoupon: 'TECHFEST500',
    shippingAddress: {
      fullName: 'Pooja Verma',
      phone: '9812345678',
      addressLine: 'Flat 302, Green Glen Heights, Bellandur',
      landmark: 'Opposite Ecospace Tech Park',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103'
    },
    paymentMethod: 'emi',
    paymentDetails: { emiBank: 'HDFC Bank', emiTenureMonths: 6, emiMonthlyAmount: 20816 },
    status: 'out_for_delivery',
    createdAt: 'Yesterday, 04:15 PM',
    estimatedDeliveryDate: 'Today by 5:30 PM',
    trackingSteps: [
      { title: 'Order Confirmed & 0% No Cost EMI Approved (HDFC)', date: 'Yesterday, 04:15 PM', completed: true, current: false },
      { title: 'CircuitCare Quality Diagnostic & Anti-Tamper Sealing', date: 'Yesterday, 07:00 PM', completed: true, current: false },
      { title: 'Arrived at Bengaluru Express Logistics Hub', date: 'Today, 06:30 AM', completed: true, current: false },
      { title: 'Out for Delivery with Associate Rajesh (OTP: 4892)', date: 'Today, 11:20 AM', completed: true, current: true },
      { title: 'Delivered & 1-Year Doorstep Warranty Activated', date: 'Expected by 5:30 PM Today', completed: false, current: false },
    ]
  },
  'CB-401928': {
    id: 'CB-401928',
    items: [
      { product: PRODUCTS[1], quantity: 1, selectedStorage: '128 GB', selectedColor: 'Starlight' }
    ],
    totalAmount: 44999,
    discountAmount: 0,
    deliveryFee: 0,
    shippingAddress: {
      fullName: 'Rohit Khandelwal',
      phone: '9789012345',
      addressLine: 'House 18, Fraser Road',
      landmark: 'Near Dak Bungalow',
      city: 'Patna',
      state: 'Bihar',
      pincode: '800001'
    },
    paymentMethod: 'cod',
    status: 'confirmed',
    createdAt: 'Today, 11:00 AM',
    estimatedDeliveryDate: 'In 2 Days (Thursday)',
    trackingSteps: [
      { title: 'Order Placed (Cash on Delivery with Mobile OTP)', date: 'Today, 11:00 AM', completed: true, current: false },
      { title: 'CircuitCare 32-Pt Diagnostic & Battery Health Benchmark (96%)', date: 'In Progress (Estimated 2 Hours)', completed: false, current: true },
      { title: 'Dispatched via Insured Express Hub', date: 'Scheduled Tomorrow Morning', completed: false, current: false },
      { title: 'Out for Doorstep Delivery with OTP', date: 'Scheduled in 2 Days', completed: false, current: false },
      { title: 'Delivered & 1-Year Doorstep Warranty Activated', date: 'Scheduled in 2 Days', completed: false, current: false },
    ]
  },
  'CB-938102': {
    id: 'CB-938102',
    items: [
      { product: PRODUCTS[7], quantity: 1, selectedColor: 'Titanium Black' }
    ],
    totalAmount: 184990,
    discountAmount: 10000,
    deliveryFee: 0,
    shippingAddress: {
      fullName: 'Vikramaditya Roy',
      phone: '9900112233',
      addressLine: 'Bungalow 7, Civil Lines',
      landmark: 'Near High Court',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      pincode: '226001'
    },
    paymentMethod: 'card',
    status: 'delivered',
    createdAt: '3 Days Ago',
    estimatedDeliveryDate: 'Delivered on Yesterday, 03:40 PM',
    trackingSteps: [
      { title: 'Order Confirmed & Card Payment Verified', date: '3 Days Ago, 10:00 AM', completed: true, current: false },
      { title: 'White-Glove Screen Calibration & Packaging', date: '3 Days Ago, 02:00 PM', completed: true, current: false },
      { title: 'Dispatched via Specialized Appliance Fleet', date: '2 Days Ago, 08:30 AM', completed: true, current: false },
      { title: 'Out for Delivery with Installation Engineer', date: 'Yesterday, 11:00 AM', completed: true, current: false },
      { title: 'Delivered, Wall-Mounted & 1-Year Panel Warranty Activated', date: 'Yesterday, 03:40 PM', completed: true, current: false },
    ]
  }
};

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  orders = [],
  initialTab = 'tracking',
  initialOrderId = '',
}) => {
  const [activeTab, setActiveTab] = useState<'tracking' | 'returns' | 'warranty' | 'faq' | 'callback'>(initialTab);
  
  // Real-Time Order Tracking State
  const [trackingInputId, setTrackingInputId] = useState(initialOrderId || 'CB-849201');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [isSearchingOrder, setIsSearchingOrder] = useState(false);
  const [trackingError, setTrackingError] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [liveGpsPulse, setLiveGpsPulse] = useState(true);

  // Return scheduler state
  const [returnOrderId, setReturnOrderId] = useState('');
  const [returnReason, setReturnReason] = useState('Found a better price / changed preference');
  const [pickupDate, setPickupDate] = useState('Tomorrow (10 AM - 2 PM)');
  const [refundMethod, setRefundMethod] = useState<'upi' | 'original'>('upi');
  const [returnScheduled, setReturnScheduled] = useState(false);

  // FAQ expanded state
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  // Callback form
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackScheduled, setCallbackScheduled] = useState(false);

  // Sync tab on open
  useEffect(() => {
    if (isOpen) {
      if (initialTab) setActiveTab(initialTab);
      // Auto-load initial order or first available order
      const initialId = initialOrderId || (orders.length > 0 ? orders[0].id : 'CB-849201');
      setTrackingInputId(initialId);
      performOrderSearch(initialId);
    }
  }, [isOpen, initialTab, initialOrderId, orders]);

  if (!isOpen) return null;

  // Search logic for Tracking
  function performOrderSearch(orderIdToSearch: string) {
    const cleanId = (orderIdToSearch || '').trim().toUpperCase();
    if (!cleanId) {
      setTrackingError('Please enter a valid Order ID');
      setSearchedOrder(null);
      return;
    }

    setIsSearchingOrder(true);
    setTrackingError('');

    setTimeout(() => {
      // 1. Check user orders from current session
      const foundInUserOrders = orders.find((o) => o.id.toUpperCase() === cleanId);
      if (foundInUserOrders) {
        setSearchedOrder(foundInUserOrders);
        setIsSearchingOrder(false);
        return;
      }

      // 2. Check demo pre-seeded orders
      if (DEMO_ORDERS[cleanId]) {
        setSearchedOrder(DEMO_ORDERS[cleanId]);
        setIsSearchingOrder(false);
        return;
      }

      // 3. If custom format `CB-XXXXXX`, generate a realistic dynamic live order
      if (cleanId.startsWith('CB-')) {
        const dynamicOrder: Order = {
          id: cleanId,
          items: [
            { product: PRODUCTS[0], quantity: 1, selectedStorage: '256 GB' }
          ],
          totalAmount: PRODUCTS[0].price,
          discountAmount: 1000,
          deliveryFee: 0,
          shippingAddress: {
            fullName: 'Valued Customer',
            phone: '9876543210',
            addressLine: 'Express Transit Point',
            city: selectedCity,
            state: 'India',
            pincode: '302001'
          },
          paymentMethod: 'upi',
          status: 'dispatched',
          createdAt: 'Today, 10:15 AM',
          estimatedDeliveryDate: 'Tomorrow by 3:00 PM',
          trackingSteps: [
            { title: 'Order Confirmed & Verified', date: 'Today, 10:15 AM', completed: true, current: false },
            { title: '32-Point Quality Diagnostic Check', date: 'Today, 11:30 AM', completed: true, current: false },
            { title: `Dispatched to ${selectedCity} Express Center`, date: 'Today, 01:00 PM', completed: true, current: true },
            { title: 'Out for Doorstep Delivery with OTP', date: 'Expected Tomorrow', completed: false, current: false },
            { title: 'Delivered & Warranty Active', date: 'Expected Tomorrow', completed: false, current: false },
          ]
        };
        setSearchedOrder(dynamicOrder);
        setIsSearchingOrder(false);
        return;
      }

      // Not found
      setTrackingError(`Order "${cleanId}" not found. Please try sample ID "CB-849201" or "CB-719302".`);
      setSearchedOrder(null);
      setIsSearchingOrder(false);
    }, 400);
  }

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performOrderSearch(trackingInputId);
  };

  // Simulate advancing the order status in real time
  const handleSimulateStatusAdvance = () => {
    if (!searchedOrder) return;
    const stages: Order['status'][] = ['confirmed', 'dispatched', 'out_for_delivery', 'delivered'];
    const currentIndex = stages.indexOf(searchedOrder.status);
    const nextIndex = (currentIndex + 1) % stages.length;
    const nextStatus = stages[nextIndex];

    const updatedSteps = searchedOrder.trackingSteps.map((step, idx) => {
      if (idx < nextIndex + 1) return { ...step, completed: true, current: idx === nextIndex + 1 && nextIndex < 3 };
      if (idx === nextIndex + 1) return { ...step, completed: false, current: true };
      return { ...step, completed: false, current: false };
    });

    setSearchedOrder({
      ...searchedOrder,
      status: nextStatus,
      trackingSteps: updatedSteps
    });
  };

  const handleScheduleReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnOrderId.trim()) return;
    setReturnScheduled(true);
  };

  const handleScheduleCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    setCallbackScheduled(true);
  };

  const copyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Status Badge Helper
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse" />
            Processing & 32-Pt Inspection
          </span>
        );
      case 'dispatched':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse" />
            Dispatched • In Transit
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/20">
            <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-ping" />
            Out for Delivery (Today)
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            Delivered Successfully
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl my-auto animate-fadeIn">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-['Space_Grotesk'] flex items-center gap-2">
                CircuitCare Support & Real-Time Order Tracking
                <span className="hidden sm:inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  Live GPS
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Track Live Logistics, 1-Year Warranty Claims & 7-Day Doorstep Returns for {selectedCity}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 transition-colors"
            id="support-modal-close-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-5 gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'tracking', label: 'Live Order Tracking', icon: Truck },
            { id: 'returns', label: '7-Day Doorstep Return', icon: RotateCcw },
            { id: 'warranty', label: '1-Year Warranty Claim', icon: ShieldCheck },
            { id: 'faq', label: 'FAQs & Policies', icon: HelpCircle },
            { id: 'callback', label: 'Request Call Back', icon: PhoneCall },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 text-xs font-bold flex items-center space-x-1.5 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
                id={`support-tab-${tab.id}`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'tracking' && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          
          {/* TAB 0: REAL-TIME ORDER TRACKING */}
          {activeTab === 'tracking' && (
            <div className="space-y-6">
              
              {/* Order Search & Filter Bar */}
              <div className="bg-slate-950/80 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-4">
                <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={trackingInputId}
                      onChange={(e) => setTrackingInputId(e.target.value)}
                      placeholder="Enter Order ID (e.g. CB-849201, CB-719302)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white uppercase tracking-wider font-semibold focus:outline-none focus:border-cyan-400"
                      id="track-order-input"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSearchingOrder}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50"
                    id="track-order-submit-btn"
                  >
                    {isSearchingOrder ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Truck className="w-4 h-4" />
                        <span>Track Status</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Quick Select Chips */}
                <div className="space-y-2 pt-1 border-t border-slate-900 text-xs">
                  <div className="text-[11px] text-slate-400 font-semibold flex items-center justify-between">
                    <span>Try Sample Live Order IDs:</span>
                    <span className="text-[10px] text-cyan-400">Click to load instantly</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'CB-849201', label: 'CB-849201 (Dispatched)', statusColor: 'border-blue-500/40 text-blue-300' },
                      { id: 'CB-719302', label: 'CB-719302 (Out for Delivery)', statusColor: 'border-cyan-500/40 text-cyan-300' },
                      { id: 'CB-401928', label: 'CB-401928 (Processing)', statusColor: 'border-amber-500/40 text-amber-300' },
                      { id: 'CB-938102', label: 'CB-938102 (Delivered)', statusColor: 'border-emerald-500/40 text-emerald-300' },
                    ].map((sample) => (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => {
                          setTrackingInputId(sample.id);
                          performOrderSearch(sample.id);
                        }}
                        className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 border ${sample.statusColor} hover:bg-slate-800 transition-colors flex items-center space-x-1`}
                      >
                        <span>{sample.label}</span>
                      </button>
                    ))}

                    {/* Show Session Orders if user made real checkouts */}
                    {orders.length > 0 && orders.map((userOrder) => (
                      <button
                        key={userOrder.id}
                        type="button"
                        onClick={() => {
                          setTrackingInputId(userOrder.id);
                          performOrderSearch(userOrder.id);
                        }}
                        className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/50 text-indigo-300 hover:bg-indigo-900 transition-colors flex items-center space-x-1"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Your Order: {userOrder.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Error state */}
              {trackingError && (
                <div className="bg-rose-950/40 border border-rose-500/40 p-4 rounded-2xl flex items-center space-x-3 text-xs text-rose-200">
                  <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  <div>{trackingError}</div>
                </div>
              )}

              {/* Live Order Display Card */}
              {searchedOrder && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Status Banner */}
                  <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-slate-400">Order ID:</span>
                          <span className="font-mono font-black text-white text-sm sm:text-base tracking-wider">
                            {searchedOrder.id}
                          </span>
                          <button
                            onClick={() => copyOrderId(searchedOrder.id)}
                            className="text-slate-400 hover:text-cyan-300 p-1"
                            title="Copy Order ID"
                          >
                            {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Placed on: {searchedOrder.createdAt} • Destination: <span className="text-slate-200 font-semibold">{searchedOrder.shippingAddress.city}</span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-2.5">
                        {getStatusBadge(searchedOrder.status)}
                        
                        {/* Simulation trigger */}
                        <button
                          onClick={handleSimulateStatusAdvance}
                          className="text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 px-2.5 py-1 rounded-lg flex items-center space-x-1"
                          title="Simulate Next Status Milestone"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Advance Demo Stage</span>
                        </button>
                      </div>
                    </div>

                    {/* ETA & Real-Time Delivery Hero */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-2xl space-y-1">
                        <div className="text-[11px] text-slate-400 font-semibold flex items-center">
                          <Clock className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
                          Estimated Delivery
                        </div>
                        <div className="font-bold text-white text-sm font-['Space_Grotesk']">
                          {searchedOrder.estimatedDeliveryDate}
                        </div>
                      </div>

                      <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-2xl space-y-1">
                        <div className="text-[11px] text-slate-400 font-semibold flex items-center">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                          Delivery Address
                        </div>
                        <div className="font-semibold text-slate-200 truncate">
                          {searchedOrder.shippingAddress.fullName}, {searchedOrder.shippingAddress.city}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          PIN: {searchedOrder.shippingAddress.pincode}
                        </div>
                      </div>

                      <div className="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-2xl space-y-1">
                        <div className="text-[11px] text-slate-400 font-semibold flex items-center">
                          <ShieldCheck className="w-3.5 h-3.5 text-purple-400 mr-1.5" />
                          Delivery Security OTP
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-white text-sm tracking-widest">
                            {showOtp ? '7392' : '••••'}
                          </span>
                          <button
                            onClick={() => setShowOtp(!showOtp)}
                            className="text-[10px] text-cyan-400 hover:underline font-semibold"
                          >
                            {showOtp ? 'Hide' : 'Reveal OTP'}
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-500">Share with agent at doorstep</p>
                      </div>
                    </div>

                  </div>

                  {/* Visual Step-by-Step Live Journey Timeline */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center">
                      <Truck className="w-4 h-4 mr-2" />
                      Live Shipment Milestones & Checkpoints
                    </h4>

                    <div className="relative pl-6 space-y-6 border-l-2 border-slate-800 ml-3 pt-1">
                      {searchedOrder.trackingSteps.map((step, idx) => {
                        const isCompleted = step.completed;
                        const isCurrent = step.current;

                        return (
                          <div key={idx} className="relative group">
                            {/* Step Indicator Dot */}
                            <div
                              className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                isCompleted
                                  ? 'bg-emerald-500 border-emerald-400 shadow-md shadow-emerald-500/40'
                                  : isCurrent
                                  ? 'bg-cyan-500 border-cyan-300 ring-4 ring-cyan-500/20 animate-pulse'
                                  : 'bg-slate-900 border-slate-700'
                              }`}
                            >
                              {isCompleted && <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />}
                            </div>

                            {/* Step Content */}
                            <div className="space-y-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <span
                                  className={`text-xs font-bold ${
                                    isCompleted
                                      ? 'text-white'
                                      : isCurrent
                                      ? 'text-cyan-300 font-extrabold'
                                      : 'text-slate-500'
                                  }`}
                                >
                                  {step.title}
                                </span>
                                <span
                                  className={`text-[10px] font-mono ${
                                    isCurrent ? 'text-cyan-400 font-bold' : 'text-slate-400'
                                  }`}
                                >
                                  {step.date}
                                </span>
                              </div>

                              {isCurrent && (
                                <div className="bg-cyan-500/10 border border-cyan-500/20 p-2.5 rounded-xl text-[11px] text-cyan-200 flex items-center space-x-2 mt-1.5">
                                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                                  <span>
                                    Current Active Checkpoint • Real-Time Barcode & Seal Verified
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ordered Items Breakdown */}
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
                    <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
                      <span className="font-bold text-white uppercase tracking-wider">
                        Package Contents ({searchedOrder.items.length} {searchedOrder.items.length === 1 ? 'Item' : 'Items'})
                      </span>
                      <span className="text-slate-400 font-mono">
                        Total: <span className="text-white font-bold">{formatINR(searchedOrder.totalAmount)}</span>
                      </span>
                    </div>

                    <div className="space-y-3">
                      {searchedOrder.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-xs"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-12 h-12 rounded-xl object-cover bg-slate-800 flex-shrink-0"
                            />
                            <div>
                              <div className="text-[10px] text-cyan-400 font-bold uppercase">
                                {item.product.brand}
                              </div>
                              <div className="font-bold text-white text-xs line-clamp-1">
                                {item.product.name}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                Qty: {item.quantity} {item.selectedStorage ? `• ${item.selectedStorage}` : ''} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="font-black text-white font-['Space_Grotesk']">
                              {formatINR(item.product.price * item.quantity)}
                            </div>
                            <span className="text-[10px] text-emerald-400 font-semibold flex items-center justify-end">
                              <ShieldCheck className="w-3 h-3 mr-0.5" /> 1-Yr Warranty
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setReturnOrderId(searchedOrder.id);
                            setActiveTab('returns');
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-3.5 py-2 rounded-xl border border-slate-700 flex items-center space-x-1.5 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Schedule Return</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveTab('warranty');
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-3.5 py-2 rounded-xl border border-slate-700 flex items-center space-x-1.5 transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Claim Warranty</span>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          alert(`Downloading official GST Tax Invoice for ${searchedOrder.id} with HSN Code & GSTIN Verified.`);
                        }}
                        className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center space-x-1"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Download GST Invoice (PDF)</span>
                      </button>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 1: 7-Day Easy Return */}
          {activeTab === 'returns' && (
            <div>
              {returnScheduled ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">Doorstep Pickup Scheduled!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Our logistics partner will visit your address in <span className="text-cyan-300 font-bold">{selectedCity}</span> on <span className="text-white font-bold">{pickupDate}</span> for visual barcode verification and instant UPI refund trigger.
                    </p>
                  </div>
                  <button
                    onClick={() => setReturnScheduled(false)}
                    className="text-xs text-cyan-400 hover:underline font-semibold"
                  >
                    Schedule Another Return
                  </button>
                </div>
              ) : (
                <form onSubmit={handleScheduleReturn} className="space-y-4 text-xs">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 p-3.5 rounded-2xl text-cyan-200 space-y-1">
                    <div className="font-bold flex items-center">
                      <Truck className="w-4 h-4 mr-1.5" />
                      Zero-Hassle Doorstep Return Policy
                    </div>
                    <p className="text-[11px] text-slate-300">
                      All products on CircuitBazaar include 7 days easy returns. The pickup agent tests power-on and physical condition on spot and triggers immediate refund.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Enter Order ID / Invoice Number *</label>
                    <input
                      type="text"
                      value={returnOrderId}
                      onChange={(e) => setReturnOrderId(e.target.value)}
                      placeholder="e.g. CB-849201"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 uppercase font-mono"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Reason for Return</label>
                    <select
                      value={returnReason}
                      onChange={(e) => setReturnReason(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option>Size did not fit wall / desk space (Verified with AR)</option>
                      <option>Performance / specs did not match expectation</option>
                      <option>Found a better price / changed preference</option>
                      <option>Outer packaging transit concern</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-300">Preferred Pickup Slot</label>
                      <select
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option>Tomorrow (10 AM - 2 PM)</option>
                        <option>Tomorrow (3 PM - 7 PM)</option>
                        <option>Day After Tomorrow (Morning)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-300">Refund Destination</label>
                      <select
                        value={refundMethod}
                        onChange={(e) => setRefundMethod(e.target.value as any)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="upi">Instant UPI Refund to Mobile Number</option>
                        <option value="original">Original Payment Gateway / Card / EMI Reversal</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg"
                  >
                    Confirm Doorstep Pickup Schedule
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: Warranty Claim */}
          {activeTab === 'warranty' && (
            <div className="space-y-4 text-xs">
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl space-y-2">
                <div className="font-bold text-emerald-300 flex items-center text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mr-2" />
                  CircuitCare Comprehensive Warranty Coverage
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Every product sold on CircuitBazaar (Brand New & Refurbished) comes with dedicated 1-Year Pan-India Doorstep Service. If an issue occurs, our authorized engineer repairs or replaces it without you having to travel to service centers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1">
                  <div className="font-bold text-white">1. File Online</div>
                  <p className="text-[11px] text-slate-400">Submit serial number & issue description</p>
                </div>
                <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1">
                  <div className="font-bold text-white">2. Home Visit</div>
                  <p className="text-[11px] text-slate-400">Technician visits within 48 hours in {selectedCity}</p>
                </div>
                <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-800 text-center space-y-1">
                  <div className="font-bold text-white">3. Resolution</div>
                  <p className="text-[11px] text-slate-400">100% OEM parts or replacement unit</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => {
                const faqKey = `faq-${idx}`;
                const isExpanded = expandedFaqId === faqKey;
                return (
                  <div
                    key={faqKey}
                    className="bg-slate-800/40 border border-slate-800 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? null : faqKey)}
                      className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-slate-200 hover:text-cyan-300 transition-colors"
                    >
                      <span>{item.question}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                    </button>
                    {isExpanded && (
                      <div className="px-3.5 pb-3.5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-2 bg-slate-900/40">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 4: Call Back */}
          {activeTab === 'callback' && (
            <div>
              {callbackScheduled ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-white">Callback Request Confirmed</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Our Senior Tech Support executive will call you on <span className="text-cyan-300 font-bold">+91 {callbackPhone}</span> within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleScheduleCallback} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Your Name</label>
                    <input
                      type="text"
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder="e.g. Vikram Singh"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Mobile Number (10 Digits)</label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all"
                  >
                    Request Instant 15-Minute Call
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
