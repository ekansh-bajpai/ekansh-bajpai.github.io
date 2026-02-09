import React from 'react';
import { PersonalInfo } from '../types';
import {
  Globe,
  Github,
  FileText,
  LinkedinIcon,
} from 'lucide-react';

interface ContactProps {
  personalInfo: PersonalInfo;
  styles: any;
}

const Contact: React.FC<ContactProps> = ({ personalInfo, styles }) => {
  const iconClass = 'w-4 h-4 text-current';

  const links = [
    {
      label: 'Website',
      value: "Portfolio Website",
      icon: <Globe className={iconClass} />,
      href: personalInfo.website,
    },
    {
      label: 'GitHub',
      value: `@${personalInfo.github}`,
      icon: <Github className={iconClass} />,
      href: `https://github.com/${personalInfo.github}`,
    },
    {
      label: 'LinkedIn',
      value: `/in/${personalInfo.linkedin}`,
      icon: <LinkedinIcon className={iconClass} />,
      href: `https://linkedin.com/in/${personalInfo.linkedin}`,
    },
    {
      label: 'Resume',
      value: 'Download CV',
      icon: <FileText className={iconClass} />,
      href: personalInfo.resumeUrl,
    },
  ];

  return (
    <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col gap-2">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm hover:text-blue-500 transition-colors group overflow-hidden"
          >
            <span className="opacity-60 flex-shrink-0 group-hover:opacity-100 transition-opacity">
              {link.icon}
            </span>

            <span className="truncate group-hover:underline">
              {link.value}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
