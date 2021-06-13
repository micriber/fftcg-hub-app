import React, {useEffect, useRef} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChipFilter, {filterData} from './ChipFilter';
import SliderFilter from './SliderFilter';

export type SubmitParams = {
  search: string;
  owned: boolean;
  types: string[];
  elements: string[];
  opus: string[];
  rarities: string[];
  categories: string[];
  cost: number[];
  power: number[];
};

type Props = {
  onSubmit: (fields: SubmitParams) => void;
  style?: ViewStyle;
};

export const categoriesData: filterData[] = [
  {
    value: 'I',
    label: 'Final Fantasy 1',
  },
  {
    value: 'II',
    label: 'Final Fantasy 2',
  },
  {
    value: 'III',
    label: 'Final Fantasy 3',
  },
  {
    value: 'IV',
    label: 'Final Fantasy 4',
  },
  {
    value: 'V',
    label: 'Final Fantasy 5',
  },
  {
    value: 'VI',
    label: 'Final Fantasy 6',
  },
  {
    value: 'VII',
    label: 'Final Fantasy 7',
  },
  {
    value: 'VIII',
    label: 'Final Fantasy 8',
  },
  {
    value: 'IX',
    label: 'Final Fantasy 9',
  },
  {
    value: 'X',
    label: 'Final Fantasy 10',
  },
  {
    value: 'XI',
    label: 'Final Fantasy 11',
  },
  {
    value: 'XII',
    label: 'Final Fantasy 12',
  },
  {
    value: 'XIII',
    label: 'Final Fantasy 13',
  },
  {
    value: 'XIV',
    label: 'Final Fantasy 14',
  },
  {
    value: 'XV',
    label: 'Final Fantasy 15',
  },
  {
    value: 'DFF',
    label: 'Dissidia Final Fantasy',
  },
  {
    value: 'FFL',
    label: 'Final Fantasy Legends',
  },
  {
    value: 'FFT',
    label: 'Final Fantasy Tactics',
  },
  {
    value: 'FFTA',
    label: 'Final Fantasy Tactics Advance',
  },
  {
    value: 'FFTA2',
    label: 'Final Fantasy Tactics A2',
  },
  {
    value: 'FFEX',
    label: 'Final Fantasy Explorer',
  },
  {
    value: 'FFRK',
    label: 'Final Fantasy Recard Keeper',
  },
  {
    value: 'TYPE-0',
    label: 'Final Fantasy Type-0',
  },
  {
    value: 'FFCC',
    label: 'Final Fantasy Crystal Chronicles',
  },
  {
    value: 'MOBIUS',
    label: 'Mobius Final Fantasy',
  },
  {
    value: 'THEATRHYTHM',
    label: 'Theatrhythm Final Fantasy',
  },
  {
    value: 'WOFF',
    label: 'World of Final Fantasy',
  },
  {
    value: 'FFBE',
    label: 'Final Fantasy Brave Exvius',
  },
  {
    value: 'Special',
    label: 'Special',
  },
  {
    value: 'LOV',
    label: 'Lord of Vermillion',
  },
  {
    value: 'PICTLOGICA',
    label: 'Pictlogica Final Fantasy',
  },
  {
    value: 'Crystal Hunt',
    label: 'Final Fantasy Crystal Hunt',
  },
];
export const typesData: filterData[] = [
  {
    value: 'Avant',
    label: 'Avant',
  },
  {
    value: 'Soutien',
    label: 'Soutien',
  },
  {
    value: 'Invocation',
    label: 'Invocation',
  },
  {
    value: 'Monstre',
    label: 'Monstre',
  },
];
export const elementsData: filterData[] = [
  {
    value: 'fire',
    label: 'Feu',
  },
  {
    value: 'ice',
    label: 'Glace',
  },
  {
    value: 'wind',
    label: 'Vent',
  },
  {
    value: 'earth',
    label: 'Terre',
  },
  {
    value: 'lightning',
    label: 'Foudre',
  },
  {
    value: 'water',
    label: 'Eau',
  },
  {
    value: 'light',
    label: 'Lumière',
  },
  {
    value: 'dark',
    label: 'Ténèbres',
  },
];
export const opusData: filterData[] = [
  {
    value: 'Opus I',
    label: 'Opus 1',
  },
  {
    value: 'Opus II',
    label: 'Opus 2',
  },
  {
    value: 'Opus III',
    label: 'Opus 3',
  },
  {
    value: 'Opus IV',
    label: 'Opus 4',
  },
  {
    value: 'Opus V',
    label: 'Opus 5',
  },
  {
    value: 'Opus VI',
    label: 'Opus 6',
  },
  {
    value: 'Opus VII',
    label: 'Opus 7',
  },
  {
    value: 'Opus VIII',
    label: 'Opus 8',
  },
  {
    value: 'Opus IX',
    label: 'Opus 9',
  },
  {
    value: 'Opus X',
    label: 'Opus 10',
  },
  {
    value: 'Opus XI',
    label: 'Opus 11',
  },
  {
    value: 'Opus XII',
    label: 'Opus 12',
  },
  {
    value: 'Opus XIII',
    label: 'Opus 13',
  },
  {
    value: 'Boss Deck Chaos',
    label: 'Deck de boss chaos',
  },
];
export const raritiesData: filterData[] = [
  {
    value: 'C',
    label: 'Common',
  },
  {
    value: 'R',
    label: 'Rare',
  },
  {
    value: 'H',
    label: 'Hero',
  },
  {
    value: 'L',
    label: 'Legend',
  },
  {
    value: 'S',
    label: 'Starter',
  },
  {
    value: 'B',
    label: 'Boss',
  },
  {
    value: 'PR',
    label: 'Promo',
  },
];

const SearchForm = (props: Props) => {
  const [search, setSearch] = React.useState('');
  const [owned, setOwned] = React.useState(false);
  const [filter, setFilter] = React.useState(false);

  const [screenHeight, setScreenHeight] = React.useState(
    Dimensions.get('window').height,
  );

  const [cost, setCost] = React.useState([0, 10]);
  const [power, setPower] = React.useState([0, 15000]);
  const [types, setTypes] = React.useState<string[]>([]);
  const [elements, setElements] = React.useState<string[]>([]);
  const [opus, setOpus] = React.useState<string[]>([]);
  const [rarities, setRarities] = React.useState<string[]>([]);
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

  useEffect(() => {
    Dimensions.addEventListener('change', ({window}) => {
      setScreenHeight(window.height);
    });
    return () => Dimensions.removeEventListener('change', () => {});
  });

  function showFilter() {
    Animated.timing(filterHeight, {
      useNativeDriver: false,
      toValue: screenHeight * 0.7,
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
    setCost([0, 10]);
    setPower([0, 15000]);
  }

  function getTotalFilter() {
    return (
      types.length +
      elements.length +
      opus.length +
      rarities.length +
      categories.length +
      (cost[0] === 0 && cost[1] === 10 ? 0 : 1) +
      (power[0] === 0 && power[1] === 15000 ? 0 : 1)
    );
  }

  const submit = () => {
    hideFilter();
    props.onSubmit({
      search,
      owned,
      categories,
      opus,
      elements,
      rarities,
      types,
      cost,
      power,
    });
  };

  return (
    <View style={[styles.container, props.style]}>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        label={'Nom de carte ou code'}
        onSubmitEditing={submit}
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
        <ChipFilter
          data={typesData}
          onValuesChange={setTypes}
          values={types}
          label={'Types'}
        />
        <ChipFilter
          data={elementsData}
          onValuesChange={setElements}
          values={elements}
          label={'Eléments'}
        />
        <ChipFilter
          data={opusData}
          onValuesChange={setOpus}
          values={opus}
          label={'Opus'}
        />
        <ChipFilter
          data={raritiesData}
          onValuesChange={setRarities}
          values={rarities}
          label={'Raretés'}
        />
        <ChipFilter
          data={categoriesData}
          onValuesChange={setCategories}
          values={categories}
          label={'Catégories'}
        />
        <SliderFilter
          onValuesChange={setCost}
          values={cost}
          label={'Coût'}
          step={1}
        />
        <SliderFilter
          onValuesChange={setPower}
          values={power}
          label={'Puissance'}
          step={1000}
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
        onPress={submit}
        style={styles.button}
        labelStyle={styles.buttonLabel}>
        Rechercher
      </Button>
    </View>
  );
};

export default SearchForm;
