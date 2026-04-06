import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';
import FormContainer from '../../../components/FormContainer';
import LinearGradient from 'react-native-linear-gradient';

const AddCoupon = ({ navigation }: any) => {
  const renderField = (label: string, placeholder: string = "enter Coupon Title") => (
    <View style={styles.fieldGroup}>
      <AppText font={AppFonts.Medium} size={14} color="#0E2E48" style={styles.label}>{label}</AppText>
      <View style={styles.inputBox}>
        <TextInput 
          placeholder={placeholder} 
          placeholderTextColor="#0E2E484D" 
          style={styles.input} 
        />
      </View>
    </View>
  );

  const renderCheckbox = (label: string, subtitle?: string) => (
    <View style={styles.checkWrapper}>
        <TouchableOpacity style={styles.checkRow} activeOpacity={0.8}>
            <View style={styles.checkBox} />
            <AppText font={AppFonts.Medium} size={15} color="#0E2E48">{label}</AppText>
        </TouchableOpacity>
        {subtitle && (
            <AppText font={AppFonts.Regular} size={12} color="#0E2E4899" style={styles.checkSubtitle}>
                {subtitle}
            </AppText>
        )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title="Coupons"
        onBackPress={() => navigation.goBack()}
      />

      <FormContainer contentContainerStyle={styles.formContent}>
        {/* Error Alert */}
        <View style={styles.alertCard}>
          <AppText size={13} color="#8C5336" font={AppFonts.Regular}>
            ⚠️ Error! Your account is not enabled for selling, please contact the admin
          </AppText>
        </View>

        <View style={styles.titleRow}>
          <Image source={ImageAssets.star} style={styles.sparkleIcon} />
          <AppText size={18} font={AppFonts.SemiBold} color="#0E2E48">Coupons</AppText>
        </View>

        {/* Toggle Switch (Static for now) */}
        <View style={styles.toggleRow}>
            <TouchableOpacity style={[styles.toggleBtn, styles.activeToggle]}>
                <AppText font={AppFonts.SemiBold} size={14} color={Colors.white}>My Coupons</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleBtn}>
                <AppText font={AppFonts.Medium} size={14} color="#0E2E48">Marketplace Coupons</AppText>
            </TouchableOpacity>
        </View>

        {/* Form Fields */}
        {renderField('Coupon Title')}
        {renderField('Description', 'enter name')}
        {renderField('Discount Type')}
        {renderField('Coupon Amount')}
        {renderField('Email Restrictions')}
        {renderField('Usage Limit')}
        {renderField('Usage Limit Per User')}
        {renderField('Expire Date')}
        {renderField('Minimum Amount')}
        {renderField('Product')}
        {renderField('Exclude Products')}
        {renderField('Categories')}
        {renderField('Categories Exclude')}

        {/* Checkbox Sections */}
        {renderCheckbox(
            'Categories Exclude', 
            'Check this box if the coupon should not apply to items on sale. Per-item coupons will only work if the item is not on sale. Per-cart coupons will only work if there are no sale items in the cart.'
        )}
        
        {renderCheckbox(
            'Show on store', 
            'Check this box if you want to show this coupon in store page'
        )}

        {renderCheckbox(
            'Allow free shipping', 
            'Check this box if the coupon grants free shipping. A free shipping method must be enabled in your shipping zone and be set to require a valid free shipping coupon.'
        )}

        {/* Buttons */}
        <View style={styles.actionRow}>
            <TouchableOpacity 
                style={styles.cancelBtn}
                onPress={() => navigation.goBack()}
            >
                <AppText font={AppFonts.SemiBold} size={16} color="#0E2E48">Cancel</AppText>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.createBtn}
                onPress={() => navigation.goBack()}
            >
                <LinearGradient
                    colors={['#6A44E3', '#4A25C7']}
                    style={styles.gradient}
                >
                    <AppText font={AppFonts.Bold} size={16} color={Colors.white}>Create</AppText>
                </LinearGradient>
            </TouchableOpacity>
        </View>
        
        <View style={{ height: 40 }} />
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  formContent: {
    padding: 20,
    paddingTop: 10,
  },
  alertCard: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFEEBA',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 25,
  },
  sparkleIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: Colors.primary,
  },
  toggleRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 12,
    padding: 2,
    marginBottom: 25,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeToggle: {
    backgroundColor: '#531DFE',
  },
  fieldGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 10,
  },
  inputBox: {
    height: 54,
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontFamily: AppFonts.Medium,
    fontSize: 14,
    color: '#0E2E48',
  },
  checkWrapper: {
      marginBottom: 20,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#0E2E484D',
    borderRadius: 3,
  },
  checkSubtitle: {
      lineHeight: 18,
      paddingLeft: 32,
  },
  actionRow: {
      flexDirection: 'row',
      gap: 15,
      marginTop: 20,
  },
  cancelBtn: {
      flex: 1,
      height: 56,
      borderRadius: 12,
      backgroundColor: '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
  },
  createBtn: {
      flex: 1.5,
      height: 56,
      borderRadius: 12,
      overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddCoupon;
