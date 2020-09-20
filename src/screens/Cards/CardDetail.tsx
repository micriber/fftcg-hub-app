import React from 'react';
import {Text, Dimensions, StyleSheet, View, Alert} from 'react-native';
import {Card} from '../../services/api/card';
import FFCardSimple from '../../components/FFCardSimple';
import MinusButton from '../../components/common/Buttons/Minus';
import PlusButton from '../../components/common/Buttons/Plus';

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
      <Text style={[styles.headingButtonGroup, styles.textStyle]}>
        Normal:{' '}
      </Text>
      <View style={styles.container}>
        <MinusButton />
        <View style={[styles.counterDisplayStyle]}>
          <Text style={[styles.textStyle]}>1</Text>
        </View>
        <PlusButton onPress={() => Alert.alert('boulou')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  counterDisplayStyle: {
    backgroundColor: 'rgb(240,240,240)',
    borderRadius: 30,
    borderColor: 'rgb(240,240,240)',
    borderWidth: 1,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingButtonGroup: {color: 'black', textAlign: 'center'},
  textStyle: {
    fontSize: 28,
  },
});

export default CardDetail;
