import { IObserver } from './IObserver';
import { EarthquakeData } from '../subject/ISubject';

/**
 * Concrete Observer implementation for logging
 * 
 * Pattern Role: Concrete Observer
 * Why appropriate: Separates logging concerns from other system responsibilities
 * 
 * Modularity benefit: Logging logic is isolated and can be enhanced
 * (e.g., file logging, database logging) without affecting other components
 * Extensibility: Easy to add different log levels, formats, or destinations
 */
export class LoggerService implements IObserver {
  private serviceName = 'Logger Service';
  private logCount = 0;

  /**
   * Handles earthquake data updates from the subject
   * Implements the Observer Pattern's update mechanism for logging
   */
  update(data: EarthquakeData): void {
    this.logCount++;
    
    console.log(`[${this.serviceName}] LOG ENTRY #${this.logCount}:`);
    console.log(`Timestamp: ${data.timestamp.toISOString()}`);
    console.log(`Location: ${data.location}`);
    console.log(`Magnitude: ${data.magnitude}`);
    console.log(`Depth: ${data.depth}km`);
    console.log(`Data logged to system records`);
    
    // Simulate structured logging
    const logEntry = {
      id: this.logCount,
      event: 'earthquake_detected',
      data: data,
      severity: this.getSeverityLevel(data.magnitude)
    };
    
    console.log(`Structured log: ${JSON.stringify(logEntry)}`);
  }

  private getSeverityLevel(magnitude: number): string {
    if (magnitude >= 7.0) return 'CRITICAL';
    if (magnitude >= 5.0) return 'HIGH';
    if (magnitude >= 3.0) return 'MEDIUM';
    return 'LOW';
  }
}