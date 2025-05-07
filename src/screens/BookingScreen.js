// src/screens/BookingScreen.js

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../api/supabaseClient';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

async function ensureProfileExists(user, fullNameFallback) {
  const { data: rows, error: selErr } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .limit(1);
  if (selErr) console.error(selErr);
  if (!rows.length) {
    const name = user.user_metadata?.full_name || fullNameFallback;
    const { error: insErr } = await supabase
      .from('profiles')
      .insert([{ id: user.id, full_name: name }]);
    if (insErr) console.error(insErr);
  }
}

export default function BookingScreen({ route, navigation }) {
  const { user } = useContext(AuthContext);
  const { car, date } = route.params;
  const bookingDate = new Date(date);
  const [renterName, setRenterName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    if (!renterName.trim()) {
      return setError('Please enter your name');
    }
    setError(null);

    setIsLoading(true);

    await ensureProfileExists(user, renterName);

    const { error } = await supabase.from('bookings').insert([
      {
        user_id: user.id,
        car_id: car.id,
        rental_date: bookingDate.toISOString().split('T')[0],
        renter_name: renterName.trim(),
      },
    ]);

    setIsLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Successfully', 'Booking confirmed', [
        {
          text: 'Okay',
          onPress: () =>
            navigation.navigate('MainTabs', { screen: 'Bookings' }),
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Confirm Booking" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#2e78b7" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.label}>
          Car: {car.make} {car.model}
        </Text>
        <Text style={styles.label}>
          Date: {bookingDate.toDateString()}
        </Text>

        <TextInput
          placeholder="Enter Your Name"
          value={renterName}
          onChangeText={setRenterName}
          style={styles.input}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Confirm Booking</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 16,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2e78b7',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    marginLeft: 15,
    marginTop: 10,
  },
    
});

