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
import { authService } from '../../../services/authService';
import { useAuthStore } from '../../../store/useAuthStore';
import { wcApiClient } from '../../../services/apiClient';
import Toast from 'react-native-simple-toast';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const setAuth = useAuthStore((state: any) => state.setAuth);
  
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'customer' | 'vendor'>('customer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Toast.show('Please enter both username and password', Toast.SHORT);
      return;
    }

    setLoading(true);
    try {
      const res = await authService.login({ username, password });
      
      console.log('--- Login API Success ---');
      console.log('JWT Data:', JSON.stringify(res, null, 2));

      // After JWT login, we might need to fetch full user info to get the role correctly
      setAuth({
        id: res.user_id || res.id,
        email: res.user_email || res.email,
        token: res.token,
        display_name: res.user_display_name,
        role: role, // Use the role selected on Welcome screen
      });

      Toast.show('Welcome back!', Toast.SHORT);
      
      // Navigate based on role
      if (role === 'vendor') {
        navigation.navigate('Main'); // Or Vendor Dashboard if separate
      } else {
        navigation.navigate('Main');
      }
    } catch (error: any) {
      console.log('Login Error:', error);
      Toast.show(error.message || 'Invalid username or password', Toast.SHORT);
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

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Reusable Auth Header */}
      <AuthHeader
        title="Sign In"
        subtitle={step === 1 ? "Select your role to continue." : `Sign in to your ${role} account.`}
        onBackPress={() => step === 1 ? navigation.goBack() : setStep(1)}
      />

      {/* Main Content Card */}
      <View style={styles.formCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {step === 1 ? renderRoleSelection() : (
            <>
              <AppInput
                label="Email Address"
                placeholder="example@gmail.com"
                leftIcon={ImageAssets.email}
                autoCapitalize="none"
                keyboardType="email-address"
                containerStyle={styles.inputGap}
                value={username}
                onChangeText={setUsername}
              />

              <AppInput
                label="Password"
                placeholder="enter password"
                leftIcon={ImageAssets.password}
                rightIcon={showPassword ? ImageAssets.eyeclose : ImageAssets.eye}
                onRightIconPress={() => setShowPassword(!showPassword)}
                secureTextEntry={!showPassword}
                containerStyle={{ marginBottom: 15 }}
                value={password}
                onChangeText={setPassword}
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
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
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
            </>
          )}
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
  inputGap: {
    marginBottom: 20,
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