import React from 'react';
import {Alert, Text} from 'react-native';
import {useAsync} from 'react-async-hook';
import {getCards, UnauthorizedError} from '../../services/api/card';
import {AuthContext} from '../../AuthContext';
import Loading from '../Loading';
import FFCardsList from '../../components/FFCardsList';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import BottomRightButton from '../../components/common/BottomRightButton';

const Home = () => {
  const [isListView, setIsListView] = React.useState(false);
  const {getIdToken} = React.useContext(AuthContext);
  const token = getIdToken();
  const {result, error, loading} = useAsync(getCards, [token!]);

  console.log({result, error, loading});

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Text>{error}</Text>;
  }
  if (!result || (result && 'message' in result)) {
    return <Text>{JSON.stringify((result as UnauthorizedError).message)}</Text>;
  }

  const cards = result.cards;

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
