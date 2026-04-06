import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { ImageAssets } from '../../../components/ImageAssets';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import AppButton from '../../../components/AppButton';
import AppInput from '../../../components/AppInput';
import AuthHeader from '../../../components/AuthHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';
import { customerService } from '../../../services/customerService';
import { useAuthStore } from '../../../store/useAuthStore';
import Toast from 'react-native-simple-toast';

const { width, height } = Dimensions.get('window');

const SignUp = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'customer' | 'vendor'>('customer');
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    shopName: '',
    shopUrl: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.phone) {
      Toast.show('Please fill all required fields', Toast.SHORT);
      return;
    }

    setLoading(true);
    try {
      const customerData = {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.email.split('@')[0] + Math.floor(Math.random() * 1000), // WooCommerce requires unique username
        billing: {
          phone: formData.phone,
        },
        role: role === 'vendor' ? 'seller' : 'customer', // Adjust role based on selection
      };

      console.log('--- Registering User ---');
      console.log('Endpoint: POST /customers');
      console.log('Payload:', JSON.stringify(customerData, null, 2));

      const res = await customerService.createCustomer(customerData);

      console.log('--- Registration Success ---');
      console.log('User ID from WP:', res.id);
      console.log('Full Response Data:', JSON.stringify(res, null, 2));

      Toast.show('Account created! Please check your email to create a password, then login.', Toast.LONG);
      navigation.navigate('Login');
    } catch (error: any) {
      console.log('--- Registration Error ---');
      console.log('Error Message:', error.message);
      console.log('Error Data:', JSON.stringify(error, null, 2));
      Toast.show(error.message || 'Something went wrong', Toast.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const renderRoleSelection = () => (
    <View style={styles.roleContainer}>
      <AppText font={AppFonts.Medium} size={20} color={Colors.black} style={styles.roleTitle}>
        ARE YOU
      </AppText>

      <View style={styles.roleCardRow}>
        <TouchableOpacity
          style={[styles.roleCard, role === 'customer' && styles.roleCardActive]}
          onPress={() => setRole('customer')}
          activeOpacity={0.8}
        >
          <Image
            source={ImageAssets.customer}
            style={styles.roleImage}
            resizeMode="contain"
          />
          <AppText
            font={AppFonts.Regular}
            size={18}
            color={role === 'customer' ? Colors.primary : Colors.black}
            style={styles.roleLabel}
          >
            CUSTOMER
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleCard, role === 'vendor' && styles.roleCardActive]}
          onPress={() => setRole('vendor')}
          activeOpacity={0.8}
        >
          <Image
            source={ImageAssets.vendor}
            style={styles.roleImage}
            resizeMode="contain"
          />
          <AppText
            font={AppFonts.Regular}
            size={18}
            color={role === 'vendor' ? Colors.primary : Colors.black}
            style={styles.roleLabel}
          >
            VENDOR
          </AppText>
        </TouchableOpacity>
      </View>

      <AppButton
        title="Next"
        variant="primary"
        onPress={() => setStep(2)}
        style={styles.nextButton}
      />
    </View>
  );


  const renderRegistrationForm = () => (
    <View style={styles.formContainer}>
      <AppInput
        label="Email Address*"
        placeholder="example@gmail.com"
        leftIcon={ImageAssets.email}
        containerStyle={styles.inputGap}
        value={formData.email}
        onChangeText={(txt: string) => handleInputChange('email', txt)}
      />
      <AppText size={12} color={Colors.black} style={styles.hintText}>
        A link to set a new password will be sent to your email address.
      </AppText>

      <AppInput
        label="First Name*"
        placeholder="Enter name"
        leftIcon={ImageAssets.userImg}
        containerStyle={styles.inputGap}
        value={formData.firstName}
        onChangeText={(txt: string) => handleInputChange('firstName', txt)}
      />

      <AppInput
        label="Last Name*"
        placeholder="Enter name"
        containerStyle={styles.inputGap}
        leftIcon={ImageAssets.userImg}
        value={formData.lastName}
        onChangeText={(txt: string) => handleInputChange('lastName', txt)}
      />

      {role === 'vendor' && (
        <>
          <AppInput
            label="Shop Name*"
            placeholder="Enter name"
            containerStyle={styles.inputGap}
            leftIcon={ImageAssets.shop}
            value={formData.shopName}
            onChangeText={(txt: string) => handleInputChange('shopName', txt)}
          />
          <AppInput
            label="Shop URL*"
            placeholder="Enter name"
            containerStyle={styles.inputGap}
            leftIcon={ImageAssets.shop}
            value={formData.shopUrl}
            onChangeText={(txt: string) => handleInputChange('shopUrl', txt)}
          />
          <AppText size={12} color={Colors.black30} style={styles.urlHint}>
            https://www.seasonbazaar.com/store/
          </AppText>
        </>
      )}

      <AppInput
        label="Phone Number*"
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
        containerStyle={styles.inputGap}
        leftIcon={ImageAssets.mobile}
        value={formData.phone}
        onChangeText={(txt: string) => handleInputChange('phone', txt)}
      />

      <AppButton
        title="Register"
        variant="primary"
        onPress={handleRegister}
        disabled={loading}
        loading={loading}
        style={styles.registerButton}
      />

      <View style={styles.footer}>
        <AppText font={AppFonts.Regular} size={16} color={Colors.black}>
          Already a member?{' '}
        </AppText>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <AppText font={AppFonts.Regular} style={{ textDecorationLine: "underline" }} size={16} color={Colors.primary}>
            Sign in
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <AuthHeader
        title="Sign Up"
        subtitle={step === 1 ? "Choose your role to get started." : `Create your ${role} account.`}
        onBackPress={() => step === 1 ? navigation.goBack() : setStep(1)}
      />

      <View style={styles.formCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {step === 1 ? renderRoleSelection() : renderRegistrationForm()}
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  formCard: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: -45,
    paddingHorizontal: 25,
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  roleContainer: {
    alignItems: 'center',
  },
  roleTitle: {
    marginBottom: 40,
    marginTop: 10,
  },
  roleCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 50,
  },
  roleCard: {
    width: width * 0.42,
    height: width * 0.45,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  roleCardActive: {
    borderColor: Colors.primary,
    backgroundColor: '#F8F6FF',
    borderWidth: 1
  },
  roleImage: {
    width: '85%',
    height: '85%',
  },
  roleLabel: {
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 20,
  },
  formContainer: {
    width: '100%',
  },
  inputGap: {
    marginBottom: 15,
  },
  hintText: {
    marginTop: -10,
    marginBottom: 20,
    opacity: 0.6,
  },
  urlHint: {
    marginTop: -10,
    marginBottom: 20,
  },
  registerButton: {
    marginTop: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
});