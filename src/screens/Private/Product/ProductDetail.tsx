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
  const insets = useSafeAreaInsets();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const mainListRef = React.useRef<FlatList>(null);

  const productImages = [ImageAssets.watch, ImageAssets.watch, ImageAssets.watch, ImageAssets.watch, ImageAssets.watch, ImageAssets.watch];

  const onThumbnailPress = (index: number) => {
    setActiveImageIndex(index);
    mainListRef.current?.scrollToIndex({ index, animated: true });
  };

  const renderThumbnail = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity
      onPress={() => onThumbnailPress(index)}
      style={[styles.thumbnailWrap, activeImageIndex === index && styles.thumbnailActive]}
    >
      <Image source={item} style={styles.thumbnailImg} resizeMode="contain" />
    </TouchableOpacity>
  );

  const renderMainImage = ({ item }: { item: any }) => (
    <View style={styles.mainImgContainer}>
      <Image source={item} style={styles.mainImg} resizeMode="contain" />
    </View>
  );

  const renderSimilarProduct = ({ item }: { item: any }) => (
    <View style={styles.similarCard}>
      <View style={styles.similarImgContainer}>
        <Image source={item.image} style={styles.similarImg} resizeMode="contain" />
        <TouchableOpacity style={styles.heartBtnSmall}>
          <Image source={ImageAssets.heart} style={styles.heartIconSmall} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtnSmall}>
          <Image source={ImageAssets.cart} style={styles.addIconSmall} />
          <AppText font={AppFonts.Medium} size={10} color={Colors.black}>Add</AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.similarInfo}>
        <View style={styles.ratingRowSmall}>
          <Image source={ImageAssets.star1} style={styles.starIconTiny} />
          <AppText font={AppFonts.SemiBold} size={10} color={Colors.black}>{item.rating}</AppText>
        </View>
        <AppText font={AppFonts.Regular} size={13} color={Colors.black} numberOfLines={1}>
          {item.name}
        </AppText>
        <View style={styles.priceRowSmall}>
          <AppText font={AppFonts.Regular} size={10} color={Colors.black30} style={styles.oldPriceSmall}>
            {item.originalPrice}
          </AppText>
          <AppText font={AppFonts.SemiBold} size={13} color={Colors.black}>
            {item.price}
          </AppText>
        </View>
        <View style={styles.sellerRowSmall}>
          <View style={styles.sellerAvatarSmall}>
            <Image source={ImageAssets.profileBottom} style={styles.sellerIconSmall} />
          </View>
          <AppText font={AppFonts.Regular} size={11} color={Colors.black}>Srikant</AppText>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />


      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Image source={ImageAssets.backIcon} style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        {/* Product Carousel */}
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
          <View style={styles.pagination}>
            {productImages.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeImageIndex && styles.activeDot]} />
            ))}
          </View>
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
            Noise ColorFit Pro 6 Smartwatch
          </AppText>
          <View style={styles.priceRow}>
            <AppText font={AppFonts.Regular} size={14} color={Colors.black30} style={styles.oldPrice}>3,000</AppText>
            <AppText font={AppFonts.SemiBold} size={22} color={Colors.black}>₹1,000</AppText>
          </View>
          <AppText font={AppFonts.Regular} size={13} color={Colors.textGrey} style={styles.selectedColor}>
            Selected Strap Color: <AppText font={AppFonts.Medium} color={Colors.textGrey}>Green Titanium</AppText>
          </AppText>

          {/* Highlights */}
          <AppText font={AppFonts.Medium} size={18} color={Colors.black} style={styles.sectionTitle}>
            Product highlights
          </AppText>
          <View style={styles.highlightsCard}>
            {HIGHLIGHTS.map((item) => (
              <View key={item.id} style={styles.highlightRow}>
                <View style={styles.highlightIconBg}>
                  <Image source={item.icon} style={styles.highlightIcon} resizeMode="contain" />
                </View>
                <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>{item.title}</AppText>
              </View>
            ))}
          </View>

          {/* Description */}
          <AppText font={AppFonts.Medium} size={18} color={Colors.black} style={styles.sectionTitle}>
            Description
          </AppText>
          <View style={styles.descriptionCard}>
            <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey} style={styles.descText}>
              Strap colour : brown | strap material : leather{"\n"}
              Dial colour : black | for : men, boys{"\n"}
              Display type : analogue | case shape : round{"\n"}
              Product color may be slightly vary due to modelling effects
            </AppText>
          </View>

          {/* Delivery */}
          <AppText font={AppFonts.Medium} size={18} color={Colors.black} style={styles.sectionTitle}>
            Delivery details
          </AppText>
          <View style={styles.deliveryRow}>
            <Image source={ImageAssets.vehicle} style={styles.deliveryIcon} />
            <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>Delivery within 3-5 working days</AppText>
          </View>
          <View style={styles.deliveryRow}>
            <Image source={ImageAssets.shipping} style={styles.deliveryIcon} />
            <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>Free Shipping & Returns on this item</AppText>
          </View>

          {/* Similar Products */}
          <AppText font={AppFonts.Medium} size={18} color={Colors.black} style={[styles.sectionTitle, { marginBottom: 15 }]}>
            Similar Products
          </AppText>
          <FlatList
            data={SIMILAR_PRODUCTS}
            renderItem={renderSimilarProduct}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.similarList}
          />
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity style={styles.cartBtn}>
          <AppText font={AppFonts.Medium} size={18} color={Colors.primary}>Add to Cart</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtn}>
          <AppText font={AppFonts.Medium} size={18} color={Colors.white}>Buy</AppText>
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
    left: 20,
    zIndex: 10,
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
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    width: width,
    height: 380,
    backgroundColor: '#F9FAFF',
    paddingTop: 60,
  },
  mainImgContainer: {
    width: width,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImg: {
    width: '85%',
    height: '85%',
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
});
