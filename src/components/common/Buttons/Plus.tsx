import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  onPress?: () => void;
};

const PlusButton = ({onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} testID="PlusButton">
      <View style={[styles.incrementStyle]}>
        <Icon name="plus" size={30} color={'white'} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  incrementStyle: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'black',
    backgroundColor: 'rgb(49, 186, 201)',
  },
});

export default PlusButton;
