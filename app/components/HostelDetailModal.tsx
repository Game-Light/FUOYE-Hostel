'use client';

import React, { useState } from 'react';
import { MaterialIcon } from './MaterialIcon';
import { Hostel } from '../types';

interface HostelDetailModalProps {
  hostel: Hostel | null;
  onClose: () => void;
  onOpenCalculator: (hostel: Hostel) => void;
}

export const HostelDetailModal: React.FC<HostelDetailModalProps> = ({
  hostel,
  onClose,
  onOpenCalculator,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!hostel) return null;

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalPackage =
    hostel.pricePerYear +
    hostel.cautionFee +
    hostel.legalAndAgencyFee +
    (hostel.serviceCharge || 0);

  const whatsappText = encodeURIComponent(
    `Hello ${hostel.agent.name},\n\nI want to schedule an inspection for "${hostel.title}" (${hostel.roomType}) at ${hostel.area} on FUOYE Hostels.\n\nRent: ${formatNaira(
      hostel.pricePerYear
    )}/year\nWhen is convenient for a physical walkthrough?`
  );
  const whatsappUrl = `https://wa.me/${hostel.agent.whatsappNumber}?text=${whatsappText}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink/50 backdrop-blur-sm animate-in fade-in">
      {/* iOS Modal Sheet: constrained flex column container */}
      <div className="rounded-t-[24px] sm:rounded-[20px] border border-line bg-white w-full max-w-2xl h-[92vh] max-h-[92vh] sm:h-auto sm:max-h-[88vh] flex flex-col shadow-ios-sheet overflow-hidden relative">
        {/* iOS Pull Indicator for mobile */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center flex-shrink-0 bg-white">
          <div className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        {/* Circular Close Button (Apple HIG 44px tap target) */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 hover:text-ink border border-line shadow-sm active:scale-90 transition"
          aria-label="Close details"
        >
          <MaterialIcon name="close" size={20} />
        </button>

        {/* Scrollable Container (flex-1 min-h-0 allows natural, full scrolling to the very bottom) */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* Main Photo Gallery */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-surface border-b border-line">
            <img
              src={hostel.images[activeImageIndex]}
              alt={hostel.title}
              className="h-full w-full object-cover"
            />

            {/* Availability Overlay if Taken */}
            {!hostel.isAvailable && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                <div className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <MaterialIcon name="block" size={16} />
                  <span>Currently Occupied / Taken</span>
                </div>
              </div>
            )}

            {/* Thumbnail Row */}
            {hostel.images.length > 1 && (
              <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 overflow-x-auto py-1">
                {hostel.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-12 w-12 rounded-[10px] overflow-hidden border-2 flex-shrink-0 transition active:scale-95 ${
                      activeImageIndex === idx
                        ? 'border-brand-500 scale-105 shadow-sm'
                        : 'border-white/70 opacity-80'
                    }`}
                  >
                    <img src={img} alt="thumb" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Body */}
          <div className="p-5 sm:p-7 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="rounded-full bg-brand-50 text-brand-700 border border-brand-200/60 px-3 py-0.5 text-xs font-semibold">
                  {hostel.roomType}
                </span>
                <span className="rounded-full bg-surface text-muted border border-line px-3 py-0.5 text-xs font-medium flex items-center gap-1">
                  <MaterialIcon name="directions_walk" size={15} className="text-brand-500" />
                  <span>{hostel.gateProximity}</span>
                </span>
                {hostel.isAvailable ? (
                  <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Available</span>
                  </span>
                ) : (
                  <span className="rounded-full bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span>Occupied / Taken</span>
                  </span>
                )}
                {hostel.inspectedByCampusHub && (
                  <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1">
                    <MaterialIcon name="verified" size={14} fill />
                    <span>FUOYE Inspected</span>
                  </span>
                )}
              </div>

              <h1 className="font-display text-xl sm:text-2xl font-bold text-ink leading-tight">
                {hostel.title}
              </h1>

              <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                <MaterialIcon name="location_on" size={16} className="text-brand-500 flex-shrink-0" />
                <span>{hostel.area} &bull; {hostel.campusName}</span>
              </p>
            </div>

            {/* Price Box */}
            <div className="rounded-[14px] border border-line bg-surface p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-muted uppercase">Annual Rent</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
                    {formatNaira(hostel.pricePerYear)}
                  </span>
                  <span className="text-xs text-muted font-normal">/ year</span>
                </div>
                <p className="text-xs text-muted mt-1">
                  Total First Year Package: <strong className="text-ink">{formatNaira(totalPackage)}</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenCalculator(hostel)}
                className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-[10px] bg-white border border-line px-3.5 text-xs font-semibold text-ink hover:bg-surface transition self-start sm:self-auto active:scale-95 shadow-sm"
              >
                <MaterialIcon name="calculate" size={16} className="text-brand-500" />
                <span>See Fee Breakdown</span>
              </button>
            </div>

            {/* FULL DETAILED FACILITIES */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center">
                  <MaterialIcon name="check_circle" size={16} fill />
                </div>
                <h2 className="font-display text-base font-bold text-ink">
                  Full Detailed Facility Breakdown
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hostel.facilities.map((facility) => (
                  <div
                    key={facility.id}
                    className="flex items-start gap-3 rounded-[12px] border border-line bg-surface/70 p-3.5 hover:bg-white hover:border-brand-500/40 transition"
                  >
                    <div className="h-10 w-10 rounded-[10px] bg-white border border-line flex items-center justify-center text-brand-600 shadow-sm flex-shrink-0">
                      <MaterialIcon name={facility.icon} size={22} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{facility.name}</p>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">
                        {facility.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description & Rules */}
            <div>
              <h2 className="font-display text-base font-bold text-ink mb-2">
                About this Lodge
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-surface p-4 rounded-[12px] border border-line">
                {hostel.description}
              </p>
            </div>

            {/* Agent / Contact Card */}
            <div className="rounded-[14px] border border-line bg-surface p-4 mb-2">
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block mb-2">
                Assigned FUOYE Agent
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-brand-500 text-white font-bold text-base flex items-center justify-center shadow-sm">
                    {hostel.agent.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-ink flex items-center gap-1.5">
                      {hostel.agent.name}
                      {hostel.agent.isVerified && (
                        <MaterialIcon name="verified" size={16} className="text-blue-600" fill />
                      )}
                    </p>
                    <p className="text-xs text-muted">
                      {hostel.agent.agencyName || 'Independent FUOYE Agent'} &bull; ★ {hostel.agent.rating} ({hostel.agent.reviewsCount} reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NON-ABSOLUTE Sticky Bottom Footer (Naturally sits beneath the scrollable content; zero cutoff!) */}
        <div className="flex-shrink-0 border-t border-line bg-white/95 backdrop-blur-xl p-3 sm:p-4 flex items-center gap-3 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[44px] rounded-[10px] bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition"
          >
            <MaterialIcon name="chat" size={20} fill />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${hostel.agent.phone}`}
            className="min-h-[44px] px-5 rounded-[10px] bg-white hover:bg-surface active:scale-[0.98] text-ink border border-line font-semibold text-sm flex items-center justify-center gap-1.5 transition"
          >
            <MaterialIcon name="call" size={20} className="text-muted" />
            <span className="hidden sm:inline">Call Agent</span>
          </a>
        </div>
      </div>
    </div>
  );
};
