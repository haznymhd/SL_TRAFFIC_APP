import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton1 from '../../components/CustomButton1';

const MyFines = () => {
  const [fines, setFines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [licenseId, setLicenseId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFines, setFilteredFines] = useState([]);
  const [selectedFine, setSelectedFine] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = await AsyncStorage.getItem('publicUserToken');
      const userResponse = await axios.get('http://192.168.8.111:8080/api/v1/auth/profile', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setLicenseId(userResponse.data.user.licenseId);
    };

    const fetchMyFines = async () => {
      try {
        const userToken = await AsyncStorage.getItem('publicUserToken');
        const { data } = await axios.get(`http://192.168.8.111:8080/api/v1/fines/user/${licenseId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setFines(data.fines);
        setFilteredFines(data.fines);
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Error', error.response?.data?.message || 'An error occurred while fetching fines');
        setIsLoading(false);
      }
    };

    fetchUserData().then(() => {
      fetchMyFines();
    });
  }, [licenseId]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredFines(fines);
    } else {
      const filtered = fines.filter(item =>
        item.referenceNumber && item.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFines(filtered);
    }
  }, [searchQuery, fines]);

  const handleFineClick = (fine) => {
    setSelectedFine(fine);
  };

  const renderFine = ({ item }) => (
    <TouchableOpacity onPress={() => handleFineClick(item)}>
      <View style={[styles.fineContainer, item.action === 'Pending' && styles.pendingFine]}>
        <Text style={styles.fineTitle}>Reference Number: {item.referenceNumber}</Text>
        <Text>License ID: {item.licenseId}</Text>
        <Text>Fine Details: {item.fineDetails.title}</Text>
        {item.fineDetails.fines && item.fineDetails.fines.map((fine, index) => (
          <Text key={index}>- {fine}</Text>
        ))}
        <Text>Action: {item.action}</Text>
      </View>
    </TouchableOpacity>
  );

  const handlePayFine = () => {
    // Implement pay fine functionality here
    Alert.alert('Payment', 'Fine payment functionality to be implemented.');
  };

  const handleInquiry = () => {
    // Implement inquiry functionality here
    Alert.alert('Inquiry', 'Fine inquiry functionality to be implemented.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Fines</Text>
      <TextInput 
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by Reference Number"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList 
          data={filteredFines}
          renderItem={renderFine}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      {selectedFine && selectedFine.action === 'Pending' && (
        <View style={styles.actionsContainer}>
          <Text style={styles.selectedFineTitle}>Selected Fine</Text>
          <Text style={styles.fineTitle}>{selectedFine.fineDetails.title}</Text>
          {selectedFine.fineDetails.fines && selectedFine.fineDetails.fines.map((fine, index) => (
            <Text key={index} style={styles.fineText}>{fine}</Text>
          ))}
          <CustomButton1 
            title="Pay Fine" 
            handlePress={handlePayFine}
            containerStyles="mt-7"
          />
          <CustomButton1 
            title="Inquiry" 
            handlePress={handleInquiry}
            containerStyles="mt-7"
          />
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  fineContainer: {
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  pendingFine: {
    borderColor: 'red',
    borderWidth: 2,
  },
  fineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedFineTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fineText: {
    fontSize: 16,
  },
  actionsContainer: {
    padding: 20,
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
    marginTop: 20,
  },
});

export default MyFines;
