import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import AppHeader from '../../../components/AppHeader';

const { width } = Dimensions.get('window');

const MENU_ITEMS = [
  { id: '1', title: 'My Account', sub: 'Update Personal Information', icon: ImageAssets.profileBottom },
  { id: '2', title: 'Wishlist', sub: 'Manage your listing', icon: ImageAssets.wishlist1 },
  { id: '3', title: 'Compare', sub: 'Manage your Compare', icon: ImageAssets.compare },
  { id: '4', title: 'Track your Order', sub: 'Manage your Compare', icon: ImageAssets.trackorder },
  { id: '5', title: 'Help Center', sub: 'Manage your Help Center', icon: ImageAssets.helpcenter },
];

const MyProfile = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const renderMenuItem = (item: any) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.menuCard}
      onPress={() => {
        if (item.id === '1') navigation.navigate('ProfileSettings');
        if (item.id === '2') navigation.navigate('Wishlist');
        if (item.id === '3') navigation.navigate('Compare');
        if (item.id === '4') navigation.navigate('MyCart');
        if (item.id === '5') navigation.navigate('HelpSupport');
      }}
    >
      <View style={styles.menuLeft}>
        <View style={styles.menuIconBg}>
          <Image source={item.icon} style={styles.menuIcon} resizeMode="contain" />
        </View>
        <View style={styles.menuText}>
          <AppText font={AppFonts.Medium} size={16} color={Colors.black}>{item.title}</AppText>
          <AppText font={AppFonts.Regular} size={12} color={Colors.textGrey}>{item.sub}</AppText>
        </View>
      </View>
      <Image source={ImageAssets.arrowright} style={styles.chevron} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header & Profile Section */}
      <View style={styles.topSection}>
        <AppHeader title="My Profile" onBack={() => navigation.goBack()} />

        <View style={styles.profileInfo}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/300' }}
              style={styles.avatar}
            />
            <View style={styles.cameraBadge}>
              <Image source={ImageAssets.camera} style={styles.cameraIcon} />
            </View>
          </View>

          <View style={styles.details}>
            <AppText font={AppFonts.Medium} size={22} color={Colors.white}>Vinayak sharma</AppText>
            <AppText font={AppFonts.Regular} size={14} color="rgba(255,255,255,0.8)">vinusharma@gmail.com</AppText>
            <AppText font={AppFonts.Regular} size={14} color="rgba(255,255,255,0.8)">+91 0987654321</AppText>
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Image source={ImageAssets.edit} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.menuWrapper}>
          {MENU_ITEMS.map(renderMenuItem)}
        </View>

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

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  topSection: {
    backgroundColor: Colors.primary,
    paddingBottom: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    position: 'relative',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  cameraIcon: {
    width: 14,
    height: 14,
    tintColor: Colors.primary,
  },
  details: {
    marginLeft: 20,
    flex: 1,
  },
  editBtn: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 40,
  },
  menuWrapper: {
    marginVertical: 5,
  },
  menuCard: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  menuIconBg: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#F1F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 22,
    height: 22,
    tintColor: '#2E4475',
  },
  menuText: {
    gap: 2,
  },
  chevron: {
    width: 14,
    height: 14,
    tintColor: Colors.textGrey,
    resizeMode: "contain"
  },
  logoutBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 15,
    // marginTop: 20,
    gap: 15,
    width: '50%',
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
    resizeMode: "contain"
  },
});
