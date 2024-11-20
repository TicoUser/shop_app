import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { RecipeContext } from '../context/RecipeContext';

const ControleGeralScreen = () => {
  const { expenses, addExpense, profits, addProfit } = useContext(RecipeContext);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [profitName, setProfitName] = useState('');
  const [profitAmount, setProfitAmount] = useState('');
  const [isExpenseSectionVisible, setIsExpenseSectionVisible] = useState(true);
  const [isProfitSectionVisible, setIsProfitSectionVisible] = useState(true);

  const handleAddExpense = () => {
    if (expenseName.trim() && expenseAmount.trim()) {
      addExpense({ id: Date.now().toString(), name: expenseName, amount: parseFloat(expenseAmount) });
      setExpenseName('');
      setExpenseAmount('');
    }
  };

  const handleAddProfit = () => {
    if (profitName.trim() && profitAmount.trim()) {
      addProfit({ id: Date.now().toString(), name: profitName, amount: parseFloat(profitAmount) });
      setProfitName('');
      setProfitAmount('');
    }
  };

  const renderExpenseItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{`${item.name} - R$ ${item.amount.toFixed(2)}`}</Text>
    </View>
  );

  const renderProfitItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{`${item.name} - R$ ${item.amount.toFixed(2)}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Controle Geral</Text>
      
      <View style={styles.section}>
        <TouchableOpacity onPress={() => setIsExpenseSectionVisible(!isExpenseSectionVisible)}>
          <Text style={styles.sectionTitle}>
            {isExpenseSectionVisible ? '▼' : '▶'} Controle de Gastos
          </Text>
        </TouchableOpacity>
        {isExpenseSectionVisible && (
          <>
            <TextInput
              style={styles.input}
              value={expenseName}
              onChangeText={setExpenseName}
              placeholder="Nome do Gasto"
            />
            <TextInput
              style={styles.input}
              value={expenseAmount}
              onChangeText={setExpenseAmount}
              placeholder="Valor do Gasto"
              keyboardType="numeric"
            />
            <Button title="Adicionar Gasto" onPress={handleAddExpense} />
            <FlatList
              data={expenses}
              keyExtractor={item => item.id}
              renderItem={renderExpenseItem}
            />
          </>
        )}
      </View>
      
      <View style={styles.section}>
        <TouchableOpacity onPress={() => setIsProfitSectionVisible(!isProfitSectionVisible)}>
          <Text style={styles.sectionTitle}>
            {isProfitSectionVisible ? '▼' : '▶'} Controle de Lucros
          </Text>
        </TouchableOpacity>
        {isProfitSectionVisible && (
          <>
            <TextInput
              style={styles.input}
              value={profitName}
              onChangeText={setProfitName}
              placeholder="Nome do Lucro"
            />
            <TextInput
              style={styles.input}
              value={profitAmount}
              onChangeText={setProfitAmount}
              placeholder="Valor do Lucro"
              keyboardType="numeric"
            />
            <Button title="Adicionar Lucro" onPress={handleAddProfit} />
            <FlatList
              data={profits}
              keyExtractor={item => item.id}
              renderItem={renderProfitItem}
            />
          </>
        )}
      </View>
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
  section: {
    marginBottom: 30,
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
  },
  itemText: {
    fontSize: 18,
  },
});

export default ControleGeralScreen;
