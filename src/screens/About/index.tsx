import * as React from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import Header, {HeaderDrawerAction} from '../../components/common/Header';
import {DrawerNavigationProp} from '@react-navigation/drawer/src/types';
import {ParamListBase} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '8%',
    marginVertical: '10%',
  },
  text: {
    fontSize: 16,
    marginBottom: '10%',
    textAlign: 'justify',
  },
});

const About = ({
  navigation,
}: {
  navigation: DrawerNavigationProp<ParamListBase>;
}) => {
  return (
    <>
      <Header
        title={'À propos'}
        left={<HeaderDrawerAction navigation={navigation} />}
      />
      <View style={styles.container}>
        <Text style={styles.text}>
          Fantasy Card Collection est une application non officielle et gratuite créée par des
          fans et n'est en aucun cas affiliée, approuvée ou soutenue par Square
          Enix.
        </Text>
        <Text style={styles.text}>
          Certaines images utilisées dans l'application sont protégées par le
          droit d'auteur et sont prises en charge dans le cadre d'une
          utilisation raisonnable.
        </Text>
        <Text style={styles.text}>
          Les noms de personnages Final Fantasy et Final Fantasy sont des
          marques déposées de Square Enix.
        </Text>
        <Text style={styles.text}>
          Aucune violation du droit d'auteur n'est envisagée.
        </Text>
      </View>
    </>
  );
};

export default About;
