import React from 'react';
import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {getCardImageUrl} from '../utils/image';
import {Card} from '../services/api/card';
import replaceTextByIconOrStyle from '../utils/icon';

type Props = {
  displayOwnPin?: boolean;
  card: Card;
  isListView: boolean;
  onPress?: (card: Card) => void;
  onLongPress?: () => void;
  imageStyle?: ImageStyle;
  containerStyle?: ViewStyle;
};

const w = Dimensions.get('window');

const FFCardSimple = ({
  card,
  isListView,
  onPress,
  onLongPress,
  displayOwnPin = false,
  imageStyle,
  containerStyle,
}: Props) => {
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
        containerStyle,
      ]}>
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={onPress ? () => onPress(card) : undefined}
        onLongPress={onLongPress}>
        <FastImage
          style={[
            {
              width: w.width / 2.5,
              height: w.height / 3,
            },
            // TODO: Find the correct type for this style
            imageStyle as any,
          ]}
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
        {displayOwnPin && card.userCard.length > 0 && (
          <AntIcon name="check" style={styles.ownPin} size={20} />
        )}
      </TouchableOpacity>
      {isListView && (
        <View style={[styles.cardDescription]}>
          <Text>Code: {card.code}</Text>
          <Text>Nom: {card.name}</Text>
          <Text>Type: {card.type}</Text>
          <Text>Element: {replaceTextByIconOrStyle(card.element)}</Text>
          <Text />
          <Text>{replaceTextByIconOrStyle(card.text)}</Text>
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
    flexDirection: 'row',
    height: w.height / 3,
  },
  cardDescription: {
    borderColor: '#000',
    borderWidth: 1,
    height: w.height / 3,
    width: (w.width / 2.5) * 1.5,
  },
  ownPin: {
    color: '#238F23',
    elevation: 1,
  },
});

export default FFCardSimple;
