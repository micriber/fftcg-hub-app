import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  TextInput,
} from 'react-native';
import {useAsync} from 'react-async';
import {AuthContext} from '../AuthContext';
import Loading from './Loading';
import cards from '../../jest/mocks/fftcg';
import FastImage from 'react-native-fast-image';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Login: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const w = Dimensions.get('window');

const Home = () => {
  const {signOut, getCurrentUser} = React.useContext(AuthContext);

  const {data, isLoading} = useAsync({
    promiseFn: getCurrentUser,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    signOut();
    return null;
  }

  return (
    <View style={[styles.container]}>
      <TextInput
        blurOnSubmit
        autoCapitalize="none"
        placeholder={'Rechercher "1-001R"'}
        autoCorrect={false}
        style={{
          borderRadius: 25,
          borderColor: '#333',
          backgroundColor: '#fff',
          paddingLeft: 50,
        }}
        // textStyle={{color: '#000'}}
      />
      <View style={[styles.cardContainer]}>
        <FlatList
          initialNumToRender={2}
          numColumns={3}
          data={cards}
          keyExtractor={(item) => item.Code}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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
  // image: {
  //   height: '25%',
  //   width: '25%',
  // },
});

export default Home;
