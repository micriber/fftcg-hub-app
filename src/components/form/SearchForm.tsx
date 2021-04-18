import React from 'react';
import SearchInput from '../common/form-fields/SearchInput';
import {Button} from 'react-native-paper';
import {StyleSheet, View, ViewStyle} from 'react-native';

export type SubmitParams = {
  search: string;
};

type Props = {
  onSubmit: (fields: SubmitParams) => void;
  style?: ViewStyle;
};

const SearchForm = (props: Props) => {
  const [search, setSearch] = React.useState('');
  return (
    <View style={[styles.container, props.style]}>
      <SearchInput
        placeholder={'Rechercher "1-001R", "Séphiroth"'}
        value={search}
        onChangeText={setSearch}
        label={'Nom de carte ou code'}
      />
      <Button mode="contained" onPress={() => props.onSubmit({search})}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default SearchForm;
