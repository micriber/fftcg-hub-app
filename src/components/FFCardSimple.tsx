import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getCardImageUrl} from '../utils/image';
import {Card} from '../services/api/card';
import replaceTextByIconOrStyle from '../utils/icon';

type Props = {
  card: Card;
  isListView: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};

const w = Dimensions.get('window');

const FFCardSimple = ({card, isListView, onPress, onLongPress}: Props) => {
  const [isFallbackImage, setIsFallbackImage] = React.useState(false);
  const [src, setSrc] = React.useState(
    getCardImageUrl(card.code, 'full', 'fr'),
  );
  const enSrc = getCardImageUrl(card.code, 'full', 'eg');
  return (
    <View
      testID="SimpleFFCard"
      key={card.code}
      style={[
        isListView ? styles.cardListContainer : styles.cardGridContainer,
      ]}>
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={onPress}
        onLongPress={onLongPress}>
        <FastImage
          // style={styles.image}
          style={{width: w.width / 2.5, height: w.height / 3}}
          source={{uri: src}}
          resizeMode={isListView ? 'stretch' : 'contain'}
          onError={() => {
            if (!isFallbackImage) {
              setSrc(enSrc);
              setIsFallbackImage(true);
            }
          }}
          testID={`Image-${card.code}`}
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
          <Text>Element: {replaceTextByIconOrStyle(card.element)}</Text>
          <Text />
          <Text>Description: {replaceTextByIconOrStyle(card.text)}</Text>
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
