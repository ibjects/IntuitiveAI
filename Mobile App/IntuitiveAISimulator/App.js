import React from 'react';
import Game from './src/Screens/Game';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import About from './src/Screens/About';
import HowToPlay from './src/Screens/HowToPlay';

const Stack = createStackNavigator();

function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
        <Stack.Screen name="About Research, Data & Policy" component={About} />
        <Stack.Screen name="How To Play" component={HowToPlay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;