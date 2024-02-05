import React, {useState, useCallback, useEffect, useMemo, useRef} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {
  Image,
  ScrollView,
  Box,
  HStack,
  Divider,
  Icon,
  SearchIcon,
  AddIcon,
} from '@gluestack-ui/themed';
import feeds from '../../utils/feed.json';
import storyData from '../../utils/storyData.json';
// @ts-ignore
import {SliderBox} from 'react-native-image-slider-box';
import {FlatList} from 'react-native';
import {RefreshControl} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  commentIcon,
  heartIcon,
  messageIcon,
  saveIcon,
  sendIcon,
} from '../../utils/svgConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Animated} from 'react-native';
import BottomSheetComponent from './Bottomsheet';
import Stories from './Stories';

function Homescreen() {
  const [visiblePost, setVisiblePost] = useState(2);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectUser, setSelectUser] = useState();
  const navigation = useNavigation();
  const handleScroll = () => {
    if (!loadingMore && visiblePost < blogs.length) {
      setLoadingMore(true);
      setTimeout(() => {
        setVisiblePost(prevCount => prevCount + 1);
        setLoadingMore(false);
      }, 1000);
    } else {
      console.log('End reached..');
    }
  };
  const loader = () => (
    <Box alignItems="center" padding={2} paddingBottom={14}>
      <ActivityIndicator size="large" color="#808080" />
    </Box>
  );

  const renderHeader = () => (
    <>
      <View style={styles.container}>
        <HStack justifyContent="space-between" marginTop={5}>
          <HStack>
            <Image
              size="xs"
              width={150}
              marginLeft={-12}
              source={{
                uri: 'https://i.pinimg.com/originals/84/d8/61/84d861bd7bb0b5a2b4199abec253256c.png',
              }}
              alt="Logo"
            />
            <Image
              size="xs"
              width={12}
              height={12}
              position="absolute"
              top={12}
              left={112}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-MoCoHaAPT9kmJhBGb2pqu3E4gnbGP3w4Sw&usqp=CAU',
              }}
              alt="Arrow"
            />
          </HStack>
          <HStack gap={18} top={2}>
            <SvgXml xml={heartIcon} width={24} height={24} />
            <Box marginRight={10}>
              <SvgXml xml={messageIcon} width={24} height={24} />
            </Box>
          </HStack>
        </HStack>
      </View>
      <Box bottom={10}>
        <ScrollView horizontal>
          <HStack gap={8} alignItems="center">
            <Box style={styles.storyContainer}>
              <Image
                source={{
                  uri: 'https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=',
                }}
                width={70}
                height={70}
                left={10}
                alt="UserImage"
                rounded={'$full'}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 16,
                  right: -15,
                  borderRadius: 50,
                  width: 26,
                  height: 26,
                  backgroundColor: '#0096FF',
                  borderWidth: 2,
                  borderColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AddIcon size="sm" color="white" />
              </View>
              <Text style={styles.story}>Your story</Text>
            </Box>

            <Stories />
          </HStack>
        </ScrollView>
      </Box>
    </>
  );

  const handleDelete = async (postId: number) => {
    try {
      const storedPosts = await AsyncStorage.getItem('posts');
      let updatedPosts: any[] = [];

      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        updatedPosts = parsedPosts.filter((post: any) => post.id !== postId);
        await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
        setBlogs(updatedPosts);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error deleting post from storage:', error);
    } finally {
      setIsVisible(false);
    }
  };

  const retrievePostsFromStorage = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('posts');
      let updatedBlogs: any[] = [];

      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        updatedBlogs = [...parsedPosts];
        updatedBlogs.sort((a, b) => {
          return (b.createdAt || 0) - (a.createdAt || 0);
        });
      } else {
        updatedBlogs = [...feeds];
        await AsyncStorage.setItem('posts', JSON.stringify(feeds));
        updatedBlogs.sort((a, b) => {
          return (b.createdAt || 0) - (a.createdAt || 0);
        });
      }
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error retrieving posts from storage:', error);
    }
  };
  useEffect(() => {
    retrievePostsFromStorage();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      retrievePostsFromStorage();
      // Cleanup function
      return () => {};
    }, []),
  );
  return (
    <>
      <>
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={renderHeader}
            data={blogs.slice(0, visiblePost)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <Box>
                  <Box pb={5} position="relative">
                    <View key={index}>
                      <HStack
                        alignItems="center"
                        justifyContent="space-between">
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
                          <TouchableOpacity
                            onPress={() => {
                              setIsVisible(true);
                              setSelectUser(item);
                            }}>
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

                      <SliderBox
                        images={
                          item.Images
                            ? item.Images.map((image: any) => image.Url)
                            : []
                        }
                        top={5}
                        sliderBoxHeight={400}
                        dotColor="#15ccf9"
                        inactiveDotColor="grey"
                        // eslint-disable-next-line react-native/no-inline-styles
                        dotStyle={{
                          top: 36,
                          height: 6,
                          width: 6,
                          marginHorizontal: -10,
                        }}
                      />
                    </View>

                    <HStack
                      px={9}
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
                    <Box px={10} marginBottom={3} marginTop={4}>
                      <Text>
                        <Text style={styles.Username}>{item.Username}</Text>
                        <Text style={styles.Content}> {item.Caption}</Text>
                      </Text>
                    </Box>
                    <HStack marginBottom={20} px={5}>
                      <Text style={styles.Date}>{item.Date}</Text>
                    </HStack>
                  </Box>
                </Box>
              );
            }}
            onEndReached={handleScroll}
            onEndReachedThreshold={0.1}
            ListFooterComponent={loadingMore ? loader : null}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={retrievePostsFromStorage}
              />
            }
          />
          <BottomSheetComponent
            setIsVisible={setIsVisible}
            isVisible={isVisible}
            post={selectUser}
            handleDelete={() => handleDelete(selectUser?.id)}
          />
        </View>
      </>
    </>
  );
}

export default Homescreen;

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
  story: {
    color: 'black',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 2,
    marginLeft: 17,
  },
  storyContainer: {
    marginTop: 14,
  },
});
