import React, { useState } from 'react';
import { Target, Navigation, Plus, Minus, RefreshCw, AlertTriangle } from 'lucide-react';
import { usePetTrack } from '../../context/PetTrackContext';
import Button from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import Badge from '../ui/Badge';

// Mock map component since we can't use a real map library
const MockMap: React.FC<{ pet: any }> = ({ pet }) => {
  const [zoom, setZoom] = useState(14);

  return (
    <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <img 
            src="https://images.pexels.com/photos/16119832/pexels-photo-16119832/free-photo-of-map-on-smartphone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Map placeholder" 
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-md">
            <p className="text-sm font-medium">Location: {pet.lastKnownLocation.lat.toFixed(4)}, {pet.lastKnownLocation.lng.toFixed(4)}</p>
            <p className="text-xs text-gray-500">
              Last updated: {new Date(pet.lastKnownLocation.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button variant="primary" size="sm" className="p-2">
          <Target size={16} />
        </Button>
        <Button variant="outline" size="sm" className="p-2 bg-white">
          <Plus size={16} onClick={() => setZoom(Math.min(zoom + 1, 20))} />
        </Button>
        <Button variant="outline" size="sm" className="p-2 bg-white">
          <Minus size={16} onClick={() => setZoom(Math.max(zoom - 1, 5))} />
        </Button>
        <Button variant="outline" size="sm" className="p-2 bg-white">
          <RefreshCw size={16} />
        </Button>
      </div>
      
      {/* Safe zones indicator */}
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-md">
        <p className="text-xs font-medium">Safe Zones: {pet.safeZones.length}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {pet.safeZones.map((zone: any) => (
            <Badge key={zone.id} variant="primary" className="text-xs">
              {zone.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

const PetMap: React.FC = () => {
  const { selectedPet, reportPetMissing } = usePetTrack();
  const [isReportingMissing, setIsReportingMissing] = useState(false);
  
  if (!selectedPet) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please select a pet to view their location</p>
      </div>
    );
  }

  const handleReportMissing = () => {
    setIsReportingMissing(true);
    reportPetMissing(selectedPet.id, true);
  };

  const handleMarkAsFound = () => {
    setIsReportingMissing(false);
    reportPetMissing(selectedPet.id, false);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{selectedPet.name}'s Location</h1>
          <p className="text-sm text-gray-500">
            Track your pet's real-time location and set up safe zones
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            leftIcon={<Navigation size={16} />}
          >
            Directions
          </Button>
          <Button
            variant="primary"
            leftIcon={<Target size={16} />}
          >
            Add Safe Zone
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <MockMap pet={selectedPet} />
        </CardContent>
        <CardFooter className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium flex items-center">
              Status: 
              {selectedPet.isLost ? (
                <Badge variant="danger" className="ml-2 flex items-center">
                  <AlertTriangle size={12} className="mr-1" />
                  Lost
                </Badge>
              ) : (
                <Badge variant="success" className="ml-2">Safe</Badge>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {selectedPet.isLost ? 
                "Alert your community for help finding your pet" : 
                `${selectedPet.name} is inside a safe zone`
              }
            </p>
          </div>
          <div className="flex flex-col items-end">
            {selectedPet.isLost ? (
              <>
                <Button 
                  variant="danger"
                  leftIcon={<AlertTriangle size={16} />}
                >
                  Alert Community
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="mt-2"
                  onClick={handleMarkAsFound}
                >
                  Mark as Found
                </Button>
              </>
            ) : (
              <Button 
                variant="outline"
                onClick={handleReportMissing}
                leftIcon={<AlertTriangle size={16} />}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                Report Missing
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Safe Zones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedPet.safeZones.map((zone: any) => (
                <div key={zone.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{zone.name}</p>
                    <p className="text-xs text-gray-500">Radius: {zone.radius}m</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" leftIcon={<Plus size={16} />} isFullWidth>
              Add Safe Zone
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Travel History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500 text-sm">Travel history visualization will appear here</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between">
              <select className="rounded border-gray-300 text-sm">
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
              <Button variant="ghost" size="sm">
                <RefreshCw size={16} className="mr-1" /> Refresh
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PetMap;