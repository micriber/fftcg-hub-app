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
import {Card as FFTCGCard} from '../services/api/card';
import replaceTextByIconOrStyle from '../utils/icon';
import {Card, Text} from 'react-native-paper';

type Props = {
  displayOwnPin?: boolean;
  card: FFTCGCard;
  onPress?: (card: FFTCGCard) => void;
  onLongPress?: () => void;
  imageStyle?: ImageStyle;
  viewType: ViewType;
  containerStyle?: ViewStyle;
};

type ViewType = 'single' | 'simple' | 'detail';

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
        viewType === 'detail'
          ? styles.cardListContainer
          : styles.cardGridContainer,
        containerStyle,
        styles.container,
      ]}>
      {viewType === 'detail' && (
        <Card
          onPress={onPress ? () => onPress(card) : undefined}
          onLongPress={onLongPress}>
          <Card.Content>
            <View style={styles.view}>
              <FastImage
                style={[
                  imageSize,
                  // TODO: Find the correct type for this style
                  imageStyle as any,
                  styles.image,
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
              <View style={[styles.cardDescription]}>
                <Text style={styles.textDescription} numberOfLines={1}>
                  {card.code} {card.name}
                </Text>
                <Text style={styles.textDescription} numberOfLines={1}>
                  {card.type} {replaceTextByIconOrStyle(card.category1)}
                </Text>
                <Text style={styles.textDescription} numberOfLines={1}>
                  {card.job}
                </Text>
                <Text style={styles.textDescription} />
                <Text
                  numberOfLines={6}
                  style={[styles.cardTextDescription, styles.textDescription]}>
                  {replaceTextByIconOrStyle(card.text)}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}
      {viewType !== 'detail' && (
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={onPress ? () => onPress(card) : undefined}
          onLongPress={onLongPress}>
          <FastImage
            style={[
              imageSize,
              // TODO: Find the correct type for this style
              imageStyle as any,
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardGridContainer: {},
  cardListContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  view: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width - 50,
    maxWidth: 350,
  },
  image: {
    height: 210,
    width: 210 / 1.4,
    elevation: 0,
  },
  textDescription: {
    fontSize: 13,
  },
  cardDescription: {
    flex: 1,
    marginLeft: 10,
  },
  cardTextDescription: {flex: 1},
  ownPin: {
    backgroundColor: '#3D6391',
    color: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    zIndex: 0,
    marginTop: -15,
    marginBottom: -5,
    marginRight: -5,
    elevation: 10,
    alignSelf: 'flex-end',
  },
});

export default FFCardSimple;
