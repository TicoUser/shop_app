import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { RecipeContext } from '../context/RecipeContext';

const ControleGeralScreen = () => {
  const { items, addItem, editItem, removeItem } = useContext(RecipeContext);
  const [inputValue, setInputValue] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim() && quantity.trim()) {
      addItem({ id: Date.now().toString(), text: inputValue, quantity: parseInt(quantity, 10) });
      setInputValue('');
      setQuantity('');
    }
  };

  const handleEditItem = (id) => {
    editItem(id, newText, parseInt(newQuantity, 10));
    setEditingId(null);
    setNewText('');
    setNewQuantity('');
  };

  const renderItem = ({ item }) => {
    const isEditing = editingId === item.id;

    return (
      <View style={styles.itemContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={newText}
              onChangeText={setNewText}
              onBlur={() => handleEditItem(item.id)}
            />
            <TextInput
              style={styles.input}
              value={newQuantity}
              onChangeText={setNewQuantity}
              onBlur={() => handleEditItem(item.id)}
              keyboardType="numeric"
              placeholder="Quantidade"
            />
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => { setEditingId(item.id); setNewText(item.text); setNewQuantity(item.quantity.toString()); }}>
              <Text style={styles.itemText}>{`${item.text} - Quantidade: ${item.quantity}`}</Text>
            </TouchableOpacity>
            <Button title="Editar" onPress={() => { setEditingId(item.id); setNewText(item.text); setNewQuantity(item.quantity.toString()); }} />
            <Button title="Remover" onPress={() => removeItem(item.id)} />
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Controle Geral</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Adicionar novo item"
      />
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Quantidade"
        keyboardType="numeric"
      />
      <Button title="Adicionar" onPress={handleAddItem} />
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
});

export default ControleGeralScreen;
