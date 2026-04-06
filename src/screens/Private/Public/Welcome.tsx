import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ImageAssets } from '../../../components/ImageAssets';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import AppButton from '../../../components/AppButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const Welcome = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={[styles.mainWrapper, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('OnBoarding')}
          >
            <Image
              source={ImageAssets.backIcon}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Image source={ImageAssets.AppLogo} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Character Image Area */}
        <View style={styles.imageContainer}>
          <Image
            source={ImageAssets.OnBoarding4}
            style={styles.characterImage}
            resizeMode="contain"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.bottomSection}>
          <AppButton 
            title="CREATE AN ACCOUNT" 
            variant="primary"
            onPress={() => navigation.navigate('SignUp')}
            style={{ marginBottom: 12 }}
          />

          <AppButton 
            title="SIGN IN" 
            variant="secondary"
            onPress={() => navigation.navigate('Login')}
            style={{ marginBottom: 20 }}
          />

          {/* Social Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <AppText size={14} font={AppFonts.Regular} color={Colors.black} style={styles.dividerText}>
              Or login with
            </AppText>
            <View style={styles.line} />
          </View>

          {/* Social Grid */}
          <View style={styles.socialGrid}>
            {[
              { id: 'google', img: ImageAssets.google },
              { id: 'apple', img: ImageAssets.apple },
              { id: 'fb', img: ImageAssets.fb },
              { id: 'ms', img: ImageAssets.microsoft }
            ].map((social) => (
              <TouchableOpacity key={social.id} style={styles.socialCard}>
                <Image source={social.img} style={styles.socialIcon} resizeMode="contain" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainWrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  logo: {
    width: 150,
    height: 40,
  },
  imageContainer: {
    flex: 0.42,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  characterImage: {
    width: width * 0.95,
    height: width * 0.95,
    marginTop: 0,
  },
  bottomSection: {
    flex: 0.48,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  dividerText: {
    marginHorizontal: 12,
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  socialCard: {
    width: width * 0.18,
    height: 54,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
});
