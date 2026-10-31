'use client';

import React, { useState } from 'react';
import { MaterialIcon } from './MaterialIcon';

export const SafetyBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="border-b border-line bg-white px-4 py-2 text-xs text-muted">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-brand-600 flex-shrink-0">
              <MaterialIcon name="security" size={14} />
            </span>
            <p>
              <strong className="text-ink font-semibold">FUOYE Student Alert:</strong> Never pay any upfront "lodge form fee" before physical inspection.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="text-brand-600 hover:text-brand-700 font-semibold underline flex items-center gap-0.5 text-xs"
            >
              <span>Safety Guide</span>
              <MaterialIcon name="chevron_right" size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-ink p-1"
              aria-label="Dismiss banner"
            >
              <MaterialIcon name="close" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Safety Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-in fade-in">
          <div className="rounded-[16px] border border-line bg-white max-w-md w-full p-5 sm:p-6 shadow-ios relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-muted hover:text-ink p-1.5 rounded-full hover:bg-surface transition"
            >
              <MaterialIcon name="close" size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-[10px] bg-brand-50 text-brand-600 flex items-center justify-center">
                <MaterialIcon name="shield" size={22} fill />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-ink">
                  FUOYE Lodge Inspection Rules
                </h3>
                <p className="text-xs text-muted">Protect your school fees & deposits</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-muted">
              <div className="flex items-start gap-2.5 rounded-[10px] border border-line bg-surface p-3">
                <MaterialIcon name="check_circle" size={18} className="text-brand-500 mt-0.5 flex-shrink-0" fill />
                <p>
                  <strong className="text-ink font-semibold">Inspect in Daylight:</strong> Always visit lodges in Phase 1, Phase 2, or Falagun during daytime with coursemates.
                </p>
              </div>

              <div className="flex items-start gap-2.5 rounded-[10px] border border-line bg-surface p-3">
                <MaterialIcon name="check_circle" size={18} className="text-brand-500 mt-0.5 flex-shrink-0" fill />
                <p>
                  <strong className="text-ink font-semibold">Zero "Form Fees":</strong> Authentic FUOYE caretakers do not charge upfront fees just to view an available room.
                </p>
              </div>

              <div className="flex items-start gap-2.5 rounded-[10px] border border-line bg-surface p-3">
                <MaterialIcon name="check_circle" size={18} className="text-brand-500 mt-0.5 flex-shrink-0" fill />
                <p>
                  <strong className="text-ink font-semibold">Test Borehole & Light:</strong> Turn on water taps yourself to verify automated pumping. Ask existing tenants about light stability.
                </p>
              </div>

              <div className="flex items-start gap-2.5 rounded-[10px] border border-line bg-surface p-3">
                <MaterialIcon name="check_circle" size={18} className="text-brand-500 mt-0.5 flex-shrink-0" fill />
                <p>
                  <strong className="text-ink font-semibold">Receipt & Keys on Payment:</strong> Pay into verifiable accounts only after reviewing a written agreement and obtaining keys.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full min-h-[44px] rounded-[10px] bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition active:scale-[0.98]"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </>
  );
};
