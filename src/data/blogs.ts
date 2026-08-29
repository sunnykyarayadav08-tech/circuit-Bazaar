import { BlogArticle } from '../types';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'guide-top-10-under-20k',
    title: 'Top 10 Gadgets Under ₹20,000 in India (2025-2026 Edition)',
    subtitle: 'From 120Hz AMOLED smartphones to ANC headphones and mechanical gaming keyboards.',
    category: 'Buying Guide',
    author: 'Devendra Joshi (Chief Tech Analyst)',
    readTime: '6 min read',
    date: '22 Feb 2025',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&auto=format&fit=crop&q=80',
    excerpt: 'Smart technology doesn’t have to burn a hole in your wallet. We rigorously benchmarked 45 gadgets across Tier 2 and Tier 3 Indian living conditions to curate the top 10 value champions under ₹20,000.',
    content: [
      'The Indian consumer electronics landscape has evolved dramatically. With 5G rollouts reaching 95% of districts, customers in tier-2 and tier-3 cities like Lucknow, Patna, Indore, and Coimbatore are demanding flagship-grade features—fast refresh rate displays, high-wattage charging, and verified brand warranties—at honest mid-range prices.',
      '1. High-Refresh 5G Smartphones: You no longer need to spend ₹50,000 for a buttery 120Hz AMOLED screen. Devices like the Redmi Note series and Poco X series now pack Sony OIS sensors and 67W-120W charging bricks directly in the box.',
      '2. Certified Refurbished Flagships: Refurbished flagships (like certified iPhones and ThinkPads) provide nearly 2x the processing muscle of new entry-level machines for the exact same budget, backed by CircuitCare 12-month warranties.',
      '3. Noise-Cancelling Audio: Active noise cancellation (ANC) with 30dB+ attenuation is now accessible under ₹4,000 to ₹15,000, making work-from-home and study sessions distraction-free.',
      '4. Smart Health Wearables: Watches equipped with optical heart sensors, SpO2 monitoring, and Bluetooth calling with loud speakers designed for bustling Indian markets.'
    ],
    featuredGadgets: ['cb-phone-03', 'cb-refurb-03', 'cb-tab-01']
  },
  {
    id: 'guide-refurbished-buying',
    title: 'Refurbished vs Brand New: How to Save 45% Safely with Certified Warranty',
    subtitle: 'Everything you need to know about 32-point diagnostics, battery health, and doorstep warranty claims.',
    category: 'Consumer Awareness',
    author: 'Ritika Sen (Hardware Diagnostics Lead)',
    readTime: '5 min read',
    date: '16 Feb 2025',
    coverImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1000&auto=format&fit=crop&q=80',
    excerpt: 'Why pay full retail markup when certified refurbished gadgets deliver 100% of the daily experience with zero risk? Learn how CircuitBazaar’s 32-point testing guarantees peace of mind.',
    content: [
      'For years, the refurbished gadget market in India suffered from unverified local repair shops and lack of standard warranty. CircuitBazaar changed this paradigm by introducing institutional 32-point diagnostics with ultrasonic cleaning and doorstep return policies.',
      'What happens in our 32-point inspection?',
      '• Battery Cycle Count & Health Check: Any phone or laptop with battery capacity below 85% is rejected or fitted with brand new certified cells.',
      '• Display Uniformity & Touch Digitzer: Laser-calibrated touch grids ensure zero dead zones, backlight bleed, or ghost touch.',
      '• Motherboard Thermal Stress: Devices run 24-hour continuous computing and graphics stress tests to guarantee zero thermal throttling.',
      '• Sanitization: UV-C sterilization chambers eliminate 99.9% of bacteria and dust particles before vacuum packaging.'
    ],
    featuredGadgets: ['cb-refurb-01', 'cb-refurb-02', 'cb-refurb-03']
  },
  {
    id: 'guide-smart-tv-sizing',
    title: 'Ultimate Smart TV Sizing Guide for Indian Living Rooms',
    subtitle: 'Should you choose 43", 55", or 65"? Calculate ideal viewing distance and ambient light requirements.',
    category: 'Home Tech',
    author: 'Vikramaditya Rao (AV Specialist)',
    readTime: '7 min read',
    date: '08 Feb 2025',
    coverImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1000&auto=format&fit=crop&q=80',
    excerpt: 'Buying the wrong TV size is the #1 cause of customer regret. Use this simple calculation and our AR room try-out visualizer to pick the perfect screen.',
    content: [
      'When picking a TV for Indian apartments or independent houses, room depth is critical:',
      '• For 6 to 7 feet viewing distance: 43-inch to 50-inch 4K TV offers optimal immersion without causing eye fatigue.',
      '• For 7.5 to 9.5 feet viewing distance: 55-inch to 65-inch OLED or QLED TV gives an authentic IMAX-like cinematic experience.',
      '• For bright Indian living rooms with wide balconies: Look for 500+ nits peak brightness or OLED with anti-reflective coating to prevent reflections during afternoon matches.',
      'Try our interactive AR Try-Out button on any product page to see the real physical dimensions projected on your actual room wall using your phone camera!'
    ],
    featuredGadgets: ['cb-app-01']
  }
];

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    category: 'Warranty & Inspection',
    question: 'How does CircuitBazaar verify 100% Genuine and Refurbished products?',
    answer: 'Every brand-new device comes sealed with official brand manufacturer warranty and authorized invoice. For Certified Refurbished electronics, each unit undergoes our rigorous 32-point hardware and software diagnostic test (battery health 85%+, motherboard stress test, screen color accuracy, camera calibration) and includes 12 months of free CircuitCare replacement warranty.'
  },
  {
    category: 'Payment & EMI',
    question: 'How do No Cost EMI and Zero Downpayment work for Tier 2/3 cities?',
    answer: 'We support instant No Cost EMI across major Indian banks (HDFC, ICICI, SBI, Axis, Kotak, Bank of Baroda) as well as Bajaj Finserv and cardless debit card EMI. The interest charge is directly deducted upfront from your purchase price, meaning you pay exactly the product price split equally over 3, 6, 9, or 12 months with zero hidden processing charges.'
  },
  {
    category: 'Delivery & Pincodes',
    question: 'What is the delivery timeline for Tier 2 and Tier 3 cities?',
    answer: 'We operate 14 regional fulfillment warehouses across India. Metro cities receive Next Day delivery. Tier 2 and Tier 3 cities (such as Jaipur, Patna, Lucknow, Indore, Bhopal, Surat, Coimbatore, Guwahati) receive delivery within 2 to 3 business days via our premium insured logistics partners with live GPS parcel tracking and OTP-verified delivery.'
  },
  {
    category: 'Returns & Pickup',
    question: 'What is the Easy Return and Doorstep Pickup policy?',
    answer: 'CircuitBazaar provides a hassle-free 7-day replacement or refund policy. If your gadget has any defect or does not match description, simply go to your Orders page, pick a convenient pickup date & 2-hour window, and our certified technician will inspect the device at your doorstep and initiate instant refund or replacement immediately.'
  },
  {
    category: 'AR Room Visualizer',
    question: 'How does the AR Try-Out feature work?',
    answer: 'The AR Try-Out tool lets you project true-to-scale 3D models of Smart TVs, Double Door Refrigerators, Washing Machines, and Laptops either directly through your camera or in preset Indian living room / kitchen dimensions to verify wall clearance, socket distance, and aesthetic fit before ordering.'
  }
];

export const FAQ_ITEMS = FAQS_DATA;

