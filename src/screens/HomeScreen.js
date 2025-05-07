import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import DatePicker from '../components/DatePicker'
import CarCard from '../components/CarCard'
import Header from '../components/Header'
import { supabase } from '../api/supabaseClient'

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets()
  const [date, setDate] = useState(new Date('2025-06-01'))
  const [allCars, setAllCars] = useState([])
  const [cars, setCars] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAvailableCars()
  }, [date])

  useEffect(() => {
    const q = searchText.trim().toLowerCase()
    if (q === '') {
      setCars(allCars)
    } else {
      setCars(
        allCars.filter(car =>
          car.make.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q)
        )
      )
    }
  }, [allCars, searchText])

  async function fetchAvailableCars() {
    setLoading(true)
    setError('')
    try {
      const dateString = date.toISOString().split('T')[0]
      const { data: bookings, error: bookErr } = await supabase
        .from('bookings')
        .select('car_id')
        .eq('rental_date', dateString)
      if (bookErr) throw bookErr

      const bookedIds = bookings.map(b => b.car_id)
      let q = supabase.from('cars').select('*')
      if (bookedIds.length) {
        const list = `(${bookedIds.join(',')})`
        q = q.filter('id', 'not.in', list)
      }
      const { data: carsData, error: carErr } = await q
      if (carErr) throw carErr

      setAllCars(carsData || [])
    } catch (err) {
      console.error('[Home] fetchAvailableCars error', err)
      setError(err.message || 'Unknown error')
      setAllCars([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView
      style={[styles.safe]}
      edges={['top']}
    >
      <Header title="Home" /> 
      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by brand or model"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>

      {/* Date label + picker */}
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Select a date for booking</Text>
        <DatePicker date={date} onDateChange={setDate} />
      </View>

      {loading && <ActivityIndicator style={styles.center} size="large" />}

      {!!error && <Text style={styles.errorText}>Error: {error}</Text>}

      {!loading && !error && (
        <FlatList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CarCard
              car={item}
              onPress={() =>
                navigation.navigate('CarDetails', {
                  carId: item.id,
                  date: date.toISOString(),
                })
              }
            />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No cars available</Text>}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'white' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16 },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },

  searchContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },

  dateContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  dateLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 12,
  },
})