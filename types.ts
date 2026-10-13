
export type ThemeType = 'github';

/** A named link button (e.g. "Thesis PDF", "Dataset", "Code"). */
export interface LinkItem {
  label: string;
  url: string;
}

/** Optional image / GIF / video shown on cards and in the detail modal. */
export interface Media {
  type: 'image' | 'video';
  url: string;
  /** still frame shown before a video loads */
  poster?: string;
  caption?: string;
}

export interface NewsItem {
  date: string;
  text: string;
  url?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  about: string;
  /** short scannable points under the about line; "Label: text" renders the label in bold */
  aboutPoints?: string[];
  website?: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: Record<string, string>;
  /** profile photo (e.g. /media/profile.jpg in public/); falls back to the GitHub avatar */
  photo?: string;
  location?: string;
  researchInterests?: string[];
  scholar?: string;
  orcid?: string;
  huggingface?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  focus: string;
  grade?: string;
  thesis?: string;
  links?: LinkItem[];
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
  links?: LinkItem[];
  media?: Media | Media[];
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
  metrics?: string[];
  links?: LinkItem[];
  media?: Media | Media[];
  /** shown as a wide spotlight card at the top of its tab */
  featured?: boolean;
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
  news?: NewsItem[];
  stats: Record<string, Stats>;
  tabs: TabData[];
  /** tab opened first (falls back to the first tab) */
  defaultTab?: string;
}
