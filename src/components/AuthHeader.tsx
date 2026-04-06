import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { ImageAssets } from './ImageAssets';
import { Colors } from './colors';
import { AppFonts } from './Appfonts';
import AppText from './AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  paddingStyle?: any;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  onBackPress,
  paddingStyle,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 10, ...paddingStyle }]}>
      <View style={styles.headerContent}>
        {onBackPress && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
          >
            <Image
              source={ImageAssets.backIcon}
              style={styles.backIcon}
            />
          </TouchableOpacity>
        )}

        <View style={styles.titleContainer}>
          <AppText font={AppFonts.Medium} size={28} color={Colors.white}>
            {title}
          </AppText>
          {subtitle && (
            <AppText font={AppFonts.Regular} size={16} color={Colors.white} style={styles.welcomeText}>
              {subtitle}
            </AppText>
          )}
        </View>
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 25,
    paddingBottom: 65, // Standard overlap padding
  },
  headerContent: {
    // Dynamic height based on title/subtitle
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
  },
  backIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  titleContainer: {
    marginTop: 10,
  },
  welcomeText: {
    lineHeight: 22,
    opacity: 0.9,
    marginTop: 4,
  },
});
