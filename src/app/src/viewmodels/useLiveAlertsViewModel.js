import { useState, useEffect, useCallback } from 'react';
import { earthquakeService } from '../services/EarthquakeService';
import { storageService } from '../services/StorageService';
import NotificationService from '../services/NotificationService';

export const useLiveAlertsViewModel = () => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNewAlert, setHasNewAlert] = useState(false);
  const [latestAlert, setLatestAlert] = useState(null);

  // Handle new earthquake alert
  const handleNewAlert = useCallback(async (alert) => {
    setAlerts(prevAlerts => [alert, ...prevAlerts]);
    setLatestAlert(alert);
    
    // Send notification instead of showing banner
    await NotificationService.sendEarthquakeNotification(alert);
    
    // Save to storage
    await storageService.saveAlert(alert);
  }, []);

  // Dismiss the new alert banner manually
  const dismissNewAlert = useCallback(() => {
    setHasNewAlert(false);
  }, []);

  // Clear all alerts
  const clearAlerts = useCallback(() => {
    setAlerts([]);
    setHasNewAlert(false);
    setLatestAlert(null);
  }, []);

  // Get alert by ID
  const getAlertById = useCallback((id) => {
    return alerts.find(alert => alert.id === id) || null;
  }, [alerts]);

  // Start/stop the earthquake service
  const startService = useCallback(() => {
    earthquakeService.start();
  }, []);

  const stopService = useCallback(() => {
    earthquakeService.stop();
  }, []);

  useEffect(() => {
    // Subscribe to earthquake service
    earthquakeService.subscribe(handleNewAlert);
    
    // Start the service
    earthquakeService.start();
    
    setIsLoading(false);

    // Cleanup on unmount
    return () => {
      earthquakeService.unsubscribe(handleNewAlert);
      earthquakeService.stop();
    };
  }, [handleNewAlert]);

  return {
    alerts,
    isLoading,
    hasNewAlert,
    latestAlert,
    dismissNewAlert,
    clearAlerts,
    getAlertById,
    startService,
    stopService
  };
};