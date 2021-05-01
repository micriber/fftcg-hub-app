import React from 'react';
import SearchInput from '../common/form-fields/SearchInput';
import {Button, useTheme} from 'react-native-paper';
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
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
      marginBottom: 10,
    },
    buttonLabel: {
      color: colors.lightGrey,
      fontWeight: 'bold',
    },
    button: {
      elevation: 2,
    },
  });
  return (
    <View style={[styles.container, props.style]}>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        label={'Nom de carte ou code'}
      />
      <Button
        mode="contained"
        onPress={() => props.onSubmit({search})}
        style={styles.button}
        labelStyle={styles.buttonLabel}>
        Rechercher
      </Button>
    </View>
  );
};

export default SearchForm;
