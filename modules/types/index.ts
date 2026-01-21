export type Platform = 'Email' | 'WhatsApp' | 'LinkedIn' | 'Instagram' | 'Other';

export enum MessageStatus {
  WAITING = 'Waiting',
  DUE = 'Follow-Up Due',
  REPLIED = 'Replied'
}

export interface Message {
  id: string;
  contactName: string;
  platform: Platform;
  summary: string;
  sentAt: string; // ISO String
  followUpAt: string; // ISO String
  status: MessageStatus;
  repliedAt?: string; // ISO String
}

export interface Settings {
  notificationsEnabled: boolean;
  defaultFollowUpDays: number;
  theme: 'light' | 'dark';
}