import React from 'react';
import Hero from '../components/Hero';
import News from '../components/News';
import ExperienceTabs from '../components/ExperienceTabs';
import EducationSection from '../components/Education';
import { LayoutProps } from '../components/ui';

/** Profile: intro header, news, category tabs (featured spotlight → projects → experience → skills), education. */
const ProfileLayout: React.FC<LayoutProps> = ({ data, styles, isDark, activeTab, setActiveTab, openItem, onDownload }) => (
  <main className="flex-grow w-full mx-auto px-4 md:px-8 py-8 md:py-12 max-w-5xl">
    <div className="space-y-12">
      <Hero data={data.personalInfo} styles={styles} isDark={isDark} onDownloadClick={onDownload} />

      {data.news && data.news.length > 0 && <News items={data.news} styles={styles} />}

      <ExperienceTabs
        tabs={data.tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        styles={styles}
        onProjectClick={(p) => openItem({ data: p, type: 'project' })}
        onExperienceClick={(e) => openItem({ data: e, type: 'experience' })}
      />

      <section id="education" className="scroll-mt-28">
        <div className="flex items-center gap-2 mb-6 border-b pb-2 border-line">
          <h2 className="text-lg font-semibold">Education</h2>
        </div>
        <EducationSection education={data.education} styles={styles} onEducationClick={(e) => openItem({ data: e, type: 'education' })} />
      </section>
    </div>
  </main>
);

export default ProfileLayout;
