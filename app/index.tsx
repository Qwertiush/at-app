import TextXL from '@/components/CustomPrymitives/Text/TextXL';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { registerRootComponent } from 'expo';
import { ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { Image, ScrollView, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { AUTH } from '../firebase/FirebaseConfig';
import globalStyles from './Styles/global-styles.js';

registerRootComponent(App);

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
      <StatusBar translucent />

      <View style={[globalStyles.container, { backgroundColor: themeData.bc }]}>
        <ImageBackground
          style={globalStyles.container}
          source={require('@/assets/images/bc1.png')}
          tintColor={themeData.text1}
        >
          <ScrollView
            contentContainerStyle={{
              paddingVertical: 20,
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../assets/images/icons/logo.png')}
              style={{ width: 200, height: 200, alignSelf: 'center' }}
              tintColor={themeData.text1}
            />

            <Image
              source={require('../assets/images/icons/cards.png')}
              style={{
                width: 400,
                height: 300,
                alignSelf: 'center',
                backgroundColor: themeData.bc,
              }}
              tintColor={themeData.text1}
            />

            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%',
                marginVertical: 20,
              }}
            >
              <TextXL style={{ backgroundColor: themeData.bc, textAlign: 'center' }}>
                {textData.indexScreen.paragraph}
              </TextXL>
              <Image
                source={require('../assets/images/icons/logo.png')}
                style={{ width: 40, height: 40, marginTop: 20, alignSelf: 'center' }}
                tintColor={themeData.text1}
              />
            </View>

            <CustomButton
              text={textData.indexScreen.button}
              handlePress={handleGoTo}
            />
          </ScrollView>
        </ImageBackground>
      </View>
    </>

  );
}
