import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTipsViewModel } from '../viewmodels/useTipsViewModel';

const SafetyTipsScreen = () => {
  const { t } = useTranslation();
  const {
    safetyTips,
    selectedTip,
    createShowTipCommand,
    createHideTipCommand,
    executeTipCommand
  } = useTipsViewModel();

  const getTipIcon = (tipId) => {
    switch (tipId) {
      case 'drop':
        return 'arrow-down-circle';
      case 'cover':
        return 'shield';
      case 'holdOn':
        return 'hand-left';
      case 'emergencyKit':
        return 'medical';
      default:
        return 'information-circle';
    }
  };

  const getTipColor = (tipId) => {
    switch (tipId) {
      case 'drop':
        return '#FF6B35';
      case 'cover':
        return '#4CAF50';
      case 'holdOn':
        return '#2196F3';
      case 'emergencyKit':
        return '#9C27B0';
      default:
        return '#666';
    }
  };

  const handleTipPress = (tip) => {
    const command = createShowTipCommand(tip);
    executeTipCommand(command);
  };

  const handleCloseTip = () => {
    const command = createHideTipCommand();
    executeTipCommand(command);
  };

  const renderTipItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.tipItem, { borderLeftColor: getTipColor(item.id) }]}
      onPress={() => handleTipPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.tipHeader}>
        <View style={[styles.iconContainer, { backgroundColor: getTipColor(item.id) }]}>
          <Ionicons name={getTipIcon(item.id)} size={24} color="#fff" />
        </View>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{item.title}</Text>
          <Text style={styles.tipPreview} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </View>
    </TouchableOpacity>
  );

  const renderTipDetails = () => {
    if (!selectedTip) return null;

    return (
      <Modal
        visible={!!selectedTip}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseTip}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
          <View style={styles.modalHeader}>
            <View style={styles.modalTitleContainer}>
              <View style={[styles.modalIconContainer, { backgroundColor: getTipColor(selectedTip.id) }]}>
                <Ionicons name={getTipIcon(selectedTip.id)} size={24} color="#fff" />
              </View>
              <Text style={styles.modalTitle}>{selectedTip.title}</Text>
            </View>
            <TouchableOpacity onPress={handleCloseTip} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.descriptionCard}>
              <Text style={styles.descriptionText}>{selectedTip.description}</Text>
            </View>

            {selectedTip.steps && selectedTip.steps.length > 0 && (
              <View style={styles.stepsCard}>
                <Text style={styles.stepsTitle}>{t('tips.stepsToFollow')}</Text>
                {selectedTip.steps.map((step, index) => (
                  <View key={index} style={styles.stepItem}>
                    <View style={[styles.stepNumber, { backgroundColor: getTipColor(selectedTip.id) }]}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.reminderCard}>
              <Ionicons name="warning" size={24} color="#FF6B35" />
              <Text style={styles.reminderText}>
                {t('tips.practiceReminder')}
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('tips.title')}</Text>
      </View>

      <View style={styles.introCard}>
        <Ionicons name="shield-checkmark" size={32} color="#FF6B35" />
        <Text style={styles.introText}>
          {t('tips.introText')}
        </Text>
      </View>

      <FlatList
        data={safetyTips}
        renderItem={renderTipItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {renderTipDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  introCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  introText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    lineHeight: 20,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  tipItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipContent: {
    flex: 1,
    marginLeft: 16,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  tipPreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
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
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  descriptionCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  stepsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  reminderText: {
    flex: 1,
    fontSize: 14,
    color: '#e65100',
    marginLeft: 12,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default SafetyTipsScreen;