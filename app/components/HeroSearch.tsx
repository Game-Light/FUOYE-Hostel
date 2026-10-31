'use client';

import React from 'react';
import { MaterialIcon } from './MaterialIcon';
import { Campus, FilterState } from '../types';

interface HeroSearchProps {
  campuses: Campus[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResults: number;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  campuses,
  filters,
  setFilters,
  totalResults,
}) => {
  const currentCampus = campuses.find((c) => c.id === filters.campusId) || campuses[0];

  const handleReset = () => {
    setFilters({
      campusId: 'oye',
      area: 'All Areas',
      roomType: 'all',
      maxBudget: 1500000,
      walkingDistanceOnly: false,
      solarOnly: false,
      verifiedAgentsOnly: false,
    });
  };

  return (
    <section className="bg-[radial-gradient(60%_50%_at_50%_0%,#ecfdf5,transparent)] border-b border-line">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 pb-10 text-center">
        {/* iOS-Style Pill Tag */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200/70 px-3.5 py-1 text-xs font-semibold text-brand-700">
          <MaterialIcon name="verified" size={16} className="text-brand-600" fill />
          <span>FUOYE Student Lodges &bull; Zero Fake Agent Fees</span>
        </div>

        {/* Montserrat Heading */}
        <h1 className="mt-4 font-display font-extrabold text-2xl sm:text-4xl text-ink tracking-tight">
          Find your lodge in Oye-Ekiti & Ikole without stress.
        </h1>

        <p className="mt-2 text-sm sm:text-base text-muted max-w-lg mx-auto">
          Verified off-campus accommodations around Phase 1, Phase 2, Falagun, Ayegbaju road and Ikole campus.
        </p>

        {/* iOS Segmented Campus Control (Apple HIG) */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex p-1 rounded-[12px] bg-[#e5e5ea]/70 border border-line backdrop-blur-sm w-full max-w-sm">
            {campuses.map((campus) => {
              const isSelected = filters.campusId === campus.id;
              return (
                <button
                  key={campus.id}
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      campusId: campus.id,
                      area: 'All Areas',
                    }))
                  }
                  className={`flex-1 min-h-[40px] rounded-[10px] text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-white text-ink shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <MaterialIcon
                    name={campus.id === 'oye' ? 'school' : 'engineering'}
                    size={18}
                    className={isSelected ? 'text-brand-500' : 'text-muted'}
                  />
                  <span>{campus.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-2 text-[11px] text-muted italic">
          {currentCampus.tagline}
        </p>

        {/* Search Card (Apple HIG form fields, min 44px height) */}
        <div className="mt-6 w-full rounded-[16px] border border-line bg-white p-4 sm:p-5 shadow-ios text-left">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Campus Area */}
            <div>
              <label className="block text-xs font-semibold text-muted mb-1.5 flex items-center gap-1">
                <MaterialIcon name="location_on" size={16} className="text-brand-500" />
                <span>Area / Campus Zone</span>
              </label>
              <select
                value={filters.area}
                onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                className="w-full min-h-[44px] rounded-[10px] border border-line bg-surface px-3 py-2 text-sm font-medium text-ink focus:border-brand-500 focus:bg-white focus:outline-none transition cursor-pointer"
              >
                {currentCampus.areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-xs font-semibold text-muted mb-1.5 flex items-center gap-1">
                <MaterialIcon name="door_front" size={16} className="text-brand-500" />
                <span>Room Type</span>
              </label>
              <select
                value={filters.roomType}
                onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
                className="w-full min-h-[44px] rounded-[10px] border border-line bg-surface px-3 py-2 text-sm font-medium text-ink focus:border-brand-500 focus:bg-white focus:outline-none transition cursor-pointer"
              >
                <option value="all">Any Room Type</option>
                <option value="Self-Contained">Self-Contained</option>
                <option value="Single Room">Single Room</option>
                <option value="2-Bedroom Flat">2-Bedroom Flat</option>
                <option value="Bedspace">Bedspace / Roommate</option>
              </select>
            </div>

            {/* Max Budget */}
            <div>
              <label className="block text-xs font-semibold text-muted mb-1.5 flex items-center gap-1">
                <MaterialIcon name="payments" size={16} className="text-brand-500" />
                <span>Max Rent / Year</span>
              </label>
              <select
                value={filters.maxBudget}
                onChange={(e) => setFilters({ ...filters, maxBudget: Number(e.target.value) })}
                className="w-full min-h-[44px] rounded-[10px] border border-line bg-surface px-3 py-2 text-sm font-medium text-ink focus:border-brand-500 focus:bg-white focus:outline-none transition cursor-pointer"
              >
                <option value="1500000">Any Budget (Up to ₦1.5M)</option>
                <option value="150000">Under ₦150,000 / yr</option>
                <option value="250000">Under ₦250,000 / yr</option>
                <option value="350000">Under ₦350,000 / yr</option>
                <option value="500000">Under ₦500,000 / yr</option>
              </select>
            </div>
          </div>

          {/* Quick Apple HIG Toggle Pills */}
          <div className="mt-4 pt-3.5 border-t border-line flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    walkingDistanceOnly: !prev.walkingDistanceOnly,
                  }))
                }
                className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition border ${
                  filters.walkingDistanceOnly
                    ? 'bg-brand-50 border-brand-500 text-brand-700 font-semibold'
                    : 'bg-surface border-line text-muted hover:text-ink'
                }`}
              >
                <MaterialIcon name="directions_walk" size={16} className="text-brand-500" />
                <span>Walking distance</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    solarOnly: !prev.solarOnly,
                  }))
                }
                className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition border ${
                  filters.solarOnly
                    ? 'bg-brand-50 border-brand-500 text-brand-700 font-semibold'
                    : 'bg-surface border-line text-muted hover:text-ink'
                }`}
              >
                <MaterialIcon name="solar_power" size={16} className="text-brand-500" />
                <span>24/7 Solar / Inverter</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    verifiedAgentsOnly: !prev.verifiedAgentsOnly,
                  }))
                }
                className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition border ${
                  filters.verifiedAgentsOnly
                    ? 'bg-brand-50 border-brand-500 text-brand-700 font-semibold'
                    : 'bg-surface border-line text-muted hover:text-ink'
                }`}
              >
                <MaterialIcon name="verified_user" size={16} className="text-brand-500" />
                <span>Verified agents</span>
              </button>
            </div>

            <div className="flex items-center gap-3 ml-auto text-xs">
              <span className="text-muted">
                <strong className="text-ink font-semibold">{totalResults}</strong> lodges available
              </span>
              {(filters.area !== 'All Areas' ||
                filters.roomType !== 'all' ||
                filters.maxBudget < 1500000 ||
                filters.walkingDistanceOnly ||
                filters.solarOnly ||
                filters.verifiedAgentsOnly) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-0.5"
                >
                  <MaterialIcon name="restart_alt" size={16} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
