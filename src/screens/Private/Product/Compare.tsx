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

const COMPARE_PRODUCTS = [
  { id: '1', name: 'Noise ColorFit Pro 6 ...', rating: '4.5', price: '₹1,000', originalPrice: '₹3,000', availability: 'In Stock', sku: 'NA', dims: 'NA', weight: 'NA', image: ImageAssets.watch },
  { id: '2', name: 'Noise ColorFit Pro 6 ...', rating: '4.5', price: '₹1,000', originalPrice: '₹3,000', availability: 'In Stock', sku: 'NA', dims: 'NA', weight: 'NA', image: ImageAssets.watch },
  { id: '3', name: 'Noise ColorFit Pro 6 ...', rating: '4.5', price: '₹1,000', originalPrice: '₹3,000', availability: 'In Stock', sku: 'NA', dims: 'NA', weight: 'NA', image: ImageAssets.watch },
  { id: '4', name: 'Noise ColorFit Pro 6 ...', rating: '4.5', price: '₹1,000', originalPrice: '₹3,000', availability: 'In Stock', sku: 'NA', dims: 'NA', weight: 'NA', image: ImageAssets.watch },
];

const Compare = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const renderCompareItem = ({ item }: { item: any }) => (
    <View style={styles.compareCard}>
      <LinearGradient 
        colors={['#FFFFFF', '#AF8ACA1A']} 
        style={styles.imgArea}
      >
        <Image source={item.image} style={styles.productImg} resizeMode="contain" />
        <TouchableOpacity style={styles.removeBtn}>
          <Image source={ImageAssets.delete} style={styles.trashIcon} />
        </TouchableOpacity>
      </LinearGradient>
      
      <View style={styles.infoSection}>
        <AppText font={AppFonts.Medium} size={14} color="#535353CC" style={styles.productTitle} numberOfLines={1}>
          {item.name}
        </AppText>
        
        <View style={styles.specRow}>
          <AppText font={AppFonts.Regular} size={11} color={Colors.textGrey}>Rating</AppText>
          <View style={styles.ratingRow}>
            <Image source={ImageAssets.star1} style={styles.starIcon} />
            <AppText font={AppFonts.Regular} size={11} color={Colors.black}>{item.rating}</AppText>
          </View>
        </View>

        <View style={styles.specRow}>
          <AppText font={AppFonts.Regular} size={11} color={Colors.textGrey}>Price</AppText>
          <View style={styles.priceRow}>
            <AppText font={AppFonts.Regular} size={10} color={Colors.black30} style={styles.oldPrice}>{item.originalPrice}</AppText>
            <AppText font={AppFonts.SemiBold} size={12} color={Colors.black}>{item.price}</AppText>
          </View>
        </View>

        <View style={styles.specRow}>
          <AppText font={AppFonts.Regular} size={11} color={Colors.textGrey}>Status</AppText>
          <AppText font={AppFonts.Regular} size={11} color="#2ECC71">{item.availability}</AppText>
        </View>

        <View style={styles.specRow}>
          <AppText font={AppFonts.Regular} size={11} color={Colors.textGrey}>SKU</AppText>
          <AppText font={AppFonts.Regular} size={11} color={Colors.black}>{item.sku}</AppText>
        </View>

        <View style={styles.specRow}>
          <AppText font={AppFonts.Regular} size={11} color={Colors.textGrey}>Dims</AppText>
          <AppText font={AppFonts.Regular} size={11} color={Colors.black}>{item.dims}</AppText>
        </View>
      </View>

      <TouchableOpacity style={styles.addBtn}>
        <AppText font={AppFonts.Medium} size={13} color={Colors.white}>Add Card</AppText>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <AppHeader title="Compare" onBack={() => navigation.goBack()} />

      <FlatList
        data={COMPARE_PRODUCTS}
        renderItem={renderCompareItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

export default Compare;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  listContent: {
    padding: 12,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  compareCard: {
    width: (width - 40) / 2,
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#F0F0F0',
    marginBottom: 15,
    padding: 8,
    elevation: 1,
  },
  imgArea: {
    height: 125,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  productImg: {
    width: '80%',
    height: '80%',
  },
  removeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  trashIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain"
  },
  infoSection: {
    gap: 6,
    marginBottom: 12,
  },
  productTitle: {
    marginBottom: 2,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  starIcon: {
    width: 10,
    height: 10,
    tintColor: '#FFC529',
    resizeMode: 'contain',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },
  addBtn: {
    backgroundColor: Colors.primary,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
