import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {SearchStackParamList} from './type';

type SearchResultScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'SearchResult'
>;

type SearchResultScreenRouteProp = RouteProp<
  SearchStackParamList,
  'SearchResult'
>;

type Props = {
  navigation: SearchResultScreenNavigationProp;
  route: SearchResultScreenRouteProp;
};

const Search = ({route}: Props) => {
  return (
    <View style={styles.container}>
      <Text>boulou</Text>
      <Text>Route params:</Text>
      <Text>{JSON.stringify(route.params, null, 2)}</Text>
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
