import React, { useState } from 'react';
import { COMPARISON_DATA } from '../data/seedData';
import { WonderComparisonItem, BlogPost } from '../types/database';
import { Search, ExternalLink, Filter, MapPin, Globe, Sparkles } from 'lucide-react';

interface ComparisonTableProps {
  onSelectWonder: (slug: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onSelectWonder }) => {
  const [filterType, setFilterType] = useState<'All' | 'Modern' | 'Ancient' | 'Honorary'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = COMPARISON_DATA.filter((item) => {
    const matchesFilter = filterType === 'All' || item.type === filterType;
    const matchesSearch =
      item.wonder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title & Description */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Comprehensive Reference Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Comparison of World Wonders
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Side-by-side architectural and historical comparison of the 2007 New Seven Wonders of the World, the Honorary Ancient Wonder (Great Pyramid of Giza), and the classical Seven Wonders of Antiquity.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 shadow-2xs">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(['All', 'Modern', 'Ancient', 'Honorary'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterType === type
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {type === 'All' ? 'All Wonders (14)' : type === 'Modern' ? 'New 7 Wonders' : type === 'Ancient' ? 'Ancient 7 Wonders' : 'Honorary (Giza)'}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country, wonder, period..."
            className="w-full pl-9 pr-3.5 py-1.5 text-xs border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-100 dark:bg-stone-800/90 text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-700 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3.5 px-4">Wonder</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Country & Region</th>
                <th className="py-3.5 px-4">Approximate Period</th>
                <th className="py-3.5 px-4">Main Highlight</th>
                <th className="py-3.5 px-4">Status & Preservation</th>
                <th className="py-3.5 px-4 text-right">Article</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {filteredItems.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`hover:bg-stone-50/80 dark:hover:bg-stone-800/50 transition-colors ${
                    idx % 2 === 0 ? 'bg-white dark:bg-stone-900' : 'bg-stone-50/40 dark:bg-stone-850/40'
                  }`}
                >
                  {/* Wonder name & thumbnail */}
                  <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-white whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.wonder}
                        className="w-9 h-9 rounded-lg object-cover border border-stone-200 dark:border-stone-700 shrink-0"
                      />
                      <span className="hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer" onClick={() => onSelectWonder(item.slug)}>
                        {item.wonder}
                      </span>
                    </div>
                  </td>

                  {/* Type badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        item.type === 'Modern'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : item.type === 'Honorary'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300'
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  {/* Country */}
                  <td className="py-3.5 px-4 text-stone-700 dark:text-stone-300 whitespace-nowrap font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      {item.country}
                    </div>
                  </td>

                  {/* Period */}
                  <td className="py-3.5 px-4 text-stone-600 dark:text-stone-400 whitespace-nowrap font-mono text-[11px]">
                    {item.period}
                  </td>

                  {/* Highlight */}
                  <td className="py-3.5 px-4 text-stone-700 dark:text-stone-300 min-w-[200px] leading-relaxed">
                    {item.highlight}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 text-stone-600 dark:text-stone-400 text-[11px]">
                    {item.statusText}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => onSelectWonder(item.slug)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 dark:bg-stone-800 hover:bg-emerald-700 hover:text-white dark:hover:bg-emerald-700 text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-md transition-colors"
                    >
                      Read
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="p-8 text-center text-xs text-stone-500 dark:text-stone-400">
            No wonders found matching your search.
          </div>
        )}
      </div>

      {/* Informative Note */}
      <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
        <strong>Historical Note:</strong> The New 7 Wonders were chosen on July 7, 2007 through an international initiative with over 100 million votes. They are presented as equals, not ranked from 1 to 7. The Great Pyramid of Giza was granted honorary status as the only surviving monument of the ancient world.
      </div>
    </div>
  );
};
