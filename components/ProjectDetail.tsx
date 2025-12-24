import React from 'react';
import { ArrowLeft, Github, Download, ExternalLink, CheckCircle2, Layout, Cpu, Database } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  return (
    <div className="min-h-screen bg-dark text-slate-200 pt-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-12 group"
        >
          <div className="p-2 bg-slate-800/50 rounded-full group-hover:-translate-x-1 transition-transform">
            <ArrowLeft size={20} />
          </div>
          <span className="font-bold">Back to Portfolio</span>
        </button>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20">
              {project.icon}
            </div>
            <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${project.type === 'Excel' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
              {project.type} Project
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Layout size={20} className="text-blue-500" />
                Project Overview
              </h2>
              <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-green-500" />
                Key Insights & Results
              </h2>
              <div className="space-y-4">
                {project.insights.map((insight, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-slate-800/30 border border-slate-700/50 rounded-2xl hover:border-slate-600 transition-colors">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                    <p className="text-slate-300 text-sm leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="p-6 bg-card border border-slate-800 rounded-3xl sticky top-8">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Cpu size={16} />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Database size={16} />
                Project Assets
              </h3>
              <div className="space-y-3">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all group">
                    <span className="text-sm font-bold">Jupyter Notebook</span>
                    <Github size={18} className="text-slate-400 group-hover:text-white" />
                  </a>
                )}
                {project.links.download && (
                  <a href={project.links.download} target="_blank" className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 rounded-2xl transition-all group">
                    <span className="text-sm font-bold text-green-400">Excel Dataset</span>
                    <Download size={18} className="text-green-400" />
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" className="flex items-center justify-between p-4 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 rounded-2xl transition-all group">
                    <span className="text-sm font-bold text-blue-400">View Presentation</span>
                    <ExternalLink size={18} className="text-blue-400" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;