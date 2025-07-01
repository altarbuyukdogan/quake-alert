/**
 * Interface representing earthquake data
 * This defines the structure of data passed between Subject and Observers
 */
export interface EarthquakeData {
  magnitude: number;
  location: string;
  timestamp: Date;
  depth: number;
}

/**
 * Subject interface for the Observer Pattern
 * This defines the contract that all subjects must follow
 * Allows observers to subscribe/unsubscribe and ensures notification capability
 */
export interface ISubject {
  addObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notifyObservers(data: EarthquakeData): void;
}

/**
 * Observer interface for the Observer Pattern
 * This defines the contract that all observers must implement
 * Ensures consistent update mechanism across all observer types
 */
export interface IObserver {
  update(data: EarthquakeData): void;
}