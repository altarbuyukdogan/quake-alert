import { EarthquakeSensor } from './subject/EarthquakeSensor';
import { NotificationService } from './observers/NotificationService';
import { LoggerService } from './observers/LoggerService';
import { MapUpdaterService } from './observers/MapUpdaterService';

/**
 * Main application demonstrating the Observer Pattern
 * 
 * This example shows how the Observer Pattern enables:
 * 1. Loose coupling between earthquake detection and response services
 * 2. Easy addition/removal of new services without modifying existing code
 * 3. Consistent notification mechanism across different service types
 * 4. Single responsibility principle - each service handles one concern
 */

console.log('Earthquake Alert System - Observer Pattern Demo');
console.log('=' .repeat(50));

// Create the subject (earthquake sensor)
const earthquakeSensor = new EarthquakeSensor();

// Create observers (services that need to be notified)
const notificationService = new NotificationService();
const loggerService = new LoggerService();
const mapUpdaterService = new MapUpdaterService();

console.log('\nInitializing earthquake monitoring system...');

// Register observers with the subject
// This demonstrates the Observer Pattern's subscription mechanism
earthquakeSensor.addObserver(notificationService);
earthquakeSensor.addObserver(loggerService);
earthquakeSensor.addObserver(mapUpdaterService);

console.log('\nAll services registered and ready for earthquake detection');

// Simulate earthquake detection events
console.log('\n' + '='.repeat(60));
console.log('SIMULATION: Detecting earthquakes...');
console.log('='.repeat(60));

// Simulate a minor earthquake
setTimeout(() => {
  earthquakeSensor.detectEarthquake(3.2, 'Los Angeles, CA', 8);
}, 1000);

// Simulate a moderate earthquake
setTimeout(() => {
  earthquakeSensor.detectEarthquake(5.7, 'Tokyo, Japan', 15);
}, 3000);

// Simulate a major earthquake
setTimeout(() => {
  earthquakeSensor.detectEarthquake(7.8, 'San Francisco, CA', 12);
}, 5000);

// Demonstrate dynamic observer management
setTimeout(() => {
  console.log('\n' + '='.repeat(60));
  console.log(' DEMONSTRATION: Dynamic observer management');
  console.log('='.repeat(60));
  
  console.log('\nRemoving notification service from earthquake monitoring...');
  earthquakeSensor.removeObserver(notificationService);
  
  console.log('\nDetecting another earthquake (notification service won\'t be notified):');
  earthquakeSensor.detectEarthquake(4.1, 'Mexico City, Mexico', 25);
}, 7000);

// Final demonstration
setTimeout(() => {
  console.log('\n' + '='.repeat(60));
  console.log(' SUMMARY: Observer Pattern Benefits Demonstrated');
  console.log('='.repeat(60));
  console.log(' Loose coupling: Services don\'t depend on each other');
  console.log(' Extensibility: Easy to add new services (e.g., SMS alerts)');
  console.log(' Maintainability: Each service has single responsibility');
  console.log(' Dynamic management: Observers can be added/removed at runtime');
  console.log(' Consistency: All observers receive the same data format');
  console.log('\nObserver Pattern successfully demonstrated!');
}, 9000);