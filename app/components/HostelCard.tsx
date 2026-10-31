'use client';

import React from 'react';
import { MaterialIcon } from './MaterialIcon';
import { Hostel } from '../types';

interface HostelCardProps {
  hostel: Hostel;
  onOpenDetails: (hostel: Hostel) => void;
  onOpenCalculator: (hostel: Hostel) => void;
}

export const HostelCard: React.FC<HostelCardProps> = ({
  hostel,
  onOpenDetails,
  onOpenCalculator,
}) => {
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
    `Hello ${hostel.agent.name},\n\nI saw your listing for "${hostel.title}" at ${hostel.area} (${hostel.campusName}) on FUOYE Hostels for ${formatNaira(
      hostel.pricePerYear
    )}/year.\n\nIs it still available for physical inspection?`
  );
  const whatsappUrl = `https://wa.me/${hostel.agent.whatsappNumber}?text=${whatsappText}`;

  return (
    <article className="group flex flex-col rounded-[16px] border border-line bg-white overflow-hidden shadow-ios transition-all duration-200 hover:border-brand-500/50 active:scale-[0.995]">
      {/* Photo Header */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-surface cursor-pointer border-b border-line"
        onClick={() => onOpenDetails(hostel)}
      >
        <img
          src={hostel.images[0]}
          alt={hostel.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Room Type badge (Apple HIG style translucent pill) */}
        <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-ink border border-line shadow-sm">
          {hostel.roomType}
        </div>

        {/* Campus Gate Walking distance badge */}
        <div className="absolute bottom-3 left-3 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-slate-800 border border-line shadow-sm flex items-center gap-1">
          <MaterialIcon name="directions_walk" size={16} className="text-brand-500" />
          <span>{hostel.gateProximity}</span>
        </div>

        {/* Inspected Badge */}
        {hostel.inspectedByCampusHub && (
          <div className="absolute top-3 right-3 rounded-full bg-emerald-600 text-white px-2 py-0.5 text-[10px] font-bold shadow-sm flex items-center gap-0.5">
            <MaterialIcon name="verified" size={14} fill />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location Area */}
          <div className="flex items-center gap-1 text-xs text-muted mb-1 font-medium">
            <MaterialIcon name="location_on" size={15} className="text-brand-500 flex-shrink-0" />
            <span className="truncate">{hostel.area}</span>
          </div>

          {/* Title */}
          <h2
            onClick={() => onOpenDetails(hostel)}
            className="font-display font-bold text-base text-ink leading-snug hover:text-brand-600 transition cursor-pointer line-clamp-2"
          >
            {hostel.title}
          </h2>

          {/* FACILITY PART: REPRESENTED BY ICONS ONLY (Per user requirement) */}
          <div className="mt-3.5 pt-3 border-t border-line/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                Facilities:
              </span>
              <button
                type="button"
                onClick={() => onOpenDetails(hostel)}
                className="text-[11px] font-semibold text-brand-600 hover:text-brand-700"
              >
                View details &rarr;
              </button>
            </div>

            {/* Icon-Only Facilities Row */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {hostel.facilities.map((fac) => (
                <div
                  key={fac.id}
                  title={`${fac.name}: ${fac.description}`}
                  onClick={() => onOpenDetails(hostel)}
                  className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-surface border border-line text-slate-700 hover:text-brand-600 hover:border-brand-500/50 hover:bg-brand-50/50 transition cursor-pointer"
                  aria-label={fac.name}
                >
                  <MaterialIcon name={fac.icon} size={18} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & CTA Section */}
        <div className="mt-5 pt-3.5 border-t border-line">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-display text-xl sm:text-2xl font-extrabold text-ink">
                {formatNaira(hostel.pricePerYear)}
              </span>
              <span className="text-xs text-muted font-normal ml-1">/yr</span>
            </div>

            {/* Total Package Popover Trigger */}
            <button
              onClick={() => onOpenCalculator(hostel)}
              className="text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200/60 rounded-[8px] px-2.5 py-1 transition flex items-center gap-1 active:scale-95"
            >
              <MaterialIcon name="calculate" size={15} />
              <span>Total: {formatNaira(totalPackage)}</span>
            </button>
          </div>

          {/* Agent Line */}
          <div className="mt-3 flex items-center justify-between py-2 px-3 rounded-[10px] bg-surface border border-line text-xs">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs">
                {hostel.agent.name[0]}
              </div>
              <span className="font-medium text-ink flex items-center gap-1">
                {hostel.agent.name}
                {hostel.agent.isVerified && (
                  <MaterialIcon name="check_circle" size={14} className="text-blue-600" fill />
                )}
              </span>
            </div>
            <span className="text-muted text-[11px] font-medium">
              ★ {hostel.agent.rating} ({hostel.agent.reviewsCount})
            </span>
          </div>

          {/* Apple HIG Minimum 44px Tap Target CTA Buttons */}
          <div className="mt-3.5 grid grid-cols-2 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] rounded-[10px] bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition"
            >
              <MaterialIcon name="chat" size={18} fill />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${hostel.agent.phone}`}
              className="min-h-[44px] rounded-[10px] bg-white hover:bg-surface active:scale-[0.98] text-ink border border-line font-semibold text-sm flex items-center justify-center gap-1.5 transition"
            >
              <MaterialIcon name="call" size={18} className="text-muted" />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
