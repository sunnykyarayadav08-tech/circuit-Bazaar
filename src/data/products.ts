import { Product } from '../types';

export const PRODUCTS_DATA: Product[] = [
  // --- SMARTPHONES ---
  {
    id: 'cb-phone-01',
    name: 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256GB)',
    brand: 'Samsung',
    category: 'smartphones',
    subcategory: 'Flagship Smartphones',
    price: 119999,
    originalPrice: 134999,
    discountPercent: 11,
    emiStartsAt: 5819,
    rating: 4.8,
    reviewCount: 3420,
    inStock: true,
    stockCount: 18,
    isFlashSale: true,
    flashSaleEndsInSeconds: 14400,
    warrantyMonths: 12,
    tierCityPopularity: 'Trending in Mumbai, Bengaluru, Jaipur & Indore',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      '200MP Quad Telephoto Camera with Galaxy AI',
      '6.8-inch QHD+ Dynamic AMOLED 2X 120Hz Flat Display',
      'Built-in S Pen Stylus with Air Gestures',
      '5000 mAh Battery with 45W Fast Charging'
    ],
    keySpecs: {
      'Display': '6.8" QHD+ Dynamic AMOLED 2X, 2600 nits',
      'Processor': 'Snapdragon 8 Gen 3 (4nm)',
      'Camera': '200MP + 50MP + 12MP + 10MP | 12MP Front',
      'Battery': '5000 mAh with 45W Super Fast 2.0',
      'OS': 'Android 14 with One UI 6.1 (7 Yrs OS Updates)'
    },
    fullSpecs: [
      {
        section: 'Performance',
        items: [
          { label: 'Chipset', value: 'Qualcomm Snapdragon 8 Gen 3 Mobile Platform' },
          { label: 'RAM', value: '12GB LPDDR5X' },
          { label: 'Internal Storage', value: '256GB UFS 4.0' },
          { label: 'Cooling System', value: '1.9x Larger Vapor Chamber' }
        ]
      },
      {
        section: 'Camera & Optics',
        items: [
          { label: 'Main Sensor', value: '200MP Wide (f/1.7, OIS, Super Quad Pixel)' },
          { label: 'Telephoto 1', value: '50MP Periscope (5x Optical, 100x Space Zoom)' },
          { label: 'Telephoto 2', value: '10MP Telephoto (3x Optical Zoom, OIS)' },
          { label: 'Ultra-Wide', value: '12MP Dual Pixel AF (120-degree FOV)' }
        ]
      }
    ],
    arModelType: 'phone',
    arDimensions: { widthCm: 7.9, heightCm: 16.2, depthCm: 0.86, diagonalInches: 6.8 },
    reviews: [
      {
        id: 'rev-1',
        userName: 'Aarav Sharma',
        userCity: 'Jaipur',
        rating: 5,
        date: '14 Feb 2025',
        title: 'Outstanding camera and battery backup!',
        comment: 'Delivered in 2 days to Jaipur with pristine packaging. S Pen makes productivity effortless and the anti-reflective screen in bright sunlight is magical.',
        verifiedPurchase: true,
        helpfulCount: 42
      },
      {
        id: 'rev-2',
        userName: 'Pooja Iyer',
        userCity: 'Pune',
        rating: 5,
        date: '28 Jan 2025',
        title: 'Zero Cost EMI approval was super smooth',
        comment: 'Got 6 months No Cost EMI with HDFC card. Galaxy AI live translation helped a lot during my business trip.',
        verifiedPurchase: true,
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'cb-phone-02',
    name: 'iQOO Neo 9 Pro 5G (Fiery Red Dual-Tone, 128GB)',
    brand: 'iQOO',
    category: 'smartphones',
    subcategory: 'Performance Mid-Range',
    price: 34999,
    originalPrice: 39999,
    discountPercent: 12,
    emiStartsAt: 1699,
    rating: 4.7,
    reviewCount: 4890,
    inStock: true,
    stockCount: 42,
    warrantyMonths: 12,
    tierCityPopularity: 'Huge demand in Patna, Surat, Lucknow & Nagpur',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Snapdragon 8 Gen 2 Flagship Chipset',
      'Supercomputing Chip Q1 for 144 FPS Gaming',
      '50MP Sony IMX920 Night Vision Camera',
      '120W FlashCharge (0 to 50% in 11 mins)',
      'Premium Vegan Leather Dual-Tone Design'
    ],
    keySpecs: {
      'Display': '6.78" 1.5K LTPO AMOLED 144Hz',
      'Processor': 'Qualcomm Snapdragon 8 Gen 2',
      'Camera': '50MP Sony IMX920 (OIS) + 8MP Ultra-Wide',
      'Battery': '5160 mAh with 120W In-Box Charger',
      'OS': 'Funtouch OS 14 based on Android 14'
    },
    fullSpecs: [
      {
        section: 'Gaming & Performance',
        items: [
          { label: 'AnTuTu Benchmark', value: 'Over 1.7 Million Score' },
          { label: 'RAM', value: '8GB + 8GB Extended RAM' },
          { label: 'Cooling', value: '6K Vapor Chamber Liquid Cooling' }
        ]
      }
    ],
    arModelType: 'phone',
    arDimensions: { widthCm: 7.5, heightCm: 16.3, depthCm: 0.83, diagonalInches: 6.78 },
    reviews: [
      {
        id: 'rev-3',
        userName: 'Rohan Verma',
        userCity: 'Lucknow',
        rating: 5,
        date: '10 Feb 2025',
        title: 'Best gaming value under 35k in India',
        comment: 'BGMI runs at stable 90-120fps with zero frame drops. 120W charger in the box is a lifesaver.',
        verifiedPurchase: true,
        helpfulCount: 88
      }
    ]
  },
  {
    id: 'cb-phone-03',
    name: 'Redmi Note 13 Pro+ 5G (Fusion Purple, 256GB)',
    brand: 'Xiaomi',
    category: 'smartphones',
    subcategory: 'Affordable Champion',
    price: 28999,
    originalPrice: 33999,
    discountPercent: 15,
    emiStartsAt: 1399,
    rating: 4.6,
    reviewCount: 7120,
    inStock: true,
    stockCount: 65,
    warrantyMonths: 12,
    tierCityPopularity: 'Top #1 Best Seller in Tier 2/3 Cities',
    images: [
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '200MP OIS Ultra-Clear Main Camera (Samsung ISOCELL HP3)',
      '3D Curved 1.5K 120Hz CrystalRes AMOLED Display',
      'IP68 Water & Dust Resistance Rating',
      '120W HyperCharge (100% in 19 minutes)',
      'MediaTek Dimensity 7200-Ultra (4nm)'
    ],
    keySpecs: {
      'Display': '6.67" 3D Curved 1.5K AMOLED 120Hz Dolby Vision',
      'Processor': 'MediaTek Dimensity 7200-Ultra 5G (4nm)',
      'Camera': '200MP OIS + 8MP Wide + 2MP Macro',
      'Battery': '5000 mAh with 120W HyperCharge',
      'Protection': 'Corning Gorilla Glass Victus + IP68'
    },
    fullSpecs: [
      {
        section: 'Design & Durability',
        items: [
          { label: 'Water Resistance', value: 'IP68 Certified up to 1.5m for 30 mins' },
          { label: 'Glass Protection', value: 'Gorilla Glass Victus front' },
          { label: 'In-Display Fingerprint', value: 'With Heart Rate Detection' }
        ]
      }
    ],
    arModelType: 'phone',
    arDimensions: { widthCm: 7.4, heightCm: 16.1, depthCm: 0.89, diagonalInches: 6.67 },
    reviews: [
      {
        id: 'rev-4',
        userName: 'Vikram Singh',
        userCity: 'Bhopal',
        rating: 5,
        date: '02 Feb 2025',
        title: 'Feels like a 60,000 rupee flagship!',
        comment: 'The curved screen and IP68 water resistance at this price point is unbelievable. CircuitBazaar 2-day delivery was spot on.',
        verifiedPurchase: true,
        helpfulCount: 54
      }
    ]
  },

  // --- LAPTOPS & TABLETS ---
  {
    id: 'cb-lap-01',
    name: 'Apple MacBook Air M3 (13.6-inch Liquid Retina, 16GB Unified Memory, 512GB SSD - Midnight)',
    brand: 'Apple',
    category: 'laptops',
    subcategory: 'Ultrabooks & Productivity',
    price: 124900,
    originalPrice: 134900,
    discountPercent: 7,
    emiStartsAt: 6050,
    rating: 4.9,
    reviewCount: 2180,
    inStock: true,
    stockCount: 14,
    warrantyMonths: 12,
    tierCityPopularity: 'Popular for developers & creators in Tier 1 & 2 cities',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Apple M3 chip with 8-core CPU and 10-core GPU',
      '18-Hour All-Day Battery Life',
      '13.6" Liquid Retina Display with 500 nits & True Tone',
      'Support for up to two external displays with lid closed',
      'MagSafe 3 Charging + Dual Thunderbolt Ports'
    ],
    keySpecs: {
      'Display': '13.6" Liquid Retina (2560x1664, 500 nits)',
      'Processor': 'Apple M3 (8-core CPU, 10-core GPU)',
      'Memory': '16GB Unified RAM',
      'Storage': '512GB High-Speed NVMe SSD',
      'Weight': '1.24 kg Ultra-Light Unibody Aluminum'
    },
    fullSpecs: [
      {
        section: 'Battery & Power',
        items: [
          { label: 'Battery Capacity', value: '52.6 Wh lithium-polymer' },
          { label: 'Battery Life', value: 'Up to 18 hours video playback' },
          { label: 'Charging', value: '35W Dual USB-C Port Compact Power Adapter' }
        ]
      }
    ],
    arModelType: 'laptop',
    arDimensions: { widthCm: 30.4, heightCm: 21.5, depthCm: 1.13, diagonalInches: 13.6 },
    reviews: [
      {
        id: 'rev-5',
        userName: 'Sneha Kulkarni',
        userCity: 'Coimbatore',
        rating: 5,
        date: '20 Jan 2025',
        title: 'Battery life is unbelievable!',
        comment: 'I code all day in VS Code and Docker, charge it once every 2 days. 16GB configuration is future proof.',
        verifiedPurchase: true,
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'cb-lap-02',
    name: 'ASUS ROG Zephyrus G16 (Intel Core Ultra 9 185H, RTX 4070 8GB, 32GB RAM, 1TB SSD, 2.5K OLED 240Hz)',
    brand: 'ASUS',
    category: 'laptops',
    subcategory: 'Gaming & AI Workstation',
    price: 189990,
    originalPrice: 219990,
    discountPercent: 14,
    emiStartsAt: 9210,
    rating: 4.8,
    reviewCount: 940,
    inStock: true,
    stockCount: 8,
    isFlashSale: true,
    flashSaleEndsInSeconds: 28800,
    warrantyMonths: 24,
    tierCityPopularity: 'Ultimate Esports powerhouse in Delhi, Chandigarh & Hyderabad',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Intel Core Ultra 9 with Intel AI Boost NPU',
      'NVIDIA GeForce RTX 4070 (105W TGP with MUX + G-Sync)',
      '16" 2.5K (2560x1600) ROG Nebula 240Hz OLED Display (0.2ms)',
      'CNC Aluminum Unibody with Slash Lighting Array',
      'ROG Intelligent Cooling with 2nd Gen Arc Flow Fans'
    ],
    keySpecs: {
      'Display': '16" 2.5K OLED 240Hz 0.2ms 100% DCI-P3 DisplayHDR 500',
      'Processor': 'Intel Core Ultra 9 185H (16 Cores, 22 Threads)',
      'Graphics': 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      'RAM': '32GB LPDDR5X 7467MHz Dual Channel',
      'Storage': '1TB PCIe 4.0 NVMe M.2 SSD'
    },
    fullSpecs: [
      {
        section: 'Display & Audio',
        items: [
          { label: 'Panel Quality', value: 'ROG Nebula OLED with Pantone Validation' },
          { label: 'Speakers', value: '6-speaker system with dual force-canceling woofers' },
          { label: 'Keyboard', value: '1-Zone RGB Backlit with 1.7mm key travel' }
        ]
      }
    ],
    arModelType: 'laptop',
    arDimensions: { widthCm: 35.4, heightCm: 24.6, depthCm: 1.49, diagonalInches: 16.0 },
    reviews: [
      {
        id: 'rev-6',
        userName: 'Aditya Mehta',
        userCity: 'Ahmedabad',
        rating: 5,
        date: '08 Feb 2025',
        title: 'OLED screen is breathtaking for Cyberpunk & Blender',
        comment: 'The slash lighting lid looks sleek in corporate meetings and destroys benchmarks at night. Extended 2-year warranty was registered instantly.',
        verifiedPurchase: true,
        helpfulCount: 62
      }
    ]
  },
  {
    id: 'cb-tab-01',
    name: 'Xiaomi Pad 6 (11-inch 2.8K 144Hz Display, Snapdragon 870, 8GB/256GB with Pen Support - Mist Blue)',
    brand: 'Xiaomi',
    category: 'laptops',
    subcategory: 'Tablets & E-Learning',
    price: 24999,
    originalPrice: 31999,
    discountPercent: 22,
    emiStartsAt: 1210,
    rating: 4.7,
    reviewCount: 5610,
    inStock: true,
    stockCount: 38,
    warrantyMonths: 12,
    tierCityPopularity: 'Top tablet for UPSC, JEE/NEET students across Tier 2/3 India',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      '11-inch 2.8K Crystal Clarity with 144Hz 7-Stage AdaptiveSync',
      'Snapdragon 870 7nm Flagship Processor',
      'Quad Speakers with Dolby Atmos & Dolby Vision',
      '8840 mAh Massive Battery with 33W Fast Charger',
      'Full Metal Unibody Design (490g Light)'
    ],
    keySpecs: {
      'Display': '11" 2.8K (2880 x 1800) 144Hz 1 Billion Colors',
      'Processor': 'Snapdragon 870 Octa-Core',
      'Memory': '8GB LPDDR5 RAM',
      'Storage': '256GB UFS 3.1',
      'Battery': '8840 mAh with 33W In-Box Fast Charger'
    },
    fullSpecs: [
      {
        section: 'Productivity',
        items: [
          { label: 'Stylus Support', value: 'Xiaomi Smart Pen 2nd Gen (4096 pressure levels)' },
          { label: 'OS', value: 'HyperOS for Pad (Split screen 4 apps)' }
        ]
      }
    ],
    arModelType: 'laptop',
    arDimensions: { widthCm: 25.4, heightCm: 16.5, depthCm: 0.65, diagonalInches: 11.0 },
    reviews: [
      {
        id: 'rev-7',
        userName: 'Tanvi Joshi',
        userCity: 'Nagpur',
        rating: 5,
        date: '05 Feb 2025',
        title: 'Lifesaver for medical college notes',
        comment: 'Screen is razor sharp, battery lasts 3 full days of PDF reading. CircuitBazaar delivered in 48 hours with zero shipping fee.',
        verifiedPurchase: true,
        helpfulCount: 47
      }
    ]
  },

  // --- HOME APPLIANCES ---
  {
    id: 'cb-app-01',
    name: 'LG OLED evo C4 65" 4K Smart TV (Self-Lit Pixels, Alpha 9 AI Gen7, Dolby Vision & Atmos, 144Hz VRR)',
    brand: 'LG',
    category: 'appliances',
    subcategory: 'Smart Living & Entertainment',
    price: 184990,
    originalPrice: 249990,
    discountPercent: 26,
    emiStartsAt: 8970,
    rating: 4.9,
    reviewCount: 1250,
    inStock: true,
    stockCount: 6,
    warrantyMonths: 36,
    tierCityPopularity: 'High demand for cricket season & gaming setups',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Self-Lighting OLED Pixels with Infinite Contrast & 100% Color Fidelity',
      'Alpha 9 AI Processor 4K Gen7 with AI Picture Pro & AI Sound Pro (9.1.2 Virtual)',
      '0.1ms Response Time, 144Hz Refresh Rate, 4x HDMI 2.1 Ports',
      'G-Sync, FreeSync Premium & Dolby Vision Gaming',
      'Free Brand Installation + 3-Year Comprehensive Panel Warranty'
    ],
    keySpecs: {
      'Screen Size': '65 Inch (164 cm) 4K Ultra HD (3840 x 2160)',
      'Display Tech': 'LG OLED evo with Brightness Booster',
      'Audio': '40W 2.2 Channel Dolby Atmos / DTS:X',
      'Operating System': 'webOS 24 with 5-Year Re:New Guarantee',
      'Ideal Room Size': '12x14 ft to 16x20 ft (Viewing distance 7.5 - 9.5 ft)'
    },
    fullSpecs: [
      {
        section: 'Smart TV Features',
        items: [
          { label: 'Voice Assistant', value: 'Built-in Alexa & Google Assistant, Apple AirPlay 2' },
          { label: 'Connectivity', value: '4x HDMI 2.1 (eARC on HDMI 2), 3x USB, Wi-Fi 6, BT 5.1' },
          { label: 'Warranty Coverage', value: '3 Years LG India Comprehensive Warranty on OLED Panel' }
        ]
      }
    ],
    arModelType: 'tv',
    arDimensions: { widthCm: 144.1, heightCm: 82.6, depthCm: 4.5, diagonalInches: 65 },
    reviews: [
      {
        id: 'rev-8',
        userName: 'Rajesh Nair',
        userCity: 'Kochi',
        rating: 5,
        date: '18 Feb 2025',
        title: 'Used the CircuitBazaar AR Try-Out tool before buying!',
        comment: 'The AR camera visualizer accurately showed me that 65 inches was the exact fit for my living room wall without blocking light. Panel arrived safely and LG technician installed next morning.',
        verifiedPurchase: true,
        helpfulCount: 79
      }
    ]
  },
  {
    id: 'cb-app-02',
    name: 'Samsung 415L 3-Star AI Inverter Double Door Refrigerator (Convertible 5-in-1, Curd Maestro, Elegant Inox)',
    brand: 'Samsung',
    category: 'appliances',
    subcategory: 'Kitchen & Refrigeration',
    price: 46990,
    originalPrice: 58990,
    discountPercent: 20,
    emiStartsAt: 2280,
    rating: 4.7,
    reviewCount: 3820,
    inStock: true,
    stockCount: 16,
    warrantyMonths: 240, // 20 years on compressor
    tierCityPopularity: 'Best-selling family refrigerator in Surat, Varanasi & Kanpur',
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Twin Cooling Plus with 5 Convertible Modes (Extra Fridge, Vacation, Home Alone, etc.)',
      'Built-in Curd Maestro for hassle-free authentic curd making',
      'SmartThings AI Energy Mode saves up to 10% extra electricity',
      'Digital Inverter Compressor with 20-Year Warranty',
      'Stabilizer Free Operation (100V - 300V)'
    ],
    keySpecs: {
      'Capacity': '415 Litres (Suitable for 4-6 Family Members)',
      'Energy Rating': '3 Star BEE Energy Certified',
      'Cooling Tech': 'Twin Cooling Plus with Multi Flow',
      'Compressor': 'Digital Inverter with 20-Year Compressor Warranty',
      'Dimensions': '67.2 x 178.5 x 66.8 cm (WxHxD)'
    },
    fullSpecs: [
      {
        section: 'Convenience & Storage',
        items: [
          { label: 'Curd Maestro Tank', value: '1.0L Hygienic food-grade container' },
          { label: 'Deodorizer', value: 'Activated Carbon Filter maintains natural aroma' },
          { label: 'Toughened Glass Shelves', value: 'Tested to hold up to 175kg weight' }
        ]
      }
    ],
    arModelType: 'fridge',
    arDimensions: { widthCm: 67.2, heightCm: 178.5, depthCm: 66.8 },
    reviews: [
      {
        id: 'rev-9',
        userName: 'Meenakshi Patel',
        userCity: 'Surat',
        rating: 5,
        date: '01 Feb 2025',
        title: 'Curd Maestro is a blessing in hot summers!',
        comment: 'Runs quiet as a whisper. The AR tool showed it fits right into our kitchen niche perfectly. 20-year compressor warranty gives huge peace of mind.',
        verifiedPurchase: true,
        helpfulCount: 65
      }
    ]
  },
  {
    id: 'cb-app-03',
    name: 'Bosch 8 kg 5 Star Inverter Touch Control Front Load Washing Machine (Anti-Tangle & Steam Anti-Stain)',
    brand: 'Bosch',
    category: 'appliances',
    subcategory: 'Laundry & Fabric Care',
    price: 38990,
    originalPrice: 49990,
    discountPercent: 22,
    emiStartsAt: 1890,
    rating: 4.8,
    reviewCount: 2910,
    inStock: true,
    stockCount: 19,
    warrantyMonths: 36, // 3 yrs full + 12 yrs motor
    tierCityPopularity: 'Popular in Chandigarh, Bengaluru, Pune & Mysore',
    images: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'EcoSilence Drive Motor with 12 Years Warranty',
      'Anti-Stain Technology cleans 4 tough Indian stains (tea, oil, blood, sweat)',
      'SpeedPerfect reduces wash cycle time by up to 65%',
      'Anti-Vibration Side Panels for ultra-quiet 53dB operation',
      'ActiveWater Plus senses load and optimizes water consumption down to the drop'
    ],
    keySpecs: {
      'Capacity': '8 kg (Ideal for 3-5 Members)',
      'Energy Efficiency': '5 Star BEE Certified 2025',
      'Max Spin Speed': '1400 RPM for Faster Drying',
      'Motor': 'Frictionless EcoSilence Inverter Drive',
      'Dimensions': '59.8 x 84.8 x 59.0 cm (WxHxD)'
    },
    fullSpecs: [
      {
        section: 'Wash Programs',
        items: [
          { label: 'Indian Wash Modes', value: 'Sari Wash, AllergyPlus, Daily Wash, Wool, Quick 15/30' },
          { label: 'Heater Option', value: 'Up to 90°C Hot Wash for Germ Disinfection' }
        ]
      }
    ],
    arModelType: 'washing-machine',
    arDimensions: { widthCm: 59.8, heightCm: 84.8, depthCm: 59.0 },
    reviews: [
      {
        id: 'rev-10',
        userName: 'Sunil Rao',
        userCity: 'Mysore',
        rating: 5,
        date: '24 Jan 2025',
        title: 'German engineering at its best',
        comment: 'Even at 1400 RPM spin speed, it barely moves or vibrates. Clothes come out nearly dry and smelling fresh.',
        verifiedPurchase: true,
        helpfulCount: 38
      }
    ]
  },

  // --- GAMING GEAR ---
  {
    id: 'cb-game-01',
    name: 'Sony PlayStation 5 Slim Disc Edition Console (1TB SSD, 4K 120Hz, HDR, DualSense Wireless Controller)',
    brand: 'Sony',
    category: 'gaming',
    subcategory: 'Consoles & VR',
    price: 54990,
    originalPrice: 59990,
    discountPercent: 8,
    emiStartsAt: 2660,
    rating: 4.9,
    reviewCount: 6810,
    inStock: true,
    stockCount: 22,
    isFlashSale: true,
    flashSaleEndsInSeconds: 18000,
    warrantyMonths: 12,
    tierCityPopularity: 'Top gaming wishlist across all Indian states',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Ultra-High Speed 1TB Custom NVMe SSD with Instant Load Times',
      'Haptic Feedback & Adaptive Triggers on DualSense Controller',
      'Ray Tracing Acceleration & Tempest 3D AudioTech',
      '4K Gaming at up to 120 FPS with 8K Output Support',
      'Sleeker 30% Smaller Footprint with Detachable Blu-ray Drive'
    ],
    keySpecs: {
      'Storage': '1TB High-Speed Custom SSD (Expandable with M.2 NVMe)',
      'Processor': 'x86-64 AMD Ryzen Zen 2 (8 Cores / 16 Threads up to 3.5GHz)',
      'GPU': 'AMD Radeon RDNA 2-based graphics engine with Ray Tracing',
      'Video Output': 'HDMI 2.1 port, supports 4K 120Hz TVs, 8K TVs, VRR',
      'Included': 'Console, DualSense Controller, HDMI 2.1 cable, Base Feet'
    },
    fullSpecs: [
      {
        section: 'Audio & Connectivity',
        items: [
          { label: '3D Audio Engine', value: 'Tempest 3D AudioTech' },
          { label: 'Ports', value: '2x Front USB-C, 2x Rear USB-A 10Gbps, Gigabit LAN' }
        ]
      }
    ],
    arModelType: 'gaming-console',
    arDimensions: { widthCm: 35.8, heightCm: 9.6, depthCm: 21.6 },
    reviews: [
      {
        id: 'rev-11',
        userName: 'Karan Saxena',
        userCity: 'Indore',
        rating: 5,
        date: '12 Feb 2025',
        title: 'Original Indian Sony Warranty invoice provided',
        comment: 'Registered on Sony Center India immediately. Spider-Man 2 in 4K 60fps with Ray Tracing is mindblowing.',
        verifiedPurchase: true,
        helpfulCount: 92
      }
    ]
  },
  {
    id: 'cb-game-02',
    name: 'Meta Quest 3 (512GB Breakthrough Mixed Reality All-in-One VR Headset with Touch Plus Controllers)',
    brand: 'Meta',
    category: 'gaming',
    subcategory: 'VR & Mixed Reality',
    price: 64990,
    originalPrice: 72990,
    discountPercent: 11,
    emiStartsAt: 3150,
    rating: 4.8,
    reviewCount: 1420,
    inStock: true,
    stockCount: 9,
    warrantyMonths: 12,
    tierCityPopularity: 'Trending with tech enthusiasts in Bangalore & Delhi NCR',
    images: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Full-Color High-Resolution Passthrough Mixed Reality',
      'Snapdragon XR2 Gen 2 Chip with 2x Graphic Processing Power',
      '4K+ Infinite Display (2064x2208 pixels per eye with Pancake Lenses)',
      'Ring-Free Touch Plus Controllers with TruTouch Haptics',
      'Spatial 3D Audio with 40% Louder Volume Range'
    ],
    keySpecs: {
      'Display': '2064x2208 per eye, 120Hz Infinite Display Pancake Optics',
      'Chipset': 'Qualcomm Snapdragon XR2 Gen 2 (8GB RAM)',
      'Storage': '512GB High-Capacity for 50+ Heavy VR Titles',
      'Battery': '2.2 - 2.9 Hours Average VR/MR Gaming Session',
      'Field of View': '110 Degrees Horizontal / 96 Degrees Vertical'
    },
    fullSpecs: [
      {
        section: 'Mixed Reality Capabilities',
        items: [
          { label: 'Passthrough Cameras', value: 'Dual RGB color cameras with depth projector' },
          { label: 'Direct Touch', value: 'Hand tracking without controllers supported' }
        ]
      }
    ],
    arModelType: 'vr-headset',
    arDimensions: { widthCm: 18.4, heightCm: 16.0, depthCm: 9.8 },
    reviews: [
      {
        id: 'rev-12',
        userName: 'Gautam Deshmukh',
        userCity: 'Mumbai',
        rating: 5,
        date: '04 Feb 2025',
        title: 'Transforming gaming and movie watching on a virtual 120 inch screen',
        comment: 'Watching 4K movies in virtual theater mode while lying on bed is unreal. Mixed reality room scanning is super accurate.',
        verifiedPurchase: true,
        helpfulCount: 51
      }
    ]
  },
  {
    id: 'cb-game-03',
    name: 'Razer Wolverine V2 Pro Wireless Pro Gaming Controller (HyperSpeed 2.4GHz, Mecha-Tactile Action Buttons)',
    brand: 'Razer',
    category: 'gaming',
    subcategory: 'Controllers & Accessories',
    price: 24999,
    originalPrice: 29999,
    discountPercent: 17,
    emiStartsAt: 1210,
    rating: 4.6,
    reviewCount: 780,
    inStock: true,
    stockCount: 15,
    warrantyMonths: 12,
    tierCityPopularity: 'Choice of Indian Esports competitive players',
    images: [
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Razer HyperSpeed Wireless 2.4GHz Ultra-Low Latency',
      'Razer Mecha-Tactile Action Buttons with 3 Million Click Lifespan',
      'HyperTrigger with Short Hair-Trigger Pull for FPS games',
      '6 Additional Remappable Buttons (4 Back Paddles + 2 Top Bumpers)',
      'Officially Licensed for PlayStation 5 and Windows PC'
    ],
    keySpecs: {
      'Connectivity': '2.4GHz Wireless USB Dongle or 3m Braided Type-C Cable',
      'Trigger Stops': 'Instant Hair Trigger Mode with slide switches',
      'D-Pad': '8-Way Microswitch Tactile D-Pad',
      'Battery Life': 'Up to 28 Hours with Chroma RGB off'
    },
    fullSpecs: [
      {
        section: 'Customization',
        items: [
          { label: 'App Configurator', value: 'Razer Controller App on iOS and Android' },
          { label: 'Interchangeable Thumbsticks', value: 'Includes tall concave & short convex caps' }
        ]
      }
    ],
    arModelType: 'gaming-console',
    arDimensions: { widthCm: 16.7, heightCm: 10.5, depthCm: 6.5 },
    reviews: [
      {
        id: 'rev-13',
        userName: 'Hardik Trivedi',
        userCity: 'Vadodara',
        rating: 5,
        date: '19 Jan 2025',
        title: 'Microswitch buttons feel like clicking a premium gaming mouse',
        comment: 'Instant edge in Call of Duty and Apex Legends. The hair triggers cut firing latency drastically.',
        verifiedPurchase: true,
        helpfulCount: 26
      }
    ]
  },

  // --- WEARABLES ---
  {
    id: 'cb-wear-01',
    name: 'Apple Watch Series 9 GPS + Cellular (45mm Midnight Aluminum with Midnight Sport Band - S/M)',
    brand: 'Apple',
    category: 'wearables',
    subcategory: 'Smartwatches',
    price: 51900,
    originalPrice: 54900,
    discountPercent: 5,
    emiStartsAt: 2510,
    rating: 4.9,
    reviewCount: 3100,
    inStock: true,
    stockCount: 20,
    warrantyMonths: 12,
    tierCityPopularity: 'Popular in Delhi NCR, Mumbai, Hyderabad & Chandigarh',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'S9 SiP Chip with Magic Double Tap Gesture Control',
      'Always-On Retina Display with up to 2000 nits Peak Brightness',
      'ECG App, Blood Oxygen, Sleep Stages & Cycle Tracking',
      'Crash Detection & Fall Detection with Emergency SOS',
      '50m Water Resistant for Swimming & Pool Workouts'
    ],
    keySpecs: {
      'Case Size': '45mm (Fits 140-220mm Wrists)',
      'Display': 'Edge-to-Edge Always-On OLED (2000 nits down to 1 nit)',
      'Connectivity': '4G LTE Cellular + Wi-Fi + Bluetooth 5.3 + Ultra Wideband 2',
      'Battery': '18 Hours Normal / 36 Hours in Low Power Mode with Fast Charge',
      'OS': 'watchOS 10 with Smart Stack Widgets'
    },
    fullSpecs: [
      {
        section: 'Health & Fitness Sensors',
        items: [
          { label: 'Cardiac', value: 'Electrical heart sensor (ECG) and 3rd-gen Optical Sensor' },
          { label: 'Temperature', value: 'Wrist temperature sensing for retrospective ovulation' }
        ]
      }
    ],
    arModelType: 'wearable',
    arDimensions: { widthCm: 3.8, heightCm: 4.5, depthCm: 1.07, diagonalInches: 1.9 },
    reviews: [
      {
        id: 'rev-14',
        userName: 'Dr. Ananya Sen',
        userCity: 'Kolkata',
        rating: 5,
        date: '11 Feb 2025',
        title: 'Double tap gesture while examining patients is super convenient',
        comment: 'Cellular setup with Airtel eSIM worked on the first try. ECG readings are accurate and heart rate spikes alerts are reliable.',
        verifiedPurchase: true,
        helpfulCount: 39
      }
    ]
  },
  {
    id: 'cb-wear-02',
    name: 'Ray-Ban Meta Smart Glasses (Wayfarer Shiny Black with Transitions G-15 Lenses, 12MP Ultra-Wide Camera & Meta AI)',
    brand: 'Ray-Ban Meta',
    category: 'wearables',
    subcategory: 'Smart Audio & AR Glasses',
    price: 36990,
    originalPrice: 42990,
    discountPercent: 14,
    emiStartsAt: 1790,
    rating: 4.8,
    reviewCount: 890,
    inStock: true,
    stockCount: 11,
    isFlashSale: true,
    flashSaleEndsInSeconds: 10800,
    warrantyMonths: 12,
    tierCityPopularity: 'Viral gadget among vloggers & tech enthusiasts in India',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Hands-Free 12MP Ultra-Wide Camera (1080p 60fps Video & Live Stream)',
      'Custom Open-Ear Discrete Speakers with Deep Bass & 5-Mic Spatial Audio',
      'Meta AI Voice Assistant: Look and Ask real-time questions',
      'Transitions Lenses adapt smoothly from indoor clear to dark sunglasses outside',
      'Charging Case delivers up to 36 hours of total portable power'
    ],
    keySpecs: {
      'Frame Style': 'Classic Wayfarer (Standard Fit 50-22)',
      'Camera': '12MP Ultra-Wide Sensor with Capture LED privacy indicator',
      'Audio': '2 Open-Ear directional speakers + 5 custom beamforming microphones',
      'Storage': '32GB Flash Memory (holds 500+ photos or 100+ 30s videos)',
      'Battery Life': '4 Hours continuous use / 36 Hours with Leather Case'
    },
    fullSpecs: [
      {
        section: 'Smart Features',
        items: [
          { label: 'Voice Control', value: 'Hey Meta voice queries, landmark recognition & translation' },
          { label: 'Connectivity', value: 'Wi-Fi 6 + Bluetooth 5.3' },
          { label: 'Water Resistance', value: 'IPX4 Splash Resistant' }
        ]
      }
    ],
    arModelType: 'wearable',
    arDimensions: { widthCm: 14.5, heightCm: 4.8, depthCm: 15.0 },
    reviews: [
      {
        id: 'rev-15',
        userName: 'Kabir Batra',
        userCity: 'New Delhi',
        rating: 5,
        date: '27 Jan 2025',
        title: 'POV vlogging without holding a heavy camera is a game changer',
        comment: 'Open ear speakers sound so clear for phone calls while driving or cycling without blocking street traffic sound.',
        verifiedPurchase: true,
        helpfulCount: 71
      }
    ]
  },

  // --- REFURBISHED ELECTRONICS (WITH 32-POINT WARRANTY & CERTIFICATE) ---
  {
    id: 'cb-refurb-01',
    name: 'Certified Refurbished iPhone 14 (128GB - Blue) - 32-Point Quality Inspected',
    brand: 'Apple',
    category: 'refurbished',
    subcategory: 'Certified Refurbished Phones',
    price: 44999,
    originalPrice: 69900,
    discountPercent: 36,
    emiStartsAt: 2180,
    rating: 4.8,
    reviewCount: 4120,
    inStock: true,
    stockCount: 28,
    isRefurbished: true,
    refurbishedGrade: 'A+ Pristine',
    refurbishedDetails: {
      batteryHealth: '96% Tested Capacity',
      cosmeticCondition: 'Zero Scratches, Flawless Body & Screen',
      originalBox: true,
      certifiedInspectionPassed: true
    },
    warrantyMonths: 12,
    tierCityPopularity: 'Huge savings hit in Patna, Jaipur, Ranchi & Bhopal',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'CircuitCare 12-Month Replacement Warranty Included Free',
      '32-Point Hardware & Motherboard Certified Diagnostic Report',
      '96%+ Original Apple Battery Health Guaranteed',
      'A15 Bionic 5-Core GPU + Cinematic Mode 4K Dolby Vision',
      'Includes Certified MFi Fast Charging Cable & Warranty Card'
    ],
    keySpecs: {
      'Condition Grade': 'Grade A+ Pristine (Looks & Performs like brand new)',
      'Battery Health': '96% (Original OEM Battery)',
      'Inspection': 'Passed all 32 Diagnostic Sensor, Display & Mic Tests',
      'Warranty': '1-Year Full Coverage by CircuitBazaar Care Service',
      'Savings': 'Save ₹24,901 compared to brand new retail'
    },
    fullSpecs: [
      {
        section: 'Inspection Checklist',
        items: [
          { label: 'Touch & FaceID', value: 'Passed 100% (Instant Unlock)' },
          { label: 'Camera Sensor & OIS', value: 'Passed 100% (No dust/scratches)' },
          { label: 'Earpiece & Loudspeakers', value: 'Passed 100% (Stereo Decibel Test)' },
          { label: 'Water Seal Integrity', value: 'Verified Factory Sealed' }
        ]
      }
    ],
    arModelType: 'phone',
    arDimensions: { widthCm: 7.15, heightCm: 14.67, depthCm: 0.78, diagonalInches: 6.1 },
    reviews: [
      {
        id: 'rev-16',
        userName: 'Deepak Choudhary',
        userCity: 'Patna',
        rating: 5,
        date: '09 Feb 2025',
        title: 'Looks 100% brand new, saved ₹25,000!',
        comment: 'I was hesitant about refurbished, but the CircuitCare certificate and warranty seal convinced me. Not a single micro-scratch and battery health is actually 97%!',
        verifiedPurchase: true,
        helpfulCount: 114
      }
    ]
  },
  {
    id: 'cb-refurb-02',
    name: 'Certified Refurbished Lenovo ThinkPad T14 Gen 3 (Intel Core i7 12th Gen, 16GB RAM, 512GB SSD, 14" FHD IPS)',
    brand: 'Lenovo',
    category: 'refurbished',
    subcategory: 'Certified Refurbished Laptops',
    price: 48990,
    originalPrice: 112000,
    discountPercent: 56,
    emiStartsAt: 2370,
    rating: 4.9,
    reviewCount: 1840,
    inStock: true,
    stockCount: 17,
    isRefurbished: true,
    refurbishedGrade: 'A Excellent',
    refurbishedDetails: {
      batteryHealth: '92% Battery Life (5.5 hrs real backup)',
      cosmeticCondition: 'Minor invisible micro-blemish on base plate only',
      originalBox: false,
      certifiedInspectionPassed: true
    },
    warrantyMonths: 12,
    tierCityPopularity: 'Favorite corporate workhorse for remote engineers in India',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Legendary Mil-Spec 810H Military-Grade Magnesium Body',
      'Best-in-Class ThinkPad Ergonomic Spill-Resistant Keyboard with TrackPoint',
      'Intel Core i7-1260P 12-Core Processor with vPro',
      '1 Year Onsite Service Warranty with Doorstep Repair Across 18,000+ Pincodes',
      'Thunderbolt 4, Full-Size HDMI, RJ45 Gigabit Ethernet, Smart Card Reader'
    ],
    keySpecs: {
      'Condition Grade': 'Grade A (Excellent Business Condition)',
      'Processor': 'Intel Core i7-1260P (12 Cores, 16 Threads, up to 4.7GHz)',
      'Memory': '16GB DDR4 3200MHz (Upgradeable to 48GB)',
      'Storage': '512GB High-Speed M.2 NVMe PCIe SSD',
      'Original Price vs CircuitBazaar': 'Originally ₹1,12,000 → Now ₹48,990 (56% OFF)'
    },
    fullSpecs: [
      {
        section: 'Diagnostic Certification',
        items: [
          { label: 'Motherboard Stress Test', value: 'Passed 24h Heavy Load without thermal throttle' },
          { label: 'Display Backlight', value: '100% Uniformity, Zero Dead Pixels' },
          { label: 'Ports Test', value: 'All 7 I/O ports tested & sanitized' }
        ]
      }
    ],
    arModelType: 'laptop',
    arDimensions: { widthCm: 31.7, heightCm: 22.7, depthCm: 1.79, diagonalInches: 14.0 },
    reviews: [
      {
        id: 'rev-17',
        userName: 'Praveen Nambiar',
        userCity: 'Thrissur',
        rating: 5,
        date: '15 Jan 2025',
        title: 'Incredible value for coding and Linux dev',
        comment: 'Installed Ubuntu alongside Windows 11 Pro. Keyboard travel is supreme, and saving ₹60,000 is insane.',
        verifiedPurchase: true,
        helpfulCount: 58
      }
    ]
  },
  {
    id: 'cb-refurb-03',
    name: 'Certified Refurbished Sony WH-1000XM4 Noise Cancelling Headphones (Silver, 30-Hr Battery, Multipoint)',
    brand: 'Sony',
    category: 'refurbished',
    subcategory: 'Refurbished Audio',
    price: 15999,
    originalPrice: 29990,
    discountPercent: 47,
    emiStartsAt: 775,
    rating: 4.8,
    reviewCount: 3200,
    inStock: true,
    stockCount: 24,
    isRefurbished: true,
    refurbishedGrade: 'A+ Pristine',
    refurbishedDetails: {
      batteryHealth: '98% Tested Battery (29+ Hours ANC Playback)',
      cosmeticCondition: 'Brand New Replacement Memory Foam Ear Cushions Included',
      originalBox: true,
      certifiedInspectionPassed: true
    },
    warrantyMonths: 12,
    tierCityPopularity: 'Best ANC deal under ₹16k in India',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ],
    highlights: [
      'Industry-Leading Dual Noise Sensor ANC with HD QN1 Processor',
      'Brand New Sanitized Hygienic Protein Leather Ear Pads Installed',
      'LDAC Hi-Res Audio Wireless & DSEE Extreme AI Upscaling',
      'Multipoint Connection (Switch seamlessly between Phone & Laptop)',
      'Quick Charge: 10 mins charge delivers 5 hours of music'
    ],
    keySpecs: {
      'Condition': 'Grade A+ Pristine with New Cushions & Original Hard Travel Case',
      'Battery Health': '98% Tested (29+ hrs ANC on)',
      'Audio Driver': '40mm Dome Type with Liquid Crystal Polymer Diaphragm',
      'Warranty': '1-Year CircuitCare Replacement Assurance'
    },
    fullSpecs: [
      {
        section: 'Quality Assurance',
        items: [
          { label: 'Acoustic Frequency Balance', value: 'Calibrated on Audio Precision Test Bench' },
          { label: 'Sanitization', value: 'Hospital-grade UV-C Sterilized & Sealed' }
        ]
      }
    ],
    arModelType: 'wearable',
    arDimensions: { widthCm: 18.0, heightCm: 20.0, depthCm: 7.5 },
    reviews: [
      {
        id: 'rev-18',
        userName: 'Shreya Roy',
        userCity: 'Ranchi',
        rating: 5,
        date: '03 Feb 2025',
        title: 'Brand new ear pads and zero scratches',
        comment: 'Cuts out all traffic and ceiling fan noise while studying. Best audio purchase under 16k without doubt.',
        verifiedPurchase: true,
        helpfulCount: 44
      }
    ]
  }
];

export const PRODUCTS = PRODUCTS_DATA;

