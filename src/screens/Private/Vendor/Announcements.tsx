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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const Announcements = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title="Announcements"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.content}>
          {/* Error Alert */}
          <View style={styles.alertCard}>
            <AppText size={13} color="#8C5336" font={AppFonts.Regular}>
              ⚠️ Error! Your account is not enabled for selling, please contact the admin
            </AppText>
          </View>

          {/* Title Row */}
          <View style={styles.titleRow}>
            <Image source={ImageAssets.star} style={styles.sparkleIcon} />
            <AppText size={18} font={AppFonts.SemiBold} color="#0E2E48">Announcements</AppText>
          </View>

          {/* Empty State Card */}
          <View style={styles.emptyCard}>
            <View style={styles.cardHeader}>
              <View style={styles.innerSearch}>
                <Image source={ImageAssets.search} style={styles.searchIcon} />
                <AppText size={14} color="#0E2E484D">Find a Announcements</AppText>
              </View>
              <TouchableOpacity style={styles.settingsBtn}>
                <Image source={ImageAssets.setting1} style={styles.settingsIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.emptyContent}>
              <Image source={ImageAssets.nonotification} style={styles.bellImage} />
              <AppText font={AppFonts.SemiBold} size={20} color="#0E2E48" style={styles.emptyTitle}>
                No Announcement Found
              </AppText>
              <AppText font={AppFonts.Regular} size={14} color="#0E2E4899" style={styles.emptySubtitle}>
                You'll see announcements here when available
              </AppText>

              <TouchableOpacity style={styles.exploreBtn}>
                 <LinearGradient
                  colors={['#6A44E3', '#4A25C7']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.gradient}
                >
                  <AppText font={AppFonts.Bold} size={16} color={Colors.white}>Explore Shop</AppText>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Announcements;

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
    marginBottom: 15,
  },
  sparkleIcon: {
    width: 20,
    height: 20,
    tintColor: '#9370DB',
    resizeMode: 'contain',
  },
  emptyCard: {
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 20,
    padding: 20,
    minHeight: 400,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  innerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#531DFE',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
    marginRight: 10,
    gap: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#0E2E484D',
  },
  settingsBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#531DFE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 20,
    height: 20,
  },
  emptyContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellImage: {
    width: 180,
    height: 180,
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
  exploreBtn: {
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
