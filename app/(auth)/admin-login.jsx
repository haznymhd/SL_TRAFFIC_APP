import { View, Text, ScrollView, Image, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton1 from '../../components/CustomButton1';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminLogin = () => {
  const [accessId, setAccessId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (!accessId || !password) {
        Alert.alert('Please Fill All Fields');
        setIsSubmitting(false);
        return;
      }

      const { data } = await axios.post(
        "http://192.168.8.111:8080/api/v1/admin/admin-login", // Ensure this matches the correct route
        { accessId, password }
      );

      // Save the token to AsyncStorage
      await AsyncStorage.setItem('token', data.token);

      Alert.alert(data.message);
      console.log("Login Data==>", { accessId, password });
      setIsSubmitting(false);

      // Redirect to a different page after successful login
      router.push('/admin-home');
    } catch (error) {
      Alert.alert(error.response?.data?.message || "An error occurred");
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ justifyContent: 'center', minHeight: '80%', paddingHorizontal: 16, marginVertical: 24 }}>
            <Text style={{ fontSize: 24, color: '#2B286D', fontWeight: '600', marginTop: 40, fontFamily: 'psemibold' }}>
              Admin Login
            </Text>
            <FormField 
              title="Access Id"
              value={accessId}
              handleChangeText={setAccessId}
              otherStyles="mt-7"
              keyboardType="email-address"
              placeHolder="Enter your access id"
            />
            <FormField 
              title="Password"
              value={password}
              handleChangeText={setPassword}
              otherStyles="mt-7"
              placeHolder="Enter your password"
              secureTextEntry
            />
            <CustomButton1 
              title="Log in" 
              handlePress={handleSubmit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            {isSubmitting && (
              <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            )}
            <Image 
              source={images.cards}
              style={{ alignSelf: 'center', width: '68%', height: '11%', marginTop: 20 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 14, fontFamily: 'pregular', color: 'black', marginTop: 20, textAlign: 'center', fontWeight: '600' }}>
              Bridging Police and Public with Digital Solutions for Sri Lanka
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AdminLogin;
