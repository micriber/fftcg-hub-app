import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Home = ({navigation}: Props) => {
  return (
    <Button
      title="Go to about page"
      onPress={() => navigation.navigate('About')}
    />
  );
};

export default Home;
