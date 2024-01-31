import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Homescreen from '../src/components/Homescreen';
import {View} from 'react-native';
import Searchscreen from '../src/components/Searchscreen';
import Addpostscreen from '../src/components/Addpostscreen';

import {Box, FavouriteIcon, Icon} from '@gluestack-ui/themed';
import {Image} from '@gluestack-ui/themed';
import Profilescreen from '../src/components/Profilescreen';
const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Box alignItems="center" justifyContent="center" top={5}>
              <Image
                alt="homeIcon"
                source={{
                  uri: focused
                    ? 'https://icons.veryicon.com/png/o/education-technology/cloud-platform-1/home-icon-1.png'
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr64BImvEwKdOiCePaq8ikZUw5y4OSKSIYzQ&usqp=CAU',
                }}
                width={focused ? 30 : 26}
                height={focused ? 30 : 26}
              />
            </Box>
          ),
          headerShown: false,
          tabBarLabel: '',
        }}></Tab.Screen>
      <Tab.Screen
        name="Search"
        component={Searchscreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Box alignItems="center" justifyContent="center" top={5}>
              <Image
                alt="searchIcon"
                source={{
                  uri: focused
                    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEpWl0z2SDnGFLmTI3KP5ZmMr6OoKA-2q12ESIY1dp3dC4wK73UeUY-vo9a3vrBz2F2ec&usqp=CAU'
                    : 'https://i.pinimg.com/736x/37/1a/d1/371ad1a136225fc0c020fed06c3fb4ad.jpg',
                }}
                width={focused ? 25 : 34}
                height={focused ? 25 : 34}
              />
            </Box>
          ),
          headerShown: false,
          tabBarLabel: '',
        }}></Tab.Screen>
      <Tab.Screen
        name="AddPost"
        component={Addpostscreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Box alignItems="center" justifyContent="center" top={5}>
              <Image
                alt="homeIcon"
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlHSrDaI7JNLOOtJMkk5jiO1EuGNRIHAWPNjG7GeF7efAQChEt56ef1LE2-7o3PqPkY60&usqp=CAU',
                }}
                width={23}
                height={23}
              />
            </Box>
          ),
          headerShown: false,
          tabBarLabel: '',
        }}></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profilescreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Box alignItems="center" justifyContent="center" top={5}>
              <Image
                alt="homeIcon"
                source={{
                  uri: 'https://img.lovepik.com/free-png/20210923/lovepik-cute-girl-avatar-png-image_401231841_wh1200.png',
                }}
                width={30}
                borderRadius={50}
                height={30}
                style={{
                  borderWidth: focused ? 2 : 0,
                  borderColor: focused ? 'black' : 'transparent',
                }}
              />
            </Box>
          ),
          headerShown: false,
          tabBarLabel: '',
        }}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default Tabs;
