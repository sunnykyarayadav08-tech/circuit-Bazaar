import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FlashSaleSection } from './components/FlashSaleSection';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ARTryOutModal } from './components/ARTryOutModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CircuitBot } from './components/CircuitBot';
import { PriceAlertModal } from './components/PriceAlertModal';
import { SupportModal } from './components/SupportModal';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { MobileBottomNav, MobileTab } from './components/MobileBottomNav';
import { MobileCategoryDrawer } from './components/MobileCategoryDrawer';
import { MobileStoriesBar } from './components/MobileStoriesBar';

import { PRODUCTS } from './data/products';
import { Product, CategoryId, CartItem, Order, UserAccount } from './types';
import { Sparkles, Bot, Heart, ArrowLeft, Eye, ShoppingCart, ShieldCheck, LogIn, LogOut, CheckCircle2, User, Zap } from 'lucide-react';
import { formatINR } from './utils/formatters';

export function App() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState<'home' | 'pdp' | 'wishlist' | 'blogs'>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Jaipur');
  const [mobileTab, setMobileTab] = useState<MobileTab>('home');
  const [isMobileCategoryDrawerOpen, setIsMobileCategoryDrawerOpen] = useState(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('cb_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authNotification, setAuthNotification] = useState<string | null>(null);

  // Cart & Wishlist States
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }, // OnePlus 12 5G default
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['cb-phone-02', 'cb-refurb-01']);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAiBotOpen, setIsAiBotOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportTab, setSupportTab] = useState<'tracking' | 'returns' | 'warranty' | 'faq' | 'callback'>('tracking');
  const [supportOrderId, setSupportOrderId] = useState<string>('');
  const [arModalProduct, setArModalProduct] = useState<Product | null>(null);
  const [priceAlertProduct, setPriceAlertProduct] = useState<Product | null>(null);

  // Orders History
  const [orders, setOrders] = useState<Order[]>([]);

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('cb_current_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    setAuthNotification(`Welcome back, ${user.name}! 0% EMI & Member Perks are now active.`);
    setTimeout(() => setAuthNotification(null), 5000);
    if (user.city && user.city !== selectedCity) {
      setSelectedCity(user.city);
    }
  };

  const handleSignOut = () => {
    const name = currentUser?.name || 'User';
    setCurrentUser(null);
    try {
      localStorage.removeItem('cb_current_user');
    } catch (e) {
      console.error(e);
    }
    setAuthNotification(`Signed out successfully. See you soon, ${name}!`);
    setTimeout(() => setAuthNotification(null), 4000);
  };

  const handleOpenSupport = (tab: 'tracking' | 'returns' | 'warranty' | 'faq' | 'callback' = 'tracking', orderId = '') => {
    setSupportTab(tab);
    setSupportOrderId(orderId);
    setIsSupportOpen(true);
  };

  // Personalized AI Recommendations State
  const [aiRecommendations, setAiRecommendations] = useState<Product[]>([]);
  const [aiHeadline, setAiHeadline] = useState(`Curated Deals for Tech Enthusiasts in ${selectedCity}`);
  const [loadingAi, setLoadingAi] = useState(false);

  // Fetch AI Recommendations when category or city changes
  useEffect(() => {
    async function fetchAiRecs() {
      setLoadingAi(true);
      try {
        const res = await fetch('/api/ai/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userCity: selectedCity,
            category: selectedCategory !== 'all' ? selectedCategory : undefined,
            userPreferences: ['5G', 'No Cost EMI', 'High Durability', 'Refurbished Value'],
          }),
        });
        const data = await res.json();
        if (data.recommendedProductIds && Array.isArray(data.recommendedProductIds)) {
          const matched = PRODUCTS.filter((p) => data.recommendedProductIds.includes(p.id));
          if (matched.length > 0) {
            setAiRecommendations(matched);
            if (data.reasoning) setAiHeadline(data.reasoning);
            return;
          }
        }
      } catch (e) {
        console.warn('AI recommend fallback:', e);
      } finally {
        setLoadingAi(false);
      }

      // Default fallback
      setAiRecommendations(PRODUCTS.filter((p) => p.isFlashSale || p.isRefurbished).slice(0, 3));
    }

    fetchAiRecs();
  }, [selectedCategory, selectedCity]);

  // Cart Operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleApplyCoupon = (code: string): boolean => {
    const validCodes = ['CIRCUITFIRST', 'TECHFEST500', 'TIER2BONUS'];
    if (validCodes.includes(code)) {
      setAppliedCoupon(code);
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
  };

  // Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Buy Now Flow
  const handleBuyNow = (product: Product) => {
    handleAddToCart(product, 1);
    setIsCheckoutOpen(true);
  };

  // Order Placement
  const handleOrderSuccess = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    setAppliedCoupon('');
  };

  // Select Product for PDP
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductById = (id: string) => {
    const p = PRODUCTS.find((prod) => prod.id === id);
    if (p) handleSelectProduct(p);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-cyan-500 selection:text-slate-950 w-full max-w-full overflow-x-hidden">
      
      {/* Main Navigation Header */}
      <Header
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentView !== 'home') setCurrentView('home');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        cartTotal={cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setCurrentView('wishlist')}
        onOpenAiBot={() => setIsAiBotOpen(true)}
        onOpenSupport={() => handleOpenSupport('tracking')}
        onOpenTrackOrder={() => handleOpenSupport('tracking')}
        onOpenReturnsModal={() => handleOpenSupport('returns')}
        onOpenBlog={() => setCurrentView('blogs')}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
        allProducts={PRODUCTS}
        onSelectProduct={handleSelectProduct}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />

      {/* Floating Auth Notification Toast */}
      {authNotification && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 border border-cyan-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 animate-slideIn">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-300">Account Notification</div>
            <div className="text-xs text-slate-200">{authNotification}</div>
          </div>
          <button
            onClick={() => setAuthNotification(null)}
            className="text-slate-400 hover:text-white text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 overflow-x-hidden">
        
        {/* VIEW: Product Detail Page */}
        {currentView === 'pdp' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setCurrentView('home')}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onOpenARTryOut={(p) => setArModalProduct(p)}
            selectedCity={selectedCity}
          />
        )}

        {/* VIEW: Wishlist Showcase */}
        {currentView === 'wishlist' && (
          <div className="space-y-6 animate-fadeIn pb-16">
            <div className="flex items-center justify-between">
              <div>
                <button
                  onClick={() => setCurrentView('home')}
                  className="flex items-center text-cyan-400 hover:text-cyan-300 font-bold text-xs mb-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Back to Store
                </button>
                <h2 className="text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight flex items-center">
                  <Heart className="w-6 h-6 text-rose-500 mr-2 fill-rose-500" />
                  Your Saved Gadgets & Wishlist ({wishlistIds.length})
                </h2>
              </div>
            </div>

            {wishlistIds.length === 0 ? (
              <div className="text-center py-20 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-3">
                <Heart className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="font-bold text-white text-base">Your wishlist is empty</h4>
                <p className="text-xs text-slate-400">Save gadgets by clicking the heart icon on any product card.</p>
                <button
                  onClick={() => setCurrentView('home')}
                  className="bg-cyan-500 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl"
                >
                  Explore Top Electronics
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.filter((p) => wishlistIds.includes(p.id)).map((product) => (
                  <div
                    key={product.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3"
                  >
                    <div onClick={() => handleSelectProduct(product)} className="cursor-pointer space-y-2">
                      <div className="aspect-square rounded-xl overflow-hidden bg-slate-800">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[10px] text-cyan-400 font-bold uppercase">{product.brand}</div>
                      <h4 className="text-xs font-bold text-white line-clamp-2">{product.name}</h4>
                      <div className="text-sm font-black text-white font-['Space_Grotesk']">
                        {formatINR(product.price)}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs py-2 rounded-xl flex items-center justify-center space-x-1"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                      <button
                        onClick={() => handleToggleWishlist(product)}
                        className="p-2 bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded-xl"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW: Blog & Buying Guides */}
        {currentView === 'blogs' && (
          <div className="space-y-6 animate-fadeIn pb-16">
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center text-cyan-400 hover:text-cyan-300 font-bold text-xs"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Catalog
            </button>
            <BlogSection
              products={PRODUCTS}
              onSelectProductById={handleSelectProductById}
            />
          </div>
        )}

        {/* VIEW: Home & Category Catalog */}
        {currentView === 'home' && (
          <div className="space-y-8 sm:space-y-12 pb-24 lg:pb-16">
            
            {/* Mobile App Quick Highlight Stories Reels (Mobile Only) */}
            <div className="lg:hidden w-full overflow-hidden pt-1">
              <MobileStoriesBar
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                selectedCity={selectedCity}
                onApplyCoupon={(code) => handleApplyCoupon(code)}
              />
            </div>

            {/* Hero Carousel & 5 Indian Trust Badges */}
            <HeroBanner
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              onOpenAIAdvisor={() => setIsAiBotOpen(true)}
              onOpenRefurbished={() => setSelectedCategory('refurbished')}
              onSelectProduct={handleSelectProduct}
              featuredProducts={PRODUCTS.filter((p) => p.isFlashSale || p.isRefurbished)}
            />

            {/* Front Page Sign In / Member Status Banner */}
            {!currentUser ? (
              <div className="bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border border-cyan-500/30 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center font-black flex-shrink-0 shadow-lg shadow-cyan-500/20">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-white">Join Circuit Prime for 0% EMI & Extra ₹500 Off</h3>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">New Member Special</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Sign in with Mobile OTP or Email to unlock pre-approved credit, live tracking & 7-day doorstep returns in {selectedCity}.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full sm:w-auto whitespace-nowrap bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                  id="frontpage-signin-banner-btn"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Create Free Account</span>
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black flex-shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">Signed in as {currentUser.name}</span>
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.5 rounded">
                        {currentUser.memberTier || 'Circuit Prime Member'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Delivering to: <span className="text-cyan-400 font-semibold">{currentUser.city || selectedCity}</span> | Pre-Approved EMI & 1-Year Doorstep Warranty active.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleOpenSupport('tracking')}
                    className="flex-1 sm:flex-initial text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl font-medium transition-colors"
                  >
                    Track Orders
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex-1 sm:flex-initial text-xs text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-950/50 border border-rose-800/40 px-3.5 py-2 rounded-xl font-medium transition-colors flex items-center justify-center space-x-1"
                    id="frontpage-signout-btn"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}

            {/* Flash Sale Countdown Strip */}
            <FlashSaleSection
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onOpenARTryOut={(p) => setArModalProduct(p)}
            />

            {/* AI Recommendation Engine Strip */}
            {aiRecommendations.length > 0 && (
              <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-cyan-950/50 border border-indigo-500/30 rounded-3xl p-5 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk']">
                        Personalized Recommendations (AI Agent)
                      </h3>
                      <p className="text-xs text-indigo-200/80">
                        {aiHeadline}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsAiBotOpen(true)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                  >
                    <span>Ask CircuitBot</span>
                    <Bot className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {aiRecommendations.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-3 flex items-center space-x-3 cursor-pointer transition-all hover:bg-slate-850"
                    >
                      <img src={prod.images[0]} alt={prod.name} className="w-16 h-16 rounded-xl object-cover bg-slate-800 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-cyan-400 font-bold uppercase">{prod.brand}</div>
                        <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                        <div className="flex items-baseline space-x-2 text-xs">
                          <span className="font-black text-white font-['Space_Grotesk']">{formatINR(prod.price)}</span>
                          <span className="text-[10px] text-emerald-400 font-semibold">{prod.discountPercent}% OFF</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Interactive Product Grid */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight capitalize">
                    {selectedCategory === 'all'
                      ? 'Explore All Electronics'
                      : selectedCategory === 'refurbished'
                      ? 'Certified Refurbished Electronics Hub'
                      : `${selectedCategory} Collection`}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    100% Genuine Tax Invoice, Doorstep Warranty & 0% Downpayment EMI to {selectedCity}
                  </p>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  Showing {PRODUCTS.length} Verified Products
                </div>
              </div>

              <ProductGrid
                products={PRODUCTS}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onSelectProduct={handleSelectProduct}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                onOpenARTryOut={(p) => setArModalProduct(p)}
                onOpenPriceAlert={(p) => setPriceAlertProduct(p)}
                searchQuery={searchQuery}
              />
            </div>

            {/* Tech Reviews & Buying Guides Teaser Section */}
            <div className="pt-6">
              <BlogSection
                products={PRODUCTS}
                onSelectProductById={handleSelectProductById}
              />
            </div>

          </div>
        )}

      </main>

      {/* Floating CircuitBot AI Shopping Launcher (Desktop Only, Mobile uses Center Bottom Nav Bar) */}
      {!isAiBotOpen && (
        <button
          onClick={() => setIsAiBotOpen(true)}
          className="hidden lg:flex fixed bottom-6 right-6 z-40 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-4 py-3 rounded-2xl shadow-2xl shadow-cyan-500/30 items-center space-x-2.5 transition-all hover:scale-105 active:scale-95 border border-cyan-300/40"
          id="floating-circuitbot-launcher"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="text-xs font-black tracking-wide">Ask CircuitBot AI</span>
        </button>
      )}

      {/* Mobile App Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={mobileTab}
        onSelectTab={(tab) => setMobileTab(tab)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        currentUser={currentUser}
        onOpenAiBot={() => setIsAiBotOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCategories={() => setIsMobileCategoryDrawerOpen(true)}
        onOpenOrders={() => handleOpenSupport('tracking')}
        onOpenAccount={() => {
          if (!currentUser) setIsAuthModalOpen(true);
          else handleOpenSupport('tracking');
        }}
        onGoHome={() => {
          if (currentView !== 'home') setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Mobile Categories & Account Drawer Sheet */}
      <MobileCategoryDrawer
        isOpen={isMobileCategoryDrawerOpen}
        onClose={() => setIsMobileCategoryDrawerOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentView !== 'home') setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
        selectedCity={selectedCity}
        onOpenCitySelector={() => {
          const locBtn = document.getElementById('header-location-selector');
          if (locBtn) locBtn.click();
        }}
        onOpenOrders={() => handleOpenSupport('tracking')}
        onOpenWishlist={() => setCurrentView('wishlist')}
        onOpenAIAdvisor={() => setIsAiBotOpen(true)}
      />

      {/* CircuitBot AI Floating Chat Assistant */}
      <CircuitBot
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
        onOpenARTryOut={(p) => setArModalProduct(p)}
        selectedCity={selectedCity}
        isOpen={isAiBotOpen}
        onClose={() => setIsAiBotOpen(false)}
      />

      {/* AR Try-Out Modal */}
      {arModalProduct && (
        <ARTryOutModal
          product={arModalProduct}
          onClose={() => setArModalProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onOrderSuccess={handleOrderSuccess}
        onTrackOrder={(orderId) => handleOpenSupport('tracking', orderId)}
        selectedCity={selectedCity}
        currentUser={currentUser}
      />

      {/* Sign In & Sign Up Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        selectedCity={selectedCity}
      />

      {/* Price Alert Modal */}
      {priceAlertProduct && (
        <PriceAlertModal
          product={priceAlertProduct}
          onClose={() => setPriceAlertProduct(null)}
          onSaveAlert={(id, price, contact) => {
            console.log(`Alert set for ${id} at ₹${price} for ${contact}`);
          }}
        />
      )}

      {/* Support & Returns Scheduler Modal */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        selectedCity={selectedCity}
        orders={orders}
        initialTab={supportTab}
        initialOrderId={supportOrderId}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentView !== 'home') setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupport={() => handleOpenSupport('tracking')}
        onOpenSupportTab={(tab) => handleOpenSupport(tab)}
        onOpenBlog={() => {
          setCurrentView('blogs');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
export default App;
