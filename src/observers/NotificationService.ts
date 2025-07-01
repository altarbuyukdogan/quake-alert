import { IObserver } from './IObserver';
import { EarthquakeData } from '../subject/ISubject';

/**
 * Concrete Observer implementation for notifications
 * 
 * Pattern Role: Concrete Observer
 * Why appropriate: Handles user notifications independently from other services
 * 
 * Modularity benefit: Notification logic is encapsulated and can be modified
 * without affecting other observers or the subject
 * Extensibility: Easy to add different notification channels (SMS, email, push)
 */
export class NotificationService implements IObserver {
  private serviceName = 'Notification Service';

  /**
   * Handles earthquake data updates from the subject
   * Implements the Observer Pattern's update mechanism
   */
  update(data: EarthquakeData): void {
    console.log(`[${this.serviceName}] ALERT SENT:`);
    console.log(`Location: ${data.location}`);
    console.log(`Magnitude: ${data.magnitude}`);
    console.log(`Time: ${data.timestamp.toLocaleString()}`);
    
    // Simulate different alert levels based on magnitude
    if (data.magnitude >= 7.0) {
      console.log(`CRITICAL ALERT: Major earthquake detected!`);
    } else if (data.magnitude >= 5.0) {
      console.log(`WARNING: Moderate earthquake detected`);
    } else {
      console.log(`INFO: Minor earthquake detected`);
    }
  }
}