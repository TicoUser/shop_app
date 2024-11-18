import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'; import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { ItemsContext, ItemsProvider } from './screens/ItemsContext';
import ReposicaoScreen from './screens/ReposicaoScreen'; 
import EstoqueScreen from './screens/EstoqueScreen'; 
import FluxoCaixaScreen from './screens/FluxoCaixaScreen'; 
import ControleGeralScreen from './screens/ControleGeralScreen';
import ProductList from './screens/ItemsContext';

const Tab = createBottomTabNavigator(); 
function MyTabs() { 
  return ( 
    <Tab.Navigator> 
      <Tab.Screen name="Reposição" component={ReposicaoScreen} /> 
      <Tab.Screen name="Estoque" component={EstoqueScreen} /> 
      <Tab.Screen name="Fluxo de Caixa" component={FluxoCaixaScreen} /> 
      <Tab.Screen name="Controle Geral" component={ControleGeralScreen} /> 
      <Tab.Screen name="Listagem De Produtos" component={ItemsContext} /> 
    </Tab.Navigator> 
  )
};
export default function App() { 
  return ( 
    <NavigationContainer> 
      <MyTabs /> 
    </NavigationContainer> 
  )
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
