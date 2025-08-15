import globalStyles from '@/app/Styles/global-styles'
import ContentContainer from '@/components/ContentContainer'
import CustomIconButton from '@/components/CustomIconButton'
import CustomImage from '@/components/CustomPrymitives/CustomImage'
import TextM from '@/components/CustomPrymitives/Text/TextM'
import TextXXL from '@/components/CustomPrymitives/Text/TextXXL'
import LoadingComponent from '@/components/LoadingComponent'
import UserCard from '@/components/UserCard'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { useAuth } from '@/hooks/useAuth'
import { User } from '@/models/User'
import { router } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StatusBar, View } from 'react-native'

const FavUsers = () => {
    const {textData, themeData, listLimit} = useContext(UserPrefsContext);

    const [itemsLimit, setItemsLimit] = useState(listLimit); 
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true)

    const {user, loadingUser} = useAuth();

    useEffect(() => {
        if(!loadingUser && user?.uid){
            //const unsubscribe = subscribeToLikedUsers(setUsers,user?.uid,itemsLimit);
            //setLoadingUsers(false);
            //return () => unsubscribe();
        }
    }, [user, itemsLimit]);

    const loadMoreRecipes = () => {
        setItemsLimit((prev) => prev + listLimit);
    }

    if(loadingUser || loadingUsers){
        return (
        <ContentContainer>
            <View style={{flexDirection: 'row', marginTop: 40, alignSelf: 'flex-start'}}>
                <CustomImage source={require('@/assets/images/icons/recipe.png')} dimentions={{width: 40, height: 40}}/>
                <CustomIconButton iconSource={require('@/assets/images/icons/arrow.png')} style={{ marginTop: 0, marginBottom: 0}} handlePress={ () => router.replace('/favourites') }/>
            </View>
           
            <View style={[globalStyles.centerElement, globalStyles.textContainer,{flexDirection: 'row', alignItems: 'center', backgroundColor: themeData.bc2}]}>
                <TextXXL>{textData.favouritesScreen.header3}</TextXXL>
                <CustomImage
                    source={require('@/assets/images/icons/logo.png')}
                    dimentions={{width: 50, height: 50}}
                />
                <TextXXL>{textData.favouritesScreen.header4}</TextXXL>
            </View>
            <LoadingComponent/>
        </ContentContainer>
        );
    }
    return (
    <ContentContainer style={globalStyles.container}>
      <FlatList
      style={{
        width: '100%',
        paddingTop: StatusBar.currentHeight,
      }}
      data={users}
      keyExtractor={(item)=>item.uid}
      renderItem={({item}) => <UserCard user={item}/>}
      onEndReached={loadMoreRecipes}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={
        <View style={[globalStyles.centerElement, globalStyles.textContainer,{flexDirection: 'row', alignItems: 'center', backgroundColor: themeData.bc2}]}>
          <TextXXL>{textData.favouritesScreen.header1}</TextXXL>
          <CustomImage
            source={require('@/assets/images/icons/logo.png')}
            dimentions={{width: 50, height: 50}}
          />
          <TextXXL>{textData.favouritesScreen.header2}</TextXXL>
          <CustomIconButton iconSource={require('@/assets/images/icons/arrow.png')} style={{ marginTop: 40, marginBottom: 0}} handlePress={ () => router.replace('/favourites') }/>
        </View>
        }
      ListFooterComponent={
        <TextM style={{
            paddingTop: 10,
            paddingBottom: 200,
            alignSelf: 'center',
          }}>
            {textData.favouritesScreen.text1}
        </TextM>
      }
      >
      </FlatList>
    </ContentContainer>
  )
}

export default FavUsers