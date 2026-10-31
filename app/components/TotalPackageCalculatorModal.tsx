'use client';

import React from 'react';
import { MaterialIcon } from './MaterialIcon';
import { Hostel } from '../types';

interface TotalPackageModalProps {
  hostel: Hostel | null;
  onClose: () => void;
}

export const TotalPackageCalculatorModal: React.FC<TotalPackageModalProps> = ({
  hostel,
  onClose,
}) => {
  if (!hostel) return null;

  const totalFirstYear =
    hostel.pricePerYear +
    hostel.cautionFee +
    hostel.legalAndAgencyFee +
    (hostel.serviceCharge || 0);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-in fade-in">
      <div className="rounded-[16px] border border-line bg-white max-w-md w-full p-5 sm:p-6 shadow-ios relative">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-ink hover:bg-surface transition"
          aria-label="Close calculator"
        >
          <MaterialIcon name="close" size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-50 text-brand-600">
            <MaterialIcon name="calculate" size={22} />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-ink">
              Total Package Breakdown
            </h3>
            <p className="text-xs text-muted">First year move-in calculation</p>
          </div>
        </div>

        <p className="text-xs text-muted mb-4 truncate">
          Lodge: <strong className="text-ink">{hostel.title}</strong>
        </p>

        {/* Grouped Table */}
        <div className="rounded-[12px] border border-line bg-surface p-4 space-y-3 text-sm">
          <div className="flex items-center justify-between pb-2.5 border-b border-line">
            <div>
              <p className="font-medium text-ink">1. Annual Rent</p>
              <p className="text-[11px] text-muted">1 academic calendar session</p>
            </div>
            <span className="font-semibold text-ink">
              {formatNaira(hostel.pricePerYear)}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-line">
            <div>
              <p className="font-medium text-ink">2. Caution Deposit</p>
              <p className="text-[11px] text-brand-600 font-medium">Refundable upon vacating</p>
            </div>
            <span className="font-semibold text-ink">
              {formatNaira(hostel.cautionFee)}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-line">
            <div>
              <p className="font-medium text-ink">3. Legal & Agency Fee</p>
              <p className="text-[11px] text-muted">FUOYE agent tenancy agreement</p>
            </div>
            <span className="font-semibold text-ink">
              {formatNaira(hostel.legalAndAgencyFee)}
            </span>
          </div>

          {hostel.serviceCharge ? (
            <div className="flex items-center justify-between pb-2.5 border-b border-line">
              <div>
                <p className="font-medium text-ink">4. Service Charge</p>
                <p className="text-[11px] text-muted">Pumping machine, waste, security</p>
              </div>
              <span className="font-semibold text-ink">
                {formatNaira(hostel.serviceCharge)}
              </span>
            </div>
          ) : null}

          {/* Grand Total */}
          <div className="pt-2 flex items-baseline justify-between">
            <div>
              <p className="font-bold text-ink">Total Move-In Package</p>
              <p className="text-[11px] text-muted">Required before collecting keys</p>
            </div>
            <span className="font-display text-xl font-extrabold text-brand-600">
              {formatNaira(totalFirstYear)}
            </span>
          </div>
        </div>

        {/* Apple HIG Note */}
        <div className="mt-4 rounded-[10px] bg-brand-50 border border-brand-200/60 p-3 flex items-start gap-2 text-xs text-brand-800">
          <MaterialIcon name="info" size={18} className="text-brand-600 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Second year renewal:</strong> You do NOT pay agency or legal fees again next year. Your rent remains {formatNaira(hostel.pricePerYear)}.
          </p>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="mt-5 w-full min-h-[44px] rounded-[10px] bg-ink hover:bg-black text-white font-semibold text-sm transition active:scale-[0.98]"
        >
          Close Breakdown
        </button>
      </div>
    </div>
  );
};
