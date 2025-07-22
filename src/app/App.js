import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import './src/i18n/i18n';
import i18n from './src/i18n/i18n';
import NotificationService from './src/services/NotificationService';

import LiveAlertsScreen from './src/views/LiveAlertsScreen';
import HistoryScreen from './src/views/HistoryScreen';
import SafetyTipsScreen from './src/views/SafetyTipsScreen';

const Tab = createBottomTabNavigator();

const LanguageButton = () => {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 12,
        marginRight: 10,
      }}
    >
      <Ionicons name="globe" size={16} color="#fff" />
      <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', marginLeft: 4 }}>
        {i18n.language.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const { t } = useTranslation();
  
  useEffect(() => {
    // Start notification service
    NotificationService.registerForPushNotificationsAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            animationEnabled: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Live') {
                iconName = focused ? 'warning' : 'warning-outline';
              } else if (route.name === 'History') {
                iconName = focused ? 'time' : 'time-outline';
              } else if (route.name === 'Tips') {
                iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FF6B35',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: '#FF6B35',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => <LanguageButton />,
            tabBarStyle: {
              elevation: 8,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
          })}
        >
          <Tab.Screen 
            name="Live" 
            component={LiveAlertsScreen} 
            options={{ title: t('live.title') }}
          />
          <Tab.Screen 
            name="History" 
            component={HistoryScreen} 
            options={{ title: t('history.title') }}
          />
          <Tab.Screen 
            name="Tips" 
            component={SafetyTipsScreen} 
            options={{ title: t('tips.title') }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}