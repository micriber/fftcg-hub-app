import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, SafeAreaView, ActivityIndicator, Text} from 'react-native';
import {useAsync} from 'react-async';
import {GoogleSignin} from '@react-native-community/google-signin';
import {signOut} from '../services/google';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Login: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Home = ({navigation}: Props) => {
  const logoutAndRedirect = async () => {
    await signOut();
    navigation.navigate('Login');
  };
  const {data, error, isLoading} = useAsync({
    promiseFn: GoogleSignin.getCurrentUser,
  });
  if (isLoading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }
  if (error) {
    return `Something went wrong: ${error.message}`;
  }

  return (
    <SafeAreaView>
      <Text>Welcome {data?.user.name}</Text>
      <Button
        title="Go to about page"
        onPress={() => navigation.navigate('About')}
      />
      <Button title="Logout" onPress={logoutAndRedirect} />
    </SafeAreaView>
  );
};

export default Home;
