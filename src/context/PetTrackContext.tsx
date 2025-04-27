import React, { createContext, useContext, useState, ReactNode } from 'react';
import { pets as initialPets, currentUser as initialUser, caregivers as initialCaregivers, activityLogs as initialLogs, notifications as initialNotifications } from '../data/mockData';
import { Pet, User, Caregiver, ActivityLog, AlertNotification } from '../types';

interface PetTrackContextType {
  currentUser: User;
  pets: Pet[];
  caregivers: Caregiver[];
  activityLogs: ActivityLog[];
  notifications: AlertNotification[];
  selectedPet: Pet | null;
  setSelectedPet: (pet: Pet | null) => void;
  markNotificationAsRead: (id: string) => void;
  addActivityLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  reportPetMissing: (petId: string, isLost: boolean) => void;
}

const PetTrackContext = createContext<PetTrackContextType | undefined>(undefined);

export const PetTrackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser] = useState<User>(initialUser);
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [caregivers] = useState<Caregiver[]>(initialCaregivers);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialLogs);
  const [notifications, setNotifications] = useState<AlertNotification[]>(initialNotifications);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(pets[0] || null);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const addActivityLog = (log: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const newLog: ActivityLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const reportPetMissing = (petId: string, isLost: boolean) => {
    // Update pets array
    setPets(prev => prev.map(pet => 
      pet.id === petId ? { ...pet, isLost } : pet
    ));

    // Update selected pet if it's the one being reported
    if (selectedPet?.id === petId) {
      setSelectedPet(prev => prev ? { ...prev, isLost } : null);
    }

    // Add notification
    const newNotification: AlertNotification = {
      id: `notif-${Date.now()}`,
      petId,
      timestamp: new Date().toISOString(),
      type: 'lost',
      message: isLost 
        ? `${pets.find(p => p.id === petId)?.name} has been reported as missing` 
        : `${pets.find(p => p.id === petId)?.name} has been marked as found`,
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);

    // Add activity log
    addActivityLog({
      petId,
      type: 'other',
      details: isLost ? 'Pet reported as missing' : 'Pet marked as found',
      performedBy: {
        id: currentUser.id,
        name: currentUser.name,
        isCaregiver: false
      }
    });
  };

  const value = {
    currentUser,
    pets,
    caregivers,
    activityLogs,
    notifications,
    selectedPet,
    setSelectedPet,
    markNotificationAsRead,
    addActivityLog,
    reportPetMissing
  };

  return (
    <PetTrackContext.Provider value={value}>
      {children}
    </PetTrackContext.Provider>
  );
};

export const usePetTrack = () => {
  const context = useContext(PetTrackContext);
  if (context === undefined) {
    throw new Error('usePetTrack must be used within a PetTrackProvider');
  }
  return context;
};