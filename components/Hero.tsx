import React from 'react';
import { PersonalInfo } from '../types';

import {
  RocketIcon,
  ListChecksIcon,
  MapPinIcon,
  MailIcon,
  LinkedinIcon,
} from 'lucide-react';

interface HeroProps {
  data: PersonalInfo;
  styles: any;
  isDark: boolean;
}

const Hero: React.FC<HeroProps> = ({ data, styles, isDark }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Profile Avatar */}
      <div className="relative group self-start md:self-auto mb-2">
        <div
          className={`w-full max-w-[296px] aspect-square rounded-full border overflow-hidden ${
            isDark
              ? 'border-[#30363d] bg-[#161b22]'
              : 'border-[#d0d7de] bg-[#f6f8fa]'
          }`}
        >
          <img
            src={`https://github.com/${data.github}.png`}
            alt={data.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                data.name
              )}&background=${
                isDark ? '161b22' : 'f6f8fa'
              }&color=${isDark ? 'e6edf3' : '1f2328'}&size=512`;
            }}
          />
        </div>

        {/* Rocket Icon */}
        <div
          className={`absolute bottom-6 left-[72%] w-10 h-10 border rounded-full flex items-center justify-center shadow-sm cursor-default transition-colors ${
            isDark
              ? 'bg-[#0d1117] border-[#30363d]'
              : 'bg-white border-[#d0d7de]'
          }`}
        >
          <RocketIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold leading-tight">{data.name}</h1>
        {/* <p className={`text-xl font-light leading-tight ${styles.secondaryText}`}>
          {data.github}
        </p> */}
      </div>

      <div className="space-y-2 mt-2">
        <p className="text-xs font-normal leading-snug text-justify">{data.about}</p>
      </div>

      {/* Contact / Info */}
      <div className={`pt-4 space-y-2 text-sm`}>
        <div className="flex items-center gap-2">
          <ListChecksIcon className="w-4 h-4 opacity-60" />
          {data.title}
        </div>

        <div className="flex items-center gap-2">
          <MapPinIcon className="w-4 h-4 opacity-60" />
          Remote
        </div>

        <div className="flex items-center gap-2">
          <MailIcon className="w-4 h-4 opacity-60" />
          {data.email}
        </div>

        {/* LinkedIn (commented out in original, but icon ready) */}
        {/* <div className="flex items-center gap-2 text-[#0969da] dark:text-[#58a6ff] hover:underline cursor-pointer group">
          <LinkedinIcon className="w-4 h-4 opacity-60 group-hover:text-current" />
          linkedin.com/in/{data.linkedin}
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
