import React from 'react';
import {
  addCard,
  Card,
  CardVersion,
  subtractCard,
  UserCard,
} from '../services/api/card';
import {Alert, StyleSheet, Text} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import {CollectionCardsContext} from '../contexts/CollectionCardsContext';
import {SearchCardsContext} from '../contexts/SearchCardsContext';
import cloneDeep from 'lodash.clonedeep';

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
  const collectionCardsContext = React.useContext(CollectionCardsContext);
  const searchCardsContext = React.useContext(SearchCardsContext);
  const addUnity = async () => {
    if (!isLoading) {
      setLoading(true);
      try {
        await addCard({token: token!, code: card.code, version});
        setQuantity(quantity + 1);
        collectionCardsContext.setCardsList(
          updateContext(collectionCardsContext.cardsList, true, true),
        );
        searchCardsContext.setCardsList(
          updateContext(searchCardsContext.cardsList, true, false),
        );
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
        collectionCardsContext.setCardsList(
          updateContext(collectionCardsContext.cardsList, false, true),
        );
        searchCardsContext.setCardsList(
          updateContext(searchCardsContext.cardsList, false, false),
        );
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

  const updateContext = (
    cardsList: Card[],
    add: boolean = true,
    collection: boolean = true,
  ) => {
    // if user add a new card add card to list
    if (add && !cardsList.find((c: Card) => c.code === card.code)) {
      cardsList.push(cloneDeep(card));
    }

    const newCardList = cardsList.map((mapCard: Card) => {
      if (mapCard.code === card.code) {
        // if user add a new version add this version to user card
        if (!mapCard.userCard.find((uc) => uc.version === version)) {
          if (add) {
            mapCard.userCard.push({
              quantity: 1,
              version,
            });
          }
        } else {
          // update quantity
          mapCard.userCard = updateQuantity(mapCard, add);
        }
      }
      return mapCard;
    });

    // if collection list and add action, remove cards without quantity
    return !collection || add
      ? newCardList
      : removeCardsWithoutQuantity(newCardList);
  };

  const updateQuantity = (card: Card, add: boolean) => {
    return card.userCard.map((mapUserCard: UserCard) => {
      if (mapUserCard.version === version) {
        if (add) {
          mapUserCard.quantity++;
        } else {
          mapUserCard.quantity--;
        }
      }
      return mapUserCard;
    });
  };

  const removeCardsWithoutQuantity = (cardList: Card[]) => {
    return cardList.filter((cardFilter: Card) => {
      const userCard = cardFilter.userCard.find((uc: UserCard) => {
        if (uc.quantity > 0) {
          return uc;
        }
      });

      if (userCard) {
        return cardFilter;
      }
    });
  };

  const onChange = (value: number) => {
    if (value < quantity) {
      subtractUnity();
    } else if (value > quantity) {
      addUnity();
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
        onChange={onChange}
        minValue={0}
        editable={false}
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
