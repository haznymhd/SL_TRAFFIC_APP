import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const [licenseId, setLicenseId] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`http://192.168.8.111:8080/api/v1/public/users/${licenseId}`);
      setUserData(data.user);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || "An error occurred while fetching user data");
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search Public User</Text>
      <TextInput 
        style={styles.input}
        value={licenseId}
        onChangeText={setLicenseId}
        placeholder="Enter License ID"
      />
      <Button title="Search" onPress={handleSearch} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {userData && (
        <View style={styles.userDataContainer}>
          <Text style={styles.userDataText}>License ID: {userData.licenseId}</Text>
          <Text style={styles.userDataText}>Email: {userData.email}</Text>
          <Text style={styles.userDataText}>Address: {userData.address}</Text>
          {/* Add more fields as needed */}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  userDataContainer: {
    marginTop: 16,
  },
  userDataText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Search;
