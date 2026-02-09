import React, { useEffect } from 'react';
import { Project, Education, Experience } from '../types';

import {
  XIcon,
  CheckIcon,
  Atom,
  Zap,
  Brain,
  Database,
  Cloud,
  Container,
  Cpu,
  Server,
  Leaf,
  Code2,
  Bot,
  Eye,
  Ruler,
  Flame,
  HardDrive,
  Compass,
  Globe,
  Paintbrush,
  Wrench,
} from 'lucide-react';

interface DetailModalProps {
  item: {
    data: Project | Education | Experience;
    type: 'project' | 'education' | 'experience';
  } | null;
  onClose: () => void;
  styles: any;
  isDark: boolean;
}

const iconClass = 'w-3.5 h-3.5';

const DetailModal: React.FC<DetailModalProps> = ({
  item,
  onClose,
  styles,
  isDark,
}) => {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  if (!item) return null;

  const { data, type } = item;

  /* ✅ Replace emoji map with Lucide icons */
  const techIconMap: Record<string, React.ReactNode> = {
    React: <Atom className={iconClass} />,
    FastAPI: <Zap className={iconClass} />,
    LangChain: <Brain className={iconClass} />,
    'OpenAI API': <Brain className={iconClass} />,
    FAISS: <Database className={iconClass} />,
    PostgreSQL: <Database className={iconClass} />,
    AWS: <Cloud className={iconClass} />,
    Docker: <Container className={iconClass} />,
    'Node.js': <Cpu className={iconClass} />,
    Express: <Server className={iconClass} />,
    MongoDB: <Leaf className={iconClass} />,
    Python: <Code2 className={iconClass} />,
    'C++': <Code2 className={iconClass} />,
    ROS: <Bot className={iconClass} />,
    OpenCV: <Eye className={iconClass} />,
    Eigen: <Ruler className={iconClass} />,
    PCL: <Cloud className={iconClass} />,
    PyTorch: <Flame className={iconClass} />,
    Redis: <HardDrive className={iconClass} />,
    Pinecone: <Database className={iconClass} />,
    LIDAR: <Compass className={iconClass} />,
    IMU: <Compass className={iconClass} />,
    'Next.js': <Globe className={iconClass} />,
    'Tailwind CSS': <Paintbrush className={iconClass} />,
  };

  let title = '';
  let subtitle = '';
  let duration = '';
  let description = '';
  let listItems: string[] = [];
  let listLabel = '';
  let technologies: string[] = [];
  let projectUrl = '';
  let githubUrl = '';

  if (type === 'project') {
    const p = data as Project;
    title = p.title;
    subtitle = p.role;
    description = p.description;
    listItems = p.features || [];
    listLabel = 'Key Features';
    technologies = p.technologies;
    projectUrl = p.projectUrl || '';
    githubUrl = p.githubUrl || '';
  } else if (type === 'experience') {
    const e = data as Experience;
    title = e.role;
    subtitle = e.company;
    duration = e.duration;
    description = e.description;
    listItems = e.highlights || [];
    listLabel = 'Key Highlights';
    projectUrl = e.projectUrl || '';
    githubUrl = e.githubUrl || '';
  } else if (type === 'education') {
    const ed = data as Education;
    title = ed.degree;
    subtitle = ed.institution;
    duration = ed.year;
    description = `Focus: ${ed.focus}`;
    projectUrl = ed.projectUrl || '';
    githubUrl = ed.githubUrl || '';
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-sm bg-black/50 transition-opacity">
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-xl border shadow-xl flex flex-col ${styles.modalCard}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center p-6 border-b ${styles.modalHeader}`}
        >
          <div className="space-y-1">
            <h2 className={`text-xl font-bold ${styles.accent}`}>
              {title}
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              <p
                className={`text-xs font-semibold ${styles.secondaryText}`}
              >
                {subtitle}
              </p>

              {duration && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full border ${styles.btn}`}
                >
                  {duration}
                </span>
              )}
            </div>
          </div>

          {/* ✅ Close Icon */}
          <button
            onClick={onClose}
            className={`p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${styles.secondaryText}`}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8">
          <section className="space-y-3">
            <h3 className="text-sm font-bold">Overview</h3>

            <p
              className={`text-sm leading-relaxed ${styles.secondaryText}`}
            >
              {description}
            </p>
          </section>

          {(projectUrl || githubUrl) && (
            <section className="space-y-3">
              <h3 className="text-sm font-bold">Links</h3>

              <div className="flex flex-wrap gap-3">
                {projectUrl && (
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold text-xs transition-colors ${styles.accentBg} text-white`}
                  >
                    View Live
                  </a>
                )}

                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold text-xs transition-colors border ${styles.btn}`}
                  >
                    GitHub Repo
                  </a>
                )}
              </div>
            </section>
          )}

          {listItems.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-bold">{listLabel}</h3>

              <ul className="space-y-2">
                {listItems.map((item, i) => (
                  <li
                    key={i}
                    className={`text-xs p-3 rounded-md border flex gap-3 ${
                      isDark
                        ? 'bg-white/5 border-white/10'
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    {/* ✅ Check icon */}
                    <CheckIcon className="w-4 h-4 text-green-500" />

                    <span className={styles.secondaryText}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Footer */}
        {technologies.length > 0 && (
          <div className={`p-6 border-t ${styles.footer}`}>
            <div className="flex flex-wrap gap-3 items-center">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${styles.secondaryText}`}
              >
                Tech Stack:
              </span>

              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, i) => (
                  <div key={i} className="relative group cursor-help">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-semibold ${styles.btn}`}
                    >
                      {techIconMap[tech] || (
                        <Wrench className={iconClass} />
                      )}

                      {tech}
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      {tech}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside */}
      <div
        className="absolute inset-0 z-[-1]"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default DetailModal;
