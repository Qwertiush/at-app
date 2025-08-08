import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '../components/CustomButton';
import { AUTH } from './firebase/FirebaseConfig';
import styles from './Styles/global-styles.js';

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
    <SafeAreaView style={styles.container}> 
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View style={styles.centered}>
          <Image
            source={require('../assets/images/icons/logo.png')}
            style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 50 }}
          />
          <Image
            source={require('../assets/images/icons/cards.png')}
            style={{ width: 300, height: 300, alignSelf: 'center', marginTop: 50 }}
          />
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <Text style={styles.textXL}>Discover endles possibilities with </Text>
            <Text style={[styles.textXXL,{color: '#FFA001'}]}>AT</Text>
            <Image
              source={require('../assets/images/icons/line.png')}
              style={{position: 'absolute',right: 0, bottom: -30, width: 50, height: 50}}
            />
          </View>
          <Text style={[styles.centered,{paddingHorizontal: 60, paddingTop: 30, textAlign: 'center'}]}>Where creativity meet innovation: get into the journey You will never forget with AT.</Text>
        </View>
        <CustomButton text='Log in' handlePress={()=>router.push('/sign-in')}/>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}
