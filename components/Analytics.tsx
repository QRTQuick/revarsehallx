
import React from 'react';
import { Message, MessageStatus } from '../modules/types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Trophy, TrendingUp, Clock, AlertCircle } from 'lucide-react';

const AnalyticsView: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const repliedCount = messages.filter(m => m.status === MessageStatus.REPLIED).length;
  const waitingCount = messages.filter(m => m.status === MessageStatus.WAITING).length;
  const dueCount = messages.filter(m => m.status === MessageStatus.DUE).length;
  
  const total = messages.length;
  const responseRate = total === 0 ? 0 : Math.round((repliedCount / total) * 100);

  const statusData = [
    { name: 'Replied', value: repliedCount, color: '#10b981' },
    { name: 'Waiting', value: waitingCount, color: '#f59e0b' },
    { name: 'Due', value: dueCount, color: '#f43f5e' },
  ].filter(d => d.value > 0);

  const platformCounts = messages.reduce((acc, msg) => {
    acc[msg.platform] = (acc[msg.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const platformData = Object.entries(platformCounts).map(([name, value]) => ({ name, value }));

  return (
    <div className="px-6 py-6 space-y-8 pb-32">
      <h2 className="text-2xl font-bold text-slate-900">Analytics</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
          <Trophy className="mb-4 text-indigo-200" size={24} />
          <h4 className="text-3xl font-bold mb-1">{responseRate}%</h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Response Rate</p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <TrendingUp className="mb-4 text-emerald-500" size={24} />
          <h4 className="text-3xl font-bold mb-1 text-slate-900">{total}</h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Tracked</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <AlertCircle size={16} className="text-indigo-500" />
            Status Distribution
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {statusData.map(d => (
                <div key={d.name} className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">{d.name}</span>
                    <span className="font-bold text-slate-900">{d.value}</span>
                </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <h4 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Clock size={16} className="text-indigo-500" />
            Messages by Platform
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} />
                <YAxis hide />
                <Tooltip 
                     cursor={{fill: '#f8fafc'}}
                     contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                />
                <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
