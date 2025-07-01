import { ISubject, IObserver, EarthquakeData } from './ISubject';

/**
 * Concrete Subject implementation for the Observer Pattern
 * Represents the earthquake detection sensor that notifies observers
 * 
 * Pattern Role: Subject/Observable
 * Why appropriate: Centralizes earthquake detection and ensures all interested
 * parties are notified automatically when an event occurs
 * 
 * Modularity benefit: New observer types can be added without modifying this class
 * Extensibility: Easy to add new notification mechanisms or change detection logic
 */
export class EarthquakeSensor implements ISubject {
  private observers: IObserver[] = [];

  /**
   * Adds an observer to the notification list
   * Implements the subscription mechanism of the Observer Pattern
   */
  addObserver(observer: IObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      console.log(`Observer added. Total observers: ${this.observers.length}`);
    }
  }

  /**
   * Removes an observer from the notification list
   * Implements the unsubscription mechanism of the Observer Pattern
   */
  removeObserver(observer: IObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      console.log(`Observer removed. Total observers: ${this.observers.length}`);
    }
  }

  /**
   * Notifies all registered observers about an earthquake event
   * Core implementation of the Observer Pattern's notification mechanism
   */
  notifyObservers(data: EarthquakeData): void {
    console.log(`\nEARTHQUAKE DETECTED - Notifying ${this.observers.length} observers...`);
    this.observers.forEach(observer => {
      observer.update(data);
    });
  }

  /**
   * Simulates earthquake detection
   * In a real system, this would be triggered by actual seismic data
   */
  detectEarthquake(magnitude: number, location: string, depth: number = 10): void {
    const earthquakeData: EarthquakeData = {
      magnitude,
      location,
      timestamp: new Date(),
      depth
    };
    
    this.notifyObservers(earthquakeData);
  }
}