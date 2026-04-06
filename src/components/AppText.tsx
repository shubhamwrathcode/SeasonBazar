import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { AppFonts } from './Appfonts';
import { Colors } from './colors';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  color?: string;
  size?: number;
  font?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const AppText: React.FC<AppTextProps> = ({
  children,
  style,
  color = Colors.black,
  size = 14,
  font = AppFonts.Regular,
  textAlign = 'left',
  ...props
}) => {
  return (
    <Text
      style={[
        {
          color,
          fontSize: size,
          fontFamily: font,
          textAlign,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({});
