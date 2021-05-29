import React, {useRef} from 'react';
import SearchInput from '../common/form-fields/SearchInput';
import {Button, Switch, Text, useTheme} from 'react-native-paper';
import {
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Filter from './Filter';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type SubmitParams = {
  search: string;
  owned: boolean;
  types: string[];
  elements: string[];
  opus: string[];
  rarities: string[];
  categories: string[];
};

type Props = {
  onSubmit: (fields: SubmitParams) => void;
  style?: ViewStyle;
};

const SearchForm = (props: Props) => {
  const [search, setSearch] = React.useState('');
  const [owned, setOwned] = React.useState(false);
  const [filter, setFilter] = React.useState(false);

  const typesData = ['Avant', 'Soutien', 'Invocation', 'Monstre'];
  const [types, setTypes] = React.useState<string[]>([]);

  const elementsData = [
    'Feu',
    'Glace',
    'Vent',
    'Terre',
    'Foudre',
    'Eau',
    'Lumiere',
    'Tenebres',
  ];
  const [elements, setElements] = React.useState<string[]>([]);

  const opusData = [
    'Opus 1',
    'Opus 2',
    'Opus 3',
    'Opus 4',
    'Opus 5',
    'Opus 6',
    'Opus 7',
    'Opus 8',
    'Opus 9',
    'Opus 10',
    'Opus 11',
    'Opus 12',
    'Opus 13',
    'Opus 14',
  ];
  const [opus, setOpus] = React.useState<string[]>([]);

  const raritiesData = [
    'Common',
    'Rare',
    'Hero',
    'Legend',
    'Starter',
    'Boss',
    'Promo',
  ];
  const [rarities, setRarities] = React.useState<string[]>([]);

  const categoriesData = [
    'Final fantasy 1',
    'Final fantasy 2',
    'Final fantasy 3',
    'Final fantasy 4',
    'Final fantasy 5',
    'Final fantasy 6',
    'Final fantasy 7',
    'Final fantasy 8',
    'Final fantasy 9',
    'Final fantasy 10',
    'Final fantasy 11',
    'Final fantasy 12',
    'Final fantasy 13',
    'Final fantasy 14',
    'Final fantasy 15',
    'Dissidia final fantasy',
    'Final fantasy Legends',
    'Final fantasy Tactics',
    'Final fantasy explorer',
  ];
  const [categories, setCategories] = React.useState<string[]>([]);

  const filterHeight = useRef(new Animated.Value(0)).current;
  const filterOpacity = useRef(new Animated.Value(0)).current;

  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
      marginBottom: 10,
    },
    buttonLabel: {
      color: colors.lightGrey,
      fontWeight: 'bold',
    },
    button: {
      elevation: 2,
      marginTop: -35,
    },
    filterRowContainer: {
      flexDirection: 'row',
      height: 24,
      marginBottom: 10,
    },
    collectionLabel: {
      marginBottom: 3,
      color: colors.accent,
      fontSize: 15,
      marginRight: 5,
    },
    filterButtonContainer: {
      width: '40%',
      alignItems: 'flex-end',
      marginTop: -35,
      marginBottom: 35,
    },
    filterButton: {
      marginTop: -7,
    },
    filterButtonLabel: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    resetButtonContainer: {
      width: '60%',
      marginTop: -35,
      marginBottom: 35,
      alignItems: 'flex-start',
    },
  });

  function showFilter() {
    Animated.timing(filterHeight, {
      useNativeDriver: false,
      toValue: Dimensions.get('window').height * 0.7,
      duration: 500,
    }).start();

    Animated.timing(filterOpacity, {
      useNativeDriver: false,
      toValue: 100,
      duration: 10000,
    }).start();
    setFilter(true);
  }
  function hideFilter() {
    Animated.timing(filterHeight, {
      useNativeDriver: false,
      toValue: 0,
      duration: 500,
    }).start();

    Animated.timing(filterOpacity, {
      useNativeDriver: false,
      toValue: 0,
      duration: 100,
    }).start();
    setFilter(false);
  }

  function resetFilter() {
    setTypes([]);
    setElements([]);
    setOpus([]);
    setRarities([]);
    setCategories([]);
  }

  function getTotalFilter() {
    return (
      types.length +
      elements.length +
      opus.length +
      rarities.length +
      categories.length
    );
  }

  return (
    <View style={[styles.container, props.style]}>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        label={'Nom de carte ou code'}
      />
      <View style={styles.filterRowContainer}>
        <Text style={styles.collectionLabel}>Collection uniquement</Text>
        <Switch
          value={owned}
          onValueChange={(withValue: boolean) => {
            Keyboard.dismiss();
            setOwned(withValue);
          }}
          color={colors.active}
        />
      </View>
      <Animated.View
        style={{
          height: filterHeight,
          opacity: filterOpacity,
        }}>
        <Filter
          data={typesData}
          onValuesChange={setTypes}
          values={types}
          label={'Types'}
        />
        <Filter
          data={elementsData}
          onValuesChange={setElements}
          values={elements}
          label={'Eléments'}
        />
        <Filter
          data={opusData}
          onValuesChange={setOpus}
          values={opus}
          label={'Opus'}
        />
        <Filter
          data={raritiesData}
          onValuesChange={setRarities}
          values={rarities}
          label={'Raretés'}
        />
        <Filter
          data={categoriesData}
          onValuesChange={setCategories}
          values={categories}
          label={'Catégories'}
        />
      </Animated.View>
      <View style={styles.filterRowContainer}>
        <View style={styles.resetButtonContainer}>
          {filter && (
            <Button
              style={styles.filterButton}
              labelStyle={styles.filterButtonLabel}
              mode="text"
              onPress={resetFilter}>
              Réinitialiser
            </Button>
          )}
        </View>
        <View style={styles.filterButtonContainer}>
          <Button
            style={styles.filterButton}
            labelStyle={styles.filterButtonLabel}
            mode="text"
            onPress={filter ? hideFilter : showFilter}>
            {getTotalFilter()} FILTRES{' '}
            <Icon name={filter ? 'chevron-up' : 'chevron-down'} size={20} />
          </Button>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          hideFilter();
          props.onSubmit({
            search,
            owned,
            categories,
            opus,
            elements,
            rarities,
            types,
          });
        }}
        style={styles.button}
        labelStyle={styles.buttonLabel}>
        Rechercher
      </Button>
    </View>
  );
};

export default SearchForm;
