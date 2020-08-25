import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const Loading = () => (
  <View style={styles.loading} testID="Loader">
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
