import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import VendorHeader from '../../../components/VendorHeader';

const { width } = Dimensions.get('window');

const VisitStore = ({ navigation }: any) => {
  const [multiLocation, setMultiLocation] = useState(false);
  const [supportInStore, setSupportInStore] = useState(false);
  const [supportInProduct, setSupportInProduct] = useState(false);

  const renderInput = (label: string, placeholder: string, icon: any) => (
    <View style={styles.inputContainer}>
      <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.label}>
        {label}
      </AppText>
      <View style={styles.inputWrapper}>
        <Image source={icon} style={styles.inputIcon} resizeMode="contain" />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#0E2E484D"
          style={styles.input}
        />
      </View>
    </View>
  );

  const renderCheckbox = (label: string, value: boolean, onValueChange: (v: boolean) => void) => (
    <TouchableOpacity
      style={styles.checkboxRow}
      activeOpacity={0.7}
      onPress={() => onValueChange(!value)}
    >
      <View style={[styles.checkbox, value && styles.checkboxActive]}>
        {value && <Image source={ImageAssets.check} style={styles.checkIcon} />}
      </View>
      <AppText font={AppFonts.Regular} size={15} color="#0E2E48CC">
        {label}
      </AppText>
    </TouchableOpacity>
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
            Visit Store
          </AppText>
        </View>

        {/* Profile Picture Upload */}
        <View style={styles.section}>
          <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.label}>
            Profile Picture
          </AppText>
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.6}>
            <Image source={ImageAssets.drag} style={styles.uploadIcon} resizeMode="contain" />
            <AppText font={AppFonts.Regular} size={13} color="#0E2E4899">Drag and Drop here</AppText>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        {renderInput('Store Name', 'enter name', ImageAssets.shop)}
        {renderInput('Phone Number', 'enter mobile number', ImageAssets.mobile)}

        {renderCheckbox('Store has multiple locations', multiLocation, setMultiLocation)}

        {renderInput('Country / Region', 'enter name', ImageAssets.location)}
        {renderInput('Town / City', 'enter name', ImageAssets.location)}
        {renderInput('State', 'enter name', ImageAssets.location)}
        {renderInput('PIN Code', 'enter name', ImageAssets.location)}

        {renderInput('Biography', 'enter name', ImageAssets.bio)}

        {/* Enable Support */}
        <View style={styles.section}>
          <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.label}>
            Enable Support
          </AppText>
          {renderCheckbox('Show support button in store', supportInStore, setSupportInStore)}
          <View style={{ height: 10 }} />
          {renderCheckbox('Show support button in single product', supportInProduct, setSupportInProduct)}
        </View>

        {renderInput('Support Button text', 'enter name', ImageAssets.bio)}

        <TouchableOpacity
          style={styles.updateBtn}
          activeOpacity={0.8}
        >
          <AppText font={AppFonts.SemiBold} size={16} color={Colors.white}>Update Setting</AppText>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default VisitStore;

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
  section: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
  },
  uploadBox: {
    height: 120,
    borderWidth: 1.5,
    borderColor: '#531DFE',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#F9F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  uploadIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
    tintColor: '#531DFE',
  },
  inputContainer: {
    marginBottom: 20,
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
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: '#0E2E48CC',
  },
  input: {
    flex: 1,
    fontFamily: AppFonts.Regular,
    fontSize: 15,
    color: '#0E2E48',
    padding: 0,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
    backgroundColor: Colors.white,
  },
  checkboxActive: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
  },
  checkIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
    resizeMode: 'contain',
  },
  updateBtn: {
    backgroundColor: '#531DFE',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#531DFE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
