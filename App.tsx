import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import AppStack from './src/navigation/AppStack'

const App = () => {

  useEffect(() => {
    // Hide the splash screen after the app is ready
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})