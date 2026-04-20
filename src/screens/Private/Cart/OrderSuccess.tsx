import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from '../../../components/AppText';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import { ImageAssets } from '../../../components/ImageAssets';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const OrderSuccess = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { orderId } = route.params || { orderId: 'N/A' };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <View style={styles.successCircle}>
          <LinearGradient
            colors={[Colors.primary, '#9B51E0']}
            style={styles.gradientCircle}
          >
            <AppText font={AppFonts.Bold} size={50} color={Colors.white}>✓</AppText>
          </LinearGradient>
        </View>

        <AppText font={AppFonts.Bold} size={28} color={Colors.black} style={styles.title}>
          Order Placed!
        </AppText>

        <AppText font={AppFonts.Regular} size={16} color={Colors.textGrey} style={styles.subtitle}>
          Your order #{orderId} has been successfully placed.
        </AppText>

        <View style={styles.infoCard}>
          <Image source={ImageAssets.delivery} style={styles.icon} />
          <View style={styles.infoTextWrapper}>
            <AppText font={AppFonts.SemiBold} size={15} color={Colors.black}>
              Expected Delivery
            </AppText>
            <AppText font={AppFonts.Regular} size={13} color={Colors.textGrey}>
              Within 3-5 business days
            </AppText>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.trackBtn}
            onPress={() => navigation.navigate('MyOrders')}
          >
            <AppText font={AppFonts.Bold} size={16} color={Colors.white}>Track Your Order</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => navigation.navigate('Main')}
          >
            <AppText font={AppFonts.Bold} size={16} color={Colors.primary}>Continue Shopping</AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confetti Mock / Decoration */}
      <View style={[styles.decoration, { top: 100, left: 30, backgroundColor: '#FFD700' }]} />
      <View style={[styles.decoration, { top: 150, right: 40, backgroundColor: Colors.primary }]} />
      <View style={[styles.decoration, { bottom: 200, left: 50, backgroundColor: '#9B51E0' }]} />
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    alignItems: 'center',
    padding: 20,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary + '11',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  gradientCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    padding: 20,
    borderRadius: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 50,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  infoTextWrapper: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  trackBtn: {
    height: 55,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    elevation: 3,
  },
  continueBtn: {
    height: 55,
    backgroundColor: Colors.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  decoration: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.6,
  }
});
