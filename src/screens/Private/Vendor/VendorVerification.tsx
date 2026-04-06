import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';

const VendorVerification = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title="Settings"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Error Alert */}
        <View style={styles.alertCard}>
          <AppText size={13} color="#8C5336" font={AppFonts.Regular}>
            ⚠️ Error! Your account is not enabled for selling, please contact the admin
          </AppText>
        </View>

        {/* Section Title */}
        <View style={styles.titleRow}>
          <Image source={ImageAssets.star} style={styles.sparkleIcon} />
          <AppText size={20} font={AppFonts.SemiBold} color="#0E2E48">
            Verification
          </AppText>
        </View>

        {/* Empty State Card */}
        <View style={styles.emptyCard}>
           <Image 
             source={ImageAssets.netSales} // Or another magnifying glass icon placeholder
             style={styles.emptyIllustration} 
             resizeMode="contain" 
           />
           <AppText font={AppFonts.SemiBold} size={22} color="#0E2E48" style={styles.mainMsg}>
              Social Profiles
           </AppText>
           <AppText font={AppFonts.Regular} size={15} color="#0E2E4899" textAlign="center" style={styles.subMsg}>
             No Social App is configured by website Admin.
           </AppText>
           
           <TouchableOpacity 
             style={styles.exploreBtn}
             activeOpacity={0.8}
           >
             <AppText font={AppFonts.SemiBold} size={16} color={Colors.white}>Explor Store</AppText>
           </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default VendorVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  alertCard: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#FFEEBA',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  sparkleIcon: {
    width: 22,
    height: 22,
    tintColor: Colors.primary,
    resizeMode: 'contain',
  },
  emptyCard: {
    marginTop: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 30,
    paddingVertical: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  emptyIllustration: {
    width: 140,
    height: 120,
    marginBottom: 25,
  },
  mainMsg: {
    marginBottom: 10,
  },
  subMsg: {
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  exploreBtn: {
     backgroundColor: '#531DFE',
     width: '100%',
     height: 52,
     borderRadius: 12,
     justifyContent: 'center',
     alignItems: 'center',
     shadowColor: '#531DFE',
     shadowOffset: { width: 0, height: 4 },
     shadowOpacity: 0.3,
     shadowRadius: 8,
     elevation: 4,
  },
});
