import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import cards from '../../../jest/mocks/fftcg';
import FastImage from 'react-native-fast-image';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {LightTheme} from '../../utils/theme';

const w = Dimensions.get('window');

const Home = () => {
  const [isListView, setIsListView] = React.useState(false);
  return (
    <>
      <View style={styles.header}>
        <AntIcon name="appstore-o" size={20} />
        <Switch value={isListView} onValueChange={setIsListView} />
        <AntIcon name="bars" size={22} />
      </View>
      <View style={[styles.container]}>
        {/*<TextInput*/}
        {/*  blurOnSubmit*/}
        {/*  autoCapitalize="none"*/}
        {/*  placeholder={'Rechercher "1-001R"'}*/}
        {/*  autoCorrect={false}*/}
        {/*  style={{*/}
        {/*    borderRadius: 25,*/}
        {/*    borderColor: '#333',*/}
        {/*    backgroundColor: '#fff',*/}
        {/*    paddingLeft: 50,*/}
        {/*  }}*/}
        {/*  // textStyle={{color: '#000'}}*/}
        {/*/>*/}
        <View style={[styles.cardContainer]}>
          <FlatList
            initialNumToRender={2}
            numColumns={3}
            data={cards}
            keyExtractor={(item) => item.Code}
            renderItem={({item}) => (
              <View style={styles.cardView}>
                <FastImage
                  // style={styles.image}
                  style={{width: w.width / 4, height: w.height / 4}}
                  source={{
                    uri: `https://fftcg.cdn.sewest.net/images/cards/thumbs/${item.Code}_fr.jpg`,
                  }}
                  resizeMode="contain"
                />
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
    backgroundColor: LightTheme.colors.primary,
  },
  container: {
    // marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  cardContainer: {
    // flex: 1,
    marginTop: 3,
    marginLeft: 15,
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'space-between',
  },
  cardView: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  bottomView: {
    width: '100%',
    height: 75,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 60,
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
  },
  // image: {
  //   height: '25%',
  //   width: '25%',
  // },
});

export default Home;
