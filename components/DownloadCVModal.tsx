import React, { useEffect, useState } from 'react';
import { XIcon, DownloadIcon } from 'lucide-react';

// Display names for the CV keys in data.json → personalInfo.resumeUrl (unknown keys show as-is)
const CV_LABELS: Record<string, { title: string; hint: string }> = {
  research: { title: 'Research CV', hint: 'For PhD and research positions' },
  robotics: { title: 'Robotics Engineer', hint: 'SLAM, perception, control' },
  aiml: { title: 'AI / ML Engineer', hint: 'LLMs, RAG, AI systems' },
  fullstack: { title: 'Full-Stack Developer', hint: 'Web, cloud, back-end' },
};

interface DownloadCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (key: string) => void;
  resumes: Record<string, string>;
  defaultKey: string;
  styles: any;
  isDark: boolean;
}

const DownloadCVModal: React.FC<DownloadCVModalProps> = ({ isOpen, onClose, onConfirm, resumes, defaultKey, styles, isDark }) => {
  const keys = Object.keys(resumes);
  const [choice, setChoice] = useState(defaultKey);

  // Preselect the CV that matches the open tab each time the dialog opens
  useEffect(() => {
    if (isOpen) setChoice(keys.includes(defaultKey) ? defaultKey : keys[0]);
  }, [isOpen, defaultKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 transition-opacity">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-dialog-title"
        className={`relative w-full max-w-md overflow-hidden rounded-xl border shadow-2xl flex flex-col ${styles.modalCard}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-4 border-b flex justify-between items-center ${styles.modalHeader}`}>
          <h3 id="cv-dialog-title" className="text-sm font-bold">Download CV</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className={`p-1 rounded-md hover:bg-line/60 transition-colors ${styles.secondaryText}`}
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        <fieldset className="p-4 space-y-2">
          <legend className={`text-xs mb-2 ${styles.secondaryText}`}>Choose a version:</legend>
          {keys.map((k) => {
            const label = CV_LABELS[k] || { title: k, hint: '' };
            const selected = choice === k;
            return (
              <label
                key={k}
                className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                  selected
                    ? 'border-accent bg-accent/5'
                    : 'border-line hover:border-muted/60'
                }`}
              >
                <input
                  type="radio"
                  name="cv"
                  value={k}
                  checked={selected}
                  onChange={() => setChoice(k)}
                  className="accent-accent"
                />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold">{label.title}</span>
                  {label.hint && <span className={`text-xs ${styles.secondaryText}`}>{label.hint}</span>}
                </span>
              </label>
            );
          })}
        </fieldset>

        <div className={`p-4 border-t flex justify-end gap-3 ${styles.footer}`}>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold border transition-colors ${styles.btn}`}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(choice);
              onClose();
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-semibold text-white transition-colors ${styles.accentBg}`}
          >
            <DownloadIcon className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      </div>
      <div className="absolute inset-0 z-[-1]" onClick={onClose}></div>
    </div>
  );
};

export default DownloadCVModal;
