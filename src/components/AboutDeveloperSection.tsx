import React, { useState } from 'react';
import { 
  Linkedin, Instagram, Mail, GraduationCap, MapPin, 
  Code2, Sparkles, Check, Copy, ExternalLink, Gamepad2, 
  Globe, Database, Cpu, Layers, Terminal, User, ArrowLeft 
} from 'lucide-react';
import { developerContact } from '../config/developer';

interface AboutDeveloperSectionProps {
  initialTab?: 'about' | 'contact';
  onBackToArticles?: () => void;
}

export const AboutDeveloperSection: React.FC<AboutDeveloperSectionProps> = ({
  initialTab = 'about',
  onBackToArticles,
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'contact'>(initialTab);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(developerContact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const getTechIcon = (tech: string) => {
    switch (tech.toLowerCase()) {
      case 'c++':
      case 'java':
      case 'javascript':
      case 'python':
        return <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'sql':
        return <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      default:
        return <Terminal className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    }
  };

  const getAreaIcon = (area: string) => {
    switch (area.toLowerCase()) {
      case 'game development':
        return <Gamepad2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'web development':
        return <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'database systems':
        return <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'exploring new technologies':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      default:
        return <Cpu className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb / Return */}
      {onBackToArticles && (
        <button
          onClick={onBackToArticles}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </button>
      )}

      {/* Main Profile Card */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden transition-colors">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-6 sm:p-8 relative border-b border-stone-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar Badge */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center text-emerald-400 font-extrabold text-2xl tracking-wider">
                KA
              </div>
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {developerContact.name}
                </h1>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Developer Profile
                </span>
              </div>
              <p className="text-sm sm:text-base text-stone-300 font-medium">
                {developerContact.role}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  {developerContact.education}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  {developerContact.country}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 px-6 sm:px-8 pt-3">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'about'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-stone-900 rounded-t-lg'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <User className="w-4 h-4" />
            About Me
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'contact'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-stone-900 rounded-t-lg'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {activeTab === 'about' ? (
            <>
              {/* 1. About Me Biography */}
              <div className="space-y-3">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Personal Introduction
                </h2>
                <div className="p-5 sm:p-6 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base">
                  {developerContact.biography}
                </div>
              </div>

              {/* Academic Affiliation */}
              <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200/80 dark:border-emerald-800/40 flex items-start gap-3.5">
                <div className="p-2 bg-emerald-700 text-white rounded-lg shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  <h3 className="font-bold text-stone-900 dark:text-white text-sm sm:text-base">
                    {developerContact.university}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400">
                    Faculty of Computing • Degree in {developerContact.education}
                  </p>
                  <p className="text-stone-500 dark:text-stone-400 text-xs">
                    Location: {developerContact.country}
                  </p>
                </div>
              </div>

              {/* 2. Skills and Interests - Technologies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Technologies
                  </h2>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    Languages & Tools
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {developerContact.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 flex items-center gap-2.5 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-semibold hover:border-emerald-500 transition-colors shadow-2xs"
                    >
                      {getTechIcon(tech)}
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas I Enjoy Exploring */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Areas I Enjoy Exploring
                  </h2>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    Fields & Interests
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {developerContact.areasOfExploration.map((area) => (
                    <div
                      key={area}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 flex items-center gap-2.5 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-medium hover:border-emerald-500 transition-colors shadow-2xs"
                    >
                      {getAreaIcon(area)}
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Credits */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                <div className="p-3.5 bg-stone-50 dark:bg-stone-800/80 rounded-xl flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
                  <div>
                    <span className="font-semibold block text-stone-800 dark:text-stone-200">
                      Developer Credits
                    </span>
                    <span>Project: {developerContact.credits.project}</span>
                  </div>
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {developerContact.credits.developer}
                  </span>
                </div>
              </div>

              {/* Quick switch to Contact */}
              <div className="pt-2 flex items-center justify-between border-t border-stone-200 dark:border-stone-800">
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Want to collaborate or get in touch?
                </p>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  View Contact Details
                </button>
              </div>
            </>
          ) : (
            /* 3. Contact Me Section */
            <div className="space-y-6">
              <div className="space-y-1.5">
                <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-white">
                  Get in Touch
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  Have a question, feedback, or want to discuss web development, database systems, and software projects? Reach out through any of the channels below:
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 max-w-xl">
                {/* 1. LinkedIn */}
                <a
                  href={developerContact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 hover:border-[#0A66C2] hover:bg-[#0A66C2]/5 dark:hover:bg-[#0A66C2]/10 transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white group-hover:text-[#0A66C2] transition-colors">
                        LinkedIn Profile
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Connect with me on LinkedIn
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#0A66C2] transition-colors" />
                </a>

                {/* 2. Instagram */}
                <a
                  href={developerContact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 hover:border-[#E4405F] hover:bg-[#E4405F]/5 dark:hover:bg-[#E4405F]/10 transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white group-hover:text-[#E4405F] transition-colors">
                        Instagram
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Follow my creative updates & activities
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#E4405F] transition-colors" />
                </a>

                {/* 3. Direct Email */}
                <div className="p-4 sm:p-5 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 shadow-2xs space-y-3.5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white">
                        Direct Email
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-mono truncate">
                        {developerContact.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <a
                      href={`mailto:${developerContact.email}`}
                      className="flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors text-center inline-flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Mail className="w-4 h-4" />
                      Open Email App
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="py-2.5 px-4 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 rounded-lg text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Email
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
