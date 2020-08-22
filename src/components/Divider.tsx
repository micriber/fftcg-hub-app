import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  style: ViewStyle;
};

const Divider = ({style}: Props) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: '#000000',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 1,
    width: '100%',
  },
});

export default Divider;
