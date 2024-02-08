import React, {useState} from 'react';
import {
  Button,
  ButtonText,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {Image} from '@gluestack-ui/themed';
import {Alert} from 'react-native';

export const Loginscreen = ({navigation}: any) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const handleLogin = () => {
    if (inputValue.trim() === '') {
      setError('Please fill in the username.');
      return;
    }
    if (inputValue.length < 4) {
      setError('Username must be at least 4 characters long.');
      return;
    }

    if (inputValue.includes(' ')) {
      setError('Username cannot contain spaces.');
      return;
    }
    navigation.navigate('Home');
    setInputValue('');
    setError(null);
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
            const text = e.nativeEvent.text;
            if (!text.includes(' ')) {
              setInputValue(text);
              setError(null); // Reset error when user types in input
            } else {
              setError('Username cannot contain spaces.');
            }
          }}
        />
      </Input>
      {error && (
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          {error}
        </Text>
      )}
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
