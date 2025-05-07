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


export default function SignInScreen({ navigation }) {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)

  const handleSignIn = async () => {
    setError(null)
    const { error } = await signIn({ email, password })
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

      <Header title="Sign In" />
      
      <View style={styles.container}>
      <Text style={styles.app}>Rent A Car</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
  <Text style={styles.buttonText}>Sign In</Text>
</TouchableOpacity>

        <Text
          style={styles.link}
          onPress={() => navigation.replace('SignUp')}
        >
          Don't have an account? Sign Up
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
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
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