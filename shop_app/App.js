import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'; import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { ItemsContext } from './scr/context/ItemsContext';
import { ItemsProvider } from './src/context/ItemsContext';
import ReposicaoScreen from './scr/screens/ReposicaoScreen'; 
import EstoqueScreen from './scr/screens/EstoqueScreen'; 
import FluxoCaixaScreen from './scr/screens/FluxoCaixaScreen'; 
import ControleGeralScreen from './scr/screens/ControleGeralScreen';

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
