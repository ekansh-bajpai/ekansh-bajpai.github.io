import React from 'react';
import { Education } from '../types';

import { ExternalLinkIcon } from 'lucide-react';

interface EducationProps {
  education: Education[];
  styles: any;
  theme: string;
  onEducationClick?: (edu: Education) => void;
}

const EducationSection: React.FC<EducationProps> = ({
  education,
  styles,
  theme,
  onEducationClick,
}) => {
  return (
    <div className="grid gap-6">
      {education.map((edu, idx) => (
        <div
          key={idx}
          onClick={() => onEducationClick?.(edu)}
          className={`relative p-8 rounded-xl border transition-all duration-300 group overflow-hidden cursor-pointer ${styles.card}`}
        >
          {/* Accent strip on hover */}
          <div
            className={`absolute top-0 left-0 w-1.5 h-full transition-transform duration-300 scale-y-0 group-hover:scale-y-100 ${styles.accentBg}`}
          ></div>

          {/* ✅ Hint Icon for Modal */}
          <div
            className={`absolute top-4 right-4 text-xs opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ${styles.accent}`}
          >
            <ExternalLinkIcon className="w-[18px] h-[18px]" />
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 pr-6">
            <div className="space-y-2">
              <h3
                className={`text-xl font-bold ${
                  theme === 'minimal'
                    ? 'text-black'
                    : styles.accent
                }`}
              >
                {edu.degree}
              </h3>

              <p className="text-lg font-semibold">
                {edu.institution}
              </p>

              <p className={styles.secondaryText}>
                Focus: {edu.focus}
              </p>
            </div>

            <div
              className={`px-4 py-1.5 rounded-full border text-sm font-bold whitespace-nowrap ${styles.btn}`}
            >
              {edu.year}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
