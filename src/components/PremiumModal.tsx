import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors } from './colors';
import { AppFonts } from './Appfonts';
import AppText from './AppText';
import { ImageAssets } from './ImageAssets';

const { height } = Dimensions.get('window');

interface PremiumModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  icon: any;
  children: React.ReactNode;
}

const PremiumModal: React.FC<PremiumModalProps> = ({
  isVisible,
  onClose,
  title,
  icon,
  children,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={onClose}
      animationType="none"
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Image source={icon} style={styles.headerIcon} />
              <AppText font={AppFonts.SemiBold} size={18} color="#0E2E48" style={{ flex: 1 }}>
                {title}
              </AppText>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Image
                source={ImageAssets.boldNext}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default PremiumModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  headerIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  closeBtn: {
    padding: 5,
    marginLeft: 10,
  },
  closeIcon: {
    width: 14,
    height: 14,
    tintColor: Colors.primary,
    transform: [{ rotate: '90deg' }],
    resizeMode: 'contain',
  },
  content: {
    width: '100%',
  },
});
