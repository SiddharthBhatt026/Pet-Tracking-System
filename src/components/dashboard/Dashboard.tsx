import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import PetMap from '../features/PetMap';
import ActivityLogPanel from '../features/ActivityLogPanel';
import CaregiversPanel from '../features/CaregiversPanel';

type TabType = 'map' | 'activity' | 'caregivers' | 'health' | 'stats' | 'community';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('map');
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigate = (tab: TabType) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return <PetMap />;
      case 'activity':
        return <ActivityLogPanel />;
      case 'caregivers':
        return <CaregiversPanel />;
      default:
        return (
          <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
            <p className="text-gray-500">This feature is coming soon!</p>
          </div>
        );
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onNavigate={handleNavigate}
        activeTab={activeTab}
      />
      
      <div className="flex-1 overflow-auto pt-16 md:pl-64">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <nav className="flex space-x-4">
              <button
                onClick={() => handleNavigate('map')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'map'
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Location Tracking
              </button>
              <button
                onClick={() => handleNavigate('activity')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'activity'
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Activity Log
              </button>
              <button
                onClick={() => handleNavigate('caregivers')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'caregivers'
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Caregivers
              </button>
            </nav>
          </div>
          
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;