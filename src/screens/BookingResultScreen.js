import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import { supabase } from '../api/supabaseClient';
import { AuthContext } from '../context/AuthContext';

export default function BookingResultScreen() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) load();
  }, [user]);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('id,rental_date,renter_name,cars(make,model)')
      .eq('user_id', user.id)
      .order('rental_date', { ascending: false });
    if (!error) setBookings(data);
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="My Bookings" />
      {loading ? (
        <ActivityIndicator style={styles.center} size="large" color="#2e78b7" />
      ) : bookings.length === 0 ? (
        <Text style={styles.noBookingsText}>No bookings yet</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.car}>{item.cars.make} {item.cars.model}</Text>
              <Text style={styles.label}> Date: <Text style={styles.value}>{new Date(item.rental_date).toLocaleDateString()}</Text></Text>
              <Text style={styles.label}> Name: <Text style={styles.value}>{item.renter_name}</Text></Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBookingsText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 18,
    color: '#999',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 3,
  },
  car: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontWeight: '400',
    color: '#555',
  },
});
