export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'other';
  breed?: string;
  age?: number;
  weight?: number;
  imageUrl?: string;
  lastKnownLocation?: {
    lat: number;
    lng: number;
    timestamp: string;
  };
  safeZones?: SafeZone[];
  isLost?: boolean;
}

export interface SafeZone {
  id: string;
  name: string;
  radius: number;
  center: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  pets: Pet[];
}

export interface Caregiver {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  accessUntil: string;
  petIds: string[];
}

export interface ActivityLog {
  id: string;
  petId: string;
  timestamp: string;
  type: 'walk' | 'feeding' | 'medication' | 'other';
  details: string;
  performedBy: {
    id: string;
    name: string;
    isCaregiver: boolean;
  };
}

export interface AlertNotification {
  id: string;
  petId: string;
  timestamp: string;
  type: 'geofence' | 'activity' | 'lost' | 'other';
  message: string;
  read: boolean;
}