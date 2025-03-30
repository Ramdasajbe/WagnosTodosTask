import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme, StatusBar, Text, View, Platform} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNetInfo} from '@react-native-community/netinfo'; // For network status
import TodosList from '../Task/TodosList';
import TodoDetails from '../Task/TodoDetails';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  const {isConnected} = useNetInfo(); // Get network status

  const [networkStatus, setNetworkStatus] = useState(isConnected);

  // Update the network status when connection changes
  useEffect(() => {
    setNetworkStatus(isConnected);
  }, [isConnected]);

  return (
    <NavigationContainer>
      {/* Adjust StatusBar based on dark mode and network availability */}
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={
          networkStatus ? (isDarkMode ? Colors.dark : Colors.white) : 'red'
        } // Red if no network
      />

      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.dark : Colors.white, // Header background color based on dark mode
          },
          headerTintColor: isDarkMode ? Colors.white : Colors.dark, // Text and back icon color
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
