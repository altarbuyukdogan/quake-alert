import { useState, useCallback } from 'react';
import { SafetyTip } from '../models/SafetyTip';
import { useTranslation } from 'react-i18next';

// Command pattern implementation for tip actions
class TipCommand {
  constructor(tip, action) {
    this.tip = tip;
    this.action = action;
  }

  execute() {
    return this.action(this.tip);
  }
}

export const useTipsViewModel = () => {
  const { t } = useTranslation();
  const [selectedTip, setSelectedTip] = useState(null);
  const [tipHistory, setTipHistory] = useState([]);

  // Initialize safety tips with translations
  const getSafetyTips = useCallback(() => {
    return [
      new SafetyTip(
        'drop',
        t('tips.drop.title'),
        t('tips.drop.description'),
        t('tips.drop.steps', { returnObjects: true })
      ),
      new SafetyTip(
        'cover',
        t('tips.cover.title'),
        t('tips.cover.description'),
        t('tips.cover.steps', { returnObjects: true })
      ),
      new SafetyTip(
        'holdOn',
        t('tips.holdOn.title'),
        t('tips.holdOn.description'),
        t('tips.holdOn.steps', { returnObjects: true })
      ),
      new SafetyTip(
        'emergencyKit',
        t('tips.emergencyKit.title'),
        t('tips.emergencyKit.description'),
        t('tips.emergencyKit.steps', { returnObjects: true })
      )
    ];
  }, [t]);

  // Command to show tip details
  const createShowTipCommand = useCallback((tip) => {
    const showTipAction = (tipToShow) => {
      setSelectedTip(tipToShow);
      setTipHistory(prev => {
        const newHistory = [tipToShow, ...prev.filter(t => t.id !== tipToShow.id)];
        return newHistory.slice(0, 10); // Keep only last 10 viewed tips
      });
      return tipToShow;
    };

    return new TipCommand(tip, showTipAction);
  }, []);

  // Command to hide tip details
  const createHideTipCommand = useCallback(() => {
    const hideTipAction = () => {
      setSelectedTip(null);
      return null;
    };

    return new TipCommand(null, hideTipAction);
  }, []);

  // Execute a tip command
  const executeTipCommand = useCallback((command) => {
    return command.execute();
  }, []);

  // Show tip details (convenience method)
  const showTipDetails = useCallback((tip) => {
    const command = createShowTipCommand(tip);
    return executeTipCommand(command);
  }, [createShowTipCommand, executeTipCommand]);

  // Hide tip details (convenience method)
  const hideTipDetails = useCallback(() => {
    const command = createHideTipCommand();
    return executeTipCommand(command);
  }, [createHideTipCommand, executeTipCommand]);

  // Get tip by ID
  const getTipById = useCallback((id) => {
    const tips = getSafetyTips();
    return tips.find(tip => tip.id === id) || null;
  }, [getSafetyTips]);

  // Clear tip history
  const clearTipHistory = useCallback(() => {
    setTipHistory([]);
  }, []);

  // Get recently viewed tips
  const getRecentlyViewedTips = useCallback(() => {
    return tipHistory;
  }, [tipHistory]);

  return {
    safetyTips: getSafetyTips(),
    selectedTip,
    tipHistory,
    createShowTipCommand,
    createHideTipCommand,
    executeTipCommand,
    showTipDetails,
    hideTipDetails,
    getTipById,
    clearTipHistory,
    getRecentlyViewedTips
  };
};