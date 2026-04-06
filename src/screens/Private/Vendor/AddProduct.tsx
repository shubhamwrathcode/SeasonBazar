import React, { useState } from 'react';
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
import PremiumModal from '../../../components/PremiumModal';

const AddProduct = ({ navigation }: any) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (type: string) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  const renderSectionItem = (icon: any, title: string) => (
    <TouchableOpacity
      style={styles.sectionItem}
      activeOpacity={0.7}
      onPress={() => openModal(title)}
    >
      <View style={styles.sectionLeft}>
        <Image source={icon} style={styles.sectionIcon} />
        <AppText font={AppFonts.Medium} size={15} color="#0E2E48">{title}</AppText>
      </View>
      <Image source={ImageAssets.arrowright} style={styles.chevron} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <VendorHeader
        title="Products"
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
          <AppText size={18} font={AppFonts.SemiBold} color={Colors.primary}>Add New Product</AppText>
        </View>

        {/* Regular Fields */}
        <View style={styles.fieldGroup}>
          <AppText font={AppFonts.Medium} size={14} color="#0E2E48" style={styles.label}>Title</AppText>
          <View style={styles.inputBox}>
            <TextInput placeholder="enter Coupon Title" placeholderTextColor="#0E2E484D" style={styles.input} />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <AppText font={AppFonts.Medium} size={14} color="#0E2E48" style={styles.label}>Product Type</AppText>
          <View style={styles.inputBox}>
            <TextInput placeholder="enter Coupon Title" placeholderTextColor="#0E2E484D" style={styles.input} />
          </View>
        </View>

        {/* Upload Area */}
        <View style={styles.fieldGroup}>
          <AppText font={AppFonts.Medium} size={14} color="#0E2E48" style={styles.label}>Upload a product cover image</AppText>
          <TouchableOpacity style={styles.uploadArea}>
            <LinearGradient
              colors={['#c6aaff66', '#FFFFFF']}
              style={styles.uploadInner}
            >
              <Image source={ImageAssets.drag} style={styles.cloudIcon} />
              <AppText font={AppFonts.Medium} size={14} color="#0E2E48">Drag and Drop here</AppText>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Other Fields... (keeping it compact for brevity in list, expanding in actual file) */}
        <View style={styles.fieldGroup}>
          <AppText font={AppFonts.Medium} size={14} color="#0E2E48" style={styles.label}>Category</AppText>
          <View style={styles.inputBox}>
            <TextInput placeholder="enter Coupon Title" placeholderTextColor="#0E2E484D" style={styles.input} />
            {/* <Image source={ImageAssets.arrowright} style={styles.dropdownIcon} /> */}
          </View>
        </View>

        {/* ... more fields ... (Brand, Price, etc.) */}

        {/* Sections List */}
        {renderSectionItem(ImageAssets.inventory, 'Inventory')}
        {renderSectionItem(ImageAssets.downloads1, 'Downloadable Options')}
        {renderSectionItem(ImageAssets.seo, 'SEO')}
        {renderSectionItem(ImageAssets.linked, 'Linked Products')}
        {renderSectionItem(ImageAssets.attribute, 'Attribute')}
        {renderSectionItem(ImageAssets.calendar, 'RMA Options')}
        {renderSectionItem(ImageAssets.options, 'Other Options')}

        <TouchableOpacity
          style={styles.saveBtn}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <LinearGradient
            colors={['#6A44E3', '#4A25C7']}
            style={styles.gradient}
          >
            <AppText font={AppFonts.Bold} size={16} color={Colors.white}>Save</AppText>
          </LinearGradient>
        </TouchableOpacity>
      </FormContainer>

      {/* Modals */}
      <InventoryModal
        isVisible={activeModal === 'Inventory'}
        onClose={closeModal}
      />
      <DownloadModal
        isVisible={activeModal === 'Downloadable Options'}
        onClose={closeModal}
      />
      <SEOModal
        isVisible={activeModal === 'SEO'}
        onClose={closeModal}
      />
      <LinkedModal
        isVisible={activeModal === 'Linked Products'}
        onClose={closeModal}
      />
      <AttributeModal
        isVisible={activeModal === 'Attribute'}
        onClose={closeModal}
      />
      <RMAModal
        isVisible={activeModal === 'RMA Options'}
        onClose={closeModal}
      />
      <OptionsModal
        isVisible={activeModal === 'Other Options'}
        onClose={closeModal}
      />
    </View>
  );
};

// --- Modal Content Components ---

const InventoryModal = ({ isVisible, onClose }: any) => (
  <PremiumModal isVisible={isVisible} onClose={onClose} title="Inventory" icon={ImageAssets.inventory}>
    <View style={[styles.modalRow, { marginBottom: 10 }]}>
      <View style={{ flex: 1.2 }}>
        <AppText font={AppFonts.Medium} size={14} color="#0E2E48" style={styles.modalLabel} numberOfLines={1}>SKU Stock Keeping Unit</AppText>
      </View>
      <View style={{ flex: 1 }}>
        <AppText font={AppFonts.Medium} size={14} color="#0E2E48" style={styles.modalLabel}>Stock Status</AppText>
      </View>
    </View>

    <View style={styles.modalRow}>
      <View style={{ flex: 1.2 }}>
        <View style={styles.modalInputBox}>
          <TextInput placeholder="(Stock Keeping Unit)" placeholderTextColor="#0E2E484D" style={styles.modalInput} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.modalInputBox}>
          <TextInput placeholder="In Stock" placeholderTextColor="#0E2E484D" style={styles.modalInput} />
          <Image source={ImageAssets.boldNext} style={[styles.dropdownIcon, { tintColor: Colors.primary }]} />
        </View>
      </View>
    </View>

    <TouchableOpacity style={styles.checkRow} activeOpacity={0.8}>
      <View style={styles.checkBox} />
      <AppText font={AppFonts.Medium} size={16} color="#0E2E48">Enable product stock management</AppText>
    </TouchableOpacity>

    <TouchableOpacity style={styles.checkRow} activeOpacity={0.8}>
      <View style={styles.checkBox} />
      <AppText font={AppFonts.Medium} size={16} color="#0E2E48" style={{ flex: 1 }}>Allow only one quantity of this product to be bought in a single order</AppText>
    </TouchableOpacity>
  </PremiumModal>
);

const DownloadModal = ({ isVisible, onClose }: any) => (
  <PremiumModal isVisible={isVisible} onClose={onClose} title="Downloadable Options" icon={ImageAssets.downloads1}>
    <View style={styles.modalField}>
      <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.modalLabel}>Name</AppText>
      <View style={styles.modalInputBox}>
        <TextInput placeholder="(Stock Keeping Unit)" placeholderTextColor="#0E2E484D" style={styles.modalInput} />
        <TouchableOpacity style={styles.modalActionBtn}>
          <AppText font={AppFonts.SemiBold} size={13} color={Colors.white}>Add File</AppText>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.modalField}>
      <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.modalLabel}>File URL</AppText>
      <View style={styles.modalInputBox}>
        <TextInput placeholder="(Stock Keeping Unit)" placeholderTextColor="#0E2E484D" style={styles.modalInput} />
        <TouchableOpacity style={styles.modalActionBtn}>
          <AppText font={AppFonts.SemiBold} size={13} color={Colors.white}>Choose File</AppText>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.modalField}>
      <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.modalLabel}>Download Limit</AppText>
      <View style={styles.modalInputBox}>
        <TextInput placeholder="-1" placeholderTextColor="#0E2E48" style={styles.modalInput} />
      </View>
    </View>

    <View style={styles.modalField}>
      <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.modalLabel}>Download Expiry</AppText>
      <View style={styles.modalInputBox}>
        <TextInput placeholder="-1" placeholderTextColor="#0E2E48" style={styles.modalInput} />
      </View>
    </View>
  </PremiumModal>
);

const SEOModal = ({ isVisible, onClose }: any) => (
  <PremiumModal isVisible={isVisible} onClose={onClose} title="SEO Manage SEO for this product" icon={ImageAssets.seo}>
    <AppText font={AppFonts.Medium} size={14} color="#0E2E48" style={styles.modalLabel}>Snippet Preview</AppText>
    <View style={styles.seoPreview}>
      <AppText font={AppFonts.Bold} size={18} color="#00B16A">AUTO-DRAFT - Season Bazaar</AppText>
      <AppText font={AppFonts.Regular} size={14} color={Colors.primary}>https://www.seasonbazaar.com/?post_type=product&p=51475</AppText>
    </View>

    <TouchableOpacity style={styles.largeActionBtn}>
      <AppText font={AppFonts.SemiBold} size={16} color={Colors.white}>Edit Snippet</AppText>
    </TouchableOpacity>

    <View style={styles.modalField}>
      <AppText font={AppFonts.Medium} size={14} color="#0E2E48" style={styles.modalLabel}>Focus keyword</AppText>
      <View style={styles.modalInputBox}>
        <TextInput placeholder="Focus keyword" placeholderTextColor="#0E2E484D" style={styles.modalInput} />
      </View>
    </View>
  </PremiumModal>
);

const LinkedModal = ({ isVisible, onClose }: any) => (
  <PremiumModal isVisible={isVisible} onClose={onClose} title="Linked Products" icon={ImageAssets.linked}>
    <View style={styles.modalField}>
      <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.modalLabel}>Upsells</AppText>
      <View style={styles.modalInputBox}>
        <TextInput placeholder="Search a product" placeholderTextColor="#0E2E484D" style={styles.modalInput} />
      </View>
    </View>

    <View style={styles.modalField}>
      <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.modalLabel}>Cross-sells</AppText>
      <View style={styles.modalInputBox}>
        <TextInput placeholder="Search a product" placeholderTextColor="#0E2E484D" style={styles.modalInput} />
      </View>
    </View>
  </PremiumModal>
);

const AttributeModal = ({ isVisible, onClose }: any) => (
  <PremiumModal isVisible={isVisible} onClose={onClose} title="Attribute" icon={ImageAssets.attribute}>
    <View style={styles.modalField}>
      <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.modalLabel}>Custom Attribute</AppText>
      <View style={styles.modalInputBox}>
        <TextInput placeholder="Search a product" placeholderTextColor="#0E2E484D" style={styles.modalInput} />
        <Image source={ImageAssets.boldNext} style={[styles.dropdownIcon, { tintColor: Colors.primary }]} />
      </View>
    </View>

    <View style={styles.modalRow}>
      <TouchableOpacity style={styles.grayBtn}>
        <AppText font={AppFonts.SemiBold} size={15} color="#0E2E48">Add Attribute</AppText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.purpleBtn}>
        <AppText font={AppFonts.SemiBold} size={15} color={Colors.white}>Save Attribute</AppText>
      </TouchableOpacity>
    </View>
  </PremiumModal>
);

const RMAModal = ({ isVisible, onClose }: any) => (
  <PremiumModal isVisible={isVisible} onClose={onClose} title="RMA Options" icon={ImageAssets.rma}>
    <TouchableOpacity style={styles.checkRow} activeOpacity={0.8}>
      <View style={styles.checkBox} />
      <AppText font={AppFonts.Medium} size={16} color="#0E2E48" style={{ flex: 1 }}>
        Override your default RMA settings for this product
      </AppText>
    </TouchableOpacity>
    <View style={{ height: 10 }} />
  </PremiumModal>
);

const OptionsModal = ({ isVisible, onClose }: any) => (
  <PremiumModal isVisible={isVisible} onClose={onClose} title="Other Options" icon={ImageAssets.options}>
    <View style={styles.modalField}>
      <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.modalLabel}>Product Status</AppText>
      <View style={styles.modalInputBox}>
        <TextInput placeholder="Search a product" placeholderTextColor="#0E2E484D" style={styles.modalInput} />
        <Image source={ImageAssets.boldNext} style={[styles.dropdownIcon, { tintColor: Colors.primary }]} />
      </View>
    </View>

    <View style={styles.modalField}>
      <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.modalLabel}>Visibility</AppText>
      <View style={styles.modalInputBox}>
        <TextInput placeholder="Search a product" placeholderTextColor="#0E2E484D" style={styles.modalInput} />
        <Image source={ImageAssets.boldNext} style={[styles.dropdownIcon, { tintColor: Colors.primary }]} />
      </View>
    </View>

    <View style={styles.modalField}>
      <AppText font={AppFonts.Medium} size={15} color="#0E2E48" style={styles.modalLabel}>Purchase Note</AppText>
      <View style={styles.modalInputBox}>
        <TextInput placeholder="Search a product" placeholderTextColor="#0E2E484D" style={styles.modalInput} />
        <Image source={ImageAssets.boldNext} style={[styles.dropdownIcon, { tintColor: Colors.primary }]} />
      </View>
    </View>

    <TouchableOpacity style={[styles.saveBtn, { height: 52, borderRadius: 12, overflow: 'hidden', marginTop: 10 }]}>
      <LinearGradient
        colors={['#6A44E3', '#4A25C7']}
        style={styles.gradient}
      >
        <AppText font={AppFonts.Bold} size={16} color={Colors.white}>Save</AppText>
      </LinearGradient>
    </TouchableOpacity>
  </PremiumModal>
);

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  formContent: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 50,
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
  uploadArea: {
    height: 120,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: 15,
    overflow: 'hidden',
  },
  uploadInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  cloudIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  dropdownIcon: {
    width: 14,
    height: 14,
    tintColor: '#0E2E4899',
    transform: [{ rotate: '90deg' }],
    resizeMode: "contain"
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  chevron: {
    width: 16,
    height: 16,
    tintColor: '#0E2E484D',
    resizeMode: 'contain',
  },
  saveBtn: {
    marginTop: 20,
    height: 56,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal Specific Styles
  modalRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  modalLabel: {
    marginBottom: 8,
  },
  modalInputBox: {
    height: 54,
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  modalInput: {
    flex: 1,
    fontFamily: AppFonts.Medium,
    fontSize: 14,
    color: '#0E2E48',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 15,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#0E2E484D',
    borderRadius: 3,
  },
  modalField: {
    marginBottom: 18,
  },
  modalActionBtn: {
    backgroundColor: '#531DFE',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: 10,
  },
  seoPreview: {
    marginBottom: 20,
  },
  largeActionBtn: {
    backgroundColor: '#531DFE',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  grayBtn: {
    flex: 1,
    height: 52,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purpleBtn: {
    flex: 1,
    height: 52,
    backgroundColor: '#531DFE',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddProduct;
