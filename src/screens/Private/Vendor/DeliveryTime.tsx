import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';
import { Calendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const DeliveryTime = ({ navigation, route }: any) => {
  const { title = 'Delivery' } = route.params || {};
  const [selectedDate, setSelectedDate] = useState('2026-03-02');
  const [currentDate, setCurrentDate] = useState('2026-03-01');

  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const handleNextMonth = () => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1);
    setCurrentDate(date.toISOString().split('T')[0]);
  };

  const handlePrevMonth = () => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - 1);
    setCurrentDate(date.toISOString().split('T')[0]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title={title}
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
          <AppText size={18} font={AppFonts.Bold} color="#0E2E48">
            {title === 'Store Pickup' ? 'Store Pickup' : 'Delivery Time & Store Pickup'}
          </AppText>
        </View>

        {/* Filters Top */}
        <View style={styles.filterRow}>
          <View style={styles.dropdownBox}>
            <AppText font={AppFonts.Medium} size={14} color="#0E2E48">All Product</AppText>
            <Image source={ImageAssets.boldNext} style={styles.dropdownArrow} />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Image source={ImageAssets.filter} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>

        {/* Date Row with Tabs */}
        <View style={styles.dateTabRow}>
          <AppText font={AppFonts.Medium} size={18} color="#0E2E48">{getMonthName(currentDate)}</AppText>
          <View style={styles.tabsContainer}>
            <TouchableOpacity style={styles.tabItem}><AppText size={12} color="#0E2E4866">List</AppText></TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}><AppText size={12} color="#0E2E4866">Day</AppText></TouchableOpacity>
            <TouchableOpacity style={styles.tabItem}><AppText size={12} color="#0E2E4866">Week</AppText></TouchableOpacity>
            <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
              <AppText size={12} color={Colors.white} font={AppFonts.SemiBold}>Month</AppText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <AppText font={AppFonts.Medium} size={16} color="#0E2E48">
              {title === 'Store Pickup' ? 'Store Pickup Time' : 'Delivery Time & Store Pickup'}
            </AppText>
            <View style={styles.calendarNav}>
              <TouchableOpacity onPress={handlePrevMonth}>
                <Image source={ImageAssets.arrowright} style={[styles.navArrow, { transform: [{ rotate: '180deg' }] }]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextMonth}>
                <Image source={ImageAssets.arrowright} style={styles.navArrow} />
              </TouchableOpacity>
            </View>
          </View>

          <Calendar
            current={currentDate}
            key={currentDate}
            onDayPress={day => setSelectedDate(day.dateString)}
            onMonthChange={month => setCurrentDate(month.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#531DFE' },
              '2026-03-02': { selected: true, selectedColor: '#531DFE', marked: true },
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#0E2E4899',
              selectedDayBackgroundColor: '#531DFE',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#531DFE',
              dayTextColor: '#0E2E48',
              textDisabledColor: '#0E2E4833',
              dotColor: '#531DFE',
              arrowColor: 'transparent',
              monthTextColor: 'transparent',
              textDayFontFamily: AppFonts.Medium,
              textMonthFontFamily: AppFonts.Bold,
              textDayHeaderFontFamily: AppFonts.Medium,
              textDayFontSize: 14,
              textDayHeaderFontSize: 13,
              // @ts-ignore
              'stylesheet.day.basic': {
                base: {
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                selected: {
                  backgroundColor: '#531DFE',
                  borderRadius: 5,
                },
                today: {
                  borderRadius: 5,
                },
                text: {
                  marginTop: 0,
                }
              }
            }}
            hideArrows={true}
            renderHeader={() => null}
            style={styles.calendar}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default DeliveryTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
    paddingHorizontal: 20,
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
    marginBottom: 25,
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
    marginBottom: 30,
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
  filterBtn: {
    width: 54,
    height: 54,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    width: 22,
    height: 22,
    tintColor: Colors.primary,
    resizeMode: 'contain',
  },
  dateTabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 3,
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#531DFE',
  },
  calendarCard: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 25,
    padding: 20,
    paddingTop: 15,
    backgroundColor: '#FFFFFF',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarNav: {
    flexDirection: 'row',
    gap: 12,
  },
  navArrow: {
    width: 14,
    height: 14,
    tintColor: '#0E2E4866',
    resizeMode: 'contain'
  },
  calendar: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});
