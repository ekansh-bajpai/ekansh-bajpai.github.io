import React from 'react';
import { TabData, Project, Experience } from '../types';
import Skills from './Skills';
import { FolderIcon, ExternalLinkIcon, StarIcon, GitBranchIcon } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      {/* Tab Nav */}
      <div className="flex items-center border-b border-gray-200 dark:border-gray-800 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-4 flex items-center gap-2 transition-all duration-300 text-sm whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? `${styles.btnActive} border-[#f78166]`
                : 'border-transparent text-gray-500 hover:text-current hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <FolderIcon className="w-4 h-4 opacity-60" />
            {tab.name.split('&')[0].trim()}
            <span className={`ml-1 px-1.5 py-0.5 text-[11px] font-medium rounded-full ${styles.btn}`}>
              {tab.projects.length}
            </span>
          </button>
        ))}
      </div>

      <div className="w-full space-y-12">
        {/* Projects (Repositories Style) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-normal">Projects</h3>
            {/* <span className="text-xs opacity-60 hover:text-blue-500 cursor-pointer">Customize your pins</span> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentTab.projects.map((proj, idx) => (
              <div
                key={idx}
                onClick={() => onProjectClick?.(proj)}
                className={`relative p-4 rounded-md border transition-all duration-200 flex flex-col gap-2 cursor-pointer group ${styles.card}`}
              >
                {/* Corner Detail Icon */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLinkIcon className={`w-4 h-4 ${styles.accent}`} />
                </div>

                <div className="flex justify-between items-start gap-2 pr-4">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FolderIcon className="w-4 h-4 opacity-60 flex-shrink-0" />
                    <h4 className={`text-sm font-semibold group-hover:underline truncate ${styles.accent}`}>
                      {proj.title}
                    </h4>
                  </div>
                  {
                    proj.projectType ? <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 font-medium ${styles.btn}`}>{proj.projectType}</span> : ""
                  }
                </div>

                <p className={`text-xs ${styles.secondaryText} leading-relaxed flex-grow line-clamp-3 mb-1`}>
                  {proj.description}
                </p>

                <div className="flex items-center gap-4 mt-auto text-[11px] opacity-80">
                  {proj.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className={`w-3 h-3 rounded-full ${tech.toLowerCase().includes('react') ? 'bg-[#3178c6]' : tech.toLowerCase().includes('python') ? 'bg-[#3572A5]' : 'bg-[#f1e05a]'}`}></span>
                      <span>{tech}</span>
                    </span>
                  ))}

                  {/* <span className="flex items-center gap-1">
                    <StarIcon className="w-3 h-3" /> 12
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranchIcon className="w-3 h-3" /> 4
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <Skills skills={currentTab.skills} styles={styles} />

        {/* Experience Activity (Timeline) */}
        <div className="space-y-4">
          <h3 className="text-base font-normal">Career activity</h3>
          <div className="space-y-0">
            {currentTab.experience.map((exp, idx) => (
              <div
                key={idx}
                onClick={() => onExperienceClick?.(exp)}
                className="relative pl-8 pb-8 border-l border-gray-200 dark:border-gray-800 group cursor-pointer last:pb-0"
              >
                {/* Corner Detail Icon */}
                <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLinkIcon className={`w-4 h-4 ${styles.accent}`} />
                </div>

                <div className={`absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full border border-current transition-colors ${styles.accent} bg-white dark:bg-[#0d1117] group-hover:bg-blue-500`}></div>

                <div className="flex flex-col gap-1 -mt-1 pr-6">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold group-hover:text-blue-500 transition-colors">
                      {exp.role}
                    </h4>
                    <span className={`text-[10px] font-normal px-2 py-0.5 rounded-full border ${styles.btn}`}>
                      {exp.duration}
                    </span>
                  </div>
                  <p className={`text-xs font-semibold ${styles.accent}`}>
                    {exp.company}
                  </p>
                  <p className={`text-xs leading-relaxed ${styles.secondaryText} line-clamp-2 mt-1`}>
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTabs;
