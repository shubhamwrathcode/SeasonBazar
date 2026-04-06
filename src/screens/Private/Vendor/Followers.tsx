import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';

const Followers = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title="Follower"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Error Alert */}
        <View style={styles.alertCard}>
          <AppText size={13} color="#8C5336" font={AppFonts.Regular}>
            ⚠️ Error! Your account is not enabled for selling, please contact the admin
          </AppText>
        </View>

        <View style={styles.titleRow}>
          <Image source={ImageAssets.star} style={styles.sparkleIcon} />
          <AppText size={20} font={AppFonts.SemiBold} color="#0E2E48">
            Store Followers
          </AppText>
        </View>

        {/* Empty State Card */}
        <View style={styles.followersCard}>
          <View style={styles.tableHeader}>
            <AppText size={14} font={AppFonts.Medium} color="#0E2E48">Name</AppText>
            <AppText size={14} font={AppFonts.Medium} color="#0E2E48">Name</AppText>
          </View>
          <View style={styles.emptyContent}>
            <Image 
              source={ImageAssets.netSales} // Using as placeholder or search icon
              style={styles.emptyIcon} 
              resizeMode="contain" 
            />
            <Image 
              source={ImageAssets.noCoupon} 
              style={styles.mainEmptyImg} 
              resizeMode="contain" 
            />
            <AppText font={AppFonts.SemiBold} size={18} color="#0E2E48" style={styles.emptyTitle}>
                No Followers Found
            </AppText>
            <AppText font={AppFonts.Regular} size={13} color="#0E2E4899">
                You'll see followers here when available
            </AppText>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <AppText font={AppFonts.SemiBold} size={16} color={Colors.white}>Back</AppText>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default Followers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  alertCard: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#FFEEBA',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  sparkleIcon: {
    width: 22,
    height: 22,
    tintColor: Colors.primary,
    resizeMode: 'contain',
  },
  followersCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0EAFC',
    paddingVertical: 12,
    paddingHorizontal: 50,
  },
  emptyContent: {
    paddingVertical: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    width: 120,
    height: 100,
    marginBottom: 20,
    opacity: 0.1,
    position: 'absolute',
    top: 50,
  },
  mainEmptyImg: {
     width: 100,
     height: 100,
     marginBottom: 15,
  },
  emptyTitle: {
    marginBottom: 5,
  },
  backBtn: {
    backgroundColor: '#531DFE',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
