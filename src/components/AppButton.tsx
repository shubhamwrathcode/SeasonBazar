import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from './colors';
import { AppFonts } from './Appfonts';
import AppText from './AppText';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  loading = false,
  disabled = false,
  variant = 'primary',
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  // Gradient colors for primary button based on Figma extraction
  // Base: Colors.primary (#562CDA/D1)
  // Highlight: White to transparent white
  const primaryGradient = [Colors.primary, Colors.primary]; // Fallback if no specific gradient colors provided
  // Actually, we'll implement the "Highlight" effect by layering or specific colors
  const gradientColors = isPrimary
    ? ['#6A44E3', '#4A25C7'] // Slightly lighter to slightly darker for depth
    : isSecondary
      ? [Colors.lightPurple, Colors.lightPurple]
      : ['transparent', 'transparent'];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.baseButton,
        !isPrimary && { backgroundColor: isSecondary ? Colors.lightPurple : 'transparent' },
        !isPrimary && !isSecondary && { borderWidth: 1, borderColor: Colors.primary },
        disabled && { opacity: 0.6 },
        style,
      ]}
    >
      {isPrimary ? (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <AppText
              font={AppFonts.SemiBold}
              size={18}
              color={Colors.white}
              style={textStyle}
            >
              {title}
            </AppText>
          )}
        </LinearGradient>
      ) : (
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator color={isPrimary ? Colors.white : Colors.primary} />
          ) : (
            <AppText
              font={AppFonts.Regular}
              size={18}
              color={!isPrimary ? Colors.black : Colors.primary}
              style={textStyle}
            >
              {title}
            </AppText>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  baseButton: {
    height: 54,
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
