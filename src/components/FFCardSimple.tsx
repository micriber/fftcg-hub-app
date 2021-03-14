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

const w = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = w.width < w.height ? w.width : w.height;
const SCREEN_HEIGHT = w.width < w.height ? w.height : w.width;

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
    width: SCREEN_WIDTH / 2.2,
    height: SCREEN_HEIGHT / 3.3,
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
      ]}>
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={onPress ? () => onPress(card) : undefined}
        onLongPress={onLongPress}>
        {/*<Surface*/}
        {/*  style={[*/}
        {/*    isListView ? styles.cardListContainer : styles.cardGridContainer,*/}
        {/*    styles.surface,*/}
        {/*    containerStyle,*/}
        {/*    imageSize,*/}
        {/*  ]}>*/}
        <FastImage
          style={[
            imageSize,
            // TODO: Find the correct type for this style
            imageStyle as any,
          ]}
          source={{uri: src}}
          resizeMode={viewType === 'list' ? 'stretch' : 'contain'}
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
      {/*</Surface>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  cardGridContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
  },
  cardListContainer: {
    // width: '100%',
    flexDirection: 'row',
    // alignContent: 'stretch',
    // justifyContent: 'center',
    height: SCREEN_HEIGHT / 3.3,
    // alignItems: 'flex-end',
    // alignItems: 'flex-start',
  },
  cardDescription: {
    flex: 1,
    // justifyContent: 'flex-start',
    height: SCREEN_HEIGHT / 3.3,
    // width: SCREEN_WIDTH / 2.2,
  },
  cardTextDescription: {flex: 1},
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
