import React from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from './type';

type SearchScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'CollectionSearch'
>;

type Props = {
  navigation: SearchScreenNavigationProp;
};

const Search = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        blurOnSubmit
        autoCapitalize="none"
        placeholder={'Rechercher "1-001R"'}
        autoCorrect={false}
        style={[styles.searchInput]}
      />
      <Button title="Submit" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  searchInput: {
    borderRadius: 25,
    borderColor: '#333',
    backgroundColor: '#fff',
    paddingLeft: 50,
  },
});

export default Search;
