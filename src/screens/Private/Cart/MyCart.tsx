import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import AppHeader from '../../../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const CART_ITEMS = [
  { id: '1', name: 'Noise ColorFit Pro 6 ...', price: '₹1,000', originalPrice: '3,000', strap: 'Green Titanium', image: ImageAssets.watch },
  { id: '2', name: 'Noise ColorFit Pro 6 ...', price: '₹1,000', originalPrice: '3,000', strap: 'Green Titanium', image: ImageAssets.watch },
  { id: '3', name: 'Noise ColorFit Pro 6 ...', price: '₹1,000', originalPrice: '3,000', strap: 'Green Titanium', image: ImageAssets.watch },
];

const MyCart = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartCard}>
      <View style={styles.cardTop}>
        <LinearGradient colors={['#FFFFFF', '#AF8ACA33']} style={styles.imgBg}>
          <Image source={item.image} style={styles.productImg} resizeMode="contain" />
        </LinearGradient>

        <View style={styles.infoArea}>
          <View style={styles.titleRow}>
            <AppText font={AppFonts.Medium} size={15} color="#535353CC" style={styles.titleText}>{item.name}</AppText>
            <Image source={ImageAssets.heartfill} style={styles.heartIcon} />
          </View>
          <AppText font={AppFonts.Regular} size={12} color={Colors.textGrey}>
            Selected Strap Color: <AppText size={12} font={AppFonts.Regular} color={Colors.textGrey}>{item.strap}</AppText>
          </AppText>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4].map(i => (
              <Image key={i} source={ImageAssets.star1} style={styles.starIcon} />
            ))}
          </View>
          <View style={styles.priceRow}>
            <AppText font={AppFonts.Regular} size={13} color={Colors.black30} style={styles.oldPrice}>{item.originalPrice}</AppText>
            <AppText font={AppFonts.SemiBold} size={20} color={Colors.black}>{item.price}</AppText>
          </View>
        </View>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.qtyBtn}>
          <AppText font={AppFonts.Regular} size={14} color={Colors.black}>Qty: 1</AppText>
          <Image source={ImageAssets.arrowright} style={styles.dropdownIcon} />
        </TouchableOpacity>

        <View style={styles.couponContainer}>
          <TextInput
            placeholder="Coupon Code"
            placeholderTextColor={Colors.black30}
            style={styles.couponInput}
          />
          <TouchableOpacity style={styles.applyBtn}>
            <AppText font={AppFonts.Medium} size={14} color={Colors.white}>Apply</AppText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.hintRow}>
        <Image source={ImageAssets.vehicle} style={styles.hintIcon} />
        <AppText font={AppFonts.Regular} size={12} color="#535353CC">
          Shipping options will be updated during checkout.
        </AppText>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.removeBtn}>
          <AppText font={AppFonts.Medium} size={16} color={Colors.black}>Remove</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtn}>
          <AppText font={AppFonts.Medium} size={16} color={Colors.white}>Buy Now</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <AppHeader title="My Cart" onBack={() => navigation.goBack()} />

      <FlatList
        data={CART_ITEMS}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  cartCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 0.7,
    borderColor: Colors.black30,
    padding: 15,
    marginBottom: 20,
  },
  cardTop: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  imgBg: {
    width: 100,
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImg: {
    width: '80%',
    height: '80%',
  },
  infoArea: {
    flex: 1,
    marginLeft: 15,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleText: {
    flex: 1,
    marginBottom: 4,
  },
  heartIcon: {
    width: 22,
    height: 22,
    marginLeft: 10,
    resizeMode: "contain"
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: 4,
  },
  starIcon: {
    width: 14,
    height: 14,
    tintColor: '#FFC529',
    resizeMode: "contain"
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },
  qtyBtn: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#FAFAFA',
  },
  dropdownIcon: {
    width: 12,
    height: 12,
    tintColor: Colors.black,
    transform: [{ rotate: '90deg' }],
  },
  couponContainer: {
    flex: 2,
    height: 48,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    overflow: 'hidden',
  },
  couponInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontFamily: AppFonts.Regular,
    fontSize: 14,
    color: Colors.black,
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    height: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  hintIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.primary,
    resizeMode: 'contain',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#F0F0F0',
    paddingTop: 15,
  },
  removeBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: Colors.black30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  buyBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
