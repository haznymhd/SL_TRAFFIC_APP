import { View, Text, ScrollView, Image, TextInput, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton1 from '../../components/CustomButton1';

const Profile = () => {
  const [userData, setUserData] = useState({
    licenseId: '',
    email: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from AsyncStorage or API
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('publicUserToken');
        if (!token) {
          Alert.alert('Error', 'No token found, please log in again.');
          return;
        }
        const response = await axios.get('http://192.168.8.111:8080/api/v1/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data.user);
      } catch (error) {
        Alert.alert('Error', error.response?.data?.message || "An error occurred while fetching user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('publicUserToken');
      if (!token) {
        Alert.alert('Error', 'No token found, please log in again.');
        setIsSubmitting(false);
        return;
      }
      await axios.put('http://192.168.8.111:8080/api/v1/auth/profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      Alert.alert('Success', 'Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || "An error occurred while updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2B286D" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>My Profile</Text>
        <Image 
          source={images.profile}
          style={styles.profileImage}
          resizeMode="contain"
        />
        <TextInput 
          style={styles.input}
          value={userData.licenseId}
          editable={false}
          placeholder="License ID"
        />
        <TextInput 
          style={styles.input}
          value={userData.email}
          editable={isEditing}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
          placeholder="Email"
        />
        <TextInput 
          style={styles.input}
          value={userData.address}
          editable={isEditing}
          onChangeText={(text) => setUserData({ ...userData, address: text })}
          placeholder="Address"
        />
        {isEditing ? (
          <CustomButton1 
            title="Save Changes" 
            handlePress={handleSaveChanges}
            isLoading={isSubmitting}
          />
        ) : (
          <CustomButton1 
            title="Edit Profile" 
            handlePress={() => setIsEditing(true)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 16,
    marginVertical: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#2B286D',
    fontWeight: '600',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Profile;
