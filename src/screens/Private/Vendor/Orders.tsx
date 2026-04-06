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

const CATEGORIES = [
  'All (0)', 'Processing (0)', 'On hold (0)', 'Pending payment (0)', 'Completed (0)', 'Cancelled (0)', 'Refunded (0)', 'Failed (0)'
];

const Orders = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title="Order"
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
            <AppText size={18} font={AppFonts.SemiBold} color="#0E2E48">Orders</AppText>
          </View>

          {/* Filter Pills */}
          <View style={styles.filtersContainer}>
            {CATEGORIES.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.pill, index === 0 && styles.activePill]}
              >
                <AppText
                  size={14}
                  color={index === 0 ? Colors.white : '#0E2E48'}
                  font={index === 0 ? AppFonts.Bold : AppFonts.Regular}
                >
                  {cat}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.emptyCard}>
            <View style={styles.cardHeader}>
              <View style={styles.innerSearch}>
                <Image source={ImageAssets.search} style={styles.searchIcon} />
                <AppText size={14} color="#0E2E484D" style={{ flex: 1 }}>Search your order</AppText>
                <Image source={ImageAssets.filter} style={[styles.sparkleIcon, { tintColor: '#531DFE' }]} />
              </View>
              <TouchableOpacity style={styles.exportBtn}>
                <Image source={ImageAssets.logout} style={styles.exportIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.emptyContent}>
              <Image source={ImageAssets.noProduct} style={styles.boxImage} />
              <AppText font={AppFonts.SemiBold} size={20} color="#0E2E48" style={styles.emptyTitle}>
                No Order Found
              </AppText>
              <AppText font={AppFonts.Regular} size={14} color="#0E2E4899" style={styles.emptySubtitle}>
                You'll see order here when available
              </AppText>

              <TouchableOpacity style={styles.primaryBtn}>
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

export default Orders;

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
    resizeMode: 'contain',
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 25,
  },
  pill: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8EAED',
  },
  activePill: {
    backgroundColor: '#531DFE',
    borderColor: '#531DFE',
  },
  emptyCard: {
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 20,
    padding: 20,
    minHeight: 450,
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
    borderColor: '#0E2E481A',
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
  exportBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#531DFE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exportIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
    resizeMode: "contain"
  },
  emptyContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptySubtitle: {
    textAlign: 'center',
    marginBottom: 10,
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
