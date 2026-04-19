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

import { productService } from '../../../services/productService';

const { width, height } = Dimensions.get('window');

const AllCategories = ({ navigation }: any) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  React.useEffect(() => {
    if (selectedCategoryId) {
      fetchProductsByCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const fetchCategories = async () => {
    try {
      setLoadingCats(true);
      const res = await productService.getCategories({ per_page: 50 });
      const mainCats = res.filter((c: any) => c.parent === 0 && c.name !== 'Uncategorized');
      setCategories(mainCats);
      if (mainCats.length > 0) {
        setSelectedCategoryId(mainCats[0].id);
      }
    } catch (error) {
      console.log('Fetch Cats Error:', error);
    } finally {
      setLoadingCats(false);
    }
  };

  const fetchProductsByCategory = async (id: number) => {
    try {
      setLoadingProducts(true);
      const res = await productService.getProducts({ category: id, per_page: 20 });
      setProducts(res);
    } catch (error) {
      console.log('Fetch Products Error:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const renderSidebar = () => (
    <View style={styles.sidebar}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map((item) => {
          const isSelected = selectedCategoryId === item.id;
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              key={item.id}
              onPress={() => setSelectedCategoryId(item.id)}
              style={[styles.sidebarItem]}
            >
              <View style={[styles.sidebarIconBg, isSelected && { backgroundColor: Colors.primary }]}>
                {item.image?.src ? (
                  <Image source={{ uri: item.image.src }} style={styles.sidebarIcon} resizeMode="contain" />
                ) : (
                  <Image source={ImageAssets.doll} style={[styles.sidebarIcon, isSelected && { tintColor: Colors.white }]} resizeMode="contain" />
                )}
              </View>
              <AppText
                font={isSelected ? AppFonts.SemiBold : AppFonts.Regular}
                size={12}
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

  const renderMainContent = () => {
    const selectedCatName = categories.find(c => c.id === selectedCategoryId)?.name || 'Products';

    if (loadingProducts) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <AppText font={AppFonts.Medium} color={Colors.textGrey}>Loading products...</AppText>
        </View>
      );
    }

    return (
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View style={styles.gridSection}>
          <View style={styles.gridHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Image source={ImageAssets.star1} style={{ width: 14, height: 14, resizeMode: 'contain' }} />
              <AppText font={AppFonts.SemiBold} size={15} color={Colors.black}>
                {selectedCatName}
              </AppText>
            </View>
          </View>
          <View style={styles.grid}>
            {products.length > 0 ? products.map((item) => (
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
                  <Image source={{ uri: item.images?.[0]?.src }} style={styles.gridItemImg} resizeMode="contain" />
                </LinearGradient>
                <AppText font={AppFonts.Regular} size={13} color={Colors.black} textAlign="center" numberOfLines={2}>
                  {item.name}
                </AppText>
                <AppText font={AppFonts.SemiBold} size={13} color={Colors.primary} textAlign="center">
                  ₹{item.price}
                </AppText>
              </TouchableOpacity>
            )) : (
              <View style={{ marginTop: 50, alignItems: 'center', width: '100%' }}>
                <AppText font={AppFonts.Medium} color={Colors.textGrey}>No products in this category</AppText>
              </View>
            )}
          </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="All Categories"
        onBack={() => navigation.goBack()}
        onSearch={() => navigation.navigate('SearchResults')}
      />
      <View style={styles.content}>
        {loadingCats ? (
          <View style={{ width: 90, backgroundColor: '#F1F4FF', justifyContent: 'center' }}>
            <AppText textAlign='center' size={10}>Loading...</AppText>
          </View>
        ) : renderSidebar()}
        <View style={styles.mainContentWrapper}>
          {renderMainContent()}
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
