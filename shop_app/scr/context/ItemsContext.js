import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const saveItems = async (items) => {
    try {
      const jsonValue = JSON.stringify(items);
      await AsyncStorage.setItem('@items', jsonValue);
    } catch (e) {
      console.error('Erro ao salvar itens', e);
    }
  };

  const loadItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@items');
      if (jsonValue != null) {
        setItems(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Erro ao carregar itens', e);
    }
  };

  const addItem = (item) => {
    const newItems = [...items, item];
    setItems(newItems);
    saveItems(newItems);
  };

  const editItem = (id, newText) => {
    const newItems = items.map(item => item.id === id ? { ...item, text: newText } : item);
    setItems(newItems);
    saveItems(newItems);
  };

  const removeItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    saveItems(newItems);
  };

  return (
    <ItemsContext.Provider value={{ items, addItem, editItem, removeItem }}>
      {children}
    </ItemsContext.Provider>
  );
};
