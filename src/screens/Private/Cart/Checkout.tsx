import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import AppHeader from '../../../components/AppHeader';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { useCartStore } from '../../../store/useCartStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { productService } from '../../../services/productService';
import { ImageAssets } from '../../../components/ImageAssets';

const Checkout = ({ navigation }: any) => {
  const { items, totalAmount, clearCart, couponDiscount, appliedCoupon } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Form State
  const [billing, setBilling] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    address_1: '',
    city: '',
    state: '',
    postcode: '',
    country: 'IN',
    email: user?.email || '',
    phone: '',
  });

  const handlePlaceOrder = async () => {
    if (!billing.address_1 || !billing.city || !billing.phone || !billing.email) {
      Toast.show('Please fill in all required fields.', Toast.SHORT);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(billing.email)) {
      Toast.show('Please enter a valid email address.', Toast.SHORT);
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        payment_method: paymentMethod,
        payment_method_title: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI' : 'Credit/Debit Card',
        set_paid: false,
        billing: billing,
        shipping: billing,
        line_items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        customer_id: user?.id || 0,
        coupon_lines: appliedCoupon ? [{ code: appliedCoupon.code }] : [],
      };

      const res = await productService.createOrder(orderData);

      if (res.id) {
        clearCart();
        navigation.replace('OrderSuccess', { orderId: res.id.toString() });
      }
    } catch (error: any) {
      console.log('Order Error:', error);
      Toast.show(error?.response?.data?.message || 'Something went wrong while placing your order.', Toast.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentOption = (id: string, label: string, icon: any) => {
    const isSelected = paymentMethod === id;
    return (
      <TouchableOpacity
        style={[styles.paymentCard, isSelected && styles.selectedPaymentCard]}
        onPress={() => setPaymentMethod(id)}
      >
        <View style={styles.paymentInfo}>
          <Image source={icon} style={[styles.paymentIcon,]} />
          <AppText font={isSelected ? AppFonts.SemiBold : AppFonts.Medium} size={15} color={isSelected ? Colors.primary : Colors.black}>
            {label}
          </AppText>
        </View>
        <View style={[styles.radio, isSelected && styles.radioSelected]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  const renderInput = (label: string, value: string, key: string, keyboardType: any = 'default', autoCapitalize: any = 'none') => (
    <View style={styles.inputGroup}>
      <AppText font={AppFonts.Medium} size={13} color={Colors.black} style={styles.label}>{label}</AppText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => setBilling({ ...billing, [key]: text })}
        placeholder={`Enter ${label.toLowerCase()}`}
        placeholderTextColor={Colors.black30}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Checkout" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Step Indicator Mock */}
        <View style={styles.stepContainer}>
          <View style={styles.stepItem}><View style={styles.stepCircleActive}><AppText color="#FFF" size={12}>1</AppText></View><AppText size={12} color={Colors.primary}>Cart</AppText></View>
          <View style={styles.stepLineActive} />
          <View style={styles.stepItem}><View style={styles.stepCircleActive}><AppText color="#FFF" size={12}>2</AppText></View><AppText size={12} color={Colors.primary}>Address</AppText></View>
          <View style={styles.stepLine} />
          <View style={styles.stepItem}><View style={styles.stepCircle}><AppText color="#999" size={12}>3</AppText></View><AppText size={12} color="#999">Payment</AppText></View>
        </View>

        <View style={styles.sectionHeader}>
          <AppText font={AppFonts.Bold} size={18} color={Colors.black}>Shipping Details</AppText>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>{renderInput('First Name', billing.first_name, 'first_name', 'default', 'words')}</View>
            <View style={{ flex: 1 }}>{renderInput('Last Name', billing.last_name, 'last_name', 'default', 'words')}</View>
          </View>
          {renderInput('Complete Address', billing.address_1, 'address_1', 'default', 'none')}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>{renderInput('City', billing.city, 'city', 'default', 'words')}</View>
            <View style={{ flex: 1 }}>{renderInput('Pincode', billing.postcode, 'postcode', 'number-pad')}</View>
          </View>
          {renderInput('Email Address', billing.email, 'email', 'email-address', 'none')}
          {renderInput('Phone Number', billing.phone, 'phone', 'phone-pad')}
        </View>

        <View style={styles.sectionHeader}>
          <AppText font={AppFonts.Bold} size={18} color={Colors.black}>Payment Method</AppText>
        </View>

        <View style={styles.paymentSection}>
          {renderPaymentOption('cod', 'Cash on Delivery', ImageAssets.delivery)}
          {renderPaymentOption('upi', 'UPI / PhonePe / GooglePay', ImageAssets.upi)}
          {renderPaymentOption('card', 'Credit / Debit Card', ImageAssets.banking)}
        </View>

        <View style={styles.sectionHeader}>
          <AppText font={AppFonts.Bold} size={18} color={Colors.black}>Order Summary</AppText>
        </View>

        <View style={styles.card}>
          <View style={styles.summaryRow}>
            <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>Items Total</AppText>
            <AppText font={AppFonts.Medium} size={15} color={Colors.black}>₹{(totalAmount() + couponDiscount()).toFixed(2)}</AppText>
          </View>
          {appliedCoupon && (
            <View style={styles.summaryRow}>
              <AppText font={AppFonts.Regular} size={14} color="green">Coupon Discount</AppText>
              <AppText font={AppFonts.Medium} size={15} color="green">− ₹{couponDiscount().toFixed(2)}</AppText>
            </View>
          )}
          <View style={styles.summaryRow}>
            <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>Delivery Charges</AppText>
            <AppText font={AppFonts.Medium} size={15} color="green">FREE</AppText>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <AppText font={AppFonts.Bold} size={18} color={Colors.black}>Total Amount</AppText>
            <AppText font={AppFonts.Bold} size={20} color={Colors.primary}>₹{totalAmount().toFixed(2)}</AppText>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Persistent Bottom Button */}
      <View style={styles.bottomContainer}>
        <View>
          <AppText font={AppFonts.Regular} size={12} color={Colors.textGrey}>Grand Total</AppText>
          <AppText font={AppFonts.Bold} size={20} color={Colors.black}>₹{totalAmount().toFixed(2)}</AppText>
        </View>
        <TouchableOpacity
          style={[styles.placeOrderBtn, loading && { opacity: 0.7 }]}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <AppText font={AppFonts.Bold} size={16} color={Colors.white}>PLACE ORDER</AppText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  scrollContent: { padding: 20 },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
  },
  stepItem: { alignItems: 'center', gap: 5 },
  stepCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: '#EEE', justifyContent: 'center', alignItems: 'center' },
  stepCircleActive: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  stepLine: { flex: 1, height: 2, backgroundColor: '#EEE', marginHorizontal: 10 },
  stepLineActive: { flex: 1, height: 2, backgroundColor: Colors.primary, marginHorizontal: 10 },
  sectionHeader: { marginBottom: 15, marginTop: 10 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  row: { flexDirection: 'row', gap: 15 },
  inputGroup: { marginBottom: 15 },
  label: { marginBottom: 8, marginLeft: 2 },
  input: {
    height: 52,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEF1F4',
    paddingHorizontal: 15,
    fontFamily: AppFonts.Regular,
    color: Colors.black,
  },
  paymentSection: { gap: 12, marginBottom: 20 },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  selectedPaymentCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  paymentInfo: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  paymentIcon: { width: 24, height: 24, },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center' },
  radioSelected: { borderColor: Colors.primary },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 20,
    paddingBottom: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 20,
  },
  placeOrderBtn: {
    backgroundColor: Colors.primary,
    height: 55,
    borderRadius: 15,
    paddingHorizontal: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
