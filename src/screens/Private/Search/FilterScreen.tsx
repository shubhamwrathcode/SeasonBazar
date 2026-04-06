import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import AppHeader from '../../../components/AppHeader';

const { width } = Dimensions.get('window');

const FILTER_CATEGORIES = [
  'Categories',
  'Price',
  'Storage Capacity',
  'Processor Type',
  'Color',
  'Brands',
  'Customer Rating',
  'Show Only',
  'Operating System',
];

const CATEGORY_OPTIONS: { [key: string]: any[] } = {
  Categories: [
    { id: '1', name: 'Top Products (601)' },
    { id: '2', name: 'Bag & Sports (11)' },
    { id: '3', name: 'Bag Bazaar (246)' },
    { id: '4', name: 'Bags (54)' },
    { id: '5', name: 'Birthday (2)' },
    { id: '6', name: 'Books (2)' },
    { id: '7', name: 'Bracelet/Kankanam (261)' },
    { id: '8', name: 'Cakes (3)' },
    { id: '9', name: 'Combo Gifts (41)' },
  ],
  Price: [
    { id: 'p1', name: 'Below to Rs. 1000' },
    { id: 'p2', name: 'Rs. 1000 to Rs. 5000' },
    { id: 'p3', name: 'Rs. 5000 to Rs. 10000' },
    { id: 'p4', name: 'Rs. 10000 to Rs. 15000' },
    { id: 'p5', name: 'Rs. 15000 to Rs. 20000' },
    { id: 'p6', name: 'Rs. 20000 to Above' },
  ],
  'Storage Capacity': [
    { id: 's1', name: '128 GB' },
    { id: 's2', name: '256 GB' },
    { id: 's3', name: '64 GB' },
  ],
  Color: [
    { id: 'c1', name: 'Black', color: '#000000' },
    { id: 'c2', name: 'Blue', color: '#0000FF' },
    { id: 'c3', name: 'Red', color: '#FF0000' },
    { id: 'c4', name: 'Sliver', color: '#A9A9A9' },
    { id: 'c5', name: 'Yellow', color: '#FFFF00' },
    { id: 'c6', name: 'White', color: '#F0F0FF' },
  ],
  Brands: [
    { id: 'b1', name: 'Muuto' },
    { id: 'b2', name: 'Nature' },
    { id: 'b3', name: 'Smeg' },
    { id: 'b4', name: 'WestSide' },
  ],
};

const FilterScreen = ({ navigation }: any) => {
  const [activeCategory, setActiveCategory] = useState('Categories');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderSidebar = () => (
    <View style={styles.sidebar}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {FILTER_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
            >
              <AppText font={isActive ? AppFonts.SemiBold : AppFonts.Regular} size={15} color={isActive ? Colors.primary : '#535353CC'}>
                {cat}
              </AppText>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderHeading = () => {
    switch (activeCategory) {
      case 'Categories': return 'All Categories';
      case 'Price': return 'Choose a price range below';
      case 'Color': return 'Choose a Color';
      case 'Brands': return 'All Brands';
      default: return `Choose ${activeCategory}`;
    }
  };

  const renderContent = () => {
    const options = CATEGORY_OPTIONS[activeCategory] || [];
    const filteredOptions = options.filter(opt =>
      opt.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <View style={styles.contentArea}>
        {(activeCategory === 'Brands' || activeCategory === 'Categories') && (
          <View style={styles.searchBar}>
            <Image source={ImageAssets.search} style={styles.searchIcon} />
            <TextInput
              placeholder={`Search ${activeCategory === 'Brands' ? 'Brand' : 'Category'}`}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}

        <AppText font={AppFonts.SemiBold} size={16} color={Colors.black} style={styles.categoryHeading}>
          {renderHeading()}
        </AppText>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {filteredOptions.map((opt) => {
            const isChecked = selectedOptions.includes(opt.id);
            return (
              <TouchableOpacity
                key={opt.id}
                onPress={() => toggleOption(opt.id)}
                style={styles.optionRow}
              >
                <View style={[styles.checkbox, {
                  borderWidth: isChecked ? 0 : 1.5,
                  borderColor: Colors.primary,
                }]}>
                  {isChecked && <Image source={ImageAssets.check} style={styles.checkIcon} />}
                </View>
                {opt.color && (
                  <View style={[styles.colorCircle, { backgroundColor: opt.color }]} />
                )}
                <AppText font={AppFonts.Regular} size={15} color={Colors.black}>
                  {opt.name}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Filter" onBack={() => navigation.goBack()} />
      <View style={styles.mainWrapper}>
        {renderSidebar()}
        {renderContent()}
      </View>
      <View style={styles.footer}>
        <View>
          <AppText font={AppFonts.Regular} size={16} color={Colors.black}>5</AppText>
          <AppText font={AppFonts.Regular} size={15} color={Colors.black30}>Product Found</AppText>
        </View>
        <TouchableOpacity style={styles.applyBtn} onPress={() => navigation.goBack()}>
          <AppText font={AppFonts.Medium} size={18} color={Colors.white}>Apply Filter</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 140,
    backgroundColor: Colors.white,
  },
  sidebarItem: {
    paddingVertical: 18,
    paddingHorizontal: 15,
    position: 'relative',
    // borderBottomWidth: 1,
    backgroundColor: '#2E44751A',
  },
  sidebarItemActive: {
    backgroundColor: Colors.lightPurple,
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 5,
    bottom: 5,
    width: 3,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  contentArea: {
    flex: 1,
    padding: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.black30,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: AppFonts.Regular,
    fontSize: 16,
    color: Colors.black,
    padding: 0,
  },
  categoryHeading: {
    marginBottom: 15,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 10,
    marginBottom: 10,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,

    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: Colors.white,
  },
  checkIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#F8F9FB',
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
