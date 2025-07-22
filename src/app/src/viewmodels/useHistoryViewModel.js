import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/StorageService';
import { earthquakeService } from '../services/EarthquakeService';

export const useHistoryViewModel = () => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load alerts from storage
  const loadAlerts = useCallback(async () => {
    try {
      setIsLoading(true);
      let storedAlerts = await storageService.getAlerts();
      
      // If no stored alerts, load some historical mock data
      if (storedAlerts.length === 0) {
        const historicalAlerts = earthquakeService.getHistoricalAlerts();
        
        // Save historical alerts to storage
        for (const alert of historicalAlerts) {
          await storageService.saveAlert(alert);
        }
        
        storedAlerts = historicalAlerts;
      }
      
      setAlerts(storedAlerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh alerts (pull-to-refresh)
  const refreshAlerts = useCallback(async () => {
    setRefreshing(true);
    await loadAlerts();
    setRefreshing(false);
  }, [loadAlerts]);

  // Select an alert for detailed view
  const selectAlert = useCallback((alert) => {
    setSelectedAlert(alert);
  }, []);

  // Clear selected alert
  const clearSelectedAlert = useCallback(() => {
    setSelectedAlert(null);
  }, []);

  // Get alert by ID
  const getAlertById = useCallback(async (id) => {
    // First check in current alerts
    const foundAlert = alerts.find(alert => alert.id === id);
    if (foundAlert) {
      return foundAlert;
    }
    
    // If not found, try to get from storage
    return await storageService.getAlertById(id);
  }, [alerts]);

  // Clear all alerts
  const clearAllAlerts = useCallback(async () => {
    try {
      await storageService.clearAlerts();
      setAlerts([]);
      setSelectedAlert(null);
    } catch (error) {
      console.error('Error clearing alerts:', error);
    }
  }, []);

  // Filter alerts by magnitude
  const filterByMagnitude = useCallback((minMagnitude) => {
    return alerts.filter(alert => alert.magnitude >= minMagnitude);
  }, [alerts]);

  // Filter alerts by date range
  const filterByDateRange = useCallback((startDate, endDate) => {
    return alerts.filter(alert => {
      const alertDate = new Date(alert.timestamp);
      return alertDate >= startDate && alertDate <= endDate;
    });
  }, [alerts]);

  // Get alerts grouped by date
  const getAlertsGroupedByDate = useCallback(() => {
    const grouped = {};
    
    alerts.forEach(alert => {
      const dateKey = alert.timestamp.toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(alert);
    });
    
    return grouped;
  }, [alerts]);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  return {
    alerts,
    isLoading,
    refreshing,
    selectedAlert,
    loadAlerts,
    refreshAlerts,
    selectAlert,
    clearSelectedAlert,
    getAlertById,
    clearAllAlerts,
    filterByMagnitude,
    filterByDateRange,
    getAlertsGroupedByDate
  };
};