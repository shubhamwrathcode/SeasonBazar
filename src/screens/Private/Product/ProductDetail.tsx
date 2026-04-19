import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';

import LinearGradient from 'react-native-linear-gradient';
import { useCartStore } from '../../../store/useCartStore';
import { useWishlistStore } from '../../../store/useWishlistStore';
import { productService } from '../../../services/productService';
import SimpleToast from 'react-native-simple-toast';

const { width } = Dimensions.get('window');

const HIGHLIGHTS = [
  { id: '1', title: '37.084 mm Display', icon: ImageAssets.display },
  { id: '2', title: 'With Touchscreen', icon: ImageAssets.touch },
  { id: '3', title: 'With Bluetooth', icon: ImageAssets.bluetooth },
  { id: '4', title: 'With Hear Rate Monitor', icon: ImageAssets.heart },
];

const SIMILAR_PRODUCTS = [
  { id: '1', name: 'Noise ColorFit Pro 6 ...', price: '₹1,000', originalPrice: '₹3,000', rating: '4.5', image: ImageAssets.watch },
  { id: '2', name: 'Noise ColorFit Pro 6 ...', price: '₹1,000', originalPrice: '₹3,000', rating: '4.5', image: ImageAssets.watch },
  { id: '3', name: 'Noise ColorFit Pro 6 ...', price: '₹1,000', originalPrice: '₹3,000', rating: '4.5', image: ImageAssets.watch },
];

const ProductDetail = ({ navigation, route }: any) => {
  const { product } = route.params || {};
  const insets = useSafeAreaInsets();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const mainListRef = React.useRef<FlatList>(null);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFav = isInWishlist(product?.id);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  React.useEffect(() => {
    if (product?.id) {
      fetchReviews();
      fetchSimilarProducts();
    }
  }, [product?.id]);

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      const res = await productService.getProductReviews(product.id);
      console.log('--- PRODUCT REVIEWS API RESPONSE ---', res);
      setReviews(res);
    } catch (error) {
      console.log('Reviews Error:', error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      setLoadingSimilar(true);
      if (product?.related_ids && product.related_ids.length > 0) {
        const res = await productService.getProducts({ include: product.related_ids.slice(0, 10).join(',') });
        console.log('--- SIMILAR PRODUCTS API RESPONSE ---', res);
        setSimilarProducts(res);
      }
    } catch (error) {
      console.log('Similar Products Error:', error);
    } finally {
      setLoadingSimilar(false);
    }
  };

  const productImages = product?.images || [];

  // Helper to remove HTML tags cleanly
  const stripHtml = (html: string) => {
    if (!html) return '';
    return html
      .replace(/<li>/g, '\n• ') // Replace list items with bullets
      .replace(/<\/?[^>]+(>|$)/g, '') // Remove all other tags
      .replace(/&nbsp;/g, ' ')
      .replace(/\n\s*\n/g, '\n') // Remove extra empty lines
      .trim();
  };

  const onThumbnailPress = (index: number) => {
    setActiveImageIndex(index);
    mainListRef.current?.scrollToIndex({ index, animated: true });
  };

  // Helper to get vendor's processing time or calculate fallback
  const getDeliveryInfo = () => {
    // Check if Dokan processing time exists in meta_data
    const processingTime = product?.meta_data?.find((m: any) => m.key === '_dps_processing_time')?.value;
    
    if (processingTime && processingTime !== '') {
      return `Processing: ${processingTime} | Delivery Soon`;
    }

    const date = new Date();
    date.setDate(date.getDate() + 5); 
    const formattedDate = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    return `Delivery by ${formattedDate} | 5-7 Working Days`;
  };

  const renderThumbnail = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      onPress={() => onThumbnailPress(index)}
      style={[styles.thumbnailWrap, activeImageIndex === index && styles.thumbnailActive]}
    >
      <Image source={{ uri: item.src }} style={styles.thumbnailImg} resizeMode="contain" />
    </TouchableOpacity>
  );

  const renderMainImage = ({ item }: { item: any }) => (
    <View style={styles.mainImgContainer}>
      <Image source={{ uri: item.src }} style={styles.mainImg} resizeMode="contain" />
    </View>
  );

  const renderSimilarProduct = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.similarCard}
      onPress={() => (navigation as any).push('ProductDetail', { product: item })}
    >
      <View style={styles.similarImgContainer}>
        <Image
          source={{ uri: item.images?.[0]?.src || 'https://via.placeholder.com/150' }}
          style={styles.similarImg}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.heartBtnSmall}
          onPress={() => toggleWishlist(item)}
        >
          <Image
            source={ImageAssets.wishlist}
            style={[styles.heartIconSmall, { tintColor: isInWishlist(item.id) ? Colors.primary : Colors.black30 }]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.similarInfo}>
        <View style={styles.ratingRowSmall}>
          <Image source={ImageAssets.star1} style={styles.starIconTiny} />
          <AppText font={AppFonts.SemiBold} size={10} color={Colors.black}>
            {item.average_rating || '4.0'}
          </AppText>
        </View>
        <AppText font={AppFonts.Regular} size={13} color={Colors.black} numberOfLines={1}>
          {item.name}
        </AppText>
        <View style={styles.priceRowSmall}>
          {item.regular_price && item.regular_price !== item.price && (
            <AppText font={AppFonts.Regular} size={10} color={Colors.black30} style={styles.oldPriceSmall}>
              ₹{item.regular_price}
            </AppText>
          )}
          <AppText font={AppFonts.SemiBold} size={13} color={Colors.black}>
            ₹{item.price}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />


      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Image source={ImageAssets.backIcon} style={styles.backIcon} />
          </TouchableOpacity>

          {/* Wishlist Button aligned with Back Button */}
          <TouchableOpacity
            onPress={() => toggleWishlist(product)}
            style={styles.headerWishlistBtn}
          >
            <Image
              source={ImageAssets.wishlist}
              style={[styles.headerWishlistIcon, { tintColor: isFav ? Colors.primary : Colors.black30 }]}
            />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#ECEAFF', Colors.white]}
          style={styles.heroSection}
        >
          <FlatList
            ref={mainListRef}
            data={productImages}
            renderItem={renderMainImage}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveImageIndex(index);
            }}
            keyExtractor={(_, i) => i.toString()}
          />
          {productImages.length > 1 && (
            <View style={styles.pagination}>
              {productImages.map((_, i) => (
                <View key={i} style={[styles.dot, i === activeImageIndex && styles.activeDot]} />
              ))}
            </View>
          )}

        </LinearGradient>

        {/* Thumbnails */}
        <View style={styles.thumbSection}>
          <FlatList
            data={productImages}
            renderItem={renderThumbnail}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbList}
          />
        </View>

        {/* Info */}
        <View style={styles.contentPadding}>
          <AppText font={AppFonts.Medium} size={18} color={Colors.black}>
            {product?.name || 'Product Detail'}
          </AppText>
          <View style={styles.priceRow}>
            {product?.regular_price !== product?.price && (
              <AppText font={AppFonts.Regular} size={14} color={Colors.black30} style={styles.oldPrice}>₹{product?.regular_price}</AppText>
            )}
            <AppText font={AppFonts.SemiBold} size={22} color={Colors.black}>₹{product?.price || '0'}</AppText>
          </View>
          <View style={styles.sellerRowSmall}>
            <View style={styles.sellerAvatarSmall}>
              {product?.store?.vendor_avatar && (
                <Image source={{ uri: product.store.vendor_avatar }} style={{ width: 18, height: 18, borderRadius: 9 }} />
              )}
            </View>
            <AppText font={AppFonts.Regular} size={13} color={Colors.textGrey}>
              Sold by: <AppText font={AppFonts.Medium} color={Colors.black}>{product?.store?.shop_name || 'Season Bazar'}</AppText>
            </AppText>
          </View>

          {/* Dynamic Highlights / Categories */}
          <AppText font={AppFonts.Medium} size={18} color={Colors.black} style={styles.sectionTitle}>
            Key Information
          </AppText>
          <View style={styles.highlightsCard}>
            {product?.attributes && product.attributes.length > 0 ? (
              product.attributes.map((attr: any, index: number) => (
                <View key={index} style={styles.highlightRow}>
                  <View style={styles.highlightIconBg}>
                    <Image source={ImageAssets.star1} style={styles.highlightIcon} />
                  </View>
                  <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>
                    <AppText font={AppFonts.Medium}>{attr.name}: </AppText>
                    {attr.options.join(', ')}
                  </AppText>
                </View>
              ))
            ) : product?.categories ? (
              product.categories.slice(0, 3).map((cat: any, index: number) => (
                <View key={index} style={styles.highlightRow}>
                  <View style={styles.highlightIconBg}>
                    <Image source={ImageAssets.star1} style={styles.highlightIcon} />
                  </View>
                  <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>
                    Part of <AppText font={AppFonts.Medium}>{cat.name}</AppText> Collection
                  </AppText>
                </View>
              ))
            ) : (
              <View style={styles.highlightRow}>
                <View style={styles.highlightIconBg}>
                  <Image source={ImageAssets.delivery} style={styles.highlightIcon} />
                </View>
                <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>Premium Quality Guaranteed</AppText>
              </View>
            )}
          </View>

          {/* Description */}
          <AppText font={AppFonts.Medium} size={18} color={Colors.black} style={styles.sectionTitle}>
            Description
          </AppText>
          <View style={styles.descriptionCard}>
            <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey} style={styles.descText}>
              {stripHtml(product?.description || product?.short_description || 'No description available for this product.')}
            </AppText>
          </View>

          {/* Delivery Details */}
          <AppText font={AppFonts.Medium} size={18} color={Colors.black} style={styles.sectionTitle}>
            Delivery Details
          </AppText>
          <View style={styles.deliveryRow}>
            <Image source={ImageAssets.vehicle} style={styles.deliveryIcon} />
            <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>
              {product?.shipping_required ? 'Delivery within 3-7 working days' : 'Instant Digital Delivery'}
            </AppText>
          </View>
          <View style={styles.deliveryRow}>
            <Image source={ImageAssets.shipping} style={styles.deliveryIcon} />
            <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>
              {product?.shipping_required 
                ? getDeliveryInfo()
                : 'Instant Digital Delivery via Email'}
            </AppText>
          </View>

          {/* Similar Products */}
          <AppText font={AppFonts.Medium} size={18} color={Colors.black} style={[styles.sectionTitle, { marginBottom: 15 }]}>
            Similar Products
          </AppText>
          {loadingSimilar ? (
            <AppText size={14} color={Colors.textGrey}>Loading similar items...</AppText>
          ) : similarProducts.length > 0 ? (
            <FlatList
              data={similarProducts}
              renderItem={renderSimilarProduct}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.similarList}
            />
          ) : (
            <AppText size={14} color={Colors.textGrey}>No similar products found.</AppText>
          )}

          {/* Reviews Section */}
          <AppText font={AppFonts.Medium} size={18} color={Colors.black} style={styles.sectionTitle}>
            User Reviews ({reviews.length})
          </AppText>
          {loadingReviews ? (
            <AppText size={14} color={Colors.textGrey}>Loading reviews...</AppText>
          ) : reviews.length > 0 ? (
            reviews.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <AppText font={AppFonts.SemiBold} size={14} color={Colors.black}>{rev.reviewer}</AppText>
                  <AppText font={AppFonts.Regular} size={12} color={Colors.textGrey}>⭐ {rev.rating}</AppText>
                </View>
                <AppText font={AppFonts.Regular} size={13} color={Colors.textGrey}>
                  {stripHtml(rev.review)}
                </AppText>
              </View>
            ))
          ) : (
            <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>No reviews for this product yet.</AppText>
          )}
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => {
            addItem(product);
            SimpleToast.show('Added to Cart');
          }}
        >
          <AppText font={AppFonts.Medium} size={18} color={Colors.primary}>Add to Cart</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() => {
            addItem(product);
            (navigation as any).navigate('MyCart');
          }}
        >
          <AppText font={AppFonts.Medium} size={18} color={Colors.white}>Buy Now</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 20,
  },
  headerWishlistBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWishlistIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
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
    tintColor: Colors.primary, resizeMode: "contain"
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    width: width,
    height: 340, // Reduced from 380
    backgroundColor: '#F9FAFF',
    paddingTop: 80, // More space for header
  },
  mainImgContainer: {
    width: width,
    height: 240, // Balanced height like Flipkart
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImg: {
    width: '90%',
    height: '100%',
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
    alignSelf: "center"
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D1D1',
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 12,
  },
  thumbSection: {
    marginTop: 20,
  },
  thumbList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  thumbnailWrap: {
    width: 70,
    height: 70,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    padding: 8,
    backgroundColor: Colors.white,
  },
  thumbnailActive: {
    borderColor: Colors.primary,
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
  },
  contentPadding: {
    padding: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },
  selectedColor: {
    marginTop: 10,
  },
  sectionTitle: {
    marginTop: 30,
    marginBottom: 10,
  },
  highlightsCard: {
    padding: 15,
    borderRadius: 15,
    borderWidth: 0.7,
    borderColor: Colors.black30,
    backgroundColor: '#FAFAFA33',
    gap: 15,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  highlightIconBg: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#EEEBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
  },
  descriptionCard: {
    padding: 15,
    borderRadius: 15,
    borderWidth: 0.7,
    borderColor: Colors.black30,
    backgroundColor: '#FAFAFA33',
  },
  descText: {
    lineHeight: 22,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  deliveryIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.black30,
    resizeMode: 'contain',
  },
  similarList: {
    gap: 15,
  },
  similarCard: {
    width: 170,
    borderWidth: 1,
    borderColor: '#DDDDDDCC',
    borderRadius: 15,
    overflow: 'hidden',
  },
  similarImgContainer: {
    height: 150,
    backgroundColor: '#F8F9FB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  similarImg: {
    width: '80%',
    height: '80%',
  },
  heartBtnSmall: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  heartIconSmall: {
    width: 18,
    height: 18,
    tintColor: Colors.black30,
    resizeMode: 'contain',
  },
  addBtnSmall: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 4,
  },
  addIconSmall: {
    width: 12,
    height: 12,
    tintColor: Colors.primary,
    resizeMode: 'contain',
  },
  similarInfo: {
    padding: 10,
    backgroundColor: Colors.white,
    borderTopWidth: 0.5,
    borderTopColor: '#DDDDDDCC',
  },
  ratingRowSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  starIconTiny: {
    width: 12,
    height: 12,
    tintColor: '#FFC529',
  },
  priceRowSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  oldPriceSmall: {
    textDecorationLine: 'line-through',
  },
  sellerRowSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  sellerAvatarSmall: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerIconSmall: {
    width: 10,
    height: 10,
    tintColor: Colors.black30,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 15,
    gap: 15,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cartBtn: {
    flex: 1,
    height: 55,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyBtn: {
    flex: 1,
    height: 55,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewCard: {
    padding: 15,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: '#EEE',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});
