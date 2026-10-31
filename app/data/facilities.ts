import { Facility } from '../types';

export const ALL_FACILITIES: Facility[] = [
  {
    id: 'solar',
    icon: 'solar_power',
    name: '24/7 Solar / Inverter',
    description: 'Powers reading lights, fans, laptop, and phone chargers non-stop during outages.',
  },
  {
    id: 'water',
    icon: 'water_drop',
    name: 'Automated Deep Borehole',
    description: 'Constant running tap water with high-capacity overhead tanks.',
  },
  {
    id: 'meter',
    icon: 'electric_meter',
    name: 'Personal Prepaid Meter',
    description: 'You only pay for what you consume; zero shared bill disputes.',
  },
  {
    id: 'security',
    icon: 'shield_person',
    name: 'Gated & Security Guard',
    description: 'High perimeter wall, locked gates at curfew, and night vigilante watch.',
  },
  {
    id: 'kitchen',
    icon: 'countertops',
    name: 'Kitchen Cabinet & Sink',
    description: 'Built-in storage shelves, ceramic sink, and tiled cooking station.',
  },
  {
    id: 'balcony',
    icon: 'balcony',
    name: 'Private Balcony',
    description: 'Cross-ventilated study balcony overlooking the Oye countryside.',
  },
  {
    id: 'ensuite',
    icon: 'bathtub',
    name: 'Tiled En-suite Bath',
    description: 'Private bathroom with shower, water closet, and ceramic wall tiles.',
  },
  {
    id: 'wifi',
    icon: 'wifi',
    name: 'Fast Student WiFi',
    description: 'High-speed wireless internet for downloading course material and research.',
  },
  {
    id: 'walk',
    icon: 'directions_walk',
    name: 'Walking Distance to Gate',
    description: 'Under 5 minutes stroll to Phase 1 or Phase 2 lecture halls without bike fee.',
  },
];
