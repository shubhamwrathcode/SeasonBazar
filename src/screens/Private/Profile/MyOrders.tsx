import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AppHeader from '../../../components/AppHeader';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';
import { ImageAssets } from '../../../components/ImageAssets';
import { productService } from '../../../services/productService';
import { useAuthStore } from '../../../store/useAuthStore';

const MyOrders = ({ navigation }: any) => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      if (user?.id) {
        const res = await productService.getOrders(Number(user.id));
        setOrders(res);
      }
    } catch (error) {
      console.log('Orders Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderOrderItem = ({ item }: { item: any }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <AppText font={AppFonts.SemiBold} size={15} color={Colors.black}>{`Order #${item.id}`}</AppText>
          <AppText font={AppFonts.Regular} size={12} color={Colors.textGrey}>{`Placed on ${new Date(item.date_created).toDateString()}`}</AppText>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'completed' ? '#4CAF5022' : '#FF980022' }]}>
          <AppText font={AppFonts.Medium} size={12} color={item.status === 'completed' ? '#4CAF50' : '#FF9800'}>
            {item.status.toUpperCase()}
          </AppText>
        </View>
      </View>

      <View style={styles.divider} />

      {item.line_items.map((line: any, idx: number) => (
        <View key={idx} style={styles.productRow}>
          <AppText font={AppFonts.Regular} size={14} color={Colors.black} style={{ flex: 1 }}>{line.name}</AppText>
          <AppText font={AppFonts.Regular} size={14} color={Colors.textGrey}>{`x${line.quantity}`}</AppText>
          <AppText font={AppFonts.Medium} size={14} color={Colors.black} style={{ marginLeft: 10 }}>{`₹${line.total}`}</AppText>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.orderFooter}>
        <AppText font={AppFonts.Medium} size={16} color={Colors.black}>Total Amount:</AppText>
        <AppText font={AppFonts.SemiBold} size={18} color={Colors.primary}>{`₹${item.total}`}</AppText>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="My Orders" onBack={() => navigation.goBack()} />
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Image source={ImageAssets.trackorder} style={styles.emptyImg} />
              <AppText font={AppFonts.SemiBold} size={18} color={Colors.black}>No Orders Found</AppText>
              <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.navigate('Main')}>
                <AppText font={AppFonts.Medium} size={16} color={Colors.white}>Start Shopping</AppText>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  listContent: { padding: 15 },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEE',
    elevation: 2,
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  divider: { height: 1, backgroundColor: '#F5F5F5', marginVertical: 10 },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: 100 },
  emptyImg: { width: 100, height: 100, tintColor: '#DDD', marginBottom: 20 },
  shopBtn: { backgroundColor: Colors.primary, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25, marginTop: 20 },
});
