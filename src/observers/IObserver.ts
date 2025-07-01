import { EarthquakeData } from '../subject/ISubject';

/**
 * Observer interface for the Observer Pattern
 * This defines the contract that all observers must implement
 * Ensures consistent update mechanism across all observer types
 */
export interface IObserver {
  update(data: EarthquakeData): void;
}