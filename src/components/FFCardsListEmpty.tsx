import React from 'react';
import {StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  emptyMessage: {
    textAlign: 'center',
    marginTop: '50%',
    width: '100%',
  },
});

const FFCardsListEmpty = () => (
  <Text style={styles.emptyMessage}>No result</Text>
);

export default FFCardsListEmpty;
