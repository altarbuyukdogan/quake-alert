# Quake Alert 🚨

A React Native mobile app built with Expo for earthquake alerts and safety information. The app follows MVVM architecture and supports both English and Turkish languages.

## Features

- **Live Alerts**: Real-time earthquake notifications with safety banner
- **History**: View past earthquake alerts with detailed information
- **Safety Tips**: Interactive earthquake safety guidelines
- **Multilingual**: Support for English and Turkish
- **MVVM Architecture**: Clean separation of concerns
- **Mock Data**: Simulated earthquake service for development

## Architecture

### MVVM Pattern
- **Models**: `EarthquakeAlert`, `SafetyTip`
- **ViewModels**: Custom hooks (`useLiveAlertsViewModel`, `useHistoryViewModel`, `useTipsViewModel`)
- **Views**: React Native functional components

### Design Patterns
- **Observer Pattern**: Earthquake service notifications
- **Command Pattern**: Safety tip interactions
- **Singleton Pattern**: Service instances

## Project Structure

```
QuakeAlert/
├── App.js                          # Main app component with navigation
├── src/
│   ├── models/
│   │   ├── EarthquakeAlert.js       # Earthquake alert model
│   │   └── SafetyTip.js             # Safety tip model
│   ├── services/
│   │   ├── EarthquakeService.js     # Mock earthquake data service
│   │   └── StorageService.js        # AsyncStorage wrapper
│   ├── viewmodels/
│   │   ├── useLiveAlertsViewModel.js # Live alerts state management
│   │   ├── useHistoryViewModel.js   # History state management
│   │   └── useTipsViewModel.js      # Safety tips state management
│   ├── views/
│   │   ├── LiveAlertsScreen.js      # Live alerts screen
│   │   ├── HistoryScreen.js         # Alert history screen
│   │   └── SafetyTipsScreen.js      # Safety tips screen
│   └── i18n/
│       ├── i18n.js                  # i18next configuration
│       └── locales/
│           ├── en.json              # English translations
│           └── tr.json              # Turkish translations
├── package.json
├── app.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (for testing)

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd QuakeAlert
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Expo development server**:
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/simulator**:
   - **iOS Simulator**: Press `i` in the terminal or click "Run on iOS simulator"
   - **Android Emulator**: Press `a` in the terminal or click "Run on Android device/emulator"
   - **Physical Device**: Scan the QR code with Expo Go app

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start and run on Android
- `npm run ios` - Start and run on iOS
- `npm run web` - Start and run on web browser

## Features Overview

### Live Alerts Screen
- Displays real-time earthquake alerts
- Shows prominent safety banner for new alerts
- Color-coded magnitude indicators
- Tap alerts for detailed information

### History Screen
- Lists all past earthquake alerts
- Pull-to-refresh functionality
- Detailed modal view for each alert
- Relative time display (e.g., "2h ago")

### Safety Tips Screen
- Interactive safety guidelines
- Command pattern implementation
- Step-by-step instructions
- Color-coded tip categories

### Internationalization
- English and Turkish language support
- Easy language switching
- Comprehensive translations for all UI elements

## Mock Data

The app uses mock services for development:

- **EarthquakeService**: Generates random earthquake alerts every 45 seconds
- **StorageService**: Manages local storage with AsyncStorage
- **Historical Data**: Pre-populated with sample earthquake data

## Customization

### Adding New Languages

1. Create a new locale file in `src/i18n/locales/`
2. Add translations following the existing structure
3. Import and register in `src/i18n/i18n.js`

### Modifying Alert Frequency

Edit the interval in `src/services/EarthquakeService.js`:

```javascript
// Generate alerts every 30 seconds instead of 45
this.interval = setInterval(() => {
  // ...
}, 30000);
```

### Styling

The app uses a consistent color scheme:
- Primary: `#FF6B35` (Orange)
- Success: `#4CAF50` (Green)
- Warning: `#FF9800` (Orange)
- Error: `#F44336` (Red)
- Background: `#FFFFFF` (White)

## Development Notes

- The app follows React Native best practices
- Uses functional components with hooks
- Implements proper error handling
- Includes loading states and empty states
- Responsive design for different screen sizes

## Future Enhancements

- Real earthquake API integration
- Push notifications
- User location-based alerts
- Offline support
- Alert sharing functionality
- Emergency contacts integration

## License

This project is for educational and development purposes.