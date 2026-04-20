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
import ShimmerPlaceholder from '../../../components/ShimmerPlaceholder';
import { productService } from '../../../services/productService';
import { useCartStore } from '../../../store/useCartStore';
import { useWishlistStore } from '../../../store/useWishlistStore';
import Toast from 'react-native-simple-toast';

const { width } = Dimensions.get('window');

const FILTERS = ['Sort', 'Filter', 'Price', 'Brands', 'Custom'];



const SearchResults = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const initialQuery = route.params?.query || '';
  const initialCategoryId = route.params?.categoryId || null;
  const categoryName = route.params?.categoryName || null;
  const isFeatured = route.params?.isFeatured || false;

  const { addItem, items } = useCartStore();
  const isInCart = (id: number) => items.some(item => item.id === id);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('Filter');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState<any[]>([]);
  const [loadingBanners, setLoadingBanners] = useState(false);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  React.useEffect(() => {
    handleSearch(searchQuery, initialCategoryId, 1, isFeatured, filters);
    fetchBanners();
  }, [initialCategoryId, isFeatured, filters]);

  const fetchBanners = async () => {
    try {
      setLoadingBanners(true);
      // Fetch featured products or related items for the banner
      const res = await productService.getProducts({ featured: true, per_page: 5 });
      if (res && res.length > 0) {
        setBanners(res);
      } else {
        // Fallback to top products if no featured
        const fallback = await productService.getProducts({ per_page: 5 });
        setBanners(fallback);
      }
    } catch (error) {
      console.log('Banner Fetch Error:', error);
    } finally {
      setLoadingBanners(false);
    }
  };

  const handleSearch = async (query: string, catId?: any, pageNum = 1, featured = false, appliedFilters: any[] = []) => {
    try {
      console.log('--- SEARCH PARAMS ---', { query, catId, pageNum, featured, appliedFilters });
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const params: any = {
        per_page: 20,
        page: pageNum
      };
      if (query) params.search = query;
      if (catId) params.category = catId;
      if (featured) params.featured = true;

      // Apply filters from FilterScreen
      appliedFilters.forEach(f => {
        if (f.type === 'category') params.category = f.id;
        if (f.type === 'price') {
          if (f.min !== undefined) params.min_price = f.min;
          if (f.max !== undefined) params.max_price = f.max;
        }
      });

      console.log('--- FINAL API PARAMS ---', params);
      let res = await productService.getProducts(params);
      console.log('--- API RESPONSE LENGTH ---', res?.length);

      // Local filtering for Rating (as WC API doesn't support it natively for /products)
      const ratingFilter = appliedFilters.find(f => f.type === 'rating');
      if (ratingFilter) {
        res = res.filter((p: any) => parseFloat(p.average_rating || '4.5') >= ratingFilter.value);
        console.log('--- AFTER RATING FILTER ---', res?.length);
      }

      if (pageNum === 1) {
        setProducts(res);
      } else {
        setProducts(prev => [...prev, ...res]);
      }

      if (res.length < 20) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.log('Search API Error:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    handleSearch(searchQuery, initialCategoryId, 1, isFeatured, filters);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      handleSearch(searchQuery, initialCategoryId, nextPage, isFeatured, filters);
    }
  };

  const renderBannerItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      style={styles.bannerSlide}
    >
      <Image
        source={item.images?.[0]?.src ? { uri: item.images[0].src } : ImageAssets.banner1}
        style={styles.bannerImage}
        resizeMode="cover"
      />
      <View style={styles.bannerOverlay}>
        <AppText font={AppFonts.SemiBold} size={20} color={Colors.white} style={styles.bannerTitle} numberOfLines={2}>
          {item.name || 'Exclusive Offer'}
        </AppText>
        <AppText font={AppFonts.Regular} size={12} color={Colors.white} style={styles.bannerSubtitle} numberOfLines={2}>
          {item.short_description?.replace(/<[^>]*>?/gm, '') || 'Check out our latest arrivals and top deals for you!'}
        </AppText>
        <View style={styles.bannerBtn}>
          <AppText font={AppFonts.Regular} size={13} color={Colors.black}>₹{item.price} - Buy Now  →</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBanner = () => {
    if (loadingBanners) return <View style={[styles.bannerOuterContainer, { height: 180, backgroundColor: '#EEE', borderRadius: 20 }]} />;
    if (banners.length === 0) return null;

    return (
      <View style={styles.bannerOuterContainer}>
        <FlatList
          data={banners}
          renderItem={renderBannerItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / (width - 30));
            setActiveBannerIndex(index);
          }}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.pagination}>
          {banners.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeBannerIndex && styles.activeDotBanner]}
            />
          ))}
        </View>
      </View>
    );
  };

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

  const renderSkeletonItem = () => (
    <View style={styles.productCard}>
      <ShimmerPlaceholder height={150} borderRadius={0} />
      <View style={styles.productInfo}>
        <ShimmerPlaceholder height={14} width="80%" borderRadius={4} />
        <ShimmerPlaceholder height={16} width="40%" borderRadius={4} style={{ marginTop: 8 }} />
        <ShimmerPlaceholder height={25} width="60%" borderRadius={10} style={{ marginTop: 12, alignSelf: 'flex-end' }} />
      </View>
    </View>
  );

  const renderProduct = ({ item }: { item: any }) => {
    const isFav = isInWishlist(item.id);

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      >
        <View style={styles.productImgContainer}>
          <Image source={item.images?.[0]?.src ? { uri: item.images[0].src } : ImageAssets.watch} style={styles.productImg} resizeMode="contain" />
          <TouchableOpacity
            style={styles.heartBtn}
            onPress={() => toggleWishlist(item)}
          >
            <Image
              source={ImageAssets.wishlist}
              style={[styles.heartIcon, isFav && { tintColor: Colors.primary }]}
            />
          </TouchableOpacity>
          <View style={styles.ratingBadge}>
            <Image source={ImageAssets.star1} style={styles.starIconSmall} />
            <AppText font={AppFonts.SemiBold} size={10} color={Colors.black}>
              {parseFloat(item.average_rating) > 0 ? parseFloat(item.average_rating).toFixed(1) : '4.5'}
            </AppText>
          </View>
          <TouchableOpacity
            style={[styles.addBtn, isInCart(item.id) && { borderColor: Colors.black30 }]}
            onPress={() => {
              if (isInCart(item.id)) {
                (navigation as any).navigate('MyCart');
              } else if (item.type === 'variable') {
                navigation.navigate('ProductDetail', { product: item });
                Toast.show('Please select options', Toast.SHORT);
              } else {
                addItem(item);
                Toast.show('Added to Cart', Toast.SHORT);
              }
            }}
          >
            <Image source={ImageAssets.cart} style={[styles.addIcon, isInCart(item.id) && { tintColor: Colors.black30 }]} />
            <AppText font={AppFonts.Medium} size={10} color={isInCart(item.id) ? Colors.black30 : Colors.primary}>
              {isInCart(item.id) ? 'Added' : 'Add'}
            </AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.productInfo}>
          <AppText font={AppFonts.Regular} size={14} color={Colors.black} numberOfLines={1}>
            {item.name}
          </AppText>
          <View style={styles.priceRow}>
            {item.regular_price && item.regular_price !== item.price && (
              <AppText font={AppFonts.Regular} size={11} color={Colors.black30} style={styles.oldPrice}>
                ₹{item.regular_price}
              </AppText>
            )}
            <AppText font={AppFonts.SemiBold} size={14} color={Colors.black}>
              ₹{item.price}
            </AppText>
          </View>
          <View style={styles.sellerRow}>
            <View style={styles.sellerAvatar}>
              {item.store?.vendor_avatar && (
                <Image source={{ uri: item.store.vendor_avatar }} style={{ width: 14, height: 14, borderRadius: 7 }} />
              )}
            </View>
            <AppText font={AppFonts.Regular} size={13} color={Colors.black}>
              {item.store?.shop_name || 'Season Bazar'}
            </AppText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        isSearchMode
        placeholder="Watch"
        searchValue={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => handleSearch(searchQuery, initialCategoryId, 1, isFeatured, filters)}
        onBack={() => navigation.goBack()}
        onFilter={() => navigation.navigate('FilterScreen', { 
          currentFilters: { options: filters },
          onApply: (newFilters: any[]) => setFilters(newFilters)
        })}
      />
      <FlatList
        data={loading && products.length === 0 ? [1, 2, 3, 4, 5, 6] : products}
        renderItem={loading && products.length === 0 ? renderSkeletonItem : renderProduct}
        keyExtractor={(item, index) => `${item.id || item}-${index}`}
        numColumns={2}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          loadingMore ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <AppText size={14} color={Colors.textGrey}>Loading more...</AppText>
            </View>
          ) : null
        )}
        ListHeaderComponent={() => (
          <>
            {renderBanner()}
            {renderFilters()}
            {!loading && products.length === 0 && (
              <View style={{ padding: 50, alignItems: 'center' }}>
                <AppText font={AppFonts.Medium} color={Colors.textGrey} textAlign="center">
                  {categoryName
                    ? `No products found in "${categoryName}"`
                    : searchQuery
                      ? `No products found for "${searchQuery}"`
                      : "No products available at the moment"}
                </AppText>
              </View>
            )}
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
