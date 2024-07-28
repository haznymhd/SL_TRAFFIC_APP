import { View, Text, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton1 from '../../components/CustomButton1';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PublicLogin = () => {
  const [licenseId, setLicenseId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (!licenseId || !password) {
        Alert.alert('Please Fill All Fields');
        setIsSubmitting(false);
        return;
      }

      // Clear only the public user token
      await AsyncStorage.removeItem('publicUserToken');

      const { data } = await axios.post(
        "http://192.168.8.111:8080/api/v1/auth/login",
        { licenseId, password }
      );

      // Save the new public user token to AsyncStorage
      await AsyncStorage.setItem('publicUserToken', data.token);

      Alert.alert(data.message);
      console.log("Login Data==>", { licenseId, password });
      setIsSubmitting(false);

      // Redirect to a different page after successful login
      router.push('/home');
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      Alert.alert(errorMessage);
      setIsSubmitting(false);
      console.error("Login Error: ", errorMessage, error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="justify-center min-h-[80vh] px-4 my-6">
          <Text className="text-2xl text-purple-700 font-semibold mt-10">
            PUBLIC LOGIN
          </Text>
          <FormField 
            title="License Id"
            value={licenseId}
            handleChangeText={setLicenseId}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeHolder="Enter your license id"
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
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black font-normal">
              Don't have an account?
            </Text>
            <Link href="/public-register" className="text-lg font-semibold text-orange-600 mb-5">
              Sign Up
            </Link>
          </View>
          <Image 
            source={images.cards}
            style={{ alignSelf: 'center', width: '68%', height: '11%' }}
            resizeMode="contain"
          />
          <Text className="text-sm font-normal text-black mt-7 text-center font-semibold">
            Bridging Police and Public with Digital Solutions for Sri Lanka
          </Text>
          <Text>{' '}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PublicLogin;
