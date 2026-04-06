import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import LinearGradient from 'react-native-linear-gradient';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

const PLAN_DATA = [
  {
    id: 'starter',
    title: 'Starter Pack',
    price: 'Rs.499',
    colors: ['#531DFE', '#B198FF'],
    benefits: [
      { id: '1', label: '1 Year Membership', icon: ImageAssets.oneYear },
      { id: '2', label: 'Store page and link', icon: ImageAssets.copy },
      { id: '3', label: 'Add upto 100 Products', icon: ImageAssets.dashboard },
      { id: '4', label: 'Complete sales dashboard', icon: ImageAssets.sales },
      { id: '5', label: 'Full Graphical data analysis', icon: ImageAssets.graph },
      { id: '6', label: 'No commission for 30 days', icon: ImageAssets.comission },
      { id: '7', label: 'Free for 30 Days social media handle', icon: ImageAssets.soicalmedia },
      { id: '8', label: '24/7 customer service', icon: ImageAssets.support },
      { id: '9', label: '2x sale reward points', icon: ImageAssets.reward },
      { id: '10', label: 'Free payment gateway', icon: ImageAssets.payment },
    ]
  },
  {
    id: 'premium',
    title: 'Premium Pack',
    price: 'Rs.999',
    colors: ['#8A66FF', '#B198FF'],
    benefits: [
      { id: '1', label: '1 Year Membership', icon: ImageAssets.oneYear },
      { id: '2', label: 'Store page and link', icon: ImageAssets.copy },
      { id: '3', label: 'Add upto 1000 Products', icon: ImageAssets.dashboard },
      { id: '4', label: 'Advanced sales dashboard', icon: ImageAssets.sales },
    ]
  },
  {
    id: 'super',
    title: 'Super-Premium Pack',
    price: 'Rs.1,999',
    colors: ['#8A66FF', '#B198FF'],
    benefits: [
      { id: '1', label: 'Lifetime Membership', icon: ImageAssets.oneYear },
      { id: '2', label: 'Personalized store page', icon: ImageAssets.copy },
      { id: '3', label: 'Unlimited Products', icon: ImageAssets.dashboard },
      { id: '4', label: 'Full Analytics dashboard', icon: ImageAssets.sales },
    ]
  }
];

const PlanDetail = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [expandedPlan, setExpandedPlan] = useState('starter');

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedPlan(id);
  };

  const renderBenefit = (benefit: any) => (
    <View key={benefit.id} style={styles.benefitRow}>
      <View style={styles.iconBg}>
        <Image source={benefit.icon} style={styles.benefitIcon} resizeMode="contain" />
      </View>
      <AppText font={AppFonts.Medium} size={14} color={Colors.white} style={styles.benefitText}>
        {benefit.label}
      </AppText>
    </View>
  );

  const renderCollapsedIcon = (benefit: any) => (
    <View key={benefit.id} style={styles.collapsedIconItem}>
      <View style={styles.collapsedIconBg}>
        <Image source={benefit.icon} style={styles.collapsedIcon} resizeMode="contain" />
      </View>
      <AppText font={AppFonts.Regular} size={9} color={Colors.white} textAlign="center">
        {benefit.label.split('\n')[0]}
      </AppText>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Image source={ImageAssets.backIcon} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AppText font={AppFonts.Medium} size={26} color={Colors.black} style={styles.screenTitle}>
          Subscribe Plan
        </AppText>

        {PLAN_DATA.map((plan) => {
          const isExpanded = expandedPlan === plan.id;
          return (
            <LinearGradient
              key={plan.id}
              colors={plan.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[isExpanded ? styles.expandedCard : styles.collapsedCard, plan.id === 'super' && { marginBottom: 40 }]}
            >
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggleExpand(plan.id)}
                activeOpacity={0.8}
              >
                <AppText font={AppFonts.Medium} size={18} color={Colors.white}>{plan.title}</AppText>
                <View style={styles.headerRight}>
                  {!isExpanded && <AppText font={AppFonts.SemiBold} size={17} color={Colors.white}>{plan.price}</AppText>}
                  <Image
                    source={ImageAssets.arrowright}
                    style={[styles.arrowIcon, isExpanded && { transform: [{ rotate: '90deg' }] }]}
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.divider} />

              {isExpanded ? (
                <View>
                  <View style={styles.benefitsList}>
                    {plan.benefits.map(renderBenefit)}
                  </View>
                  <TouchableOpacity 
                    style={styles.payBtn}
                    onPress={() => navigation.navigate('Checkout')}
                  >
                    <AppText font={AppFonts.SemiBold} size={16} color="#522ED1">Pay {plan.price}</AppText>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.horizontalIcons}>
                  {plan.benefits.slice(0, 4).map(renderCollapsedIcon)}
                </View>
              )}
            </LinearGradient>
          );
        })}

      </ScrollView>
    </View>
  );
};

export default PlanDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 20,
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
    resizeMode: "contain"
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  screenTitle: {
    marginVertical: 10,
  },
  expandedCard: {
    borderRadius: 25,
    padding: 20,
    marginBottom: 15,
    elevation: 5,
  },
  collapsedCard: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.white,
    resizeMode: 'contain'
  },
  divider: {
    height: 0.8,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: width,
    alignSelf: 'center',
    marginBottom: 15,
  },
  benefitsList: {
    marginBottom: 15,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconBg: {
    width: 32,
    height: 32,
    backgroundColor: Colors.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  benefitIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  benefitText: {
    flex: 1,
  },
  horizontalIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15,
  },
  collapsedIconItem: {
    alignItems: 'center',
    width: 60,
  },
  collapsedIconBg: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  collapsedIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  payBtn: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
