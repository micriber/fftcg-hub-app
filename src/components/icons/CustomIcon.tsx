import React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';

type Props = {
  size?: {width: number; height: number};
  inactiveColor?: 'gray';
  src: ImageSourcePropType;
};

const CustomIcon = ({inactiveColor, src, size}: Props) => {
  const stylesExtended = {
    ...(inactiveColor ? {tintColor: inactiveColor} : {}),
  };

  return <Image style={[styles.image, size, stylesExtended]} source={src} />;
};

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
  },
});

export default CustomIcon;
