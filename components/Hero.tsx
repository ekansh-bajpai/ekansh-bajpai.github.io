import React from 'react';
import { PersonalInfo } from '../types';

import { MapPinIcon, MailIcon } from 'lucide-react';
import { LinkRow } from './ui';

interface HeroProps {
  data: PersonalInfo;
  styles: any;
  isDark: boolean;
  onDownloadClick: () => void;
}

/** Wide intro header: who, what, where, and every way to follow up. */
const Hero: React.FC<HeroProps> = ({ data, styles, isDark, onDownloadClick }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-6 sm:gap-8 items-start">
      <div
        className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full border overflow-hidden flex-shrink-0 border-line bg-surface`}
      >
        <img
          src={data.photo || `https://github.com/${data.github}.png`}
          alt={data.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            // photo missing → GitHub avatar → initials (each tried once)
            const step = Number(img.dataset.fallback || 0);
            img.dataset.fallback = String(step + 1);
            if (data.photo && step === 0) { img.src = `https://github.com/${data.github}.png`; return; }
            if (step > 1) return;
            img.src =`https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=${
              isDark ? '161b22' : 'f6f8fa'
            }&color=${isDark ? 'e6edf3' : '1f2328'}&size=512`;
          }}
        />
      </div>

      <div className="space-y-4 min-w-0">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{data.name}</h1>
          <p className={`text-base sm:text-lg ${styles.accent} font-medium`}>{data.title}</p>
          <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm ${styles.secondaryText}`}>
            <span className="flex items-center gap-1.5">
              <MapPinIcon className="w-4 h-4" />
              {data.location || 'Remote'}
            </span>
            <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:underline min-w-0">
              <MailIcon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{data.email}</span>
            </a>
          </div>
        </div>

        <p className="text-[15px] leading-relaxed max-w-3xl">{data.about}</p>

        {data.aboutPoints && data.aboutPoints.length > 0 && (
          <ul className="space-y-1.5 max-w-3xl">
            {data.aboutPoints.map((pt, i) => {
              const cut = pt.indexOf(': ');
              const label = cut > 0 && cut < 24 ? pt.slice(0, cut) : '';
              const text = label ? pt.slice(cut + 2) : pt;
              return (
                <li key={i} className="grid grid-cols-[6.5rem,1fr] gap-2 text-sm leading-snug">
                  <span className={`font-semibold ${styles.accent}`}>{label}</span>
                  <span className={styles.secondaryText}>{text}</span>
                </li>
              );
            })}
          </ul>
        )}

        {data.researchInterests && data.researchInterests.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Research interests">
            {data.researchInterests.map((r, i) => (
              <span key={i} className={`text-xs px-2.5 py-1 rounded-full border font-medium ${styles.btn}`}>
                {r}
              </span>
            ))}
          </div>
        )}

        <div className="pt-1">
          <LinkRow p={data} styles={styles} onDownload={onDownloadClick} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
