import { StatusBar } from "expo-status-bar";
import { Button, Image, ScrollView, Text, View, ImageBackground } from 'react-native';
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";


export default function App() {
    return (
    <ImageBackground  source={images.background } resizeMode="cover" >
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
                            className="w-[68%] h-[11%] mb-4 "
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
                        <CustomButton
                        title="HOME"
                        handlePress={() => router.push('/add-laws')}
                        containerStyles={{ width: '100%', marginTop: 28 }}
                        />
                        <Text className="text-sm font-pregular text-white -100 mt-7 text-center">
                        Bridging Police and Public with Digital Solutions
                        for  Sri Lanka
                        </Text>
                        <Text>{' '}</Text>
                    </View>
                </ScrollView>
                
                <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
        </ImageBackground>
    );
}
