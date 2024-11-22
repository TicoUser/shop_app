import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { RecipeContext } from '../context/RecipeContext';
import { LineChart } from 'react-native-chart-kit';

const ControleGeralScreen = () => {
  const { expenses, addExpense, profits, addProfit } = useContext(RecipeContext);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [profitName, setProfitName] = useState('');
  const [profitAmount, setProfitAmount] = useState('');
  const [isExpenseSectionVisible, setIsExpenseSectionVisible] = useState(true);
  const [isProfitSectionVisible, setIsProfitSectionVisible] = useState(true);

  const totalExpenses = expenses.reduce((total, item) => total + item.amount, 0).toFixed(2);
  const totalProfits = profits.reduce((total, item) => total + item.amount, 0).toFixed(2);
  const balance = (totalProfits - totalExpenses).toFixed(2);

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
    <View style={[styles.itemContainer, styles.shadow]}>
      <Text style={styles.itemText}>{`${item.name} - R$ ${item.amount.toFixed(2)}`}</Text>
    </View>
  );

  const renderProfitItem = ({ item }) => (
    <View style={[styles.itemContainer, styles.shadow]}>
      <Text style={styles.itemText}>{`${item.name} - R$ ${item.amount.toFixed(2)}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Controle Geral</Text>
      
      <View style={[styles.section, styles.shadow]}>
        <TouchableOpacity onPress={() => setIsExpenseSectionVisible(!isExpenseSectionVisible)}>
          <Text style={styles.sectionTitle}>
            {isExpenseSectionVisible ? '▼' : '▶'} Adicionar Despesas
          </Text>
        </TouchableOpacity>
        {isExpenseSectionVisible && (
          <>
            <TextInput
              style={styles.input}
              value={expenseName}
              onChangeText={setExpenseName}
              placeholder="Nome da Despesa"
            />
            <TextInput
              style={styles.input}
              value={expenseAmount}
              onChangeText={setExpenseAmount}
              placeholder="Valor da Despesa"
              keyboardType="numeric"
            />
            <Button title="Adicionar Despesa" onPress={handleAddExpense} />
            <SectionList
              sections={[
                {
                  title: 'Despesas',
                  data: expenses,
                  renderItem: renderExpenseItem,
                  keyExtractor: item => item.id,
                }
              ]}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionTitle}>{title}</Text>
              )}
            />
          </>
        )}
      </View>
      
      <View style={[styles.section, styles.shadow]}>
        <TouchableOpacity onPress={() => setIsProfitSectionVisible(!isProfitSectionVisible)}>
          <Text style={styles.sectionTitle}>
            {isProfitSectionVisible ? '▼' : '▶'} Adicionar Lucros
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
            <SectionList
              sections={[
                {
                  title: 'Lucros',
                  data: profits,
                  renderItem: renderProfitItem,
                  keyExtractor: item => item.id,
                }
              ]}
              keyExtractor={(item, index) => item.id || index.toString()}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionTitle}>{title}</Text>
              )}
            />
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo Financeiro</Text>
        <Text style={styles.summaryText}>Total de Gastos: R$ {totalExpenses}</Text>
        <Text style={styles.summaryText}>Total de Lucros: R$ {totalProfits}</Text>
        <Text style={styles.summaryText}>Balanço: R$ {balance}</Text>
        <LineChart
          data={{
            labels: ['Gastos', 'Lucros'],
            datasets: [
              {
                data: [parseFloat(totalExpenses), parseFloat(totalProfits)],
              },
            ],
          }}
          width={300} // from react-native
          height={220}
          yAxisLabel="R$"
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
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
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 40,  // Aumentar marginBottom para melhor visualização
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
  summaryText: {
    fontSize: 18,
    marginBottom: 5,
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
});

export default ControleGeralScreen;
