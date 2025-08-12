import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '../components/CustomButton';
import { AUTH } from '../firebase/FirebaseConfig';
import globalStyles, { default as styles } from './Styles/global-styles.js';

export default function App() {
  const {textData, themeData} = useContext(UserPrefsContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTH, (user) => {
    if (user) {
      console.log("✅ Użytkownik zalogowany:", user.email);
      router.replace('/(tabs)/home');
    } else {
      console.log("🛑 Niezalogowany");
    }
  });
    return unsubscribe;
  }, []);

  const handleGoTo = () => {
    router.replace('/sign-in');
  }

  return (
    <>
    <StatusBar translucent backgroundColor="transparent" />

    <SafeAreaView style={[globalStyles.container, {backgroundColor: themeData.bc}]}> 
      <ImageBackground
        style={globalStyles.container}
        source={require('@/assets/images/bc1.png')}
        tintColor={themeData.text1}
      >
        <ScrollView contentContainerStyle={[{height: '100%'}]}>
          <View style={styles.centered}>
            <Image
              source={require('../assets/images/icons/logo.png')}
              style={{ width: 200, height: 200, alignSelf: 'center' }}
              tintColor={themeData.text1}
            />
            <Image
              source={require('../assets/images/icons/cards.png')}
              style={{ width: 400, height: 400, alignSelf: 'center', backgroundColor: themeData.bc }}
              tintColor={themeData.text1}
            />
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={[styles.textXL,{color: themeData.text1, backgroundColor: themeData.bc}]}>{textData.indexScreen.paragraph}</Text>
              <Image
                source={require('../assets/images/icons/logo.png')}
                style={{ width: 40, height: 40, alignSelf: 'center' }}
                tintColor={themeData.text1}
              />
            </View>
            <CustomButton text={textData.indexScreen.button} handlePress={handleGoTo}/>
          </View>      
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
    </>
  );
}
