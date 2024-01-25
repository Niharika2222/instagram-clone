import React, {useState} from 'react';
import {
  Button,
  ButtonText,
  Input,
  InputField,
  VStack,
} from '@gluestack-ui/themed';
import {Image} from '@gluestack-ui/themed';
import {Alert} from 'react-native';

export const Loginscreen = ({navigation}: any) => {
  const [inputValue, setInputValue] = useState('');
  const handleLogin = () => {
    if (inputValue.trim() === '') {
      Alert.alert('Please fill in the username.');
      return;
    }
    navigation.navigate('Home');
    setInputValue('');
  };
  return (
    <VStack
      px={24}
      alignItems="center"
      paddingVertical={'$24'}
      flex={1}
      backgroundColor="$white">
      <Image
        size="lg"
        width={240}
        height={200}
        source={{
          uri: 'https://i.pinimg.com/originals/84/d8/61/84d861bd7bb0b5a2b4199abec253256c.png',
        }}
        alt="Logo"
        alignSelf="center"
      />
      <Input
        height={44}
        width={'100%'}
        borderRadius={5}
        backgroundColor="#fafafa"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}>
        <InputField
          placeholder="Username"
          fontSize={'$sm'}
          marginBottom={4}
          color="#606770"
          backgroundColor="#fafafa"
          value={inputValue}
          onChange={e => {
            setInputValue(e.nativeEvent.text);
          }}
        />
      </Input>
      <Button
        size="md"
        width={'100%'}
        variant="solid"
        action="primary"
        marginTop={16}
        borderRadius={8}
        isDisabled={inputValue === '' ? true : false}
        onPress={handleLogin}>
        <ButtonText>Log In</ButtonText>
      </Button>
    </VStack>
  );
};

export default Loginscreen;
