import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {AuthContext} from '../../AuthContext';
import Card from '../../components/common/Card';

const Settings = () => {
  const {signOut, getCurrentUser} = React.useContext(AuthContext);
  const [lang, setLang] = React.useState('Français');
  const [theme, setTheme] = React.useState('light');
  const user = getCurrentUser();

  return (
    <View style={styles.containerMain}>
      <Text style={styles.heading}>Settings</Text>
      <Text>Welcome {user?.firstName}</Text>
      <Text style={styles.sectionHeading}>Interface</Text>
      <Card theme="light" style={styles.section}>
        <View style={styles.itemSection}>
          <Text>Language</Text>
          <ModalSelector
            data={[
              {key: 'fr', label: 'Français'},
              {key: 'en', label: 'English'},
            ]}
            initValue={lang}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option) => {
              setLang(option.label);
            }}>
            {/*<Text>*/}
            {/*  {lang} <AntIcon name="caretdown" size={10} />*/}
            {/*</Text>*/}
          </ModalSelector>
        </View>
        <View style={styles.itemSection}>
          <Text>Theme</Text>
          <ModalSelector
            data={[
              {key: 'dark', label: 'Dark'},
              {key: 'light', label: 'Light'},
            ]}
            initValue={theme}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option) => {
              setTheme(option.label);
            }}>
            {/*<Text>*/}
            {/*  {theme} <AntIcon name="caretdown" size={10} />*/}
            {/*</Text>*/}
          </ModalSelector>
        </View>
      </Card>
      <View style={styles.bottomView}>
        <Button title="Logout" onPress={signOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 15,
    marginBottom: 5,
  },
  itemSection: {
    // width: '100%',
    // marginBottom: 5,
  },
  containerMain: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 5,
    marginRight: 5,
  },
  bottomView: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  section: {
    width: '100%',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
});

export default Settings;
