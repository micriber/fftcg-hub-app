import React from 'react';
import {ImageStyle, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';

const baseStyles = {
  card: {
    // flex: 1,
    // width: '100%',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    borderColor: '#000',
  },
};

const styles = StyleSheet.create({
  dark: {
    ...baseStyles.card,
  },
  light: {
    ...baseStyles.card,
  },
});

type Props = {
  theme?: 'light' | 'dark';
  children: React.ReactNode;
  style?: ViewStyle | TextStyle | ImageStyle;
};

const Card = ({style, children, theme = 'light'}: Props) => {
  const currentStyles = styles[theme];
  return <View style={[currentStyles, style]}>{children}</View>;
};

export default Card;
