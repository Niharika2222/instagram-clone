import React, {useEffect, useState} from 'react';
import {Image, Box, HStack} from '@gluestack-ui/themed';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import {SliderBox} from 'react-native-image-slider-box';
import {SvgXml} from 'react-native-svg';
import {
  commentIcon,
  heartIcon,
  messageIcon,
  saveIcon,
  sendIcon,
} from '../../utils/svgConstant';
import profile from '../../utils/feed.json';
import myPosts from '../../utils/profile.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import feeds from '../../utils/feed.json';

const Profiledetail = ({route}: any) => {
  //   const [niharikaProfiles, setNiharikaProfiles] = useState([]);
  //   const retrieveProfileFromStorage = async () => {
  //     try {
  //       const storedProfile = await AsyncStorage.getItem('posts');
  //       //   console.log('profiless', storedProfile);
  //       if (storedProfile) {
  //         const parsedProfile = JSON.parse(storedProfile);
  //         const filteredProfile = parsedProfile.filter(
  //           profile => profile.Username === 'Niharika',
  //         );
  //         setNiharikaProfiles(filteredProfile);
  //       } else {
  //         // If no stored profile, you can set an empty array or handle it as needed
  //         setNiharikaProfiles([]);
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving profile from storage:', error);
  //     }
  //   };
  const [profile, setProfile] = useState<any[]>([]);
  const {index} = route.params;
  const retrieveProfileFromStorage = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('posts');
      let updatedPosts: any[] = [];

      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        updatedPosts = [
          ...parsedPosts,
          ...feeds.filter(post => post.Username === 'Niharika'),
        ];
        updatedPosts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      } else {
        updatedPosts = [...feeds.filter(post => post.Username === 'Niharika')];
        updatedPosts.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      }

      setProfile(updatedPosts);
    } catch (error) {
      console.error('Error retrieving posts from storage:', error);
    }
  };
  console.log({profile});
  useEffect(() => {
    retrieveProfileFromStorage();
  }, []);
  return (
    <FlatList
      data={profile}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        return (
          <Box>
            <Box py={5} position="relative">
              <View key={index}>
                <HStack alignItems="center" justifyContent="space-between">
                  <HStack alignItems="center">
                    <Image
                      source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScaAsiURlbNIvNkNi5UCRzXStgONEKRH6emg&usqp=CAU',
                      }}
                      width={30}
                      height={30}
                      left={10}
                      alt="UserImage"
                      rounded={'$full'}
                    />
                    <Text left={16} style={{color: 'black'}}>
                      {item.Username}
                    </Text>
                  </HStack>

                  <HStack bottom={10}>
                    <TouchableOpacity>
                      <Image
                        source={{
                          uri: 'https://static.vecteezy.com/system/resources/previews/021/190/333/original/more-vertical-three-dots-settings-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg',
                        }}
                        width={30}
                        height={30}
                        alt="Icon"
                        position="absolute"
                        right={6}
                      />
                    </TouchableOpacity>
                  </HStack>
                </HStack>

                <Image
                  alt="post_image"
                  width="100%"
                  height={400}
                  mt="$2"
                  source={{uri: item.Images[0].Url}}
                />
              </View>

              <HStack
                px={7}
                paddingTop={5}
                marginTop={10}
                gap={14}
                justifyContent="space-between">
                <HStack gap={14} justifyContent="center">
                  <SvgXml xml={heartIcon} width={24} height={24} />
                  <SvgXml xml={commentIcon} width={24} height={24} />
                  <SvgXml xml={sendIcon} width={24} height={24} />
                </HStack>
                <HStack>
                  <SvgXml xml={saveIcon} width={24} height={24} />
                </HStack>
              </HStack>
              <Box px={7} marginBottom={3} marginTop={4}>
                <Text>
                  <Text style={styles.Username}>{item.Username}</Text>
                  <Text style={styles.Content}> {item.Caption}</Text>
                </Text>
              </Box>
              <HStack marginBottom={20}>
                <Text style={styles.Date}>{item.Date}</Text>
              </HStack>
            </Box>
          </Box>
        );
      }}
      onEndReachedThreshold={0.1}
      initialScrollIndex={index}
      getItemLayout={(data, index) => ({
        length: 545,
        offset: 545 * index,
        index,
      })}
      style={{backgroundColor: '#ffffff'}}
    />
  );
};

export default Profiledetail;
const styles = StyleSheet.create({
  Username: {
    fontWeight: 'bold',
    color: 'black',
  },
  Content: {
    marginLeft: 8,
    fontSize: 14,
    paddingRight: 12,
    maxWidth: 320,
    flexWrap: 'wrap',
    color: 'black',
  },
  Date: {
    marginLeft: 7,
    marginTop: 1,
    fontSize: 12,
    color: 'gray',
  },
  container: {
    backgroundColor: 'white',
  },
  name: {
    marginTop: 7,
    textAlign: 'center',
  },
});
