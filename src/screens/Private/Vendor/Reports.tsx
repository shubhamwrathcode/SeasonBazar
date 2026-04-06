import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 55) / 2;

const REPORT_TYPES = [
  { id: '1', title: 'Product', icon: ImageAssets.products, colors: ['#F3EEFF', '#BFAEFF'] },
  { id: '2', title: 'Revenue', icon: ImageAssets.revenue, colors: ['#FFFFFF', '#FFDEDE'] },
  { id: '3', title: 'Orders', icon: ImageAssets.orders, colors: ['#FFFFFF', '#FFF1D3'] },
  { id: '4', title: 'Variations', icon: ImageAssets.variation, colors: ['#FFFFFF', '#C8FFBB'] },
  { id: '5', title: 'Categories', icon: ImageAssets.categories, colors: ['#FFFFFF', '#BBFFCC'] },
  { id: '6', title: 'Stock', icon: ImageAssets.stock, colors: ['#FFFFFF', '#FFC0C0'] },
  { id: '7', title: 'Statement', icon: ImageAssets.statment, colors: ['#FFFFFF', '#DABDFD'] },
  { id: '8', title: 'Delivery Time', icon: ImageAssets.calendar, colors: ['#FFFFFF', '#C3EEFF'] },
  { id: '9', title: 'Store Pickup', icon: ImageAssets.shop, colors: ['#FFFFFF', '#FFEBB7'] },
];

const Reports = ({ navigation }: any) => {
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.gridItemContainer} 
      activeOpacity={0.7}
      onPress={() => {
        if (item.title === 'Delivery Time' || item.title === 'Store Pickup') {
          navigation.navigate('DeliveryTime', { title: item.title });
        } else {
          navigation.navigate('ProductReport', { title: item.title });
        }
      }}
    >
      <LinearGradient
        colors={item.colors}
        style={[styles.reportCard, { borderColor: item.colors[1], borderWidth: 1 }]}
      >
        <Image source={item.icon} style={styles.reportIcon} resizeMode="contain" />
      </LinearGradient>
      <AppText font={AppFonts.Regular} size={15} color="#0E2E48" style={styles.reportTitle}>
        {item.title}
      </AppText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title="Reports"
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
            <AppText size={18} font={AppFonts.SemiBold} color="#0E2E48">Reports</AppText>
          </View>

          <FlatList
            data={REPORT_TYPES}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Reports;

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
    marginBottom: 25,
  },
  sparkleIcon: {
    width: 20,
    height: 20,
    tintColor: '#9370DB',
    resizeMode: 'contain',
  },
  gridItemContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    marginBottom: 25,
  },
  reportCard: {
    width: '100%',
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 10,
  },
  reportIcon: {
    width: 60,
    height: 60,
  },
  reportTitle: {
    textAlign: 'center',
  },
});
