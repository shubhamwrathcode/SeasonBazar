import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';
import { LineChart } from 'react-native-gifted-charts';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const CHART_DATA_1 = [
  { value: 2000, label: '1 Oct' },
  { value: 3500, label: '3 Oct' },
  { value: 4890, label: '7 Oct' },
  { value: 2500, label: '10 Oct' },
  { value: 4200, label: '14 Oct' },
  { value: 1800, label: '20 Oct' },
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

const ProductReport = ({ navigation, route }: any) => {
  const { title = 'Product' } = route.params || {};
  const isVariation = title === 'Variations' || title === 'Statement';

  const renderSummaryCard = (title: string, value: string, icon: any, bgColor: string, borderColor: string) => (
    <View style={[styles.summaryCard, { backgroundColor: bgColor, borderColor: borderColor }]}>
      <View style={styles.cardHeader}>
        <View>
          <AppText font={AppFonts.Medium} size={20} color="#0E2E48">{value}</AppText>
          <AppText font={AppFonts.Regular} size={14} color="#0E2E4899" style={styles.cardTitle}>{title}</AppText>
        </View>
        {icon && <Image source={icon} style={styles.cardIcon} />}
      </View>
    </View>
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
          <AppText size={18} font={AppFonts.SemiBold} color="#0E2E48">{title}</AppText>
        </View>

        {/* Filters Top */}
        <View style={styles.filterRow}>
          <View style={styles.dropdownBox}>
            <AppText font={AppFonts.Medium} size={14} color="#0E2E48">All Product</AppText>
            <Image source={ImageAssets.boldNext} style={styles.dropdownArrow} />
          </View>
          <TouchableOpacity style={styles.calendarBtn}>
            <Image source={ImageAssets.calendar} style={styles.calendarIcon} />
          </TouchableOpacity>
        </View>

        {/* Summary Cards Grid */}
        <View style={styles.cardsGrid}>
          {isVariation ? (
            <View style={styles.cardRow}>
               {renderSummaryCard('Total Debit', '10k', null, '#F3EEFF', '#BFAEFF')}
               {renderSummaryCard('Total Credit', '5k', null, '#F3F4F6', '#E8EAED')}
               {renderSummaryCard('Balance', '5k', null, '#F3F4F6', '#E8EAED')}
            </View>
          ) : title === 'Stock' ? (
            <View style={styles.cardRow}>
               {renderSummaryCard('Total Stock', '1240', ImageAssets.stock, '#F3EEFF', '#BFAEFF')}
               {renderSummaryCard('Low Stock', '12', ImageAssets.stock, '#FFF4E5', '#FFDEC0')}
               {renderSummaryCard('Out of Stock', '5', ImageAssets.stock, '#FCEAEA', '#F7CFD1')}
            </View>
          ) : (
            <>
              <View style={styles.cardRow}>
                {renderSummaryCard('Gross Sale', '100', ImageAssets.netSales, '#FFF4E5', '#FFDEC0')}
                {renderSummaryCard('Returns', '12', ImageAssets.returns, '#E6FEF0', '#BFF9D8')}
                {renderSummaryCard('Coupons', '52', ImageAssets.coupons1, '#F0EAFC', '#D9CFF7')}
              </View>
              <View style={styles.cardRow}>
                {renderSummaryCard('Net sales', '10k', ImageAssets.netSales, '#F0EAFC', '#D9CFF7')}
                {renderSummaryCard('Taxes', '10%', ImageAssets.taxes, '#EAF4FE', '#C0DFFE')}
                {renderSummaryCard('shipping', '12', ImageAssets.shipping1, '#FCEAEA', '#F7CFD1')}
              </View>
              <View style={styles.cardRow}>
                {renderSummaryCard('Total Sales', '11k', ImageAssets.totalSale, '#FBE6FC', '#F7BFF9')}
                <View style={{ flex: 1 }} />
                <View style={{ flex: 1 }} />
              </View>
            </>
          )}
        </View>

        {/* Performance Section (Hide for Variation) */}
        {!isVariation && (
          <>
            <View style={styles.sectionHeader}>
              <AppText font={AppFonts.Medium} size={18} color="#0E2E48">Performance</AppText>
              <Image source={ImageAssets.performance} style={styles.headerIndicator} />
            </View>

            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <AppText font={AppFonts.SemiBold} size={15} color="#0E2E48">Gross Sale</AppText>
                <View style={styles.timePills}>
                  <TouchableOpacity style={styles.timePill}><AppText size={12} color="#0E2E4866">Day</AppText></TouchableOpacity>
                  <TouchableOpacity style={styles.timePill}><AppText size={12} color="#0E2E4866">Week</AppText></TouchableOpacity>
                  <TouchableOpacity style={[styles.timePill, styles.activeTimePill]}>
                    <AppText size={12} color={Colors.white}>Month</AppText>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.chartBody}>
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
                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.dot, { backgroundColor: '#3399FF' }]} />
                    <AppText size={12} color="#0E2E4899">Month to Date</AppText>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.dot, { backgroundColor: '#33CC99' }]} />
                    <AppText size={12} color="#0E2E4899">Previous Year</AppText>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Revenue/Orders Section */}
        <View style={styles.sectionHeader}>
          <AppText font={AppFonts.Medium} size={18} color="#0E2E48">
            {isVariation ? 'Orders' : 'Revenue'}
          </AppText>
          <View style={styles.revenueActions}>
            <TouchableOpacity style={isVariation ? styles.exportBtn : styles.downloadBtn}>
              <Image source={ImageAssets.downloads} style={styles.downloadIcon} />
              <AppText font={AppFonts.SemiBold} size={12} color={isVariation ? Colors.white : "#6A44E3"}>
                {isVariation ? 'Export Statement' : 'Download'}
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity><Image source={ImageAssets.dot} style={styles.dotIcon} /></TouchableOpacity>
          </View>
        </View>

        <View style={styles.tableBox}>
          <View style={styles.tableHeader}>
            <AppText font={AppFonts.Medium} size={13} color="#0E2E48" style={{ flex: 1.2 }}>
                {isVariation ? 'Balance Date' : 'Date'}
            </AppText>
            <AppText font={AppFonts.Medium} size={13} color="#0E2E48" style={{ flex: 1 }}>
                {isVariation ? 'Transaction Date' : 'Order'}
            </AppText>
            <AppText font={AppFonts.Medium} size={13} color="#0E2E48" style={{ flex: 0.5 }}>
                {isVariation ? 'ID' : 'Gross sales'}
            </AppText>
            <View style={styles.paginationArrows}>
              <TouchableOpacity style={styles.arrowBox}>
                <Image source={ImageAssets.arrowright} style={[styles.arrow, { transform: [{ rotate: '180deg' }] }]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrowBox}>
                <Image source={ImageAssets.arrowright} style={styles.arrow} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.emptyTable}>
            {isVariation ? (
                <View style={styles.varTableBody}>
                   <AppText size={14} color="#0E2E48" font={AppFonts.Medium} style={{ flex: 1.2 }}>March 1, 2026</AppText>
                   <AppText size={14} color="#0E2E48" font={AppFonts.Medium} style={{ flex: 1 }}>--</AppText>
                   <AppText size={14} color="#0E2E48" font={AppFonts.Medium} style={{ flex: 0.5 }}>--</AppText>
                </View>
            ) : (
                <>
                <Image source={ImageAssets.noCoupon} style={styles.noDataImg} />
                <AppText font={AppFonts.SemiBold} size={18} color="#0E2E48" style={styles.noDataTitle}>No Coupon Found</AppText>
                <AppText font={AppFonts.Regular} size={13} color="#0E2E4899">You'll see coupon here when available</AppText>
                </>
            )}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default ProductReport;

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
    borderRadius: 12,
    marginBottom: 20,
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
    tintColor: Colors.primary,
    resizeMode: 'contain',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 25,
  },
  dropdownBox: {
    flex: 1,
    height: 54,
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  dropdownArrow: {
    width: 14,
    height: 14,
    tintColor: '#0E2E4899',
    transform: [{ rotate: '90deg' }],
    resizeMode: 'contain',
  },
  calendarBtn: {
    width: 54,
    height: 54,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.primary,
  },
  cardsGrid: {
    gap: 12,
    marginBottom: 30,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    height: 90,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    marginTop: 4,
  },
  cardIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 10,
  },
  headerIndicator: {
    width: 22,
    height: 22,
    tintColor: Colors.primary,
  },
  chartCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8EAED',
    marginBottom: 30,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  timePills: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 3,
  },
  timePill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  activeTimePill: {
    backgroundColor: '#6A44E3',
  },
  chartBody: {
    height: 200,
  },
  mockGraph: {
    width: '100%',
    height: 150,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A44E3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  varTableBody: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
  },
  revenueActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0EAFC',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  downloadIcon: {
    width: 14,
    height: 14,
    tintColor: '#6A44E3',
  },
  dotIcon: {
    width: 18,
    height: 18,
    tintColor: '#0E2E48',
  },
  tableBox: {
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 20,
    padding: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0EAFC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  paginationArrows: {
    flexDirection: 'row',
    gap: 8,
  },
  arrowBox: {
    padding: 6,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  arrow: {
    width: 14,
    height: 14,
    tintColor: '#0E2E4866',
    resizeMode: "contain"
  },
  emptyTable: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noDataImg: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  noDataTitle: {
    marginBottom: 5,
  },
});
