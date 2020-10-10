import React from 'react';
import {Dimensions, View} from 'react-native';
import {Card} from '../../services/api/card';
import FFCardSimple from '../../components/FFCardSimple';
import {AuthContext} from '../../AuthContext';
import FFCardQuantityActions from '../../components/FFCardQuantityActions';

type Props = {
  route: {params: {card: Card}};
};

const w = Dimensions.get('window');

const CardDetail = ({route}: Props) => {
  const card = route.params.card;
  const {getIdToken} = React.useContext(AuthContext);
  const token = getIdToken();

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
      <View style={{alignItems: 'center'}}>
        <FFCardQuantityActions
          card={card}
          version="classic"
          token={token!}
          label="Classic"
        />
        <FFCardQuantityActions
          card={card}
          version="foil"
          token={token!}
          label="Foil"
        />
        <FFCardQuantityActions
          card={card}
          version="full-art"
          token={token!}
          label="Full Art"
        />
      </View>
    </View>
  );
};

export default CardDetail;
