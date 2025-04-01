import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getDB } from '../database';
import { useNavigation } from '@react-navigation/native';

const BusinessList = () => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const db = getDB();
    const subscription = db.businesses
      .find()
      .sort({ name: 1 })
      .$.subscribe((bs) => {
        setBusinesses(bs);
      });

    return () => subscription.unsubscribe();
  }, []);

  const navigateToArticles = (businessId: string) => {
    navigation.navigate('ArticleList', { businessId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Businesses</Text>
      <FlatList
        data={businesses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigateToArticles(item.id)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddBusiness')}
      >
        <Text style={styles.addButtonText}>Add Business</Text>
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

export default BusinessList;