import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import AuthHeader from '../../../components/AuthHeader';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

interface PaymentOption {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'upi',
    title: 'UPI',
    subtitle: 'pay via upi apps like gpay, phonepe, paytm etc.',
    icon: ImageAssets.upi,
  },
  {
    id: 'wallet',
    title: 'Wallet / EMI',
    subtitle: 'visa, mastercard, ruppay, etc.',
    icon: ImageAssets.wallet,
  },
  {
    id: 'netbanking',
    title: 'Netbanking',
    subtitle: 'pay directly from your bank account',
    icon: ImageAssets.banking,
  },
  {
    id: 'paylater',
    title: 'Pay later',
    subtitle: 'pay directly from your bank account',
    icon: ImageAssets.paylater,
  },
];

const PaymentMethod = ({ navigation }: any) => {
  const [selectedId, setSelectedId] = useState('upi');

  const renderPaymentOption = (option: PaymentOption) => {
    const isSelected = selectedId === option.id;
    return (
      <TouchableOpacity
        key={option.id}
        style={[styles.optionCard, isSelected && styles.selectedCard]}
        onPress={() => setSelectedId(option.id)}
        activeOpacity={0.7}
      >
        <Image source={option.icon} style={styles.optionIcon} resizeMode="contain" />
        <View style={styles.optionInfo}>
          <AppText font={AppFonts.Medium} size={16} color={Colors.black}>
            {option.title}
          </AppText>
          <AppText font={AppFonts.Regular} size={13} color={Colors.black30}>
            {option.subtitle}
          </AppText>
        </View>
        <View style={[styles.radioCircle, isSelected && styles.radioSelected]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <AuthHeader
        title="Checkout"
        subtitle="Almost There! Checkout Now"
        onBackPress={() => navigation.goBack()}
        paddingStyle={{ paddingBottom: 20 }}
      />

      <ScrollView
        style={styles.contentScroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Selected Plan Summary */}
        <LinearGradient
          colors={['#531DFE', '#8E6FF1', '#B198FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summaryCard}
        >
          <View style={styles.summaryHeader}>
            <AppText font={AppFonts.Medium} size={18} color={Colors.white}>Premium Pack</AppText>
            <AppText font={AppFonts.SemiBold} size={18} color={Colors.white}>Rs.499</AppText>
          </View>
          <AppText font={AppFonts.Regular} size={14} color="rgba(255, 255, 255, 0.8)">
            Renews automatically on 24 Apr 2027
          </AppText>
        </LinearGradient>

        <AppText font={AppFonts.Regular} size={18} color={Colors.black} style={styles.sectionTitle}>
          Payment Method
        </AppText>

        <View style={styles.optionsList}>
          {PAYMENT_OPTIONS.map(renderPaymentOption)}
        </View>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('VendorMain')}
        >
          <LinearGradient
            colors={['#541cfe', '#7346fe', '#8b67fe']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.btnGradient}
          >
            <AppText font={AppFonts.SemiBold} size={18} color={Colors.white}>Next</AppText>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentScroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  summaryCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  optionsList: {
    gap: 15,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 10,
  },
  selectedCard: {
    borderColor: Colors.primary,
    backgroundColor: '#F9F8FF',
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  optionInfo: {
    flex: 1,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  nextBtn: {
    marginTop: 40,
    borderRadius: 15,
    overflow: 'hidden',
  },
  btnGradient: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
