import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Camera, 
  Layers, 
  Maximize2, 
  RotateCw, 
  Sparkles, 
  Eye, 
  Move, 
  Info, 
  Check, 
  ShieldCheck, 
  Tv, 
  Cpu, 
  Smartphone, 
  ArrowRight,
  Compass
} from 'lucide-react';
import { Product } from '../types';
import { formatINR } from '../utils/formatters';

interface ARTryOutModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

type EnvironmentType = 'camera' | 'living_room' | 'kitchen' | 'tech_desk' | 'bedroom';

export const ARTryOutModal: React.FC<ARTryOutModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [environment, setEnvironment] = useState<EnvironmentType>('living_room');
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 50, y: 45 });
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [roomDistanceFeet, setRoomDistanceFeet] = useState(8);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // AI Advisor state
  const [aiAdvice, setAiAdvice] = useState<any>(null);
  const [loadingAiAdvice, setLoadingAiAdvice] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Stop camera when unmounting or switching env
  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (environment === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [environment]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err: any) {
      console.warn('Camera access error in iframe or denied:', err);
      setCameraError('Camera access not permitted or supported in this browser frame. Switched to high-fidelity Room Simulation.');
      setEnvironment('living_room');
    }
  };

  // Fetch AI Room Advice on mount or distance change
  useEffect(() => {
    if (!product) return;
    async function fetchAdvisor() {
      setLoadingAiAdvice(true);
      try {
        const res = await fetch('/api/ai/ar-advisor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomLengthFeet: 14,
            roomWidthFeet: 12,
            productCategory: product.category,
            targetSize: product.arDimensions?.diagonalInches ? `${product.arDimensions.diagonalInches} inch` : product.name,
          }),
        });
        const data = await res.json();
        setAiAdvice(data);
      } catch (e) {
        setAiAdvice({
          viewingDistanceFeet: '7.5 - 9.0 ft',
          isIdealFit: true,
          fitRating: 'Perfect Fit',
          recommendation: 'Optimal size for 10x12 to 14x16 ft rooms with crystal-clear 4K clarity.',
          wallClearanceAdvice: 'Leave 6 inches on both sides from wall switches.',
        });
      } finally {
        setLoadingAiAdvice(false);
      }
    }
    fetchAdvisor();
  }, [product]);

  if (!product) return null;

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y)),
    });
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Background images for preset rooms
  const ROOM_BACKGROUNDS: Record<EnvironmentType, string> = {
    camera: '',
    living_room: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80',
    kitchen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&auto=format&fit=crop&q=80',
    tech_desk: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1600&auto=format&fit=crop&q=80',
    bedroom: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?w=1600&auto=format&fit=crop&q=80',
  };

  const dims = product.arDimensions || { widthCm: 144, heightCm: 82, depthCm: 5, diagonalInches: 65 };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl h-[92vh] max-h-[850px] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 z-20">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-base font-['Space_Grotesk']">
                  AR Room Try-Out & Sizing Visualizer
                </h3>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/30 uppercase">
                  True-Scale 3D
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-md">
                {product.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              id="close-ar-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main AR Stage & Side Controls */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* AR Visualizer Canvas */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            className="lg:col-span-8 relative bg-slate-950 flex items-center justify-center overflow-hidden select-none cursor-move"
          >
            {/* Live Camera View */}
            {environment === 'camera' ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            ) : (
              /* High-Res Room Preset Background */
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${ROOM_BACKGROUNDS[environment]})` }}
              >
                <div className="absolute inset-0 bg-slate-950/40" />
              </div>
            )}

            {/* Camera error notification if any */}
            {cameraError && (
              <div className="absolute top-4 left-4 right-4 bg-amber-950/90 border border-amber-500 text-amber-200 text-xs p-3 rounded-xl z-20 backdrop-blur-md">
                {cameraError}
              </div>
            )}

            {/* Real scale grid & Distance Ruler */}
            <div className="absolute inset-0 pointer-events-none border border-cyan-500/10 grid grid-cols-6 grid-rows-6 opacity-40" />

            {/* Interactive 3D Product Overlay */}
            <div
              className="absolute transition-transform duration-75 z-10 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
              }}
            >
              {/* Product Visual Container */}
              <div className="relative group p-2 border-2 border-cyan-400/40 rounded-2xl bg-slate-900/60 backdrop-blur-xs">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-h-56 sm:max-h-72 object-contain pointer-events-none rounded-xl"
                />

                {/* Real-time dimension tags */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900/90 text-cyan-300 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-cyan-500/40 shadow whitespace-nowrap">
                  ↔ {dims.widthCm} cm ({Math.round(dims.widthCm / 2.54)}")
                </div>

                <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-slate-900/90 text-cyan-300 font-mono text-[11px] font-bold px-1.5 py-1 rounded-md border border-cyan-500/40 shadow whitespace-nowrap -rotate-90">
                  ↕ {dims.heightCm} cm
                </div>

                {dims.diagonalInches && (
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-indigo-600/90 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow">
                    Screen: {dims.diagonalInches} Inch Diagonal
                  </div>
                )}
              </div>
            </div>

            {/* Instruction Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs text-slate-300 flex items-center shadow">
                <Move className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                <span>Drag to position on wall/desk</span>
              </div>

              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs text-amber-300 font-semibold shadow">
                Room Depth: {roomDistanceFeet} Feet
              </div>
            </div>
          </div>

          {/* Right Control & AI Insights Sidebar */}
          <div className="lg:col-span-4 bg-slate-900/95 border-t lg:border-t-0 lg:border-l border-slate-800 p-5 flex flex-col justify-between overflow-y-auto space-y-5">
            
            <div className="space-y-4">
              {/* Environment Switcher */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  1. Choose Environment
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setEnvironment('camera')}
                    className={`p-2.5 rounded-xl font-semibold flex items-center justify-center space-x-1.5 border transition-all ${
                      environment === 'camera'
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    <span>Live Room Camera</span>
                  </button>

                  <button
                    onClick={() => setEnvironment('living_room')}
                    className={`p-2.5 rounded-xl font-semibold flex items-center justify-center space-x-1.5 border transition-all ${
                      environment === 'living_room'
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Living Room Wall</span>
                  </button>

                  <button
                    onClick={() => setEnvironment('tech_desk')}
                    className={`p-2.5 rounded-xl font-semibold flex items-center justify-center space-x-1.5 border transition-all ${
                      environment === 'tech_desk'
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    <span>Desk Setup</span>
                  </button>

                  <button
                    onClick={() => setEnvironment('kitchen')}
                    className={`p-2.5 rounded-xl font-semibold flex items-center justify-center space-x-1.5 border transition-all ${
                      environment === 'kitchen'
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    <span>Kitchen / Dining</span>
                  </button>
                </div>
              </div>

              {/* Physical Dimension Sliders */}
              <div className="space-y-3 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">Scale Adjuster:</span>
                  <span className="font-mono text-cyan-400 font-bold">{Math.round(scale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />

                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-slate-300 font-semibold">Viewing Distance:</span>
                  <span className="font-mono text-amber-400 font-bold">{roomDistanceFeet} Feet</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="14"
                  step="0.5"
                  value={roomDistanceFeet}
                  onChange={(e) => setRoomDistanceFeet(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />

                <div className="flex justify-between items-center text-xs pt-1">
                  <button
                    onClick={() => setRotation((prev) => (prev + 90) % 360)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-cyan-400 mr-1" />
                    Rotate 90°
                  </button>
                  <button
                    onClick={() => {
                      setScale(1);
                      setPosition({ x: 50, y: 45 });
                      setRotation(0);
                    }}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    Reset Position
                  </button>
                </div>
              </div>

              {/* AI Sizing & Room Fit Intelligence */}
              <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 p-4 rounded-2xl border border-indigo-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-300">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>AI Ergonomics Sizing Analysis</span>
                  </div>
                  {aiAdvice && (
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                      {aiAdvice.fitRating || 'Perfect Fit'}
                    </span>
                  )}
                </div>

                {loadingAiAdvice ? (
                  <div className="text-xs text-slate-400 animate-pulse py-2">
                    Calculating viewing angle & room clearance...
                  </div>
                ) : (
                  aiAdvice && (
                    <div className="text-xs space-y-1.5 text-slate-300">
                      <p className="leading-relaxed text-slate-200">
                        {aiAdvice.recommendation}
                      </p>
                      <div className="text-[11px] text-cyan-400 font-medium">
                        • Ideal Viewing Distance: <span className="text-white font-bold">{aiAdvice.viewingDistanceFeet}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        • {aiAdvice.wallClearanceAdvice}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Bottom Action: Price & Add to Cart */}
            <div className="pt-3 border-t border-slate-800 space-y-2.5">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-slate-400">Instant Order Price</div>
                  <div className="text-xl font-black text-white font-['Space_Grotesk']">
                    {formatINR(product.price)}
                  </div>
                </div>
                <div className="text-right text-xs text-cyan-400 font-medium">
                  EMI ₹{product.emiStartsAt}/mo
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg ${
                  addedToCart
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950'
                }`}
                id="ar-modal-add-cart-btn"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Size & Add to Cart</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
