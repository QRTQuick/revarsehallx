import { MessageStatus } from '../types';

export const getStatusColor = (status: MessageStatus): string => {
  switch (status) {
    case MessageStatus.WAITING: return 'bg-orange-900/20 text-orange-400 border border-orange-500/30';
    case MessageStatus.DUE: return 'bg-red-900/30 text-red-400 border border-red-500/50';
    case MessageStatus.REPLIED: return 'bg-green-900/20 text-green-400 border border-green-500/30';
  }
};

export const getStatusColorWithBorder = (status: MessageStatus): string => {
  switch (status) {
    case MessageStatus.WAITING: return 'bg-orange-900/20 text-orange-400 border border-orange-500/30';
    case MessageStatus.DUE: return 'bg-red-900/30 text-red-400 border border-red-500/50 animate-pulse';
    case MessageStatus.REPLIED: return 'bg-green-900/20 text-green-400 border border-green-500/30';
  }
};