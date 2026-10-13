import React from 'react';
import { NewsItem } from '../types';
import { MegaphoneIcon } from 'lucide-react';

interface NewsProps {
  items: NewsItem[];
  styles: any;
}

const News: React.FC<NewsProps> = ({ items, styles }) => {
  return (
    <section className={`p-4 rounded-md border ${styles.card}`}>
      <div className="flex items-center gap-2 mb-3">
        <MegaphoneIcon className="w-4 h-4 opacity-60" />
        <h3 className="text-xs font-bold uppercase tracking-wider opacity-70">News</h3>
      </div>
      <ul className="space-y-2">
        {items.map((n, i) => (
          <li key={i} className="flex gap-3 text-xs leading-relaxed">
            <span className={`font-mono whitespace-nowrap ${styles.accent}`}>{n.date}</span>
            <span className={styles.secondaryText}>
              {n.url ? (
                <a href={n.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {n.text}
                </a>
              ) : (
                n.text
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default News;
