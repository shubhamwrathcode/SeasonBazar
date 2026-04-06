import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from './colors';
import { AppFonts } from './Appfonts';
import AppText from './AppText';
import { ImageAssets } from './ImageAssets';

interface VendorHeaderProps {
  title: string;
  onBackPress?: () => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

const VendorHeader: React.FC<VendorHeaderProps> = ({
  title,
  onBackPress,
  showSearch = true,
  searchPlaceholder = "Find a Product"
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.headerTop}>
        <View style={styles.leftRow}>
          {onBackPress && (
            <TouchableOpacity style={styles.backBtn} onPress={onBackPress}>
              <Image source={ImageAssets.backIcon} style={styles.backIcon} />
            </TouchableOpacity>
          )}
          <AppText font={AppFonts.Medium} size={24} color={Colors.white}>
            {title}
          </AppText>
        </View>
      </View>

      {showSearch && (
        <View style={styles.searchBar}>
          <Image source={ImageAssets.search} style={styles.searchIcon} />
          <TextInput
            placeholder={searchPlaceholder}
            placeholderTextColor={Colors.black30}
            style={styles.searchInput}
          />
          <Image source={ImageAssets.mic} style={styles.micIcon} />
        </View>
      )}
    </View>
  );
};

export default VendorHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 25,
    zIndex: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 35,
    height: 35,
    tintColor: Colors.white,
    resizeMode: 'contain',
  },
  searchBar: {
    height: 52,
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.black30,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: AppFonts.Regular,
    fontSize: 16,
    color: Colors.black,
  },
  micIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
