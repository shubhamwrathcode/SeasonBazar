import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../../../components/AppHeader';

const { width } = Dimensions.get('window');

const FILTERS = ['Sort', 'Filter', 'Price', 'Brands', 'Custom'];

const SEARCH_RESULTS = [
  { id: '1', name: 'boat Lunar Discover....', price: '₹1,000', originalPrice: '₹3,000', rating: '4.5', seller: 'Srikant', image: ImageAssets.watch },
  { id: '2', name: 'boat Lunar Discover....', price: '₹1,000', originalPrice: '₹3,000', rating: '4.5', seller: 'Srikant', image: ImageAssets.watch },
  { id: '3', name: 'boat Lunar Discover....', price: '₹1,000', originalPrice: '₹3,000', rating: '4.5', seller: 'Srikant', image: ImageAssets.watch },
  { id: '4', name: 'boat Lunar Discover....', price: '₹1,000', originalPrice: '₹3,000', rating: '4.5', seller: 'Srikant', image: ImageAssets.watch },
];

const SearchResults = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('Filter');
  const bannerData = [1, 2, 3, 4, 5];

  const renderBannerItem = () => (
    <View style={styles.bannerSlide}>
      <Image source={ImageAssets.banner1} style={styles.bannerImage} resizeMode="cover" />
      <View style={styles.bannerOverlay}>
        <AppText font={AppFonts.SemiBold} size={20} color={Colors.white} style={styles.bannerTitle}>
          Get your Iphone{"\n"}17 Right Now
        </AppText>
        <AppText font={AppFonts.Regular} size={12} color={Colors.white} style={styles.bannerSubtitle}>
          Grab the new Iphone 17 now with exclusive deals, limited stock!
        </AppText>
        <TouchableOpacity style={styles.bannerBtn}>
          <AppText font={AppFonts.Regular} size={13} color={Colors.black}>Get It Now  →</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderBanner = () => (
    <View style={styles.bannerOuterContainer}>
      <FlatList
        data={bannerData}
        renderItem={renderBannerItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / (width - 30));
          setActiveBannerIndex(index);
        }}
        keyExtractor={(_, i) => i.toString()}
      />
      <View style={styles.pagination}>
        {bannerData.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeBannerIndex && styles.activeDotBanner]}
          />
        ))}
      </View>
    </View>
  );

  const renderFilters = () => (
    <View style={styles.filtersWrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
        {FILTERS.map((item, index) => {
          const isSelected = selectedFilter === item;
          const isFilterIcon = item === 'Filter';
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedFilter(item)}
              style={[styles.filterChip, isSelected && styles.filterChipActive]}
            >
              <AppText font={AppFonts.Regular} size={14} color={isSelected ? Colors.primary : Colors.black}>
                {item}
              </AppText>
              {isFilterIcon && <Image source={ImageAssets.filter} style={[styles.chipFilterIcon, isSelected && { tintColor: Colors.primary }]} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.productImgContainer}>
        <Image source={item.image} style={styles.productImg} resizeMode="contain" />
        <TouchableOpacity style={styles.heartBtn}>
          <Image source={ImageAssets.heart} style={styles.heartIcon} />
        </TouchableOpacity>
        <View style={styles.ratingBadge}>
          <Image source={ImageAssets.star1} style={styles.starIconSmall} />
          <AppText font={AppFonts.SemiBold} size={10} color={Colors.black}>{item.rating}</AppText>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Image source={ImageAssets.cart} style={styles.addIcon} />
          <AppText font={AppFonts.Medium} size={10} color={Colors.black}>Add</AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.productInfo}>
        <AppText font={AppFonts.Regular} size={14} color={Colors.black} numberOfLines={1}>
          {item.name}
        </AppText>
        <View style={styles.priceRow}>
          <AppText font={AppFonts.Regular} size={11} color={Colors.black30} style={styles.oldPrice}>
            {item.originalPrice}
          </AppText>
          <AppText font={AppFonts.SemiBold} size={14} color={Colors.black}>
            {item.price}
          </AppText>
        </View>
        <View style={styles.sellerRow}>
          <View style={styles.sellerAvatar}>
            <Image source={ImageAssets.profileBottom} style={styles.sellerIcon} />
          </View>
          <AppText font={AppFonts.Regular} size={13} color={Colors.black}>{item.seller}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppHeader
        isSearchMode
        placeholder="Watch"
        onBack={() => navigation.goBack()}
        onFilter={() => navigation.navigate('FilterScreen')}
      />
      <FlatList
        data={SEARCH_RESULTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={() => (
          <>
            {renderBanner()}
            {renderFilters()}
          </>
        )}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  listContent: {
    paddingBottom: 20,
  },
  bannerOuterContainer: {
    width: width - 30,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  bannerSlide: {
    width: width - 30,
    height: 180,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    justifyContent: 'center',
  },
  bannerTitle: {
    lineHeight: 30,
  },
  bannerSubtitle: {
    marginTop: 8,
    width: '70%',
    opacity: 0.8,
  },
  bannerBtn: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  pagination: {
    position: 'absolute',
    bottom: 12,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 3,
  },
  activeDotBanner: {
    backgroundColor: Colors.white,
    width: 15,
  },
  filtersWrapper: {
    marginBottom: 15,
  },
  filtersScroll: {
    paddingHorizontal: 15,
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  filterChipActive: {
    backgroundColor: '#390BCA1A',
    borderColor: Colors.primary,
  },
  chipFilterIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.primary,
    resizeMode: "contain"
  },
  columnWrapper: {
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 45) / 2,
    backgroundColor: Colors.white,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDDDDDCC',
  },
  productImgContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#F8F9FB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productImg: {
    width: '80%',
    height: '80%',
  },
  heartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.black30,
    resizeMode: "contain"
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 3,
  },
  starIconSmall: {
    width: 10,
    height: 10,
    tintColor: '#FFC529',
  },
  addBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
    justifyContent: "center",
  },
  addIcon: {
    width: 12,
    height: 12,
    tintColor: Colors.primary,
    resizeMode: "contain"
  },
  productInfo: {
    padding: 10,
    backgroundColor: Colors.white,
    borderTopColor: '#DDDDDDCC',
    borderTopWidth: 0.5
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  sellerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerIcon: {
    width: 12,
    height: 12,
    tintColor: Colors.black30,
  },
});
