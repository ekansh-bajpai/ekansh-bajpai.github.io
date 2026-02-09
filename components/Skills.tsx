import React from 'react';
import { Skill } from '../types';
import {
  CodeIcon,
  ServerIcon,
  DatabaseIcon,
  TerminalIcon,
  LayersIcon,
  CpuIcon
} from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
  styles: any;
}

// Map skill categories to Lucide icons
const categoryIconMap: Record<string, React.ReactNode> = {
  'Frontend': <CodeIcon className="w-5 h-5" />,
  'Backend': <ServerIcon className="w-5 h-5" />,
  'Database': <DatabaseIcon className="w-5 h-5" />,
  'DevOps': <TerminalIcon className="w-5 h-5" />,
  'Frameworks': <LayersIcon className="w-5 h-5" />,
  'Tools': <CpuIcon className="w-5 h-5" />
};

const Skills: React.FC<SkillsProps> = ({ skills, styles }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-normal">Skills & Technologies</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skillGroup, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-md border flex flex-col gap-3 transition-all duration-200 ${styles.card}`}
          >
            {/* Skill Group Header */}
            <div className="flex items-center gap-2">
              {categoryIconMap[skillGroup.category] || <CodeIcon className="w-5 h-5" />}
              <h4 className="text-xs font-bold uppercase tracking-wider opacity-70">
                {skillGroup.category}
              </h4>
            </div>

            {/* Skills List */}
            <div className="flex flex-wrap gap-1.5">
              {skillGroup.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${styles.btn} hover:border-blue-500 transition-colors cursor-default`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
