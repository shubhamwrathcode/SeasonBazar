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

import { useWishlistStore } from '../../../store/useWishlistStore';
import { useCartStore } from '../../../store/useCartStore';
import SimpleToast from 'react-native-simple-toast';

const { width } = Dimensions.get('window');

const Wishlist = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { favorites, toggleWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const renderFavoriteItem = ({ item }: { item: any }) => (
    <View style={styles.favoriteCard}>
      <View style={styles.cardHeader}>
        <LinearGradient 
          colors={['#FFFFFF', '#AF8ACA33']} 
          style={styles.imgBg}
        >
          <Image source={{ uri: item.image }} style={styles.productImg} resizeMode="contain" />
        </LinearGradient>
        <View style={styles.infoArea}>
          <View style={styles.titleRow}>
            <AppText font={AppFonts.Medium} size={15} color="#535353CC" style={styles.titleText}>
              {item.name}
            </AppText>
            <TouchableOpacity onPress={() => toggleWishlist(item)}>
               <Image source={ImageAssets.heartfill} style={styles.heartIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.priceRow}>
            {item.regular_price && (
               <AppText font={AppFonts.Regular} size={13} color={Colors.black30} style={styles.oldPrice}>
                  ₹{item.regular_price}
               </AppText>
            )}
            <AppText font={AppFonts.SemiBold} size={20} color={Colors.black}>
              ₹{item.price}
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.removeBtn} onPress={() => toggleWishlist(item)}>
          <AppText font={AppFonts.Medium} size={16} color={Colors.black}>Remove</AppText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.addBtn}
          onPress={() => {
             addItem(item);
             SimpleToast.show('Added to Cart');
          }}
        >
          <AppText font={AppFonts.Medium} size={16} color={Colors.white}>Add to Cart</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
        <Image source={ImageAssets.wishlist} style={{ width: 100, height: 100, tintColor: '#DDD' }} />
        <AppText font={AppFonts.SemiBold} size={20} color={Colors.black} style={{ marginTop: 20 }}>No Favorites Yet</AppText>
        <TouchableOpacity style={styles.shopNowBtn} onPress={() => navigation.navigate('Home')}>
           <AppText font={AppFonts.Medium} size={16} color={Colors.white}>Explore Products</AppText>
        </TouchableOpacity>
     </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <AppHeader title="Favorites" onBack={() => navigation.goBack()} />

      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        ListEmptyComponent={renderEmpty}
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
  shopNowBtn: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
});
