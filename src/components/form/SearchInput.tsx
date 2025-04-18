import React from 'react';
import {TextInput, withTheme} from 'react-native-paper';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import {StyleSheet} from 'react-native';
import {ColorTranslator} from 'colortranslator';

type Props = {} & TextInputProps;

const SearchInput = (props: Props) => {
  const styles = StyleSheet.create({
    searchInput: {
      marginVertical: 10,
      backgroundColor: new ColorTranslator(props.theme.colors.active).setA(0.2)
        .RGBA,
      fontSize: 17,
    },
  });
  const customTheme = {
    ...props.theme,
    colors: {
      ...props.theme.colors,
      text: props.theme.colors.active,
    },
  };
  return (
    <TextInput
      blurOnSubmit
      autoCapitalize="none"
      placeholder={props.placeholder}
      autoCorrect={props.autoCorrect || false}
      style={[styles.searchInput, props.style]}
      value={props.value}
      onChangeText={props.onChangeText}
      mode={props.mode || 'flat'}
      label={props.label}
      theme={customTheme}
      dense={true}
      onSubmitEditing={props.onSubmitEditing}
      keyboardType={'default'}
      returnKeyType={'search'}
    />
  );
};

export default withTheme(SearchInput);
