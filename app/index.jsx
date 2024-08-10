import { StatusBar } from "expo-status-bar";
import { Button, Image, ScrollView, Text, View, ImageBackground } from 'react-native';
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLISHABLE_KEY } from '../config'; // Ensure you have your publishable key stored securely

import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import CustomButton1 from "../components/CustomButton1";
import CustomButton3 from "../components/CustomButton3";

export default function App() {
    return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <ImageBackground source={images.background} resizeMode="cover">
            <SafeAreaView className="">
                <ScrollView contentContainerStyle={{ height: '100%' }}>
                    <View className="w-full justify-center items-center min-h-[84vh] px-4">
                        <Image 
                            source={images.logo}
                            className="w-[150px] h-[100px] mb-4"
                            resizeMode="contain"
                        />
                        <Image 
                            source={images.cards}
                            className="w-[68%] h-[11%] mb-4"
                            resizeMode="contain"
                        />
                        <CustomButton
                            title="PUBLIC LOGIN"
                            handlePress={() => router.push('/public-login')}
                            containerStyles={{ width: '100%', marginTop: 28 }}
                        />
                        <CustomButton
                            title="ADMIN LOGIN"
                            handlePress={() => router.push('/admin-login')}
                            containerStyles={{ width: '100%', marginTop: 28 }}
                        />
                        <CustomButton3
                            title="SOS"
                            handlePress={() => router.push('/sos')}
                            containerStyles={{ width: '100%', marginTop: 28 }}
                        />
                        <Text className="text-sm font-pregular text-white -100 mt-20 text-center">
                            Bridging Police and Public with Digital Solutions for Sri Lanka
                        </Text>
                        <Text>{' '}</Text>
                    </View>
                </ScrollView>
                <StatusBar backgroundColor='#161622' style='light' />
            </SafeAreaView>
        </ImageBackground>
    </StripeProvider>
    );
}
