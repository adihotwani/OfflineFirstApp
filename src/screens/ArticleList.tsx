import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getDB } from '../Database/index';
import { useRoute, useNavigation } from '@react-navigation/native';

const ArticleList = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const route = useRoute();
  const navigation = useNavigation();
  const { businessId } = route.params;

  useEffect(() => {
    const db = getDB();
    const subscription = db.articles
      .find({
        selector: {
          business_id: businessId,
        },
      })
      .$.subscribe((as) => {
        setArticles(as);
      });

    return () => subscription.unsubscribe();
  }, [businessId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Articles</Text>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>Quantity: {item.qty}</Text>
            <Text>Price: ${item.selling_price}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddArticle', { businessId })}
      >
        <Text style={styles.addButtonText}>Add Article</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ArticleList;