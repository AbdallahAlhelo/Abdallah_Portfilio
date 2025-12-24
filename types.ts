import React from 'react';

export interface SkillItem {
  name: string;
  icon?: React.ReactNode;
}

export interface ExpertiseCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export interface TimelineItem {
  title: string;
  subtitle: string;
  description?: string;
  type: 'education' | 'certification';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Project {
  title: string;
  description: string;
  fullDescription: string;
  insights: string[];
  tags: string[];
  type: 'Jupyter' | 'Excel' | 'PowerBI';
  icon: React.ReactNode;
  links: {
    github?: string;
    download?: string;
    demo?: string;
  };
}