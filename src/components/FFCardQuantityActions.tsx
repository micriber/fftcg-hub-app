import React from 'react';
import {addCard, Card, CardVersion, subtractCard} from '../services/api/card';
import {Alert, StyleSheet, Text} from 'react-native';
import NumericInput from 'react-native-numeric-input';

type Props = {
  card: Card;
  version: CardVersion;
  token: string;
  label?: string;
};

const FFCardQuantityActions = ({card, token, label, version}: Props) => {
  const initialQuantity =
    card.userCard.find((c) => c.version === version)?.quantity || 0;
  const [quantity, setQuantity] = React.useState(initialQuantity);
  const [isLoading, setLoading] = React.useState(false);

  const addUnity = async () => {
    if (!isLoading) {
      setLoading(true);
      try {
        await addCard({token: token!, code: card.code, version});
        setQuantity(quantity + 1);
      } catch (e) {
        Alert.alert(
          `Cant add unity for ${card.code} version ${version}`,
          e.message,
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const subtractUnity = async () => {
    if (!isLoading && quantity > 0) {
      setLoading(true);
      try {
        await subtractCard({
          token: token!,
          code: card.code,
          version,
        });
        setQuantity(quantity - 1);
      } catch (e) {
        Alert.alert(
          `Cant subtract unity for ${card.code} version ${version}`,
          e.message,
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {label && (
        <Text style={[styles.headingButtonGroup, styles.textStyle]}>
          {label}:{' '}
        </Text>
      )}
      {/* TODO: Replace the library react-native-numeric-input when we'll have a style framework */}
      <NumericInput
        value={quantity}
        onChange={(value) => (value < quantity ? subtractUnity() : addUnity())}
        minValue={0}
      />
      {/*<View style={styles.container}>*/}
      {/*  <MinusButton onPress={subtractUnity} />*/}
      {/*  <View style={[styles.counterDisplayStyle]}>*/}
      {/*    <Text style={[styles.textStyle]}>{quantity}</Text>*/}
      {/*  </View>*/}
      {/*  <PlusButton onPress={addUnity} />*/}
      {/*</View>*/}
    </>
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

export default FFCardQuantityActions;
