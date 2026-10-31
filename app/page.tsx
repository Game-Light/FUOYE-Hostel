'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { SafetyBanner } from './components/SafetyBanner';
import { HeroSearch } from './components/HeroSearch';
import { HostelCard } from './components/HostelCard';
import { HostelDetailModal } from './components/HostelDetailModal';
import { TotalPackageCalculatorModal } from './components/TotalPackageCalculatorModal';
import { AddListingModal } from './components/AddListingModal';
import { AgentDashboard } from './components/AgentDashboard';
import { MaterialIcon } from './components/MaterialIcon';
import { FUOYE_CAMPUSES } from './data/campuses';
import { INITIAL_HOSTELS } from './data/hostels';
import { Hostel, FilterState } from './types';

const STORAGE_KEY = 'fuoye_hostels_v1';

export default function Home() {
  const [hostels, setHostels] = useState<Hostel[]>(INITIAL_HOSTELS);
  const [activeView, setActiveView] = useState<'students' | 'agents'>('students');

  // Load from local storage for seamless open source offline persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHostels(parsed);
        }
      }
    } catch {
      // Fallback to INITIAL_HOSTELS
    }
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    campusId: 'oye',
    area: 'All Areas',
    roomType: 'all',
    maxBudget: 1500000,
    walkingDistanceOnly: false,
    solarOnly: false,
    verifiedAgentsOnly: false,
  });

  const [selectedHostelForDetails, setSelectedHostelForDetails] = useState<Hostel | null>(null);
  const [selectedHostelForCalculator, setSelectedHostelForCalculator] = useState<Hostel | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compute filtered hostels for FUOYE
  const filteredHostels = useMemo(() => {
    return hostels.filter((hostel) => {
      // Filter by campus (Oye vs Ikole)
      if (hostel.campusId !== filters.campusId) {
        return false;
      }
      // Filter by area
      if (filters.area !== 'All Areas' && !hostel.area.toLowerCase().includes(filters.area.toLowerCase())) {
        return false;
      }
      // Filter by roomType
      if (filters.roomType !== 'all' && hostel.roomType !== filters.roomType) {
        return false;
      }
      // Filter by max budget
      if (hostel.pricePerYear > filters.maxBudget) {
        return false;
      }
      // Filter by walking distance
      if (filters.walkingDistanceOnly && hostel.distanceCategory !== 'Walking Distance') {
        return false;
      }
      // Filter by solar / inverter
      if (filters.solarOnly && !hostel.facilities.some((f) => f.id === 'solar')) {
        return false;
      }
      // Filter by verified agent
      if (filters.verifiedAgentsOnly && !hostel.agent.isVerified) {
        return false;
      }
      return true;
    });
  }, [hostels, filters]);

  // Persist helper
  const saveHostels = (updated: Hostel[]) => {
    setHostels(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Agent Actions
  const handleAddHostel = (newHostel: Hostel) => {
    const updated = [newHostel, ...hostels];
    saveHostels(updated);
    setToastMessage('Lodge listing published successfully for FUOYE!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleAvailability = (hostelId: string) => {
    const updated = hostels.map((h) => {
      if (h.id === hostelId) {
        const nextStatus = !h.isAvailable;
        setToastMessage(
          nextStatus ? `"${h.title}" marked as Available!` : `"${h.title}" marked as Taken / Occupied!`
        );
        setTimeout(() => setToastMessage(null), 3000);
        return { ...h, isAvailable: nextStatus };
      }
      return h;
    });
    saveHostels(updated);
  };

  const handleDeleteHostel = (hostelId: string) => {
    const updated = hostels.filter((h) => h.id !== hostelId);
    saveHostels(updated);
    setToastMessage('Lodge deleted successfully');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdatePrice = (hostelId: string, newPrice: number) => {
    const updated = hostels.map((h) => (h.id === hostelId ? { ...h, pricePerYear: newPrice } : h));
    saveHostels(updated);
    setToastMessage('Rent price updated successfully!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activeCampus = FUOYE_CAMPUSES.find((c) => c.id === filters.campusId) || FUOYE_CAMPUSES[0];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Toast Notification (iOS banner style) */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-ink text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top border border-line">
          <MaterialIcon name="verified" size={16} className="text-brand-400" fill />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Safety Alert Banner */}
      <SafetyBanner />

      {/* Navigation Header with Mode Switcher */}
      <Navbar
        activeView={activeView}
        onSwitchView={(v) => setActiveView(v)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onResetCampus={() => setFilters((prev) => ({ ...prev, campusId: 'oye', area: 'All Areas' }))}
      />

      {/* View Switch: Agent Portal vs Student Search View */}
      {activeView === 'agents' ? (
        <AgentDashboard
          hostels={hostels}
          onToggleAvailability={handleToggleAvailability}
          onDeleteHostel={handleDeleteHostel}
          onUpdatePrice={handleUpdatePrice}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onPreviewHostel={(h) => setSelectedHostelForDetails(h)}
        />
      ) : (
        <>
          {/* Hero & iOS Segmented Campus Search */}
          <HeroSearch
            campuses={FUOYE_CAMPUSES}
            filters={filters}
            setFilters={setFilters}
            totalResults={filteredHostels.length}
          />

          {/* Apple HIG 4-Pillar Strip */}
          <section className="border-b border-line bg-white py-3 px-4 sm:px-6">
            <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs text-muted">
              <div className="flex items-center justify-center gap-1.5 font-medium py-1">
                <MaterialIcon name="verified_user" size={17} className="text-brand-500" />
                <span>NIN Verified Caretakers</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 font-medium py-1">
                <MaterialIcon name="water_drop" size={17} className="text-brand-500" />
                <span>Borehole Water Tested</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 font-medium py-1">
                <MaterialIcon name="calculate" size={17} className="text-brand-500" />
                <span>Upfront Total Package</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 font-medium py-1">
                <MaterialIcon name="chat" size={17} className="text-brand-500" />
                <span>Direct WhatsApp Tour</span>
              </div>
            </div>
          </section>

          {/* Main Hostel Grid */}
          <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10 flex-1 w-full">
            {/* Section Title with Montserrat */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-line">
              <div>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink tracking-tight">
                  {activeCampus.name} Hostels & Lodges
                </h2>
                <p className="text-xs text-muted mt-0.5">
                  Showing {filteredHostels.length} verified lodges in {filters.area === 'All Areas' ? 'surrounding student residential zones' : filters.area}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 border border-brand-200/60 rounded-full px-3 py-1 flex items-center gap-1">
                  <MaterialIcon name="school" size={15} className="text-brand-600" />
                  <span>{activeCampus.id === 'oye' ? 'FUOYE Oye Main' : 'FUOYE Ikole'}</span>
                </span>
              </div>
            </div>

            {/* Hostel Cards Grid */}
            {filteredHostels.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {filteredHostels.map((hostel) => (
                  <HostelCard
                    key={hostel.id}
                    hostel={hostel}
                    onOpenDetails={(h) => setSelectedHostelForDetails(h)}
                    onOpenCalculator={(h) => setSelectedHostelForCalculator(h)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[16px] border border-line bg-white p-10 text-center mt-6 max-w-md mx-auto shadow-ios">
                <div className="h-12 w-12 bg-surface rounded-full flex items-center justify-center mx-auto text-muted mb-3">
                  <MaterialIcon name="search_off" size={26} />
                </div>
                <h3 className="font-display font-bold text-base text-ink">No lodges match your filter</h3>
                <p className="text-xs text-muted mt-1 max-w-xs mx-auto">
                  Try adjusting your max rent budget or switching area to view more FUOYE accommodations.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      campusId: filters.campusId,
                      area: 'All Areas',
                      roomType: 'all',
                      maxBudget: 1500000,
                      walkingDistanceOnly: false,
                      solarOnly: false,
                      verifiedAgentsOnly: false,
                    })
                  }
                  className="mt-4 min-h-[44px] px-4 rounded-[10px] bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-semibold text-xs transition"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* FUOYE Student Housing Guide (Apple Grouped Box Style) */}
            <section className="mt-14 pt-8 border-t border-line">
              <div className="text-center max-w-md mx-auto mb-6">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">
                  FUOYE Student Accommodation Tips
                </h3>
                <p className="text-xs text-muted mt-1">
                  Local guide for freshers & returning students in Oye-Ekiti & Ikole
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="rounded-[14px] border border-line bg-white p-4 sm:p-5 shadow-ios">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MaterialIcon name="directions_bus" size={18} className="text-brand-500" />
                    <h4 className="font-semibold text-sm text-ink">
                      Phase 1 vs. Phase 2 Gate: Which is better?
                    </h4>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    If your lectures are in Science or Admin, Phase 1 Gate axis is closest. If you're in Arts, Social Sciences, Law, or Pharmacy, Phase 2 Gate lodges allow you to stroll to class without bike fares.
                  </p>
                </div>

                <div className="rounded-[14px] border border-line bg-white p-4 sm:p-5 shadow-ios">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MaterialIcon name="solar_power" size={18} className="text-brand-500" />
                    <h4 className="font-semibold text-sm text-ink">
                      Electricity Realities in Oye-Ekiti
                    </h4>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Public grid light in Oye can fluctuate. We strongly recommend lodges equipped with solar/inverter backup or fixed compound generator hours during exam periods.
                  </p>
                </div>

                <div className="rounded-[14px] border border-line bg-white p-4 sm:p-5 shadow-ios">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MaterialIcon name="water_drop" size={18} className="text-brand-500" />
                    <h4 className="font-semibold text-sm text-ink">
                      Water & Deep Boreholes
                    </h4>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    During the dry harmattan season in Ekiti, automated deep boreholes are a lifesaver. Always verify that your lodge has high-capacity overhead tanks before committing.
                  </p>
                </div>

                <div className="rounded-[14px] border border-line bg-white p-4 sm:p-5 shadow-ios">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MaterialIcon name="group" size={18} className="text-brand-500" />
                    <h4 className="font-semibold text-sm text-ink">
                      Can I split rent with a coursemate?
                    </h4>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    Yes! Co-renting a 2-bedroom flat or spacious self-contain along Ayegbaju or Falagun cuts your annual accommodation expense in half (down to ₦140k–₦200k each).
                  </p>
                </div>
              </div>
            </section>

            {/* Agent Callout Card */}
            <section className="mt-12 rounded-[16px] border border-line bg-white p-6 sm:p-8 text-center shadow-ios">
              <div className="max-w-md mx-auto">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200/60 px-3 py-0.5 text-xs font-semibold text-brand-700 mb-2">
                  <MaterialIcon name="real_estate_agent" size={16} className="text-brand-600" />
                  <span>FUOYE Caretakers & Landlords</span>
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink mt-1">
                  Have vacant rooms in Oye or Ikole?
                </h3>
                <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                  Connect directly with verified FUOYE students searching for lodges. Free listings with direct WhatsApp inquiries sent to your phone.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    type="button"
                    className="min-h-[44px] inline-flex items-center justify-center rounded-[10px] bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-semibold text-sm px-5 transition shadow-sm"
                  >
                    <MaterialIcon name="add_photo_alternate" size={18} className="mr-1.5" />
                    <span>Upload & Post Lodge</span>
                  </button>

                  <button
                    onClick={() => setActiveView('agents')}
                    type="button"
                    className="min-h-[44px] inline-flex items-center justify-center rounded-[10px] bg-white border border-line hover:bg-surface active:scale-[0.98] text-ink font-semibold text-sm px-4 transition"
                  >
                    <MaterialIcon name="tune" size={18} className="mr-1.5 text-muted" />
                    <span>Open Agent Portal</span>
                  </button>
                </div>
              </div>
            </section>
          </main>
        </>
      )}

      {/* Minimal Apple-Style Footer */}
      <footer className="border-t border-line bg-white py-6 text-center text-xs text-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 font-display font-bold text-ink">
            <MaterialIcon name="apartment" size={18} className="text-brand-500" />
            <span>FUOYE<span className="text-brand-500">Hostels</span></span>
          </div>
          <p>
            Designed for Federal University Oye-Ekiti Students &bull; Oye-Ekiti &bull; Ikole-Ekiti
          </p>
          <div className="flex items-center gap-2 text-muted">
            <button
              onClick={() => setActiveView(activeView === 'students' ? 'agents' : 'students')}
              className="text-brand-600 hover:underline font-medium"
            >
              Switch to {activeView === 'students' ? 'Agent Portal' : 'Student View'}
            </button>
            <span>&bull;</span>
            <span>Zero Scams</span>
          </div>
        </div>
      </footer>

      {/* Detail Modal / Sheet */}
      <HostelDetailModal
        hostel={selectedHostelForDetails}
        onClose={() => setSelectedHostelForDetails(null)}
        onOpenCalculator={(h) => setSelectedHostelForCalculator(h)}
      />

      {/* Total Package Modal */}
      <TotalPackageCalculatorModal
        hostel={selectedHostelForCalculator}
        onClose={() => setSelectedHostelForCalculator(null)}
      />

      {/* Add Listing Modal */}
      <AddListingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        campuses={FUOYE_CAMPUSES}
        onAddHostel={handleAddHostel}
      />
    </div>
  );
}
