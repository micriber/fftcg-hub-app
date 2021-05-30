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
import MultiSlider from '@ptomasroos/react-native-multi-slider';

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

const SearchForm = (props: Props) => {
  const [search, setSearch] = React.useState('');
  const [owned, setOwned] = React.useState(false);
  const [filter, setFilter] = React.useState(false);

  const [cost, setCost] = React.useState([0, 10]);
  const [power, setPower] = React.useState([0, 15000]);

  const typesData = {
    Avant: 'Avant',
    Soutien: 'Soutien',
    Invocation: 'Invocation',
    Monstre: 'Monstre',
  };
  const [types, setTypes] = React.useState<string[]>([]);

  const elementsData = {
    fire: 'Feu',
    ice: 'Glace',
    wind: 'Vent',
    earth: 'Terre',
    lightning: 'Foudre',
    water: 'Eau',
    light: 'Lumière',
    dark: 'Ténèbres',
  };
  const [elements, setElements] = React.useState<string[]>([]);

  const opusData = {
    Opus_I: 'Opus 1',
    Opus_II: 'Opus 2',
    Opus_III: 'Opus 3',
    Opus_IV: 'Opus 4',
    Opus_V: 'Opus 5',
    Opus_VI: 'Opus 6',
    Opus_VII: 'Opus 7',
    Opus_VIII: 'Opus 8',
    Opus_IX: 'Opus 9',
    Opus_X: 'Opus 10',
    Opus_XI: 'Opus 11',
    Opus_XII: 'Opus 12',
    Opus_XIII: 'Opus 13',
    Boss_Deck_Chaos: 'Deck de boss chaos',
  };
  const [opus, setOpus] = React.useState<string[]>([]);

  const raritiesData = {
    C: 'Common',
    R: 'Rare',
    H: 'Hero',
    L: 'Legend',
    S: 'Starter',
    B: 'Boss',
    P: 'Promo',
  };
  const [rarities, setRarities] = React.useState<string[]>([]);

  const categoriesData = {
    I: 'Final Fantasy 1',
    II: 'Final Fantasy 2',
    III: 'Final Fantasy 3',
    IV: 'Final Fantasy 4',
    V: 'Final Fantasy 5',
    VI: 'Final Fantasy 6',
    VII: 'Final Fantasy 7',
    VIII: 'Final Fantasy 8',
    IX: 'Final Fantasy 9',
    X: 'Final Fantasy 10',
    XI: 'Final Fantasy 11',
    XII: 'Final Fantasy 12',
    XIII: 'Final Fantasy 13',
    XIV: 'Final Fantasy 14',
    XV: 'Final Fantasy 15',
    XVI: 'Dissidia Final Fantasy',
    FFL: 'Final Fantasy Legends',
    FFT: 'Final Fantasy Tactics',
    FFE: 'Final Fantasy Explorer',
  };
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
    costLabel: {fontSize: 16},
    sliderContainer: {marginHorizontal: '10%'},
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
        <Text style={styles.costLabel}>
          Coût : {cost[0]} - {cost[1]}
        </Text>
        <MultiSlider
          values={[cost[0], cost[1]]}
          onValuesChange={(value) => setCost(value)}
          min={0}
          max={10}
          step={1}
          allowOverlap={true}
          snapped
          containerStyle={styles.sliderContainer}
          selectedStyle={{backgroundColor: colors.primary}}
          markerStyle={{backgroundColor: colors.primary}}
          sliderLength={Dimensions.get('window').width * 0.75}
        />
        <Text style={styles.costLabel}>
          Puissance : {power[0]} - {power[1]}
        </Text>
        <MultiSlider
          values={[power[0], power[1]]}
          onValuesChange={(value) => setPower(value)}
          min={0}
          max={15000}
          step={1000}
          allowOverlap={true}
          snapped
          containerStyle={styles.sliderContainer}
          selectedStyle={{backgroundColor: colors.primary}}
          markerStyle={{backgroundColor: colors.primary}}
          sliderLength={Dimensions.get('window').width * 0.75}
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
            cost,
            power,
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
