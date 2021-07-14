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
import {getCardImageUrl, lang} from '../../utils/image';
import {makeID} from '../../utils/string';
import GameIcon from '../../components/icons/GameIcon';
import {getElementIconFileByElement} from '../../enums/element';
import {categoriesData, raritiesData} from '../../components/form/SearchForm';
import {ImageColorsResult} from 'react-native-image-colors/src/types';

type Props = {
  route: {params: {card: Card}};
};

const CardDetail = ({route}: Props) => {
  const window = Dimensions.get('window');
  const theme = useTheme();
  const card = route.params.card;

  const [zoomCard, setZoomCard] = useState(false);
  const [averageColor, setAverageColor] = useState(theme.colors.background);

  const styles = StyleSheet.create({
    backgroundImage: {
      backgroundColor: new ColorTranslator(averageColor).setA(0.6).RGBA,
      height: 460,
      width: '100%',
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      opacity: zoomCard ? 0.2 : 1,
    },
    image: {
      height: 400,
      width: 400 / 1.4,
      marginTop: 30,
      marginBottom: 30,
      marginHorizontal: 0,
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
      marginBottom: 32,
    },
    detailBlock: {
      marginTop: 6,
      marginLeft: 10,
      marginRight: 20,
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
      marginTop: 20,
    },
    detailDescriptionLabel: {
      color: theme.colors.active,
      paddingRight: 5,
    },
    containerQuantity: {
      flex: 1,
      alignItems: 'center',
      marginLeft: -(window.width / 10),
      marginBottom: 10,
    },
    zoomContainer: {
      height: window.height - 40,
      width: window.width,
      backgroundColor: new ColorTranslator(averageColor).setA(0.6).RGBA,
    },
    zoomImage: {
      maxWidth: 500,
      maxHeight: 500 * 1.4,
      width: window.width - 20,
      height: (window.width - 20) * 1.4,
      borderRadius: 15,
    },
    zoomImageContainer: {
      marginTop: 20,
    },
  });

  useEffect(() => {
    const setAverageColorFromImageColor = (colors: ImageColorsResult) =>
      setAverageColor(
        colors.platform === 'android'
          ? colors.average
            ? colors.average
            : theme.colors.background
          : colors.detail,
      );

    const getImageColor = (language: lang) => {
      return ImageColors.getColors(
        getCardImageUrl(card.code, 'full', language),
        {},
      );
    };

    async function fetchColor() {
      try {
        setAverageColorFromImageColor(await getImageColor('fr'));
      } catch (e) {
        setAverageColorFromImageColor(await getImageColor('eg'));
      }
    }
    fetchColor();
  }, [card.code, theme.colors.background]);

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
        <ScrollView
          style={styles.scrollContainer}
          indicatorStyle={'black'}
          showsVerticalScrollIndicator={true}>
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
                {raritiesData.find(({value}) => value === card.rarity)?.label}
              </Text>
            </View>
            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Opus:</Text>
              <Text textBreakStrategy={'simple'} style={styles.detailText}>
                {card.set}
              </Text>
            </View>
            <View style={styles.detailBlock}>
              <Text style={styles.detailLabel}>Catégorie:</Text>
              <Text textBreakStrategy={'simple'} style={styles.detailText}>
                {
                  categoriesData.find(({value}) => value === card.category1)
                    ?.label
                }
              </Text>
            </View>
            {card.job !== '' && (
              <View style={styles.detailBlock}>
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
        </ScrollView>
      </View>
      {zoomCard && (
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
