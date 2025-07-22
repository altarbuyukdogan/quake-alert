import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  RefreshControl
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useHistoryViewModel } from '../viewmodels/useHistoryViewModel';

const HistoryScreen = () => {
  const { t } = useTranslation();
  const {
    alerts,
    isLoading,
    refreshing,
    selectedAlert,
    refreshAlerts,
    selectAlert,
    clearSelectedAlert,
    clearAllAlerts
  } = useHistoryViewModel();

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

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInHours = Math.floor((now - alertTime) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return alertTime.toLocaleDateString();
    }
  };

  const renderAlertItem = ({ item }) => (
    <TouchableOpacity
      style={styles.alertItem}
      onPress={() => selectAlert(item)}
    >
      <View style={styles.alertHeader}>
        <Ionicons
          name={getMagnitudeIcon(item.magnitude)}
          size={20}
          color={getMagnitudeColor(item.magnitude)}
        />
        <Text style={[styles.magnitude, { color: getMagnitudeColor(item.magnitude) }]}>
          {item.magnitude}
        </Text>
        <Text style={styles.relativeTime}>
          {formatRelativeTime(item.timestamp)}
        </Text>
        <Ionicons name="chevron-forward" size={16} color="#ccc" />
      </View>
      <Text style={styles.location} numberOfLines={1}>
        {item.location}
      </Text>
      <Text style={styles.timestamp}>
        {item.getFormattedTimestamp()}
      </Text>
    </TouchableOpacity>
  );

  const renderAlertDetails = () => {
    if (!selectedAlert) return null;

    return (
      <Modal
        visible={!!selectedAlert}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={clearSelectedAlert}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{t('history.alertDetails')}</Text>
            <TouchableOpacity onPress={clearSelectedAlert} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.detailCard}>
              <View style={styles.detailHeader}>
                <Ionicons
                  name={getMagnitudeIcon(selectedAlert.magnitude)}
                  size={32}
                  color={getMagnitudeColor(selectedAlert.magnitude)}
                />
                <Text style={[styles.detailMagnitude, { color: getMagnitudeColor(selectedAlert.magnitude) }]}>
                  {selectedAlert.magnitude}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="location" size={20} color="#666" />
                <Text style={styles.detailLabel}>{t('history.location')}:</Text>
                <Text style={styles.detailValue}>{selectedAlert.location}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="time" size={20} color="#666" />
                <Text style={styles.detailLabel}>{t('history.time')}:</Text>
                <Text style={styles.detailValue}>{selectedAlert.getFormattedTimestamp()}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="pulse" size={20} color="#666" />
                <Text style={styles.detailLabel}>Level:</Text>
                <Text style={[styles.detailValue, { color: getMagnitudeColor(selectedAlert.magnitude) }]}>
                  {selectedAlert.getMagnitudeLevel().toUpperCase()}
                </Text>
              </View>

              {selectedAlert.description && (
                <View style={styles.descriptionSection}>
                  <Text style={styles.descriptionLabel}>{t('history.details')}:</Text>
                  <Text style={styles.descriptionText}>{selectedAlert.description}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="time-outline" size={64} color="#ccc" />
      <Text style={styles.emptyText}>{t('history.emptyMessage')}</Text>
    </View>
  );

  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('history.title')}</Text>
        {alerts.length > 0 && (
          <TouchableOpacity onPress={clearAllAlerts} style={styles.clearButton}>
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
            refreshing={refreshing}
            onRefresh={refreshAlerts}
            tintColor="#FF6B35"
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {renderAlertDetails()}
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
    marginVertical: 4,
    padding: 16,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  magnitude: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  relativeTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 'auto',
    marginRight: 4,
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  detailCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  detailMagnitude: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
    minWidth: 80,
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
    flex: 1,
    marginLeft: 8,
  },
  descriptionSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HistoryScreen;