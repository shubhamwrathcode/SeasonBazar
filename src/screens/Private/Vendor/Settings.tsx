import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const GRID_ITEM_WIDTH = (width - 60) / 2;

const SETTINGS_ITEMS = [
  { id: '1', title: 'Visit Store', icon: ImageAssets.visit, colors: ['#F3F4EE', '#BFAEFF'] },
  { id: '2', title: 'Payment Methods', icon: ImageAssets.money, colors: ['#FFF3EF', '#FFCBCE'] },
  { id: '3', title: 'Verification', icon: ImageAssets.verification, colors: ['#FFFBF0', '#FFF1D3'] },
  { id: '4', title: 'Shipping', icon: ImageAssets.transport, colors: ['#F4FFF3', '#C8FFBB'] },
  { id: '5', title: 'Social Profiles', icon: ImageAssets.social, colors: ['#F3FBFF', '#CEDEEE'] },
  { id: '6', title: 'RAW', icon: ImageAssets.raw, colors: ['#FFF2F2', '#FFC0C0'] },
];

const Settings = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title="Settings"
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
            Setting
          </AppText>
        </View>

        {/* Settings Grid */}
        <View style={styles.gridContainer}>
          {SETTINGS_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItemWrapper}
              onPress={() => {
                if (item.title === 'Payment Methods') {
                  navigation.navigate('VendorPaymentMethod');
                } else if (item.title === 'Visit Store') {
                  navigation.navigate('VisitStore');
                } else if (item.title === 'Verification') {
                  navigation.navigate('VendorVerification');
                } else if (item.title === 'Social Profiles') {
                  navigation.navigate('VendorSocialProfiles');
                } else if (item.title === 'RAW') {
                  navigation.navigate('VendorRAW');
                }
              }}
            >
              <LinearGradient
                colors={item.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.gridItem, { borderColor: item.colors[1] }]}
              >
                <Image source={item.icon} style={styles.gridIcon} resizeMode="contain" />
              </LinearGradient>
              <AppText font={AppFonts.Medium} size={15} color="#0E2E48" textAlign="center" style={styles.gridLabel}>
                {item.title}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

    </View>
  );
};

export default Settings;

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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItemWrapper: {
    width: GRID_ITEM_WIDTH,
    marginBottom: 20,
    alignItems: 'center',
  },
  gridItem: {
    width: '100%',
    height: GRID_ITEM_WIDTH * 0.75,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  gridIcon: {
    width: '50%',
    height: '50%',
  },
  gridLabel: {
    marginTop: 10,
  },
});
