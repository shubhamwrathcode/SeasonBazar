import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const SETTINGS_LIST = [
  { id: '1', title: 'Recent orders', icon: ImageAssets.recentOrder },
  { id: '2', title: 'Shipping and Billing addresses', icon: ImageAssets.location },
  { id: '3', title: 'Password and Security', icon: ImageAssets.security },
];

const DASHBOARD_GRID = [
  { id: '1', title: 'Dashboard', icon: ImageAssets.dashboard, bgColor: '#F2F1FF' },
  { id: '2', title: 'Orders', icon: ImageAssets.orders, bgColor: '#FFF1F1' },
  { id: '3', title: 'Downloads', icon: ImageAssets.downloads, bgColor: '#FFF9ED' },
  { id: '4', title: 'Addresses', icon: ImageAssets.address, bgColor: '#F1FFF1' },
  { id: '5', title: 'Account Details', icon: ImageAssets.accountdetail, bgColor: '#F1FFFF' },
  { id: '6', title: 'Return & Refunds', icon: ImageAssets.return, bgColor: '#FFF1F1' },
  { id: '7', title: 'Seller Support Tickets', icon: ImageAssets.seller, bgColor: '#F2F1FF' },
  { id: '8', title: 'Vendors', icon: ImageAssets.vendors, bgColor: '#FFF1F1' },
];

const ProfileSettings = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const renderSettingItem = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.settingCard}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIconBg}>
          <Image source={item.icon} style={[styles.settingIcon, { tintColor: item?.id === '2' ? Colors.primary : null }]} resizeMode="contain" />
        </View>
        <AppText font={AppFonts.Regular} size={16} color={Colors.black}>{item.title}</AppText>
      </View>
      <Image source={ImageAssets.arrowright} style={styles.chevron} />
    </TouchableOpacity>
  );

  const renderGridItem = (item: any) => (
    <TouchableOpacity key={item.id} style={[styles.gridCard, { backgroundColor: item.bgColor }]}>
      <Image source={item.icon} style={styles.gridIcon} resizeMode="contain" />
      <AppText font={AppFonts.Regular} size={13} color={Colors.black} textAlign="center" style={styles.gridLabel}>
        {item.title}
      </AppText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Image source={ImageAssets.backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <AppText font={AppFonts.Medium} size={22} color={Colors.black} style={styles.headerTitle}>
          Profile Settings
        </AppText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/300' }}
              style={styles.avatar}
            />
            <View style={styles.cameraBadge}>
              <Image source={ImageAssets.camera} style={styles.cameraIcon} />
            </View>
          </View>
          <View style={styles.profileMeta}>
            <AppText font={AppFonts.SemiBold} size={18} color={Colors.black}>Vinayak sharma</AppText>
            <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>Vinusharma@Gmail.Com</AppText>
          </View>
        </View>

        {/* Section 1 */}
        <AppText font={AppFonts.Medium} size={18} color={Colors.black} style={styles.sectionTitle}>
          Product highlights
        </AppText>
        <View style={styles.settingsWrapper}>
          {SETTINGS_LIST.map(renderSettingItem)}
        </View>

        {/* Vendor Button */}
        <TouchableOpacity style={styles.vendorBtnWrapper}>
          <LinearGradient
            colors={['#7E57FF', '#522ED1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.vendorBtn}
          >
            <AppText font={AppFonts.Medium} size={16} color={Colors.white}>Open Vendor Dashboard</AppText>
          </LinearGradient>
        </TouchableOpacity>

        {/* Section 2 */}
        <AppText font={AppFonts.Medium} size={18} color={Colors.black} style={styles.sectionTitle}>
          Product highlights
        </AppText>
        <View style={styles.gridWrapper}>
          {DASHBOARD_GRID.map(renderGridItem)}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn}>
          <View style={styles.logoutIconBg}>
            <Image source={ImageAssets.logout} style={styles.logoutIcon} />
          </View>
          <AppText font={AppFonts.Medium} size={18} color={Colors.white}>LOG OUT</AppText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    paddingBottom: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 35,
    height: 35,
    tintColor: Colors.primary,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // Balance backBtn
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 0.7,
    borderColor: Colors.black30,
    marginBottom: 25,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: Colors.white,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#eee',
    elevation: 2,
  },
  cameraIcon: {
    width: 12,
    height: 12,
    tintColor: Colors.primary,
  },
  profileMeta: {
    marginLeft: 15,
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  settingsWrapper: {
    marginBottom: 20,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#F3EEFFCC',
    borderRadius: 12,
    marginBottom: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIconBg: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingIcon: {
    width: 20,
    height: 20,
  },
  chevron: {
    width: 12,
    height: 12,
    tintColor: Colors.textGrey,
    resizeMode: "contain"
  },
  vendorBtnWrapper: {
    marginBottom: 25,
    marginTop: 10,
  },
  vendorBtn: {
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 30,
  },
  gridCard: {
    width: (width - 55) / 2,
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  gridIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  gridLabel: {
    lineHeight: 18,
  },
  logoutBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 15,
    gap: 15,
    width: '60%',
    alignSelf: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutIconBg: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.primary,
  },
});
