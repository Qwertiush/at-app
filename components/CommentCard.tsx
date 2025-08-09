import { getUserProfile } from '@/app/firebase/firebaseDB'
import globalStyles, { colors } from '@/app/Styles/global-styles'
import { RecipeComment } from '@/models/Comment'
import { User } from '@/models/User'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Avatar from './Avatar'
import { formatDate } from './RecipeCard'

const CommentCard: React.FC<{comment: RecipeComment}> = ({comment}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        const fetched = await getUserProfile(comment.authorId);
        if (!mounted) return;
        if (fetched) {
          const userObj: User = {
            uid: comment.authorId,
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
  }, [comment.authorId]);

  return (
    <View style={styles.card}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={[{flexDirection: 'column'}, globalStyles.centerElement]}>
          <Text style={styles.meta}> By: {user?.username ?? 'Unknown'}</Text>
          <Text style={styles.meta}>
            Created: {formatDate(comment.createdAt)}
          </Text>
        </View>
        <View>
          {user?.avatarUrl ? <Avatar source={{uri: user?.avatarUrl}} style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2}}/> : <Avatar source={require('@/assets/images/icons/def_avatar.png')}  style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2}}/>}
        </View>
      </View>
      <Text style={globalStyles.textM}>{comment.description}</Text>
    </View>
  )
}

export default CommentCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bc2,
    padding: 16,
    borderRadius: 10,
    margin: 12,
    elevation: 3,
    shadowColor: colors.bc2,
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4
  },
  meta: {
    fontSize: 12,
    color: colors.text2
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
