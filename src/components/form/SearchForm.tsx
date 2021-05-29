import React from 'react';
import SearchInput from '../common/form-fields/SearchInput';
import {Button, useTheme, Text, Switch} from 'react-native-paper';
import {Keyboard, StyleSheet, View, ViewStyle} from 'react-native';

export type SubmitParams = {
  search: string;
  owned: boolean;
};

type Props = {
  onSubmit: (fields: SubmitParams) => void;
  style?: ViewStyle;
};

const SearchForm = (props: Props) => {
  const [search, setSearch] = React.useState('');
  const [owned, setOwned] = React.useState(false);
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
    filterRowContainer: {
      flexDirection: 'row',
      height: 24,
      marginBottom: 10,
    },
    collectionContainer: {
      flexDirection: 'row',
      width: '60%',
      alignItems: 'flex-end',
    },
    filterButtonContainer: {
      width: '40%',
      alignItems: 'flex-end',
    },
  });
  return (
    <View style={[styles.container, props.style]}>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        label={'Nom de carte ou code'}
      />
      <View style={styles.filterRowContainer}>
        <View style={styles.collectionContainer}>
          <Text style={{marginBottom: 3, color: colors.accent, fontSize: 15, marginRight: 5}}>Collection uniquement</Text>
          <Switch
            value={owned}
            onValueChange={(withValue: boolean) => {
              Keyboard.dismiss();
              setOwned(withValue);
            }}
            color={colors.active}
          />
        </View>
        <View style={styles.filterButtonContainer}>
          <Button style={{marginTop: -7}} labelStyle={{fontSize: 15, fontWeight: 'bold'}} mode="text">FILTRES V</Button>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={() => props.onSubmit({search, owned})}
        style={styles.button}
        labelStyle={styles.buttonLabel}>
        Rechercher
      </Button>
    </View>
  );
};

export default SearchForm;
