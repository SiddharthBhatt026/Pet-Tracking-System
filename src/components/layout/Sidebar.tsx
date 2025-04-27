import React from 'react';
import { MapPin, Calendar, Users, BarChart, Heart, MessageSquare, PlusCircle } from 'lucide-react';
import { usePetTrack } from '../../context/PetTrackContext';
import Button from '../ui/Button';

interface SidebarProps {
  isOpen: boolean;
  onNavigate: (tab: string) => void;
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onNavigate, activeTab }) => {
  const { pets, setSelectedPet, selectedPet } = usePetTrack();
  
  return (
    <div 
      className={`fixed inset-y-0 left-0 z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out bg-white border-r border-gray-200 w-64 flex flex-col h-full pt-16`}
    >
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">My Pets</h2>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<PlusCircle size={16} />}
              className="text-teal-600 hover:text-teal-700"
            >
              Add
            </Button>
          </div>
          <div className="mt-3 space-y-2">
            {pets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => setSelectedPet(pet)}
                className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-colors ${selectedPet?.id === pet.id ? 'bg-teal-50 border-l-4 border-teal-500' : 'hover:bg-gray-50'}`}
              >
                {pet.imageUrl ? (
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm font-medium">{pet.name.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{pet.name}</p>
                  <p className="text-xs text-gray-500">{pet.breed}</p>
                </div>
                {pet.isLost && (
                  <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Lost
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="px-3 mt-6">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Navigation
          </h3>
          <div className="mt-2 space-y-1">
            <button
              onClick={() => onNavigate('map')}
              className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'map'
                  ? 'text-gray-900 bg-teal-50 hover:text-teal-900 hover:bg-teal-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <MapPin className={`mr-3 flex-shrink-0 h-5 w-5 ${activeTab === 'map' ? 'text-teal-600' : 'text-gray-500'}`} />
              Track
            </button>
            <button
              onClick={() => onNavigate('activity')}
              className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'activity'
                  ? 'text-gray-900 bg-teal-50 hover:text-teal-900 hover:bg-teal-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Calendar className={`mr-3 flex-shrink-0 h-5 w-5 ${activeTab === 'activity' ? 'text-teal-600' : 'text-gray-500'}`} />
              Activity Log
            </button>
            <button
              onClick={() => onNavigate('caregivers')}
              className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'caregivers'
                  ? 'text-gray-900 bg-teal-50 hover:text-teal-900 hover:bg-teal-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Users className={`mr-3 flex-shrink-0 h-5 w-5 ${activeTab === 'caregivers' ? 'text-teal-600' : 'text-gray-500'}`} />
              Caregivers
            </button>
            <button
              onClick={() => onNavigate('health')}
              className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Heart className="mr-3 flex-shrink-0 h-5 w-5 text-gray-500" />
              Health
            </button>
            <button
              onClick={() => onNavigate('stats')}
              className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <BarChart className="mr-3 flex-shrink-0 h-5 w-5 text-gray-500" />
              Analytics
            </button>
            <button
              onClick={() => onNavigate('community')}
              className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <MessageSquare className="mr-3 flex-shrink-0 h-5 w-5 text-gray-500" />
              Community
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="bg-teal-50 rounded-lg p-3">
          <h3 className="text-sm font-medium text-teal-800">Premium Features</h3>
          <p className="mt-1 text-xs text-teal-600">Unlock advanced tracking, health metrics, and more.</p>
          <Button
            variant="primary"
            size="sm"
            className="mt-2 w-full"
          >
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;