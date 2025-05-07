import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../api/supabaseClient';
import { Ionicons } from '@expo/vector-icons'; 

export default function CarDetailsScreen({ route, navigation }) {
  const { carId, date } = route.params;
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const bookingDate = new Date(date);

  useEffect(() => {
    fetchCar();
  }, []);

  async function fetchCar() {
    setLoading(true);
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('id', carId)
      .single();
    if (error) {
      console.error(error);
    } else {
      setCar(data);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header title="Car Details" />
        <ActivityIndicator size="large" color="#2e78b7" style={styles.loader} />
      </SafeAreaView>
    );
  }

  if (!car) {
    return (
      <SafeAreaView style={styles.safe}>
        <Header title="Car Details" />
        <Text style={styles.errorText}>Sorry, we couldn't load the car details.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Car Details" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#2e78b7" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: car.image_urls[0] }} style={styles.image} />
        <Text style={styles.title}>{car.make} {car.model}</Text>
        <Text style={styles.price}>฿{car.price_per_day}/day</Text>
        <Text style={styles.details}>Transmission: {car.transmission}</Text>
        <Text style={styles.details}>Seats: {car.seats}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Booking', {
              car,
              date,
            })
          }
        >
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'white' },
  container: { padding: 16 },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 20, fontWeight: '500', marginBottom: 12, color: '#2e78b7' },
  details: { fontSize: 16, color: '#555', marginBottom: 6 },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#2e78b7',
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: '600' },
  loader: { marginTop: 50 },
  errorText: { textAlign: 'center', fontSize: 18, color: '#d9534f', marginTop: 20 },
  backButton: {
    marginLeft: 16,
    marginTop: 10,
    marginBottom: -10,
    alignSelf: 'flex-start',
  },
});

