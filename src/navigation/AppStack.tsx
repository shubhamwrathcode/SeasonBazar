import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';
import AppText from '../components/AppText';
import { AppFonts } from '../components/Appfonts';
import { Colors } from '../components/colors';
import OnBoarding from '../screens/Private/Public/OnBoarding';
import Login from '../screens/Private/Public/Login';
import SignUp from '../screens/Private/Public/SignUp';
import Welcome from '../screens/Private/Public/Welcome';
import ForgotPassword from '../screens/Private/Public/ForgotPassword';
import TabNavigator from './TabNavigator';
import AllCategories from '../screens/Private/AllCategories/AllCategories';
import SearchResults from '../screens/Private/Search/SearchResults';
import FilterScreen from '../screens/Private/Search/FilterScreen';
import ProductDetail from '../screens/Private/Product/ProductDetail';
import MyProfile from '../screens/Private/Profile/MyProfile';
import ProfileSettings from '../screens/Private/Profile/ProfileSettings';
import Wishlist from '../screens/Private/Profile/Wishlist';
import MyOrders from '../screens/Private/Profile/MyOrders';
import ManageAddresses from '../screens/Private/Profile/ManageAddresses';
import HelpSupport from '../screens/Private/Support/HelpSupport';
import Compare from '../screens/Private/Product/Compare';
import MyCart from '../screens/Private/Cart/MyCart';
import SubscribePlan from '../screens/Private/Vendor/SubscribePlan';
import PlanDetail from '../screens/Private/Vendor/PlanDetail';
import CustomerCheckout from '../screens/Private/Cart/Checkout';
import OrderSuccess from '../screens/Private/Cart/OrderSuccess';
import VendorCheckout from '../screens/Private/Vendor/Checkout';
import PaymentMethod from '../screens/Private/Vendor/PaymentMethod';
import VendorHome from '../screens/Private/Vendor/VendorHome';
import VendorTabNavigator from './VendorTabNavigator';
import VendorDashboard from '../screens/Private/Vendor/VendorDashboard';
import Announcements from '../screens/Private/Vendor/Announcements';
import Products from '../screens/Private/Vendor/Products';
import Orders from '../screens/Private/Vendor/Orders';
import Coupons from '../screens/Private/Vendor/Coupons';
import Reports from '../screens/Private/Vendor/Reports';
import Support from '../screens/Private/Vendor/Support';
import AddProduct from '../screens/Private/Vendor/AddProduct';
import AddCoupon from '../screens/Private/Vendor/AddCoupon';
import ProductReport from '../screens/Private/Vendor/ProductReport';
import DeliveryTime from '../screens/Private/Vendor/DeliveryTime';
import Withdraw from '../screens/Private/Vendor/Withdraw';
import WithdrawHistory from '../screens/Private/Vendor/WithdrawHistory';
import Followers from '../screens/Private/Vendor/Followers';
import Settings from '../screens/Private/Vendor/Settings';
import VisitStore from '../screens/Private/Vendor/VisitStore';
import VendorPaymentMethod from '../screens/Private/Vendor/VendorPaymentMethod';
import VendorVerification from '../screens/Private/Vendor/VendorVerification';
import VendorSocialProfiles from '../screens/Private/Vendor/VendorSocialProfiles';
import VendorRAW from '../screens/Private/Vendor/VendorRAW';

export type RootStackParamList = {
  OnBoarding: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Main: undefined;
  AllCategories: undefined;
  SearchResults: undefined;
  FilterScreen: undefined;
  ProductDetail: { product?: any };
  ProfileSettings: undefined;
  Wishlist: undefined;
  HelpSupport: undefined;
  Compare: undefined;
  MyCart: undefined;
  MyOrders: undefined;
  SubscribePlan: undefined;
  PlanDetail: undefined;
  Checkout: undefined;
  OrderSuccess: { orderId: string };
  ManageAddresses: undefined;
  VendorCheckout: undefined;
  PaymentMethod: undefined;
  VendorMain: undefined;
  VendorHome: undefined;
  VendorDashboard: undefined;
  Announcements: undefined;
  Products: undefined;
  Orders: undefined;
  Coupons: undefined;
  Reports: undefined;
  Support: undefined;
  AddProduct: undefined;
  AddCoupon: undefined;
  ProductReport: undefined;
  DeliveryTime: undefined;
  Withdraw: undefined;
  WithdrawHistory: undefined;
  Followers: undefined;
  Settings: undefined;
  VisitStore: undefined;
  VendorPaymentMethod: undefined;
  VendorVerification: undefined;
  VendorSocialProfiles: undefined;
  VendorRAW: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Wait for store to hydrate from AsyncStorage
  React.useEffect(() => {
    const checkHydration = async () => {
      // @ts-ignore - reaching into internal persist state
      const hydrated = useAuthStore.persist?.hasHydrated();
      if (hydrated) {
        setIsHydrated(true);
      } else {
        // Wait a bit or use listener if needed
        setTimeout(() => setIsHydrated(true), 500);
      }
    };
    checkHydration();
  }, []);

  if (!isHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
        {/* You can replace this with a real Splash Screen later */}
        <AppText font={AppFonts.Medium} size={18} color={Colors.primary}>Loading...</AppText>
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      ) : (
        // Authenticated Stack
        <>
          {user?.role === 'vendor' ? (
            <Stack.Screen name="VendorMain" component={VendorTabNavigator} />
          ) : (
            <Stack.Screen name="Main" component={TabNavigator} />
          )}

          {/* Common Private Screens */}
          <Stack.Screen name="AllCategories" component={AllCategories} />
          <Stack.Screen name="SearchResults" component={SearchResults} />
          <Stack.Screen name="Checkout" component={CustomerCheckout} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
          <Stack.Screen name="FilterScreen" component={FilterScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
          <Stack.Screen name="Wishlist" component={Wishlist} />
          <Stack.Screen name="MyOrders" component={MyOrders} />
          <Stack.Screen name="ManageAddresses" component={ManageAddresses} />
          <Stack.Screen name="Compare" component={Compare} />
          <Stack.Screen name="MyCart" component={MyCart} />
          <Stack.Screen name="SubscribePlan" component={SubscribePlan} />
          <Stack.Screen name="PlanDetail" component={PlanDetail} />
          <Stack.Screen name="VendorCheckout" component={VendorCheckout} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
          <Stack.Screen name="VendorHome" component={VendorHome} />
          <Stack.Screen name="VendorDashboard" component={VendorDashboard} />
          <Stack.Screen name="Announcements" component={Announcements} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="Coupons" component={Coupons} />
          <Stack.Screen name="Reports" component={Reports} />
          <Stack.Screen name="Support" component={Support} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="AddCoupon" component={AddCoupon} />
          <Stack.Screen name="ProductReport" component={ProductReport} />
          <Stack.Screen name="DeliveryTime" component={DeliveryTime} />
          <Stack.Screen name="Withdraw" component={Withdraw} />
          <Stack.Screen name="WithdrawHistory" component={WithdrawHistory} />
          <Stack.Screen name="Followers" component={Followers} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="VisitStore" component={VisitStore} />
          <Stack.Screen name="VendorPaymentMethod" component={VendorPaymentMethod} />
          <Stack.Screen name="VendorVerification" component={VendorVerification} />
          <Stack.Screen name="VendorSocialProfiles" component={VendorSocialProfiles} />
          <Stack.Screen name="VendorRAW" component={VendorRAW} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
