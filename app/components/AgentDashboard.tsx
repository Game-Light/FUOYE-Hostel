'use client';

import React, { useState } from 'react';
import { MaterialIcon } from './MaterialIcon';
import { Hostel } from '../types';

interface AgentDashboardProps {
  hostels: Hostel[];
  onToggleAvailability: (hostelId: string) => void;
  onDeleteHostel: (hostelId: string) => void;
  onUpdatePrice: (hostelId: string, newPrice: number) => void;
  onOpenAddModal: () => void;
  onPreviewHostel: (hostel: Hostel) => void;
}

export const AgentDashboard: React.FC<AgentDashboardProps> = ({
  hostels,
  onToggleAvailability,
  onDeleteHostel,
  onUpdatePrice,
  onOpenAddModal,
  onPreviewHostel,
}) => {
  const [editingHostelId, setEditingHostelId] = useState<string | null>(null);
  const [editPriceValue, setEditPriceValue] = useState<number>(0);
  const [filterTab, setFilterTab] = useState<'all' | 'available' | 'taken'>('all');

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalListings = hostels.length;
  const availableCount = hostels.filter((h) => h.isAvailable).length;
  const takenCount = hostels.filter((h) => !h.isAvailable).length;

  const filteredHostels = hostels.filter((h) => {
    if (filterTab === 'available') return h.isAvailable;
    if (filterTab === 'taken') return !h.isAvailable;
    return true;
  });

  const handleStartEdit = (hostel: Hostel) => {
    setEditingHostelId(hostel.id);
    setEditPriceValue(hostel.pricePerYear);
  };

  const handleSavePrice = (hostelId: string) => {
    if (editPriceValue > 0) {
      onUpdatePrice(hostelId, editPriceValue);
    }
    setEditingHostelId(null);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Agent Welcome Banner (Apple Card Style) */}
      <div className="rounded-[16px] border border-line bg-white p-5 sm:p-6 shadow-ios flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-14 w-14 rounded-[14px] bg-brand-500 text-white flex items-center justify-center font-bold text-xl shadow-sm">
            <MaterialIcon name="real_estate_agent" size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-xl text-ink">
                Agent & Caretaker Portal
              </h1>
              <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold flex items-center gap-1">
                <MaterialIcon name="verified" size={14} fill />
                <span>Verified FUOYE Agent</span>
              </span>
            </div>
            <p className="text-xs text-muted mt-0.5">
              Manage your hostel vacancies, update rent pricing, and toggle occupied rooms in real-time.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="min-h-[44px] px-4 rounded-[10px] bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition"
        >
          <MaterialIcon name="add_circle" size={18} />
          <span>Post New Lodge</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-[14px] border border-line bg-white p-4 shadow-ios">
          <div className="flex items-center justify-between text-muted text-xs font-medium">
            <span>Total Listings</span>
            <MaterialIcon name="apartment" size={18} className="text-brand-500" />
          </div>
          <div className="mt-2 font-display font-extrabold text-2xl text-ink">
            {totalListings}
          </div>
          <p className="text-[11px] text-muted mt-0.5">Oye & Ikole campuses</p>
        </div>

        <div className="rounded-[14px] border border-line bg-white p-4 shadow-ios">
          <div className="flex items-center justify-between text-muted text-xs font-medium">
            <span>Vacant & Ready</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="mt-2 font-display font-extrabold text-2xl text-emerald-600">
            {availableCount}
          </div>
          <p className="text-[11px] text-muted mt-0.5">Active on student search</p>
        </div>

        <div className="rounded-[14px] border border-line bg-white p-4 shadow-ios">
          <div className="flex items-center justify-between text-muted text-xs font-medium">
            <span>Occupied / Taken</span>
            <span className="h-2 w-2 rounded-full bg-red-500" />
          </div>
          <div className="mt-2 font-display font-extrabold text-2xl text-slate-700">
            {takenCount}
          </div>
          <p className="text-[11px] text-muted mt-0.5">Marked as filled</p>
        </div>

        <div className="rounded-[14px] border border-line bg-white p-4 shadow-ios">
          <div className="flex items-center justify-between text-muted text-xs font-medium">
            <span>WhatsApp Leads</span>
            <MaterialIcon name="chat" size={18} className="text-brand-500" fill />
          </div>
          <div className="mt-2 font-display font-extrabold text-2xl text-brand-600">
            142
          </div>
          <p className="text-[11px] text-muted mt-0.5">Student inspection clicks</p>
        </div>
      </div>

      {/* Segmented Filter Pills */}
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <div className="inline-flex p-1 rounded-[10px] bg-[#e5e5ea]/70 border border-line text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-[8px] transition ${
              filterTab === 'all'
                ? 'bg-white text-ink shadow-sm'
                : 'text-muted hover:text-ink'
            }`}
          >
            All Lodges ({totalListings})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('available')}
            className={`px-3 py-1.5 rounded-[8px] transition ${
              filterTab === 'available'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-muted hover:text-ink'
            }`}
          >
            Available ({availableCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('taken')}
            className={`px-3 py-1.5 rounded-[8px] transition ${
              filterTab === 'taken'
                ? 'bg-white text-red-700 shadow-sm'
                : 'text-muted hover:text-ink'
            }`}
          >
            Occupied ({takenCount})
          </button>
        </div>

        <span className="text-xs text-muted hidden sm:inline">
          Click <strong className="text-ink">"Mark as Taken"</strong> when a student moves in
        </span>
      </div>

      {/* Listing Management Cards */}
      <div className="space-y-3.5">
        {filteredHostels.map((hostel) => (
          <div
            key={hostel.id}
            className={`rounded-[14px] border p-4 sm:p-5 bg-white shadow-ios transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              hostel.isAvailable ? 'border-line' : 'border-red-200 bg-red-50/20'
            }`}
          >
            {/* Left: Thumbnail & Info */}
            <div className="flex items-start gap-3.5 flex-1 min-w-0">
              <div
                className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-[10px] overflow-hidden bg-surface border border-line flex-shrink-0 cursor-pointer"
                onClick={() => onPreviewHostel(hostel)}
              >
                <img
                  src={hostel.images[0]}
                  alt={hostel.title}
                  className="h-full w-full object-cover"
                />
                {!hostel.isAvailable && (
                  <div className="absolute inset-0 bg-red-900/60 flex items-center justify-center text-white text-[10px] font-bold uppercase">
                    Taken
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded-[6px] bg-brand-50 border border-brand-200/60 px-2 py-0.5 text-[10px] font-bold text-brand-700 uppercase">
                    {hostel.campusId === 'oye' ? 'Oye Main' : 'Ikole'}
                  </span>
                  <span className="text-xs text-muted truncate">{hostel.area}</span>
                  <span className="text-muted">&bull;</span>
                  <span className="text-xs text-muted">{hostel.roomType}</span>
                </div>

                <h3
                  onClick={() => onPreviewHostel(hostel)}
                  className="font-display font-bold text-base text-ink leading-snug hover:text-brand-600 transition cursor-pointer truncate"
                >
                  {hostel.title}
                </h3>

                {/* Price & Quick Price Edit */}
                <div className="mt-2 flex items-center gap-3">
                  {editingHostelId === hostel.id ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-ink">₦</span>
                      <input
                        type="number"
                        step="5000"
                        value={editPriceValue}
                        onChange={(e) => setEditPriceValue(Number(e.target.value))}
                        className="w-28 h-8 rounded-[6px] border border-brand-500 px-2 text-xs font-bold text-ink focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleSavePrice(hostel.id)}
                        className="h-8 px-2.5 rounded-[6px] bg-brand-500 text-white text-xs font-bold"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingHostelId(null)}
                        className="h-8 px-2 rounded-[6px] bg-slate-100 text-muted text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-base text-ink">
                        {formatNaira(hostel.pricePerYear)}
                      </span>
                      <span className="text-xs text-muted">/yr</span>
                      <button
                        type="button"
                        onClick={() => handleStartEdit(hostel)}
                        className="text-muted hover:text-brand-600 p-1"
                        title="Edit price"
                      >
                        <MaterialIcon name="edit" size={15} />
                      </button>
                    </div>
                  )}

                  <span className="text-[11px] text-muted">
                    {hostel.facilities.length} verified facilities
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Controls */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-line">
              {/* Toggle Availability Button */}
              <button
                type="button"
                onClick={() => onToggleAvailability(hostel.id)}
                className={`flex-1 sm:flex-initial min-h-[40px] px-3.5 rounded-[8px] text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 border ${
                  hostel.isAvailable
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-red-50 text-red-800 border-red-300 hover:bg-red-100'
                }`}
              >
                <MaterialIcon
                  name={hostel.isAvailable ? 'check_circle' : 'do_not_disturb_on'}
                  size={16}
                  fill
                />
                <span>{hostel.isAvailable ? 'Available' : 'Taken / Occupied'}</span>
              </button>

              {/* Preview Button */}
              <button
                type="button"
                onClick={() => onPreviewHostel(hostel)}
                className="min-h-[40px] px-3 rounded-[8px] border border-line bg-surface hover:bg-white text-ink text-xs font-semibold flex items-center justify-center gap-1 transition active:scale-95"
              >
                <MaterialIcon name="visibility" size={16} className="text-muted" />
                <span>Preview</span>
              </button>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${hostel.title}"?`)) {
                    onDeleteHostel(hostel.id);
                  }
                }}
                className="min-h-[40px] px-2.5 rounded-[8px] border border-line bg-surface hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-muted text-xs transition active:scale-95"
                title="Delete listing"
              >
                <MaterialIcon name="delete" size={16} />
              </button>
            </div>
          </div>
        ))}

        {filteredHostels.length === 0 && (
          <div className="rounded-[14px] border border-line bg-white p-12 text-center">
            <MaterialIcon name="apartment" size={32} className="text-muted mx-auto mb-2" />
            <h3 className="font-display font-bold text-base text-ink">No lodges in this category</h3>
            <p className="text-xs text-muted mt-1">
              Click the "Post New Lodge" button above to add a listing with real photos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
