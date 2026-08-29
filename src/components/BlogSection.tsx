import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  Tag 
} from 'lucide-react';
import { BlogArticle, Product } from '../types';
import { BLOG_ARTICLES } from '../data/blogs';

interface BlogSectionProps {
  onSelectProductById: (productId: string) => void;
  products: Product[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onSelectProductById,
  products,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  if (selectedArticle) {
    return (
      <div className="space-y-6 animate-fadeIn pb-12">
        <button
          onClick={() => setSelectedArticle(null)}
          className="flex items-center text-cyan-400 hover:text-cyan-300 font-bold text-xs group"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Back to Tech Guides & Reviews
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {selectedArticle.readTime}
              </span>
              <span className="text-xs text-slate-500">• {selectedArticle.date}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk'] leading-tight">
              {selectedArticle.title}
            </h1>

            <div className="text-xs text-slate-400">
              By <span className="text-slate-200 font-semibold">{selectedArticle.author}</span> • CircuitBazaar Tech Editorial Team
            </div>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-800">
            <img
              src={selectedArticle.coverImage}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="text-slate-300 text-sm leading-relaxed space-y-4">
            {Array.isArray(selectedArticle.content) ? (
              selectedArticle.content.map((paragraph, i) => (
                <p key={i} className="leading-relaxed">{paragraph}</p>
              ))
            ) : (
              <p>{selectedArticle.content}</p>
            )}
          </div>

          {/* Related Products Mentioned */}
          {selectedArticle.featuredGadgets && selectedArticle.featuredGadgets.length > 0 && (
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Featured Electronics in this Guide:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedArticle.featuredGadgets.map((id) => {
                  const prod = products.find((p) => p.id === id);
                  if (!prod) return null;
                  return (
                    <div
                      key={id}
                      onClick={() => onSelectProductById(id)}
                      className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-3 flex items-center space-x-3 cursor-pointer transition-all hover:border-cyan-500/50"
                    >
                      <img src={prod.images[0]} alt={prod.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-cyan-400 font-bold uppercase">{prod.brand}</div>
                        <div className="text-xs font-bold text-white truncate">{prod.name}</div>
                        <div className="text-xs font-black text-white font-['Space_Grotesk']">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight flex items-center">
            <BookOpen className="w-6 h-6 text-cyan-400 mr-2.5" />
            CircuitBazaar Tech Guides & Buying Advice
          </h2>
          <p className="text-xs text-slate-400">
            Unbiased reviews, 0% EMI calculators, and expert tips for Indian consumers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BLOG_ARTICLES.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
          >
            <div>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-800 mb-4">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-sm text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                  {article.category}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
              <span>Read Full Guide</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
