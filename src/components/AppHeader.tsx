import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
} from 'react-native';
import { Colors } from './colors';
import { AppFonts } from './Appfonts';
import AppText from './AppText';
import { ImageAssets } from './ImageAssets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppHeaderProps {
  title?: string;
  onBack?: () => void;
  onSearch?: () => void;
  onFilter?: () => void;
  isSearchMode?: boolean;
  placeholder?: string;
  searchValue?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
}

const AppHeader = ({
  title,
  onBack,
  onSearch,
  onFilter,
  isSearchMode = false,
  placeholder = "Search...",
  searchValue,
  onChangeText,
  onSubmitEditing,
}: AppHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.headerRow}>
        <View style={styles.leftGroup}>
          <TouchableOpacity onPress={onBack} >
            <Image source={ImageAssets.backIcon} style={styles.backIcon} />
          </TouchableOpacity>

          <AppText font={AppFonts.Medium} size={22} color={Colors.white} style={styles.title}>
            {title}
          </AppText>
        </View>

        {isSearchMode ? (
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Image source={ImageAssets.search} style={styles.searchIconSmall} />
              <TextInput
                placeholder={placeholder}
                placeholderTextColor={Colors.black30}
                style={styles.searchInput}
                value={searchValue}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                returnKeyType="search"
              />
            </View>
            <TouchableOpacity onPress={onFilter} style={styles.filterBtn}>
              <Image source={ImageAssets.filter} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          onSearch && (
            <TouchableOpacity onPress={onSearch} style={styles.searchBtn}>
              <Image source={ImageAssets.search} style={styles.searchIcon} />
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    height: 45,
    backgroundColor: Colors.white,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchIconSmall: {
    width: 18,
    height: 18,
    tintColor: Colors.black30,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: AppFonts.Regular,
    fontSize: 15,
    color: Colors.black,
    padding: 0,
  },
  filterBtn: {
    width: 44,
    height: 44,
    backgroundColor: Colors.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 35,
    height: 35,
    tintColor: Colors.white,
    resizeMode: 'contain',
  },
  title: {
    marginLeft: 15,
  },
  searchBtn: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.primary,
  },
});
