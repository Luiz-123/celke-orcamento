import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Orcamento from './src/pages/Orcamento';

const Stack = createStackNavigator();

export default function App(){
    const screenOptionStyle = {
        headerStyle: {
            backgroundColor: '#050c3d'
        },
        headerTintColor: '#00a1fc',
        headerBackTitle: 'Voltar'
    }
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen 
               name="Orcamento" 
               component={Orcamento} 
               options={{
                   headerTitle: 'Pedido de orçamento'
               }}
            />
            </Stack.Navigator>
        </NavigationContainer>
    );

}