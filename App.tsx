import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import ProjectDetail from './components/ProjectDetail';
import { Project } from './types';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState<'en' | 'ar'>('ar');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const handleNavigate = (targetId: string) => {
    if (selectedProject) {
      setSelectedProject(null);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (targetId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }
  }, []);

  return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen transition-all duration-700 font-sans selection:bg-blue-500/30 ${darkMode ? 'bg-dark text-slate-200' : 'bg-slate-50 text-slate-900'}`}
    >
      
      <div className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-[3px] z-[110] pointer-events-none overflow-hidden w-full`}>
        <div 
          className={`h-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(37,99,235,1)] ${
            darkMode ? 'bg-blue-500 shadow-blue-500' : 'bg-blue-600 shadow-blue-600'
          }`} 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <Navbar 
        darkMode={darkMode} 
        toggleTheme={toggleTheme} 
        language={language} 
        toggleLanguage={toggleLanguage} 
        onNavigate={handleNavigate} 
      />
      
      <main className={`transition-all duration-700 ${selectedProject ? 'opacity-100' : 'pt-10 pb-24'}`}>
        {!selectedProject ? (
          <div className="animate-in fade-in zoom-in-95 duration-1000">
            <Hero language={language} />
            <Stats language={language} />
            <About language={language} />
            <Expertise language={language} />
            <Projects onSelectProject={setSelectedProject} language={language} />
            <Timeline language={language} />
            <Contact language={language} />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-10 duration-700">
            <ProjectDetail 
              project={selectedProject} 
              onBack={() => setSelectedProject(null)} 
            />
          </div>
        )}
      </main>

      <ChatWidget language={language} />
      
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-1000 ${darkMode ? 'bg-blue-900/10' : 'bg-blue-100/50'}`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-1000 ${darkMode ? 'bg-purple-900/10' : 'bg-purple-100/50'}`}></div>
      </div>
    </div>
  );
};

export default App;