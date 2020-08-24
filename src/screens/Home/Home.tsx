import React from 'react';
import {Alert, Text} from 'react-native';
import {useAsync} from 'react-async';
import {getCards} from '../../services/api/card';
import {AuthContext} from '../../AuthContext';
import Loading from '../Loading';
import FFCardsList from '../../components/FFCardsList';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import BottomRightButton from '../../components/common/BottomRightButton';

const Home = () => {
  const [isListView, setIsListView] = React.useState(false);
  const {getIdToken} = React.useContext(AuthContext);
  const idToken = getIdToken();
  const params = {
    token: idToken!,
    params: {},
  };
  // TODO: find a way to pass params type instead of AsyncOptions<T>
  // @ts-ignore
  const {data, error, isLoading} = useAsync(getCards, params);

  console.log({data, error, isLoading});

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Text>{error}</Text>;
  }
  if (!data || (data && 'message' in data)) {
    return <Text>{JSON.stringify(data?.message)}</Text>;
  }

  const cards = data.data;

  return (
    <>
      <HeaderSwitch
        leftIconName="appstore-o"
        rightIconName="bars"
        value={isListView}
        onValueChange={setIsListView}
      />
      <FFCardsList isListView={isListView} cards={cards} />
      <BottomRightButton
        iconName="search1"
        onPress={() => Alert.alert('Search button pressed')}
      />
    </>
  );
};

export default Home;
