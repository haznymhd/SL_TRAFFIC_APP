import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton3 from '../../components/CustomButton3';
import { useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router';

const Payment = () => {
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedFine, setSelectedFine] = useState(null);
  const { fine } = useSearchParams();

  useEffect(() => {
    if (fine) {
      setSelectedFine(JSON.parse(fine));
    }
  }, [fine]);

  const handlePayment = (method) => {
    Alert.alert(`Payment Method: ${method}`, `Reference Number: ${selectedFine.referenceNumber}\nOccasion: ${selectedOccasion}`);
    // Implement payment functionality here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PAYMENT</Text>
      {selectedFine && (
        <View style={styles.fineDetails}>
          <Text style={styles.fineTitle}>Fine Details</Text>
          <Text>{selectedFine.fineDetails.title}</Text>
          {selectedFine.fineDetails.fines.map((fine, index) => (
            <Text key={index}>- {fine}</Text>
          ))}
          <Text style={styles.referenceNumber}>Reference Number: {selectedFine.referenceNumber}</Text>
        </View>
      )}
      <View style={styles.occasionContainer}>
        <Text style={styles.label}>Select Occasion:</Text>
        {selectedFine?.fineDetails.fines.map((fine, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.occasionButton, selectedOccasion === fine && styles.selectedOccasion]}
            onPress={() => setSelectedOccasion(fine)}
          >
            <Text style={styles.occasionText}>{fine}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <CustomButton3
        title="Card Payment"
        handlePress={() => handlePayment('Card Payment')}
        containerStyles="mt-7"
      />
      <CustomButton3
        title="Pay with Post Office"
        handlePress={() => handlePayment('Pay with Post Office')}
        containerStyles="mt-7"
      />
      <CustomButton3
        title="Pay with Bank"
        handlePress={() => handlePayment('Pay with Bank')}
        containerStyles="mt-7"
      />
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
    color: '#2B286D',
  },
  fineDetails: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginBottom: 20,
  },
  fineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  referenceNumber: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  occasionContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  occasionButton: {
    padding: 10,
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOccasion: {
    backgroundColor: '#d9f9d9',
  },
  occasionText: {
    fontSize: 16,
  },
});

export default Payment;
