import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  Image,
  ScrollView,
  Box,
  HStack,
  Divider,
  Icon,
  SearchIcon,
} from '@gluestack-ui/themed';
import feed from '../../utils/feed.json';
import storyData from '../../utils/storyData.json';
function Homescreen() {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Image
            size="xs"
            width={150}
            marginTop={5}
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
            top={18}
            left={121}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-MoCoHaAPT9kmJhBGb2pqu3E4gnbGP3w4Sw&usqp=CAU',
            }}
            alt="Arrow"
          />

          <Image
            source={require('../../public/images/heart.png')}
            width={24}
            height={24}
            position="absolute"
            top={9}
            right={60}
            alt="heartIcon"
          />
          <Image
            size="xs"
            width={35}
            height={55}
            position="absolute"
            top={-6}
            right={5}
            source={{
              uri: 'https://st2.depositphotos.com/38069286/42112/v/450/depositphotos_421121214-stock-illustration-direct-messages-button-icon-isolated.jpg',
            }}
            alt="MessageIcon"
          />
          <Box>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              mt="$3">
              <HStack space="sm">
                {storyData.map((user, index) => (
                  <Box key={index} ml="$2.5" alignItems="center">
                    <Image
                      alt="profilePicture"
                      width={70}
                      height={70}
                      borderRadius={50}
                      source={{uri: user.profilePicture}}
                    />

                    <Text style={styles.name}>{user.name}</Text>
                  </Box>
                ))}
              </HStack>
            </ScrollView>
            <Divider my="$2" />
          </Box>
          <Box>
            <Box py={5} position="relative">
              {feed.map((data, index) => (
                <>
                  <>
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
                        <Text left={16}>{data.Username}</Text>
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

                      <ScrollView horizontal top={6}>
                        {data.Images.map((image, i) => (
                          <Image
                            key={i}
                            source={{uri: image.Url}}
                            width={image.Width}
                            height={image.Height}
                            alt="Image"
                          />
                        ))}
                      </ScrollView>
                    </View>
                  </>
                  <HStack px={6} paddingTop={6} marginTop={10} gap={14}>
                    <Image
                      source={require('../../public/images/heart.png')}
                      width={20}
                      height={20}
                      alt="heartIcon"
                    />
                    <Image
                      source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq--fJ0Y1HzOEFf2mItD8eYx6QMqrk32A5V6DEmx5FCDkg9rXFDFm9C_Y74G8T3dtfe2A&usqp=CAU',
                      }}
                      width={20}
                      height={20}
                      alt="Icon"
                    />
                    <Image
                      source={{
                        uri: 'https://static.thenounproject.com/png/2796195-200.png',
                      }}
                      width={25}
                      height={25}
                      position="relative"
                      bottom={2}
                      alt="Icon"
                    />
                    <Image
                      source={{
                        uri: 'https://static.vecteezy.com/system/resources/thumbnails/012/528/048/small/simple-save-icon-isolated-on-white-background-bookmark-symbol-modern-simple-for-web-site-or-mobile-app-vector.jpg',
                      }}
                      width={28}
                      height={28}
                      position="absolute"
                      right={8}
                      bottom={2}
                      alt="Icon"
                    />
                  </HStack>
                  <Box px={'$1.5'} marginBottom={2} marginTop={2}>
                    <Text>
                      <Text style={styles.Username}>{data.Username}</Text>
                      <Text style={styles.Content}> {data.Caption}</Text>
                    </Text>
                  </Box>
                  <HStack marginBottom={20}>
                    <Text style={styles.Date}>{data.Date}</Text>
                  </HStack>
                </>
              ))}
            </Box>
          </Box>
        </View>
      </ScrollView>
      <Box
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
      </Box>
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
