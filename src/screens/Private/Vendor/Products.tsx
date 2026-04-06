import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';
import LinearGradient from 'react-native-linear-gradient';

const Products = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title="Products"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.content}>
          <View style={styles.alertCard}>
            <AppText size={13} color="#8C5336" font={AppFonts.Regular}>
              ⚠️ Error! Your account is not enabled for selling, please contact the admin
            </AppText>
          </View>

          <View style={styles.titleRow}>
            <Image source={ImageAssets.star} style={styles.sparkleIcon} />
            <AppText size={18} font={AppFonts.SemiBold} color="#0E2E48">Products</AppText>
          </View>

          <View style={styles.emptyCard}>
            <View style={styles.emptyContent}>
              <Image source={ImageAssets.noProduct} style={styles.boxImage} />
              <AppText font={AppFonts.SemiBold} size={20} color="#0E2E48" style={styles.emptyTitle}>
                No Product Found
              </AppText>
              <AppText font={AppFonts.Regular} size={14} color="#0E2E4899" style={styles.emptySubtitle}>
                Ready to start selling something awesome?
              </AppText>

              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.importBtn}>
                  <AppText font={AppFonts.Bold} size={15} color="#0E2E4880">Import</AppText>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.primaryBtn}
                  onPress={() => navigation.navigate('AddProduct')}
                >
                  <LinearGradient
                    colors={['#6A44E3', '#4A25C7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradient}
                  >
                    <AppText font={AppFonts.Bold} size={15} color={Colors.white}>Add New Product</AppText>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  alertCard: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#FFEEBA',
    marginTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  sparkleIcon: {
    width: 20,
    height: 20,
    tintColor: '#9370DB',
    resizeMode: 'contain',
  },
  emptyCard: {
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 20,
    padding: 30,
    minHeight: 400,
    justifyContent: 'center',
  },
  emptyContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxImage: {
    width: 160,
    height: 150,
    resizeMode: 'contain',
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptySubtitle: {
    textAlign: 'center',
    marginBottom: 30,
  },
  btnRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 15,
  },
  importBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#0E2E481A',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryBtn: {
    flex: 1.5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
