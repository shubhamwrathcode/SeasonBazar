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

const Support = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title="Support"
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
            <AppText size={18} font={AppFonts.SemiBold} color={Colors.primary}>Support Tickets</AppText>
          </View>

          {/* Search Customer Row */}
          <View style={styles.searchRow}>
            <TouchableOpacity style={styles.dropdown}>
              <AppText size={15} color="#0E2E48">Search Customer</AppText>
              <Image source={ImageAssets.arrowright} style={styles.dropdownIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.calendarBtn}>
              <Image source={ImageAssets.calendar} style={styles.calendarIcon} />
            </TouchableOpacity>
          </View>

          {/* Ticket ID Row */}
          <View style={[styles.dropdown, { marginBottom: 20 }]}>
            <AppText size={15} color="#0E2E48">Ticket ID or Keyword</AppText>
            <Image source={ImageAssets.filter} style={[styles.sparkleIcon, { tintColor: '#531DFE' }]} />
          </View>

          {/* Filter Pills */}
          <View style={styles.pillRow}>
            <TouchableOpacity style={[styles.pill, styles.activePill]}>
              <AppText size={14} color={Colors.white} font={AppFonts.SemiBold}>All</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill}>
              <AppText size={14} color="#0E2E48" font={AppFonts.Medium}>Open</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill}>
              <AppText size={14} color="#0E2E48" font={AppFonts.Medium}>Closed</AppText>
            </TouchableOpacity>
          </View>

          {/* Table Container */}
          <View style={styles.tableCard}>
            <View style={styles.tableHeader}>
              <AppText font={AppFonts.Medium} size={13} color="#0E2E4899" style={{ flex: 1.2 }}>Topic</AppText>
              <AppText font={AppFonts.Medium} size={13} color="#0E2E4899" style={{ flex: 1 }}>Title</AppText>
              <AppText font={AppFonts.Medium} size={13} color="#0E2E4899" style={{ flex: 1.5 }}>Customer</AppText>
              <View style={styles.paginationArrows}>
                <TouchableOpacity style={styles.arrowBox}>
                  <Image source={ImageAssets.arrowright} style={[styles.arrow, { transform: [{ rotate: '180deg' }] }]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowBox}>
                  <Image source={ImageAssets.arrowright} style={styles.arrow} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.emptyTableBody}>
              <Image source={ImageAssets.noProduct} style={styles.searchImg} />
              <AppText font={AppFonts.SemiBold} size={20} color="#0E2E48" style={styles.emptyTitle}>
                No Coupon Found
              </AppText>
              <AppText font={AppFonts.Regular} size={14} color="#0E2E4899" style={styles.emptySubtitle}>
                You'll see coupon here when available
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Support;

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
    tintColor: Colors.primary
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  dropdown: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  dropdownIcon: {
    width: 14,
    height: 14,
    tintColor: '#0E2E4899',
    transform: [{ rotate: '90deg' }],
    resizeMode: 'contain',
  },
  calendarBtn: {
    width: 52,
    height: 52,
    borderWidth: 1.2,
    borderColor: '#531DFE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarIcon: {
    width: 24,
    height: 24,
    tintColor: '#531DFE',
    resizeMode: 'contain',
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  pill: {
    paddingHorizontal: 22,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EAED',
  },
  activePill: {
    backgroundColor: '#531DFE',
    borderColor: '#531DFE',
  },
  tableCard: {
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 15,
    overflow: 'hidden',
    minHeight: 280,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F0EAFC',
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  paginationArrows: {
    flexDirection: 'row',
    gap: 12,
  },
  arrowBox: {
    width: 24,
    height: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: 12,
    height: 12,
    tintColor: '#0E2E4899',
    resizeMode: 'contain',
  },
  emptyTableBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  searchImg: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  emptyTitle: {
    marginBottom: 5,
  },
  emptySubtitle: {
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
