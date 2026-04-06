import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';

const Withdraw = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header with Search */}
      <VendorHeader
        title="Withdraw"
        onBackPress={() => navigation.goBack()}
        showSearch={true}
        searchPlaceholder="Find a Product"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Error Alert Info Box */}
        <View style={styles.alertCard}>
          <AppText size={13} color="#8C5336" font={AppFonts.Regular} style={styles.alertText}>
            ⚠️ Error! Your account is not enabled for selling, please contact the admin
          </AppText>
        </View>

        {/* Section Heading with Icon */}
        <View style={styles.titleRow}>
          <Image source={ImageAssets.star} style={styles.sparkleIcon} />
          <AppText size={20} font={AppFonts.SemiBold} color="#0E2E48">
            Withdraw
          </AppText>
        </View>

        {/* 1. Balance Section Card */}
        <View style={styles.card}>
          <AppText font={AppFonts.Medium} size={16} color="#0E2E48" style={styles.cardHeaderTitle}>Balance</AppText>
          <View style={styles.dataRow}>
            <Image source={ImageAssets.balance} style={styles.mainIcon} />
            <AppText font={AppFonts.SemiBold} size={30} color="#531DFE"> ₹.1,34,500</AppText>
          </View>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.8}
            onPress={() => { }}
          >
            <AppText font={AppFonts.SemiBold} size={15} color={Colors.white}>Request Withdraw</AppText>
          </TouchableOpacity>
          <AppText font={AppFonts.Regular} size={13} color="#0E2E4899" textAlign="center" style={styles.smallFooter}>
            Minimum Withdraw Amount: ₹50,000.00
          </AppText>
        </View>

        {/* 2. Payment Details Section Card */}
        <View style={styles.card}>
          <AppText font={AppFonts.Medium} size={16} color="#0E2E48" style={styles.cardHeaderTitle}>Payment Details</AppText>
          <AppText font={AppFonts.Regular} size={13} color="#0E2E4899" style={{ marginBottom: 4 }}>Last Payment</AppText>
          <AppText font={AppFonts.Regular} size={13} color="#0E2E4899" style={styles.infoText}>
            You Do Not Have Any Approved Withdraw Yet.
          </AppText>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('WithdrawHistory')}
          >
            <AppText font={AppFonts.SemiBold} size={15} color={Colors.white}>View Payment</AppText>
          </TouchableOpacity>
        </View>

        {/* 3. Payment Method Section Card */}
        <View style={styles.card}>
          <AppText font={AppFonts.Medium} size={16} color="#0E2E48" style={styles.cardHeaderTitle}>Payment Methods</AppText>
          <View style={styles.methodContent}>
            <View style={styles.methodIconWrapper}>
              <Image source={ImageAssets.bankTransfer} style={styles.methodIcon} />
            </View>
            <AppText font={AppFonts.Regular} size={13} color="#0E2E4899" style={{ flex: 1 }}>
              Bank TransferNo Information Found.
            </AppText>
          </View>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PaymentMethod')}
          >
            <AppText font={AppFonts.SemiBold} size={15} color={Colors.white}>Setup</AppText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  alertCard: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFEEBA',
  },
  alertText: {
    lineHeight: 18,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  sparkleIcon: {
    width: 22,
    height: 22,
    tintColor: Colors.primary,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 15,
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardHeaderTitle: {
    marginBottom: 10,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  mainIcon: {
    width: 35,
    height: 25,
    resizeMode: 'contain',
  },
  actionBtn: {
    height: 48,
    backgroundColor: '#531DFE',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  smallFooter: {
    marginTop: 8,
    textAlign: 'left'
  },
  infoText: {
    marginBottom: 10,
    lineHeight: 18,
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  methodIconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E6FFF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
});
