import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

const baseStyles = {
  card: {
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
  theme: 'light' | 'dark';
  children: React.ReactNode;
  style: ViewStyle;
};

const Card = ({
  children,
  theme = 'light',
  style = StyleSheet.create({}),
}: Props) => {
  const currentStyles = styles[theme];
  return <View style={[currentStyles, style]}>{children}</View>;
};

export default Card;
