import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Colors } from './colors';
import { AppFonts } from './Appfonts';
import AppText from './AppText';

interface AppInputProps extends TextInputProps {
  label?: string;
  leftIcon?: any;
  rightIcon?: any;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  error?: string;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <AppText font={AppFonts.Regular} size={16} color={Colors.black}>
            {label.replace('*', '')}
          </AppText>
          {label.includes('*') && (
            <AppText font={AppFonts.Regular} size={16} color="red">
              *
            </AppText>
          )}
        </View>
      )}
      <View
        style={[
          styles.container,
          isFocused && styles.focusedContainer,
          error && styles.errorContainer,
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            <Image source={leftIcon} style={styles.icon} resizeMode="contain" />
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.black30}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIconContainer}>
            <Image source={rightIcon} style={[styles.icon, { tintColor: Colors.black30 }]} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <AppText size={12} color="red" style={styles.errorText}>
          {error}
        </AppText>
      )}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
  },
  focusedContainer: {
    borderColor: Colors.primary,
  },
  errorContainer: {
    borderColor: 'red',
  },
  leftIconContainer: {
    marginRight: 12,
  },
  rightIconContainer: {
    marginLeft: 10,
  },
  icon: {
    width: 22,
    height: 22,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: AppFonts.Regular,
    color: Colors.black,
    padding: 0, // Reset default padding
  },
  errorText: {
    marginTop: 4,
  },
});
