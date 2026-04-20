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
import { productService } from '../../../services/productService';
import ShimmerPlaceholder from '../../../components/ShimmerPlaceholder';

const { width } = Dimensions.get('window');

const INITIAL_FILTER_CATEGORIES = [
  'Categories',
  'Price',
  'Color',
  'Brands',
  'Rating',
];

const FilterScreen = ({ navigation, route }: any) => {
  const { onApply, currentFilters } = route.params || {};
  
  const [activeCategory, setActiveCategory] = useState('Categories');
  const [selectedOptions, setSelectedOptions] = useState<any[]>(currentFilters?.options || []);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [categories, setCategories] = useState<any[]>([]);
  const [attributes, setAttributes] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  React.useEffect(() => {
    fetchAllFilterData();
  }, []);

  const fetchAllFilterData = async () => {
    try {
      setLoading(true);
      const [cats, attrs] = await Promise.all([
        productService.getCategories({ per_page: 100 }),
        productService.getAttributes()
      ]);

      // Filter main categories
      const mainCats = cats.filter((c: any) => c.parent === 0 && c.name !== 'Uncategorized');
      setCategories(mainCats);

      // Fetch terms for each attribute
      const attrData: any = {};
      if (attrs && attrs.length > 0) {
        for (const attr of attrs) {
          const terms = await productService.getAttributeTerms(attr.id);
          attrData[attr.name] = terms.map((t: any) => ({
            id: t.id,
            name: t.name,
            slug: t.slug,
            taxonomy: t.taxonomy
          }));
        }
      }
      setAttributes(attrData);
    } catch (error) {
      console.log('Filter Data Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleOption = (opt: any) => {
    setSelectedOptions((prev) => {
      const exists = prev.find(p => p.id === opt.id);
      if (exists) return prev.filter(p => p.id !== opt.id);
      return [...prev, opt];
    });
  };

  const handleApply = () => {
    if (onApply) {
      onApply(selectedOptions);
      navigation.goBack();
    }
  };

  const getOptionsForActiveCategory = () => {
    if (activeCategory === 'Categories') {
      return categories.map(c => ({ id: c.id, name: c.name, type: 'category' }));
    }
    if (activeCategory === 'Price') {
      return [
        { id: 'p1', name: 'Below ₹1,000', min: 0, max: 1000, type: 'price' },
        { id: 'p2', name: '₹1,000 - ₹5,000', min: 1000, max: 5000, type: 'price' },
        { id: 'p3', name: '₹5,000 - ₹10,000', min: 5000, max: 10000, type: 'price' },
        { id: 'p4', name: 'Above ₹10,000', min: 10000, max: 999999, type: 'price' },
      ];
    }
    if (activeCategory === 'Rating') {
       return [
         { id: 'r4', name: '4 Stars & Above', value: 4, type: 'rating' },
         { id: 'r3', name: '3 Stars & Above', value: 3, type: 'rating' },
       ];
    }
    return attributes[activeCategory] || [];
  };

  const filterList = [...INITIAL_FILTER_CATEGORIES, ...Object.keys(attributes).filter(a => !INITIAL_FILTER_CATEGORIES.includes(a))];

  const renderSidebar = () => (
    <View style={styles.sidebar}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
             <View key={i} style={{ padding: 15 }}>
               <ShimmerPlaceholder height={15} width="80%" />
             </View>
          ))
        ) : (
          filterList.map((cat) => {
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
          })
        )}
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
    const options = getOptionsForActiveCategory();
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
          {loading ? (
             [1, 2, 3, 4, 5].map(i => (
               <View key={i} style={{ padding: 10, flexDirection: 'row', gap: 10 }}>
                 <ShimmerPlaceholder height={20} width={20} borderRadius={4} />
                 <ShimmerPlaceholder height={20} width="70%" />
               </View>
             ))
          ) : (
            filteredOptions.map((opt) => {
              const isChecked = selectedOptions.some(o => o.id === opt.id);
              return (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => toggleOption(opt)}
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
            })
          )}
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
          <AppText font={AppFonts.Regular} size={16} color={Colors.black}>{selectedOptions.length}</AppText>
          <AppText font={AppFonts.Regular} size={15} color={Colors.black30}>Filters Selected</AppText>
        </View>
        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
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
