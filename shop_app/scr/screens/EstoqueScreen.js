import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RecipeContext } from '../context/RecipeContext';

const EstoqueScreen = () => {
  const { items } = useContext(RecipeContext);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.text}</Text>
      <Text style={styles.quantityText}>{`Quantidade: ${item.quantity || 0}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estoque</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
    color: '#888',
  },
});

export default EstoqueScreen;
