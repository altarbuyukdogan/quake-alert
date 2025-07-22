export class SafetyTip {
  constructor(id, title, description, steps = []) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.steps = steps;
  }

  static fromJSON(json) {
    return new SafetyTip(
      json.id,
      json.title,
      json.description,
      json.steps || []
    );
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      steps: this.steps
    };
  }
}