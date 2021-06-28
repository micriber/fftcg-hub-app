import React from 'react';
import {FlexStyle, StyleSheet, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {ActivityIndicator, FAB, useTheme} from 'react-native-paper';
import FFCardSimple from './FFCardSimple';
import FFCardsListEmpty from './FFCardsListEmpty';
import {Card} from '../services/api/card';
import {SearchCardsContext} from '../contexts/SearchCardsContext';

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
  const searchCardsContext = React.useContext(SearchCardsContext);
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
    <View style={[{backgroundColor: colors.background}, style, styles.flex1]}>
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
        ListEmptyComponent={emptyComponent()}
        ref={(ref) => (refList = ref)}
        itemContainerStyle={styles.container}
      />

      {!searchCardsContext.filtersAreVisible && (
        <FAB
          style={styles.fab}
          icon="arrow-up"
          onPress={() => {
            // because FlatGrid use flatlist and have bad TS definition
            // @ts-ignore
            refList?.scrollToIndex({
              index: 0,
              animated: true,
            });
          }}
        />
      )}
    </View>
  );

  function emptyComponent() {
    if (isEmpty) {
      return <FFCardsListEmpty />;
    }
    if (!refreshing) {
      return <ActivityIndicator animating={true} />;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 10,
  },
  contentContainerStyle: {
    minHeight: '100%',
    paddingBottom: 50,
    marginTop: -10,
  },
  flex1: {
    flex: 1,
  },
});

export default FFCardsGridList;
