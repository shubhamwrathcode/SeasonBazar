import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  FlatList,
} from 'react-native';
import { ImageAssets } from '../../../components/ImageAssets';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { productService } from '../../../services/productService';
import { useAuthStore } from '../../../store/useAuthStore';

const { width } = Dimensions.get('window');


const Home = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user }: any = useAuthStore();
  const [activeTab, setActiveTab] = React.useState('All');
  const [activeBannerIndex, setActiveBannerIndex] = React.useState(0);
  const [products, setProducts] = React.useState<any[]>([]);
  const [featuredProducts, setFeaturedProducts] = React.useState<any[]>([]);
  const [wooCategories, setWooCategories] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // const bannerData = [1, 2, 3, 4, 5];

  React.useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchProducts = async (catId?: string | number, search?: string) => {
    try {
      setLoading(true);
      const res = await productService.getProducts({ 
        category: catId !== 'All' ? catId : undefined,
        search: search || undefined,
        per_page: 20 
      });
      console.log('--- HOME PRODUCTS API RESPONSE ---', res);
      setProducts(res);
    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await productService.getCategories({ per_page: 50 });
      console.log('--- CATEGORIES API RESPONSE ---', res);
      setWooCategories(res.filter((c: any) => c.name !== 'Uncategorized'));
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes, featuredRes] = await Promise.all([
        productService.getProducts({ per_page: 10 }),
        productService.getCategories({ per_page: 10 }),
        productService.getProducts({ featured: true, per_page: 5 }),
      ]);
      setProducts(productsRes);
      setFeaturedProducts(featuredRes);
      setWooCategories(categoriesRes.filter((cat: any) => cat.name !== 'Uncategorized'));
    } catch (error) {
      console.log('Home Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      <View style={styles.locationRow}>
        <Image source={ImageAssets.location} style={styles.headerIcon} />
        <AppText font={AppFonts.Regular} size={14} color={Colors.white} style={styles.locationText} numberOfLines={1}>
          {user ? `Deliver to ${user.user_display_name || user.user_email}` : 'Login to see your address'}
        </AppText>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Image source={ImageAssets.search} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.black30}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={ImageAssets.bell} style={styles.bellIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton}>
          <Image source={ImageAssets.cart} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('All')}
          style={styles.tabItem}
        >
          <AppText
            font={activeTab === 'All' ? AppFonts.SemiBold : AppFonts.Regular}
            size={14}
            color={Colors.white}
          >
            All
          </AppText>
          {activeTab === 'All' && <View style={styles.activeBar} />}
        </TouchableOpacity>

        {wooCategories.slice(0, 5).map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.name)}
            style={styles.tabItem}
          >
            <AppText
              font={activeTab === tab.name ? AppFonts.SemiBold : AppFonts.Regular}
              size={14}
              color={Colors.white}
            >
              {tab.name}
            </AppText>
            {activeTab === tab.name && <View style={styles.activeBar} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderBannerItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => (navigation as any).navigate('ProductDetail', { product: item })}
      style={styles.bannerSlide}
    >
      <Image
        source={item.images?.[0]?.src ? { uri: item.images[0].src } : ImageAssets.banner1}
        style={styles.bannerImage}
        resizeMode="cover"
      />
      <View style={styles.bannerOverlay}>
        <AppText font={AppFonts.SemiBold} size={20} color={Colors.white} style={styles.bannerTitle} numberOfLines={2}>
          {item.name || 'Exciting Offer!'}
        </AppText>
        <AppText font={AppFonts.Regular} size={12} color={Colors.white} style={styles.bannerSubtitle} numberOfLines={2}>
          {item.short_description?.replace(/<[^>]*>?/gm, '') || 'Limited time offer on this featured product. Grab it now!'}
        </AppText>
        <View style={styles.bannerBtn}>
          <AppText font={AppFonts.Regular} size={13} color={Colors.black}>₹{item.price} - Get It Now  →</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBanner = () => {
    const displayBanners = featuredProducts.length > 0 ? featuredProducts : [1]; // fallback

    return (
      <View style={styles.bannerContainer}>
        <FlatList
          data={displayBanners}
          renderItem={renderBannerItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / (width - 30));
            setActiveBannerIndex(index);
          }}
          keyExtractor={(item, i) => item.id?.toString() || i.toString()}
        />
        <View style={styles.pagination}>
          {displayBanners.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeBannerIndex && styles.activeDotBanner]}
            />
          ))}
        </View>
      </View>
    );
  };

  const renderCategories = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Image source={ImageAssets.star} style={{ width: 20, height: 20, resizeMode: "contain" }} />
          <AppText font={AppFonts.Medium} size={18} color={Colors.black}>Categories</AppText>
        </View>
        <TouchableOpacity onPress={() => (navigation as any).navigate('AllCategories')}>
          <AppText font={AppFonts.Regular} size={14} color={Colors.primary}>See All</AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryGrid}>
        {loading ? (
          // Placeholder for Categories
          [1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} style={styles.categoryItem}>
              <View style={[styles.categoryImgBg, { backgroundColor: '#F0F0F0' }]} />
              <View style={[styles.categoryName, { height: 10, width: '60%', backgroundColor: '#EEE', marginTop: 10, alignSelf: 'center' }]} />
            </View>
          ))
        ) : (
          wooCategories.slice(0, 6).map((item) => (
            <View key={item.id} style={styles.categoryItem}>
              <View style={styles.categoryImgBg}>
                <Image
                  source={item.image?.src ? { uri: item.image.src } : ImageAssets.uncheck}
                  style={styles.categoryImg}
                  resizeMode="contain"
                />
              </View>
              <AppText font={AppFonts.Regular} size={12} color={Colors.black} textAlign="center" style={styles.categoryName}>
                {item.name}
              </AppText>
            </View>
          ))
        )}
      </View>
    </View>
  );

  const renderProduct = ({ item, isGrid }: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => (navigation as any).navigate('ProductDetail', { product: item })}
      style={isGrid ? styles.productCardGrid : styles.productCard}
    >
      <View style={styles.productImageContainer}>
        <Image
          source={item.images?.[0]?.src ? { uri: item.images[0].src } : ImageAssets.dollitem}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.wishlistBtn}>
          <Image source={ImageAssets.wishlist} style={styles.heartIcon} />
        </TouchableOpacity>
        <View style={styles.ratingBadge}>
          <AppText font={AppFonts.SemiBold} size={13} color={Colors.black}>⭐ {item.average_rating || '4.5'}</AppText>
        </View>
        <TouchableOpacity activeOpacity={0.9} style={styles.floatingAddBtn}>
          <Image source={ImageAssets.cart} style={styles.bagIcon} />
          <AppText font={AppFonts.Medium} size={15} color={Colors.primary}>Add</AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <AppText font={AppFonts.Regular} size={16} color={Colors.textGrey} numberOfLines={1}>
          {item.name || 'Product Name'}
        </AppText>
        <View style={styles.priceRow}>
          {item.regular_price !== item.price && (
            <AppText font={AppFonts.Regular} size={14} color={Colors.black30} style={styles.oldPrice}>₹{item.regular_price}</AppText>
          )}
          <AppText font={AppFonts.Medium} size={18} color={Colors.black}>₹{item.price || '0'}</AppText>
        </View>
        <View style={styles.sellerRow}>
          <View style={styles.sellerAvatar}>
            {item.store?.vendor_id && (
              <Image source={{ uri: item.store?.vendor_avatar }} style={{ width: 20, height: 20, borderRadius: 10 }} />
            )}
          </View>
          <AppText font={AppFonts.Regular} size={14} color={Colors.black}>
            {item.store?.shop_name || item.store?.name || 'Season Bazar'}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPromoGrid = () => {
    if (loading || wooCategories.length < 4) return null; // Hide if loading or not enough data

    return (
      <LinearGradient
        colors={['#2FD06A', '#CAFFDD']}
        style={styles.promoContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.promoGrid}>
          {wooCategories.slice(6, 12).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.promoItem}
              activeOpacity={0.9}
              onPress={() => (navigation as any).navigate('AllCategories', { categoryId: item.id })}
            >
              <View style={styles.promoImgBg}>
                <Image
                  source={item.image?.src ? { uri: item.image.src } : ImageAssets.uncheck}
                  style={styles.promoImg}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.promoLabelBg}>
                <AppText font={AppFonts.Medium} size={14} color={Colors.black} textAlign="center">
                  {item.name}
                </AppText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {renderBanner()}
        {renderCategories()}

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.rowAlign}>
              <Image source={ImageAssets.star} style={styles.starIcon} />
              <AppText font={AppFonts.Medium} size={18} color={Colors.black}>Flash Deals</AppText>
              <View style={styles.timerBadge}>
                <AppText color="#FFB13B" font={AppFonts.SemiBold} size={14}>⚡ 12:43:26</AppText>
              </View>
            </View>
            <TouchableOpacity><AppText font={AppFonts.Regular} size={16} color={Colors.primary}>See All</AppText></TouchableOpacity>
          </View>
          {loading ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[1, 2, 3]}
              renderItem={() => (
                <View style={styles.productCard}>
                  <View style={[styles.productImageContainer, { backgroundColor: '#F0F0F0' }]} />
                  <View style={{ height: 15, width: '80%', backgroundColor: '#EEE', marginTop: 20 }} />
                  <View style={{ height: 15, width: '50%', backgroundColor: '#EEE', marginTop: 10 }} />
                </View>
              )}
              contentContainerStyle={styles.productList}
            />
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={products.slice(0, 5)}
              renderItem={({ item }) => renderProduct({ item, isGrid: false })}
              keyExtractor={(item) => item.id?.toString()}
              contentContainerStyle={styles.productList}
            />
          )}
        </View>

        {renderBanner()}

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <AppText font={AppFonts.Medium} size={18} color={Colors.black}>✨ Featured Products</AppText>
            <TouchableOpacity><AppText font={AppFonts.Regular} size={14} color={Colors.primary}>See All</AppText></TouchableOpacity>
          </View>
          <FlatList
            numColumns={2}
            data={products.slice(5, 10)}
            renderItem={({ item }) => renderProduct({ item, isGrid: true })}
            keyExtractor={(item) => item.id?.toString()}
            scrollEnabled={false}
            columnWrapperStyle={styles.productRow}
            contentContainerStyle={styles.featuredGrid}
          />
        </View>

        {renderPromoGrid()}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.white,
    marginRight: 6,
    resizeMode: "contain"
  },
  locationText: {
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 45,
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    resizeMode: 'contain'
  },
  searchInput: {
    flex: 1,
    fontFamily: AppFonts.Regular,
    fontSize: 14,
    color: Colors.black,
    padding: 0,
  },
  iconButton: {
    marginRight: 10,
  },
  bellIcon: {
    width: 30,
    height: 30,
  },
  cartButton: {
    backgroundColor: '#FFB13B',
    padding: 8,
    borderRadius: 8,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  cartIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain"
  },
  tabsContainer: {
    marginTop: 5,
  },
  tabItem: {
    marginRight: 35,
    alignItems: 'center',
    paddingBottom: 15,
  },
  activeBar: {
    width: 35,
    height: 4,
    borderRadius: 10,
    backgroundColor: Colors.white,
    position: "absolute",
    bottom: 0
  },
  scrollContent: {
    paddingBottom: 50,
  },
  bannerContainer: {
    width: width - 30,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 20,
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
  sectionContainer: {
    marginTop: 25,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  timerBadge: {
    backgroundColor: '#FFF8ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '31%',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryImgBg: {
    width: '100%',
    height: 100,
    borderRadius: 20,
    backgroundColor: '#F4F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EDFF',
  },
  categoryImg: {
    width: '75%',
    height: '75%',
  },
  categoryName: {
    marginTop: 10,
    fontSize: 14,
  },
  productList: {
    paddingRight: 15,
  },
  productCard: {
    width: (width - 45) / 1.6,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 12,
    marginRight: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  productCardGrid: {
    width: '48.5%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productImageContainer: {
    width: '100%',
    height: 130,
    borderRadius: 15,
    overflow: 'visible',
    position: 'relative',
    backgroundColor: '#F8F9FB',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.white,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  floatingAddBtn: {
    position: 'absolute',
    bottom: -15,
    right: 0,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bagIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    tintColor: Colors.primary,
    resizeMode: 'contain',
  },
  productInfo: {
    marginTop: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 5,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  sellerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  featuredGrid: {
    paddingBottom: 20,
  },
  promoContainer: {
    margin: 15,
    borderRadius: 20,
    padding: 20,
  },
  promoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // backgroundColor: "red"
  },
  promoItem: {
    width: '48%',
    marginBottom: 20,
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
    overflow: 'hidden',
    padding: 10
  },
  promoImgBg: {
    height: 120,
    backgroundColor: '#E9E9FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  promoImg: {
    width: '80%',
    height: '80%',
  },
  promoLabelBg: {
    paddingVertical: 10,
    backgroundColor: '#EEEEEE',
  },
});
