import React from 'react';

import {
  SunIcon,
  MoonIcon,
} from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  styles: any;
  name: string;
  photo?: string;
}

const Header: React.FC<HeaderProps> = ({
  isDark,
  setIsDark,
  styles,
  name,
  photo,
}) => {
  const initials = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${!isDark ? '161b22' : 'f6f8fa'}&color=${!isDark ? 'e6edf3' : '1f2328'}&size=512`;
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${styles.header} backdrop-blur-md`}
    >
      <nav className="w-full mx-auto px-4 md:px-8 py-3 flex justify-between items-center max-w-5xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full border border-line overflow-hidden">
            <img
              src={photo || initials}
              alt=""
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                if (img.src !== initials) img.src = initials;
              }}
            />
          </div>
          <a href="#top" className="font-bold text-sm tracking-tight hidden sm:inline hover:underline">
            {name}
          </a>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-5 text-sm">
            {['Projects', 'Experience', 'Skills', 'Education'].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="opacity-70 hover:opacity-100 hover:underline transition-opacity">
                {s}
              </a>
            ))}
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-1.5 rounded-md border flex items-center justify-center transition-all duration-200 ${styles.btn}`}
            title={
              isDark
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            {/* ✅ Theme Icon */}
            {isDark ? (
              <SunIcon className="w-4 h-4" />
            ) : (
              <MoonIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
