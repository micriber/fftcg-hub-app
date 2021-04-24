import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {Card} from '../../services/api/card';
import FFCardSimple from '../../components/FFCardSimple';
import FFCardQuantityActions from '../../components/FFCardQuantityActions';
import {useTheme, Text} from 'react-native-paper';
import {ColorTranslator} from 'colortranslator';
import replaceTextByIconOrStyle from '../../utils/icon';
import ImageColors from 'react-native-image-colors';
import {getCardImageUrl} from '../../utils/image';

type Props = {
  route: {params: {card: Card}};
};
type Rarity = 'C' | 'R' | 'H' | 'L' | 'S' | 'B' | 'PR';
const rarityLabel: {[rarity in Rarity]: string} = {
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

  const [portrait, setPortrait] = useState(w.width < w.height);
  const [screenWidth, setScreenWidth] = useState(w.width);
  const [screenHeight, setScreenHeight] = useState(w.height);
  const [averageColor, setAverageColor] = useState(theme.colors.background);

  const card = route.params.card;

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
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: portrait ? 'column' : 'row',
      }}>
      <View
        style={{
          backgroundColor: new ColorTranslator(averageColor).setA(0.6).RGBA,
          height: portrait ? 460 : screenHeight - 60,
          width: portrait ? '100%' : (screenHeight - 60) / 1.4,
        }}>
        <FFCardSimple
          card={card}
          viewType={'single'}
          imageStyle={{
            height: portrait ? 400 : screenHeight - 120,
            width: (portrait ? 400 : screenHeight - 120) / 1.4,
            marginTop: portrait ? 30 : 10,
            marginBottom: portrait ? 30 : 50,
            marginHorizontal: portrait ? 0 : 30,
          }}
        />
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginHorizontal: 20,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: 10,
            }}>
            <View style={{width: '33%', marginTop: 6, paddingRight: 5}}>
              <Text style={{color: theme.colors.active}}>Element:</Text>
              <Text
                textBreakStrategy={'simple'}
                style={{marginTop: -5, marginLeft: -1, height: 24}}>
                {replaceTextByIconOrStyle(card.element)}
              </Text>
            </View>
            <View style={{width: '33%', marginTop: 6, paddingRight: 5}}>
              <Text style={{color: theme.colors.active}}>Type:</Text>
              <Text textBreakStrategy={'simple'} style={{fontSize: 16}}>
                {card.type}
              </Text>
            </View>
            <View style={{width: '33%', marginTop: 6, paddingRight: 5}}>
              <Text style={{color: theme.colors.active}}>Cout:</Text>
              <Text textBreakStrategy={'simple'} style={{fontSize: 16}}>
                {card.cost}
              </Text>
            </View>
            {card.power !== '' && (
              <View style={{width: '33%', marginTop: 6, paddingRight: 5}}>
                <Text style={{color: theme.colors.active}}>Force:</Text>
                <Text textBreakStrategy={'simple'} style={{fontSize: 16}}>
                  {card.power}
                </Text>
              </View>
            )}
            <View style={{width: '33%', marginTop: 6, paddingRight: 5}}>
              <Text style={{color: theme.colors.active}}>Rareté:</Text>
              <Text textBreakStrategy={'simple'} style={{fontSize: 16}}>
                {rarityLabel[card.rarity]}
              </Text>
            </View>
            <View style={{width: '33%', marginTop: 6, paddingRight: 5}}>
              <Text style={{color: theme.colors.active}}>Opus:</Text>
              <Text textBreakStrategy={'simple'} style={{fontSize: 16}}>
                {card.set}
              </Text>
            </View>
            <View
              style={{
                width: card.category1.length > 20 ? '66%' : '33%',
                marginTop: 6,
                paddingRight: 5,
              }}>
              <Text style={{color: theme.colors.active}}>Catégorie:</Text>
              <Text textBreakStrategy={'simple'} style={{fontSize: 16}}>
                {replaceTextByIconOrStyle(card.category1)}
              </Text>
            </View>
            {card.job !== '' && (
              <View
                style={{
                  width: card.category1.length > 20 ? '33%' : '66%',
                  marginTop: 6,
                  paddingRight: 5,
                }}>
                <Text style={{color: theme.colors.active}}>Job:</Text>
                <Text textBreakStrategy={'simple'} style={{fontSize: 16}}>
                  {card.job}
                </Text>
              </View>
            )}
            <View style={{width: '100%', marginTop: 6}}>
              <Text style={{color: theme.colors.active, paddingRight: 5}}>
                Description:
              </Text>
            </View>
            <Text style={{fontSize: 16}} textBreakStrategy={'simple'}>
              {replaceTextByIconOrStyle(card.text)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 32,
            marginLeft: -(screenWidth / 10),
          }}>
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
  );
};

export default CardDetail;
