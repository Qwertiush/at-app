import TabsIcon from '@/components/TabsIcon';
import { Tabs } from 'expo-router';
import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { colors } from '../app/Styles/global-styles';

type Tab = {
    name: string,
    icon: ImageSourcePropType,
    title: string
}

type TabsLayoutProps = {
    tabs: Tab[]
}

const TabsLayout: React.FC<TabsLayoutProps> = ({tabs}) => {
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
      {tabs.map((tab) => (
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