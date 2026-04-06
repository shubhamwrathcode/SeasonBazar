import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import AppHeader from '../../../components/AppHeader';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQ_DATA = [
  {
    id: '1',
    title: 'Orders & Purchases',
    icon: ImageAssets.purchase,
    content: [
      'Store Pickup',
      'Cancel An Order',
      'Track A Package',
      'In-Store Consultation',
      'Shop with an expert',
    ],
  },
  { id: '2', title: 'Account', icon: ImageAssets.accountdetail, content: [] },
  { id: '3', title: 'Returns & Refunds', icon: ImageAssets.return, content: [] },
  { id: '4', title: 'Shipping & Tracking', icon: ImageAssets.shippings, content: [] },
  { id: '5', title: 'Fees & billing', icon: ImageAssets.billing, content: [] },
  { id: '6', title: 'Other', icon: ImageAssets.other, content: [] },
];

const HelpSupport = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [expandedId, setExpandedId] = useState<string | null>('1');

  const toggleAccordion = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(prev => (prev === id ? null : id));
  };

  const renderFaqItem = (item: any) => {
    const isExpanded = expandedId === item.id;
    return (
      <View key={item.id} style={[styles.faqCard, isExpanded && styles.faqCardExpanded]}>
        <TouchableOpacity
          onPress={() => toggleAccordion(item.id)}
          style={styles.faqHeader}
          activeOpacity={0.7}
        >
          <View style={styles.faqHeaderLeft}>
            <Image source={item.icon} style={styles.faqIcon} resizeMode="contain" />
            <AppText font={AppFonts.Medium} size={16} color="#1D3A70">{item.title}</AppText>
          </View>
          <AppText font={AppFonts.Regular} size={24} color={Colors.primary}>
            {isExpanded ? '−' : '+'}
          </AppText>
        </TouchableOpacity>

        {isExpanded && item.content.length > 0 && (
          <View style={styles.faqContent}>
            {item.content.map((sub: string, index: number) => (
              <TouchableOpacity key={index} style={styles.subItem}>
                <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>{sub}</AppText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <AppHeader title="Help & Support" onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AppText font={AppFonts.Medium} size={24} color="#000" textAlign="center" style={styles.heroTitle}>
          How can we help you{"\n"}today?
        </AppText>

        <View style={styles.searchCard}>
          <TextInput
            placeholder="Search query"
            placeholderTextColor={Colors.black30}
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchBtn}>
            <AppText font={AppFonts.Medium} size={16} color={Colors.white}>Search</AppText>
          </TouchableOpacity>
        </View>

        <AppText font={AppFonts.Medium} size={18} color="#000" style={styles.sectionTitle}>
          Frequently asked questions
        </AppText>

        <View style={styles.faqWrapper}>
          {FAQ_DATA.map(renderFaqItem)}
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  heroTitle: {
    marginTop: 20,
    lineHeight: 32,
  },
  searchCard: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 15,
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontFamily: AppFonts.Regular,
    fontSize: 16,
    color: Colors.black,
  },
  searchBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 25,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: 35,
    marginBottom: 15,
  },
  faqWrapper: {
    gap: 12,
  },
  faqCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
  },
  faqCardExpanded: {
    borderColor: Colors.primary,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  faqHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  faqIcon: {
    width: 28,
    height: 28,
  },
  faqContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingLeft: 63, // Icon width + gap
  },
  subItem: {
    paddingVertical: 10,
  },
});
