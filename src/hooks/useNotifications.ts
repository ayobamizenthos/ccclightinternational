import { useState, useEffect, useCallback } from 'react';

interface NotificationPermission {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>({
    granted: false,
    denied: false,
    default: true,
  });
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const supported = 'Notification' in window;
    setIsSupported(supported);
    
    if (supported) {
      updatePermissionState(Notification.permission);
    }
  }, []);

  const updatePermissionState = (perm: NotificationPermission['granted'] extends boolean ? 'granted' | 'denied' | 'default' : never) => {
    setPermission({
      granted: perm === 'granted',
      denied: perm === 'denied',
      default: perm === 'default',
    });
  };

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;
    
    try {
      const result = await Notification.requestPermission();
      updatePermissionState(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [isSupported]);

  const showNotification = useCallback((title: string, options?: NotificationOptions): Notification | null => {
    if (!isSupported || !permission.granted) return null;
    
    try {
      const notification = new Notification(title, {
        icon: '/ccc-rainbow-logo.png',
        badge: '/ccc-rainbow-logo.png',
        ...options,
      });
      
      return notification;
    } catch (error) {
      console.error('Error showing notification:', error);
      return null;
    }
  }, [isSupported, permission.granted]);

  const scheduleNotification = useCallback((
    title: string, 
    options: NotificationOptions, 
    delayMs: number
  ): NodeJS.Timeout | null => {
    if (!isSupported || !permission.granted) return null;
    
    const timeoutId = setTimeout(() => {
      showNotification(title, options);
    }, delayMs);
    
    return timeoutId;
  }, [isSupported, permission.granted, showNotification]);

  // Schedule daily notification at specific time
  const scheduleDailyNotification = useCallback((
    title: string,
    options: NotificationOptions,
    hour: number,
    minute: number
  ): void => {
    if (!isSupported || !permission.granted) return;
    
    const scheduleNext = () => {
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(hour, minute, 0, 0);
      
      // If time has passed today, schedule for tomorrow
      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }
      
      const delay = scheduledTime.getTime() - now.getTime();
      
      setTimeout(() => {
        showNotification(title, options);
        // Reschedule for next day
        scheduleNext();
      }, delay);
    };
    
    scheduleNext();
  }, [isSupported, permission.granted, showNotification]);

  return {
    isSupported,
    permission,
    requestPermission,
    showNotification,
    scheduleNotification,
    scheduleDailyNotification,
  };
};

export default useNotifications;
