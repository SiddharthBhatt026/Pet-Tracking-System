import { Pet, User, Caregiver, ActivityLog, AlertNotification } from '../types';

// Mock user data
export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Morgan',
  email: 'alex@example.com',
  imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  pets: ['pet-1', 'pet-2'] as any, // Will be populated
};

// Mock pets data
export const pets: Pet[] = [
  {
    id: 'pet-1',
    name: 'Buddy',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: 65,
    imageUrl: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    lastKnownLocation: {
      lat: 40.7128,
      lng: -74.006,
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 minutes ago
    },
    safeZones: [
      {
        id: 'zone-1',
        name: 'Home',
        radius: 200,
        center: {
          lat: 40.7128,
          lng: -74.006
        }
      },
      {
        id: 'zone-2',
        name: 'Park',
        radius: 300,
        center: {
          lat: 40.7135,
          lng: -74.01
        }
      }
    ],
    isLost: false
  },
  {
    id: 'pet-2',
    name: 'Whiskers',
    type: 'cat',
    breed: 'Siamese',
    age: 2,
    weight: 10,
    imageUrl: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    lastKnownLocation: {
      lat: 40.7135,
      lng: -74.008,
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 minutes ago
    },
    safeZones: [
      {
        id: 'zone-3',
        name: 'Home',
        radius: 100,
        center: {
          lat: 40.7135,
          lng: -74.008
        }
      }
    ],
    isLost: false
  }
];

// Update the user's pets
currentUser.pets = pets;

// Mock caregivers
export const caregivers: Caregiver[] = [
  {
    id: 'caregiver-1',
    name: 'Jamie Smith',
    email: 'jamie@example.com',
    imageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    accessUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week from now
    petIds: ['pet-1']
  }
];

// Mock activity logs
export const activityLogs: ActivityLog[] = [
  {
    id: 'log-1',
    petId: 'pet-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    type: 'walk',
    details: 'Evening walk for 30 minutes',
    performedBy: {
      id: 'user-1',
      name: 'Alex Morgan',
      isCaregiver: false
    }
  },
  {
    id: 'log-2',
    petId: 'pet-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    type: 'feeding',
    details: 'Fed half a cup of premium kibble',
    performedBy: {
      id: 'caregiver-1',
      name: 'Jamie Smith',
      isCaregiver: true
    }
  },
  {
    id: 'log-3',
    petId: 'pet-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    type: 'medication',
    details: 'Administered flea medication',
    performedBy: {
      id: 'user-1',
      name: 'Alex Morgan',
      isCaregiver: false
    }
  }
];

// Mock notifications
export const notifications: AlertNotification[] = [
  {
    id: 'notif-1',
    petId: 'pet-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    type: 'geofence',
    message: 'Buddy left the Home safe zone',
    read: false
  },
  {
    id: 'notif-2',
    petId: 'pet-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 minutes ago
    type: 'geofence',
    message: 'Buddy entered the Park safe zone',
    read: true
  },
  {
    id: 'notif-3',
    petId: 'pet-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    type: 'activity',
    message: 'Whiskers has been inactive for 2 hours',
    read: true
  }
];