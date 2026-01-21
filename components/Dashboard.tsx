
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message, MessageStatus, Platform } from '../modules/types';
import { getPlatformIcon } from '../modules/utils/platformIcons';
import { getStatusColor } from '../modules/utils/statusHelpers';
import { Search, Filter, Plus, ChevronRight, Clock } from 'lucide-react';

interface DashboardProps {
  messages: Message[];
  markReplied: (id: string) => void;
  deleteMessage: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ messages, markReplied, deleteMessage }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<Platform | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<MessageStatus | 'All'>('All');

  const filteredMessages = useMemo(() => {
    return messages.filter(m => {
      const matchesSearch = m.contactName.toLowerCase().includes(search.toLowerCase()) || 
                            m.summary.toLowerCase().includes(search.toLowerCase());
      const matchesPlatform = filterPlatform === 'All' || m.platform === filterPlatform;
      const matchesStatus = filterStatus === 'All' || m.status === filterStatus;
      return matchesSearch && matchesPlatform && matchesStatus;
    }).sort((a, b) => {
        // Sort by Due first, then Waiting, then Replied
        const order = { [MessageStatus.DUE]: 0, [MessageStatus.WAITING]: 1, [MessageStatus.REPLIED]: 2 };
        return order[a.status] - order[b.status] || new Date(a.followUpAt).getTime() - new Date(b.followUpAt).getTime();
    });
  }, [messages, search, filterPlatform, filterStatus]);

  return (
    <div className="px-6 pt-6 bg-gradient-to-b from-black to-gray-900 min-h-full">
      {/* Search & Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search contacts or messages..."
            className="w-full bg-gray-900 border border-red-900/30 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-white placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {(['All', 'Email', 'WhatsApp', 'LinkedIn', 'Instagram'] as const).map(p => (
            <button
              key={p}
              onClick={() => setFilterPlatform(p)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                filterPlatform === p 
                  ? 'bg-red-600 text-white shadow-md shadow-red-900/30' 
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:border-orange-500/30'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Message List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-800 p-6 rounded-full mb-4 border border-red-900/30">
              <Plus size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No messages tracked</h3>
            <p className="text-sm text-gray-400 px-10">Start tracking your outbound communications by adding your first message.</p>
          </div>
        ) : (
          filteredMessages.map(msg => (
            <div 
              key={msg.id}
              onClick={() => navigate(`/message/${msg.id}`)}
              className="group bg-gray-900 rounded-2xl p-5 border border-red-900/20 shadow-sm active:scale-[0.98] transition-all cursor-pointer hover:border-red-500/40 hover:shadow-lg hover:shadow-red-900/20"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gray-800 rounded-xl text-orange-400 border border-orange-500/20">
                    {getPlatformIcon(msg.platform)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{msg.contactName}</h4>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{msg.platform}</p>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight ${getStatusColor(msg.status)}`}>
                  {msg.status}
                </div>
              </div>
              
              <p className="text-sm text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                {msg.summary}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock size={14} />
                  <span className="text-[10px] font-medium">
                    {msg.status === MessageStatus.REPLIED 
                        ? `Replied ${new Date(msg.repliedAt!).toLocaleDateString()}`
                        : `Follow-up ${new Date(msg.followUpAt).toLocaleDateString()}`
                    }
                  </span>
                </div>
                <ChevronRight size={16} className="text-orange-400" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
