import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {
  Image,
  ScrollView,
  Box,
  HStack,
  Divider,
  Icon,
  SearchIcon,
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
let feed = [...feeds];
function Homescreen() {
  const [visiblePost, setVisiblePost] = useState(2);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const handleScroll = () => {
    if (!loadingMore && visiblePost < feed.length) {
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

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const newData = shuffleArray(feed);
    setVisiblePost(2);
    feed = newData;
    setRefreshing(false);
  }, []);

  const renderHeader = () => (
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
  );
  return (
    <>
      <>
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={renderHeader}
            data={feed.slice(0, visiblePost)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <Box>
                <Box py={5} position="relative">
                  <View key={index}>
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
                      <Image
                        source={{
                          uri: 'https://static.vecteezy.com/system/resources/previews/021/190/333/original/more-vertical-three-dots-settings-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg',
                        }}
                        width={30}
                        height={30}
                        alt="Icon"
                        position="absolute"
                        right={6}
                        bottom={2}
                      />
                    </HStack>
                    <SliderBox
                      images={item.Images.map(image => image.Url)}
                      top={6}
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
            )}
            onEndReached={handleScroll}
            onEndReachedThreshold={0.1}
            ListFooterComponent={loadingMore ? loader : null}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </>
      {/* <Box
        position="sticky"
        bottom={0}
        left={0}
        right={0}
        height={75}
        backgroundColor="#FFFFFF">
        <HStack justifyContent="space-between" m="$4">
          <Icon as={SearchIcon} w="$7" h="$7" />
          <Icon as={SearchIcon} w="$7" h="$7" />
          <Icon as={SearchIcon} w="$7" h="$7" />
          <Icon as={SearchIcon} w="$7" h="$7" />
          <Icon as={SearchIcon} w="$7" h="$7" />
        </HStack>
      </Box> */}
    </>
  );
}

export default Homescreen;

const styles = StyleSheet.create({
  Username: {
    fontWeight: 'bold',
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
