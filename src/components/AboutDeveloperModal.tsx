import React, { useState } from 'react';
import { 
  X, Linkedin, Instagram, Mail, GraduationCap, MapPin, 
  Code2, Sparkles, Check, Copy, ExternalLink, Gamepad2, 
  Globe, Database, Cpu, Layers, Terminal, Heart, User 
} from 'lucide-react';
import { developerContact } from '../config/developer';

interface AboutDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'about' | 'contact';
}

export const AboutDeveloperModal: React.FC<AboutDeveloperModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'about',
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'contact'>(initialTab);
  const [copiedEmail, setCopiedEmail] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

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
        return <Code2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case 'sql':
        return <Database className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      default:
        return <Terminal className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
    }
  };

  const getAreaIcon = (area: string) => {
    switch (area.toLowerCase()) {
      case 'game development':
        return <Gamepad2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />;
      case 'web development':
        return <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
      case 'database systems':
        return <Database className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />;
      case 'exploring new technologies':
        return <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <Cpu className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[92vh] flex flex-col my-auto transition-colors">
        {/* Header Profile Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-6 relative border-b border-stone-800 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Avatar Badge */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center text-emerald-400 font-extrabold text-xl tracking-wider">
                KA
              </div>
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  {developerContact.name}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Developer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 font-medium">
                {developerContact.role}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  {developerContact.education}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {developerContact.country}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 px-6 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'about'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-stone-900 rounded-t-lg'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            About Me
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'contact'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-stone-900 rounded-t-lg'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Contact Me
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {activeTab === 'about' ? (
            <>
              {/* About Me Biography */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  My Introduction
                </h3>
                <div className="p-4 sm:p-5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 text-stone-700 dark:text-stone-300 leading-relaxed text-xs sm:text-sm">
                  {developerContact.biography}
                </div>
              </div>

              {/* Academic Affiliation Card */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 dark:text-stone-300 space-y-0.5">
                  <p className="font-bold text-stone-900 dark:text-white">
                    {developerContact.university}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400">
                    Discipline: {developerContact.education} • {developerContact.country}
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {developerContact.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold shadow-2xs hover:border-emerald-500 transition-colors"
                    >
                      {getTechIcon(tech)}
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas I Enjoy Exploring */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Areas I Enjoy Exploring
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {developerContact.areasOfExploration.map((area) => (
                    <div
                      key={area}
                      className="p-2.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center gap-2 text-stone-800 dark:text-stone-200 text-xs font-medium hover:border-emerald-500 transition-colors"
                    >
                      {getAreaIcon(area)}
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Credits */}
              <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                <div className="p-3 bg-stone-100 dark:bg-stone-800/80 rounded-xl flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
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
            </>
          ) : (
            /* Contact Me Tab */
            <div className="space-y-6 py-2">
              <div className="text-center max-w-md mx-auto space-y-1">
                <h3 className="text-base font-extrabold text-stone-900 dark:text-white">
                  Get in Touch
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Have a question, feedback, or want to discuss web development, database systems, and software projects? Connect with me directly through these links:
                </p>
              </div>

              {/* 3 Functional Contact Buttons */}
              <div className="grid grid-cols-1 gap-3 max-w-lg mx-auto">
                {/* 1. LinkedIn */}
                <a
                  href={developerContact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-[#0A66C2] hover:bg-[#0A66C2]/5 dark:hover:bg-[#0A66C2]/10 transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-[#0A66C2] transition-colors">
                        LinkedIn Profile
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Connect with me professionally
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
                  className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-[#E4405F] hover:bg-[#E4405F]/5 dark:hover:bg-[#E4405F]/10 transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-[#E4405F] transition-colors">
                        Instagram
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Follow my creative updates & activities
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[#E4405F] transition-colors" />
                </a>

                {/* 3. Email Me */}
                <div className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                          Email Me
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                          {developerContact.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`mailto:${developerContact.email}`}
                      className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors text-center inline-flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Open in Email App
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="py-2 px-3 border border-stone-300 dark:border-stone-700 rounded-lg text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors inline-flex items-center gap-1"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-50 dark:bg-stone-800/80 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-stone-500 dark:text-stone-400">
            {developerContact.name} • {developerContact.country}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 dark:bg-stone-700 hover:bg-black dark:hover:bg-stone-600 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
