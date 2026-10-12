import React from 'react';
import { ExternalLink, Compass, ShieldCheck, Sparkles, MapPin, Award } from 'lucide-react';

interface SponsorSidebarProps {
  onSelectWonder?: (slug: string) => void;
}

export const SponsorSidebar: React.FC<SponsorSidebarProps> = ({ onSelectWonder }) => {
  return (
    <aside className="w-full space-y-6">
      {/* Sponsor / Ad Unit 1: Featured Expedition Partner */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs overflow-hidden transition-all hover:shadow-md">
        <div className="bg-stone-100 dark:bg-stone-800/80 px-4 py-2 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            Sponsored Partner
          </span>
          <span className="bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-[10px] px-1.5 py-0.5 rounded">
            Ad
          </span>
        </div>
        
        <div className="relative h-36 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1579606032824-2c67995a6ec8?auto=format&fit=crop&w=600&q=80"
            alt="Jordan Petra expedition"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3 text-white">
            <span className="text-[11px] font-bold text-amber-300 tracking-wide uppercase">Exclusive 2026 Trek</span>
            <h4 className="text-sm font-bold leading-tight">National Heritage Expeditions: Petra & Dead Sea</h4>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Walk through the Siq by candlelight with accredited resident archaeologists. Limited private group departures.
          </p>
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block">From</span>
              <span className="text-sm font-bold text-stone-900 dark:text-white">$1,890 / guest</span>
            </div>
            <a
              href="#sponsor-link"
              onClick={(e) => {
                e.preventDefault();
                alert('Thank you for checking our sponsor: National Heritage Expeditions (Sample partner link).');
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
            >
              Explore Tour
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Wonder of the Day Trivia Box */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-xl p-5 shadow-xs border border-stone-700 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <Award className="w-32 h-32 text-amber-300" />
        </div>
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          Did You Know?
        </div>
        <h4 className="text-sm font-bold mb-2 text-stone-100">
          Sticky Rice Kept the Great Wall Standing
        </h4>
        <p className="text-xs text-stone-300 leading-relaxed mb-3">
          Ming Dynasty construction crews combined slaked lime with sticky rice broth. The amylopectin reacted chemically to create a watertight, earthquake-resistant seal that still repels vegetation 600 years later.
        </p>
        {onSelectWonder && (
          <button
            onClick={() => onSelectWonder('great-wall-of-china')}
            className="text-xs text-amber-300 hover:text-amber-200 underline font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            Read the Great Wall article →
          </button>
        )}
      </div>

      {/* Sponsor / Ad Unit 2: Travel Equipment & Guidebooks */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs p-4 transition-all hover:shadow-md">
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
          <span className="font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider text-[11px] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Curated Gear
          </span>
          <span className="bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-[10px] px-1.5 py-0.5 rounded font-mono">
            AD
          </span>
        </div>
        <h4 className="text-sm font-semibold text-stone-900 dark:text-white mb-1">
          High-Altitude Trekking Pack (45L)
        </h4>
        <p className="text-xs text-stone-600 dark:text-stone-300 mb-3">
          Engineered for Machu Picchu and rugged Incan trails. Ultralight ripstop waterproof canvas with lumbar support.
        </p>
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 rounded-lg p-2.5 mb-3 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
          <span className="font-medium">Use code <span className="font-mono font-bold">WONDERS25</span></span>
          <span className="font-bold text-emerald-800 dark:text-emerald-400">Save 25%</span>
        </div>
        <button
          onClick={() => alert('Sponsor promotion applied! Check out gear at our partner showcase.')}
          className="w-full py-2 bg-stone-900 dark:bg-stone-800 hover:bg-black dark:hover:bg-stone-700 text-white text-xs font-medium rounded-lg transition-colors text-center cursor-pointer"
        >
          View Field Equipment
        </button>
      </div>

      {/* Quick Heritage Facts List */}
      <div className="bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/70 dark:border-emerald-800/40 p-4">
        <h4 className="text-xs font-bold text-emerald-950 dark:text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
          The Modern 7 Wonders List
        </h4>
        <p className="text-xs text-emerald-900/80 dark:text-emerald-200/70 mb-3 leading-relaxed">
          Chosen on July 7, 2007 (07/07/07) by more than 100 million public votes worldwide.
        </p>
        <div className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200">
          <div className="flex justify-between py-1 border-b border-emerald-200/50 dark:border-emerald-800/40">
            <span>Great Wall</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400">China</span>
          </div>
          <div className="flex justify-between py-1 border-b border-emerald-200/50 dark:border-emerald-800/40">
            <span>Petra</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400">Jordan</span>
          </div>
          <div className="flex justify-between py-1 border-b border-emerald-200/50 dark:border-emerald-800/40">
            <span>Christ the Redeemer</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400">Brazil</span>
          </div>
          <div className="flex justify-between py-1 border-b border-emerald-200/50 dark:border-emerald-800/40">
            <span>Machu Picchu</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400">Peru</span>
          </div>
          <div className="flex justify-between py-1 border-b border-emerald-200/50 dark:border-emerald-800/40">
            <span>Chichén Itzá</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400">Mexico</span>
          </div>
          <div className="flex justify-between py-1 border-b border-emerald-200/50 dark:border-emerald-800/40">
            <span>Colosseum</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400">Italy</span>
          </div>
          <div className="flex justify-between py-1 border-b border-emerald-200/50 dark:border-emerald-800/40">
            <span>Taj Mahal</span>
            <span className="font-mono text-emerald-700 dark:text-emerald-400">India</span>
          </div>
          <div className="flex justify-between py-1 pt-1.5 text-amber-900 dark:text-amber-300 font-semibold">
            <span>Great Pyramid (Giza)</span>
            <span className="font-mono text-amber-700 dark:text-amber-400">Honorary</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
