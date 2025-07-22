import { EarthquakeAlert } from '../models/EarthquakeAlert';
import i18n from '../i18n/i18n';

class EarthquakeService {
  constructor() {
    this.observers = [];
    this.isRunning = false;
    this.alertCounter = 1;
  }

  // Observer pattern implementation
  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(alert) {
    this.observers.forEach(observer => observer(alert));
  }

  // Mock data for earthquake locations
  getMockLocations() {
    return [
      'Istanbul, Turkey',
      'Ankara, Turkey',
      'Izmir, Turkey',
      'Bursa, Turkey',
      'Antalya, Turkey',
      'Adana, Turkey',
      'Gaziantep, Turkey',
      'Konya, Turkey'
    ];
  }

  // Generate a random earthquake alert
  generateRandomAlert() {
    const locations = this.getMockLocations();
    const location = locations[Math.floor(Math.random() * locations.length)];
    const magnitude = (Math.random() * 6 + 2).toFixed(1); // 2.0 to 8.0
    
    // Use timestamp + random number for unique ID
    const uniqueId = `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return new EarthquakeAlert(
      uniqueId,
      parseFloat(magnitude),
      location,
      new Date(),
      i18n.t('common.earthquakeDetected', { magnitude, location })
    );
  }

  // Start the mock service
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    
    // Generate initial alert immediately
    setTimeout(() => {
      if (this.isRunning) {
        const alert = this.generateRandomAlert();
        this.notifyObservers(alert);
      }
    }, 2000);

    // Generate random alerts every 30-60 seconds
    this.interval = setInterval(() => {
      if (this.isRunning && Math.random() > 0.7) { // 30% chance every interval
        const alert = this.generateRandomAlert();
        this.notifyObservers(alert);
      }
    }, 45000); // Check every 45 seconds
  }

  // Stop the mock service
  stop() {
    this.isRunning = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // Get historical mock data
  getHistoricalAlerts() {
    const locations = this.getMockLocations();
    const alerts = [];
    
    // Generate 10 historical alerts
    for (let i = 0; i < 10; i++) {
      const daysAgo = Math.floor(Math.random() * 30); // Last 30 days
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);
      
      const timestamp = new Date();
      timestamp.setDate(timestamp.getDate() - daysAgo);
      timestamp.setHours(timestamp.getHours() - hoursAgo);
      timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);
      
      const location = locations[Math.floor(Math.random() * locations.length)];
      const magnitude = (Math.random() * 6 + 2).toFixed(1);
      
      // Use timestamp + index + random for unique historical ID
      const uniqueId = `historical_${timestamp.getTime()}_${i}_${Math.random().toString(36).substr(2, 5)}`;
      
      alerts.push(new EarthquakeAlert(
        uniqueId,
        parseFloat(magnitude),
        location,
        timestamp,
        i18n.t('common.historicalEarthquake', { magnitude, location })
      ));
    }
    
    // Sort by timestamp (newest first)
    return alerts.sort((a, b) => b.timestamp - a.timestamp);
  }
}

// Singleton instance
export const earthquakeService = new EarthquakeService();