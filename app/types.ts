export type CampusId = 'oye' | 'ikole';

export interface Campus {
  id: CampusId;
  name: string;
  tagline: string;
  areas: string[];
}

export type RoomType = 'Self-Contained' | 'Single Room' | '2-Bedroom Flat' | 'Bedspace';

export type DistanceCategory = 'Walking Distance' | '1 Bike/Keke Drop' | 'Short Shuttle';

export type PowerType = '24/7 Solar / Inverter' | 'Prepaid Meter (Stable)' | 'Gen Powered' | 'Regular NEPA';

export interface Facility {
  id: string;
  icon: string; // Material Symbol name
  name: string;
  description: string;
}

export interface Agent {
  name: string;
  phone: string;
  whatsappNumber: string;
  isVerified: boolean;
  agencyName?: string;
  rating: number;
  reviewsCount: number;
  avatarUrl?: string;
}

export interface Hostel {
  id: string;
  title: string;
  campusId: CampusId;
  campusName: string;
  area: string;
  gateProximity: string; // e.g. "3 mins walk to Phase 1 Gate"
  roomType: RoomType;
  pricePerYear: number;
  cautionFee: number;
  legalAndAgencyFee: number;
  serviceCharge?: number;
  images: string[];
  distanceCategory: DistanceCategory;
  distanceMinutes: number;
  powerSupply: PowerType;
  waterSupply: string;
  security: string;
  facilities: Facility[];
  description: string;
  agent: Agent;
  isAvailable: boolean;
  inspectedByCampusHub: boolean;
  postedDate: string;
}

export interface FilterState {
  campusId: CampusId;
  area: string;
  roomType: string;
  maxBudget: number;
  walkingDistanceOnly: boolean;
  solarOnly: boolean;
  verifiedAgentsOnly: boolean;
}
