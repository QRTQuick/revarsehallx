
import React from 'react';
import { Bell, Clock, Trash2, Shield, Info, ExternalLink } from 'lucide-react';

const SettingsView: React.FC<{ clearAll: () => void }> = ({ clearAll }) => {
  return (
    <div className="px-6 py-6 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-2xl font-bold text-slate-900">Settings</h2>

      <div className="space-y-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-4">Preferences</p>
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Bell size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Notifications</h4>
                <p className="text-xs text-slate-400">Alert me when follow-ups are due</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Default Schedule</h4>
                <p className="text-xs text-slate-400">Suggest follow-up after (days)</p>
              </div>
            </div>
            <span className="font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">3</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-4">Privacy & System</p>
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-4 p-6 border-b border-slate-50">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Local Data Only</h4>
              <p className="text-xs text-slate-400">Your data never leaves this device</p>
            </div>
          </div>
          
          <button 
            onClick={clearAll}
            className="w-full flex items-center gap-4 p-6 active:bg-rose-50 transition-colors group"
          >
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl group-active:bg-rose-100">
              <Trash2 size={20} />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-rose-600">Clear All Data</h4>
              <p className="text-xs text-rose-400">Wipe all messages and settings</p>
            </div>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-4">About</p>
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">RevarseHallX v1.0</h3>
            <p className="text-xs text-slate-500 mb-6 px-4">Built to help busy professionals stay on top of their outbound communications.</p>
            <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-6 py-3 rounded-2xl hover:bg-indigo-100 transition-colors"
            >
                View Documentation <ExternalLink size={14} />
            </a>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
