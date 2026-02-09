
import React from 'react';

interface DownloadCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tabName: string;
  styles: any;
  isDark: boolean;
}

const DownloadCVModal: React.FC<DownloadCVModalProps> = ({ isOpen, onClose, onConfirm, tabName, styles, isDark }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 transition-opacity">
      <div 
        className={`relative w-full max-w-md overflow-hidden rounded-xl border shadow-2xl flex flex-col ${styles.modalCard}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-4 border-b flex justify-between items-center ${styles.modalHeader}`}>
          <h3 className="text-sm font-bold">Download Resume</h3>
          <button 
            onClick={onClose}
            className={`p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${styles.secondaryText}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.accent}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold">Select CV Version</p>
              <p className={`text-xs ${styles.secondaryText}`}>
                You are about to download the <span className="font-bold text-current">{tabName}</span> specialized version of the resume.
              </p>
            </div>
          </div>

          <div className={`p-3 rounded-md text-[11px] font-mono border ${isDark ? 'bg-[#0d1117] border-[#30363d]' : 'bg-[#f6f8fa] border-[#d0d7de]'}`}>
            File: Ekansh_Bajpai_Resume.pdf
          </div>
        </div>

        <div className={`p-4 border-t flex justify-end gap-3 ${styles.footer}`}>
          <button 
            onClick={onClose}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold border transition-colors ${styles.btn}`}
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold text-white transition-colors ${styles.accentBg}`}
          >
            Download
          </button>
        </div>
      </div>
      <div className="absolute inset-0 z-[-1]" onClick={onClose}></div>
    </div>
  );
};

export default DownloadCVModal;
