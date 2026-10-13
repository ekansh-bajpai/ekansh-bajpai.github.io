import React from 'react';
import { TabData, Project, Experience } from '../types';
import Skills from './Skills';
import { FolderIcon, ExternalLinkIcon, SparklesIcon } from 'lucide-react';
import { LinkButtons, MediaView, mediaList } from './LinkButtons';
import { TechDots, Metrics } from './ui';

const SectionTitle: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => (
  <h3 id={id} className="text-lg font-semibold scroll-mt-28">{children}</h3>
);

interface ExperienceTabsProps {
  tabs: TabData[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  styles: any;
  onProjectClick?: (project: Project) => void;
  onExperienceClick?: (experience: Experience) => void;
}

const ExperienceTabs: React.FC<ExperienceTabsProps> = ({ tabs, activeTab, setActiveTab, styles, onProjectClick, onExperienceClick }) => {
  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];
  const featured = currentTab.projects.filter(p => p.featured);
  const others = currentTab.projects.filter(p => !p.featured);

  return (
    <div className="space-y-8">
      {/* Tab Nav */}
      <div role="tablist" className="flex items-center border-b border-line overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-4 flex items-center gap-2 transition-all duration-300 text-sm whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? `${styles.btnActive} border-tab`
                : 'border-transparent text-muted hover:text-ink hover:border-line'
            }`}
          >
            <FolderIcon className="w-4 h-4 opacity-60" />
            {tab.name}
            <span className={`ml-1 px-1.5 py-0.5 text-[11px] font-medium rounded-full ${styles.btn}`}>
              {tab.projects.length}
            </span>
          </button>
        ))}
      </div>

      {/* Featured project(s): wide spotlight with media */}
      {featured.map((proj, idx) => (
        <article
          key={`f${idx}`}
          onClick={() => onProjectClick?.(proj)}
          className={`relative rounded-xl border overflow-hidden cursor-pointer group transition-all duration-200 ${styles.card}`}
        >
          {/* images (e.g. a results chart): full width on top; first video: beside the text */}
          {mediaList(proj.media).filter((m) => m.type === 'image').map((m, i) => (
            <figure key={i} className="bg-white p-3 sm:p-4 border-b border-line">
              <MediaView media={m} className="w-full h-auto" />
            </figure>
          ))}
          {(() => { const video = mediaList(proj.media).find((m) => m.type === 'video'); return (
          <div className={`grid grid-cols-1 ${video ? 'lg:grid-cols-[1.1fr,1fr]' : ''}`}>
            {video && (
              <figure className="bg-black flex flex-col justify-center">
                <MediaView media={video} className="w-full max-h-80 object-contain" />
                {video.caption && <figcaption className="px-3 py-2 text-[11px] leading-snug text-white/70">{video.caption}</figcaption>}
              </figure>
            )}
            <div className="p-5 sm:p-6 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider ${styles.accent}`}>
                  <SparklesIcon className="w-3.5 h-3.5" /> Featured
                </span>
                {proj.projectType && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${styles.btn}`}>{proj.projectType}</span>
                )}
              </div>
              <h4 className={`text-xl font-bold leading-snug group-hover:underline ${styles.accent}`}>{proj.title}</h4>
              <p className={`text-xs font-semibold ${styles.secondaryText}`}>{proj.role}</p>
              <p className="text-sm leading-relaxed">{proj.description}</p>
              <Metrics metrics={proj.metrics} styles={styles} large />
              {proj.links && proj.links.length > 0 && <LinkButtons links={proj.links} styles={styles} small />}
              <div className="mt-auto pt-1 flex items-center justify-between gap-2">
                <TechDots tech={proj.technologies} max={5} />
                <span className={`text-xs font-semibold whitespace-nowrap ${styles.accent}`}>Details →</span>
              </div>
            </div>
          </div>
          ); })()}
        </article>
      ))}

      {/* Projects */}
      {others.length > 0 && (
        <div className="space-y-4">
          <SectionTitle id="projects">Projects</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {others.map((proj, idx) => (
              <div
                key={idx}
                onClick={() => onProjectClick?.(proj)}
                className={`relative p-4 rounded-lg border transition-all duration-200 flex flex-col gap-2 cursor-pointer group ${styles.card}`}
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLinkIcon className={`w-4 h-4 ${styles.accent}`} />
                </div>

                <div className="flex justify-between items-start gap-2 pr-4">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FolderIcon className="w-4 h-4 opacity-60 flex-shrink-0" />
                    <h4 className={`text-sm font-semibold group-hover:underline truncate ${styles.accent}`}>{proj.title}</h4>
                  </div>
                  {proj.projectType && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 font-medium ${styles.btn}`}>{proj.projectType}</span>
                  )}
                </div>

                {mediaList(proj.media)[0] && (
                  <div className="rounded overflow-hidden border border-line bg-black/5">
                    <MediaView media={mediaList(proj.media)[0]} className="w-full h-40 object-cover" />
                  </div>
                )}

                <p className={`text-xs ${styles.secondaryText} leading-relaxed line-clamp-3 mb-1`}>{proj.description}</p>

                <Metrics metrics={proj.metrics} styles={styles} />
                {proj.links && proj.links.length > 0 && <LinkButtons links={proj.links} styles={styles} small />}

                <div className="mt-auto">
                  <TechDots tech={proj.technologies} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience (timeline) */}
      <div className="space-y-4">
        <SectionTitle id="experience">Experience</SectionTitle>
        <div className="space-y-0">
          {currentTab.experience.map((exp, idx) => (
            <div
              key={idx}
              onClick={() => onExperienceClick?.(exp)}
              className="relative pl-8 pb-8 border-l border-line group cursor-pointer last:pb-0"
            >
              <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLinkIcon className={`w-4 h-4 ${styles.accent}`} />
              </div>

              <div className={`absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full border border-current transition-colors ${styles.accent} bg-bg group-hover:bg-accent`}></div>

              <div className="flex flex-col gap-1 -mt-1 pr-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-semibold group-hover:text-accent transition-colors">{exp.role}</h4>
                  <span className={`text-[10px] font-normal px-2 py-0.5 rounded-full border ${styles.btn}`}>{exp.duration}</span>
                </div>
                <p className={`text-xs font-semibold ${styles.accent}`}>{exp.company}</p>
                <p className={`text-xs leading-relaxed ${styles.secondaryText} line-clamp-2 mt-1`}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div id="skills" className="scroll-mt-28">
        <Skills skills={currentTab.skills} styles={styles} projects={currentTab.projects} />
      </div>
    </div>
  );
};

export default ExperienceTabs;
