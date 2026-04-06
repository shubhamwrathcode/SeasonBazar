import React, { useState } from 'react';
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
import VendorHeader from '../../../components/VendorHeader';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const PLAN_FEATURES = [
  { id: '1', label: '1 Year\nMembership', icon: ImageAssets.oneYear },
  { id: '2', label: 'store page\nand link', icon: ImageAssets.copy },
  { id: '3', label: 'Add upto 100\nProducts', icon: ImageAssets.dashboard },
  { id: '4', label: 'sales\ndashboard', icon: ImageAssets.sales },
  { id: '5', label: 'Graphical\ndata analysis', icon: ImageAssets.graph },
];

const SubscribePlan = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Packs');
  const { fromHome = false } = route.params || {};

  const renderFeature = (feature: any) => (
    <View key={feature.id} style={styles.featureItem}>
      <View style={styles.featureIconBg}>
        <Image source={feature.icon} style={styles.featureIcon} resizeMode="contain" />
      </View>
      <AppText font={AppFonts.Medium} size={10} color={fromHome ? Colors.white : (feature.id === '1' ? Colors.white : Colors.white)} textAlign="center" style={styles.featureLabel}>
        {feature.label}
      </AppText>
    </View>
  );

  // If NOT from home, show the simpler "Subscribe Plan" selection screen
  if (!fromHome) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

        {/* Basic Header for selection screen */}
        <View style={[styles.simpleHeader, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnWrapper}>
             <Image source={ImageAssets.backIcon} style={styles.simpleBackIcon} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <AppText font={AppFonts.Medium} size={26} color={Colors.black} style={styles.screenTitle}>
             Subscribe Plan
          </AppText>

          {/* Starter Pack */}
          <LinearGradient
            colors={['#562CDA', '#B198FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.simplePlanCard}
          >
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => navigation.navigate('PlanDetail')}
            >
              <AppText font={AppFonts.Medium} size={18} color={Colors.white}>Starter Pack</AppText>
              <Image source={ImageAssets.arrowright} style={styles.arrowIcon} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuresScroll}>
              {PLAN_FEATURES.map(renderFeature)}
            </ScrollView>
            <TouchableOpacity style={styles.payBtnSelection} onPress={() => navigation.navigate('PlanDetail')}>
              <AppText font={AppFonts.SemiBold} size={16} color="#522ED1">Pay RS.499</AppText>
            </TouchableOpacity>
          </LinearGradient>

          {/* Premium Pack */}
          <LinearGradient
            colors={['#8A66FF', '#704AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.simplePlanCardSmall}
          >
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => navigation.navigate('PlanDetail')}
            >
              <AppText font={AppFonts.Medium} size={18} color={Colors.white}>Premium Pack</AppText>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <AppText font={AppFonts.SemiBold} size={18} color={Colors.white}>Rs.999</AppText>
                <Image source={ImageAssets.arrowright} style={styles.arrowIcon} />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuresScroll}>
              {PLAN_FEATURES.map(f => renderFeature({ ...f, label: f.id === '3' ? 'Add upto 1000\nProducts' : f.label }))}
            </ScrollView>
          </LinearGradient>

          {/* Super Premium Pack */}
          <LinearGradient
            colors={['#8A66FF', '#724BF5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.simplePlanCardSmall, { marginBottom: 40 }]}
          >
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => navigation.navigate('PlanDetail')}
            >
              <AppText font={AppFonts.Medium} size={18} color={Colors.white}>Super-Premium Pack</AppText>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <AppText font={AppFonts.Medium} size={18} color={Colors.white}>Rs.1,999</AppText>
                <Image source={ImageAssets.arrowright} style={styles.arrowIcon} />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuresScroll}>
              {PLAN_FEATURES.map(f => renderFeature({ ...f, label: f.id === '3' ? 'Add upto 1000\nProducts' : f.label }))}
            </ScrollView>
          </LinearGradient>
        </ScrollView>
      </View>
    );
  }

  // If FROM home, show the Dashboard management screen
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <VendorHeader
        title="Subscription"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Error Alert */}
        <View style={styles.alertCard}>
          <AppText size={13} color="#8C5336" font={AppFonts.Regular}>
            ⚠️ Error! Your account is not enabled for selling, please contact the admin
          </AppText>
        </View>

        {/* Section Title */}
        <View style={styles.titleRow}>
          <Image source={ImageAssets.star} style={styles.sparkleIcon} />
          <AppText size={20} font={AppFonts.SemiBold} color="#0E2E48">
            Subscription
          </AppText>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Packs' && styles.activeTab]}
            onPress={() => setActiveTab('Packs')}
          >
            <AppText font={AppFonts.Medium} size={14} color={activeTab === 'Packs' ? Colors.white : '#0E2E4866'}>
              Subscription Packs
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Orders' && styles.activeTab, { backgroundColor: activeTab === 'Orders' ? '#531DFE' : Colors.white }]}
            onPress={() => setActiveTab('Orders')}
          >
            <AppText font={AppFonts.Medium} size={14} color={activeTab === 'Orders' ? Colors.white : '#0E2E48'}>
              Subscription Orders
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Current Subscription Card */}
        <View style={styles.currentCard}>
          <AppText font={AppFonts.Medium} size={16} color="#0E2E48" style={{ marginBottom: 12 }}>Current Subscription</AppText>
          <AppText font={AppFonts.Regular} size={14} color="#0E2E4899">
            You Are Using <AppText font={AppFonts.Bold} color="#531DFE">Super-Premium Pack</AppText> Package.
          </AppText>
          <AppText font={AppFonts.Regular} size={14} color="#0E2E4899" style={{ marginBottom: 15 }}>
            Package Details Are Given Below:
          </AppText>
          <View style={styles.detailsList}>
            <AppText font={AppFonts.Regular} size={13} color="#0E2E48CC">•  You Can Add 19999 Products</AppText>
            <AppText font={AppFonts.Regular} size={13} color="#0E2E48CC">•  Your Package Is Valid For Unlimited Days</AppText>
            <AppText font={AppFonts.Regular} size={13} color="#0E2E48CC">•  You Have A Lifetime Package.</AppText>
          </View>
          <TouchableOpacity style={styles.cancelBtn}>
            <AppText font={AppFonts.SemiBold} size={15} color={Colors.white}>Cancel Your Subscription</AppText>
          </TouchableOpacity>
        </View>

        {/* Starter Pack */}
        <LinearGradient
          colors={['#8A66FF', '#7346FE']}
          style={styles.planCard}
        >
          <View style={styles.cardHeader}>
            <AppText font={AppFonts.Medium} size={18} color={Colors.white}>Starter Pack</AppText>
            <Image source={ImageAssets.arrowright} style={styles.arrowIcon} />
          </View>
          <View style={styles.line} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuresScroll}>
            {PLAN_FEATURES.map(renderFeature)}
          </ScrollView>
          <TouchableOpacity style={styles.packBtn}>
            <AppText font={AppFonts.SemiBold} size={15} color="#531DFE">Your Pack</AppText>
          </TouchableOpacity>
        </LinearGradient>

        {/* Premium Pack */}
        <LinearGradient
          colors={['#8A66FF', '#7346FE']}
          style={styles.planCard}
        >
          <View style={styles.cardHeader}>
            <AppText font={AppFonts.Medium} size={18} color={Colors.white}>Premium Pack</AppText>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <AppText font={AppFonts.SemiBold} size={18} color={Colors.white}>Rs.999</AppText>
              <Image source={ImageAssets.arrowright} style={styles.arrowIcon} />
            </View>
          </View>
          <View style={styles.line} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuresScroll}>
            {PLAN_FEATURES.map(f => renderFeature({ ...f, label: f.id === '3' ? 'Add upto 1000\nProducts' : f.label }))}
          </ScrollView>
          <TouchableOpacity style={styles.packBtn}>
            <AppText font={AppFonts.SemiBold} size={15} color="#531DFE">Switch Pack</AppText>
          </TouchableOpacity>
        </LinearGradient>

        {/* Super Premium Pack */}
        <LinearGradient
          colors={['#8A66FF', '#7346FE']}
          style={styles.planCard}
        >
          <View style={styles.cardHeader}>
            <AppText font={AppFonts.Medium} size={18} color={Colors.white}>Super-Premium Pack</AppText>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <AppText font={AppFonts.SemiBold} size={18} color={Colors.white}>Rs.1,999</AppText>
              <Image source={ImageAssets.arrowright} style={styles.arrowIcon} />
            </View>
          </View>
          <View style={styles.line} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuresScroll}>
            {PLAN_FEATURES.map(f => renderFeature({ ...f, label: f.id === '3' ? 'Add upto 1000\nProducts' : f.label }))}
          </ScrollView>
          <TouchableOpacity style={styles.packBtn}>
            <AppText font={AppFonts.SemiBold} size={15} color="#531DFE">Switch Pack</AppText>
          </TouchableOpacity>
        </LinearGradient>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default SubscribePlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  simpleHeader: {
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  backBtnWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  simpleBackIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    tintColor: '#522ED1',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  screenTitle: {
    marginVertical: 15,
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
  tabRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 25,
  },
  tab: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  activeTab: {
    backgroundColor: '#531DFE',
    borderColor: '#531DFE',
  },
  currentCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 20,
    marginBottom: 25,
  },
  detailsList: {
    gap: 5,
    marginBottom: 20,
  },
  cancelBtn: {
    backgroundColor: '#531DFE',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planCard: {
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
  },
  simplePlanCard: {
    borderRadius: 30,
    padding: 25,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#522ED1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  simplePlanCardSmall: {
    borderRadius: 30,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.white,
    resizeMode: "contain"
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 20,
  },
  line: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
  },
  featuresScroll: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  featureItem: {
    alignItems: 'center',
    marginRight: 15,
    width: 75,
  },
  featureIconBg: {
    width: 44,
    height: 44,
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    width: 22,
    height: 22,
  },
  featureLabel: {
    lineHeight: 12,
  },
  packBtn: {
    backgroundColor: Colors.white,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payBtnSelection: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
