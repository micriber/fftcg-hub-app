import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import {Card} from '../../services/api/card';
import FFCardSimple from '../../components/FFCardSimple';
import FFCardQuantityActions from '../../components/FFCardQuantityActions';
import {Text, useTheme} from 'react-native-paper';
import {ColorTranslator} from 'colortranslator';
import replaceTextByIconOrStyle from '../../utils/icon';
import ImageColors from 'react-native-image-colors';
import {getCardImageUrl} from '../../utils/image';
import {makeID} from '../../utils/string';
import GameIcon from '../../components/icons/GameIcon';
import {getElementIconFileByElement} from '../../enums/element';

type Props = {
  route: {params: {card: Card}};
};
type Rarity = 'C' | 'R' | 'H' | 'L' | 'S' | 'B' | 'PR';
export const rarityLabel: {[rarity in Rarity]: string} = {
  C: 'Common',
  R: 'Rare',
  H: 'Hero',
  L: 'Legend',
  S: 'Starter',
  B: 'Boss',
  PR: 'Promo',
};

const CardDetail = ({route}: Props) => {
  const w = Dimensions.get('window');

  const theme = useTheme();

  const [zoomCard, setZoomCard] = useState(false);
  const [portrait, setPortrait] = useState(w.width < w.height);
  const [screenWidth, setScreenWidth] = useState(w.width);
  const [screenHeight, setScreenHeight] = useState(w.height);
  const [averageColor, setAverageColor] = useState(theme.colors.background);

  const card = route.params.card;

  const styles = StyleSheet.create({
    backgroundImage: {
      backgroundColor: new ColorTranslator(averageColor).setA(0.6).RGBA,
      height: portrait ? 460 : screenHeight - 60,
      width: portrait ? '100%' : (screenHeight - 60) / 1.4,
    },
    container: {
      flex: 1,
      flexDirection: portrait ? 'column' : 'row',
      opacity: zoomCard && portrait ? 0.2 : 1,
    },
    image: {
      height: portrait ? 400 : screenHeight - 120,
      width: (portrait ? 400 : screenHeight - 120) / 1.4,
      marginTop: portrait ? 30 : 10,
      marginBottom: portrait ? 30 : 50,
      marginHorizontal: portrait ? 0 : 30,
    },
    scrollContainer: {
      flex: 1,
    },
    detailContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 10,
      marginHorizontal: 20,
    },
    detailBlock: {
      width: '33%',
      marginTop: 6,
      paddingRight: 5,
    },
    detailBlockCategory: {
      width: card.category1.length > 20 ? '66%' : '33%',
      marginTop: 6,
      paddingRight: 5,
    },
    detailBlockJob: {
      width: card.category1.length > 20 ? '33%' : '66%',
      marginTop: 6,
      paddingRight: 5,
    },
    detailLabel: {
      color: theme.colors.active,
    },
    detailText: {
      fontSize: 16,
    },
    detailElementText: {
      marginLeft: -1,
      height: 24,
    },
    detailDescriptionBlock: {
      width: '100%',
      marginTop: 6,
    },
    detailDescriptionLabel: {
      color: theme.colors.active,
      paddingRight: 5,
    },
    containerQuantity: {
      flex: 1,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 32,
      marginLeft: -(screenWidth / 10),
    },
    zoomContainer: {
      height: screenHeight - 40,
      width: screenWidth,
      backgroundColor: new ColorTranslator(averageColor).setA(0.6).RGBA,
    },
    zoomImage: {
      maxWidth: 500,
      maxHeight: 500 * 1.4,
      width: screenWidth - 20,
      height: (screenWidth - 20) * 1.4,
      borderRadius: 15,
    },
    zoomImageContainer: {
      marginTop: 20,
    },
  });

  useEffect(() => {
    Dimensions.addEventListener('change', ({window}) => {
      setPortrait(window.width < window.height);
      setScreenWidth(window.width);
      setScreenHeight(window.height);
    });

    async function fetchColor() {
      const imgSrc = getCardImageUrl(card.code, 'full', 'fr');
      const colors = await ImageColors.getColors(imgSrc, {});
      setAverageColor(
        colors.platform === 'android' ? colors.average : colors.detail,
      );
    }

    fetchColor();
    return () => Dimensions.removeEventListener('change', () => {});
  }, [card.code]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.backgroundImage}>
          <FFCardSimple
            card={card}
            viewType={'single'}
            imageStyle={styles.image}
            onPress={() => setZoomCard(true)}
          />
        </View>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.detailContainer}>
            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Element:</Text>
              <Text
                textBreakStrategy={'simple'}
                style={styles.detailElementText}>
                {card.elements.map((value) => {
                  return (
                    <GameIcon
                      name={getElementIconFileByElement(value.element)}
                      key={makeID()}
                    />
                  );
                })}
              </Text>
            </View>
            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Type:</Text>
              <Text textBreakStrategy={'simple'} style={styles.detailText}>
                {card.type}
              </Text>
            </View>
            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Cout:</Text>
              <Text textBreakStrategy={'simple'} style={styles.detailText}>
                {card.cost}
              </Text>
            </View>
            {card.power !== '' && (
              <View style={styles.detailBlock}>
                <Text style={styles.detailLabel}>Force:</Text>
                <Text textBreakStrategy={'simple'} style={styles.detailText}>
                  {card.power}
                </Text>
              </View>
            )}
            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Rareté:</Text>
              <Text textBreakStrategy={'simple'} style={styles.detailText}>
                {rarityLabel[card.rarity as Rarity]}
              </Text>
            </View>
            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Opus:</Text>
              <Text textBreakStrategy={'simple'} style={styles.detailText}>
                {card.set}
              </Text>
            </View>
            <View style={styles.detailBlockCategory}>
              <Text style={styles.detailLabel}>Catégorie:</Text>
              <Text textBreakStrategy={'simple'} style={styles.detailText}>
                {replaceTextByIconOrStyle(card.category1)}
              </Text>
            </View>
            {card.job !== '' && (
              <View style={styles.detailBlockJob}>
                <Text style={styles.detailLabel}>Job:</Text>
                <Text textBreakStrategy={'simple'} style={styles.detailText}>
                  {card.job}
                </Text>
              </View>
            )}
            <View style={styles.detailDescriptionBlock}>
              <Text style={styles.detailDescriptionLabel}>Description:</Text>
            </View>
            <Text style={styles.detailText} textBreakStrategy={'simple'}>
              {replaceTextByIconOrStyle(card.text)}
            </Text>
          </View>
          <View style={styles.containerQuantity}>
            <FFCardQuantityActions
              card={card}
              version="classic"
              label="Classic"
            />
            <FFCardQuantityActions card={card} version="foil" label="Foil" />
            <FFCardQuantityActions
              card={card}
              version="full-art"
              label="Full Art"
            />
          </View>
        </ScrollView>
      </View>
      {zoomCard && portrait && (
        <TouchableHighlight
          style={styles.zoomContainer}
          onPress={() => setZoomCard(false)}>
          <FFCardSimple
            card={card}
            viewType={'single'}
            imageStyle={styles.zoomImage}
            onPress={() => setZoomCard(false)}
            containerStyle={styles.zoomImageContainer}
          />
        </TouchableHighlight>
      )}
    </>
  );
};
export default CardDetail;
