import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {SearchStackParamList} from './type';

type SearchScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'GlobalSearch'
>;
type SearchScreenRouteProp = RouteProp<SearchStackParamList, 'GlobalSearch'>;

type Props = {
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
};

const Search = ({navigation, route}: Props) => {
  const [searchCode, setSearchCode] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput
        blurOnSubmit
        autoCapitalize="none"
        placeholder={'Rechercher "1-001R"'}
        autoCorrect={false}
        style={[styles.searchInput2]}
        value={searchCode}
        onChangeText={setSearchCode}
      />
      <Text>{route.name}</Text>
      <Button
        title="Submit"
        onPress={() =>
          navigation.navigate('SearchResult', {
            previousScreen: route.name,
            filter: {
              code: searchCode,
            },
          })
        }
      />
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
    // borderWidth: 1,
    // borderColor: 'gray',
  },
  searchInput2: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 20,
    margin: 10,
    borderRadius: 20,
  },
});

export default Search;
