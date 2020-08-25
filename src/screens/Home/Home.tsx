import React from 'react';
import {Alert, Text} from 'react-native';
import useAsync from '../../utils/hooks/useAsync';
import {getCards} from '../../services/api/card';
import {AuthContext} from '../../AuthContext';
import Loading from '../Loading';
import FFCardsList from '../../components/FFCardsList';
import HeaderSwitch from '../../components/common/HeaderSwitch';
import BottomRightButton from '../../components/common/BottomRightButton';

const Home = () => {
  const [isListView, setIsListView] = React.useState(false);
  const {getIdToken} = React.useContext(AuthContext);
  const token = getIdToken();
  const state = useAsync(async () => {
    return await getCards({token: token!, params: {}});
  }, []);

  if (state.loading) {
    return <Loading />;
  }
  if (state.error) {
    return <Text>{JSON.stringify(state.error)}</Text>;
  }
  if (!state.value || (state.value && 'message' in state.value)) {
    return <Text>{JSON.stringify(state.value?.message)}</Text>;
  }

  const cards = state.value.data;

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
