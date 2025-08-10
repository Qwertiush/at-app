import TabsIcon from '@/components/TabsIcon';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { Tabs } from 'expo-router';
import React, { useContext } from 'react';
import { ImageSourcePropType } from 'react-native';

type Tab = {
    name: string,
    icon: ImageSourcePropType,
    title: string
}

type TabsLayoutProps = {
    tabs: Tab[]
}

const TabsLayout: React.FC<TabsLayoutProps> = ({tabs}) => {
  const {themeData} = useContext(UserPrefsContext);

  return (
    <>
    <Tabs
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 70,
        backgroundColor: themeData.tabsBar,
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