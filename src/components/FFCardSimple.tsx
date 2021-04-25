import React from 'react';
import {
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
import {Text} from 'react-native-paper';

type Props = {
  displayOwnPin?: boolean;
  card: Card;
  onPress?: (card: Card) => void;
  onLongPress?: () => void;
  imageStyle?: ImageStyle;
  viewType: ViewType;
  containerStyle?: ViewStyle;
};

type ViewType = 'single' | 'list' | 'grid';

const FFCardSimple = ({
  card,
  viewType,
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
    height: 255,
    width: 255 / 1.4,
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
  };
  return (
    <View
      testID="SimpleFFCard"
      key={card.code}
      style={[
        viewType === 'list'
          ? styles.cardListContainer
          : styles.cardGridContainer,
        containerStyle,
        {
          flex: 1,
          alignItems: 'center',
        },
      ]}>
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={onPress ? () => onPress(card) : undefined}
        onLongPress={onLongPress}>
        <FastImage
          style={[
            imageSize,
            // TODO: Find the correct type for this style
            imageStyle as any,
            {flex: 1}
          ]}
          source={{uri: src}}
          resizeMode={'cover'}
          onError={() => {
            if (!isFallbackImage) {
              setSrc(enSrc);
              setIsFallbackImage(true);
            }
          }}
          testID={`${viewType}-Image-${card.code}`}
        />
        {displayOwnPin && card.userCard.length > 0 && (
          <Icon name="check" style={styles.ownPin} size={20} />
        )}
      </TouchableOpacity>
      {viewType === 'list' && (
        <View style={[styles.cardDescription]}>
          <Text>Code: {card.code}</Text>
          <Text>Nom: {card.name}</Text>
          <Text>Type: {card.type}</Text>
          <Text>Element: {replaceTextByIconOrStyle(card.element)}</Text>
          <Text />
          <Text numberOfLines={6} style={styles.cardTextDescription}>
            {replaceTextByIconOrStyle(card.text)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardGridContainer: {
  },
  cardListContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  cardDescription: {
    flex: 1,
    marginLeft: 10
  },
  cardTextDescription: {flex: 1},
  ownPin: {
    color: '#238F23',
    elevation: 1,
  },
});

export default FFCardSimple;
