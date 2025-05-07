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
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header title="Sign Up" />

      <View style={styles.container}>
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

        <Button title="Sign Up" onPress={handleSignUp} />

        <Text
          style={styles.link}
          onPress={() => navigation.replace('SignIn')}
        >
          Already have an account? Sign In
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
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
    color: '#2e78b7',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
})