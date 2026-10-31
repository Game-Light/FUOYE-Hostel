'use client';

import React, { useState, useRef } from 'react';
import { MaterialIcon } from './MaterialIcon';
import { Hostel, Campus, CampusId, RoomType, DistanceCategory, PowerType } from '../types';
import { ALL_FACILITIES } from '../data/facilities';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  campuses: Campus[];
  onAddHostel: (newHostel: Hostel) => void;
}

export const AddListingModal: React.FC<AddListingModalProps> = ({
  isOpen,
  onClose,
  campuses,
  onAddHostel,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    campusId: 'oye' as CampusId,
    area: '',
    gateProximity: '',
    roomType: 'Self-Contained' as RoomType,
    pricePerYear: 280000,
    cautionFee: 25000,
    legalAndAgencyFee: 35000,
    serviceCharge: 12000,
    distanceCategory: 'Walking Distance' as DistanceCategory,
    distanceMinutes: 4,
    powerSupply: '24/7 Solar / Inverter' as PowerType,
    waterSupply: 'Automated deep borehole with overhead tanks',
    security: 'Perimeter fence with uniformed night guard',
    description: '',
    agentName: '',
    agentPhone: '',
    agentWhatsapp: '',
    agencyName: '',
  });

  // Multiple uploaded images state (supports real files and previews)
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  ]);

  const [selectedFacilityIds, setSelectedFacilityIds] = useState<string[]>([
    'solar',
    'water',
    'meter',
    'security',
    'ensuite',
  ]);

  if (!isOpen) return null;

  const toggleFacility = (id: string) => {
    if (selectedFacilityIds.includes(id)) {
      setSelectedFacilityIds(selectedFacilityIds.filter((item) => item !== id));
    } else {
      setSelectedFacilityIds([...selectedFacilityIds, id]);
    }
  };

  // Handle native device file upload (camera or gallery)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input so user can pick more
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCampus = campuses.find((c) => c.id === formData.campusId) || campuses[0];
    const facilities = ALL_FACILITIES.filter((f) => selectedFacilityIds.includes(f.id));

    // Fallback image if agent deleted all
    const finalImages =
      uploadedImages.length > 0
        ? uploadedImages
        : ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'];

    const newHostel: Hostel = {
      id: `fuoye-${Date.now()}`,
      title: formData.title || 'FUOYE Student Lodge',
      campusId: formData.campusId,
      campusName: selectedCampus.name,
      area: formData.area || selectedCampus.areas[1],
      gateProximity: formData.gateProximity || `${formData.distanceMinutes} mins to Gate`,
      roomType: formData.roomType,
      pricePerYear: Number(formData.pricePerYear),
      cautionFee: Number(formData.cautionFee),
      legalAndAgencyFee: Number(formData.legalAndAgencyFee),
      serviceCharge: Number(formData.serviceCharge),
      images: finalImages,
      distanceCategory: formData.distanceCategory,
      distanceMinutes: Number(formData.distanceMinutes),
      powerSupply: formData.powerSupply,
      waterSupply: formData.waterSupply,
      security: formData.security,
      facilities,
      description: formData.description || 'Clean, verified lodge near FUOYE with steady water.',
      agent: {
        name: formData.agentName || 'Sunday Ojo',
        phone: formData.agentPhone || '+2348057712399',
        whatsappNumber:
          formData.agentWhatsapp.replace(/[^0-9]/g, '') || '2348057712399',
        isVerified: true,
        agencyName: formData.agencyName || 'Oye Lodges',
        rating: 5.0,
        reviewsCount: 1,
      },
      isAvailable: true,
      inspectedByCampusHub: true,
      postedDate: 'Just now',
    };

    onAddHostel(newHostel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink/50 backdrop-blur-sm animate-in fade-in">
      <div className="rounded-t-[24px] sm:rounded-[20px] border border-line bg-white w-full max-w-xl h-[92vh] max-h-[92vh] sm:h-auto sm:max-h-[90vh] flex flex-col shadow-ios-sheet overflow-hidden relative">
        {/* iOS Pull Bar for mobile */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center flex-shrink-0">
          <div className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-ink hover:bg-surface transition"
        >
          <MaterialIcon name="close" size={20} />
        </button>

        {/* Scrollable Form Content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-[10px] bg-brand-50 text-brand-600 flex items-center justify-center shadow-sm">
              <MaterialIcon name="add_business" size={22} />
            </div>
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg text-ink">
                List Available FUOYE Lodge
              </h2>
              <p className="text-xs text-muted">Post directly for students in Oye & Ikole</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Title */}
            <div>
              <label className="block font-semibold text-ink mb-1">
                Lodge Headline *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Executive Self-Con with Inverter at Phase 2 Gate"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full min-h-[44px] rounded-[10px] border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand-500 focus:bg-white focus:outline-none transition"
              />
            </div>

            {/* REAL PICTURE UPLOAD SECTION (Camera / Gallery / Drag & Drop) */}
            <div className="rounded-[14px] border border-line bg-surface p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-ink text-xs block">
                    Upload Lodge Pictures ({uploadedImages.length})
                  </span>
                  <span className="text-[11px] text-muted">
                    Take photos or choose from your phone / PC
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs transition active:scale-95 shadow-sm"
                >
                  <MaterialIcon name="add_photo_alternate" size={16} />
                  <span>Add Photos</span>
                </button>
              </div>

              {/* Hidden Native File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="lodge-file-upload"
              />

              {/* Tap-to-Upload Dropzone Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-brand-500 bg-white rounded-[12px] p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 active:bg-brand-50/20"
              >
                <div className="h-10 w-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center">
                  <MaterialIcon name="cloud_upload" size={22} />
                </div>
                <p className="font-medium text-xs text-ink">
                  Tap here to upload room pictures from your device
                </p>
                <p className="text-[10px] text-muted">
                  Supports JPG, PNG, WEBP (Bedroom, Kitchen, Bathroom, Gate)
                </p>
              </div>

              {/* Image Previews with Remove Buttons */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1">
                  {uploadedImages.map((imgSrc, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-[8px] overflow-hidden border border-line bg-slate-100 group"
                    >
                      <img
                        src={imgSrc}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 bg-brand-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                          Cover
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition shadow"
                        title="Remove photo"
                      >
                        <MaterialIcon name="close" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Campus and Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-ink mb-1">
                  FUOYE Campus *
                </label>
                <select
                  value={formData.campusId}
                  onChange={(e) =>
                    setFormData({ ...formData, campusId: e.target.value as CampusId })
                  }
                  className="w-full min-h-[44px] rounded-[10px] border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand-500 focus:bg-white focus:outline-none transition cursor-pointer"
                >
                  {campuses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1">
                  Area / Road *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Falagun Axis / Phase 1"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full min-h-[44px] rounded-[10px] border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand-500 focus:bg-white focus:outline-none transition"
                />
              </div>
            </div>

            {/* Room Type & Proximity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-ink mb-1">Room Type</label>
                <select
                  value={formData.roomType}
                  onChange={(e) =>
                    setFormData({ ...formData, roomType: e.target.value as RoomType })
                  }
                  className="w-full min-h-[44px] rounded-[10px] border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand-500 focus:bg-white focus:outline-none transition cursor-pointer"
                >
                  <option value="Self-Contained">Self-Contained</option>
                  <option value="Single Room">Single Room</option>
                  <option value="2-Bedroom Flat">2-Bedroom Flat</option>
                  <option value="Bedspace">Bedspace</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-ink mb-1">Gate Proximity Text</label>
                <input
                  type="text"
                  placeholder="e.g. 3 mins stroll to Phase 2 Gate"
                  value={formData.gateProximity}
                  onChange={(e) => setFormData({ ...formData, gateProximity: e.target.value })}
                  className="w-full min-h-[44px] rounded-[10px] border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand-500 focus:bg-white focus:outline-none transition"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="rounded-[12px] border border-line bg-surface p-3.5 space-y-2.5">
              <span className="font-semibold text-ink text-xs block">Transparent Pricing (₦)</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div>
                  <label className="block text-[11px] text-muted mb-1">Rent / Year (₦) *</label>
                  <input
                    type="number"
                    required
                    step="5000"
                    value={formData.pricePerYear}
                    onChange={(e) =>
                      setFormData({ ...formData, pricePerYear: Number(e.target.value) })
                    }
                    className="w-full min-h-[38px] rounded-[8px] border border-line bg-white px-2.5 py-1 text-xs text-ink font-semibold focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-muted mb-1">Caution (₦)</label>
                  <input
                    type="number"
                    step="1000"
                    value={formData.cautionFee}
                    onChange={(e) =>
                      setFormData({ ...formData, cautionFee: Number(e.target.value) })
                    }
                    className="w-full min-h-[38px] rounded-[8px] border border-line bg-white px-2.5 py-1 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-muted mb-1">Agency & Legal (₦)</label>
                  <input
                    type="number"
                    step="1000"
                    value={formData.legalAndAgencyFee}
                    onChange={(e) =>
                      setFormData({ ...formData, legalAndAgencyFee: Number(e.target.value) })
                    }
                    className="w-full min-h-[38px] rounded-[8px] border border-line bg-white px-2.5 py-1 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-muted mb-1">Service (₦)</label>
                  <input
                    type="number"
                    step="1000"
                    value={formData.serviceCharge}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceCharge: Number(e.target.value) })
                    }
                    className="w-full min-h-[38px] rounded-[8px] border border-line bg-white px-2.5 py-1 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Facility Selection */}
            <div>
              <label className="block font-semibold text-ink mb-1.5">
                Facilities Available (Click to select)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ALL_FACILITIES.map((facility) => {
                  const isSelected = selectedFacilityIds.includes(facility.id);
                  return (
                    <button
                      key={facility.id}
                      type="button"
                      onClick={() => toggleFacility(facility.id)}
                      className={`flex items-center gap-2 p-2 rounded-[10px] border text-left transition ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 text-brand-800 font-semibold shadow-sm'
                          : 'bg-surface border-line text-muted hover:text-ink'
                      }`}
                    >
                      <MaterialIcon
                        name={facility.icon}
                        size={18}
                        className={isSelected ? 'text-brand-600' : 'text-muted'}
                      />
                      <span className="text-[11px] truncate">{facility.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Agent info */}
            <div className="rounded-[12px] border border-line bg-surface p-3.5 space-y-2.5">
              <span className="font-semibold text-ink text-xs block">Agent Contact Details</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-muted mb-1">Agent Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunday Ojo"
                    value={formData.agentName}
                    onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                    className="w-full min-h-[38px] rounded-[8px] border border-line bg-white px-3 py-1.5 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-muted mb-1">WhatsApp Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="2348057712399"
                    value={formData.agentWhatsapp}
                    onChange={(e) => setFormData({ ...formData, agentWhatsapp: e.target.value })}
                    className="w-full min-h-[38px] rounded-[8px] border border-line bg-white px-3 py-1.5 text-xs text-ink focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full min-h-[48px] rounded-[12px] bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-bold text-sm transition shadow-sm flex items-center justify-center gap-2 mt-4"
            >
              <MaterialIcon name="check" size={20} />
              <span>Publish FUOYE Lodge</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
