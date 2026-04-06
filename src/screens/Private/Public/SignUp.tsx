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

const { width, height } = Dimensions.get('window');

const SignUp = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'customer' | 'vendor'>('customer');

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
          {/* <View style={styles.roleImageContainer}> */}
          <Image
            source={ImageAssets.customer}
            style={styles.roleImage}
            resizeMode="contain"
          />
          {/* </View> */}
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
          {/* <View style={styles.roleImageContainer}> */}
          <Image
            source={ImageAssets.vendor} // Placeholder for Vendor vector
            style={styles.roleImage}
            resizeMode="contain"
          />
          {/* </View> */}
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
      />
      <AppText size={12} color={Colors.black} style={styles.hintText}>
        A link to set a new password will be sent to your email address.
      </AppText>

      <AppInput
        label="First Name*"
        placeholder="Enter name"
        leftIcon={ImageAssets.userImg}
        containerStyle={styles.inputGap}
      />

      <AppInput
        label="Last Name*"
        placeholder="Enter name"
        containerStyle={styles.inputGap}
        leftIcon={ImageAssets.userImg}
      />

      {role === 'vendor' && (
        <>
          <AppInput
            label="Shop Name*"
            placeholder="Enter name"
            containerStyle={styles.inputGap}
            leftIcon={ImageAssets.shop}
          />
          <AppInput
            label="Shop URL*"
            placeholder="Enter name"
            containerStyle={styles.inputGap}
            leftIcon={ImageAssets.shop}
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
      />

      <AppButton
        title="Register"
        variant="primary"
        onPress={() => { 
          if (role === 'vendor') {
            navigation.navigate('SubscribePlan');
          } else {
            navigation.navigate('Main');
          }
        }}
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
        subtitle="Secure create account for a personalized experience."
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
    // Shadow for unselected
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.05,
    // shadowRadius: 10,
    // elevation: 2,
  },
  roleCardActive: {
    borderColor: Colors.primary,
    backgroundColor: '#F8F6FF',
    borderWidth: 1
  },
  roleImageContainer: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: width * 0.14,
    backgroundColor: '#EAE5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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