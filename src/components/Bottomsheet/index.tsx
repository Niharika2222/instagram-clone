import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';

type BottomSheetComponentProps = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  fromProfileScreen?: boolean;
  handleDelete?: () => void;
  post?: any;
};

const BottomSheetComponent: React.FunctionComponent<
  BottomSheetComponentProps
> = ({setIsVisible, isVisible, fromProfileScreen, handleDelete, post}) => {
  const navigation = useNavigation();
  const HomeList = [
    {title: 'Add to favorites'},
    {title: 'Not interested'},
    {
      title: 'Report',
      titleStyle: {color: 'red'},
      onPress: () => setIsVisible(false),
    },
  ];

  const profileList = [
    {title: 'Archive'},
    {title: 'Pin to your profile'},
    {
      title: 'Edit',
      onPress: () => {
        setIsVisible(false);
        navigation.navigate('AddPost', {post, isEditing: true});
      },
    },
    {
      title: 'Delete',
      titleStyle: {color: 'red'},
      onPress: handleDelete,
    },
  ];
  const handleBackdropPress = () => {
    setIsVisible(false);
  };

  const renderList =
    fromProfileScreen || post?.Username === 'Niharika' ? profileList : HomeList;

  return (
    <>
      {isVisible && (
        // <Modal
        //   transparent
        //   animationType="slide"
        //   visible={isVisible}
        //   onRequestClose={() => setIsVisible(false)}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={[styles.backdrop, StyleSheet.absoluteFillObject]}>
            <View style={styles.bottomSheetContainer}>
              {renderList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={item.onPress}
                  style={styles.listItem}>
                  <Text style={[styles.title, item.titleStyle]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
        // </Modal>
      )}
    </>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 10,
  },
  listItem: {
    paddingVertical: 15,
  },
  title: {
    fontSize: 17,
    color: '#000',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
