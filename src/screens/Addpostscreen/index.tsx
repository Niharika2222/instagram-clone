import React, {useEffect, useState} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
const Addpostscreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState<string>('');
  const [bodyError, setBodyError] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');
  const [postId, setPostId] = useState('');
  // const {postToEdit, onEditSuccess} = route?.params || {};
  const navigation = useNavigation();
  const route = useRoute();

  const handleTitleChange = (text: string) => {
    setTitle(text);
    setTitleError('');
  };

  const handleBodyChange = (text: string) => {
    setBody(text);
    setBodyError('');
  };
  const handleImageChange = async () => {
    try {
      setImageError('');
      const res: any = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
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
  function generateUniqueId(existingId?: string) {
    return (
      existingId ||
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    );
  }

  const handleSubmit = async () => {
    try {
      if (!title.trim()) {
        setTitleError('Title cannot be empty');
      } else {
        setTitleError('');
      }
      if (!body.trim()) {
        setBodyError('Body cannot be empty');
      } else {
        setBodyError('');
      }
      if (!image) {
        setImageError('Please choose an image');
      } else {
        setImageError('');
      }
      if (!title.trim() || !body.trim() || !image) {
        return;
      }

      if (title && image && body) {
        const newPost = {
          Title: title,
          Images: [{Url: image, Width: 600, Height: 400}],
          Username: 'Niharika',
          Date: new Date().toLocaleDateString(),
          Caption: body,
          createdAt: Date.now(),
          id: postId || generateUniqueId(),
        };

        const existingPostsStr = await AsyncStorage.getItem('posts');
        const existingPosts = existingPostsStr
          ? JSON.parse(existingPostsStr)
          : [];

        if (postId) {
          const index = existingPosts.findIndex(
            (post: any) => post.id === postId,
          );
          if (index !== -1) {
            const updatedPosts = [
              ...existingPosts.slice(0, index),
              ...existingPosts.slice(index + 1),
            ];
            const editedPost = {
              ...newPost,
              createdAt: existingPosts[index].createdAt,
            };
            updatedPosts.splice(index, 0, editedPost);
            await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
          }
          navigation.navigate('Profile');
        } else {
          const updatedPosts = [newPost, ...existingPosts];
          await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
          navigation.goBack();
        }

        setPostId('');
        setTitle('');
        setBody('');
        setImage('');
      }
    } catch (error) {
      console.error('Error adding/editing post:', error);
    }
  };

  useEffect(() => {
    if (route.params && route.params.isEditing) {
      const {post}: any = route.params;
      setPostId(post?.id || '');
      setTitle(post?.Title || '');
      setBody(post?.Caption || '');
      setImage(post?.Images?.[0]?.Url || '');
    }
  }, [route.params]);

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
        {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}

        <TextInput
          placeholder="Body"
          value={body}
          onChangeText={handleBodyChange}
          multiline
          style={styles.bodyInput}
          placeholderTextColor="gray"
        />
        {bodyError ? <Text style={styles.errorText}>{bodyError}</Text> : null}

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={handleImageChange}>
            <Text style={styles.imageUploadText}>Choose Image</Text>
          </TouchableOpacity>
          {imageError ? (
            <Text style={styles.imageText}>{imageError}</Text>
          ) : null}
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
    marginBottom: 15,
    color: 'black',
  },
  bodyInput: {
    borderWidth: 1,
    borderColor: 'gray',
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
  errorText: {
    color: 'red',
    fontSize: 12,
    bottom: 16,
  },
  imageText: {
    color: 'red',
    fontSize: 12,
  },
});

export default Addpostscreen;
