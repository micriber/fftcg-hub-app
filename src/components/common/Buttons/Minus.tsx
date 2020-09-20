import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AntIcon from 'react-native-vector-icons/AntDesign';

type Props = {
  onPress?: () => void;
};

const MinusButton = ({onPress}: Props) => {
  // <Icon name="minus" size={30} color={'rgb(130, 130, 130)'} />
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        testID="MinusButton">
        <Icon name="minus" size={30} color={'rgb(130, 130, 130)'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowColor: 'black',
    backgroundColor: 'white',
    borderColor: 'rgb(130, 130, 130)',
    borderWidth: 3,
  },
  container: {
    width: '100%',
    height: 75,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default MinusButton;
