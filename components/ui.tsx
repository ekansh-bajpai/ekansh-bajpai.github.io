import React from 'react';
import { PersonalInfo, PortfolioData, Project, Education, Experience } from '../types';
import {
  FileTextIcon,
  GithubIcon,
  LinkedinIcon,
  GraduationCapIcon,
  FingerprintIcon,
  DatabaseIcon,
} from 'lucide-react';

/** Everything a layout needs from App. */
export interface LayoutProps {
  data: PortfolioData;
  styles: any;
  isDark: boolean;
  activeTab: string;
  setActiveTab: (id: string) => void;
  openItem: (item: { data: Project | Education | Experience; type: 'project' | 'education' | 'experience' }) => void;
  onDownload: () => void;
}

// Stable colour per technology (GitHub-like language dots)
const DOT_COLORS = ['#3572A5', '#f34b7d', '#3178c6', '#2ea043', '#e36209', '#8957e5', '#bf3989', '#0969da', '#d29922', '#1b7c83'];
export const dotColor = (tech: string) => {
  const t = tech.toLowerCase();
  if (t === 'python') return '#3572A5';
  if (t === 'c++') return '#f34b7d';
  if (t.includes('react') || t === 'typescript') return '#3178c6';
  let h = 0;
  for (const c of t) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return DOT_COLORS[h % DOT_COLORS.length];
};

export const TechDots: React.FC<{ tech: string[]; max?: number }> = ({ tech, max = 4 }) => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] opacity-80">
    {tech.slice(0, max).map((t, i) => (
      <span key={i} className="flex items-center gap-1">
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: dotColor(t) }}></span>
        <span>{t}</span>
      </span>
    ))}
  </div>
);

export const Metrics: React.FC<{ metrics?: string[]; styles: any; large?: boolean }> = ({ metrics, styles, large }) =>
  metrics && metrics.length > 0 ? (
    <div className="flex flex-wrap gap-1.5">
      {metrics.map((m, i) => (
        <span
          key={i}
          className={`${large ? 'text-xs px-2.5 py-1' : 'text-[10px] px-2 py-0.5'} rounded-full border font-semibold text-hl border-hl/30 bg-hl/5`}
        >
          {m}
        </span>
      ))}
    </div>
  ) : null;

/** Profile links (GitHub, LinkedIn, Hugging Face, Scholar, ORCID); optional ones appear only when set. No website link: this is the website. */
export const profileLinks = (p: PersonalInfo, icon = 'w-4 h-4') => [
  { label: 'GitHub', href: `https://github.com/${p.github}`, icon: <GithubIcon className={icon} /> },
  { label: 'LinkedIn', href: `https://linkedin.com/in/${p.linkedin}`, icon: <LinkedinIcon className={icon} /> },
  ...(p.huggingface ? [{ label: 'Hugging Face', href: p.huggingface, icon: <DatabaseIcon className={icon} /> }] : []),
  ...(p.scholar ? [{ label: 'Scholar', href: p.scholar, icon: <GraduationCapIcon className={icon} /> }] : []),
  ...(p.orcid
    ? [{ label: 'ORCID', href: p.orcid.startsWith('http') ? p.orcid : `https://orcid.org/${p.orcid}`, icon: <FingerprintIcon className={icon} /> }]
    : []),
];

/** "Download CV" button + profile link buttons. `compact` = smaller, for tiles and the academic header. */
export const LinkRow: React.FC<{ p: PersonalInfo; styles: any; onDownload: () => void; compact?: boolean; onDarkBg?: boolean }> = ({
  p,
  styles,
  onDownload,
  compact,
  onDarkBg,
}) => {
  const pad = compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm';
  const ghost = onDarkBg ? 'border-white/30 text-white hover:bg-white/10' : styles.btn;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={onDownload}
        className={`flex items-center gap-2 ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} rounded-md font-semibold text-white transition-colors ${styles.accentBg}`}
      >
        <FileTextIcon className="w-4 h-4" />
        Download CV
      </button>
      {profileLinks(p).map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 ${pad} rounded-md font-medium border transition-colors ${ghost}`}
        >
          {l.icon}
          {l.label}
        </a>
      ))}
    </div>
  );
};
