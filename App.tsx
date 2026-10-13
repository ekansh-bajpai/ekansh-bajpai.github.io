import React, { useState, useEffect, useMemo } from 'react';
import { PortfolioData, Project, Education, Experience } from './types';
import Header from './components/Header';
import DetailModal from './components/DetailModal';
import DownloadCVModal from './components/DownloadCVModal';
import ProfileLayout from './layouts/ProfileLayout';
import { ContactEmailContext } from './components/LinkButtons';

// import StatsSection from './components/Stats'; // optional, uncomment if needed

// 🔹 Theme helpers
const getInitialTheme = () => {
  if (typeof window === 'undefined') return false;

  const stored = localStorage.getItem('theme');
  if (stored === 'dark') return true;
  if (stored === 'light') return false;

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<{
    data: Project | Education | Experience;
    type: 'project' | 'education' | 'experience';
  } | null>(null);

  // 🔹 Sync with system theme changes (unless user overrides)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Load portfolio JSON data (live file on GitHub; the local copy while developing)
  useEffect(() => {
    const dataUrl = import.meta.env.DEV
      ? '/data.json'
      : 'https://raw.githubusercontent.com/ekansh-bajpai/ekansh-bajpai.github.io/refs/heads/main/data.json';
    fetch(dataUrl)
      .then(res => res.json())
      .then((json: PortfolioData) => {
        setData(json);
        // ?tab=<id> opens that tab directly (e.g. ?tab=research for PhD applications)
        const requested = new URLSearchParams(window.location.search).get('tab');
        const fallback = json.tabs?.some(t => t.id === json.defaultTab) ? json.defaultTab : json.tabs?.[0]?.id;
        if (requested && json.tabs?.some(t => t.id === requested)) setActiveTab(requested);
        else if (fallback) setActiveTab(fallback);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load portfolio data:', err);
        setLoading(false);
      });
  }, []);

  // Theme-based styles: colours come from the CSS variables in palettes.css (Nordic Slate, light + dark)
  const styles = useMemo(() => ({
    body: 'bg-bg text-ink font-sans',
    header: 'bg-surface/95 border-line text-ink',
    card: 'bg-card border-line hover:border-muted/60 shadow-none',
    accent: 'text-accent',
    accentBg: 'bg-cta hover:bg-cta-hover',
    secondaryText: 'text-muted',
    btn: 'bg-surface text-ink border-line hover:border-muted/60',
    btnActive: 'border-b-2 font-bold text-ink',
    modalCard: 'bg-card border-line text-ink',
    modalHeader: 'bg-surface border-line',
    footer: 'bg-card border-line',
  }), []);

  useEffect(() => {
    document.body.className = `${styles.body} transition-all duration-300`;
  }, [styles]);

  // `dark:` utilities follow the toggle (Tailwind darkMode: 'class')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = (dark: boolean) => {
    setIsDark(dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* storage unavailable */ }
  };

  const handleDownloadConfirm = (key: string) => {
    if (data && data.personalInfo.resumeUrl[key]) {
      const link = document.createElement('a');
      link.href = data.personalInfo.resumeUrl[key];
      link.target = "_blank"
      link.download = `Ekansh_Bajpai_Resume_${key}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };


  if (loading || !data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-bg text-ink"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-t-transparent border-accent rounded-full animate-spin"></div>
          <p className="font-bold text-sm tracking-tight opacity-50">
            Initializing...
          </p>
        </div>
      </div>
    );
  }

  return (
    <ContactEmailContext.Provider value={data.personalInfo.email}>
    <div id="top" className="min-h-screen relative flex flex-col">
      <Header isDark={isDark} setIsDark={toggleTheme} styles={styles} name={data.personalInfo.name} photo={data.personalInfo.photo} />

      <ProfileLayout
        data={data}
        styles={styles}
        isDark={isDark}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openItem={setSelectedItem}
        onDownload={() => setIsDownloadModalOpen(true)}
      />

      <footer
        className={`${styles.header} border-t py-10 mt-12 text-center transition-all duration-300`}
      >
        <div className="container mx-auto px-6">
          <p className={`${styles.secondaryText} text-xs`}>
            © {new Date().getFullYear()} {data.personalInfo.name}. Built with React
            & Tailwind CSS.
          </p>
        </div>
      </footer>

      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        styles={styles}
        isDark={isDark}
      />

      <DownloadCVModal 
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onConfirm={handleDownloadConfirm}
        resumes={data.personalInfo.resumeUrl}
        defaultKey={activeTab === 'robotics' && data.personalInfo.resumeUrl.research ? 'research' : activeTab}
        styles={styles}
        isDark={isDark}
      />
    </div>
    </ContactEmailContext.Provider>
  );
};

export default App;
