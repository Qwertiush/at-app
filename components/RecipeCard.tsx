
import { getUserProfile } from '@/app/firebase/firebaseDB';
import { colors } from '@/app/Styles/global-styles';
import { RecipeProps } from '@/models/Recipe';
import { User } from '@/models/User';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const formatDate = (ts?: Timestamp | null) => {
  if (ts && typeof (ts as any).seconds === 'number') {
    // jeśli to Timestamp z Firestore
    return new Date((ts as any).seconds * 1000).toLocaleDateString();
  }
  return 'Just now'; // fallback zanim serwer uzupełni
};

const RecipeCard: React.FC<{ recipe: RecipeProps}> = ({ recipe }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        const fetched = await getUserProfile(recipe.authorId);
        if (!mounted) return;
        if (fetched) {
          // Zakładamy, że fetched nie zawiera uid albo ma; ustalamy pewnie:
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

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.meta}> By: {user?.username ?? 'Unknown'}</Text>
      <Text style={styles.meta}>
        Created: {formatDate(recipe.createdAt)}
      </Text>

      <Text style={styles.description}>{recipe.description}</Text>

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {recipe.ingredients.map((item, index) => (
        <Text key={index} style={styles.listItem}>• {item}</Text>
      ))}

      <Text style={styles.sectionTitle}>Steps:</Text>
      {recipe.steps.map((step, index) => (
        <Text key={index} style={styles.listItem}>{index + 1}. {step}</Text>
      ))}
    </View>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.highlight,
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
    color: '#888'
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
