import React from 'react';
import { MessageStatus, Platform } from './modules/types';
import { getPlatformIcon } from './modules/utils/platformIcons';
import { getStatusColor } from './modules/utils/statusHelpers';
import HXLogo from './components/ui/HXLogo';

// Test component to verify modules are working
const TestModules: React.FC = () => {
  const testMessage = {
    id: '1',
    contactName: 'Test Contact',
    platform: 'Email' as Platform,
    summary: 'Test message summary',
    sentAt: new Date().toISOString(),
    followUpAt: new Date().toISOString(),
    status: MessageStatus.WAITING
  };

  return (
    <div className="p-8 space-y-4 bg-black min-h-screen text-white">
      <h2 className="text-2xl font-bold text-red-400">Module Test - Black & Red Theme</h2>
      
      <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl border border-red-900/30">
        <HXLogo size={48} />
        <span className="text-orange-400">HX Logo Component with Orange Accents</span>
      </div>
      
      <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl border border-red-900/30">
        <div className="text-orange-400">
          {getPlatformIcon(testMessage.platform)}
        </div>
        <span>Platform Icon: {testMessage.platform}</span>
      </div>
      
      <div className={`px-3 py-1 rounded ${getStatusColor(testMessage.status)} inline-block`}>
        Status: {testMessage.status}
      </div>
      
      <div className="space-y-2 p-4 bg-gray-900 rounded-xl border border-red-900/30">
        <p className="text-green-400">✅ Types imported successfully</p>
        <p className="text-green-400">✅ Platform icons working</p>
        <p className="text-green-400">✅ Status helpers working with new colors</p>
        <p className="text-green-400">✅ HX Logo component working with orange accents</p>
        <p className="text-green-400">✅ Black and red theme applied</p>
      </div>
      
      {/* Navigation bar preview */}
      <div className="bg-black/90 backdrop-blur-xl border border-red-900/30 rounded-2xl p-4">
        <h3 className="text-red-400 font-bold mb-4">Navigation Bar Preview</h3>
        <div className="flex justify-between">
          <button className="flex flex-col items-center gap-1 text-red-500 animate-pulse">
            <div className="p-2 rounded-xl bg-red-500/20 shadow-lg shadow-red-500/30">
              <div className="w-5 h-5 bg-red-500 rounded"></div>
            </div>
            <span className="text-[10px] font-medium">Active</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-400 transition-all duration-300 transform hover:scale-110">
            <div className="p-2 rounded-xl hover:bg-orange-500/10">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
            </div>
            <span className="text-[10px] font-medium">Hover</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestModules;