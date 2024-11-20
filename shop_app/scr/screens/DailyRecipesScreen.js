import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { RecipeContext } from '../context/RecipeContext';

const DailyRecipesScreen = () => {
  const { items, addItem, editItem, removeItem, recipes, addRecipe } = useContext(RecipeContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isRecipeSectionVisible, setIsRecipeSectionVisible] = useState(true);
  const [isMaterialSectionVisible, setIsMaterialSectionVisible] = useState(true);

  const handleAddRecipe = () => {
    if (recipeName.trim() && selectedItems.length > 0) {
      const newRecipe = {
        id: Date.now().toString(),
        name: recipeName,
        items: selectedItems,
      };
      addRecipe(newRecipe);
      setRecipeName('');
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItems([...selectedItems, { ...item, quantity }]);
    setQuantity(1);
  };

  const handleAddItem = () => {
    if (newItemName.trim()) {
      addItem({ id: Date.now().toString(), text: newItemName });
      setNewItemName('');
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

  return (
    <SectionList
      sections={[
        {
          title: 'Criar Receita',
          data: isRecipeSectionVisible ? items : [],
          renderItem: renderItem,
          renderHeader: () => (
            <View>
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
                    value={quantity.toString()}
                    onChangeText={text => setQuantity(parseInt(text))}
                    placeholder="Quantidade"
                    keyboardType="numeric"
                  />
                  <Button title="Adicionar Receita" onPress={handleAddRecipe} />
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
            <View>
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
});

export default DailyRecipesScreen;
