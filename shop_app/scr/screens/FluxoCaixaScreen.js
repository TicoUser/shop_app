import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { RecipeContext } from '../context/RecipeContext';

const FluxoCaixaScreen = () => {
  const { recipes, registerSale } = useContext(RecipeContext);

  const handleRegisterSale = (recipeId) => {
    registerSale(recipeId);
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{`Nome: ${item.name} - Preço: R$ ${item.value.toFixed(2)}`}</Text>
      <Button title="Registrar Venda" onPress={() => handleRegisterSale(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fluxo de Caixa</Text>
      <FlatList
        data={recipes}
        keyExtractor={recipe => recipe.id}
        renderItem={renderRecipeItem}
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
    textAlign: 'center',
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});

export default FluxoCaixaScreen;
