import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  Sparkles, 
  Eye, 
  Flame, 
  ShieldCheck, 
  ArrowUpDown, 
  Search,
  Check,
  X,
  RotateCcw,
  PanelLeftClose,
  PanelLeftOpen,
  Filter,
  Star,
  Zap
} from 'lucide-react';
import { Product, CategoryId } from '../types';
import { ProductCard } from './ProductCard';
import { FilterSidebar, FilterState } from './FilterSidebar';
import { formatINR } from '../utils/formatters';

interface ProductGridProps {
  products: Product[];
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onOpenARTryOut: (product: Product) => void;
  onOpenPriceAlert: (product: Product) => void;
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenARTryOut,
  onOpenPriceAlert,
  searchQuery,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'price_low' | 'price_high' | 'rating' | 'discount' | 'urgency'>('popularity');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Compute category bounds for min/max prices
  const priceRange = useMemo(() => {
    let min = Infinity;
    let max = 0;
    products.forEach((p) => {
      if (p.price < min) min = p.price;
      if (p.price > max) max = p.price;
    });
    return {
      min: min === Infinity ? 0 : Math.floor(min / 1000) * 1000,
      max: max === 0 ? 250000 : Math.ceil(max / 1000) * 1000,
    };
  }, [products]);

  // Unified Filter State
  const [filters, setFilters] = useState<FilterState>({
    selectedBrands: [],
    minPrice: 0,
    maxPrice: priceRange.max,
    minRating: 0,
    minDiscount: 0,
    onlyLowStock: false,
    onlyRefurbished: selectedCategory === 'refurbished',
    onlyArReady: false,
    onlyFlashSale: false,
  });

  // Keep refurbished in sync if category changes from external header
  React.useEffect(() => {
    if (selectedCategory === 'refurbished') {
      setFilters((prev) => ({ ...prev, onlyRefurbished: true }));
    }
  }, [selectedCategory]);

  // Compute available active products for this category
  const activeProductsForCategory = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'refurbished') return p.isRefurbished;
      return p.category === selectedCategory;
    });
  }, [products, selectedCategory]);

  // Available brands with counts
  const availableBrandsWithCount = useMemo(() => {
    const counts: { [brand: string]: number } = {};
    activeProductsForCategory.forEach((p) => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => b.count - a.count);
  }, [activeProductsForCategory]);

  // Subcategories
  const availableSubcategories = useMemo(() => {
    const subs = new Set(activeProductsForCategory.map((p) => p.subcategory));
    return ['all', ...Array.from(subs)];
  }, [activeProductsForCategory]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // 1. Category filter
      if (selectedCategory === 'refurbished') {
        if (!p.isRefurbished) return false;
      } else if (selectedCategory !== 'all') {
        if (p.category !== selectedCategory) return false;
      }

      // 2. Subcategory filter
      if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) {
        return false;
      }

      // 3. Brands filter
      if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(p.brand)) {
        return false;
      }

      // 4. Price range filter
      if (p.price < filters.minPrice || p.price > filters.maxPrice) {
        return false;
      }

      // 5. Rating filter
      if (filters.minRating > 0 && p.rating < filters.minRating) {
        return false;
      }

      // 6. Discount filter
      if (filters.minDiscount > 0 && p.discountPercent < filters.minDiscount) {
        return false;
      }

      // 7. Low Stock Urgency filter
      if (filters.onlyLowStock && (!p.inStock || p.stockCount > 8)) {
        return false;
      }

      // 8. Refurbished filter
      if (filters.onlyRefurbished && !p.isRefurbished) {
        return false;
      }

      // 9. AR Ready filter
      if (filters.onlyArReady && !p.arModelType) {
        return false;
      }

      // 10. Flash Sale filter
      if (filters.onlyFlashSale && !p.isFlashSale) {
        return false;
      }

      // 11. Search query filter
      const cleanSearch = (searchQuery || '').trim().toLowerCase();
      if (cleanSearch) {
        const matches =
          (p?.name || '').toLowerCase().includes(cleanSearch) ||
          (p?.brand || '').toLowerCase().includes(cleanSearch) ||
          (p?.subcategory || '').toLowerCase().includes(cleanSearch) ||
          (p?.category || '').toLowerCase().includes(cleanSearch) ||
          (p?.highlights || []).some((h) => (h || '').toLowerCase().includes(cleanSearch));
        if (!matches) return false;
      }

      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      if (sortBy === 'urgency') return a.stockCount - b.stockCount; // lowest stock first
      return b.reviewCount - a.reviewCount; // popularity default
    });
  }, [
    products,
    selectedCategory,
    selectedSubcategory,
    filters,
    searchQuery,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setFilters({
      selectedBrands: [],
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      minRating: 0,
      minDiscount: 0,
      onlyLowStock: false,
      onlyRefurbished: false,
      onlyArReady: false,
      onlyFlashSale: false,
    });
    setSelectedSubcategory('all');
  };

  // Active filters count
  const activeFiltersCount = 
    filters.selectedBrands.length +
    (filters.minPrice > priceRange.min || filters.maxPrice < priceRange.max ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minDiscount > 0 ? 1 : 0) +
    (filters.onlyLowStock ? 1 : 0) +
    (filters.onlyRefurbished && selectedCategory !== 'refurbished' ? 1 : 0) +
    (filters.onlyArReady ? 1 : 0) +
    (filters.onlyFlashSale ? 1 : 0) +
    (selectedSubcategory !== 'all' ? 1 : 0);

  return (
    <div className="space-y-6">
      
      {/* Top Header Controls: Subcategories, Sidebar Toggle & Sort Bar */}
      <div className="space-y-4">
        
        {/* Subcategories Horizontal Scroll */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {availableSubcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedSubcategory === sub
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              {sub === 'all' ? 'All Subcategories' : sub}
            </button>
          ))}
        </div>

        {/* Action Toolbar: Filter Sidebar Toggle, Quick Chips, and Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/70 border border-slate-800/80 p-3 rounded-2xl">
          
          {/* Left: Collapsible Sidebar Toggle Button & Quick Toggles */}
          <div className="flex items-center space-x-2.5">
            
            {/* Desktop Sidebar Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`hidden lg:flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                isSidebarOpen
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700'
              }`}
              id="sidebar-toggle-btn"
              title={isSidebarOpen ? 'Collapse filter sidebar for wider grid' : 'Expand filter sidebar'}
            >
              {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
              <span>{isSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
              {activeFiltersCount > 0 && (
                <span className="bg-cyan-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Mobile Filter Drawer Trigger */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-400 shadow-md"
              id="mobile-filter-drawer-btn"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-slate-950 text-cyan-300 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Quick Filter: Low Stock Urgency Pill */}
            <button
              onClick={() => setFilters({ ...filters, onlyLowStock: !filters.onlyLowStock })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 border transition-all ${
                filters.onlyLowStock
                  ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-600/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Show items with low stock remaining"
            >
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Low Stock Urgency</span>
            </button>

            {/* Quick Filter: AR Ready */}
            <button
              onClick={() => setFilters({ ...filters, onlyArReady: !filters.onlyArReady })}
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                filters.onlyArReady
                  ? 'bg-indigo-600 text-white border-indigo-400'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>AR Ready</span>
            </button>
          </div>

          {/* Right: Results Count & Sort Dropdown */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-slate-400 font-medium">
              Showing <strong className="text-white">{filteredProducts.length}</strong> items
            </span>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-sm"
                id="catalog-sort-select"
              >
                <option value="popularity">🔥 Most Popular</option>
                <option value="price_low">💰 Price: Low to High</option>
                <option value="price_high">💎 Price: High to Low</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="discount">⚡ Highest Discount</option>
                <option value="urgency">📦 Low Stock First (Urgency)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Active Filter Chips Bar (Shown when any filter is active) */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
            <span className="text-xs text-slate-400 font-semibold mr-1">Active Filters:</span>
            
            {/* Brands chips */}
            {filters.selectedBrands.map((brand) => (
              <span
                key={brand}
                className="inline-flex items-center bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-lg"
              >
                Brand: {brand}
                <button
                  onClick={() =>
                    setFilters({
                      ...filters,
                      selectedBrands: filters.selectedBrands.filter((b) => b !== brand),
                    })
                  }
                  className="ml-1.5 text-cyan-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Price Chip */}
            {(filters.minPrice > priceRange.min || filters.maxPrice < priceRange.max) && (
              <span className="inline-flex items-center bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                Price: {formatINR(filters.minPrice)} - {formatINR(filters.maxPrice)}
                <button
                  onClick={() =>
                    setFilters({
                      ...filters,
                      minPrice: priceRange.min,
                      maxPrice: priceRange.max,
                    })
                  }
                  className="ml-1.5 text-cyan-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Rating Chip */}
            {filters.minRating > 0 && (
              <span className="inline-flex items-center bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                Rating: {filters.minRating}★ & above
                <button
                  onClick={() => setFilters({ ...filters, minRating: 0 })}
                  className="ml-1.5 text-emerald-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Discount Chip */}
            {filters.minDiscount > 0 && (
              <span className="inline-flex items-center bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                Discount: {filters.minDiscount}%+
                <button
                  onClick={() => setFilters({ ...filters, minDiscount: 0 })}
                  className="ml-1.5 text-cyan-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Low Stock Chip */}
            {filters.onlyLowStock && (
              <span className="inline-flex items-center bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                🔥 Low Stock Items
                <button
                  onClick={() => setFilters({ ...filters, onlyLowStock: false })}
                  className="ml-1.5 text-rose-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Refurbished Chip */}
            {filters.onlyRefurbished && selectedCategory !== 'refurbished' && (
              <span className="inline-flex items-center bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                🛡️ Certified Refurbished
                <button
                  onClick={() => setFilters({ ...filters, onlyRefurbished: false })}
                  className="ml-1.5 text-emerald-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* AR Ready Chip */}
            {filters.onlyArReady && (
              <span className="inline-flex items-center bg-indigo-950/60 border border-indigo-500/40 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-lg">
                👁️ AR Ready
                <button
                  onClick={() => setFilters({ ...filters, onlyArReady: false })}
                  className="ml-1.5 text-indigo-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Subcategory Chip */}
            {selectedSubcategory !== 'all' && (
              <span className="inline-flex items-center bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-lg">
                {selectedSubcategory}
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className="ml-1.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Clear All Button */}
            <button
              onClick={handleResetFilters}
              className="text-xs text-rose-400 hover:text-rose-300 font-bold ml-2 underline underline-offset-4"
            >
              Clear All
            </button>
          </div>
        )}

      </div>

      {/* Main Layout: Collapsible Sidebar on Left + Adaptive Product Cards Grid on Right */}
      <div className="flex items-start gap-6">
        
        {/* Desktop Collapsible Filter Sidebar */}
        {isSidebarOpen && (
          <aside className="w-72 flex-shrink-0 hidden lg:block sticky top-24">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              availableBrands={availableBrandsWithCount}
              priceRange={priceRange}
              totalFilteredCount={filteredProducts.length}
              totalCatalogCount={activeProductsForCategory.length}
            />
          </aside>
        )}

        {/* Product Cards Grid: Adapts column count based on sidebar state */}
        <div className="flex-1 min-w-0">
          <div
            className={`grid gap-2.5 sm:gap-4 md:gap-6 transition-all duration-300 ${
              isSidebarOpen
                ? 'grid-cols-2 sm:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
                onOpenARTryOut={onOpenARTryOut}
                onOpenPriceAlert={onOpenPriceAlert}
              />
            ))}
          </div>

          {/* Empty State When No Products Match Filter */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3 p-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">No electronics match your filter combination</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Try widening your price range, selecting additional brands, or clearing the active filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Mobile / Tablet Filter Slide-Over Drawer Modal */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Slide-out Sheet */}
          <div className="relative w-full max-w-sm bg-slate-900 border-l border-slate-800 h-full z-10 shadow-2xl flex flex-col">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              availableBrands={availableBrandsWithCount}
              priceRange={priceRange}
              totalFilteredCount={filteredProducts.length}
              totalCatalogCount={activeProductsForCategory.length}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};
