import React, {useState} from 'react';
import {BottomSheet, Button, ListItem} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

type BottomSheetComponentProps = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  fromProfileDetailScreen?: boolean;
  handleDelete?: () => void;
  handleEdit?: () => void;
  post?: any;
};

const BottomSheetComponent: React.FunctionComponent<
  BottomSheetComponentProps
> = ({
  setIsVisible,
  isVisible,
  fromProfileDetailScreen,
  handleDelete,
  post,
}) => {
  const navigation = useNavigation();
  const list = [
    {title: 'Add to favorites'},
    {title: 'About this account'},
    {
      title: 'Report',

      titleStyle: {color: 'red'},
    },
  ];
  const ProfileList = [
    {title: 'Archive'},
    {
      title: 'Edit',
      onPress: () => {
        setIsVisible(false);
        navigation.navigate('AddPost', {post, isEditing: true});
      },
    },
    {title: 'Pin to your profile'},
    {
      title: 'Delete',

      titleStyle: {color: 'red'},
      onPress: handleDelete,
    },
  ];
  return (
    <>
      {fromProfileDetailScreen || post.Username === 'Niharika' ? (
        <SafeAreaProvider>
          <BottomSheet
            modalProps={{}}
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
            containerStyle={{
              backgroundColor: 'white',
              marginTop: 500,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
            }}>
            {ProfileList.map((l, i) => (
              <View
                style={{
                  backgroundColor: 'transparent',
                  borderTopLeftRadius: 100,
                  borderTopRightRadius: 100,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                }}>
                <ListItem key={i} onPress={l.onPress}>
                  <ListItem.Content>
                    <ListItem.Title style={l.titleStyle}>
                      {l.title}
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </View>
            ))}
          </BottomSheet>
        </SafeAreaProvider>
      ) : (
        <SafeAreaProvider>
          <BottomSheet
            modalProps={{}}
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
            containerStyle={{backgroundColor: 'transparent'}}>
            {list.map((l, i) => (
              <ListItem key={i} onPress={l.onPress}>
                <ListItem.Content>
                  <ListItem.Title style={l.titleStyle}>
                    {l.title}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </BottomSheet>
        </SafeAreaProvider>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default BottomSheetComponent;
