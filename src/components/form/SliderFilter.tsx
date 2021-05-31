import {useTheme, Text} from 'react-native-paper';
import {Dimensions, StyleSheet, View} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';

type Props = {
  label: string;
  values: number[];
  onValuesChange: (value: number[]) => void;
};

const SliderFilter = ({label, values, onValuesChange}: Props) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    filterContainer: {
      marginBottom: 5,
    },
    filterLabel: {
      fontSize: 16,
    },
    sliderContainer: {marginHorizontal: '10%'},
  });

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterLabel}>
        {label} : {values[0]} - {values[1]}
      </Text>
      <MultiSlider
        values={[values[0], values[1]]}
        onValuesChange={(value) => onValuesChange(value)}
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
    </View>
  );
};

export default SliderFilter;
