import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

const DASHBOARD_ITEMS = [
  { id: '1', title: 'Dashboard', icon: ImageAssets.dashboard, colors: ['#FFFFFF', '#BFAEFF'] },
  { id: '2', title: 'Announcements', icon: ImageAssets.announcemnt, colors: ['#FFFFFF', '#FFCBCE'] },
  { id: '3', title: 'Products', icon: ImageAssets.products, colors: ['#FFFFFF', '#FFF1D3'] },
  { id: '4', title: 'Orders', icon: ImageAssets.orders, colors: ['#FFFFFF', '#C8FFBB'] },
  { id: '5', title: 'Support', icon: ImageAssets.headphoneSupport, colors: ['#FFFFFF', '#CEDEEE'] },
  { id: '6', title: 'Coupons', icon: ImageAssets.coupons, colors: ['#FFFFFF', '#BBFFCC'] },
  { id: '7', title: 'Reports', icon: ImageAssets.report, colors: ['#FFFFFF', '#FFC0C0'] },
  { id: '8', title: 'Delivery Time', icon: ImageAssets.delivery, colors: ['#FFFFFF', '#DABDFD'] },
  { id: '9', title: 'Withdraw', icon: ImageAssets.withdraw, colors: ['#FFFFFF', '#04C69A'] },
  { id: '10', title: 'Subscription', icon: ImageAssets.subscription, colors: ['#FFFFFF', '#FEE74B'] },
  { id: '11', title: 'Followers', icon: ImageAssets.follower, colors: ['#FFFFFF', '#C6B7F9'] },
  { id: '12', title: 'Tools', icon: ImageAssets.tools, colors: ['#FFFFFF', '#A3D4FF'] },
  { id: '13', title: 'Setting', icon: ImageAssets.setting, colors: ['#FFFFFF', '#8FBFFA'] },
];

const VendorHome = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const renderCard = ({ item }: { item: any }) => {
    const handlePress = () => {
      switch (item.title) {
        case 'Dashboard':
          navigation.navigate('VendorDashboard');
          break;
        case 'Announcements':
          navigation.navigate('Announcements');
          break;
        case 'Products':
          navigation.navigate('Products');
          break;
        case 'Orders':
          navigation.navigate('Orders');
          break;
        case 'Support':
          navigation.navigate('Support');
          break;
        case 'Coupons':
          navigation.navigate('Coupons');
          break;
        case 'Reports':
          navigation.navigate('Reports');
          break;
        case 'Delivery Time':
          navigation.navigate('DeliveryTime');
          break;
        case 'Withdraw':
          navigation.navigate('Withdraw');
          break;
        case 'Subscription':
          navigation.navigate('SubscribePlan', { fromHome: true });
          break;
        case 'Followers':
          navigation.navigate('Followers');
          break;
        case 'Setting':
          navigation.navigate('Settings');
          break;
        case 'Tools':
          Alert.alert('Coming soon', 'This feature will be available soon.');
          break;
        default:
          break;
      }
    };

    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        activeOpacity={0.9}
        onPress={handlePress}
      >
        <LinearGradient
          colors={item.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, { borderWidth: 0.7, borderColor: item.colors[1], borderRadius: 20 }]}
        >
          <Image source={item.icon} style={styles.cardIcon} resizeMode="contain" />
        </LinearGradient>
        <AppText font={AppFonts.Medium} size={14} color="#0E2E48" textAlign="center" style={styles.cardLabel}>
          {item.title}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Top Header (Sticky) */}
      <View style={[styles.headerContainer, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerSection}>
          <View style={styles.headerTop}>
            <View>
              <View style={styles.locationRow}>
                <Image source={ImageAssets.location} style={styles.locIcon} />
                <AppText font={AppFonts.SemiBold} size={20} color={Colors.white}>Home</AppText>
                <Image source={ImageAssets.arrowright} style={styles.downIcon} />
              </View>
              <AppText font={AppFonts.Regular} size={14} color="rgba(255, 255, 255, 0.8)">
                123, Green Park Apartments
              </AppText>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerBtn}>
                <Image source={ImageAssets.notification1} style={styles.headerIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileBtn}>
                <Image source={{ uri: 'https://i.pravatar.cc/300' }} style={styles.profileImg} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Image source={ImageAssets.search} style={styles.searchIcon} />
            <TextInput
              placeholder="Find a Location"
              placeholderTextColor={Colors.black30}
              style={styles.searchInput}
            />
            <Image source={ImageAssets.mic} style={styles.micIcon} />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
      >
        {/* Content Section */}
        <View style={styles.content}>
          {/* Alert Card */}
          <View style={styles.alertCard}>
            <AppText size={13} color="#8C5336" font={AppFonts.Regular}>
              ⚠️ Error! Your account is not enabled for selling, please contact the admin
            </AppText>
          </View>

          {/* Profile Complete Card */}
          <View style={styles.progressCard}>
            <AppText font={AppFonts.SemiBold} size={15} color="#0E2E48">45% Profile Complete</AppText>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: '45%' }]} />
            </View>
            <AppText size={13} color="#0E2E4899" font={AppFonts.Regular} style={styles.progressHint}>
              Add Profile Picture to gain 15% progress
            </AppText>
          </View>

          {/* Grid Section */}
          <View style={styles.sectionHeader}>
            <View style={styles.sparkleRow}>
              <Image source={ImageAssets.star} style={{
                width: 20, height: 20, resizeMode: "contain",
                tintColor: '#9370DB'
              }} />
              <AppText size={18} font={AppFonts.Medium} color="#0E2E48">Product highlights</AppText>
            </View>
          </View>

          <FlatList
            data={DASHBOARD_ITEMS}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContainer}
          />
        </View>
      </ScrollView>

    </View>
  );
};

export default VendorHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerContainer: {
    backgroundColor: Colors.primary,
    zIndex: 10,
    paddingBottom: 25,
  },
  headerSection: {
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
    resizeMode: "contain"
  },
  downIcon: {
    width: 14,
    height: 14,
    tintColor: '#8C8C8C',
    transform: [{ rotate: '90deg' }],
    resizeMode: "contain"
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: 30,
    height: 30,
    tintColor: Colors.white,
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4141',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.white,
    overflow: 'hidden',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  searchBar: {
    height: 52,
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.black30,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: AppFonts.Regular,
    fontSize: 16,
    color: Colors.black,
  },
  micIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  alertCard: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFEEBA',
  },
  progressCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  progressBg: {
    height: 8,
    backgroundColor: '#F0F8FF',
    borderRadius: 4,
    marginTop: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#37CFFF',
    borderRadius: 4,
  },
  progressHint: {
    opacity: 0.8,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sparkleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginBottom: 20,
    marginRight: 20,
  },
  card: {
    height: CARD_WIDTH * 0.75,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  cardIcon: {
    width: '55%',
    height: '55%',
    resizeMode: "contain"
  },
  cardLabel: {
    marginTop: 10,
  },
});
