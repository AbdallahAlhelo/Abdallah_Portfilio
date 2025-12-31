import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { TimelineItem } from '../types';

const items: TimelineItem[] = [
  {
    type: 'education',
    title: 'Alquds Open University',
    subtitle: 'Specialization in Technology and Applied Sciences'
  },
  {
    type: 'certification',
    title: 'Google Data Analysis',
    subtitle: 'Professional Certificate',
    description: 'Comprehensive training in data cleaning, analysis, and visualization.'
  }
];

const Timeline: React.FC = () => {
  return (
    <div id="timeline" className="px-4 max-w-2xl mx-auto mb-16 space-y-8 scroll-mt-32 text-left">
      
      {/* Education Header */}
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap className="text-blue-500" size={20} />
        <h3 className="text-lg font-semibold text-slate-200">Education</h3>
      </div>
      
      {/* Education Item */}
      <div className="relative pl-6 border-l-2 border-slate-800 ml-2">
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-dark"></div>
        <h4 className="text-slate-200 font-medium mb-1">Alquds Open University</h4>
        <p className="text-slate-400 text-sm">Specialization in Technology and Applied Sciences</p>
      </div>

      {/* Certs Header */}
      <div className="flex items-center gap-2 mb-4 mt-8">
        <Award className="text-blue-500" size={20} />
        <h3 className="text-lg font-semibold text-slate-200">Certifications</h3>
      </div>

      {/* Cert Item */}
      <div className="relative pl-6 border-l-2 border-slate-800 ml-2">
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-dark"></div>
        <h4 className="text-slate-200 font-medium mb-1">Google Data Analysis</h4>
        <p className="text-blue-400 text-xs mb-1">Professional Certificate</p>
        <p className="text-slate-400 text-sm">Comprehensive training in data cleaning, analysis, and visualization.</p>
      </div>

    </div>
  );
};

export default Timeline;