import React from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getCardImageUrl} from '../utils/image';
import {Card} from '../services/api/card';

type Props = {
  card: Card;
  isListView: boolean;
};

const w = Dimensions.get('window');

const FFCardSimple = ({card, isListView}: Props) => {
  return (
    <View
      key={card.code}
      style={[
        isListView ? styles.cardListContainer : styles.cardGridContainer,
      ]}>
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={() => Alert.alert(`Short press on ${card.name}`)}
        onLongPress={() => Alert.alert(`Long press on ${card.name}`)}>
        <FastImage
          // style={styles.image}
          style={{width: w.width / 2.5, height: w.height / 3}}
          source={{
            uri: getCardImageUrl(card.code),
          }}
          resizeMode={isListView ? 'stretch' : 'contain'}
        />
      </TouchableOpacity>
      {isListView && (
        <View
          style={[
            styles.cardDescription,
            // {height:},
          ]}>
          <Text>Code: {card.code}</Text>
          <Text>Nom: {card.name}</Text>
          <Text>Type: {card.type}</Text>
          <Text>Element: {card.element}</Text>
          <Text />
          <Text>Description: {card.text}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardGridContainer: {
    marginTop: 3,
    marginLeft: 15,
  },
  cardListContainer: {
    // width: '100%',
    flexDirection: 'row',
    height: w.height / 3,
  },
  cardDescription: {
    borderColor: '#000',
    borderWidth: 1,
    height: w.height / 3,
    width: (w.width / 2.5) * 1.5,
    // width: w.width / 4,
    // height: w.height / 4,
  },
});

export default FFCardSimple;
