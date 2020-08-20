import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../AuthContext';
import ModalSelector from 'react-native-modal-selector';

const Settings = () => {
  const {signOut} = React.useContext(AuthContext);
  const [lang, setLang] = React.useState('Français');
  const [theme, setTheme] = React.useState('light');

  return (
    <View style={styles.containerMain}>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.sectionHeading}>Interface</Text>
      <View style={styles.section}>
        <View style={styles.itemSection}>
          <Text>Language</Text>
          <ModalSelector
            data={[
              {key: 'fr', label: 'Français'},
              {key: 'en', label: 'English'},
            ]}
            initValue="Français"
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option) => {
              setLang(option.label);
            }}>
            <Text>
              {lang} <AntIcon name="caretdown" size={10} />
            </Text>
          </ModalSelector>
        </View>
        <View style={styles.itemSection}>
          <Text>Theme</Text>
          <ModalSelector
            data={[
              {key: 'dark', label: 'Dark'},
              {key: 'light', label: 'Light'},
              {key: 'system', label: 'System'},
            ]}
            initValue="Français"
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            onChange={(option) => {
              setTheme(option.label);
            }}>
            <Text>
              {theme} <AntIcon name="caretdown" size={10} />
            </Text>
          </ModalSelector>
        </View>
      </View>
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
  },
  sectionHeading: {
    fontSize: 15,
    marginBottom: 5,
  },
  itemSection: {
    width: '100%',
    marginBottom: 5,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    borderColor: '#000',
  },
});

export default Settings;
