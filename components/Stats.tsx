import React from 'react';
import { Stats } from '../types';
import { ServerIcon, LayersIcon, UserCogIcon, CloudIcon } from 'lucide-react';

interface StatsSectionProps {
  stats: Stats;
  styles: any;
  activeTab: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats, styles, activeTab }) => {
  const cards = [
    { value: stats.projectsDeployed, label: 'Projects Deployed', icon: <ServerIcon className="w-6 h-6 mb-2" /> },
    { value: stats.techStacks, label: 'Tech Stacks', icon: <LayersIcon className="w-6 h-6 mb-2" /> },
    { value: stats.specialization, label: stats.focus, icon: <UserCogIcon className="w-6 h-6 mb-2" /> },
    {
      value: activeTab === 'aiml' ? 'Cloud' : 'ROS',
      label: activeTab === 'aiml' ? 'Deployment' : 'Framework',
      icon: <CloudIcon className="w-6 h-6 mb-2" />
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`p-6 rounded-xl border transition-all duration-300 flex flex-col justify-center items-center text-center ${styles.card}`}
        >
          {card.icon}
          <div className={`text-4xl font-bold mb-2 ${styles.accent}`}>
            {card.value}
          </div>
          <div className={`text-sm font-medium ${styles.secondaryText}`}>
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
