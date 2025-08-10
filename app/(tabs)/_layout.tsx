import TabsLayout from '@/components/TabsLayout';
import React from 'react';

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
    name: '(profile)',
    icon: require('../../assets/images/icons/profile.png'),
    title: 'Profile',
  },
    {
    name: 'favourites',
    icon: require('../../assets/images/icons/favs.png'),
    title: 'Favourites',
  },
]

const MainTabsLayout = () => {
  return (
    <TabsLayout tabs={TabsArray}/>
  )
}

export default MainTabsLayout