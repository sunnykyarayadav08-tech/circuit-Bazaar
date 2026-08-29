import React, { useState, useRef, useEffect } from 'react';
import { 
  Cpu, 
  Search, 
  ShoppingCart, 
  Heart, 
  Sparkles, 
  MapPin, 
  Zap, 
  ShieldCheck, 
  RotateCcw, 
  BookOpen, 
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  Truck,
  User,
  LogIn,
  LogOut,
  Package,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { CategoryId, Product, UserAccount } from '../types';
import { formatINR } from '../utils/formatters';

export interface HeaderProps {
  activeCategory?: CategoryId;
  selectedCategory?: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchTerm?: string;
  searchQuery?: string;
  onSearchChange: (term: string) => void;
  cartCount?: number;
  cartTotal?: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAIAdvisor?: () => void;
  onOpenAiBot?: () => void;
  onOpenReturnsModal?: () => void;
  onOpenBlog: () => void;
  onOpenSupport: () => void;
  onOpenTrackOrder?: () => void;
  currentUser?: UserAccount | null;
  onOpenAuthModal?: () => void;
  onSignOut?: () => void;
  allProducts?: Product[];
  onSelectProduct?: (product: Product) => void;
  selectedCity?: string;
  onCityChange?: (city: string) => void;
  onSelectCity?: (city: string) => void;
}

const INDIAN_CITIES = [
  { name: 'Mumbai', pincode: '400001', tier: 'Tier 1' },
  { name: 'New Delhi', pincode: '110001', tier: 'Tier 1' },
  { name: 'Bengaluru', pincode: '560001', tier: 'Tier 1' },
  { name: 'Jaipur', pincode: '302001', tier: 'Tier 2 (Fast 2-Day)' },
  { name: 'Patna', pincode: '800001', tier: 'Tier 2 (Fast 2-Day)' },
  { name: 'Lucknow', pincode: '226001', tier: 'Tier 2 (Fast 2-Day)' },
  { name: 'Indore', pincode: '452001', tier: 'Tier 2 (Fast 2-Day)' },
  { name: 'Surat', pincode: '395001', tier: 'Tier 2 (Fast 2-Day)' },
  { name: 'Coimbatore', pincode: '641001', tier: 'Tier 2 (Fast 2-Day)' },
  { name: 'Bhopal', pincode: '462001', tier: 'Tier 2 (Fast 2-Day)' },
  { name: 'Ranchi', pincode: '834001', tier: 'Tier 3 (3-Day Delivery)' },
  { name: 'Varanasi', pincode: '221001', tier: 'Tier 3 (3-Day Delivery)' },
];

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  selectedCategory,
  onSelectCategory,
  searchTerm: rawSearchTerm,
  searchQuery,
  onSearchChange,
  cartCount = 0,
  cartTotal = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenAIAdvisor,
  onOpenAiBot,
  onOpenReturnsModal,
  onOpenBlog,
  onOpenSupport,
  onOpenTrackOrder,
  currentUser,
  onOpenAuthModal,
  onSignOut,
  allProducts = [],
  onSelectProduct,
  selectedCity = 'Jaipur',
  onCityChange,
  onSelectCity,
}) => {
  const currentCategory = activeCategory || selectedCategory || 'all';
  const searchTerm = rawSearchTerm ?? searchQuery ?? '';
  const handleCityChange = onCityChange || onSelectCity || (() => {});
  const handleOpenAi = onOpenAIAdvisor || onOpenAiBot || (() => {});
  const handleOpenReturns = onOpenReturnsModal || onOpenSupport;

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const cleanTerm = (searchTerm || '').trim().toLowerCase();

  // Filter products for autocomplete
  const searchResults = cleanTerm.length > 1 && Array.isArray(allProducts)
    ? allProducts.filter(p => 
        (p?.name || '').toLowerCase().includes(cleanTerm) ||
        (p?.brand || '').toLowerCase().includes(cleanTerm) ||
        (p?.category || '').toLowerCase().includes(cleanTerm)
      ).slice(0, 5)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { id: 'all' as CategoryId, label: 'All Electronics' },
    { id: 'smartphones' as CategoryId, label: 'Smartphones & 5G' },
    { id: 'laptops' as CategoryId, label: 'Laptops & Tablets' },
    { id: 'appliances' as CategoryId, label: 'Home Appliances' },
    { id: 'gaming' as CategoryId, label: 'Gaming & VR' },
    { id: 'wearables' as CategoryId, label: 'Wearables & Audio' },
    { id: 'refurbished' as CategoryId, label: 'Refurbished (32-Pt Warranty)', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Banner: Trust & Tier 2/3 delivery notice */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-b border-cyan-500/20 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-cyan-400 font-semibold">
              <Zap className="w-3.5 h-3.5 mr-1 animate-pulse text-amber-400" />
              Specialized Electronics Store
            </span>
            <span className="hidden md:inline-flex items-center text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              100% Genuine Sealed Units & 32-Point Inspected Refurbished
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="hidden sm:inline flex items-center text-cyan-300 font-medium">
                  <User className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                  Hi, {currentUser.name.split(' ')[0]}
                </span>
                <span className="hidden md:inline px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                  {currentUser.memberTier || 'Prime'}
                </span>
                <button
                  onClick={onSignOut}
                  className="text-slate-400 hover:text-rose-400 transition-colors flex items-center ml-1 text-xs"
                  id="topbar-signout-btn"
                  title="Sign Out"
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center transition-colors"
                id="topbar-signin-btn"
              >
                <LogIn className="w-3.5 h-3.5 mr-1 text-cyan-400" />
                <span>Sign In / Register</span>
              </button>
            )}
            <span className="text-slate-700">|</span>
            <button 
              onClick={() => {
                if (onOpenTrackOrder) onOpenTrackOrder();
                else onOpenSupport();
              }}
              className="hover:text-cyan-400 transition-colors flex items-center font-medium"
              id="header-track-order-btn"
            >
              <Truck className="w-3.5 h-3.5 mr-1 text-cyan-400" />
              <span>Track Order</span>
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={handleOpenReturns}
              className="hover:text-cyan-400 transition-colors flex items-center"
              id="header-easy-returns-btn"
            >
              <RotateCcw className="w-3 h-3 mr-1 text-cyan-400" />
              7-Day Returns
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={onOpenBlog}
              className="hover:text-cyan-400 transition-colors flex items-center"
              id="header-guides-btn"
            >
              <BookOpen className="w-3 h-3 mr-1 text-indigo-400" />
              Guides
            </button>
            <span className="text-slate-700">|</span>
            <button 
              onClick={onOpenSupport}
              className="hover:text-cyan-400 transition-colors flex items-center"
              id="header-support-btn"
            >
              <HelpCircle className="w-3 h-3 mr-1 text-emerald-400" />
              24x7 Support
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onSelectCategory('all')} 
              className="flex items-center space-x-2.5 text-left group"
              id="circuitbazaar-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent font-['Space_Grotesk']">
                    CircuitBazaar
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/30">
                    India
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Electronics-Only Marketplace</p>
              </div>
            </button>
          </div>

          {/* Delivery Location Selector (Pincode & City) */}
          <div className="relative" ref={cityDropdownRef}>
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center space-x-1.5 sm:space-x-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs transition-colors"
              id="header-location-selector"
              title="Change Delivery City"
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
              <div className="text-left">
                <div className="text-slate-400 text-[9px] sm:text-[10px] leading-tight">Deliver to</div>
                <div className="font-bold text-slate-200 text-[11px] sm:text-xs flex items-center leading-tight">
                  <span className="truncate max-w-[65px] sm:max-w-none">{selectedCity}</span>
                  <ChevronDown className="w-3 h-3 ml-0.5 sm:ml-1 text-slate-400" />
                </div>
              </div>
            </button>

            {isCityDropdownOpen && (
              <div className="fixed inset-x-4 top-20 sm:absolute sm:inset-auto sm:left-0 sm:mt-2 sm:w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 p-2 text-xs animate-scaleUp">
                <div className="px-3 py-2 border-b border-slate-800 font-bold text-slate-200 flex items-center justify-between">
                  <span>Select Delivery City</span>
                  <button 
                    onClick={() => setIsCityDropdownOpen(false)}
                    className="sm:hidden text-slate-400 hover:text-white text-xs p-1"
                  >
                    ✕
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto py-1 space-y-0.5">
                  {INDIAN_CITIES.map(c => (
                    <button
                      key={c.name}
                      onClick={() => {
                        handleCityChange(c.name);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between hover:bg-slate-800 transition-colors ${
                        selectedCity === c.name ? 'bg-cyan-500/15 text-cyan-300 font-bold' : 'text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{c.name} ({c.pincode})</div>
                        <div className="text-[10px] text-slate-500">{c.tier}</div>
                      </div>
                      {selectedCity === c.name && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Bar with Autocomplete */}
          <div className="flex-1 max-w-xl relative" ref={searchContainerRef}>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search 5G phones, RTX laptops, OLED TVs, PS5, Refurbished..."
                className="w-full bg-slate-800/90 border border-slate-700 focus:border-cyan-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                id="main-search-input"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              {searchTerm && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="p-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Matching Gadgets
                </div>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      if (onSelectProduct) onSelectProduct(product);
                      setIsSearchFocused(false);
                    }}
                    className="w-full px-3 py-2.5 flex items-center space-x-3 hover:bg-slate-800 transition-colors text-left"
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-10 h-10 rounded-lg object-cover bg-slate-800 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-200 truncate">{product.name}</div>
                      <div className="text-xs text-cyan-400 font-semibold">{formatINR(product.price)}</div>
                    </div>
                    {product.isRefurbished && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-medium">
                        Refurbished
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons: AI Advisor, Auth/Profile, Wishlist, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* AI Advisor Button */}
            <button
              onClick={handleOpenAi}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold px-3 py-2.5 rounded-xl shadow-md shadow-cyan-600/20 transition-all hover:scale-105 active:scale-95"
              id="header-ai-advisor-btn"
            >
              <Sparkles className="w-4 h-4 animate-spin text-amber-300" style={{ animationDuration: '4s' }} />
              <span className="hidden sm:inline">AI Tech Advisor</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Auth / Account Profile Button */}
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/90 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:border-cyan-500/50"
                  id="header-account-menu-btn"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 text-slate-950 font-black text-[10px] flex items-center justify-center shadow">
                    {currentUser.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-[10px] text-slate-400 font-normal leading-tight">Account</span>
                    <span className="text-xs font-bold text-white leading-tight truncate max-w-[80px]">
                      {currentUser.name.split(' ')[0]}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 space-y-2.5 z-50 animate-fadeIn">
                    {/* User Summary */}
                    <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">{currentUser.name}</span>
                        <span className="text-[9px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.5 rounded">
                          {currentUser.memberTier || 'Circuit Prime'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
                      <div className="text-[10px] text-slate-400 flex items-center">
                        <MapPin className="w-3 h-3 text-cyan-400 mr-1" />
                        {currentUser.city}, India
                      </div>
                    </div>

                    {/* Quick Menu Links */}
                    <div className="space-y-1 text-xs">
                      <button
                        onClick={() => {
                          if (onOpenTrackOrder) onOpenTrackOrder();
                          else onOpenSupport();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 flex items-center transition-colors"
                      >
                        <Package className="w-3.5 h-3.5 mr-2 text-cyan-400" />
                        <span>My Orders & Live Tracking</span>
                      </button>

                      <button
                        onClick={() => {
                          onOpenSupport();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 flex items-center transition-colors"
                      >
                        <Shield className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                        <span>1-Year Warranty Vault</span>
                      </button>
                    </div>

                    {/* Sign Out Button */}
                    <div className="pt-2 border-t border-slate-800">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          if (onSignOut) onSignOut();
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 flex items-center font-semibold text-xs transition-colors"
                        id="header-dropdown-signout-btn"
                      >
                        <LogOut className="w-3.5 h-3.5 mr-2 text-rose-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-1.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/90 text-slate-200 hover:text-white px-3 py-2.5 rounded-xl text-xs font-semibold transition-all hover:border-cyan-500/40 active:scale-95"
                id="header-signin-btn"
              >
                <LogIn className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors"
              title="Wishlist & Price Drop Alerts"
              id="header-wishlist-btn"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-2.5 rounded-xl font-semibold text-xs shadow-lg shadow-cyan-600/20 transition-all active:scale-95"
              id="header-cart-btn"
            >
              <ShoppingCart className="w-5 h-5" />
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[10px] text-cyan-100 font-normal">Cart ({cartCount})</span>
                <span className="text-xs font-bold leading-tight">{cartTotal > 0 ? formatINR(cartTotal) : '₹0'}</span>
              </div>
              {cartCount > 0 && (
                <span className="md:hidden absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white bg-slate-800 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Category Navigation Bar */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center space-x-1.5 overflow-x-auto no-scrollbar scroll-smooth overscroll-x-contain touch-pan-x">
          {categories.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : cat.highlight
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                id={`cat-nav-${cat.id}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 space-y-3">
          {/* User Auth Bar Mobile */}
          {currentUser ? (
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{currentUser.name}</div>
                  <div className="text-[10px] text-cyan-400">{currentUser.memberTier || 'Circuit Prime'}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (onSignOut) onSignOut();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-rose-400 font-semibold px-2.5 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/40 flex items-center space-x-1"
                id="mobile-signout-btn"
              >
                <LogOut className="w-3 h-3 mr-1" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                if (onOpenAuthModal) onOpenAuthModal();
                setMobileMenuOpen(false);
              }}
              className="w-full p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow"
              id="mobile-signin-btn"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Create Account for 0% EMI</span>
            </button>
          )}

          <div className="text-xs text-slate-400 font-semibold uppercase">Delivering To</div>
          <div className="flex flex-wrap gap-2">
            {INDIAN_CITIES.slice(0, 6).map(c => (
              <button
                key={c.name}
                onClick={() => {
                  onCityChange(c.name);
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs border ${
                  selectedCity === c.name 
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' 
                    : 'border-slate-800 text-slate-400'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => { 
                if (onOpenTrackOrder) onOpenTrackOrder();
                else onOpenSupport();
                setMobileMenuOpen(false); 
              }}
              className="p-2 bg-slate-800 rounded-lg text-slate-300 flex items-center justify-center font-semibold text-cyan-300"
            >
              <Truck className="w-3.5 h-3.5 mr-1 text-cyan-400" />
              Track
            </button>
            <button
              onClick={() => { handleOpenReturns(); setMobileMenuOpen(false); }}
              className="p-2 bg-slate-800 rounded-lg text-slate-300 flex items-center justify-center"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1 text-cyan-400" />
              Returns
            </button>
            <button
              onClick={() => { onOpenBlog(); setMobileMenuOpen(false); }}
              className="p-2 bg-slate-800 rounded-lg text-slate-300 flex items-center justify-center"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-indigo-400" />
              Guides
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
