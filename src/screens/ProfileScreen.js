import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { supabase } from '../api/supabaseClient';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  async function fetchProfile() {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name,created_at')
      .eq('id', user.id)
      .single();
    if (!error) setProfile(data);
    setLoading(false);
  }

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) return <ActivityIndicator style={styles.center} size="large" color="#2e78b7" />;

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Profile" />
      <View style={styles.container}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{profile.full_name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Member Since:</Text>
        <Text style={styles.value}>{new Date(profile.created_at).toLocaleDateString()}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    color: '#555',
    marginTop: 4,
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#d32f2f', 
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
