import AsyncStorage from '@react-native-async-storage/async-storage';
import { EarthquakeAlert } from '../models/EarthquakeAlert';

class StorageService {
  constructor() {
    this.ALERTS_KEY = '@QuakeAlert:alerts';
  }

  async saveAlert(alert) {
    try {
      const existingAlerts = await this.getAlerts();
      const updatedAlerts = [alert, ...existingAlerts];
      
      // Keep only the last 100 alerts
      const alertsToSave = updatedAlerts.slice(0, 100);
      
      await AsyncStorage.setItem(
        this.ALERTS_KEY,
        JSON.stringify(alertsToSave.map(a => a.toJSON()))
      );
      
      return true;
    } catch (error) {
      console.error('Error saving alert:', error);
      return false;
    }
  }

  async getAlerts() {
    try {
      const alertsJson = await AsyncStorage.getItem(this.ALERTS_KEY);
      
      if (!alertsJson) {
        return [];
      }
      
      const alertsData = JSON.parse(alertsJson);
      return alertsData.map(alertData => EarthquakeAlert.fromJSON(alertData));
    } catch (error) {
      console.error('Error loading alerts:', error);
      return [];
    }
  }

  async clearAlerts() {
    try {
      await AsyncStorage.removeItem(this.ALERTS_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing alerts:', error);
      return false;
    }
  }

  async getAlertById(id) {
    try {
      const alerts = await this.getAlerts();
      return alerts.find(alert => alert.id === id) || null;
    } catch (error) {
      console.error('Error getting alert by ID:', error);
      return null;
    }
  }
}

// Singleton instance
export const storageService = new StorageService();