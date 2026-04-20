import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import AppHeader from '../../../components/AppHeader';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { customerService } from '../../../services/customerService';
import { useAuthStore } from '../../../store/useAuthStore';
import Toast from 'react-native-simple-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const ManageAddresses = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editType, setEditType] = useState<'billing' | 'shipping'>('billing');

  const [billing, setBilling] = useState<any>({
    first_name: '',
    last_name: '',
    address_1: '',
    city: '',
    state: '',
    postcode: '',
    country: 'IN',
    phone: '',
  });

  const [shipping, setShipping] = useState<any>({
    first_name: '',
    last_name: '',
    address_1: '',
    city: '',
    state: '',
    postcode: '',
    country: 'IN',
  });

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await customerService.getCustomer(Number(user.id));
      if (data.billing) setBilling(data.billing);
      if (data.shipping) setShipping(data.shipping);
    } catch (error) {
      Toast.show('Error loading addresses', Toast.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const openEditor = (type: 'billing' | 'shipping') => {
    setEditType(type);
    setFormData(type === 'billing' ? { ...billing } : { ...shipping });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user?.id) return;
    try {
      setSaving(true);
      const updateData = { [editType]: formData };
      await customerService.updateCustomer(Number(user.id), updateData);
      
      if (editType === 'billing') setBilling(formData);
      else setShipping(formData);
      
      setIsEditing(false);
      Toast.show('Address updated successfully', Toast.SHORT);
    } catch (error: any) {
      Toast.show('Failed to update address', Toast.SHORT);
    } finally {
      setSaving(false);
    }
  };

  const copyBillingToShipping = () => {
    setFormData({
      ...billing,
      // exclude phone if you want, but shipping often has no phone in WC default
    });
    Toast.show('Copied from Billing', Toast.SHORT);
  };

  const renderAddressCard = (type: 'billing' | 'shipping', data: any) => (
    <TouchableOpacity 
      style={styles.addressCard} 
      activeOpacity={0.7}
      onPress={() => openEditor(type)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.typeBadge}>
          <AppText font={AppFonts.Medium} size={12} color={Colors.primary}>{type.toUpperCase()}</AppText>
        </View>
        <AppText font={AppFonts.Medium} size={14} color={Colors.primary}>Edit</AppText>
      </View>
      
      <AppText font={AppFonts.SemiBold} size={18} color={Colors.black} style={styles.nameText}>
        {data.first_name} {data.last_name}
      </AppText>
      
      <AppText font={AppFonts.Regular} size={15} color={Colors.textGrey} style={styles.addressText}>
        {data.address_1 || 'No address added yet'}
      </AppText>
      
      <AppText font={AppFonts.Regular} size={15} color={Colors.textGrey}>
        {data.city}{data.city && data.postcode ? ', ' : ''}{data.postcode}
      </AppText>
      
      <AppText font={AppFonts.Regular} size={15} color={Colors.textGrey}>
        {data.state}{data.state && data.country ? ', ' : ''}{data.country === 'IN' ? 'India' : data.country}
      </AppText>

      {type === 'billing' && data.phone && (
        <View style={styles.phoneRow}>
           <AppText font={AppFonts.Medium} size={14} color={Colors.black}>Phone: </AppText>
           <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>{data.phone}</AppText>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderInput = (label: string, value: string, key: string, keyboardType: any = 'default') => (
    <View style={styles.inputGroup}>
      <AppText font={AppFonts.Medium} size={14} color={Colors.black} style={styles.label}>{label}</AppText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => setFormData({ ...formData, [key]: text })}
        placeholder={`Enter ${label.toLowerCase()}`}
        placeholderTextColor={Colors.black30}
        keyboardType={keyboardType}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <AppText style={{ marginTop: 10 }}>Loading Addresses...</AppText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Manage Addresses" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppText font={AppFonts.SemiBold} size={16} color={Colors.black} style={styles.sectionTitle}>Saved Addresses</AppText>
        
        {renderAddressCard('billing', billing)}
        {renderAddressCard('shipping', shipping)}

        <View style={styles.infoBox}>
           <AppText font={AppFonts.Regular} size={13} color={Colors.textGrey} textAlign="center">
             These addresses are used during checkout to save your time.
           </AppText>
        </View>
      </ScrollView>

      {/* Editor Overlay */}
      {isEditing && (
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.overlayClose} onPress={() => setIsEditing(false)} />
          <Animated.View style={[styles.editorSheet, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.sheetHeader}>
               <AppText font={AppFonts.Bold} size={20} color={Colors.black}>Edit {editType.charAt(0).toUpperCase() + editType.slice(1)}</AppText>
               <TouchableOpacity onPress={() => setIsEditing(false)}>
                  <AppText font={AppFonts.Medium} size={16} color={Colors.primary}>Cancel</AppText>
               </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.sheetScroll}>
              {editType === 'shipping' && (
                <TouchableOpacity style={styles.copyBtn} onPress={copyBillingToShipping}>
                   <AppText font={AppFonts.Medium} size={14} color={Colors.primary}>+ Copy from Billing</AppText>
                </TouchableOpacity>
              )}

              <View style={styles.row}>
                <View style={{ flex: 1 }}>{renderInput('First Name', formData.first_name, 'first_name')}</View>
                <View style={{ flex: 1 }}>{renderInput('Last Name', formData.last_name, 'last_name')}</View>
              </View>

              {renderInput('Address Line 1', formData.address_1, 'address_1')}
              
              <View style={styles.row}>
                <View style={{ flex: 1 }}>{renderInput('City', formData.city, 'city')}</View>
                <View style={{ flex: 1 }}>{renderInput('Pincode', formData.postcode, 'postcode', 'numeric')}</View>
              </View>

              {renderInput('State', formData.state, 'state')}
              {renderInput('Country', formData.country, 'country')}
              
              {editType === 'billing' && renderInput('Phone Number', formData.phone, 'phone', 'phone-pad')}

              <TouchableOpacity 
                style={[styles.saveBtn, saving && { opacity: 0.7 }]} 
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? <ActivityIndicator color="#FFF" /> : <AppText font={AppFonts.Bold} size={16} color="#FFF">SAVE ADDRESS</AppText>}
              </TouchableOpacity>
              <View style={{ height: 20 }} />
            </ScrollView>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

export default ManageAddresses;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 20 },
  sectionTitle: { marginBottom: 20 },
  addressCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  typeBadge: {
    backgroundColor: '#390BCA11',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  nameText: {
    marginBottom: 8,
  },
  addressText: {
    lineHeight: 22,
    marginBottom: 4,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  infoBox: {
    marginTop: 10,
    padding: 15,
  },
  // Overlay Styles
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  overlayClose: {
    flex: 1,
  },
  editorSheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: height * 0.85,
    padding: 25,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  sheetScroll: {
    flex: 1,
  },
  inputGroup: { marginBottom: 20 },
  label: { marginBottom: 8 },
  input: {
    height: 55,
    backgroundColor: '#F9FAFB',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEE',
    paddingHorizontal: 15,
    fontFamily: AppFonts.Regular,
    color: '#000',
    fontSize: 16,
  },
  row: { flexDirection: 'row', gap: 15 },
  copyBtn: {
    backgroundColor: '#F1F4FF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primary + '33',
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
});
