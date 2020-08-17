import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, SafeAreaView, Text, StyleSheet} from 'react-native';
import {useAsync} from 'react-async';
import {AuthContext} from '../AuthContext';
import Loading from './Loading';

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

const Home = () => {
  const {signOut, getCurrentUser} = React.useContext(AuthContext);

  const {data, isLoading} = useAsync({
    promiseFn: getCurrentUser,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    signOut();
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <Text>Welcome {data?.user.name}</Text>
      <Button title="Logout" onPress={signOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
