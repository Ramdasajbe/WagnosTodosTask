import React from 'react';

import TodosList from '../Task/TodosList';
import TodoDetails from '../Task/TodoDetails';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.dark : Colors.white, // Dark mode vs Light mode header background
          },
          headerTintColor: isDarkMode ? Colors.white : Colors.dark, // Back icon and title color
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22,
          },
          headerBackTitleVisible: false, // Optionally hide the back button title
        }}>
        <Stack.Screen
          name="TodoList"
          component={TodosList}
          options={{title: 'TodoList'}}
        />
        <Stack.Screen name="TodoDetails" component={TodoDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
