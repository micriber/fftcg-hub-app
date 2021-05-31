import React from 'react';
import {Chip, Text, useTheme} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ColorTranslator} from 'colortranslator';

export type filterData = {value: string; label: string};
type Props = {
  label: string;
  data: filterData[];
  values: string[];
  onValuesChange: (value: string[]) => void;
};

const ChipFilter = ({label, data, onValuesChange, values}: Props) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    filterContainer: {
      marginBottom: 5,
    },
    filterLabel: {
      fontSize: 16,
    },
    filterChoiceContainer: {},
    filterChoiceButton: {
      marginRight: 10,
      marginVertical: 8,
    },
  });

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterLabel}>{label}</Text>
      <ScrollView
        horizontal={true}
        style={styles.filterChoiceContainer}
        showsHorizontalScrollIndicator={false}>
        {data.map((filterData) => {
          return (
            <Chip
              selected={values.includes(filterData.value)}
              style={[
                styles.filterChoiceButton,
                {
                  backgroundColor: new ColorTranslator(
                    values.includes(filterData.value)
                      ? colors.active
                      : colors.primary,
                  ).setA(values.includes(filterData.value) ? 0.5 : 0.2).RGBA,
                },
              ]}
              onPress={() => {
                !values.includes(filterData.value)
                  ? onValuesChange([...values, filterData.value])
                  : onValuesChange(
                      values.filter((type) => type !== filterData.value),
                    );
              }}>
              {label}
            </Chip>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ChipFilter;
