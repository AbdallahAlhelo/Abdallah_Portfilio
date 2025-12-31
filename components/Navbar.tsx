import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, X, ExternalLink, Globe } from 'lucide-react';
import { translations } from '../translations';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  onNavigate: (targetId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme, language, toggleLanguage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[language].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.about, id: 'about' },
    { name: t.expertise, id: 'expertise' },
    { name: t.portfolio, id: 'projects' },
    { name: t.timeline, id: 'timeline' },
    { name: t.contact, id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-white/70 dark:bg-dark/70 glass border-b border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-blue-500/5' 
          : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleLinkClick('hero')}>
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
              darkMode ? 'bg-blue-600 shadow-blue-500/40' : 'bg-slate-900 shadow-slate-900/20'
            }`}>
              A
            </div>
            <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <span className={`font-black text-xl tracking-tighter transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {language === 'ar' ? 'عبدالله' : 'Abdallah'} <span className="text-blue-500">{language === 'ar' ? 'الحلو' : 'Alhelo'}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none">{t.available}</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleLinkClick(link.id)}
                className={`text-xs font-black uppercase tracking-widest transition-all hover:text-blue-500 relative group ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <div className="flex gap-3 items-center">
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-500 border ${
                darkMode 
                ? 'bg-slate-800/50 border-slate-700 text-blue-400 hover:border-blue-400/50' 
                : 'bg-white border-slate-200 text-slate-900 hover:border-blue-500/50 shadow-lg'
              }`}
            >
              <Globe size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            <button 
              onClick={toggleTheme}
              className={`group relative p-3 rounded-2xl transition-all duration-500 border overflow-hidden ${
                darkMode 
                ? 'bg-slate-800/50 border-slate-700 text-yellow-400 hover:border-yellow-400/50 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)]' 
                : 'bg-white border-slate-200 text-slate-900 shadow-xl shadow-slate-200 hover:border-blue-500/50'
              }`}
            >
              <div className="relative z-10 transition-transform duration-500 group-hover:rotate-45">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </div>
            </button>

            <button 
              onClick={() => setIsMenuOpen(true)}
              className={`flex items-center gap-2 p-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 shadow-2xl ${
                darkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-500' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[200] transition-all duration-700 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 ${language === 'ar' ? 'left-0 border-r' : 'right-0 border-l'} h-full w-full max-w-md shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] p-8 flex flex-col ${
          isMenuOpen ? 'translate-x-0' : (language === 'ar' ? '-translate-x-full' : 'translate-x-full')
        } ${darkMode ? 'bg-card border-slate-800' : 'bg-white border-slate-100'}`}>
          <div className={`flex justify-between items-center mb-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="flex flex-col">
              <span className={`text-2xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>{language === 'ar' ? 'التنقل' : 'Navigation'}</span>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{language === 'ar' ? 'استكشف البورتفوليو' : 'Explore Portfolio'}</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className={`p-3 rounded-2xl transition-all hover:rotate-90 ${darkMode ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
              <X size={24} />
            </button>
          </div>

          <div className={`flex flex-col gap-4 mb-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {navLinks.map((link, i) => (
              <button 
                key={i} 
                onClick={() => handleLinkClick(link.id)}
                className={`group flex items-center justify-between p-6 rounded-[2rem] transition-all duration-500 border ${
                  darkMode 
                  ? 'bg-slate-800/40 border-slate-800 hover:border-blue-500/50 hover:bg-slate-800' 
                  : 'bg-slate-50 border-slate-100 hover:border-blue-500/50 hover:bg-slate-100'
                }`}
              >
                <span className={`text-2xl font-black tracking-tight transition-transform ${language === 'ar' ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'} ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {link.name}
                </span>
                <div className={`p-3 rounded-xl transition-all group-hover:bg-blue-600 group-hover:text-white ${darkMode ? 'bg-slate-700 text-slate-400' : 'bg-white text-slate-400'}`}>
                   <ExternalLink size={20} className={language === 'ar' ? 'scale-x-[-1]' : ''} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;