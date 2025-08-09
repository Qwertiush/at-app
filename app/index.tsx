import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '../components/CustomButton';
import { AUTH } from './firebase/FirebaseConfig';
import globalStyles, { colors, default as styles } from './Styles/global-styles.js';

export default function App() {
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

  return (
    <>
    <StatusBar translucent backgroundColor="transparent" />

    <SafeAreaView style={[globalStyles.container, {backgroundColor: colors.bc}]}> 
      <ScrollView contentContainerStyle={[{height: '100%'}]}>
        <View style={styles.centered}>
          <Image
            source={require('../assets/images/icons/logo.png')}
            style={{ width: 200, height: 200, alignSelf: 'center' }}
          />
          <Image
            source={require('../assets/images/icons/cards.png')}
            style={{ width: 400, height: 400, alignSelf: 'center' }}
          />
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.textXL}>Discover endles possibilities with </Text>
            <Image
            source={require('../assets/images/icons/logo.png')}
            style={{ width: 40, height: 40, alignSelf: 'center' }}
          />
          </View>
          <CustomButton text='Dive In' handlePress={()=>router.push('/sign-in')}/>
        </View>      
      </ScrollView>
    </SafeAreaView>
    </>
  );
}
