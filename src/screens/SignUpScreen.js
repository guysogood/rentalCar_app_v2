import React, { useState, useContext } from 'react'
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { AuthContext } from '../context/AuthContext'
import { TouchableOpacity } from 'react-native'
import { ImageBackground } from 'react-native'

export default function SignUpScreen({ navigation }) {
  const { signUp } = useContext(AuthContext)
  const [fullName, setFullName] = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)

  const handleSignUp = async () => {
    setError(null)
    const { error } = await signUp({ fullName, email, password })
    if (error) setError(error.message)
  }

  return (
    <ImageBackground
  source={require('../../assets/wallpaper.jpg')}
  style={styles.background}
  blurRadius={7}
    >
      <View style={styles.overlay} />
  <SafeAreaView style={styles.safe} edges={['top']}>
      <Header title="Sign Up" />

      <View style={styles.container}>
      <Text style={styles.app}>Rent A Car</Text>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
  <Text style={styles.buttonText}>Sign Up</Text>
</TouchableOpacity>

        <Text
          style={styles.link}
          onPress={() => navigation.replace('SignIn')}
        >
          Already have an account? Sign In
        </Text>
      </View>
      </SafeAreaView>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
    marginBottom: 12,
    borderRadius: 4,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  app: {
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 100,
    color: '#007bff', 
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },  
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
})