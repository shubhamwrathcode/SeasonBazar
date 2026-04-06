import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../components/colors';
import { AppFonts } from '../components/Appfonts';
import AppText from '../components/AppText';
import { ImageAssets } from '../components/ImageAssets';
import VendorHome from '../screens/Private/Vendor/VendorHome';
import MyProfile from '../screens/Private/Profile/MyProfile';

const Tab = createBottomTabNavigator();


const VendorTabNavigator = ({ navigation }: any) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#0E2E48',
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color }) => {
          let iconSource;
          let rotations: any = [];
          switch (route.name) {
            case 'Visit Store': iconSource = ImageAssets.shop; break;
            case 'My Profile': iconSource = ImageAssets.profileBottom; break;
            case 'Log Out':
              iconSource = ImageAssets.logout;
              rotations = [{ rotate: '90deg' }];
              break;
            default: iconSource = ImageAssets.shop;
          }
          return (
            <View style={styles.tabIconWrapper}>
              {focused && <View style={styles.topIndicator} />}
              <Image
                source={iconSource}
                style={[styles.tabIcon, { tintColor: color, transform: rotations }]}
                resizeMode="contain"
              />
            </View>
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <AppText
            font={focused ? AppFonts.SemiBold : AppFonts.Regular}
            size={11}
            color={color}
            style={styles.tabLabel}
          >
            {route.name}
          </AppText>
        ),
      })}
    >
      <Tab.Screen name="Visit Store" component={VendorHome} />
      <Tab.Screen name="My Profile" component={MyProfile} />
      <Tab.Screen
        name="Log Out"
        component={View}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Alert.alert('Logout', 'Are you sure you want to logout?', [
              { text: 'Cancel' },
              { text: 'OK', onPress: () => navigation.navigate('Welcome') }
            ]);
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default VendorTabNavigator;

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  tabBar: {
    height: 75,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: 12,
    paddingTop: 10,
  },
  tabIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  topIndicator: {
    position: 'absolute',
    top: -15,
    width: 50,
    height: 2,
    backgroundColor: Colors.primary,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    marginTop: 2,
  },
});
