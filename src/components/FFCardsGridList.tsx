import React, {LegacyRef} from 'react';
import {FlexStyle, StyleSheet, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {ActivityIndicator, FAB, useTheme} from 'react-native-paper';
import FFCardSimple from './FFCardSimple';
import FFCardsListEmpty from './FFCardsListEmpty';
import {Card} from '../services/api/card';

type Props = {
  viewType?: 'simple' | 'detail';
  cards?: Card[] | null;
  onCardPress?: (card: Card) => void;
  onEndReached?: () => void;
  onRefresh?: () => void;
  displayOwnPin?: boolean;
  refreshing?: boolean;
  style?: FlexStyle;
  isEmpty: boolean;
};

const FFCardsGridList = ({
  viewType = 'simple',
  cards = [],
  displayOwnPin = false,
  refreshing = false,
  onCardPress = () => {},
  onRefresh = () => {},
  onEndReached = () => {},
  isEmpty,
  style,
}: Props) => {
  const {colors} = useTheme();
  const renderItem = ({item}: {item: Card}) => (
    <FFCardSimple
      card={item}
      viewType={viewType}
      displayOwnPin={displayOwnPin}
      onPress={onCardPress}
      containerStyle={styles.flex1}
    />
  );
  let refList: FlatGrid<Card> | null;
  return (
    <View style={[{backgroundColor: colors.background}, style]}>
      <FlatGrid
        contentContainerStyle={styles.contentContainerStyle}
        key={1}
        spacing={10}
        keyExtractor={(item) => item.code}
        itemDimension={viewType === 'simple' ? 175 : 350}
        data={cards || []}
        renderItem={renderItem}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd < 0) {
            return;
          }
          onEndReached();
        }}
        onEndReachedThreshold={1.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          isEmpty ? (
            <FFCardsListEmpty />
          ) : (
            <ActivityIndicator animating={true} />
          )
        }
        ref={(ref) => (refList = ref)}
        itemContainerStyle={styles.container}
      />

      <FAB
        style={styles.fab}
        icon="arrow-up"
        onPress={() => {
          // @ts-ignore
          refList?.scrollToIndex({
            index: 0,
            animated: true,
          });
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 38,
  },
  contentContainerStyle: {
    minHeight: '100%',
    paddingBottom: 110,
    marginTop: -10,
  },
  flex1: {
    flex: 1,
  },
});

export default FFCardsGridList;
