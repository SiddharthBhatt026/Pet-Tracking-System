import React, { useState } from 'react';
import { Calendar, Clock, MoreVertical, PlusCircle, Filter } from 'lucide-react';
import { usePetTrack } from '../../context/PetTrackContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const ActivityLogPanel: React.FC = () => {
  const { activityLogs, selectedPet } = usePetTrack();
  const [filterType, setFilterType] = useState<string | null>(null);
  
  if (!selectedPet) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Please select a pet to view their activity logs</p>
      </div>
    );
  }
  
  const filteredLogs = activityLogs
    .filter(log => log.petId === selectedPet.id)
    .filter(log => filterType ? log.type === filterType : true);
  
  const logTypeColors: Record<string, string> = {
    walk: 'primary',
    feeding: 'success',
    medication: 'warning',
    other: 'secondary'
  };
  
  const formatLogTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatLogDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  };
  
  const groupLogsByDate = () => {
    const groups: Record<string, typeof activityLogs> = {};
    
    filteredLogs.forEach(log => {
      const date = new Date(log.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(log);
    });
    
    return Object.entries(groups).map(([date, logs]) => ({
      date,
      formattedDate: formatLogDate(logs[0].timestamp),
      logs
    }));
  };
  
  const logGroups = groupLogsByDate();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{selectedPet.name}'s Activity Log</h1>
          <p className="text-sm text-gray-500">
            Track all activities to monitor health and care patterns
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
          >
            Filter
          </Button>
          <Button
            variant="primary"
            leftIcon={<PlusCircle size={16} />}
          >
            Add Activity
          </Button>
        </div>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Button
          variant={filterType === null ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilterType(null)}
        >
          All
        </Button>
        <Button
          variant={filterType === 'walk' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilterType('walk')}
        >
          Walks
        </Button>
        <Button
          variant={filterType === 'feeding' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilterType('feeding')}
        >
          Feeding
        </Button>
        <Button
          variant={filterType === 'medication' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilterType('medication')}
        >
          Medication
        </Button>
        <Button
          variant={filterType === 'other' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilterType('other')}
        >
          Other
        </Button>
      </div>
      
      {logGroups.length === 0 ? (
        <Card>
          <CardContent className="py-10">
            <div className="text-center">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No activity logs</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start adding activities to keep track of your pet's daily routine
              </p>
              <div className="mt-6">
                <Button
                  variant="primary"
                  leftIcon={<PlusCircle size={16} />}
                >
                  Add First Activity
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {logGroups.map(group => (
            <div key={group.date}>
              <div className="flex items-center mb-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <div className="flex-shrink mx-4 text-sm font-medium text-gray-500">
                  {group.formattedDate}
                </div>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              
              <div className="space-y-3">
                {group.logs.map(log => (
                  <Card key={log.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1">
                            <Badge 
                              variant={logTypeColors[log.type] as any || 'default'}
                            >
                              {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                            </Badge>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{log.details}</p>
                            <div className="flex items-center mt-1">
                              <Clock size={14} className="text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">{formatLogTime(log.timestamp)}</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-xs text-gray-500">
                                {log.performedBy.isCaregiver ? 'Caregiver: ' : 'Owner: '}
                                {log.performedBy.name}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="p-1">
                          <MoreVertical size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityLogPanel;