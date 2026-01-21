import React from 'react';
import { Mail, MessageCircle, Linkedin, Instagram, MoreHorizontal } from 'lucide-react';
import { Platform } from '../types';

export const getPlatformIcon = (platform: Platform, size: number = 18) => {
  switch (platform) {
    case 'Email': return <Mail size={size} />;
    case 'WhatsApp': return <MessageCircle size={size} />;
    case 'LinkedIn': return <Linkedin size={size} />;
    case 'Instagram': return <Instagram size={size} />;
    default: return <MoreHorizontal size={size} />;
  }
};

export const platforms: Platform[] = ['Email', 'WhatsApp', 'LinkedIn', 'Instagram', 'Other'];