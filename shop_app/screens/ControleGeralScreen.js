import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ItemsContext } from '.../ItemsContext';

const ControleGeralScreen = () => {
  const { items, addItem, editItem, removeItem } = useContext(ItemsContext);
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim()) {
      addItem({ id: Date.now().toString(), text: inputValue });
      setInputValue('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.text}</Text>
      <Button title="X" onPress={() => removeItem(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Controle Geral</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Adicionar novo item"
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
