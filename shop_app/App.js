import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'; import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { RecipeProvider } from './scr/context/RecipeContext';
import DailyRecipesScreen from './scr/screens/DailyRecipesScreen'; 
import EstoqueScreen from './scr/screens/EstoqueScreen'; 
import FluxoCaixaScreen from './scr/screens/FluxoCaixaScreen'; 
import ControleGeralScreen from './scr/screens/ControleGeralScreen';

const Tab = createBottomTabNavigator(); 
function MyTabs() { 
  return ( 
    <RecipeProvider> 
      <Tab.Navigator> 
        <Tab.Screen name="Criação" component={DailyRecipesScreen} /> 
        <Tab.Screen name="Estoque" component={EstoqueScreen} /> 
        <Tab.Screen name="Fluxo de Caixa" component={FluxoCaixaScreen} /> 
        <Tab.Screen name="Controle Geral" component={ControleGeralScreen} /> 
      </Tab.Navigator>
    </RecipeProvider>
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
