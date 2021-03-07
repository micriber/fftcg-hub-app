import React from 'react';
import {Dimensions, View} from 'react-native';
import {Card} from '../../services/api/card';
import FFCardSimple from '../../components/FFCardSimple';
import FFCardQuantityActions from '../../components/FFCardQuantityActions';

type Props = {
  route: {params: {card: Card}};
};

const w = Dimensions.get('window');

const CardDetail = ({route}: Props) => {
  const card = route.params.card;

  return (
    <View>
      <FFCardSimple
        card={card}
        viewType={'single'}
        imageStyle={{
          width: w.width,
          height: w.height / 2,
        }}
        containerStyle={{
          marginLeft: w.width / 128,
        }}
      />
      <View style={{alignItems: 'center'}}>
        <FFCardQuantityActions card={card} version="classic" label="Classic" />
        <FFCardQuantityActions card={card} version="foil" label="Foil" />
        <FFCardQuantityActions
          card={card}
          version="full-art"
          label="Full Art"
        />
      </View>
    </View>
  );
};

export default CardDetail;
