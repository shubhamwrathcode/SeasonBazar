import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import AppHeader from '../../../components/AppHeader';
import { useCompareStore } from '../../../store/useCompareStore';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = 160;

const Compare = ({ navigation }: any) => {
  const { compareList, removeFromCompare } = useCompareStore();

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Image source={ImageAssets.compare} style={styles.emptyIcon} />
      <AppText font={AppFonts.SemiBold} size={20} color={Colors.black}>Compare List is Empty</AppText>
      <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey} style={{ textAlign: 'center', marginTop: 10 }}>
        Add products to compare prices and features!
      </AppText>
      <TouchableOpacity 
        style={styles.shopBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <AppText font={AppFonts.Medium} color={Colors.white}>Go to Shop</AppText>
      </TouchableOpacity>
    </View>
  );

  if (compareList.length === 0) {
    return (
      <View style={styles.container}>
        <AppHeader title="Compare Products" onBack={() => navigation.goBack()} />
        {renderEmpty()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" transparent backgroundColor="transparent" />
      <AppHeader title="Compare Products" onBack={() => navigation.goBack()} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Section: Product Basic Info */}
          <View style={styles.row}>
            {compareList.map((product) => (
              <View key={product.id} style={styles.column}>
                <TouchableOpacity 
                  style={styles.removeBtn} 
                  onPress={() => removeFromCompare(product.id)}
                >
                  <AppText font={AppFonts.Bold} color="red">✕</AppText>
                </TouchableOpacity>
                
                <View style={styles.imgBg}>
                  <Image 
                    source={product.image ? { uri: product.image } : ImageAssets.watch} 
                    style={styles.productImg} 
                    resizeMode="contain" 
                  />
                </View>
                
                <AppText font={AppFonts.SemiBold} size={14} color={Colors.black} numberOfLines={2} style={styles.name}>
                  {product.name}
                </AppText>
                
                <AppText font={AppFonts.Bold} size={18} color={Colors.primary} style={styles.price}>
                   ₹{product.price}
                </AppText>
                
                <TouchableOpacity 
                    style={styles.addToCartBtn}
                    onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
                >
                    <AppText font={AppFonts.Medium} size={12} color={Colors.white}>View Details</AppText>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Section: Rating */}
          <View style={styles.sectionHeader}>
            <AppText font={AppFonts.Bold} size={16} color={Colors.black}>Ratings & Reviews</AppText>
          </View>
          <View style={styles.row}>
             {compareList.map((product) => (
               <View key={product.id} style={styles.column}>
                 <View style={styles.ratingBox}>
                    <AppText font={AppFonts.Bold} color={Colors.white}>{product.average_rating || '0.0'}</AppText>
                    <Image source={ImageAssets.star} style={styles.starIcon} />
                 </View>
               </View>
             ))}
          </View>

          {/* Section: Category */}
          <View style={styles.sectionHeader}>
            <AppText font={AppFonts.Bold} size={16} color={Colors.black}>Category</AppText>
          </View>
          <View style={styles.row}>
             {compareList.map((product) => (
               <View key={product.id} style={styles.column}>
                 <AppText font={AppFonts.Regular} size={13} color={Colors.textGrey}>
                    {product.categories?.[0]?.name || 'General'}
                 </AppText>
               </View>
             ))}
          </View>

          {/* Section: Summary */}
          <View style={styles.sectionHeader}>
            <AppText font={AppFonts.Bold} size={16} color={Colors.black}>Short Info</AppText>
          </View>
          <View style={[styles.row, { alignItems: 'flex-start' }]}>
             {compareList.map((product) => (
               <View key={product.id} style={styles.column}>
                 <AppText font={AppFonts.Regular} size={12} color={Colors.textGrey} numberOfLines={5}>
                    {product.short_description?.replace(/<[^>]*>?/gm, '') || 'No additional info'}
                 </AppText>
               </View>
             ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Compare;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  column: {
    width: COLUMN_WIDTH,
    padding: 15,
    borderRightWidth: 1,
    borderRightColor: '#F0F0F0',
    alignItems: 'center',
  },
  imgBg: {
    width: 120,
    height: 120,
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImg: {
    width: '80%',
    height: '80%',
  },
  name: {
    textAlign: 'center',
    marginBottom: 8,
    height: 40,
  },
  price: {
    marginBottom: 10,
  },
  addToCartBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    backgroundColor: '#F8F9FB',
    padding: 12,
    paddingHorizontal: 20,
  },
  ratingBox: {
    flexDirection: 'row',
    backgroundColor: 'green',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    alignItems: 'center',
    gap: 4,
  },
  starIcon: {
    width: 10,
    height: 10,
    tintColor: Colors.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    tintColor: '#DDD',
    marginBottom: 20,
  },
  shopBtn: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
});
