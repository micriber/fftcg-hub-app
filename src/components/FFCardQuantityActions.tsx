import React from 'react';
import {
  addCard,
  Card,
  CardVersion,
  subtractCard,
  UserCard,
} from '../services/api/card';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {SearchCardsContext} from '../contexts/SearchCardsContext';
import cloneDeep from 'lodash.clonedeep';
import {Button} from 'react-native-paper';
import analytics from '@react-native-firebase/analytics';
import Logger from '../utils/Logger';

type Props = {
  card: Card;
  version: CardVersion;
  label?: string;
};

const FFCardQuantityActions = ({card, label, version}: Props) => {
  const initialQuantity =
    card.userCard.find((c) => c.version === version)?.quantity || 0;
  const [quantity, setQuantity] = React.useState(initialQuantity);
  const [isLoading, setLoading] = React.useState(false);
  const searchCardsContext = React.useContext(SearchCardsContext);
  const addUnity = async () => {
    if (!isLoading) {
      setLoading(true);
      try {
        await addCard({code: card.code, version});
        setQuantity(quantity + 1);
        searchCardsContext.setCardsList(
          updateContext(searchCardsContext.cardsList, true),
        );
        analytics().logEvent('add_card', {
          code: card.code,
          name: card.name,
          version: version,
          newQuantity: quantity,
        });
      } catch (err) {
        Alert.alert(
          'Erreur',
          `Un problème de connexion est survenue. Impossible d'ajouter la carte ${card.code}. Merci de réessayer ultérieurement.`,
        );
        Logger.error(err);
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
          code: card.code,
          version,
        });
        setQuantity(quantity - 1);
        searchCardsContext.setCardsList(
          updateContext(searchCardsContext.cardsList, false),
        );
        analytics().logEvent('subtract_card', {
          code: card.code,
          name: card.name,
          version: version,
          newQuantity: quantity,
        });
      } catch (err) {
        Alert.alert(
          'Erreur',
          `Un problème de connexion est survenue. Impossible de retirer la carte ${card.code}. Merci de réessayer ultérieurement.`,
        );
        Logger.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateContext = (cardsList: Card[], add: boolean = true) => {
    // if user add a new card add card to list
    if (add && !cardsList.find((c: Card) => c.code === card.code)) {
      cardsList.push(cloneDeep(card));
    }

    return cardsList.map((mapCard: Card) => {
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
  };

  const updateQuantity = (updateCard: Card, add: boolean) => {
    updateCard.userCard = updateCard.userCard.map((mapUserCard: UserCard) => {
      if (mapUserCard.version === version) {
        if (add) {
          mapUserCard.quantity++;
        } else {
          mapUserCard.quantity--;
        }
      }
      return mapUserCard;
    });
    return updateCard.userCard.filter((uc: UserCard) => {
      if (uc.quantity > 0) {
        return uc;
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <Button onPress={subtractUnity} mode={'contained'}>
          -
        </Button>
        <Text style={styles.quantity}>{quantity}</Text>
        <Button onPress={addUnity} mode={'contained'}>
          +
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    width: 250,
    alignItems: 'flex-end',
  },
  label: {
    minWidth: 60,
    margin: 10,
    textAlign: 'right',
    fontSize: 14,
    color: '#3D6391',
  },
  quantity: {
    margin: 10,
  },
});

export default FFCardQuantityActions;
