export class EarthquakeAlert {
  constructor(id, magnitude, location, timestamp, description = '') {
    this.id = id;
    this.magnitude = magnitude;
    this.location = location;
    this.timestamp = timestamp;
    this.description = description;
  }

  static fromJSON(json) {
    return new EarthquakeAlert(
      json.id,
      json.magnitude,
      json.location,
      new Date(json.timestamp),
      json.description
    );
  }

  toJSON() {
    return {
      id: this.id,
      magnitude: this.magnitude,
      location: this.location,
      timestamp: this.timestamp.toISOString(),
      description: this.description
    };
  }

  getMagnitudeLevel() {
    if (this.magnitude < 3.0) return 'minor';
    if (this.magnitude < 5.0) return 'light';
    if (this.magnitude < 6.0) return 'moderate';
    if (this.magnitude < 7.0) return 'strong';
    return 'major';
  }

  getFormattedTimestamp() {
    return this.timestamp.toLocaleString();
  }
}