import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AppHeader from '../../../components/AppHeader';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { useCartStore } from '../../../store/useCartStore';
import { useAuthStore } from '../../../store/useAuthStore';
import { productService } from '../../../services/productService';

const Checkout = ({ navigation }: any) => {
  const { items, totalAmount, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // Form State
  const [billing, setBilling] = useState({
    first_name: user?.user_display_name?.split(' ')[0] || '',
    last_name: user?.user_display_name?.split(' ')[1] || '',
    address_1: '',
    city: '',
    state: '',
    postcode: '',
    country: 'IN',
    email: user?.user_email || '',
    phone: '',
  });

  const handlePlaceOrder = async () => {
    if (!billing.address_1 || !billing.city || !billing.phone) {
      Alert.alert('Error', 'Please fill in all required fields (Address, City, Phone)');
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        payment_method: 'cod',
        payment_method_title: 'Cash on Delivery',
        set_paid: false,
        billing: billing,
        shipping: billing,
        line_items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        customer_id: user?.id ? parseInt(user.id) : 0,
      };

      const res = await productService.createOrder(orderData);
      
      if (res.id) {
        Alert.alert('Success', `Order #${res.id} placed successfully!`, [
          { text: 'OK', onPress: () => {
              clearCart();
              navigation.navigate('Main');
            } 
          }
        ]);
      }
    } catch (error: any) {
      console.log('Order Error:', error);
      Alert.alert('Order Failed', error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label: string, value: string, key: string) => (
    <View style={styles.inputGroup}>
      <AppText font={AppFonts.Medium} size={14} color={Colors.black} style={styles.label}>{label} *</AppText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => setBilling({ ...billing, [key]: text })}
        placeholder={`Enter your ${label.toLowerCase()}`}
        placeholderTextColor={Colors.black30}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Checkout" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AppText font={AppFonts.SemiBold} size={18} color={Colors.black} style={styles.sectionTitle}>
          Billing Details
        </AppText>
        
        <View style={styles.form}>
           <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>{renderInput('First Name', billing.first_name, 'first_name')}</View>
              <View style={{ flex: 1 }}>{renderInput('Last Name', billing.last_name, 'last_name')}</View>
           </View>
           {renderInput('Address', billing.address_1, 'address_1')}
           <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>{renderInput('City', billing.city, 'city')}</View>
              <View style={{ flex: 1 }}>{renderInput('Pincode', billing.postcode, 'postcode')}</View>
           </View>
           {renderInput('Phone Number', billing.phone, 'phone')}
           {renderInput('Email Address', billing.email, 'email')}
        </View>

        <View style={styles.summaryCard}>
            <AppText font={AppFonts.SemiBold} size={16} color={Colors.black}>Order Summary</AppText>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
               <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>Items Total</AppText>
               <AppText font={AppFonts.Medium} size={14} color={Colors.black}>₹{totalAmount().toFixed(2)}</AppText>
            </View>
            <View style={styles.summaryRow}>
               <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>Shipping</AppText>
               <AppText font={AppFonts.Medium} size={14} color={Colors.primary}>Free</AppText>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
               <AppText font={AppFonts.SemiBold} size={18} color={Colors.black}>Payment Total</AppText>
               <AppText font={AppFonts.SemiBold} size={18} color={Colors.primary}>₹{totalAmount().toFixed(2)}</AppText>
            </View>
        </View>

        <TouchableOpacity 
           style={[styles.placeOrderBtn, loading && { backgroundColor: Colors.black30 }]} 
           onPress={handlePlaceOrder}
           disabled={loading}
        >
          {loading ? (
             <ActivityIndicator color={Colors.white} />
          ) : (
             <AppText font={AppFonts.SemiBold} size={18} color={Colors.white}>PLACE ORDER (COD)</AppText>
          )}
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  scrollContent: { padding: 20 },
  sectionTitle: { marginBottom: 20 },
  form: { 
    backgroundColor: Colors.white, 
    borderRadius: 15, 
    padding: 15, 
    borderWidth: 0.5, 
    borderColor: '#EEE',
    marginBottom: 20,
  },
  inputGroup: { marginBottom: 15 },
  label: { marginBottom: 8 },
  input: {
    height: 50,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    paddingHorizontal: 15,
    fontFamily: AppFonts.Regular,
    color: Colors.black,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary + '33',
    marginBottom: 30,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 10 },
  placeOrderBtn: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
