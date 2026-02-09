import React, { useState, useEffect, useMemo } from 'react';
import { PortfolioData, Project, Education, Experience } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import EducationSection from './components/Education';
import ExperienceTabs from './components/ExperienceTabs';
import Contact from './components/Contact';
import DetailModal from './components/DetailModal';
import DownloadCVModal from './components/DownloadCVModal';
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

  // Load portfolio JSON data
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/ekansh-bajpai/ekansh-bajpai.github.io/refs/heads/main/data.json')
      .then(res => res.json())
      .then((json: PortfolioData) => {
        setData(json);
        if (json.tabs && json.tabs.length > 0) setActiveTab(json.tabs[0].id);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load portfolio data:', err);
        setLoading(false);
      });
  }, []);

  // Theme-based styles
  const styles = useMemo(() => {
    if (isDark) {
      return {
        body: 'bg-[#0d1117] text-[#e6edf3] font-sans',
        header: 'bg-[#161b22]/95 border-[#30363d] text-[#e6edf3]',
        card: 'bg-[#161b22] border-[#30363d] hover:border-[#8b949e] shadow-none',
        accent: 'text-[#58a6ff]',
        accentBg: 'bg-[#238636] hover:bg-[#2ea043]',
        secondaryText: 'text-[#7d8590]',
        btn: 'bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d] hover:border-[#8b949e]',
        btnActive: 'bg-[#0d1117] border-[#f78166] border-b-2 font-bold text-[#f0f6fc]',
        modalCard: 'bg-[#161b22] border-[#30363d] text-[#e6edf3]',
        modalHeader: 'bg-[#161b22] border-[#30363d]',
        footer: 'bg-[#161b22] border-[#30363d]',
      };
    }
    return {
      body: 'bg-white text-[#1f2328] font-sans',
      header: 'bg-[#f6f8fa]/95 border-[#d0d7de] text-[#1f2328]',
      card: 'bg-white border-[#d0d7de] hover:border-[#d0d7de] shadow-none',
      accent: 'text-[#0969da]',
      accentBg: 'bg-[#2da44e] hover:bg-[#2c974b]',
      secondaryText: 'text-[#656d76]',
      btn: 'bg-[#f6f8fa] text-[#1f2328] border-[#d0d7de] hover:bg-[#f3f4f6]',
      btnActive: 'bg-white border-[#fd8c73] border-b-2 font-bold',
      modalCard: 'bg-white border-[#d0d7de] text-[#1f2328]',
      modalHeader: 'bg-[#f6f8fa] border-[#d0d7de]',
      footer: 'bg-white border-[#d0d7de]',
    };
  }, [isDark]);

  useEffect(() => {
    document.body.className = `${styles.body} transition-all duration-300`;
  }, [styles]);

  const handleDownloadConfirm = () => {
    if (data) {
      const link = document.createElement('a');
      link.href = data.personalInfo.resumeUrl[activeTab];
      link.target = "_blank"
      link.download = `Ekansh_Bajpai_Resume_${activeTab}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const activeTabName = useMemo(() => {
    return data?.tabs.find(t => t.id === activeTab)?.name || "Default";
  }, [data, activeTab]);

  if (loading || !data) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? 'bg-[#0d1117] text-white' : 'bg-white text-black'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-10 h-10 border-4 border-t-transparent ${
              isDark ? 'border-blue-500' : 'border-blue-600'
            } rounded-full animate-spin`}
          ></div>
          <p className="font-bold text-sm tracking-tight opacity-50">
            Initializing...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      <Header isDark={isDark} setIsDark={setIsDark} styles={styles} name={data.personalInfo.name} />

      <main className="flex-grow container mx-auto px-4 md:px-8 py-8 md:py-10 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <aside className="w-full md:w-72 lg:w-80 flex-shrink-0 space-y-6">
            <Hero data={data.personalInfo} styles={styles} isDark={isDark} />
            <Contact personalInfo={data.personalInfo} onDownloadClick={() => setIsDownloadModalOpen(true)}/>
          </aside>

          <div className="flex-grow space-y-12">
            <ExperienceTabs
              tabs={data.tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              styles={styles}
              onProjectClick={p =>
                setSelectedItem({ data: p, type: 'project' })
              }
              onExperienceClick={e =>
                setSelectedItem({ data: e, type: 'experience' })
              }
            />

            <section id="education" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-6 border-b pb-2 border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-bold">Education</h2>
              </div>
              <EducationSection
                education={data.education}
                styles={styles}
                onEducationClick={e =>
                  setSelectedItem({ data: e, type: 'education' })
                }
              />
            </section>
          </div>
        </div>
      </main>

      <footer
        className={`${styles.header} border-t py-10 mt-12 text-center transition-all duration-300`}
      >
        <div className="container mx-auto px-6">
          <p className={`${styles.secondaryText} text-xs`}>
            © {new Date().getFullYear()} {data.personalInfo.name}. Built with React
            & Tailwind CSS.
          </p>
          <div className="mt-4 flex justify-center items-center gap-4 text-xs font-mono">
            <span className={styles.accent}>status: active</span>
            <span className={styles.secondaryText}>v1.0.0</span>
          </div>
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
        tabName={activeTabName}
        styles={styles}
        isDark={isDark}
      />
    </div>
  );
};

export default App;
