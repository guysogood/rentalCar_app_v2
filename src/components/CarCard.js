import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'

export default function CarCard({ car, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: car.image_urls[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{car.make} {car.model}</Text>
        <Text>฿{car.price_per_day}/day</Text>
        <Text>{car.transmission} • {car.seats} seats</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', marginBottom: 12, backgroundColor: 'white', borderRadius: 8, overflow: 'hidden' },
  image: { width: 120, height: 80 },
  info: { flex: 1, padding: 8 },
  title: { fontWeight: '600', marginBottom: 4 },
})