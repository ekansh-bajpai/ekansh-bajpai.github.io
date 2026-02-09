import React from 'react';

import {
  SunIcon,
  MoonIcon,
  GithubIcon,
} from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  styles: any;
}

const Header: React.FC<HeaderProps> = ({
  isDark,
  setIsDark,
  styles,
}) => {
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${styles.header} backdrop-blur-md`}
    >
      <nav className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-current bg-opacity-10">
            {/* ✅ Logo Icon */}
            <GithubIcon className="w-5 h-5" />
          </div>

          <span className="font-bold text-sm tracking-tight hidden sm:inline">
            Portfolio | Ekansh Bajpai
          </span>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
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
