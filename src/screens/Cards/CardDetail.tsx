import React from 'react';
import {Dimensions, View} from 'react-native';
import {Card} from '../../services/api/card';
import FFCardSimple from '../../components/FFCardSimple';

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
        isListView={false}
        imageStyle={{
          width: w.width,
          height: w.height / 2,
        }}
        containerStyle={{
          marginLeft: w.width / 128,
        }}
      />
    </View>
  );
};

export default CardDetail;
