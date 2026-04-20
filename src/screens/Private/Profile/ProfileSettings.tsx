import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import LinearGradient from 'react-native-linear-gradient';
import { useAuthStore } from '../../../store/useAuthStore';
import { customerService } from '../../../services/customerService';
import AppHeader from '../../../components/AppHeader';
import Toast from 'react-native-simple-toast';

const { width } = Dimensions.get('window');

const ProfileSettings = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthStore();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Edit Form State
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await customerService.getCustomer(Number(user.id));
      setCustomer(data);
      setEditForm({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
      });
    } catch (error) {
      console.log('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    console.log('--- Handle Update Profile Started ---');
    console.log('User Object from Store:', JSON.stringify(user, null, 2));
    
    if (user?.id === undefined || user?.id === null) {
       console.log('Error: User ID is null or undefined');
       return;
    }
    try {
      setUpdating(true);
      console.log('Updating customer:', user.id, 'with data:', editForm);
      const res = await customerService.updateCustomer(Number(user.id), editForm);
      console.log(res, '==res')
      setCustomer(res);
      setEditModal(false);
      Toast.show('Profile updated!', Toast.SHORT);
    } catch (error: any) {
      console.log('Update Profile Error:', error?.response?.data || error);
      Toast.show('Update failed', Toast.SHORT);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    Toast.show('Logged out successfully', Toast.SHORT);
  };

  const renderSettingItem = (title: string, icon: any, onPress: () => void) => (
    <TouchableOpacity style={styles.settingCard} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIconBg}>
          <Image source={icon} style={styles.settingIcon} resizeMode="contain" />
        </View>
        <AppText font={AppFonts.Regular} size={16} color={Colors.black}>{title}</AppText>
      </View>
      <Image source={ImageAssets.arrowright} style={styles.chevron} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Profile Settings" onBack={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/300' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraBadge}>
              <Image source={ImageAssets.camera} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileMeta}>
            {loading ? (
              <ActivityIndicator color={Colors.primary} size="small" />
            ) : (
              <>
                <AppText font={AppFonts.SemiBold} size={18} color={Colors.black}>
                  {customer ? `${customer.first_name} ${customer.last_name}` : user?.first_name ? `${user.first_name} ${user.last_name}` : 'Season Bazar User'}
                </AppText>
                <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>
                  {customer?.email || user?.email}
                </AppText>
              </>
            )}
          </View>
        </View>

        {/* Section 1: Account Management */}
        <AppText font={AppFonts.Medium} size={18} color={Colors.black} style={styles.sectionTitle}>
          Account Management
        </AppText>
        <View style={styles.settingsWrapper}>
          {renderSettingItem('Edit Name', ImageAssets.accountdetail, () => setEditModal(true))}
          {renderSettingItem('Shipping & Billing Addresses', ImageAssets.address, () => navigation.navigate('ManageAddresses'))}
          {renderSettingItem('Order History', ImageAssets.orders, () => navigation.navigate('MyOrders'))}
          {renderSettingItem('Password & Security', ImageAssets.security, () => { })}
        </View>

        {/* Vendor Button (Conditional) */}
        {user?.role === 'vendor' && (
          <TouchableOpacity style={styles.vendorBtnWrapper}>
            <LinearGradient
              colors={['#7E57FF', '#522ED1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.vendorBtn}
            >
              <AppText font={AppFonts.Medium} size={16} color={Colors.white}>Open Vendor Dashboard</AppText>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <View style={styles.logoutIconBg}>
            <Image source={ImageAssets.logout} style={styles.logoutIcon} />
          </View>
          <AppText font={AppFonts.Medium} size={18} color={Colors.white}>LOG OUT</AppText>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={editModal} transparent animationType="fade" onRequestClose={() => setEditModal(false)}>
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <AppText font={AppFonts.Bold} size={20} color={Colors.black} style={{ marginBottom: 20 }}>Edit Profile</AppText>

            <View style={styles.inputGroup}>
              <AppText font={AppFonts.Medium} size={14} color={Colors.black}>First Name</AppText>
              <TextInput
                style={styles.modalInput}
                value={editForm.first_name}
                onChangeText={(t) => setEditForm({ ...editForm, first_name: t })}
                placeholder="First Name"
              />
            </View>

            <View style={styles.inputGroup}>
              <AppText font={AppFonts.Medium} size={14} color={Colors.black}>Last Name</AppText>
              <TextInput
                style={styles.modalInput}
                value={editForm.last_name}
                onChangeText={(t) => setEditForm({ ...editForm, last_name: t })}
                placeholder="Last Name"
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditModal(false)}>
                <AppText font={AppFonts.Medium} color={Colors.textGrey}>Cancel</AppText>
              </TouchableOpacity>
              <TouchableOpacity 
                 style={styles.saveBtn} 
                 onPress={() => {
                   console.log('Save button pressed!');
                   handleUpdateProfile();
                 }} 
                 disabled={updating}
                 activeOpacity={0.7}
              >
                {updating ? <ActivityIndicator color="#FFF" /> : <AppText font={AppFonts.Bold} color="#FFF">Save</AppText>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 0.7,
    borderColor: Colors.black30,
    marginBottom: 25,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: Colors.white,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#eee',
    elevation: 2,
  },
  cameraIcon: {
    width: 12,
    height: 12,
    tintColor: Colors.primary,
  },
  profileMeta: {
    marginLeft: 15,
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  settingsWrapper: {
    marginBottom: 20,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#F3EEFFCC',
    borderRadius: 12,
    marginBottom: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIconBg: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingIcon: {
    width: 20,
    height: 20,
  },
  chevron: {
    width: 12,
    height: 12,
    tintColor: Colors.textGrey,
    resizeMode: "contain"
  },
  vendorBtnWrapper: {
    marginBottom: 25,
    marginTop: 10,
  },
  vendorBtn: {
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 15,
    gap: 15,
    width: '60%',
    alignSelf: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutIconBg: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.primary,
  },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFF', borderRadius: 20, padding: 25 },
  modalInput: { height: 50, borderBottomWidth: 1, borderBottomColor: '#EEE', fontFamily: AppFonts.Regular, color: '#000' },
  inputGroup: { marginBottom: 15 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20, marginTop: 10 },
  cancelBtn: { padding: 10 },
  saveBtn: { backgroundColor: Colors.primary, paddingHorizontal: 25, paddingVertical: 10, borderRadius: 10, minWidth: 80, alignItems: 'center' },
});
