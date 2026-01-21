
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Platform, Message } from '../modules/types';
import { platforms } from '../modules/utils/platformIcons';
import { suggestFollowUpTime } from '../modules/services/geminiService';
import { ArrowLeft, Sparkles, Calendar, User, AlignLeft, Globe } from 'lucide-react';

interface MessageFormProps {
  onSubmit: (data: Omit<Message, 'id' | 'status'>) => void;
  initialData?: Message;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit, initialData }) => {
  const navigate = useNavigate();
  const [contactName, setContactName] = useState(initialData?.contactName || '');
  const [platform, setPlatform] = useState<Platform>(initialData?.platform || 'Email');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [followUpDays, setFollowUpDays] = useState(3);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !summary) return;

    const sentAt = initialData?.sentAt || new Date().toISOString();
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + followUpDays);
    
    onSubmit({
      contactName,
      platform,
      summary,
      sentAt,
      followUpAt: followUpDate.toISOString()
    });
  };

  const handleAISuggest = async () => {
    if (!summary) return;
    setIsSuggesting(true);
    const suggestedDays = await suggestFollowUpTime(summary);
    setFollowUpDays(suggestedDays);
    setIsSuggesting(false);
  };

  return (
    <div className="px-6 py-6 animate-in fade-in slide-in-from-bottom-4 duration-300 bg-gradient-to-b from-black to-gray-900 min-h-full">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 p-2 -ml-2 text-gray-400 hover:text-red-400 transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-2xl font-bold text-white mb-8">
        {initialData ? 'Edit Message' : 'Track New Message'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
            <User size={12} /> Contact Name
          </label>
          <input 
            autoFocus
            type="text"
            required
            className="w-full bg-gray-900 border border-red-900/30 rounded-2xl py-4 px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium text-white placeholder-gray-400"
            placeholder="Who did you message?"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>

        {/* Platform */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
            <Globe size={12} /> Platform
          </label>
          <div className="grid grid-cols-3 gap-2">
            {platforms.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border duration-200 ${
                  platform === p 
                    ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-900/30' 
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-orange-500/30'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Message Summary */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
            <AlignLeft size={12} /> Summary
          </label>
          <textarea 
            required
            rows={3}
            className="w-full bg-gray-900 border border-red-900/30 rounded-2xl py-4 px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-medium resize-none text-white placeholder-gray-400"
            placeholder="What was the message about?"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        {/* Follow-up Scheduling */}
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar size={12} /> Follow-up in
            </label>
            <button
                type="button"
                onClick={handleAISuggest}
                disabled={!summary || isSuggesting}
                className={`text-[10px] font-bold flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${
                    !summary || isSuggesting ? 'text-gray-500' : 'text-red-400 bg-red-900/20 hover:bg-red-900/30 border border-red-500/30'
                }`}
            >
              <Sparkles size={10} />
              {isSuggesting ? 'Analyzing...' : 'AI Suggest'}
            </button>
          </div>
          <div className="flex gap-2">
            {[1, 3, 7, 14].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setFollowUpDays(d)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border duration-200 ${
                  followUpDays === d 
                    ? 'bg-red-600 text-white border-red-600 shadow-sm' 
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-orange-500/30'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-red-900/30 active:scale-95 transition-all mt-4 hover:shadow-2xl hover:shadow-red-900/40"
        >
          {initialData ? 'Update Tracking' : 'Start Tracking'}
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
