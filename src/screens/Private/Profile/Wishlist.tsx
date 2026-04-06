import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import AppHeader from '../../../components/AppHeader';

import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const FAVORITES = [
  { id: '1', name: 'Noise ColorFit Pro 6 ...', price: '₹1,000', originalPrice: '3,000', strap: 'Green Titanium', image: ImageAssets.watch },
  { id: '2', name: 'Noise ColorFit Pro 6 ...', price: '₹1,000', originalPrice: '3,000', strap: 'Green Titanium', image: ImageAssets.watch },
  { id: '3', name: 'Noise ColorFit Pro 6 ...', price: '₹1,000', originalPrice: '3,000', strap: 'Green Titanium', image: ImageAssets.watch },
  { id: '4', name: 'Noise ColorFit Pro 6 ...', price: '₹1,000', originalPrice: '3,000', strap: 'Green Titanium', image: ImageAssets.watch },
];

const Wishlist = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const renderFavoriteItem = ({ item }: { item: any }) => (
    <View style={styles.favoriteCard}>
      <View style={styles.cardHeader}>
        <LinearGradient 
          colors={['#FFFFFF', '#AF8ACA33']} 
          style={styles.imgBg}
        >
          <Image source={item.image} style={styles.productImg} resizeMode="contain" />
        </LinearGradient>
        <View style={styles.infoArea}>
          <View style={styles.titleRow}>
            <AppText font={AppFonts.Medium} size={15} color="#535353CC" style={styles.titleText}>
              {item.name}
            </AppText>
            <Image source={ImageAssets.heartfill} style={styles.heartIcon} />
          </View>
          <View style={styles.priceRow}>
            <AppText font={AppFonts.Regular} size={13} color={Colors.black30} style={styles.oldPrice}>
              {item.originalPrice}
            </AppText>
            <AppText font={AppFonts.SemiBold} size={20} color={Colors.black}>
              {item.price}
            </AppText>
          </View>
          <AppText font={AppFonts.Regular} size={12} color="#535353CC">
            Selected Strap Color: <AppText font={AppFonts.Medium} color="#535353CC">{item.strap}</AppText>
          </AppText>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.removeBtn}>
          <AppText font={AppFonts.Medium} size={16} color={Colors.black}>Remove</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addBtn}>
          <AppText font={AppFonts.Medium} size={16} color={Colors.white}>Add Card</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <AppHeader title="Favorites" onBack={() => navigation.goBack()} />

      <FlatList
        data={FAVORITES}
        renderItem={renderFavoriteItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  favoriteCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 0.7,
    borderColor: Colors.black30,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  imgBg: {
    width: 100,
    height: 100,
    backgroundColor: '#F1F4FFCC',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImg: {
    width: '80%',
    height: '80%',
  },
  infoArea: {
    flex: 1,
    marginLeft: 15,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleText: {
    flex: 1,
  },
  heartIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
    resizeMode: "contain"
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },
  cardFooter: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  removeBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: Colors.black30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  addBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
