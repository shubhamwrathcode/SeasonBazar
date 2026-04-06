import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const Coupons = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title="Coupons"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.content}>
          <View style={styles.alertCard}>
            <AppText size={13} color="#8C5336" font={AppFonts.Regular}>
              ⚠️ Error! Your account is not enabled for selling, please contact the admin
            </AppText>
          </View>

          <View style={styles.titleRow}>
            <Image source={ImageAssets.star} style={styles.sparkleIcon} />
            <AppText size={18} font={AppFonts.SemiBold} color="#0E2E48">Coupons</AppText>
          </View>

          {/* Toggle Switch */}
          <View style={styles.toggleRow}>
            <TouchableOpacity style={[styles.toggleBtn, styles.activeToggle]}>
              <AppText font={AppFonts.SemiBold} size={14} color={Colors.white}>My Coupons</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleBtn}>
              <AppText font={AppFonts.Medium} size={14} color="#0E2E48">Marketplace Coupons</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.emptyCard}>
            <View style={styles.emptyContent}>
              <Image source={ImageAssets.noCoupon} style={styles.promoImage} />
              <AppText font={AppFonts.SemiBold} size={20} color="#0E2E48" style={styles.emptyTitle}>
                No Coupon Found
              </AppText>
              <AppText font={AppFonts.Regular} size={14} color="#0E2E4899" style={styles.emptySubtitle}>
                You'll see coupon here when available
              </AppText>

              <TouchableOpacity 
                style={styles.primaryBtn}
                onPress={() => navigation.navigate('AddCoupon')}
              >
                <LinearGradient
                  colors={['#6A44E3', '#4A25C7']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.gradient}
                >
                  <AppText font={AppFonts.Bold} size={16} color={Colors.white}>Add New Coupon</AppText>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Coupons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  alertCard: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#FFEEBA',
    marginTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  sparkleIcon: {
    width: 20,
    height: 20,
    tintColor: '#9370DB',
    resizeMode: 'contain',
  },
  toggleRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 12,
    padding: 2,
    marginBottom: 25,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeToggle: {
    backgroundColor: '#531DFE',
    shadowColor: '#531DFE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyCard: {
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 20,
    padding: 30,
    minHeight: 400,
    justifyContent: 'center',
  },
  emptyContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptySubtitle: {
    textAlign: 'center',
    marginBottom: 30,
  },
  primaryBtn: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
