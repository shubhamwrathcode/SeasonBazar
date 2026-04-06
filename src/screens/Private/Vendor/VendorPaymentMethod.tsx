import React, { useState } from 'react';
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

const VendorPaymentMethod = ({ navigation }: any) => {
  const [agreed, setAgreed] = useState(false);

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
        {/* Warning Alert */}
        <View style={styles.warningCard}>
           <AppText size={14} color="#8C5300" font={AppFonts.SemiBold} style={{ marginBottom: 4 }}>
             ⚠️ Please double-check your account information!
           </AppText>
           <AppText size={12} color="#8C5300" font={AppFonts.Regular}>
             Incorrect or mismatched account name and number can result in withdrawal delays and fees
           </AppText>
        </View>

        {/* Section Title */}
        <View style={styles.titleRow}>
          <Image source={ImageAssets.star} style={styles.sparkleIcon} />
          <AppText size={20} font={AppFonts.SemiBold} color="#0E2E48">
            Payment Methods
          </AppText>
        </View>

        {/* Form Fields */}
        {renderField('Account Holder', 'enter Coupon title')}
        {renderField('Account Type', 'enter Coupon title')}
        {renderField('Account Number', 'enter Coupon title')}
        {renderField('Routing Number', 'enter Coupon title')}
        {renderField('Bank Name', 'enter Coupon title')}
        {renderField('Bank Address', 'enter Coupon title')}
        {renderField('Bank IBAN', 'enter Coupon title')}
        {renderField('Bank Swift Code', 'enter Coupon title')}

        {/* Check Diagram Meta Image */}
        <View style={styles.diagramContainer}>
           <Image 
             source={ImageAssets.delivery} // Placeholder until we have the specific check asset
             style={styles.diagramImg} 
             resizeMode="cover" 
           />
        </View>

        {/* Authorization Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxRow} 
          activeOpacity={0.7}
          onPress={() => setAgreed(!agreed)}
        >
          <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
            {agreed && <Image source={ImageAssets.check} style={styles.checkIcon} />}
          </View>
          <AppText font={AppFonts.Regular} size={13} color="#0E2E4899" style={{ flex: 1 }}>
            I attest that I am the owner and have full authorization to this bank account
          </AppText>
        </TouchableOpacity>

        {/* Bottom Buttons */}
        <View style={styles.btnRow}>
           <TouchableOpacity 
             style={styles.cancelBtn}
             onPress={() => navigation.goBack()}
           >
             <AppText font={AppFonts.SemiBold} size={16} color="#0E2E48">Cancel</AppText>
           </TouchableOpacity>
           <TouchableOpacity style={styles.addBtn}>
             <AppText font={AppFonts.SemiBold} size={16} color={Colors.white}>Add Account</AppText>
           </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default VendorPaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  warningCard: {
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
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 8,
  },
  inputWrapper: {
    height: 52,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  input: {
    fontFamily: AppFonts.Regular,
    fontSize: 15,
    color: '#0E2E48',
  },
  diagramContainer: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
    marginBottom: 20,
  },
  diagramImg: {
     width: '100%',
     height: '100%',
     opacity: 0.6,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    borderColor: 'transparent',
    borderWidth: 0,
  },
  checkIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
    resizeMode: 'contain',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 15,
  },
  cancelBtn: {
     flex: 1,
     height: 52,
     backgroundColor: '#F5F5F5',
     borderRadius: 12,
     justifyContent: 'center',
     alignItems: 'center',
  },
  addBtn: {
     flex: 1,
     height: 52,
     backgroundColor: '#531DFE',
     borderRadius: 12,
     justifyContent: 'center',
     alignItems: 'center',
     shadowColor: '#531DFE',
     shadowOffset: { width: 0, height: 4 },
     shadowOpacity: 0.2,
     shadowRadius: 8,
     elevation: 4,
  },
});
