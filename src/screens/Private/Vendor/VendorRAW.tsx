import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';

const VendorRAW = ({ navigation }: any) => {
  const renderField = (label: string, placeholder: string) => (
    <View style={styles.inputGroup}>
      <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.label}>
        {label}
      </AppText>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#0E2E484D"
          style={styles.input}
        />
      </View>
    </View>
  );

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
            Return And Warranty
          </AppText>
        </View>

        <AppText font={AppFonts.Regular} size={15} color="#0E2E4899" style={styles.description}>
          Set Your Settings For Return And Warranty Your Products. This Settings Will Effect Globally For Your Products
        </AppText>

        {/* Form Fields */}
        <View style={styles.form}>
           {renderField('Label', 'enter Coupon title')}
           {renderField('Type', 'enter Coupon title')}
           {renderField('RMA Policy', 'enter Coupon title')}
        </View>

        <TouchableOpacity 
          style={styles.saveBtn}
          activeOpacity={0.8}
        >
          <AppText font={AppFonts.SemiBold} size={16} color={Colors.white}>Save Changes</AppText>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default VendorRAW;

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
  description: {
    lineHeight: 22,
    marginBottom: 25,
    color: '#0E2E4899',
  },
  form: {
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
  },
  inputWrapper: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    fontFamily: AppFonts.Regular,
    fontSize: 15,
    color: '#0E2E48',
  },
  saveBtn: {
    backgroundColor: '#531DFE',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#531DFE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
