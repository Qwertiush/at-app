import { usePopup } from '@/contexts/PopUpContext'
import { RecipeContext } from '@/contexts/RecipeContext'
import { UserPrefsContext } from '@/contexts/UserPrefsContext'
import { User } from '@/models/User'
import { router } from 'expo-router'
import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Avatar from './Avatar'
import TextS from './CustomPrymitives/Text/TextS'
import TextXS from './CustomPrymitives/Text/TextXS'
import { formatDate } from './RecipeCard'

const UserCard: React.FC<{user: User}>= ({user}) => {
  
  const {setUserRecipecontext, setRecipeId, setRecipe} = useContext(RecipeContext);
  const {textData, themeData} = useContext(UserPrefsContext);
  const {showPopup} = usePopup();
  
  const handleOnUserPress = () => {
    setRecipeId(null);
    setRecipe(null);
    setUserRecipecontext(user);
    router.push('/(recipe)/author')
  }

  return (
    <TouchableOpacity style={[{width: '95%', alignSelf: 'center', padding: 10 ,backgroundColor: themeData.bc2, shadowColor: themeData.bc2, borderRadius: 20}]} onPress={handleOnUserPress}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={[{flexDirection: 'column', alignSelf: 'center'}]}>
          <TextS style={[{color: themeData.text2}]}>{user?.username ?? textData.recipeCard.userNotFound}</TextS>
          <TextXS style={{color: themeData.text2}}>{textData.userCard.text1}{formatDate(user.createdAt)}</TextXS>
        </View>
        <View>
          {user?.avatarUrl ? <Avatar source={{uri: user?.avatarUrl}} style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2}}/> : <Avatar source={require('@/assets/images/icons/def_avatar.png')}  style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2}}/>}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default UserCard