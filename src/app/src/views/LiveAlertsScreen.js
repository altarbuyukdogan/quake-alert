import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useLiveAlertsViewModel } from '../viewmodels/useLiveAlertsViewModel';

const LiveAlertsScreen = () => {
  const { t } = useTranslation();
  const {
    alerts,
    isLoading,
    clearAlerts
  } = useLiveAlertsViewModel();

  const getMagnitudeColor = (magnitude) => {
    if (magnitude < 3.0) return '#4CAF50'; // Green
    if (magnitude < 5.0) return '#FF9800'; // Orange
    if (magnitude < 6.0) return '#FF5722'; // Red-Orange
    if (magnitude < 7.0) return '#F44336'; // Red
    return '#9C27B0'; // Purple
  };

  const getMagnitudeIcon = (magnitude) => {
    if (magnitude < 3.0) return 'radio-button-on';
    if (magnitude < 5.0) return 'warning';
    if (magnitude < 6.0) return 'alert';
    return 'nuclear';
  };

  const renderAlertItem = ({ item }) => (
    <TouchableOpacity
      style={styles.alertItem}
      onPress={() => {
        Alert.alert(
          t('history.alertDetails'),
          `${t('live.magnitude')}: ${item.magnitude}\n${t('live.location')}: ${item.location}\n${t('live.time')}: ${item.getFormattedTimestamp()}\n\n${item.description}`,
          [{ text: t('common.ok') }]
        );
      }}
    >
      <View style={styles.alertHeader}>
        <Ionicons
          name={getMagnitudeIcon(item.magnitude)}
          size={24}
          color={getMagnitudeColor(item.magnitude)}
        />
        <Text style={[styles.magnitude, { color: getMagnitudeColor(item.magnitude) }]}>
          {item.magnitude}
        </Text>
        <Text style={styles.timestamp}>
          {item.getFormattedTimestamp()}
        </Text>
      </View>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );



  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="shield-checkmark-outline" size={64} color="#ccc" />
      <Text style={styles.emptyText}>{t('live.noAlerts')}</Text>
    </View>
  );

  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('live.title')}</Text>
        {alerts.length > 0 && (
          <TouchableOpacity onPress={clearAlerts} style={styles.clearButton}>
            <Ionicons name="trash-outline" size={20} color="#FF6B35" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={alerts.length === 0 ? styles.emptyContainer : null}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {}} // Live data, no manual refresh needed
            tintColor="#FF6B35"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  clearButton: {
    padding: 8,
  },
  list: {
    flex: 1,
  },
  alertItem: {
    backgroundColor: '#f9f9f9',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  magnitude: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginLeft: 'auto',
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default LiveAlertsScreen;