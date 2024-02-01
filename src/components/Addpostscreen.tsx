import React, {useState} from 'react';
import {Text, View} from '@gluestack-ui/themed';
import {
  Button,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const Addpostscreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleBodyChange = (text: string) => {
    setBody(text);
  };
  const handleImageChange = async () => {
    try {
      const res: any = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      console.log(res);
      if (res?.[0]?.uri) {
        setImage(res[0].uri);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled image picker');
      } else {
        console.log('Error picking image:', err);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const newPost = {
        Title: title,
        Images: [{Url: image, Width: 600, Height: 400}],
        Username: 'Niharika',
        Date: new Date().toLocaleDateString(),
        Caption: body,
        createdAt: Date.now(),
        id: generateUniqueId(),
      };
      function generateUniqueId() {
        return (
          Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
        );
      }

      const existingPostsStr = await AsyncStorage.getItem('posts');

      const existingPosts = existingPostsStr
        ? JSON.parse(existingPostsStr)
        : [];

      const updatedPosts = [newPost, ...existingPosts];

      console.log({existing: existingPosts});

      await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));

      navigation.goBack();

      setTitle('');
      setBody('');
      setImage('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Post</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={handleTitleChange}
          style={styles.input}
          placeholderTextColor="gray"
        />

        <TextInput
          placeholder="Body"
          value={body}
          onChangeText={handleBodyChange}
          multiline
          style={styles.bodyInput}
          placeholderTextColor="gray"
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={handleImageChange}>
            <Text style={styles.imageUploadText}>Choose Image</Text>
          </TouchableOpacity>
        </View>
        {image && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{uri: image}} style={styles.imagePreview} />
          </View>
        )}

        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={{color: '#fff'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    // borderRadius: 10,
    marginBottom: 15,
    color: 'black',
  },
  bodyInput: {
    borderWidth: 1,
    // padding: 10,
    borderColor: 'gray',
    // borderRadius: 10,
    marginBottom: 15,
    height: 120,
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  imageUploadButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  imageUploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    color: '#ffffff',
  },
});

export default Addpostscreen;
