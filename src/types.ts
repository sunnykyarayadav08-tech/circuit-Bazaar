export type CategoryId = 
  | 'all'
  | 'smartphones'
  | 'laptops'
  | 'appliances'
  | 'gaming'
  | 'wearables'
  | 'refurbished';

export type RefurbishedGrade = 'A+ Pristine' | 'A Excellent' | 'B Very Good';

export interface ProductReview {
  id: string;
  userName: string;
  userCity: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  emiStartsAt: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isFlashSale?: boolean;
  flashSaleEndsInSeconds?: number;
  isRefurbished?: boolean;
  refurbishedGrade?: RefurbishedGrade;
  refurbishedDetails?: {
    batteryHealth: string;
    cosmeticCondition: string;
    originalBox: boolean;
    certifiedInspectionPassed: boolean;
  };
  warrantyMonths: number;
  images: string[];
  highlights: string[];
  keySpecs: Record<string, string>;
  fullSpecs: {
    section: string;
    items: { label: string; value: string }[];
  }[];
  arModelType?: 'tv' | 'fridge' | 'washing-machine' | 'laptop' | 'gaming-console' | 'wearable' | 'phone' | 'vr-headset';
  arDimensions?: {
    widthCm: number;
    heightCm: number;
    depthCm: number;
    diagonalInches?: number;
  };
  tierCityPopularity?: string;
  reviews: ProductReview[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedProducts?: Product[];
  suggestedQueries?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
  selectedWarrantyPlan?: 'standard' | 'extended_1yr' | 'accidental_protection';
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
  targetPriceAlert?: number;
  notifyOnPriceDrop: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  deliveryFee: number;
  appliedCoupon?: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'upi' | 'card' | 'emi' | 'netbanking' | 'cod';
  paymentDetails?: {
    upiId?: string;
    emiBank?: string;
    emiTenureMonths?: number;
    emiMonthlyAmount?: number;
  };
  status: 'confirmed' | 'dispatched' | 'out_for_delivery' | 'delivered' | 'returned';
  createdAt: string;
  estimatedDeliveryDate: string;
  trackingSteps: {
    title: string;
    date: string;
    completed: boolean;
    current: boolean;
  }[];
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  productName: string;
  reason: string;
  pickupDate: string;
  pickupTimeSlot: string;
  refundMethod: 'original_source' | 'circuit_wallet' | 'bank_transfer';
  status: 'pickup_scheduled' | 'technician_assigned' | 'quality_check_done' | 'refund_processed';
  createdAt: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  featuredGadgets?: string[]; // Product IDs
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedProductIds?: string[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  avatar?: string;
  memberTier?: 'Circuit Prime' | 'Tech Explorer';
  joinedDate?: string;
  savedAddress?: {
    addressLine: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };
}
