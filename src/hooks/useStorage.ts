import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

// Enhanced storage hook that works on both web and mobile
export const useStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        if (Capacitor.isNativePlatform()) {
          // Use Capacitor Preferences for mobile
          const result = await Preferences.get({ key });
          if (result.value) {
            setValue(JSON.parse(result.value));
          }
        } else {
          // Use localStorage for web
          const stored = localStorage.getItem(key);
          if (stored) {
            setValue(JSON.parse(stored));
          }
        }
      } catch (error) {
        console.error(`Failed to load data for key ${key}:`, error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, [key]);

  // Save data when value changes
  useEffect(() => {
    if (!isLoaded) return;

    const saveData = async () => {
      try {
        const serialized = JSON.stringify(value);
        
        if (Capacitor.isNativePlatform()) {
          // Use Capacitor Preferences for mobile
          await Preferences.set({ key, value: serialized });
        } else {
          // Use localStorage for web
          localStorage.setItem(key, serialized);
        }
      } catch (error) {
        console.error(`Failed to save data for key ${key}:`, error);
      }
    };

    saveData();
  }, [key, value, isLoaded]);

  const updateValue = (newValue: T | ((prev: T) => T)) => {
    setValue(prev => typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue);
  };

  const clearValue = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        await Preferences.remove({ key });
      } else {
        localStorage.removeItem(key);
      }
      setValue(defaultValue);
    } catch (error) {
      console.error(`Failed to clear data for key ${key}:`, error);
    }
  };

  return {
    value,
    setValue: updateValue,
    clearValue,
    isLoaded
  };
};