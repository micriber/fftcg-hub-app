import React from 'react';
import {Chip, Text, useTheme} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ColorTranslator} from 'colortranslator';

export type SubmitParams = {
  search: string;
  owned: boolean;
  types: [];
  elements: [];
};

type Props = {
  label: string;
  data: string[];
  values: string[];
  onValuesChange: (value: string[]) => void;
};

const Filter = ({label, data, onValuesChange, values}: Props) => {
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
        {data.map((value) => {
          return (
            <Chip
              selected={values.includes(value)}
              style={[
                styles.filterChoiceButton,
                {
                  backgroundColor: new ColorTranslator(
                    values.includes(value) ? colors.active : colors.primary,
                  ).setA(values.includes(value) ? 0.5 : 0.2).RGBA,
                },
              ]}
              onPress={() => {
                !values.includes(value)
                  ? onValuesChange([...values, value])
                  : onValuesChange(values.filter((type) => type !== value));
              }}>
              {value}
            </Chip>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Filter;
