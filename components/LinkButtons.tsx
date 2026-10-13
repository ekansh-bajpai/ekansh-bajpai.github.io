import React from 'react';
import { LinkItem, Media } from '../types';
import { ExternalLinkIcon } from 'lucide-react';

/** Named link buttons; the first one is highlighted. Clicks don't open the surrounding card. */
export const LinkButtons: React.FC<{ links: LinkItem[]; styles: any; small?: boolean }> = ({ links, styles, small }) => (
  <div className="flex flex-wrap gap-2">
    {links.map((l, i) => (
      <a
        key={i}
        href={l.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        className={`flex items-center gap-1.5 rounded-md font-bold transition-colors border ${
          small ? 'px-2 py-0.5 text-[10px]' : 'px-4 py-2 text-xs'
        } ${i === 0 && !small ? `${styles.accentBg} text-white border-transparent` : styles.btn}`}
      >
        <ExternalLinkIcon className={small ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        {l.label}
      </a>
    ))}
  </div>
);

/** `media` may be one item or a list; always work with a list. */
export const mediaList = (m?: Media | Media[]): Media[] => (m ? (Array.isArray(m) ? m : [m]) : []);

/** Image / GIF or muted looping video. */
export const MediaView: React.FC<{ media: Media; className?: string; controls?: boolean }> = ({ media, className, controls }) =>
  media.type === 'video' ? (
    <video
      src={media.url}
      poster={media.poster}
      className={className}
      muted
      loop
      playsInline
      autoPlay
      controls={controls}
      aria-label={media.caption}
    />
  ) : (
    <img src={media.url} alt={media.caption || ''} loading="lazy" className={className} />
  );
