
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Message, MessageStatus, Platform } from '../modules/types';
import { getPlatformIcon } from '../modules/utils/platformIcons';
import { getStatusColorWithBorder } from '../modules/utils/statusHelpers';
import { generateFollowUpDraft } from '../modules/services/geminiService';
import { ArrowLeft, Calendar, CheckCircle2, Trash2, Edit3, Sparkles, Copy, ExternalLink, Clock } from 'lucide-react';

interface MessageDetailProps {
  messages: Message[];
  markReplied: (id: string) => void;
  deleteMessage: (id: string) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
}

const MessageDetail: React.FC<MessageDetailProps> = ({ messages, markReplied, deleteMessage, updateMessage }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const message = messages.find(m => m.id === id);
  const [draft, setDraft] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!message) return <div className="p-10 text-center">Message not found</div>;

  const handleGenerateDraft = async () => {
    setIsGenerating(true);
    const text = await generateFollowUpDraft(message);
    setDraft(text);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-6 py-6 animate-in fade-in zoom-in-95 duration-300 bg-gradient-to-b from-black to-gray-900 min-h-full">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate('/')}
          className="p-2 -ml-2 text-gray-400 hover:text-red-400 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex gap-2">
            <button 
                onClick={() => navigate(`/edit/${message.id}`)}
                className="p-3 bg-gray-800 border border-red-900/30 rounded-2xl text-gray-400 hover:text-orange-400 transition-all shadow-sm"
            >
                <Edit3 size={18} />
            </button>
            <button 
                onClick={() => { deleteMessage(message.id); navigate('/'); }}
                className="p-3 bg-gray-800 border border-red-900/30 rounded-2xl text-gray-400 hover:text-red-400 transition-all shadow-sm"
            >
                <Trash2 size={18} />
            </button>
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-gray-900 rounded-[2rem] p-8 shadow-sm border border-red-900/20 mb-6 text-center">
        <div className="mx-auto w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-orange-400 mb-4 shadow-inner border border-orange-500/20">
          {getPlatformIcon(message.platform, 24)}
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">{message.contactName}</h2>
        <div className="flex items-center justify-center gap-2 mb-6">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColorWithBorder(message.status)}`}>
            {message.status}
            </span>
        </div>

        <div className="bg-gray-800 rounded-2xl p-5 text-left mb-6 border border-red-900/20">
            <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Clock size={12} /> Message Summary
            </p>
            <p className="text-gray-300 leading-relaxed font-medium">
                {message.summary}
            </p>
        </div>

        <div className="flex items-center justify-between px-2">
            <div className="text-left">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Sent</p>
                <p className="text-xs font-semibold text-gray-300">{new Date(message.sentAt).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Follow-up</p>
                <p className="text-xs font-semibold text-gray-300">{new Date(message.followUpAt).toLocaleDateString()}</p>
            </div>
        </div>
      </div>

      {/* AI Draft Widget */}
      {message.status !== MessageStatus.REPLIED && (
        <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-[2rem] p-8 border border-red-500/30 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-red-400 font-bold text-lg flex items-center gap-2">
                <Sparkles size={20} className="text-orange-400" />
                AI Draft Helper
              </h3>
              <p className="text-red-300/70 text-xs font-medium">Generate a perfect follow-up draft</p>
            </div>
            {draft && (
              <button 
                onClick={handleCopy}
                className={`p-2.5 rounded-xl transition-all ${copied ? 'bg-green-600 text-white shadow-green-900/30' : 'bg-gray-800 text-orange-400 shadow-orange-900/20'} shadow-md border ${copied ? 'border-green-500/30' : 'border-orange-500/30'}`}
              >
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              </button>
            )}
          </div>

          {draft ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="bg-gray-800/80 backdrop-blur rounded-2xl p-5 text-gray-200 text-sm font-medium leading-relaxed shadow-sm border border-red-500/20">
                {draft}
              </div>
              <button 
                onClick={handleGenerateDraft}
                className="w-full py-3 text-xs font-bold text-orange-400 hover:text-red-400 transition-colors"
              >
                Regenerate Draft
              </button>
            </div>
          ) : (
            <button 
              onClick={handleGenerateDraft}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 active:scale-95 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Follow-up Draft
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Main Actions */}
      <div className="grid grid-cols-1 gap-4">
        {message.status !== MessageStatus.REPLIED ? (
          <button 
            onClick={() => { markReplied(message.id); navigate('/'); }}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-green-900/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <CheckCircle2 size={24} />
            Mark as Replied
          </button>
        ) : (
          <div className="text-center py-6 bg-gray-800 rounded-2xl border border-green-500/30">
             <p className="text-green-400 font-bold flex items-center justify-center gap-2">
                <CheckCircle2 size={20} />
                Already Replied
             </p>
             <p className="text-xs text-gray-400 mt-1">on {new Date(message.repliedAt!).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageDetail;
