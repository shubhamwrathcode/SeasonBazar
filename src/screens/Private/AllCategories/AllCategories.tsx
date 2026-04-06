import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AppHeader from '../../../components/AppHeader';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const SIDEBAR_ITEMS = [
  { id: '1', name: 'Dolls', icon: ImageAssets.doll },
  { id: '2', name: 'Pooja Product', icon: ImageAssets.tradition },
  { id: '3', name: 'Smart Gadget', icon: ImageAssets.electric },
  { id: '4', name: 'Mother & Kids', icon: ImageAssets.motherkids },
  { id: '5', name: 'Home & Garden', icon: ImageAssets.homeGarden },
  { id: '6', name: 'Bag Bazaar', icon: ImageAssets.motherkids },
  { id: '7', name: 'Appliances', icon: ImageAssets.appliances },
  { id: '8', name: 'Sports', icon: ImageAssets.sports },
  { id: '9', name: 'Beauty', icon: ImageAssets.beauty },
];

const GADGETS = [
  { id: '1', name: 'Mobile', image: ImageAssets.electric },
  { id: '2', name: 'Smart Watch', image: ImageAssets.watch },
  { id: '3', name: 'Head Phone', image: ImageAssets.headphone },
  { id: '4', name: 'Neckbands', image: ImageAssets.headphone },
  { id: '5', name: 'Party Speakers', image: ImageAssets.headphone },
  { id: '6', name: 'Soundbar', image: ImageAssets.electric },
  { id: '7', name: 'Smart Band', image: ImageAssets.electric },
  { id: '8', name: 'Smart Tags', image: ImageAssets.watch },
  { id: '9', name: 'Smart Ring', image: ImageAssets.watch },
];

const ACCESSORIES = [
  { id: '1', name: 'Mobile Chargers', image: ImageAssets.electric },
  { id: '2', name: 'Mobile Cables', image: ImageAssets.headphone },
  { id: '3', name: 'Powerbank', image: ImageAssets.watch },
  { id: '4', name: 'Mobile Chargers', image: ImageAssets.electric },
  { id: '5', name: 'Mobile Cables', image: ImageAssets.headphone },
  { id: '6', name: 'Powerbank', image: ImageAssets.watch },
  { id: '7', name: 'Mobile Chargers', image: ImageAssets.electric },
  { id: '8', name: 'Mobile Cables', image: ImageAssets.headphone },
  { id: '9', name: 'Powerbank', image: ImageAssets.watch },
];

const AllCategories = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState('3');

  const renderSidebar = () => (
    <View style={styles.sidebar}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {SIDEBAR_ITEMS.map((item) => {
          const isSelected = selectedCategory === item.id;
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              key={item.id}
              onPress={() => setSelectedCategory(item.id)}
              style={[styles.sidebarItem,]}
            >
              {isSelected ? (
                <LinearGradient
                  colors={['#ffe59eff', '#562CDA']}
                  style={styles.sidebarIconBg}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Image source={item.icon} style={styles.sidebarIcon} resizeMode="contain" />
                </LinearGradient>
              ) : (
                <View style={styles.sidebarIconBg}>
                  <Image source={item.icon} style={styles.sidebarIcon} resizeMode="contain" />
                </View>
              )}
              <AppText
                font={AppFonts.Regular}
                size={14}
                color={isSelected ? Colors.primary : Colors.black}
                textAlign="center"
              >
                {item.name}
              </AppText>
              {isSelected && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderGridSection = (title: string, data: any[]) => (
    <View style={styles.gridSection}>
      <View style={styles.gridHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Image source={ImageAssets.star} style={{ width: 14, height: 14, resizeMode: 'contain' }} />
          <AppText font={AppFonts.SemiBold} size={15} color={Colors.black}>
            {title}
          </AppText>
        </View>
      </View>
      <View style={styles.grid}>
        {data.map((item) => (
          <TouchableOpacity 
            activeOpacity={0.9} 
            key={item.id} 
            style={styles.gridItem}
            onPress={() => (navigation as any).navigate('ProductDetail', { product: item })}
          >
            <LinearGradient
              colors={['#F3EEFF', '#BFAEFF']}
              style={styles.gridItemImgBg}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image source={item.image} style={styles.gridItemImg} resizeMode="contain" />
            </LinearGradient>
            <AppText font={AppFonts.Regular} size={13} color={Colors.black} textAlign="center" numberOfLines={2}>
              {item.name}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader
        title="All Categories"
        onBack={() => navigation.goBack()}
        onSearch={() => navigation.navigate('SearchResults')}
      />
      <View style={styles.content}>
        {renderSidebar()}
        <View style={styles.mainContentWrapper}>
          <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
            {renderGridSection('All Smart Gadgets', GADGETS)}
            {renderGridSection('Accessories', ACCESSORIES)}
            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 90,
    backgroundColor: '#F1F4FF',
  },
  sidebarItem: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#562CDA1A',
  },
  sidebarItemSelected: {
    // backgroundColor: Colors.white,
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 5,
    bottom: 5,
    width: 5,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  sidebarIconBg: {
    width: 60,
    height: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  sidebarIcon: {
    width: '80%',
    height: '80%',
  },
  mainContentWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 15,
  },
  gridSection: {
    marginTop: 20,
  },
  gridHeader: {
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
  },
  gridItemImgBg: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 15,
    backgroundColor: '#F0F1FF',
    borderWidth: 1,
    borderColor: '#E8EDFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  gridItemImg: {
    width: '75%',
    height: '75%',
  },
});
