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
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
// import Homescreen from './src/components/home';
import Loginscreen from './src/components/Loginscreen';
import Homescreen from './src/components/Homescreen';
import Tabs from './tabsNavigation/Tabs';
import Profiledetail from './src/components/Profiledetail';
import {useColorScheme} from 'react-native';

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
            <Stack.Screen name="Posts" component={Profiledetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </>
  );
}

export default App;
// import React, {useState} from 'react';
// import {BottomSheet, Button, ListItem} from '@rneui/themed';
// import {StyleSheet} from 'react-native';
// import {SafeAreaProvider} from 'react-native-safe-area-context';

// type BottomSheetComponentProps = {};

// const BottomSheetComponent: React.FunctionComponent<
//   BottomSheetComponentProps
// > = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const list = [
//     {title: 'List Item 1'},
//     {title: 'List Item 2'},
//     {
//       title: 'Cancel',
//       containerStyle: {backgroundColor: 'red'},
//       titleStyle: {color: 'white'},
//       onPress: () => setIsVisible(false),
//     },
//   ];

//   return (
//     <SafeAreaProvider>
//       <Button
//         title="Open Bottom Sheet"
//         onPress={() => setIsVisible(true)}
//         buttonStyle={styles.button}
//       />
//       <BottomSheet modalProps={{}} isVisible={isVisible}>
//         {list.map((l, i) => (
//           <ListItem
//             key={i}
//             containerStyle={l.containerStyle}
//             onPress={l.onPress}>
//             <ListItem.Content>
//               <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
//             </ListItem.Content>
//           </ListItem>
//         ))}
//       </BottomSheet>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     margin: 10,
//   },
// });

// export default BottomSheetComponent;
