import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy / safe Gemini SDK initialization
  let aiClient: GoogleGenAI | null = null;
  function getAI(): GoogleGenAI | null {
    if (!aiClient && process.env.GEMINI_API_KEY) {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // Helper to run Gemini requests with multi-model failover and retry on demand spikes
  async function callGeminiSafe(
    ai: GoogleGenAI,
    params: { model?: string; contents: any; config?: any }
  ): Promise<any> {
    const candidateModels = [
      params.model || 'gemini-3.7-flash',
      'gemini-flash-latest',
      'gemini-3.1-flash-lite',
    ];

    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        const result = await ai.models.generateContent({
          model: modelName,
          contents: params.contents,
          config: params.config,
        });
        return result;
      } catch (err: any) {
        lastError = err;
        const isTransient =
          err?.status === 503 ||
          err?.status === 429 ||
          err?.message?.includes('high demand') ||
          err?.message?.includes('UNAVAILABLE') ||
          err?.message?.includes('RESOURCE_EXHAUSTED');

        if (isTransient) {
          // Try next model immediately
          continue;
        }
        // If it's a structural or validation error, don't retry other models
        throw err;
      }
    }

    throw lastError || new Error('All model candidates unavailable');
  }

  // 1. Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', store: 'CircuitBazaar', time: new Date().toISOString() });
  });

  // 2. AI Personalized Gadget Recommendations
  app.post('/api/ai/recommend', async (req: Request, res: Response) => {
    const { budget, category, useCase, city, preferRefurbished, specificRequirements, userCity } = req.body;
    const targetCity = userCity || city || 'Jaipur';

    // Context-aware fallback recommendations for Indian buyers
    const getFallbackRecs = (cat?: string) => {
      let ids = ['cb-phone-02', 'cb-refurb-01', 'cb-lap-01'];
      if (cat === 'smartphones') ids = ['cb-phone-02', 'cb-phone-03', 'cb-refurb-01'];
      else if (cat === 'laptops') ids = ['cb-lap-01', 'cb-lap-02', 'cb-refurb-02'];
      else if (cat === 'appliances') ids = ['cb-app-01', 'cb-app-02', 'cb-app-03'];
      else if (cat === 'gaming') ids = ['cb-game-01', 'cb-game-02', 'cb-lap-02'];
      else if (cat === 'wearables') ids = ['cb-wear-01', 'cb-wear-02', 'cb-refurb-03'];
      else if (cat === 'refurbished') ids = ['cb-refurb-01', 'cb-refurb-02', 'cb-refurb-03'];

      return {
        success: true,
        isAiPowered: false,
        recommendedProductIds: ids,
        reasoning: `Top verified deals with 0% EMI & fast doorstep delivery to ${targetCity}`,
        summary: `Handpicked electronics tailored for ${targetCity} with 1-Year Doorstep Warranty & 0% Downpayment EMI.`,
        topPicks: [
          {
            id: ids[0],
            reason: 'Best performance-to-price ratio with official brand warranty & 5G connectivity.',
            highlight: 'Top Value Champion'
          },
          {
            id: ids[1],
            reason: 'High customer satisfaction rating with certified diagnostic score.',
            highlight: 'Most Popular'
          }
        ],
        buyingTip: 'Use HDFC, ICICI, SBI or Bajaj Finserv cards for 0% No Cost EMI across 18,000+ Indian pincodes.'
      };
    };

    try {
      const ai = getAI();
      if (!ai) {
        return res.json(getFallbackRecs(category));
      }

      const prompt = `You are CircuitBazaar's Senior Electronics Shopping Advisor for the Indian market.
User Criteria:
- Budget: ₹${budget || 'Flexible'}
- Target Category: ${category || 'Electronics'}
- Primary Use Case: ${useCase || 'General Heavy Use'}
- User City / Tier: ${targetCity} (India)
- Refurbished Preference: ${preferRefurbished ? 'Yes, interested in saving money with certified warranty' : 'Prefers brand new or certified'}
- Specific Notes: ${specificRequirements || 'None'}

Here is our active store catalog summary:
- Samsung Galaxy S24 Ultra (cb-phone-01) - ₹119,999 (Ultra Flagship, 200MP, AI)
- iQOO Neo 9 Pro (cb-phone-02) - ₹34,999 (Snapdragon 8 Gen 2, 120W Fast Charging)
- Redmi Note 13 Pro+ (cb-phone-03) - ₹28,999 (Curved 1.5K AMOLED, IP68, 200MP)
- Apple MacBook Air M3 (cb-lap-01) - ₹124,900 (M3 chip, 18h battery, 16GB RAM)
- ASUS ROG Zephyrus G16 (cb-lap-02) - ₹189,990 (RTX 4070, Ultra 9, 240Hz OLED)
- Xiaomi Pad 6 (cb-tab-01) - ₹24,999 (Snapdragon 870, 2.8K 144Hz screen, pen support)
- LG OLED evo C4 65" 4K TV (cb-app-01) - ₹184,990 (OLED 144Hz, Alpha 9 AI Gen7)
- Samsung 415L Double Door Fridge (cb-app-02) - ₹46,990 (5-in-1 convertible, Curd Maestro, 20yr warranty)
- Bosch 8kg Front Load Washing Machine (cb-app-03) - ₹38,990 (1400 RPM, Anti-stain, EcoSilence)
- Sony PS5 Slim Disc Edition (cb-game-01) - ₹54,990 (1TB SSD, 4K 120Hz)
- Meta Quest 3 512GB VR (cb-game-02) - ₹64,990 (Mixed reality passthrough)
- Apple Watch Series 9 45mm Cellular (cb-wear-01) - ₹51,900 (ECG, Double tap)
- Ray-Ban Meta Smart Glasses (cb-wear-02) - ₹36,990 (12MP camera, AI voice, Open-ear audio)
- Certified Refurbished iPhone 14 128GB (cb-refurb-01) - ₹44,999 (Grade A+, 96% battery, 12m warranty)
- Certified Refurbished ThinkPad T14 Gen 3 (cb-refurb-02) - ₹48,990 (Grade A, i7 12th Gen, 16GB, Mil-spec)
- Certified Refurbished Sony WH-1000XM4 (cb-refurb-03) - ₹15,999 (Grade A+, ANC, 30h battery)

Respond in clean JSON with this exact structure:
{
  "reasoning": "1-line catchy headline for tech lovers in ${targetCity}",
  "summary": "Brief 1-2 sentence tailored verdict for the user",
  "recommendedProductIds": ["exact-product-id-1", "exact-product-id-2", "exact-product-id-3"],
  "topPicks": [
    {
      "id": "exact-product-id-from-catalog",
      "reason": "Why this specific gadget matches their budget & needs",
      "highlight": "Key spec standout"
    }
  ],
  "buyingTip": "Pragmatic tip for Indian buyers (e.g. EMI option, warranty verification, or tier-2 delivery)"
}`;

      const response = await callGeminiSafe(ai, {
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      const recIds = parsed.recommendedProductIds || (parsed.topPicks || []).map((p: any) => p.id);

      return res.json({
        success: true,
        isAiPowered: true,
        recommendedProductIds: Array.isArray(recIds) && recIds.length > 0 ? recIds : ['cb-phone-02', 'cb-refurb-01'],
        reasoning: parsed.reasoning || `Curated Deals for Tech Enthusiasts in ${targetCity}`,
        summary: parsed.summary || 'Top electronics selected for your preferences.',
        topPicks: parsed.topPicks || [],
        buyingTip: parsed.buyingTip || 'Avail 0% No Cost EMI on leading credit cards.'
      });
    } catch (err: any) {
      console.warn('Gemini recommend fallback activated (service temporarily busy):', err?.message || err);
      // Graceful 200 response with rich fallback data so the UI continues smoothly
      return res.json(getFallbackRecs(category));
    }
  });

  // 3. AI Shopping Assistant Chat ("CircuitBot")
  app.post('/api/ai/chat', async (req: Request, res: Response) => {
    const { message, conversationHistory, history, userCity } = req.body;
    const chatHistory = conversationHistory || history || [];
    const targetCity = userCity || 'India';

    const getFallbackChatReply = (queryText: string) => {
      const q = (queryText || '').toLowerCase();
      let reply = `CircuitBazaar delivers verified electronics with 100% brand warranty, 32-point refurbished diagnostic certification, and 0% No Cost EMI across Indian cities including ${targetCity}.`;
      let ids = ['cb-phone-02', 'cb-refurb-01', 'cb-app-01'];

      if (q.includes('phone') || q.includes('mobile') || q.includes('5g') || q.includes('camera')) {
        reply = `For smartphones, our top value champion is the **iQOO Neo 9 Pro (₹34,999)** with Snapdragon 8 Gen 2 & 120W charging. If you prefer iOS, our **Certified Refurbished iPhone 14 (₹44,999)** comes with 96% battery health and a 1-year doorstep warranty.`;
        ids = ['cb-phone-02', 'cb-refurb-01', 'cb-phone-03'];
      } else if (q.includes('laptop') || q.includes('macbook') || q.includes('work') || q.includes('code')) {
        reply = `For productivity and coding, the **Apple MacBook Air M3 (₹124,900)** offers exceptional 18-hour battery life. If you want heavy RTX gaming or AI workflows, check out the **ASUS ROG Zephyrus G16 (₹189,990)** with RTX 4070.`;
        ids = ['cb-lap-01', 'cb-lap-02', 'cb-refurb-02'];
      } else if (q.includes('tv') || q.includes('oled') || q.includes('fridge') || q.includes('appliance')) {
        reply = `For home entertainment, the **LG OLED evo C4 65" 4K TV (₹184,990)** is the undisputed reference display with infinite contrast and 144Hz refresh rate. You can also test its scale in your room using our 3D AR Try-Out tool!`;
        ids = ['cb-app-01', 'cb-app-02', 'cb-app-03'];
      } else if (q.includes('emi') || q.includes('loan') || q.includes('bajaj') || q.includes('discount')) {
        reply = `All products at CircuitBazaar support **0% No Cost EMI** up to 12 months on HDFC, ICICI, SBI, Axis, and Bajaj Finserv. You can also apply coupon **CIRCUITFIRST** at checkout for ₹1,500 off on your first order.`;
      }

      return {
        reply,
        recommendedProductIds: ids,
        suggestedFollowUps: ['Show 0% EMI plans', 'How does 32-pt refurbished warranty work?', 'Test in 3D AR room']
      };
    };

    try {
      const ai = getAI();
      if (!ai) {
        return res.json(getFallbackChatReply(message));
      }

      const systemInstruction = `You are "CircuitBot", the knowledgeable, friendly, and honest AI Electronics Shopping Assistant for CircuitBazaar (India's specialized electronics marketplace).
Key Context:
- Prices are in Indian Rupees (₹).
- User location: ${targetCity}.
- Highlight genuine brand warranties, 32-point refurbished diagnostic certifications, No Cost EMI availability (HDFC, ICICI, SBI, Bajaj Finserv), and fast 2-3 day delivery across Tier 1, Tier 2, and Tier 3 Indian cities.
- Guide users on specs (Snapdragon vs Dimensity, OLED vs QLED TV viewing distance, battery health % on refurbished models, 144Hz gaming refresh rates).
- Whenever relevant, mention specific product IDs from CircuitBazaar (e.g. cb-phone-01, cb-phone-02, cb-phone-03, cb-lap-01, cb-lap-02, cb-tab-01, cb-app-01, cb-app-02, cb-app-03, cb-game-01, cb-game-02, cb-wear-01, cb-wear-02, cb-refurb-01, cb-refurb-02, cb-refurb-03).
- Keep answers concise, helpful, and formatted with clean bullet points.
- Include a JSON list of recommendedProductIds at the end if applicable.

Output format should be valid JSON:
{
  "reply": "Your markdown formatted conversational response here",
  "recommendedProductIds": ["cb-phone-02", "cb-refurb-01"],
  "suggestedFollowUps": ["Question 1", "Question 2"]
}`;

      const conversationText = (chatHistory || [])
        .map((h: any) => `${h.sender === 'user' ? 'User' : 'CircuitBot'}: ${h.text}`)
        .join('\n') + `\nUser: ${message}`;

      const response = await callGeminiSafe(ai, {
        model: 'gemini-3.7-flash',
        contents: conversationText,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({
        reply: parsed.reply || getFallbackChatReply(message).reply,
        recommendedProductIds: parsed.recommendedProductIds || ['cb-phone-02', 'cb-refurb-01'],
        suggestedFollowUps: parsed.suggestedFollowUps || ['Show 0% EMI plans', 'Test in 3D AR room']
      });
    } catch (err: any) {
      console.warn('Gemini chat fallback activated (service temporarily busy):', err?.message || err);
      return res.json(getFallbackChatReply(message));
    }
  });

  // 4. AI AR Room & Appliance Sizing Advisor
  app.post('/api/ai/ar-advisor', async (req: Request, res: Response) => {
    try {
      const { roomLengthFeet, roomWidthFeet, productCategory, targetSize } = req.body;

      const ai = getAI();
      if (!ai) {
        return res.json({
          viewingDistanceFeet: '7.5 - 9.0 ft',
          isIdealFit: true,
          recommendation: 'For a typical room, a 55" to 65" screen creates an immersive home theater without straining eyes.',
          wallClearanceAdvice: 'Keep at least 6 inches on both sides from wall corners or curtains to ensure optimal acoustic sound bounce.'
        });
      }

      const prompt = `Provide precise sizing and viewing ergonomics for an Indian home.
Room Dimensions: ${roomLengthFeet} ft length x ${roomWidthFeet} ft width.
Product: ${productCategory} (Target dimension/size: ${targetSize}).

Calculate:
1. Optimal viewing/usage distance in feet.
2. Fit rating (Perfect / Slightly Large / Compact).
3. Wall or floor clearance guidance.
4. Lighting & ventilation advice.

Output JSON:
{
  "viewingDistanceFeet": "string range",
  "isIdealFit": boolean,
  "fitRating": "Perfect Fit" | "Slightly Large" | "Compact",
  "recommendation": "string",
  "wallClearanceAdvice": "string"
}`;

      const response = await callGeminiSafe(ai, {
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.warn('Gemini AR advisor fallback activated:', err?.message || err);
      return res.json({
        viewingDistanceFeet: '8.0 ft',
        isIdealFit: true,
        fitRating: 'Perfect Fit',
        recommendation: 'Great dimensions for optimal sound staging and crisp 4K viewing angles.',
        wallClearanceAdvice: 'Leave 4-6 inches behind for power sockets and wire concealment.'
      });
    }
  });

  // Vite Middleware Setup for dev vs production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CircuitBazaar Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
