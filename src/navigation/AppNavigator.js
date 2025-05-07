import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import { AuthContext } from '../context/AuthContext'

// Auth Screens
import SplashScreen   from '../screens/SplashScreen'
import SignInScreen   from '../screens/SignInScreen'
import SignUpScreen   from '../screens/SignUpScreen'

// App Screens
import HomeScreen          from '../screens/HomeScreen'
import CarDetailsScreen    from '../screens/CarDetailsScreen'
import BookingScreen       from '../screens/BookingScreen'
import BookingResultScreen from '../screens/BookingResultScreen'
import ProfileScreen       from '../screens/ProfileScreen'

const Stack = createStackNavigator()
const Tab   = createBottomTabNavigator()

// Bottom tabs for the logged-in user
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let icon
          if (route.name === 'Home')     icon = 'home-outline'
          else if (route.name === 'Bookings') icon = 'calendar-outline'
          else if (route.name === 'Profile')  icon = 'person-outline'
          return <Ionicons name={icon} size={size} color={color} />
        },
        tabBarActiveTintColor: '#2e78b7',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home"     component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingResultScreen} options={{ tabBarLabel: 'My Bookings' }} />
      <Tab.Screen name="Profile"  component={ProfileScreen} />
    </Tab.Navigator>
  )
}

// Stack for the authenticated portion
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* first show the tabs */}
      <Stack.Screen name="MainTabs" component={MainTabs} />
      {/* then any deeper screens */}
      <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
      <Stack.Screen name="Booking"    component={BookingScreen} />
    </Stack.Navigator>
  )
}

// Stack for sign-in / sign-up
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext)

  // While we’re checking auth status, show splash
  if (loading) return <SplashScreen />

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}