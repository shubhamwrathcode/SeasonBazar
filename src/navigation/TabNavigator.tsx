import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Private/Home/Home';
import { Colors } from '../components/colors';
import { AppFonts } from '../components/Appfonts';
import AppText from '../components/AppText';
import { ImageAssets } from '../components/ImageAssets';
import AllCategories from '../screens/Private/AllCategories/AllCategories';
import MyProfile from '../screens/Private/Profile/MyProfile';
import MyCart from '../screens/Private/Cart/MyCart';

const Tab = createBottomTabNavigator();

const Placeholder = ({ name }: { name: string }) => (
  <View style={styles.placeholder}>
    <AppText font={AppFonts.Bold} size={24} color={Colors.primary}>
      {name} Coming Soon
    </AppText>
  </View>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.black30,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color }) => {
          let iconSource;
          switch (route.name) {
            case 'Home': iconSource = ImageAssets.homeBottom; break;
            case 'Shop': iconSource = ImageAssets.shopBottom; break;
            case 'My Cart': iconSource = ImageAssets.cartBotttom; break;
            case 'Wishlist': iconSource = ImageAssets.wishlist; break;
            case 'My Profile': iconSource = ImageAssets.profileBottom; break;
            default: iconSource = ImageAssets.homeBottom;
          }
          return (
            <View style={styles.tabIconWrapper}>
              {focused && <View style={styles.topIndicator} />}
              <Image
                source={iconSource}
                style={[styles.tabIcon, { tintColor: color }]}
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="My Cart" component={MyCart} />
      <Tab.Screen name="Categories" component={AllCategories} />
      <Tab.Screen name="My Profile" component={MyProfile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  tabBar: {
    height: 70,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingBottom: 10,
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
