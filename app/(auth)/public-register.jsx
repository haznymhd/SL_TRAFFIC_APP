import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton1 from '../../components/CustomButton1';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';
import CustomButton3 from '../../components/CustomButton3';

const PublicRegister = () => {
  const [licenseId, setLicenseId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (!licenseId || !password || !email || !address) {
        Alert.alert('Please Fill All Fields');
        setIsSubmitting(false);
        return;
      }

      const { data } = await axios.post(
        "http://192.168.8.111:8080/api/v1/auth/register",
        { licenseId, password, email, address }
      );

      Alert.alert(data.message); // Replace this with your actual alert/message
      console.log("Signup Data==>", { licenseId, password, email, address });
      setIsSubmitting(false);

      // Redirect to login page or another page
      router.push('/public-login');
    } catch (error) {
      Alert.alert(error.response?.data?.message || "An error occurred");
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Text className="text-xl text-purple text-semibold mt-10 font-psemibold">
            PUBLIC REGISTER
          </Text>
          <FormField 
            title="License Id"
            value={licenseId}
            handleChangeText={setLicenseId}
            otherStyles="mt-2"
            placeHolder="Enter your license id"
          />
          <FormField 
            title="Password"
            value={password}
            handleChangeText={setPassword}
            otherStyles="mt-2"
            placeHolder="Enter your password"
          />
          <FormField 
            title="Email"
            value={email}
            handleChangeText={setEmail}
            otherStyles="mt-2"
            placeHolder="Enter your email"
          />
          <FormField 
            title="Address"
            value={address}
            handleChangeText={setAddress}
            otherStyles="mt-2"
            placeHolder="Enter your address"
          />
          <CustomButton3
            title="Sign Up" 
            handlePress={handleSubmit}
            containerStyles="mt-2"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black font-pregular">
              Already have an account?
            </Text>
            <Link href="/public-login" className="text-lg font-psemibold text-orange mb-5">
              Log In
            </Link>
          </View>
          <Image 
            source={images.cards}
            style={{ alignSelf: 'center', width: '68%', height: '11%' }}
            resizeMode="contain"
          />
          <Text className="text-sm font-pregular text-black mt-2 text-center font-psemibold">
            Bridging Police and Public with Digital Solutions for Sri Lanka
          </Text>
          <Text>{' '}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PublicRegister;
