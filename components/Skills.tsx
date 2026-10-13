import React, { useMemo } from 'react';
import { Skill, Project } from '../types';
import {
  Code2Icon,
  EyeIcon,
  ZapIcon,
  BotIcon,
  MapIcon,
  SlidersHorizontalIcon,
  RadarIcon,
  WrenchIcon,
  PaletteIcon,
  ServerIcon,
  DatabaseIcon,
  CloudIcon,
  BrainIcon,
  CoffeeIcon,
  LinkIcon,
  BarChart3Icon,
  LayersIcon,
} from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
  styles: any;
  /** projects of the same tab: a skill used in one of them is highlighted with a count */
  projects?: Project[];
}

// Category → icon, by keyword (first match wins)
const ICONS: [RegExp, React.ReactNode][] = [
  [/language/i, <Code2Icon className="w-4 h-4" />],
  [/event|neuromorphic/i, <ZapIcon className="w-4 h-4" />],
  [/vision|perception/i, <EyeIcon className="w-4 h-4" />],
  [/humanoid|robot learning/i, <BotIcon className="w-4 h-4" />],
  [/slam|robotics/i, <MapIcon className="w-4 h-4" />],
  [/control|optimi/i, <SlidersHorizontalIcon className="w-4 h-4" />],
  [/sensor/i, <RadarIcon className="w-4 h-4" />],
  [/tool|librar/i, <WrenchIcon className="w-4 h-4" />],
  [/frontend/i, <PaletteIcon className="w-4 h-4" />],
  [/backend/i, <ServerIcon className="w-4 h-4" />],
  [/database/i, <DatabaseIcon className="w-4 h-4" />],
  [/cloud|devops|aws/i, <CloudIcon className="w-4 h-4" />],
  [/\bai\b|machine learning/i, <BrainIcon className="w-4 h-4" />],
  [/java/i, <CoffeeIcon className="w-4 h-4" />],
  [/api|integration/i, <LinkIcon className="w-4 h-4" />],
  [/report|utilit/i, <BarChart3Icon className="w-4 h-4" />],
];
const iconFor = (category: string) => ICONS.find(([re]) => re.test(category))?.[1] ?? <LayersIcon className="w-4 h-4" />;

// "ROS/ROS2" vs "ROS 2", "NVIDIA GR00T" vs "NVIDIA GR00T N1.7": compare letters, digits, + and # only (keeps C++, C#)
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#]/g, '');
const matches = (skill: string, tech: string) => {
  const t = norm(tech);
  return skill.split('/').map(norm).some((s) => s.length >= 2 && (t === s || (s.length >= 3 && t.startsWith(s))));
};
const shortTitle = (title: string) => title.split(/[:|]/)[0].trim();

const Skills: React.FC<SkillsProps> = ({ skills, styles, projects = [] }) => {
  // skill → titles of the projects that list it as a technology
  const usedIn = useMemo(() => {
    const m = new Map<string, string[]>();
    for (const cat of skills)
      for (const s of cat.skills)
        m.set(s, projects.filter((p) => p.technologies.some((t) => matches(s, t))).map((p) => shortTitle(p.title)));
    return m;
  }, [skills, projects]);
  const anyUsed = [...usedIn.values()].some((v) => v.length > 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">Skills & Technologies</h3>
        {anyUsed && (
          <span className={`text-xs flex items-center gap-1.5 ${styles.secondaryText}`}>
            <span className="w-2 h-2 rounded-full bg-accent" /> used in the projects above (hover for details)
          </span>
        )}
      </div>

      <div className={`rounded-lg border divide-y divide-line ${styles.card}`}>
        {skills.map((cat, idx) => {
          // used skills first (most-used first), the rest in their original order
          const ordered = [...cat.skills].sort((a, b) => (usedIn.get(b)?.length || 0) - (usedIn.get(a)?.length || 0));
          return (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-[13rem,1fr] gap-2 sm:gap-4 p-4">
              <div className="flex items-start gap-2 pt-0.5">
                <span className="text-accent mt-0.5">{iconFor(cat.category)}</span>
                <h4 className="text-sm font-semibold leading-snug">{cat.category}</h4>
              </div>

              <div className="flex flex-wrap items-center content-start gap-1.5">
                {ordered.map((skill, sIdx) => {
                  const used = usedIn.get(skill) || [];
                  return used.length > 0 ? (
                    <span
                      key={sIdx}
                      tabIndex={0}
                      className="relative group/chip inline-flex items-center gap-1.5 text-[11px] pl-2 pr-1 py-0.5 rounded-full border font-semibold border-accent/40 bg-accent/10 cursor-default outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {skill}
                      <span className="min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-cta text-white text-[10px] leading-[1.1rem] text-center">
                        {used.length}
                      </span>
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute left-0 bottom-full mb-1.5 z-20 w-max max-w-[16rem] rounded-md px-2.5 py-1.5 text-[11px] font-normal leading-snug bg-gray-900 text-white shadow-lg opacity-0 group-hover/chip:opacity-100 group-focus/chip:opacity-100 transition-opacity"
                      >
                        Used in: {used.join(', ')}
                      </span>
                    </span>
                  ) : (
                    <span key={sIdx} className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${styles.btn}`}>
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
