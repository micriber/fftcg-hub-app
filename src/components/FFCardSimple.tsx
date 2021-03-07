import React from 'react';
import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getCardImageUrl} from '../utils/image';
import {Card} from '../services/api/card';
import replaceTextByIconOrStyle from '../utils/icon';
import {Divider, Surface, Text} from 'react-native-paper';

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
// orientation must fixed
const SCREEN_WIDTH = w.width < w.height ? w.width : w.height;
const SCREEN_HEIGHT = w.width < w.height ? w.height : w.width;

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
  const imageSize = {
    width: SCREEN_WIDTH / 2.2,
    height: SCREEN_HEIGHT / 3.3,
  };
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      onPress={onPress ? () => onPress(card) : undefined}
      onLongPress={onLongPress}>
      <Surface
        style={[
          isListView ? styles.cardListContainer : styles.cardGridContainer,
          styles.surface,
          containerStyle,
          imageSize,
        ]}>
        <FastImage
          style={[
            imageSize,
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
          <Icon name="check" style={styles.ownPin} size={20} />
        )}
        {isListView && (
          <>
            <View style={[styles.cardDescription]}>
              <Text>Code: {card.code}</Text>
              <Text>Nom: {card.name}</Text>
              <Text>Type: {card.type}</Text>
              <Text>Element: {replaceTextByIconOrStyle(card.element)}</Text>
              <Text />
              <Text>{replaceTextByIconOrStyle(card.text)}</Text>
            </View>
            <Divider />
          </>
        )}
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardGridContainer: {},
  cardListContainer: {
    flexDirection: 'row',
    height: w.height / 3,
  },
  cardDescription: {
    height: w.height / 3,
    width: (w.width / 2.5) * 1.5,
  },
  ownPin: {
    color: '#238F23',
    elevation: 1,
  },
  surface: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // elevation: 4,
  },
});

export default FFCardSimple;
