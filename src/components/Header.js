import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Header({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})