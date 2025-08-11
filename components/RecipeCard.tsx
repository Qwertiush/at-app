
import { getUserProfile } from '@/app/firebase/firebaseDB';
import globalStyles from '@/app/Styles/global-styles';
import { RecipeContext } from '@/contexts/RecipeContext';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { Recipe } from '@/models/Recipe';
import { User } from '@/models/User';
import { router } from 'expo-router';
import { Timestamp } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Avatar from './Avatar';
import CustomImage from './CustomPrymitives/CustomImage';

export const formatDate = (ts?: Timestamp | null) => {
  if (ts && typeof (ts as any).seconds === 'number') {
    // jeśli to Timestamp z Firestore
    return new Date((ts as any).seconds * 1000).toLocaleDateString();
  }
  return 'Just now'; // fallback before server respond
};

const RecipeCard: React.FC<{ recipe: Recipe}> = ({ recipe }) => {
  const [user, setUser] = useState<User | null>(null);
  const {setRecipeId} = useContext(RecipeContext);
  const {setUserRecipecontext} = useContext(RecipeContext);
  const {textData, themeData} = useContext(UserPrefsContext);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        const fetched = await getUserProfile(recipe.authorId);
        if (!mounted) return;
        if (fetched) {
          const userObj: User = {
            uid: recipe.authorId,
            ...(fetched as Omit<User, 'uid'>),
          };
          setUser(userObj);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
        if (mounted) setUser(null);
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [recipe.authorId]);

  const onPressRecipe = () => {
    setRecipeId(recipe.id);
    setUserRecipecontext(user);
    router.push('/(recipe)/content')
  }

  return (
    <TouchableOpacity style={[styles.card,{backgroundColor: themeData.bc2, shadowColor: themeData.bc2}]} onPress={onPressRecipe}>
      {
      recipe.pictures?.length != 0
      ?
      <CustomImage source={{ uri: recipe.pictures?.[0] ?? '' }} dimentions={{width: '100%', height: 200}} removeTint={true} style={{borderRadius: 20}}/>
      :
      <CustomImage source={require('@/assets/images/picturePlaceholder.png')} dimentions={{width: 100, height: 100}} removeTint={true}/>
      }
      <Text style={[styles.title,{color: themeData.text1}]}>{recipe.title}</Text>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={[{flexDirection: 'column'}, globalStyles.centerElement]}>
          <Text style={[styles.meta,{color: themeData.text2}]}>{textData.recipeCard.text1}{user?.username ?? 'Unknown'}</Text>
          <Text style={[styles.meta,{color: themeData.text2}]}>
            {textData.recipeCard.text2}{formatDate(recipe.createdAt)}
          </Text>
        </View>
        <View>
          {user?.avatarUrl ? <Avatar source={{uri: user?.avatarUrl}} style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2}}/> : <Avatar source={require('@/assets/images/icons/def_avatar.png')}  style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2}}/>}
        </View>
      </View>
      <Text style={[styles.sectionTitle, {color: themeData.text1}]}>{textData.recipeCard.text3}</Text>
      {recipe.ingredients.map((item, index) => (
        <Text key={index} style={[styles.listItem,{color: themeData.text1}]}>• {item}</Text>
      ))}
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    margin: 12,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 10
  },
  meta: {
    fontSize: 12,
  },
  description: {
    marginVertical: 12,
    fontSize: 14
  },
  sectionTitle: {
    fontWeight: '600',
    marginTop: 10
  },
  listItem: {
    marginLeft: 10,
    fontSize: 14
  }
});
