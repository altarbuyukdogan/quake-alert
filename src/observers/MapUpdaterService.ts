import { IObserver } from './IObserver';
import { EarthquakeData } from '../subject/ISubject';

/**
 * Concrete Observer implementation for map updates
 * 
 * Pattern Role: Concrete Observer
 * Why appropriate: Handles map visualization updates independently
 * 
 * Modularity benefit: Map update logic is separated from notifications and logging
 * Extensibility: Easy to integrate with different mapping services or add
 * new visualization features without affecting other system components
 */
export class MapUpdaterService implements IObserver {
  private serviceName = 'Map Updater Service';
  private activeMarkers: Array<{location: string, magnitude: number, timestamp: Date}> = [];

  /**
   * Handles earthquake data updates from the subject
   * Implements the Observer Pattern's update mechanism for map visualization
   */
  update(data: EarthquakeData): void {
    console.log(`[${this.serviceName}] MAP UPDATE:`);
    console.log(`Adding earthquake marker at: ${data.location}`);
    console.log(`Magnitude: ${data.magnitude} (${this.getMarkerSize(data.magnitude)} marker)`);
    console.log(`Occurred: ${data.timestamp.toLocaleString()}`);
    
    // Simulate adding marker to map
    this.activeMarkers.push({
      location: data.location,
      magnitude: data.magnitude,
      timestamp: data.timestamp
    });
    
    console.log(`Total active markers on map: ${this.activeMarkers.length}`);
    console.log(`Marker color: ${this.getMarkerColor(data.magnitude)}`);
    
    // Simulate map zoom adjustment for significant earthquakes
    if (data.magnitude >= 6.0) {
      console.log(`Auto-zooming to earthquake epicenter due to high magnitude`);
    }
  }

  private getMarkerSize(magnitude: number): string {
    if (magnitude >= 7.0) return 'LARGE';
    if (magnitude >= 5.0) return 'MEDIUM';
    return 'SMALL';
  }

  private getMarkerColor(magnitude: number): string {
    if (magnitude >= 7.0) return 'RED';
    if (magnitude >= 5.0) return 'ORANGE';
    if (magnitude >= 3.0) return 'YELLOW';
    return 'GREEN';
  }
}