import React from 'react';
import { Globe2, ShieldCheck, Heart, Database, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenSupabaseConfig: () => void;
  onOpenAboutDeveloper?: (tab?: 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectTab, 
  onOpenSupabaseConfig,
  onOpenAboutDeveloper 
}) => {
  return (
    <footer className="bg-stone-900 dark:bg-black text-stone-300 border-t border-stone-800 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-emerald-100" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                Seven Wonders
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              An open architectural and historical encyclopedia documenting the New 7 Wonders of the World, the Honorary Ancient Wonder of Giza, and the classical monuments of Antiquity.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenSupabaseConfig}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-emerald-400 rounded-lg text-xs font-mono transition-colors"
              >
                <Database className="w-3.5 h-3.5" />
                PostgreSQL Supabase Connected
              </button>
            </div>
          </div>

          {/* New Wonders List */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              The Modern 7 Wonders
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>Great Wall of China (China)</li>
              <li>Petra (Jordan)</li>
              <li>Christ the Redeemer (Brazil)</li>
              <li>Machu Picchu (Peru)</li>
              <li>Chichén Itzá (Mexico)</li>
              <li>Colosseum (Italy)</li>
              <li>Taj Mahal (India)</li>
            </ul>
          </div>

          {/* Ancient Wonders List */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Ancient Wonders
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>Great Pyramid of Giza (Honorary)</li>
              <li>Hanging Gardens of Babylon</li>
              <li>Statue of Zeus at Olympia</li>
              <li>Temple of Artemis at Ephesus</li>
              <li>Mausoleum at Halicarnassus</li>
              <li>Colossus of Rhodes</li>
              <li>Lighthouse of Alexandria</li>
            </ul>
          </div>

          {/* Quick Navigation & Ad Notice */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Explore & Reference
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('comparison')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Comparison Reference Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('new-wonders')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  2007 International Vote Archives
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('bookmarks')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Saved Reader Bookmarks
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onOpenAboutDeveloper) onOpenAboutDeveloper('about');
                    else onSelectTab('about-developer');
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  About Developer (Khawaja Ahmed Azaz)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onOpenAboutDeveloper) onOpenAboutDeveloper('contact');
                    else onSelectTab('contact');
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Contact Developer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('admin')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Admin Content Studio
                </button>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-stone-500 border-t border-stone-800">
              <span className="font-semibold text-stone-400 block mb-0.5">Sponsor Notice:</span>
              Portions of side column slots are dedicated to cultural travel sponsors and partner expeditions.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-[11px] gap-4">
          <p>
            © {new Date().getFullYear()} Seven Wonders Heritage Platform. Built with Supabase PostgreSQL & W3 design standards.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Row Level Security Active
            </span>
            <span>•</span>
            <span>UNESCO & World Heritage Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
