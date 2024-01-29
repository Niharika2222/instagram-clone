/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
// import Login from './src/components/login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import Homescreen from './src/components/home';
import Loginscreen from './src/components/Loginscreen';
import Homescreen from './src/components/Homescreen';
import Tabs from './tabsNavigation/Tabs';

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
            <Stack.Screen name="Home" component={Tabs} />
            {/* <Stack.Screen name="Tabs" component={Tabs} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </>
  );
}

export default App;
