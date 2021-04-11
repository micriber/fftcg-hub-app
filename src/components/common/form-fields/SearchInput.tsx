import React from 'react';
import {TextInput} from 'react-native-paper';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import {StyleSheet} from 'react-native';

// Here, we exclude theme
// The TextInputProps required it, but it come with a `withTheme`
// inside de `TextInput` component, we don't have access to it from here
// We could, but not interesting atm.
type Props = {} & Omit<TextInputProps, 'theme'>;

const SearchInput = (props: Props) => (
  <TextInput
    blurOnSubmit
    autoCapitalize="none"
    placeholder={props.placeholder}
    autoCorrect={props.autoCorrect || false}
    style={[styles.searchInput, props.style]}
    value={props.value}
    onChangeText={props.onChangeText}
    mode={props.mode || 'outlined'}
    label={props.label}
  />
);

const styles = StyleSheet.create({
  searchInput: {
    margin: 10,
  },
});

export default SearchInput;
