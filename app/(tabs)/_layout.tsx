import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import globalStyles, { colors } from '../Styles/global-styles.js';

type TabsIconProps = {
  icon: ImageSourcePropType
  name?: string,
  focused?: boolean,
}

const TabsIcon: React.FC<TabsIconProps> = ({ icon, name, focused }) => {
  return (
    <View style={{ 
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100%',
      paddingTop: 8,
    }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={focused ? { width: 30, height: 30 } : { width: 24, height: 24 }}
        tintColor={focused ? colors.secondary : colors.text2}
      />
      <Text style={focused ?[globalStyles.textXS, { marginTop: 2, color: colors.secondary }]:[globalStyles.textS, { marginTop: 2, color: colors.text2, width: 50,textAlign: 'center' }]}>{name}</Text>
    </View>
  );
};

const TabsArray = [
  {
    name: 'home',
    icon: require('../../assets/images/icons/home.png'),
    title: 'Home',
  },
  {
    name: 'create',
    icon: require('../../assets/images/icons/create.png'),
    title: 'Create',
  },
    {
    name: 'profile',
    icon: require('../../assets/images/icons/profile.png'),
    title: 'Profile',
  },
    {
    name: 'favourites',
    icon: require('../../assets/images/icons/favs.png'),
    title: 'Favourites',
  },
]

const TabsLayout = () => {
  return (
    <>
    <Tabs
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 70,
        backgroundColor: colors.bc2,
        borderTopWidth: 1,
        borderTopColor: '#222',
      },
      }}>
      {TabsArray.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <TabsIcon icon={tab.icon} name={tab.title} focused={focused} />
            ),
          }}
        />
      ))}
    </Tabs>
    </>
  )
}

export default TabsLayout