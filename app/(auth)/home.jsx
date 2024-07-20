import { View, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton2 from '../../components/CustomButton2';
import { useRouter } from 'expo-router';
import { images } from '../../constants'; // Adjust this import based on your initial usage

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'  }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        {images.carousel && (
          <Image 
            source={images.carousel}
            style={{ alignSelf: 'center', width: '100%', height: '45%' }} // Adjust height as needed
            resizeMode="contain"
          />
        )}
        <View style={{ marginTop: 0, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <CustomButton2
            title="MY FINES"
            handlePress={() => router.push('')}
            containerStyles={{ flex: 1, marginRight: 4 }}
          />
          <CustomButton2
            title="TRAFFIC LAWS"
            handlePress={() => router.push('')}
            containerStyles={{ flex: 1, marginLeft: 4 }}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <CustomButton2
            title="EMERGENCY"
            handlePress={() => router.push('')}
            containerStyles={{ flex: 1, marginRight: 4 }}
          />
          <CustomButton2
            title="TRAFFIC FINES"
            handlePress={() => router.push('')}
            containerStyles={{ flex: 1, marginLeft: 4 }}
          />
        </View>
        <CustomButton2
          title="MY PROFILE"
          handlePress={() => router.push('')}
          containerStyles={{ width: '100%', marginTop: 16, marginBottom: 56 }} // Added marginBottom to create a gap
        />
        {images.cards && (
          <Image 
            source={images.cards}
            style={{ alignSelf: 'center', width: '68%', height: '11%' }}
            resizeMode="contain"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
