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
import { productService } from '../../../services/productService';
import { customerService } from '../../../services/customerService';
import { useAuthStore } from '../../../store/useAuthStore';
import Toast from 'react-native-simple-toast';

const { width } = Dimensions.get('window');

const MyCart = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const {
    items,
    removeItem,
    updateQuantity,
    totalAmount,
    subTotal,
    discountTotal,
    couponDiscount,
    totalSavings,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    syncCart,
    loading: cartLoading
  } = useCartStore();

  const [couponCode, setCouponCode] = React.useState('');
  const [loadingCoupon, setLoadingCoupon] = React.useState(false);
  const { user } = useAuthStore.getState();
  const [address, setAddress] = React.useState<string>('');

  React.useEffect(() => {
    syncCart();
    if (user?.id) fetchAddress();
  }, [user?.id]);

  const fetchAddress = async () => {
    try {
      const data = await customerService.getCustomer(Number(user.id));
      if (data.shipping?.address_1) {
        setAddress(`${data.shipping.address_1}, ${data.shipping.city}`);
      } else if (data.billing?.address_1) {
        setAddress(`${data.billing.address_1}, ${data.billing.city}`);
      }
    } catch (error) {
      console.log('Error fetching address in cart');
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    try {
      setLoadingCoupon(true);
      const coupon = await productService.getCouponByCode(couponCode);
      if (coupon) {
        applyCoupon(coupon);
        Toast.show('Coupon applied successfully!', Toast.SHORT);
      } else {
        Toast.show('Invalid coupon code', Toast.SHORT);
      }
    } catch (error) {
      Toast.show('Error applying coupon', Toast.SHORT);
    } finally {
      setLoadingCoupon(false);
    }
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartCard}>
      <View style={styles.cardTop}>
        <LinearGradient colors={['#FFFFFF', '#AF8ACA33']} style={styles.imgBg}>
          <Image source={item.image ? { uri: item.image } : ImageAssets.watch} style={styles.productImg} resizeMode="contain" />
        </LinearGradient>

        <View style={styles.infoArea}>
          <View style={styles.titleRow}>
            <AppText font={AppFonts.Medium} size={15} color="#535353" style={styles.titleText} numberOfLines={2}>
              {item.name}
            </AppText>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Image source={ImageAssets.delete} style={[styles.closeIcon, { tintColor: 'red' }]} />
            </TouchableOpacity>
          </View>
          <AppText font={AppFonts.Regular} size={12} color={Colors.textGrey}>
            Sold by: <AppText size={12} font={AppFonts.Medium} color={Colors.black}>{item.store?.shop_name || 'Season Bazar'}</AppText>
          </AppText>
          <View style={styles.priceRow}>
            {item.regular_price && item.regular_price !== item.price && (
              <AppText font={AppFonts.Regular} size={13} color={Colors.black30} style={styles.oldPrice}>₹{item.regular_price}</AppText>
            )}
            <AppText font={AppFonts.SemiBold} size={18} color={Colors.black}>₹{item.price}</AppText>
            {item.regular_price && item.regular_price !== item.price && (
              <AppText font={AppFonts.SemiBold} size={12} color="green">
                {Math.round(((parseFloat(item.regular_price) - parseFloat(item.price)) / parseFloat(item.regular_price)) * 100)}% Off
              </AppText>
            )}
          </View>
        </View>
      </View>

      <View style={styles.controlsRow}>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.qtyActionBtn}>
            <AppText font={AppFonts.Bold} size={20} color={Colors.black}>−</AppText>
          </TouchableOpacity>
          <AppText font={AppFonts.Bold} size={16} color={Colors.black} style={styles.qtyValue}>
            {item.quantity}
          </AppText>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.qtyActionBtn}>
            <AppText font={AppFonts.Bold} size={20} color={Colors.black}>+</AppText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => removeItem(item.id)}
        >
          <AppText font={AppFonts.SemiBold} size={14} color={Colors.black}>Remove</AppText>
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
        onPress={() => navigation.navigate('Home')}
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
        ListHeaderComponent={() => (
           <View style={styles.addressBar}>
              <View style={{ flex: 1 }}>
                <AppText font={AppFonts.Regular} size={13} color={Colors.textGrey}>Deliver to:</AppText>
                <AppText font={AppFonts.Medium} size={15} color={Colors.black} numberOfLines={1}>
                   {address || (user ? 'Hi, ' + (user.first_name || 'User') : 'Add Address')}
                </AppText>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.changeAddressBtn} onPress={() => navigation.navigate('ManageAddresses')}>
                 <AppText font={AppFonts.SemiBold} size={14} color={Colors.primary}>Change</AppText>
              </TouchableOpacity>
           </View>
        )}
        ListFooterComponent={items.length > 0 ? (
          <View style={{ marginBottom: 40 }}>
            {/* Coupon Section */}
            <View style={styles.couponSection}>
              <AppText font={AppFonts.SemiBold} size={16} color={Colors.black} style={{ marginBottom: 12 }}>Coupons</AppText>
              <View style={styles.couponInputWrapper}>
                <Image source={ImageAssets.discount} style={styles.couponIcon} />
                <TextInput
                  placeholder="Enter Coupon Code"
                  placeholderTextColor={Colors.black30}
                  style={styles.couponTextInput}
                  value={couponCode}
                  onChangeText={setCouponCode}
                  autoCapitalize="characters"
                />
                <TouchableOpacity
                  onPress={handleApplyCoupon}
                  disabled={loadingCoupon}
                  style={styles.applyTextBtn}
                >
                  <AppText font={AppFonts.Bold} size={15} color={Colors.primary}>
                    {loadingCoupon ? '...' : 'APPLY'}
                  </AppText>
                </TouchableOpacity>
              </View>
              {appliedCoupon && (
                <View style={styles.appliedBadge}>
                  <AppText font={AppFonts.SemiBold} size={13} color="green">
                    "{appliedCoupon.code}" applied! You saved ₹{couponDiscount().toFixed(2)}
                  </AppText>
                  <TouchableOpacity onPress={removeCoupon}>
                    <AppText font={AppFonts.Bold} size={13} color="red">REMOVE</AppText>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Price Details */}
            <View style={styles.summaryContainer}>
              <AppText font={AppFonts.SemiBold} size={18} color={Colors.black} style={{ marginBottom: 20 }}>Price Details</AppText>

              <View style={styles.summaryRow}>
                <AppText font={AppFonts.Regular} size={16} color={Colors.black}>Price ({items.length} items)</AppText>
                <AppText font={AppFonts.Regular} size={16} color={Colors.black}>₹{subTotal().toFixed(2)}</AppText>
              </View>

              <View style={[styles.summaryRow, { marginTop: 15 }]}>
                <AppText font={AppFonts.Regular} size={16} color={Colors.black}>Discount</AppText>
                <AppText font={AppFonts.Regular} size={16} color="green">− ₹{discountTotal().toFixed(2)}</AppText>
              </View>

              {appliedCoupon && (
                <View style={[styles.summaryRow, { marginTop: 15 }]}>
                  <AppText font={AppFonts.Regular} size={16} color={Colors.black}>Coupon Discount</AppText>
                  <AppText font={AppFonts.Regular} size={16} color="green">− ₹{couponDiscount().toFixed(2)}</AppText>
                </View>
              )}

              <View style={[styles.summaryRow, { marginTop: 15 }]}>
                <AppText font={AppFonts.Regular} size={16} color={Colors.black}>Delivery Charges</AppText>
                <AppText font={AppFonts.Regular} size={16} color="green">
                  {totalAmount() > 500 ? 'FREE' : '₹40'}
                </AppText>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <AppText font={AppFonts.Bold} size={18} color={Colors.black}>Total Amount</AppText>
                <AppText font={AppFonts.Bold} size={20} color={Colors.black}>
                  ₹{(totalAmount() + (totalAmount() > 500 ? 0 : 40)).toFixed(2)}
                </AppText>
              </View>

              <View style={styles.divider} />

              <AppText font={AppFonts.SemiBold} size={15} color="green">
                You will save ₹{totalSavings().toFixed(2)} on this order
              </AppText>

              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={() => navigation.navigate('Checkout')}
              >
                <AppText font={AppFonts.Bold} size={18} color={Colors.white}>PLACE ORDER</AppText>
              </TouchableOpacity>
            </View>
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
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEE',
    gap: 15,
  },
  changeAddressBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
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
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    fontSize: 13,
    color: Colors.black30,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },
  deleteBtn: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponSection: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#DDD',
  },
  couponInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 55,
  },
  couponIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
    marginRight: 10,
  },
  couponTextInput: {
    flex: 1,
    fontFamily: AppFonts.Regular,
    fontSize: 15,
    color: Colors.black,
  },
  applyTextBtn: {
    paddingHorizontal: 10,
  },
  appliedBadge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#EFFFFA',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B0FFE0',
  },
  closeIcon: {
    width: 20,
    height: 20,
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
