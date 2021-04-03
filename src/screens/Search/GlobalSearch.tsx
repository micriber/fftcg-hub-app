import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {SearchStackParamList} from './type';
import {TextInput, Button} from 'react-native-paper';

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
  const [search, setSearch] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput
        blurOnSubmit
        autoCapitalize="none"
        placeholder={'Rechercher "1-001R", "Séphiroth"'}
        autoCorrect={false}
        style={[styles.searchInput]}
        value={search}
        onChangeText={setSearch}
        mode="outlined"
        label={route.name}
      />
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('SearchResult', {
            previousScreen: route.name,
            filter: {
              search,
            },
          })
        }>
        Submit
      </Button>
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
    margin: 10,
  },
});

export default Search;
