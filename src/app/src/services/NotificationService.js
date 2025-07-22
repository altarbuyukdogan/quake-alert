import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService {
  constructor() {
    this.expoPushToken = null;
  }

  async registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Bildirim izni verilmedi!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo Push Token:', token);
    } else {
      alert('Fiziksel cihaz gerekli!');
    }

    this.expoPushToken = token;
    return token;
  }

  async sendEarthquakeNotification(alert) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Deprem Uyarısı!',
          body: `Büyüklük: ${alert.magnitude} - Konum: ${alert.location}`,
          data: {
            alertId: alert.id,
            magnitude: alert.magnitude,
            location: alert.location,
          },
          sound: 'default',
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: null,
      });
      console.log('Deprem bildirimi gönderildi:', alert.location);
    } catch (error) {
      console.error('Bildirim gönderme hatası:', error);
    }
  }

  async sendTestNotification() {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Test Bildirimi',
          body: 'QuakeAlert bildirim sistemi çalışıyor!',
          data: { test: true },
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Test bildirimi hatası:', error);
    }
  }

  addNotificationReceivedListener(listener) {
    return Notifications.addNotificationReceivedListener(listener);
  }

  addNotificationResponseReceivedListener(listener) {
    return Notifications.addNotificationResponseReceivedListener(listener);
  }
}

export default new NotificationService();