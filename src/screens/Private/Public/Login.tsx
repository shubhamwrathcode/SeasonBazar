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

const Login = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [role, setRole] = useState<'customer' | 'vendor'>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Reusable Auth Header */}
      <AuthHeader
        title="Sign In"
        subtitle={`Welcome back!\nPlease sign in to continue.`}
        onBackPress={() => navigation.goBack()}
      />

      {/* Main Content Card */}
      <View style={styles.formCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Role Selection Tabs */}
          <View style={styles.roleTabRow}>
            <TouchableOpacity 
              style={[styles.roleTab, role === 'customer' && styles.activeTab]}
              onPress={() => setRole('customer')}
            >
              <AppText font={role === 'customer' ? AppFonts.SemiBold : AppFonts.Regular} size={14} color={role === 'customer' ? Colors.primary : Colors.black30}>
                 CUSTOMER
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.roleTab, role === 'vendor' && styles.activeTab]}
              onPress={() => setRole('vendor')}
            >
              <AppText font={role === 'vendor' ? AppFonts.SemiBold : AppFonts.Regular} size={14} color={role === 'vendor' ? Colors.primary : Colors.black30}>
                 VENDOR
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Inputs */}
          <AppInput
            label="Username or email address"
            placeholder="example@gmail.com"
            leftIcon={ImageAssets.email}
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={{ marginBottom: 15 }}
          />

          <AppInput
            label="Password"
            placeholder="enter password"
            leftIcon={ImageAssets.password}
            rightIcon={showPassword ? ImageAssets.eyeclose : ImageAssets.eye}
            onRightIconPress={() => setShowPassword(!showPassword)}
            secureTextEntry={!showPassword}
            containerStyle={{ marginBottom: 15 }}
          />

          {/* Remember Me and Forgot Password */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.rememberMeContainer}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <Image
                source={rememberMe ? ImageAssets.check : ImageAssets.uncheck}
                style={styles.checkboxIcon}
              />
              <AppText font={AppFonts.Regular} size={15} color={Colors.black}>
                Remember me
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword') }}>
              <AppText style={{ textDecorationLine: "underline" }} font={AppFonts.Regular} size={14} color={Colors.primary}>
                Forgot Password?
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <AppButton
            title="Sign in"
            variant="primary"
            onPress={() => {
              if (role === 'vendor') {
                navigation.navigate('VendorMain');
              } else {
                navigation.navigate('Main');
              }
            }}
            style={styles.signInButton}
          />

          {/* Footer Navigation */}
          <View style={styles.footer}>
            <AppText font={AppFonts.Regular} size={16} color={Colors.black}>
              New Customer?{' '}
            </AppText>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <AppText font={AppFonts.Regular} size={16} color={Colors.primary} style={styles.createAccountText}>
                Create account
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 25,
  },
  formCard: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: -45,
    paddingHorizontal: 25,
  },
  scrollContent: {
    paddingTop: 35,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode: "contain",
  },
  signInButton: {
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  createAccountText: {
    textDecorationLine: 'none',
    fontWeight: '500',
  },
  roleTabRow: {
    flexDirection: 'row',
    marginBottom: 25,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 5,
  },
  roleTab: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});