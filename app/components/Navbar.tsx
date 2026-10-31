'use client';

import React from 'react';
import { MaterialIcon } from './MaterialIcon';

interface NavbarProps {
  activeView: 'students' | 'agents';
  onSwitchView: (view: 'students' | 'agents') => void;
  onOpenAddModal: () => void;
  onResetCampus: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onSwitchView,
  onOpenAddModal,
  onResetCampus,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-xl transition-all">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-2 sm:gap-4">
          {/* Logo with Montserrat Font & Material Symbol */}
          <button
            onClick={() => {
              onSwitchView('students');
              onResetCampus();
            }}
            type="button"
            className="flex items-center gap-2 text-left active:opacity-75 transition touch-target"
            aria-label="FUOYE Hostels Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand-500 text-white shadow-sm flex-shrink-0">
              <MaterialIcon name="apartment" size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-ink">
                  FUOYE<span className="text-brand-500 font-bold ml-0.5">Hostels</span>
                </span>
                <span className="rounded-[4px] bg-brand-50 border border-brand-200/60 px-1 py-0.5 text-[9px] sm:text-[10px] font-bold text-brand-600">
                  Oye &bull; Ikole
                </span>
              </div>
              <p className="text-[11px] text-muted font-normal mt-0.5 hidden xs:block">
                Federal University Oye-Ekiti
              </p>
            </div>
          </button>

          {/* Apple HIG Mode Segmented Control: Students vs Agent Portal */}
          <div className="inline-flex p-0.5 rounded-[10px] bg-[#e5e5ea]/80 border border-line text-xs font-semibold">
            <button
              type="button"
              onClick={() => onSwitchView('students')}
              className={`min-h-[32px] px-2.5 sm:px-3 rounded-[8px] transition-all flex items-center gap-1 ${
                activeView === 'students'
                  ? 'bg-white text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <MaterialIcon name="search" size={15} className={activeView === 'students' ? 'text-brand-500' : 'text-muted'} />
              <span>Find Lodges</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitchView('agents')}
              className={`min-h-[32px] px-2.5 sm:px-3 rounded-[8px] transition-all flex items-center gap-1 ${
                activeView === 'agents'
                  ? 'bg-white text-brand-600 shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <MaterialIcon name="real_estate_agent" size={15} className={activeView === 'agents' ? 'text-brand-500' : 'text-muted'} />
              <span>Agent Portal</span>
            </button>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAddModal}
              type="button"
              className="inline-flex h-9 min-w-[36px] sm:min-w-[44px] items-center justify-center gap-1.5 rounded-[10px] bg-brand-500 hover:bg-brand-600 active:scale-[0.98] px-2.5 sm:px-3.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition"
            >
              <MaterialIcon name="add_circle" size={17} />
              <span className="hidden xs:inline font-medium">List Lodge</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
