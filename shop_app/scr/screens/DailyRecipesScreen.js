import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, SectionList, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { RecipeContext } from '../context/RecipeContext';

const DailyRecipesScreen = () => {
  const { items, addItem, editItem, removeItem, recipes, addRecipe } = useContext(RecipeContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [recipeExpense, setRecipeExpense] = useState('');
  const [recipeValue, setRecipeValue] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isRecipeSectionVisible, setIsRecipeSectionVisible] = useState(true);
  const [isMaterialSectionVisible, setIsMaterialSectionVisible] = useState(true);

  const handleAddRecipe = () => {
    if (recipeName.trim() && recipeExpense.trim() && recipeValue.trim() && selectedItems.length > 0) {
      const newRecipe = {
        id: Date.now().toString(),
        name: recipeName,
        expense: parseFloat(recipeExpense),
        value: parseFloat(recipeValue),
        items: selectedItems,
      };
      addRecipe(newRecipe);
      setRecipeName('');
      setRecipeExpense('');
      setRecipeValue('');
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItems([...selectedItems, { ...item, quantity }]);
    setQuantity(1);
  };

  const handleAddItem = () => {
    if (newItemName.trim() && newItemQuantity.trim()) {
      addItem({ id: Date.now().toString(), text: newItemName, quantity: parseInt(newItemQuantity) });
      setNewItemName('');
      setNewItemQuantity('');
    }
  };

  const handleEditItem = (id, newText) => {
    editItem(id, newText);
    setEditItemId(null);
    setNewItemName('');
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const renderRecipeItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{`${item.text} - Quantidade disponível: ${item.quantity || 0}`}</Text>
      {editItemId === item.id ? (
        <TextInput
          style={styles.input}
          value={newItemName}
          onChangeText={setNewItemName}
          onSubmitEditing={() => handleEditItem(item.id, newItemName)}
        />
      ) : (
        <>
          <Button title="Editar" onPress={() => { setEditItemId(item.id); setNewItemName(item.text); }} />
          <Button title="Remover" onPress={() => handleRemoveItem(item.id)} />
        </>
      )}
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectItem(item)}>
      <Text style={styles.itemText}>{`${item.text} - Quantidade disponível: ${item.quantity || 0}`}</Text>
    </TouchableOpacity>
  );

  const renderSelectedItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{`${item.text} - Quantidade: ${item.quantity}`}</Text>
    </View>
  );

  return (
    <SectionList
      sections={[
        {
          title: 'Criar Receita',
          data: isRecipeSectionVisible ? items : [],
          renderItem: renderItem,
          renderHeader: () => (
            <View style={[styles.centeredSectionHeader, styles.shadow, !isRecipeSectionVisible && styles.minimized]}>
              <TouchableOpacity onPress={() => setIsRecipeSectionVisible(!isRecipeSectionVisible)}>
                <Text style={styles.sectionTitle}>
                  {isRecipeSectionVisible ? '▼' : '▶'} Criar Receita
                </Text>
              </TouchableOpacity>
              {isRecipeSectionVisible && (
                <>
                  <TextInput
                    style={styles.input}
                    value={recipeName}
                    onChangeText={setRecipeName}
                    placeholder="Nome da Receita"
                  />
                  <TextInput
                    style={styles.input}
                    value={recipeExpense}
                    onChangeText={setRecipeExpense}
                    placeholder="Despesas da Receita"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    value={recipeValue}
                    onChangeText={setRecipeValue}
                    placeholder="Valor da Receita"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    value={quantity.toString()}
                    onChangeText={text => setQuantity(parseInt(text))}
                    placeholder="Quantidade"
                    keyboardType="numeric"
                  />
                  <Button title="Adicionar Receita" onPress={handleAddRecipe} />
                  <FlatList
                    data={selectedItems}
                    keyExtractor={item => item.id}
                    renderItem={renderSelectedItem}
                    style={styles.selectedItemsList}
                  />
                </>
              )}
            </View>
          ),
        },
        {
          title: 'Gerenciar Materiais',
          data: isMaterialSectionVisible ? items : [],
          renderItem: renderRecipeItem,
          renderHeader: () => (
            <View style={[styles.centeredSectionHeader, styles.shadow, !isMaterialSectionVisible && styles.minimized]}>
              <TouchableOpacity onPress={() => setIsMaterialSectionVisible(!isMaterialSectionVisible)}>
                <Text style={styles.sectionTitle}>
                  {isMaterialSectionVisible ? '▼' : '▶'} Gerenciar Materiais
                </Text>
              </TouchableOpacity>
              {isMaterialSectionVisible && (
                <>
                  <TextInput
                    style={styles.input}
                    value={newItemName}
                    onChangeText={setNewItemName}
                    placeholder="Nome do Material"
                  />
                  <TextInput
                    style={styles.input}
                    value={newItemQuantity}
                    onChangeText={setNewItemQuantity}
                    placeholder="Quantidade"
                    keyboardType="numeric"
                  />
                  <Button title="Adicionar Material" onPress={handleAddItem} />
                </>
              )}
            </View>
          ),
        },
      ]}
      keyExtractor={(item, index) => item.id || index.toString()}
      renderSectionHeader={({ section: { title, renderHeader } }) => (
        <View>
          {renderHeader()}
        </View>
      )}
    />
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
  },
  centeredSectionHeader: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  minimized: {
    marginTop: 50,
    marginBottom: -10,
  },
  selectedItemsList: {
    marginTop: 10,
  },
});

export default DailyRecipesScreen;
