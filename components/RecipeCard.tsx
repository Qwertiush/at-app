import { colors } from '@/app/Styles/global-styles';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type RecipeProps = {
  id: string;
  title: string;
  description: string;
  authorId: string;
  createdAt: Timestamp | null;
  ingredients: string[];
  steps: string[];
  pictures?: string[];
};

const formatDate = (ts?: Timestamp | null) => {
  if (ts && typeof (ts as any).seconds === 'number') {
    // jeśli to Timestamp z Firestore
    return new Date((ts as any).seconds * 1000).toLocaleDateString();
  }
  return 'Just now'; // fallback zanim serwer uzupełni
};

const RecipeCard: React.FC<{ recipe: RecipeProps }> = ({ recipe }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.meta}>By: {recipe.authorId}</Text>
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
