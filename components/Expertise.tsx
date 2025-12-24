import React from 'react';
import { Database, Code2, BrainCircuit, BarChart3 } from 'lucide-react';
import { ExpertiseCategory } from '../types';

const expertiseData: ExpertiseCategory[] = [
  {
    title: "Data Management",
    icon: <Database className="text-blue-500" size={24} />,
    skills: ["SQL", "Database Management", "Data Extraction", "Files Management"]
  },
  {
    title: "Programming",
    icon: <Code2 className="text-green-500" size={24} />,
    skills: ["Python", "Numpy & Pandas", "Matplotlib & Seaborn", "Scikit-learn"]
  },
  {
    title: "AI & ML",
    icon: <BrainCircuit className="text-purple-500" size={24} />,
    skills: ["Linear Regression", "Logistic Regression", "KNN & SVM", "Decision Trees"]
  },
  {
    title: "Analysis Tools",
    icon: <BarChart3 className="text-orange-500" size={24} />,
    skills: ["Advanced Excel", "Power BI", "Statistical Analysis", "Reporting"]
  }
];

const Expertise: React.FC = () => {
  return (
    <div id="expertise" className="px-4 max-w-2xl mx-auto mb-16 scroll-mt-32">
      <h2 className="text-center text-xl font-semibold text-slate-200 mb-8">Technical Expertise</h2>
      <div className="space-y-4">
        {expertiseData.map((item, index) => (
          <div key={index} className="bg-card border border-slate-800 p-6 rounded-2xl hover:border-blue-500/30 transition-colors group">
            <div className="flex items-start gap-4 text-left">
              <div className="p-3 bg-slate-900 rounded-xl group-hover:bg-slate-800 transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-200 mb-2">{item.title}</h3>
                <ul className="space-y-1">
                  {item.skills.map((skill, sIndex) => (
                    <li key={sIndex} className="text-sm text-slate-400">{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expertise;