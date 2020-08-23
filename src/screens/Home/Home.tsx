import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  Switch,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {getCardImageUrl} from '../../utils/image';
import {useAsync} from 'react-async';
import {getCards, UnauthorizedError} from '../../services/api/card';
import {AuthContext} from '../../AuthContext';
import Loading from '../Loading';

const w = Dimensions.get('window');

const Home = () => {
  const [isListView, setIsListView] = React.useState(false);
  const {getIdToken} = React.useContext(AuthContext);
  const token = getIdToken();
  const {data, error, isLoading, isPending} = useAsync({
    promiseFn: getCards,
    token,
  });

  console.log({data, error, isLoading, isPending});

  if (isLoading || isPending) {
    return <Loading />;
  }
  if (error) {
    return <Text>{error}</Text>;
  }
  if (!data || (data && 'message' in data)) {
    return <Text>{JSON.stringify((data as UnauthorizedError).message)}</Text>;
  }

  const cards = data.cards;

  return (
    <>
      <View style={styles.header}>
        <AntIcon name="appstore-o" size={20} />
        <Switch value={isListView} onValueChange={setIsListView} />
        <AntIcon name="bars" size={22} />
      </View>
      <View style={[isListView ? styles.listContainer : styles.gridContainer]}>
        <FlatList
          initialNumToRender={2}
          numColumns={isListView ? 1 : 2}
          key={isListView ? 0 : 1}
          data={cards}
          keyExtractor={(item) => item.code}
          renderItem={({item}) => (
            <View
              key={item.code}
              style={[
                isListView
                  ? styles.cardListContainer
                  : styles.cardGridContainer,
              ]}>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => Alert.alert(`Click on ${item.name}`)}>
                <FastImage
                  // style={styles.image}
                  style={{width: w.width / 2.5, height: w.height / 3}}
                  source={{
                    uri: getCardImageUrl(item.code),
                  }}
                  resizeMode={isListView ? 'stretch' : 'contain'}
                />
              </TouchableOpacity>
              {isListView && (
                <View
                  style={[
                    styles.cardDescription,
                    // {height:},
                  ]}>
                  <Text>Code: {item.code}</Text>
                  <Text>Nom: {item.name}</Text>
                  <Text>Type: {item.type}</Text>
                  <Text>Element: {item.element}</Text>
                  <Text />
                  <Text>Description: {item.text}</Text>
                </View>
              )}
            </View>
          )}
        />
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.searchButton}
          // onPress={() => navigation.navigate('CollectionSearch')}>
          onPress={() => Alert.alert('Search button pressed')}>
          <AntIcon name="search1" size={20} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#878683', //LightTheme.colors.primary,
  },
  gridContainer: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  listContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
  cardGridContainer: {
    marginTop: 3,
    marginLeft: 15,
  },
  cardListContainer: {
    // width: '100%',
    flexDirection: 'row',
    height: w.height / 3,
  },
  cardDescription: {
    borderColor: '#000',
    borderWidth: 1,
    height: w.height / 3,
    width: (w.width / 2.5) * 1.5,
    // width: w.width / 4,
    // height: w.height / 4,
  },
  bottomView: {
    width: '100%',
    height: 75,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
  },
  searchButton: {
    backgroundColor: '#00BCD4',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  // image: {
  //   height: '25%',
  //   width: '25%',
  // },
});

export default Home;
