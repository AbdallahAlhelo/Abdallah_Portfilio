import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { translations } from '../translations';

interface ContactProps {
  language: 'en' | 'ar';
}

const Contact: React.FC<ContactProps> = ({ language }) => {
  const t = translations[language].contact;
  
  return (
    <div id="contact" className="px-4 max-w-5xl mx-auto pb-24 scroll-mt-32">
      <div className="relative bg-blue-600 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-2xl shadow-blue-500/20">
        
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            {t.title}
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed">
            {t.subtitle}
          </p>
        </div>
        
        {/* The Improved Contact Bar */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {/* Location Link */}
            <a 
                href="https://www.google.com/maps/search/?api=1&query=Gaza,Palestine" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-white/15 backdrop-blur-xl p-6 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-white/25 transition-all duration-500 border border-white/10 hover:border-white/40 hover:-translate-y-2 shadow-xl"
            >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <span className="text-xs font-black text-white uppercase tracking-widest mt-2">{t.location}</span>
                <span className="text-sm font-bold text-white/90">{t.address}</span>
            </a>

            {/* Phone Link */}
            <a 
                href="tel:+972595083720" 
                className="group bg-white/15 backdrop-blur-xl p-6 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-white/25 transition-all duration-500 border border-white/10 hover:border-white/40 hover:-translate-y-2 shadow-xl"
            >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-lg group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <span className="text-xs font-black text-white uppercase tracking-widest mt-2">{t.phone}</span>
                <span className="text-sm font-bold text-white/90" dir="ltr">+972 595 083 720</span>
            </a>

            {/* Email Link */}
            <a 
                href="mailto:aboodalhelo774@gmail.com" 
                className="group bg-white/15 backdrop-blur-xl p-6 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-white/25 transition-all duration-500 border border-white/10 hover:border-white/40 hover:-translate-y-2 shadow-xl"
            >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-lg group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <span className="text-xs font-black text-white uppercase tracking-widest mt-2">{t.email}</span>
                <span className="text-sm font-bold text-white/90 break-all">{language === 'ar' ? 'تواصل عبر البريد' : 'aboodalhelo774@gmail.com'}</span>
            </a>
        </div>

        {/* Languages Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 bg-black/10 py-4 px-8 rounded-full border border-white/10">
            <span className="text-xs font-black text-white/60 uppercase tracking-widest">{t.languages}:</span>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-bold text-white">{t.ar}</span>
            </div>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="text-sm font-bold text-white">{t.en}</span>
            </div>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span className="text-sm font-bold text-white">{t.tr}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;