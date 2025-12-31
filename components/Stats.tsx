import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../translations';

const StatCard = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setHasStarted(true);
    }, { threshold: 0.1 });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, value]);

  return (
    <div ref={elementRef} className="bg-card/50 backdrop-blur-md border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg group hover:border-blue-500/50 transition-all">
      <div className="text-4xl font-black text-blue-500 group-hover:scale-110 transition-transform flex items-center">
        {count}{suffix}
      </div>
      <span className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mt-2">{label}</span>
    </div>
  );
};

interface StatsProps {
  language: 'en' | 'ar';
}

const Stats: React.FC<StatsProps> = ({ language }) => {
  const t = translations[language].stats;
  
  return (
    <div className="px-4 max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
      <StatCard value={25} label={t.years} />
      <StatCard value={3} label={t.specs} suffix="+" />
      <StatCard value={100} label={t.focus} suffix="%" />
    </div>
  );
};

export default Stats;