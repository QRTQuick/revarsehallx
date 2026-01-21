
import { useState, useEffect, useCallback } from 'react';
import { Message, MessageStatus, Platform } from '../types';

const STORAGE_KEY = 'revarsehallx_messages';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored messages", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save data
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, isLoaded]);

  // Status check effect - run every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => prev.map(msg => {
        if (msg.status === MessageStatus.WAITING && new Date() >= new Date(msg.followUpAt)) {
          return { ...msg, status: MessageStatus.DUE };
        }
        return msg;
      }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const addMessage = (msg: Omit<Message, 'id' | 'status'>) => {
    const now = new Date();
    const followUp = new Date(msg.followUpAt);
    const status = now >= followUp ? MessageStatus.DUE : MessageStatus.WAITING;
    
    const newMessage: Message = {
      ...msg,
      id: crypto.randomUUID(),
      status,
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const updateMessage = (id: string, updates: Partial<Message>) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, ...updates } : msg));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const markReplied = (id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, status: MessageStatus.REPLIED, repliedAt: new Date().toISOString() } : msg
    ));
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
        setMessages([]);
    }
  };

  return { 
    messages, 
    addMessage, 
    updateMessage, 
    deleteMessage, 
    markReplied,
    clearAll,
    isLoaded 
  };
};
