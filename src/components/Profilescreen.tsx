import {
  Box,
  ChevronDownIcon,
  HStack,
  Icon,
  Image,
  MenuIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import myPosts from '../../utils/profile.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import feeds from '../../utils/feed.json';

const MyProfile = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState<any[]>([]);
  const renderHeaderContent = () => {
    return (
      <View style={styles.container}>
        <HStack alignItems="center" justifyContent="space-between">
          <HStack alignItems="center">
            <Text size="xl" bold={true} color="#000">
              hasijaniharika
            </Text>

            <ChevronDownIcon mt="$8" position="absolute" ml={128} />
          </HStack>
          <HStack space="xl">
            <Box>
              <Image
                alt="add"
                width={27}
                height={27}
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlHSrDaI7JNLOOtJMkk5jiO1EuGNRIHAWPNjG7GeF7efAQChEt56ef1LE2-7o3PqPkY60&usqp=CAU',
                }}
                mt={3}
              />
            </Box>
            <Icon as={MenuIcon} w="$8" h="$8" />
          </HStack>
        </HStack>
        <View style={styles.profileHeader}>
          <Image
            alt="profile"
            source={{
              uri: 'https://img.lovepik.com/free-png/20210923/lovepik-cute-girl-avatar-png-image_401231841_wh1200.png',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profile}>
            <View style={styles.stat}>
              <Text bold={true} color="#000">
                10
              </Text>
              <Text color="#000">Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text bold={true} color="#000">
                200
              </Text>
              <Text color="#000">Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text bold={true} color="#000">
                100
              </Text>
              <Text color="#000">Following</Text>
            </View>
          </View>
        </View>
        <VStack mt={8}>
          <Text bold={true} color="#000">
            Niharika
          </Text>
          <Text color="#000" fontSize={'$sm'}>
            This is my bio!
          </Text>
        </VStack>
        <View style={styles.profileActions}>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text color="#000" bold={true} fontSize={'$sm'}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareProfileBtn}>
            <Text color="#000" bold={true} fontSize={'$sm'}>
              Share Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.icons}>
          <Icon as={MenuIcon} w="$8" h="$8" />
          <Icon as={MenuIcon} w="$8" h="$8" />
        </View>
      </View>
    );
  };

  const renderPostItem = ({item, index}: any) => {
    const handlePostPress = (item: any, index: any) => {
      navigation.navigate('Posts', {post: item, index, posts: profile});
    };
    return (
      <TouchableOpacity onPress={() => handlePostPress(item, index)}>
        <Image
          alt="posted pic"
          source={{uri: item.Images[0].Url}} // Adjust the key based on your data structure
          style={styles.postImage}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const niharikaPosts = feeds.filter(post => post.Username === 'Niharika');
    setProfile(niharikaPosts);
  }, []);

  const retrievePostsFromStorage = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('posts');
      let updatedPosts: any[] = [];

      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        updatedPosts = [
          ...parsedPosts.filter((post: any) => post.Username === 'Niharika'),
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

  useEffect(() => {
    retrievePostsFromStorage();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      retrievePostsFromStorage();
      return () => {};
    }, []),
  );

  return (
    <FlatList
      data={profile}
      renderItem={renderPostItem}
      ListHeaderComponent={renderHeaderContent}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
    />
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 75,
    marginRight: 50,
  },
  profile: {
    flexDirection: 'row',
  },
  stat: {
    marginRight: 18,
    alignItems: 'center',
  },
  profileActions: {
    marginTop: 14,
    flexDirection: 'row',
  },
  editProfileBtn: {
    paddingVertical: 5,
    paddingHorizontal: 45,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#eeeeee',
  },
  shareProfileBtn: {
    paddingVertical: 6,
    paddingHorizontal: 40,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: '#eeeeee',
  },
  icons: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: -16,
  },
  postRow: {
    flexDirection: 'row',
  },
  postImage: {
    width: 128,
    height: 135,
  },
});
