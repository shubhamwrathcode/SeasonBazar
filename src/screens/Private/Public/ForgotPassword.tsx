import React from 'react';
import {
  StyleSheet,
  View,
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
import { useState } from 'react';
import Toast from 'react-native-simple-toast';
import { authService } from '../../../services/authService';

const { width, height } = Dimensions.get('window');

const ForgotPassword = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Toast.show('Please enter your email address', Toast.SHORT);
      return;
    }

    setLoading(true);
    try {
      // Calling our API service
      await authService.forgotPassword(email);
      Toast.show('Reset link sent to your email!', Toast.LONG);
      navigation.navigate('Login');
    } catch (error: any) {
      // Even if it fails (like generic WP error), we show message
      Toast.show(error.message || 'If this email exists, a link has been sent.', Toast.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <AuthHeader
        title="Oops! Forgot?"
        subtitle={`It happens! Enter your email\nto reset your password.`}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.formCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <AppInput
            label="Email Address*"
            placeholder="example@gmail.com"
            leftIcon={ImageAssets.email}
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={styles.inputGap}
            value={email}
            onChangeText={setEmail}
          />

          <AppButton
            title="Reset Password"
            variant="primary"
            onPress={handleReset}
            loading={loading}
            style={styles.resetButton}
          />

          <View style={styles.footer}>
            <AppText font={AppFonts.Regular} size={16} color={Colors.black}>
              Remembered your password?{' '}
            </AppText>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <AppText style={{ textDecorationLine: "underline" }} font={AppFonts.Regular} size={16} color={Colors.primary}>
                Sign in
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ForgotPassword;

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
    paddingBottom: 20,
  },
  inputGap: {
    marginBottom: 30,
  },
  resetButton: {
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
});
