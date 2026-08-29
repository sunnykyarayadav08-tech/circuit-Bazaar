import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Search, 
  Flame, 
  ShieldCheck, 
  Eye, 
  Zap, 
  IndianRupee,
  Check
} from 'lucide-react';
import { formatINR } from '../utils/formatters';

export interface FilterState {
  selectedBrands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  minDiscount: number;
  onlyLowStock: boolean;
  onlyRefurbished: boolean;
  onlyArReady: boolean;
  onlyFlashSale: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  availableBrands: { brand: string; count: number }[];
  priceRange: { min: number; max: number };
  totalFilteredCount: number;
  totalCatalogCount: number;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableBrands,
  priceRange,
  totalFilteredCount,
  totalCatalogCount,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const [brandSearch, setBrandSearch] = useState('');
  
  // Collapsible section accordions
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    brands: true,
    price: true,
    rating: true,
    discount: false,
    special: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBrandToggle = (brand: string) => {
    const isSelected = filters.selectedBrands.includes(brand);
    const newBrands = isSelected
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];
    
    onFilterChange({
      ...filters,
      selectedBrands: newBrands,
    });
  };

  const handleSelectAllBrands = () => {
    onFilterChange({
      ...filters,
      selectedBrands: availableBrands.map((b) => b.brand),
    });
  };

  const handleClearBrands = () => {
    onFilterChange({
      ...filters,
      selectedBrands: [],
    });
  };

  const handlePricePreset = (min: number, max: number) => {
    onFilterChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const handleRatingSelect = (rating: number) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating,
    });
  };

  const handleDiscountSelect = (discount: number) => {
    onFilterChange({
      ...filters,
      minDiscount: filters.minDiscount === discount ? 0 : discount,
    });
  };

  // Filter brands based on search
  const filteredBrandsList = availableBrands.filter((b) =>
    b.brand.toLowerCase().includes(brandSearch.toLowerCase().trim())
  );

  // Calculate active filter count
  const activeFiltersCount = 
    filters.selectedBrands.length +
    (filters.minPrice > priceRange.min || filters.maxPrice < priceRange.max ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minDiscount > 0 ? 1 : 0) +
    (filters.onlyLowStock ? 1 : 0) +
    (filters.onlyRefurbished ? 1 : 0) +
    (filters.onlyArReady ? 1 : 0) +
    (filters.onlyFlashSale ? 1 : 0);

  const pricePresets = [
    { label: 'Under ₹15,000', min: priceRange.min, max: 15000 },
    { label: '₹15,000 - ₹35,000', min: 15000, max: 35000 },
    { label: '₹35,000 - ₹75,000', min: 35000, max: 75000 },
    { label: '₹75,000 - ₹1,50,000', min: 75000, max: 150000 },
    { label: 'Above ₹1,50,000', min: 150000, max: priceRange.max },
  ];

  return (
    <div className={`flex flex-col h-full ${isMobileDrawer ? 'p-5' : 'bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl'}`}>
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-sm text-white font-['Space_Grotesk']">Filters</h3>
              {activeFiltersCount > 0 && (
                <span className="bg-cyan-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              {totalFilteredCount} of {totalCatalogCount} products
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={onResetFilters}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-rose-950/30 transition-colors"
              title="Reset all applied filters"
              id="filter-reset-all-btn"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              <span>Reset</span>
            </button>
          )}

          {isMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
              title="Close filter drawer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Sections Scroll Container */}
      <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-5 divide-y divide-slate-800/80">
        
        {/* SECTION 1: Special Perks & Urgency */}
        <div className="pt-2">
          <button
            onClick={() => toggleSection('special')}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white py-1 transition-colors"
          >
            <span className="flex items-center">
              <Zap className="w-3.5 h-3.5 text-amber-400 mr-2" />
              Special Perks & Urgency
            </span>
            {openSections.special ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {openSections.special && (
            <div className="mt-3 space-y-2">
              {/* Low Stock Filter */}
              <label 
                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                  filters.onlyLowStock
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                    : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2 text-xs">
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-semibold">Low Stock Only (Urgency)</span>
                </div>
                <input
                  type="checkbox"
                  checked={filters.onlyLowStock}
                  onChange={(e) => onFilterChange({ ...filters, onlyLowStock: e.target.checked })}
                  className="rounded border-slate-700 text-rose-600 focus:ring-0 focus:ring-offset-0 bg-slate-900 cursor-pointer"
                />
              </label>

              {/* Certified Refurbished */}
              <label 
                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                  filters.onlyRefurbished
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold">Certified Refurbished</span>
                </div>
                <input
                  type="checkbox"
                  checked={filters.onlyRefurbished}
                  onChange={(e) => onFilterChange({ ...filters, onlyRefurbished: e.target.checked })}
                  className="rounded border-slate-700 text-emerald-600 focus:ring-0 focus:ring-offset-0 bg-slate-900 cursor-pointer"
                />
              </label>

              {/* AR 3D View Ready */}
              <label 
                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                  filters.onlyArReady
                    ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-300'
                    : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2 text-xs">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <span className="font-semibold">AR 3D Room Try-Out</span>
                </div>
                <input
                  type="checkbox"
                  checked={filters.onlyArReady}
                  onChange={(e) => onFilterChange({ ...filters, onlyArReady: e.target.checked })}
                  className="rounded border-slate-700 text-indigo-600 focus:ring-0 focus:ring-offset-0 bg-slate-900 cursor-pointer"
                />
              </label>

              {/* Flash Deals */}
              <label 
                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                  filters.onlyFlashSale
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2 text-xs">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold">Flash Deals with Countdown</span>
                </div>
                <input
                  type="checkbox"
                  checked={filters.onlyFlashSale}
                  onChange={(e) => onFilterChange({ ...filters, onlyFlashSale: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-600 focus:ring-0 focus:ring-offset-0 bg-slate-900 cursor-pointer"
                />
              </label>
            </div>
          )}
        </div>

        {/* SECTION 2: Brand Filter */}
        <div className="pt-4">
          <div className="flex items-center justify-between py-1">
            <button
              onClick={() => toggleSection('brands')}
              className="flex items-center text-xs font-bold text-slate-200 hover:text-white transition-colors"
            >
              <span>Brands</span>
              {filters.selectedBrands.length > 0 && (
                <span className="ml-2 text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.2 rounded">
                  {filters.selectedBrands.length}
                </span>
              )}
            </button>
            <div className="flex items-center space-x-2">
              {filters.selectedBrands.length > 0 ? (
                <button
                  onClick={handleClearBrands}
                  className="text-[10px] text-cyan-400 hover:underline font-semibold"
                >
                  Clear
                </button>
              ) : (
                <button
                  onClick={handleSelectAllBrands}
                  className="text-[10px] text-slate-400 hover:text-cyan-300"
                >
                  Select All
                </button>
              )}
              <button onClick={() => toggleSection('brands')}>
                {openSections.brands ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          </div>

          {openSections.brands && (
            <div className="mt-3 space-y-2.5">
              {/* Brand Search Bar if > 4 brands */}
              {availableBrands.length > 4 && (
                <div className="relative">
                  <input
                    type="text"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    placeholder="Search brand..."
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 pl-8"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  {brandSearch && (
                    <button
                      onClick={() => setBrandSearch('')}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}

              {/* Brand Checkboxes List */}
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {filteredBrandsList.map(({ brand, count }) => {
                  const isChecked = filters.selectedBrands.includes(brand);
                  return (
                    <label
                      key={brand}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleBrandToggle(brand)}
                          className="rounded border-slate-700 text-cyan-600 focus:ring-0 focus:ring-offset-0 bg-slate-900 cursor-pointer"
                        />
                        <span className="truncate">{brand}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono ml-2">
                        {count}
                      </span>
                    </label>
                  );
                })}
                {filteredBrandsList.length === 0 && (
                  <div className="text-xs text-slate-500 py-2 text-center">No matching brands</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: Price Range Filter */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white py-1 transition-colors"
          >
            <span className="flex items-center">
              <span>Price Range</span>
              {(filters.minPrice > priceRange.min || filters.maxPrice < priceRange.max) && (
                <span className="ml-2 text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.2 rounded">
                  Custom
                </span>
              )}
            </span>
            {openSections.price ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {openSections.price && (
            <div className="mt-3 space-y-3">
              
              {/* Range Slider for Max Price */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Up to: <strong className="text-white">{formatINR(filters.maxPrice)}</strong></span>
                  <span className="text-slate-500">{formatINR(priceRange.max)}</span>
                </div>
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  step={2000}
                  value={filters.maxPrice}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      maxPrice: Number(e.target.value),
                    })
                  }
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Min & Max Inputs */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Min (₹)</label>
                  <input
                    type="number"
                    min={priceRange.min}
                    max={filters.maxPrice}
                    value={filters.minPrice}
                    onChange={(e) =>
                      onFilterChange({
                        ...filters,
                        minPrice: Math.max(0, Number(e.target.value)),
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Max (₹)</label>
                  <input
                    type="number"
                    min={filters.minPrice}
                    max={priceRange.max}
                    value={filters.maxPrice}
                    onChange={(e) =>
                      onFilterChange({
                        ...filters,
                        maxPrice: Math.min(priceRange.max, Number(e.target.value)),
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {pricePresets.map((preset) => {
                  const isSelected = filters.minPrice === preset.min && filters.maxPrice === preset.max;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => handlePricePreset(preset.min, preset.max)}
                      className={`text-[10px] px-2 py-1 rounded-md border transition-all ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

            </div>
          )}
        </div>

        {/* SECTION 4: Customer Rating Filter */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('rating')}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white py-1 transition-colors"
          >
            <span className="flex items-center">
              <span>Customer Rating</span>
              {filters.minRating > 0 && (
                <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded">
                  {filters.minRating}★+
                </span>
              )}
            </span>
            {openSections.rating ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {openSections.rating && (
            <div className="mt-3 space-y-1.5">
              {[4.5, 4.0, 3.5, 3.0].map((rating) => {
                const isSelected = filters.minRating === rating;
                return (
                  <button
                    key={rating}
                    onClick={() => handleRatingSelect(rating)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all border ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-bold'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(rating)
                                ? 'text-amber-400 fill-amber-400'
                                : i < rating
                                ? 'text-amber-400 fill-amber-400 opacity-60'
                                : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 font-semibold">{rating} & above</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* SECTION 5: Discount Range Filter */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('discount')}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-200 hover:text-white py-1 transition-colors"
          >
            <span className="flex items-center">
              <span>Minimum Discount</span>
              {filters.minDiscount > 0 && (
                <span className="ml-2 text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.2 rounded">
                  {filters.minDiscount}%+
                </span>
              )}
            </span>
            {openSections.discount ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {openSections.discount && (
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {[10, 20, 30, 40].map((discount) => {
                const isSelected = filters.minDiscount === discount;
                return (
                  <button
                    key={discount}
                    onClick={() => handleDiscountSelect(discount)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border text-center ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {discount}% or more
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Drawer Bottom Action Bar */}
      {isMobileDrawer && (
        <div className="pt-4 border-t border-slate-800 flex items-center space-x-3">
          {activeFiltersCount > 0 && (
            <button
              onClick={onResetFilters}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs"
            >
              Reset All
            </button>
          )}
          <button
            onClick={onCloseMobileDrawer}
            className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20"
          >
            Show {totalFilteredCount} Products
          </button>
        </div>
      )}

    </div>
  );
};
