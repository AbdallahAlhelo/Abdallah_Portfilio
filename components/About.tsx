import React from 'react';
import { User, Target, Lightbulb, Rocket } from 'lucide-react';
import { translations } from '../translations';

interface AboutProps {
  language: 'en' | 'ar';
}

const About: React.FC<AboutProps> = ({ language }) => {
  const t = translations[language].about;
  
  return (
    <section id="about" className="px-4 max-w-5xl mx-auto mb-32 scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Visual/Experience Card */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className={`relative bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-xl ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h3 className="text-2xl font-black text-white mb-6">{t.philosophy}</h3>
            <p className="text-slate-400 leading-relaxed mb-8">
              {t.philosophy_text}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex flex-col items-center text-center">
                <Target className="text-orange-400 mb-2" size={24} />
                <h4 className="text-white font-bold text-sm">{t.accuracy}</h4>
                <p className="text-[10px] text-slate-500">{t.accuracy_sub}</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex flex-col items-center text-center">
                <Lightbulb className="text-blue-400 mb-2" size={24} />
                <h4 className="text-white font-bold text-sm">{t.insight}</h4>
                <p className="text-[10px] text-slate-500">{t.insight_sub}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Text Story */}
        <div className={language === 'ar' ? 'text-right' : 'text-left'}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20">
            <User size={14} className="text-blue-500" />
            <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{t.about_me}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
            {t.title}
          </h2>
          <div className="space-y-6 text-slate-400">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <div className={`pt-4 flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
               <div className={`flex ${language === 'ar' ? 'space-x-reverse' : ''} -space-x-2`}>
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-dark bg-slate-800 flex items-center justify-center">
                     <Rocket size={16} className="text-slate-500" />
                   </div>
                 ))}
               </div>
               <span className="text-xs font-bold text-slate-500">{t.projects_done}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;