import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

type Props = {
  iconName: string;
  onPress: (event: GestureResponderEvent) => void;
};

const BottomRightButton = ({iconName, onPress}: Props) => {
  return (
    <View style={styles.bottomView}>
      <TouchableOpacity style={styles.searchButton} onPress={onPress}>
        <AntIcon name={iconName} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    width: '100%',
    height: 75,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
  },
  searchButton: {
    backgroundColor: '#00BCD4',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
});

export default BottomRightButton;
