import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [expenses, setExpenses] = useState([]); 
  const [profits, setProfits] = useState([]);

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

  const updateItemQuantity = (id, quantityChange) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantity: (item.quantity || 0) + quantityChange } : item
    );
    setItems(newItems);
    saveItems(newItems);
  };

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
    recipe.items.forEach(({ id, quantity }) => updateItemQuantity(id, -quantity));
  };

  const registerSale = (recipeId) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      recipe.items.forEach(({ id, quantity }) => {
        // Corrigir a atualização da quantidade para todos os itens
        const itemIndex = items.findIndex(i => i.id === id);
        if (itemIndex !== -1) {
          items[itemIndex].quantity -= quantity;
        }
      });
      setItems([...items]); // Atualizar o estado dos itens
    }
  };

  const addExpense = (expense) => {   
    setExpenses([...expenses, expense]); 
  }; 
  
  const addProfit = (profit) => { 
    setProfits([...profits, profit]); 
  };

  return (
    <RecipeContext.Provider value={{ items, addItem, editItem, removeItem, updateItemQuantity, recipes, addRecipe, registerSale }}>
      {children}
    </RecipeContext.Provider>
  );
};
