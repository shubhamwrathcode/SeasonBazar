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
import { useCartStore } from '../../../store/useCartStore';

const { width } = Dimensions.get('window');

const MyCart = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { items, removeItem, updateQuantity, totalAmount, clearCart } = useCartStore();

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartCard}>
      <View style={styles.cardTop}>
        <LinearGradient colors={['#FFFFFF', '#AF8ACA33']} style={styles.imgBg}>
          <Image source={item.image ? { uri: item.image } : ImageAssets.watch} style={styles.productImg} resizeMode="contain" />
        </LinearGradient>

        <View style={styles.infoArea}>
          <View style={styles.titleRow}>
            <AppText font={AppFonts.Medium} size={15} color="#535353CC" style={styles.titleText} numberOfLines={2}>
              {item.name}
            </AppText>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Image source={ImageAssets.close} style={[styles.heartIcon, { tintColor: 'red' }]} />
            </TouchableOpacity>
          </View>
          <AppText font={AppFonts.Regular} size={12} color={Colors.textGrey}>
            Sold by: <AppText size={12} font={AppFonts.Medium} color={Colors.black}>{item.store?.shop_name || 'Season Bazar'}</AppText>
          </AppText>
          <View style={styles.priceRow}>
            {item.regular_price && item.regular_price !== item.price && (
              <AppText font={AppFonts.Regular} size={13} color={Colors.black30} style={styles.oldPrice}>₹{item.regular_price}</AppText>
            )}
            <AppText font={AppFonts.SemiBold} size={20} color={Colors.black}>₹{item.price}</AppText>
          </View>
        </View>
      </View>

      <View style={styles.controlsRow}>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.qtyActionBtn}>
            <AppText font={AppFonts.Medium} size={20} color={Colors.black}>-</AppText>
          </TouchableOpacity>
          <AppText font={AppFonts.SemiBold} size={16} color={Colors.black} style={styles.qtyValue}>
            {item.quantity}
          </AppText>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.qtyActionBtn}>
            <AppText font={AppFonts.Medium} size={20} color={Colors.black}>+</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.couponContainer}>
          <TextInput
            placeholder="Coupon"
            placeholderTextColor={Colors.black30}
            style={styles.couponInput}
          />
          <TouchableOpacity style={styles.applyBtn}>
            <AppText font={AppFonts.Medium} size={14} color={Colors.white}>Apply</AppText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => removeItem(item.id)}
        >
          <AppText font={AppFonts.Medium} size={16} color={Colors.black}>Delete</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtn}>
          <AppText font={AppFonts.Medium} size={16} color={Colors.white}>Proceed</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Image source={ImageAssets.cart} style={styles.emptyImg} />
      <AppText font={AppFonts.SemiBold} size={20} color={Colors.black}>Your Cart is Empty</AppText>
      <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey} style={{ marginTop: 10 }}>Add some products to your bazaar!</AppText>
      <TouchableOpacity
        style={styles.shopNowBtn}
        onPress={() => navigation.navigate('Main')}
      >
        <AppText font={AppFonts.Medium} size={16} color={Colors.white}>Shop Now</AppText>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <AppHeader title="My Cart" onBack={() => navigation.goBack()} />

      <FlatList
        data={items}
        renderItem={renderCartItem}
        ListEmptyComponent={renderEmptyCart}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={items.length > 0 ? (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <AppText font={AppFonts.Regular} size={16} color={Colors.textGrey}>Subtotal</AppText>
              <AppText font={AppFonts.SemiBold} size={18} color={Colors.black}>₹{totalAmount().toFixed(2)}</AppText>
            </View>
            <View style={[styles.summaryRow, { marginTop: 10 }]}>
              <AppText font={AppFonts.Regular} size={16} color={Colors.textGrey}>Shipping</AppText>
              <AppText font={AppFonts.Medium} size={16} color={Colors.primary}>Calculated at checkout</AppText>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <AppText font={AppFonts.SemiBold} size={18} color={Colors.black}>Total</AppText>
              <AppText font={AppFonts.SemiBold} size={22} color={Colors.primary}>₹{totalAmount().toFixed(2)}</AppText>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Checkout')}
            >
              <AppText font={AppFonts.SemiBold} size={18} color={Colors.white}>Check Out</AppText>
            </TouchableOpacity>
          </View>
        ) : null}
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
  quantityControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    height: 48,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  qtyActionBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyValue: {
    paddingHorizontal: 10,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyImg: {
    width: 120,
    height: 120,
    tintColor: '#DDD',
    marginBottom: 20,
  },
  shopNowBtn: {
    marginTop: 30,
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
  },
  summaryContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#DDD',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 15,
  },
  checkoutBtn: {
    marginTop: 25,
    backgroundColor: Colors.primary,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
