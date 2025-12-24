import React, { useState } from 'react';
import { Github, ExternalLink, BarChart, Music, Landmark, TrendingUp, Filter, Search } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

const GITHUB_REPO = "https://github.com/AbdallahAlhelo/projectes-Analysis-2025";

export const projectsData: Project[] = [
  {
    title: "Bank Customer Behavior Analysis",
    description: "Deep dive into banking datasets to identify churn risks and segment customers based on financial health.",
    fullDescription: "This project aimed to reduce customer attrition in a major retail bank. I analyzed historical transaction data and demographic profiles to build a risk assessment model.\n\nThe process involved extensive data cleaning in Python, followed by the creation of an automated Excel dashboard that stakeholders could use to filter risks by region and account type.",
    insights: [
      "Identified that customers with less than 2 products have a 40% higher churn rate.",
      "Younger demographics showed higher sensitivity to transaction fees.",
      "Improved prediction of potential churners by 25% using feature engineering."
    ],
    tags: ["Financial Analysis", "Python", "Excel Macros", "Pivot Tables"],
    type: 'Excel',
    icon: <Landmark size={20} />,
    links: { 
      github: GITHUB_REPO,
      download: `${GITHUB_REPO}/archive/refs/heads/main.zip`
    }
  },
  {
    title: "Spotify Streaming Trends & Insights",
    description: "Visualization and statistical analysis of music trends across different regions and genres.",
    fullDescription: "Leveraging the Spotify Web API, this project explores what makes a track viral. I processed over 100,000 track entries to find correlations between musical attributes (like 'danceability') and streaming numbers.\n\nThe Jupyter Notebook contains a step-by-step workflow of data acquisition, transformation, and multi-variate analysis.",
    insights: [
      "Found a strong correlation (0.85) between energy and popularity in weekend playlists.",
      "Genre dominance shifts significantly during winter months toward slower acoustic tracks.",
      "Pop music duration has decreased by an average of 45 seconds over the last 5 years."
    ],
    tags: ["Data Visualization", "Jupyter", "Spotify API", "Pandas", "Seaborn"],
    type: 'Jupyter',
    icon: <Music size={20} />,
    links: { 
      github: GITHUB_REPO,
      demo: GITHUB_REPO 
    }
  },
  {
    title: "Predictive Sales: Linear Regression",
    description: "Mathematical modeling to forecast future revenue based on historical trends and marketing spend.",
    fullDescription: "Building a reliable forecasting tool for retail managers. This model uses multi-linear regression to account for seasonality, holidays, and marketing investments.\n\nThe project demonstrates the importance of residual analysis and homoscedasticity checks in building robust statistical models.",
    insights: [
      "Marketing spend on social media had a 3x higher ROI than traditional ads.",
      "Model achieved an R-squared value of 0.92, indicating high predictive power.",
      "Seasonal factors accounted for 30% of variance in quarterly revenue."
    ],
    tags: ["Machine Learning", "Linear Regression", "Statistics", "Python"],
    type: 'Jupyter',
    icon: <TrendingUp size={20} />,
    links: { 
      github: GITHUB_REPO 
    }
  },
  {
    title: "Credit Scoring: Logistic Regression",
    description: "Classification model to determine the probability of loan default based on credit history.",
    fullDescription: "A mission-critical analysis for risk management. Using a dataset of past loan applications, I trained a logistic regression model to classify applicants into high and low risk categories.\n\nKey focus areas included handling missing values and ensuring the model remains unbiased across different age groups.",
    insights: [
      "Previous payment history was the strongest predictor of future defaults.",
      "Optimized the classification threshold to reduce false negatives by 15%.",
      "Successfully implemented weight-balancing to handle the minority class of defaulters."
    ],
    tags: ["Classification", "Logistic Regression", "Risk Assessment", "Scikit-learn"],
    type: 'Jupyter',
    icon: <Filter size={20} />,
    links: { 
      github: GITHUB_REPO,
      download: `${GITHUB_REPO}/archive/refs/heads/main.zip`
    }
  }
];

const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Jupyter' | 'Excel'>('All');

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = activeFilter === 'All' || project.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div id="projects" className="px-4 max-w-6xl mx-auto mb-32 scroll-mt-28">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="p-5 bg-blue-500/10 rounded-3xl mb-6 border border-blue-500/20">
            <BarChart className="text-blue-500" size={36} />
        </div>
        <h2 className="text-5xl font-black dark:text-slate-100 text-slate-900 mb-4 tracking-tighter">Selected Works</h2>
        <p className="text-slate-400 max-w-lg leading-relaxed mb-10">
            A showcase of my recent analytical projects, data models, and statistical insights.
        </p>

        {/* Filters and Search */}
        <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-card/50 p-3 rounded-[2rem] border border-slate-200 dark:border-slate-800 glass shadow-xl">
          <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-900 rounded-2xl flex-1 w-full">
            <Search size={18} className="text-slate-400 ml-2" />
            <input 
              type="text" 
              placeholder="Search by tech, name, or insight..." 
              className="bg-transparent border-none outline-none text-sm p-1 flex-1 dark:text-white text-slate-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {(['All', 'Jupyter', 'Excel'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeFilter === filter ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {filteredProjects.length > 0 ? filteredProjects.map((project, index) => (
          <div 
            key={index} 
            onClick={() => onSelectProject(project)}
            className="flex flex-col bg-white dark:bg-card/30 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 rounded-[2.5rem] overflow-hidden hover:border-blue-500/40 transition-all duration-500 group hover:-translate-y-3 shadow-2xl cursor-pointer"
          >
            <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-500 to-sunset-start opacity-70 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="p-10 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 text-blue-500 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {project.icon}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl ${project.type === 'Excel' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20'}`}>
                    {project.type}
                  </span>
                </div>
              </div>

              <h3 className="text-3xl font-black dark:text-slate-100 text-slate-900 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
                {project.title}
              </h3>
              
              <p className="text-slate-500 dark:text-slate-400 text-base mb-8 leading-relaxed flex-1">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags.map((tag, tIndex) => (
                  <span key={tIndex} className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/30 rounded-xl text-[11px] dark:text-slate-300 text-slate-600 font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm font-black text-blue-600 dark:text-blue-400 transition-all pt-6 border-t border-slate-100 dark:border-slate-800/50">
                <span className="flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                  Explore Case Study <ExternalLink size={16} />
                </span>
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white dark:border-dark flex items-center justify-center text-white text-[10px]">AI</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white dark:border-dark flex items-center justify-center text-white text-[10px]">DS</div>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 flex flex-col items-center opacity-50">
            <Filter size={48} className="text-slate-500 mb-4" />
            <p className="text-xl font-bold">No projects match your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;