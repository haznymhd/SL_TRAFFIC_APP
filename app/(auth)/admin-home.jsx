import { View, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton2 from '../../components/CustomButton2';
import { useRouter } from 'expo-router';
import { images } from '../../constants'; // Adjust this import based on your initial usage

const adminHome = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'  }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        <View style={{ marginTop: 0, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <CustomButton2
            title="PUT FINES"
            handlePress={() => router.push('')}
            containerStyles={{ flex: 1, marginRight: 4 }}
          />
          <CustomButton2
            title="ADD TRAFFIC LAWS"
            handlePress={() => router.push('/add-laws')}
            containerStyles={{ flex: 1, marginLeft: 4 }}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <CustomButton2
            title="FINE HISTORY"
            handlePress={() => router.push('')}
            containerStyles={{ flex: 1, marginRight: 4 }}
          />
          <CustomButton2
            title="ADD TRAFFIC RULES"
            handlePress={() => router.push('/add-rules')}
            containerStyles={{ flex: 1, marginLeft: 4 }}
          />
        </View>
        <CustomButton2
          title="SEARCH"
          handlePress={() => router.push('/search')}
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

export default adminHome;
