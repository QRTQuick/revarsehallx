
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useMessages } from './modules/hooks/useMessages';
import Dashboard from './components/Dashboard';
import MessageForm from './components/MessageForm';
import MessageDetail from './components/MessageDetail';
import SettingsView from './components/Settings';
import AnalyticsView from './components/Analytics';
import HXLogo from './components/ui/HXLogo';
import { Plus, LayoutDashboard, Settings, BarChart3 } from 'lucide-react';

const AppContent: React.FC = () => {
  const messageApi = useMessages();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-black relative overflow-hidden">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 bg-black border-b border-red-900/30 flex justify-between items-end">
        <div className="flex items-center gap-3">
          <HXLogo size={40} />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">RevarseHallX</h1>
            <p className="text-sm text-red-400">Outbound Tracking</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/add')}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-3 rounded-2xl shadow-lg shadow-red-900/30 active:scale-95 transition-all duration-200 hover:shadow-xl hover:shadow-red-900/40"
        >
          <Plus size={24} />
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto pb-24 bg-gradient-to-b from-black to-gray-900">
        <Routes>
          <Route path="/" element={<Dashboard {...messageApi} />} />
          <Route path="/add" element={<MessageForm onSubmit={(data) => { messageApi.addMessage(data); navigate('/'); }} />} />
          <Route path="/edit/:id" element={<MessageForm 
            initialData={messageApi.messages.find(m => m.id === window.location.hash.split('/').pop())} 
            onSubmit={(data) => { 
                const id = window.location.hash.split('/').pop();
                if (id) messageApi.updateMessage(id, data); 
                navigate('/'); 
            }} 
          />} />
          <Route path="/message/:id" element={<MessageDetail {...messageApi} />} />
          <Route path="/analytics" element={<AnalyticsView messages={messageApi.messages} />} />
          <Route path="/settings" element={<SettingsView clearAll={messageApi.clearAll} />} />
        </Routes>
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-black/90 backdrop-blur-xl border-t border-red-900/30 px-8 py-4 flex justify-between items-center z-50">
        <button 
          onClick={() => { navigate('/'); setActiveTab('home'); }}
          className={`flex flex-col items-center gap-1 transition-all duration-300 transform hover:scale-110 ${
            activeTab === 'home' 
              ? 'text-red-500 animate-pulse' 
              : 'text-gray-400 hover:text-orange-400'
          }`}
        >
          <div className={`p-2 rounded-xl transition-all duration-300 ${
            activeTab === 'home' 
              ? 'bg-red-500/20 shadow-lg shadow-red-500/30' 
              : 'hover:bg-orange-500/10'
          }`}>
            <LayoutDashboard size={20} />
          </div>
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button 
          onClick={() => { navigate('/analytics'); setActiveTab('stats'); }}
          className={`flex flex-col items-center gap-1 transition-all duration-300 transform hover:scale-110 ${
            activeTab === 'stats' 
              ? 'text-red-500 animate-pulse' 
              : 'text-gray-400 hover:text-orange-400'
          }`}
        >
          <div className={`p-2 rounded-xl transition-all duration-300 ${
            activeTab === 'stats' 
              ? 'bg-red-500/20 shadow-lg shadow-red-500/30' 
              : 'hover:bg-orange-500/10'
          }`}>
            <BarChart3 size={20} />
          </div>
          <span className="text-[10px] font-medium">Stats</span>
        </button>
        <button 
          onClick={() => { navigate('/settings'); setActiveTab('settings'); }}
          className={`flex flex-col items-center gap-1 transition-all duration-300 transform hover:scale-110 ${
            activeTab === 'settings' 
              ? 'text-red-500 animate-pulse' 
              : 'text-gray-400 hover:text-orange-400'
          }`}
        >
          <div className={`p-2 rounded-xl transition-all duration-300 ${
            activeTab === 'settings' 
              ? 'bg-red-500/20 shadow-lg shadow-red-500/30' 
              : 'hover:bg-orange-500/10'
          }`}>
            <Settings size={20} />
          </div>
          <span className="text-[10px] font-medium">Settings</span>
        </button>
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
