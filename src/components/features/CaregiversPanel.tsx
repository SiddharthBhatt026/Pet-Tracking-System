import React from 'react';
import { UserPlus, Clock, Edit, Trash, CalendarClock } from 'lucide-react';
import { usePetTrack } from '../../context/PetTrackContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const CaregiversPanel: React.FC = () => {
  const { caregivers, pets } = usePetTrack();
  
  const formatAccessTime = (timestamp: string) => {
    const endDate = new Date(timestamp);
    const now = new Date();
    
    // Calculate the difference in days
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) {
      return 'Expired';
    } else if (diffDays === 1) {
      return '1 day left';
    } else {
      return `${diffDays} days left`;
    }
  };
  
  const getPetNameById = (petId: string) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : 'Unknown Pet';
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Caregivers</h1>
          <p className="text-sm text-gray-500">
            Manage access for friends, family, or pet sitters while you're away
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<UserPlus size={16} />}
        >
          Add Caregiver
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {caregivers.length === 0 ? (
          <Card className="md:col-span-3">
            <CardContent className="py-10">
              <div className="text-center">
                <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No caregivers yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add trusted friends or family members to help take care of your pets
                </p>
                <div className="mt-6">
                  <Button
                    variant="primary"
                    leftIcon={<UserPlus size={16} />}
                  >
                    Add First Caregiver
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          caregivers.map(caregiver => (
            <Card key={caregiver.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {caregiver.imageUrl ? (
                      <img
                        src={caregiver.imageUrl}
                        alt={caregiver.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-medium">{caregiver.name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-base">{caregiver.name}</CardTitle>
                      <p className="text-xs text-gray-500">{caregiver.email}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CalendarClock size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm">Access Expiry:</span>
                    <Badge 
                      variant="warning" 
                      className="ml-2"
                    >
                      {formatAccessTime(caregiver.accessUntil)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Pets with access:</p>
                    <div className="flex flex-wrap gap-1">
                      {caregiver.petIds.map(petId => (
                        <Badge key={petId} variant="primary">
                          {getPetNameById(petId)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-100 pt-4">
                <div className="flex justify-between w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit size={14} />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Clock size={14} />}
                  >
                    Extend
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Trash size={14} />}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Access Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Caregiver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Jamie Smith
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Buddy
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Viewed location
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    10:35 AM
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Jamie Smith
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Buddy
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Added activity log
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    9:45 AM
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" isFullWidth>
            View All Access Logs
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CaregiversPanel;