import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';

const WithdrawHistory = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title="Payment History"
        onBackPress={() => navigation.goBack()}
        showSearch={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.emptyContainer}>
          <Image source={ImageAssets.noCoupon} style={styles.emptyIcon} resizeMode="contain" />
          <AppText font={AppFonts.SemiBold} size={20} color="#0E2E48" style={styles.emptyTitle}>
            No History Found
          </AppText>
          <AppText font={AppFonts.Regular} size={14} color="#0E2E4899" textAlign="center">
            You don't have any withdrawal history yet.
          </AppText>
        </View>
      </ScrollView>
    </View>
  );
};

export default WithdrawHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  emptyIcon: {
    width: 150,
    height: 150,
    marginBottom: 20,
    opacity: 0.6,
  },
  emptyTitle: {
    marginBottom: 10,
  },
});
