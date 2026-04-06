import React, { useState } from 'react';
import {
  StyleSheet,
  View,
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
import AuthHeader from '../../../components/AuthHeader';
import FormContainer from '../../../components/FormContainer';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const Checkout = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [agreed, setAgreed] = useState(false);

  const renderInput = (label: string, placeholder: string, icon: any = null, required: boolean = false, multiline: boolean = false) => (
    <View style={styles.inputWrapper}>
      <AppText font={AppFonts.Medium} size={15} color="#535353CC" style={styles.label}>
        {label}{required && <AppText color="#E74C3C">*</AppText>}
      </AppText>
      <View style={[styles.inputContainer, multiline && styles.multilineContainer]}>
        {icon && <Image source={icon} style={styles.inputIcon} resizeMode="contain" />}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Colors.black30}
          multiline={multiline}
          style={[styles.input, multiline && styles.multilineInput]}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <AuthHeader
        title="Checkout"
        subtitle="Almost There! Checkout Now"
        onBackPress={() => navigation.goBack()}
        paddingStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.formWrapper}>
        <FormContainer contentContainerStyle={styles.formContainer}>
          {/* Selected Plan Summary */}
          <LinearGradient
            colors={['#531DFE', '#8E6FF1', '#B198FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryCard}
          >
            <View style={styles.summaryHeader}>
              <AppText font={AppFonts.Medium} size={18} color={Colors.white}>Premium Pack</AppText>
              <AppText font={AppFonts.SemiBold} size={18} color={Colors.white}>Rs.499</AppText>
            </View>
            <AppText font={AppFonts.Regular} size={14} color="rgba(255, 255, 255, 0.8)">
              Renews automatically on 24 Apr 2027
            </AppText>
          </LinearGradient>

          {/* Form Fields */}
          <View style={styles.inputSection}>
            {renderInput('First Name', 'Enter name', ImageAssets.userImg, true)}
            {renderInput('Last Name', 'Enter name', ImageAssets.userImg, true)}
            {renderInput('Company Name', 'Enter name', ImageAssets.building)}
            {renderInput('Country / Region', 'Enter name', ImageAssets.location, true)}
            {renderInput('Town / City', 'Enter name', ImageAssets.location, true)}
            {renderInput('State', 'Enter name', ImageAssets.location, true)}
            {renderInput('PIN Code', 'Enter name', ImageAssets.location, true)}
            {renderInput('Email Address', 'example@gmail.com', ImageAssets.email, true)}
            {renderInput('Order notes', 'Notes about your order, e.g. special notes for delivery...', null, false, true)}
          </View>

          {/* Terms Checkbox */}
          <TouchableOpacity
            onPress={() => setAgreed(!agreed)}
            style={styles.termsWrapper}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agreed && styles.checkedBox]}>
              {agreed && <Image source={ImageAssets.check} style={styles.checkIcon} />}
            </View>
            <AppText font={AppFonts.Regular} size={13} color="#535353CC" style={styles.termsText}>
              I have read and agree to the website <AppText color={Colors.primary} font={AppFonts.Medium}>terms and conditions</AppText>
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.nextBtn, !agreed && { opacity: 0.6 }]}
            onPress={() => agreed && navigation.navigate('PaymentMethod')}
          >
            <AppText font={AppFonts.SemiBold} size={18} color={Colors.white}>Next</AppText>
          </TouchableOpacity>

          <AppText font={AppFonts.Regular} size={12} color={Colors.black30} style={styles.footerText}>
            Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <AppText color={Colors.primary} style={{ textDecorationLine: 'underline' }} font={AppFonts.Medium}>privacy policy.</AppText>
          </AppText>
        </FormContainer>
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  formWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  formContainer: {
    padding: 20,
  },
  summaryCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  inputSection: {
    gap: 15,
  },
  inputWrapper: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 52,
  },
  inputIcon: {
    width: 20,
    height: 20,
    tintColor: '#0E2E48',
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: AppFonts.Regular,
    fontSize: 14,
    color: Colors.black,
  },
  multilineContainer: {
    height: 100,
    alignItems: 'flex-start',
    paddingTop: 12,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  termsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  checkIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
    resizeMode: "contain"
  },
  termsText: {
    flex: 1,
    lineHeight: 18,
  },
  nextBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    lineHeight: 18,
    marginBottom: 30,
  },
});
