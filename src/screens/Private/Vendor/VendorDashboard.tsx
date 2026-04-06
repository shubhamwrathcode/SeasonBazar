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
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';
import { LineChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');
const STAT_CARD_WIDTH = (width - 55) / 2;

const PERFORMANCE_STATS = [
  { id: '1', title: 'Total sales', value: '100', icon: ImageAssets.saless, colors: ['#FAA742', '#FFFFFF'] },
  { id: '2', title: 'Commission', value: '46%', icon: ImageAssets.commission, colors: ['#2EEEC1', '#FFFFFF'] },
  { id: '3', title: 'Net sales', value: '1200', icon: ImageAssets.netSales, colors: ['#FD6161', '#FFFFFF',] },
  {
    id: '4', title: 'Orders', icon: ImageAssets.orders1, value: '120', colors: ['#C8FFBB', '#FFFFFF']
  },
  {
    id: '5', title: 'Products sold', icon: ImageAssets.product1, value: '678', colors: ['#0290CF', '#FFFFFF']
  },
  { id: '6', title: 'Total Earning', icon: ImageAssets.earnings, value: '10,079', colors: ['#FE5694', '#FFFFFF'] },
  { id: '7', title: 'Discount', icon: ImageAssets.discount, value: '15%', colors: ['#9E5528', '#FFFFFF',] },
  { id: '8', title: 'Store Discount', icon: ImageAssets.discount, value: '30%', colors: ['#FFC529', '#FFFFFF',] },
  { id: '9', title: 'Variations Sold', icon: ImageAssets.sold, value: '1234', colors: ['#A85EEC', '#FFFFFF'] },
];

const CHART_DATA_1 = [
  { value: 2000, label: '1 Oct' },
  { value: 3500, label: '3 Oct' },
  { value: 4890, label: '7 Oct' },
  { value: 2500, label: '10 Oct' },
  { value: 4200, label: '14 Oct' },
  { value: 1800, label: '20 Oct' },
  // { value: 3500, label: '23 Oct' },
];

const CHART_DATA_2 = [
  { value: 1200, label: '1 Oct' },
  { value: 2400, label: '3 Oct' },
  { value: 3800, label: '7 Oct' },
  { value: 3200, label: '10 Oct' },
  { value: 2000, label: '14 Oct' },
  { value: 3400, label: '20 Oct' },
  { value: 2200, label: '23 Oct' },
];

const VendorDashboard = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const renderStatCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.statCardContainer}
      onPress={() => {
        if (item.title === 'Orders') {
          navigation.navigate('Orders');
        } else if (item.title === 'Products sold') {
          navigation.navigate('Products');
        } else {
          navigation.navigate('ProductReport', { title: item.title });
        }
      }}
    >
      <LinearGradient
        colors={item.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.statCard, { borderWidth: 0.7, borderColor: item.colors[1] }]}
      >
        <View style={styles.statContent}>
          <AppText font={AppFonts.Medium} size={26} color="#0E2E48">
            {item.value}
          </AppText>
          <AppText font={AppFonts.Regular} size={16} color="#0E2E4899">
            {item.title}
          </AppText>
        </View>
        <Image source={item.icon} style={styles.statIcon} resizeMode="contain" />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Reusable Sticky Header */}
      <VendorHeader
        title="Dashboard"
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

          {/* Progress Card */}
          <View style={styles.progressCard}>
            <AppText font={AppFonts.SemiBold} size={15} color="#0E2E48">45% Profile Complete</AppText>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: '45%' }]} />
            </View>
            <AppText size={13} color="#0E2E4899" font={AppFonts.Regular}>
              Add Profile Picture to gain 15% progress
            </AppText>
          </View>

          {/* Reports Header Row */}
          <View style={styles.reportsHeader}>
            <View style={styles.reportTitleRow}>
              <Image source={ImageAssets.star} style={styles.sparkleIcon} />
              <AppText size={18} font={AppFonts.SemiBold} color="#0E2E48">Reports</AppText>
            </View>
            <TouchableOpacity 
              style={styles.walletPill}
              onPress={() => navigation.navigate('Withdraw')}
            >
              <Image source={ImageAssets.wallet1} style={styles.walletIcon} />
              <AppText size={14} font={AppFonts.Bold} color="#531DFE">₹1,34,500</AppText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.viewAllRow}
              onPress={() => navigation.navigate('Reports')}
            >
              <AppText size={14} font={AppFonts.Medium} color="#531DFE">View All</AppText>
              <Image source={ImageAssets.arrowright} style={styles.viewAllArrow} />
            </TouchableOpacity>
          </View>

          {/* Date Selector */}
          <TouchableOpacity style={styles.dateSelector}>
            <Image source={ImageAssets.calendar} style={styles.calIcon} />
            <AppText font={AppFonts.Medium} size={14} color="#0E2E48" style={styles.dateText}>
              Mar 1-24-2026 Vs Mar 1-24-2025
            </AppText>
            <Image source={ImageAssets.arrowright} style={styles.chevIcon} />
          </TouchableOpacity>

          {/* Performance Grid */}
          <View style={styles.perfSection}>
            <View style={styles.perfHeader}>
              <AppText font={AppFonts.Medium} size={18} color="#0E2E48">Performance</AppText>
              <TouchableOpacity>
                <Image source={ImageAssets.dot} style={styles.moreIcon} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={PERFORMANCE_STATS}
              renderItem={renderStatCard}
              keyExtractor={item => item.id}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
          </View>

          {/* Data Charts Placeholder (Performance 2) */}
          <View style={styles.chartSection}>
            <View style={styles.perfHeader}>
              <AppText font={AppFonts.Medium} size={18} color="#0E2E48">Performance</AppText>
              <View style={styles.chartHeaderRight}>
                <Image source={ImageAssets.graph1} style={styles.graphIcon} />
                <TouchableOpacity>
                  <Image source={ImageAssets.dot} style={styles.moreIcon} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Chart 1: Net Sales */}
            <View style={styles.chartContainer}>
              <View style={styles.chartMeta}>
                <AppText font={AppFonts.Medium} size={16} color="#0E2E48">Net sales</AppText>
                <View style={styles.timeFilter}>
                  <TouchableOpacity style={styles.filterBtn}><AppText size={11} color="#0E2E4899">Day</AppText></TouchableOpacity>
                  <TouchableOpacity style={styles.filterBtn}><AppText size={11} color="#0E2E4899">Week</AppText></TouchableOpacity>
                  <TouchableOpacity style={[styles.filterBtn, styles.activeFilter]}><AppText size={11} color={Colors.white}>Month</AppText></TouchableOpacity>
                </View>
              </View>

              <View style={styles.lineChartBox}>
                <LineChart
                  data={CHART_DATA_1}
                  data2={CHART_DATA_2}
                  height={180}
                  hideRules
                  hideDataPoints
                  initialSpacing={10}
                  color="#3399FF"
                  color2="#33CC99"
                  thickness={3}
                  curved
                  areaChart
                  startFillColor="rgba(51, 153, 255, 0.4)"
                  endFillColor="rgba(51, 153, 255, 0.05)"
                  startFillColor2="rgba(51, 204, 153, 0.35)"
                  endFillColor2="rgba(51, 204, 153, 0.05)"
                  xAxisColor="transparent"
                  yAxisColor="transparent"
                  yAxisTextStyle={styles.axisText}
                  xAxisLabelTextStyle={styles.axisText}
                  noOfSections={5}
                  maxValue={5000}
                  stepValue={1000}
                  yAxisLabelPrefix=""
                  yAxisLabelSuffix="k"
                  formatYLabel={(val) => val === '0k' ? '0' : val}
                  pointerConfig={{
                    pointerStripColor: '#0E2E481A',
                    pointerStripWidth: 1,
                    pointerColor: '#0E2E48',
                    radius: 4,
                    pointerLabelComponent: (items: any) => (
                      <View style={styles.tooltip}>
                        <AppText size={12} font={AppFonts.SemiBold} color="#0E2E48">
                          {items[0].value} Order
                        </AppText>
                      </View>
                    ),
                  }}
                />
              </View>

              {/* Legend */}
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: '#3399FF' }]} />
                  <AppText size={13} color="#0E2E4899" font={AppFonts.Regular}>Month to Date</AppText>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: '#33CC99' }]} />
                  <AppText size={13} color="#0E2E4899" font={AppFonts.Regular}>Previous Year</AppText>
                </View>
              </View>
            </View>

            {/* Chart 2: Orders */}
            <View style={styles.chartContainer}>
              <View style={styles.chartMeta}>
                <AppText font={AppFonts.Medium} size={16} color="#0E2E48">Orders</AppText>
                <View style={styles.timeFilter}>
                  <TouchableOpacity style={styles.filterBtn}><AppText size={11} color="#0E2E4899">Day</AppText></TouchableOpacity>
                  <TouchableOpacity style={styles.filterBtn}><AppText size={11} color="#0E2E4899">Week</AppText></TouchableOpacity>
                  <TouchableOpacity style={[styles.filterBtn, styles.activeFilter]}><AppText size={11} color={Colors.white}>Month</AppText></TouchableOpacity>
                </View>
              </View>

              <View style={styles.lineChartBox}>
                <LineChart
                  data={CHART_DATA_1}
                  data2={CHART_DATA_2}
                  height={180}
                  hideRules
                  hideDataPoints
                  initialSpacing={10}
                  color="#3399FF"
                  color2="#33CC99"
                  thickness={3}
                  curved
                  areaChart
                  startFillColor="rgba(51, 153, 255, 0.4)"
                  endFillColor="rgba(51, 153, 255, 0.05)"
                  startFillColor2="rgba(51, 204, 153, 0.35)"
                  endFillColor2="rgba(51, 204, 153, 0.05)"
                  xAxisColor="transparent"
                  yAxisColor="transparent"
                  yAxisTextStyle={styles.axisText}
                  xAxisLabelTextStyle={styles.axisText}
                  noOfSections={5}
                  maxValue={5000}
                  stepValue={1000}
                  yAxisLabelPrefix=""
                  yAxisLabelSuffix="k"
                  formatYLabel={(val) => val === '0k' ? '0' : val}
                  pointerConfig={{
                    pointerStripColor: '#0E2E481A',
                    pointerStripWidth: 1,
                    pointerColor: '#0E2E48',
                    radius: 4,
                    pointerLabelComponent: (items: any) => (
                      <View style={styles.tooltip}>
                        <AppText size={12} font={AppFonts.SemiBold} color="#0E2E48">
                          {items[0].value} Order
                        </AppText>
                      </View>
                    ),
                  }}
                />
              </View>

              {/* Legend */}
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: '#3399FF' }]} />
                  <AppText size={13} color="#0E2E4899" font={AppFonts.Regular}>Month to Date</AppText>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: '#33CC99' }]} />
                  <AppText size={13} color="#0E2E4899" font={AppFonts.Regular}>Previous Year</AppText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VendorDashboard;

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
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFEEBA',
    marginTop: 20
  },
  progressCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#F0F0F0',
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
  reportsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  reportTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sparkleIcon: {
    width: 20,
    height: 20,
    tintColor: '#9370DB',
    resizeMode: 'contain',
  },
  walletPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEECFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  walletIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
  },
  calIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain"
  },
  dateText: {
    flex: 1,
    marginLeft: 12,
  },
  chevIcon: {
    width: 16,
    height: 16,
    transform: [{ rotate: '90deg' }],
    resizeMode: 'contain'
  },
  perfSection: {
    marginBottom: 25,
  },
  perfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  moreIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  statCardContainer: {
    width: STAT_CARD_WIDTH,
    marginBottom: 15,
  },
  statCard: {
    width: '100%',
    height: 110,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statIcon: {
    width: 35,
    height: 35,
    opacity: 0.8,
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllArrow: {
    width: 12,
    height: 12,
    tintColor: '#531DFE',
    resizeMode: 'contain',
  },
  statContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chartSection: {
    marginTop: 10,
  },
  chartHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  graphIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain"
  },
  chartContainer: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  chartMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeFilter: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 2,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: '#531DFE',
  },
  lineChartBox: {
    width: width - 80,
    marginTop: 10,
    paddingLeft: -20,
  },
  axisText: {
    color: '#0E2E4899',
    fontSize: 12,
    fontFamily: AppFonts.Regular,
  },
  tooltip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
    width: 80,
    alignItems: 'center',
    marginLeft: -40,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 25,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
