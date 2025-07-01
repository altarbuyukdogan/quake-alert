# Earthquake Alert System – Observer Pattern

This project is a simplified backend simulation of an earthquake alert system implemented in TypeScript.

The goal is to demonstrate the **Observer Design Pattern** through a single use case:
> When an earthquake is detected, multiple services (observers) are notified automatically.

## Design Pattern Used

### Observer Pattern

- **Subject**: `EarthquakeSensor`  
- **Observers**:
  - `NotificationService`: Sends alerts to users
  - `LoggerService`: Logs earthquake events
  - `MapUpdaterService`: Updates the UI map markers (simulated)

Each observer is loosely coupled and subscribes to the subject independently.
This structure allows for easy extensibility and separation of concerns.

## Folder Structure

```
src/
├── index.ts
├── subject/
│   ├── ISubject.ts
│   └── EarthquakeSensor.ts
└── observers/
    ├── IObserver.ts
    ├── LoggerService.ts
    ├── NotificationService.ts
    └── MapUpdaterService.ts
```

## How to Run

1. Install dependencies (if any):
   ```bash
   npm install
   ```

2. Run the simulation:
   ```bash
   npx ts-node src/index.ts
   ```

3. You will see output in the console as each observer reacts to the simulated earthquake.

> This is a backend-only demo. No database, UI, or external API integration is included.

## Sample Output

```
All services registered and ready for earthquake detection
Detecting earthquake...
NotificationService: ALERT SENT
LoggerService: EVENT LOGGED
MapUpdaterService: MAP UPDATED
```

## Contributors

This code is developed as part of a group project. Contribution details are listed in `docs/TASK_MATRIX.md`.

## Documentation

See `docs/SoftwareDesignDocument.pdf` for a detailed explanation of the system architecture and design decisions.
