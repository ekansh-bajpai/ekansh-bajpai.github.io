
export type ThemeType = 'github';

export interface PersonalInfo {
  name: string;
  title: string;
  about: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  focus: string;
  projectUrl?: string;
  githubUrl?: string;
}

export interface Stats {
  projectsDeployed: string;
  techStacks: string;
  specialization: string;
  focus: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  highlights?: string[];
  projectUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  category: string;
  icon: string;
  skills: string[];
}

export interface Project {
  title: string;
  role: string;
  description: string;
  features?: string[];
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  projectType?: string;
}

export interface TabData {
  id: string;
  name: string;
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education[];
  stats: Record<string, Stats>;
  tabs: TabData[];
}
