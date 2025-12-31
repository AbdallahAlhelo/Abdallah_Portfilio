import React, { useState, useEffect, useRef } from 'react';
import { Database, Brain, Code, ArrowRight, Camera, RefreshCw, FileDown, Facebook, Instagram, Linkedin } from 'lucide-react';
import { translations } from '../translations';

interface HeroProps {
  language: 'en' | 'ar';
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = translations[language].hero;
  const [profileImage, setProfileImage] = useState<string>("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('abdallah_portfolio_image');
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleImageClick = () => fileInputRef.current?.click();

  const compressAndSaveImage = (base64Str: string) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 500;
      const MAX_HEIGHT = 500;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convert to JPEG with 0.7 quality to save space
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
      setProfileImage(compressedBase64);
      localStorage.setItem('abdallah_portfolio_image', compressedBase64);
      setIsSaving(false);
    };
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsSaving(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        compressAndSaveImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultImg = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop";
    setProfileImage(defaultImg);
    localStorage.removeItem('abdallah_portfolio_image');
  };

  const handleDownloadCV = () => {
    window.open('https://github.com/AbdallahAlhelo/projectes-Analysis-2025/raw/main/CV_Abdallah_Alhelo.pdf', '_blank');
  };

  return (
    <div id="hero" className="relative flex flex-col items-center text-center pt-20 pb-12 px-4 max-w-5xl mx-auto scroll-mt-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] bg-gradient-to-b from-orange-500/10 via-purple-500/5 to-transparent blur-[140px] -z-10 rounded-full"></div>

      <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16 w-full ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        
        <div className="relative group shrink-0 mx-auto lg:mx-0">
          <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500 via-purple-500 to-blue-500 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
          
          <div 
            onClick={handleImageClick}
            className="relative w-72 h-72 md:w-80 md:h-80 rounded-full p-1.5 bg-slate-900 border border-slate-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 group-hover:scale-[1.03] group-hover:rotate-1 cursor-pointer"
          >
              <img src={profileImage} alt="Abdallah Alhelo" className={`w-full h-full object-cover rounded-full transition-all duration-700 group-hover:scale-110 ${isSaving ? 'opacity-50 grayscale' : ''}`} />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm rounded-full">
                {isSaving ? (
                  <RefreshCw size={24} className="text-white animate-spin" />
                ) : (
                  <>
                    <Camera size={24} className="text-white" />
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">{language === 'ar' ? 'تحديث' : 'Update'}</span>
                  </>
                )}
                
                {localStorage.getItem('abdallah_portfolio_image') && !isSaving && (
                  <button onClick={resetImage} className="mt-2 text-[8px] text-slate-300 hover:text-white uppercase font-bold bg-white/5 px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                    <RefreshCw size={10} /> {language === 'ar' ? 'إعادة' : 'Reset'}
                  </button>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          </div>

          {/* Floating Badges */}
          <div className={`absolute -top-4 ${language === 'ar' ? '-left-8' : '-right-8'} bg-card/90 backdrop-blur-xl border border-slate-700 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl animate-float`}>
              <div className="p-2 bg-orange-500/20 rounded-lg"><Database size={18} className="text-orange-400" /></div>
              <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">{t.expertise}</span>
                <span className="text-xs font-black text-slate-100 uppercase">SQL DATA</span>
              </div>
          </div>
          
          <div className={`absolute top-1/2 ${language === 'ar' ? '-right-10' : '-left-10'} -translate-y-1/2 bg-card/90 backdrop-blur-xl border border-slate-700 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl animate-float`} style={{ animationDelay: '1s' }}>
              <div className="p-2 bg-purple-500/20 rounded-lg"><Brain size={18} className="text-purple-400" /></div>
              <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">{t.specialty}</span>
                <span className="text-xs font-black text-slate-100 uppercase">AI MODELS</span>
              </div>
          </div>

          <div className={`absolute -bottom-4 ${language === 'ar' ? '-left-8' : '-right-8'} bg-card/90 backdrop-blur-xl border border-slate-700 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl animate-float`} style={{ animationDelay: '2s' }}>
              <div className="p-2 bg-blue-500/20 rounded-lg"><Code size={18} className="text-blue-400" /></div>
              <div className={`flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">{t.coding}</span>
                <span className="text-xs font-black text-slate-100 uppercase">PYTHON</span>
              </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-orange-500/10 rounded-full mb-8 border border-orange-500/20 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            <span className="text-[10px] text-orange-400 font-black uppercase tracking-[0.2em]">{t.ready}</span>
          </div>

          <h2 className="text-3xl text-slate-500 font-light mb-2 tracking-tight">{t.portfolio_of}</h2>
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-400 to-purple-400 mb-6 tracking-tighter leading-[0.9]">
            {language === 'ar' ? 'عبدالله' : 'Abdallah'} <br /> <span className="text-blue-500">{language === 'ar' ? 'الحلو' : 'Alhelo'}</span>
          </h1>
          
          <h3 className="text-2xl md:text-3xl text-slate-200 font-bold mb-8">{t.role}</h3>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl mb-12">{t.description}</p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative bg-orange-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1"
            >
              <div className="relative z-10 flex items-center gap-3 text-xs">
                {t.explore} <ArrowRight size={18} className={`transition-transform ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            </button>
            
            <button 
              onClick={handleDownloadCV}
              className="group flex items-center gap-3 bg-slate-800/50 hover:bg-slate-800 border-2 border-slate-700 hover:border-blue-500/50 text-slate-200 px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all hover:-translate-y-1 text-xs"
            >
              <FileDown size={18} className="text-blue-400 group-hover:animate-bounce" />
              {t.resume}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center justify-center p-2 bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-full shadow-2xl">
        {[
          { icon: <Facebook size={20} />, link: "https://www.facebook.com/share/16rXTJZVkE/", color: "hover:bg-blue-600" },
          { icon: <Instagram size={20} />, link: "https://www.instagram.com/abood_alheloo?igsh=MWR2ODc0bXVoZTluMw==", color: "hover:bg-pink-600" },
          { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/in/abood-alhelo-987a29282", color: "hover:bg-blue-500" }
        ].map((social, i) => (
          <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className={`p-4 rounded-full text-slate-500 ${social.color} hover:text-white transition-all duration-300`}>
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;