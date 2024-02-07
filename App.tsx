/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import Tabs from './tabsNavigation/Tabs';
import {useColorScheme} from 'react-native';
import Profiledetail from './src/screens/Profiledetail';
import Loginscreen from './src/screens/Loginscreen';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
    <>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              options={{headerShown: false}}
              component={Loginscreen}
            />
            <Stack.Screen
              name="Home"
              component={Tabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Posts"
              component={Profiledetail}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </>
  );
}

export default App;
