import React from 'react'
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native'

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/splash-icon.png')} style={styles.logo} />
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({ 
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }, 
  logo: { width: 200, height: 200, marginBottom: 20 } 
})