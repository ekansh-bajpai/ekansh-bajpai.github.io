import React, { createContext, useContext } from 'react';
import { LinkItem, Media } from '../types';
import { ExternalLinkIcon, LockIcon } from 'lucide-react';

/** E-mail used for "contact for access" on private links (provided once in App). */
export const ContactEmailContext = createContext<string>('');

/** Private repository: visitors can't open it, so the button e-mails an access request instead. */
const PrivateLink: React.FC<{ l: LinkItem; small?: boolean }> = ({ l, small }) => {
  const email = useContext(ContactEmailContext);
  const name = l.url.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '');
  const href = email
    ? `mailto:${email}?subject=${encodeURIComponent(`Access request: ${name}`)}&body=${encodeURIComponent(
        `Hello Ekansh,\n\nI would like access to the private repository ${l.url}.\n\nName:\nAffiliation:\nGitHub username:\nPurpose:\n`,
      )}`
    : undefined;
  return (
    <a
      href={href}
      onClick={(e) => e.stopPropagation()}
      aria-label={`${l.label}: private repository, contact for access`}
      className={`relative group/priv flex items-center gap-1.5 rounded-md font-bold border border-dashed border-line text-muted bg-surface/60 hover:text-ink hover:border-muted/60 transition-colors ${
        small ? 'px-2 py-0.5 text-[10px]' : 'px-4 py-2 text-xs'
      }`}
    >
      <LockIcon className={small ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {l.label}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 bottom-full mb-1.5 z-20 w-max max-w-[16rem] rounded-md px-2.5 py-1.5 text-[11px] font-normal leading-snug bg-gray-900 text-white shadow-lg opacity-0 group-hover/priv:opacity-100 group-focus/priv:opacity-100 transition-opacity"
      >
        Private repository · contact for access
      </span>
    </a>
  );
};

/** Named link buttons; the first one is highlighted. Clicks don't open the surrounding card. */
export const LinkButtons: React.FC<{ links: LinkItem[]; styles: any; small?: boolean }> = ({ links, styles, small }) => (
  <div className="flex flex-wrap gap-2">
    {links.map((l, i) => l.private ? <PrivateLink key={i} l={l} small={small} /> : (
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
