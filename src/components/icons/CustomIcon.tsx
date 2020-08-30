import React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';

type Props = {
  size?: {width: number; height: number};
  inactiveColor?: 'gray';
  circle: boolean;
  src: ImageSourcePropType;
};

const CustomIcon = ({circle, inactiveColor, src, size}: Props) => {
  const defaultWidth = 20;
  const defaultHeight = 20;
  const styles = StyleSheet.create({
    image: {
      width: size ? size.width : defaultWidth,
      height: size ? size.height : defaultHeight,
    },
    circle: {
      borderRadius: (size ? size.width : defaultWidth) / 2,
      borderWidth: 100,
      borderColor: '#333',
    },
  });

  const stylesExtended = {
    ...(inactiveColor ? {tintColor: inactiveColor} : {}),
    ...(circle ? styles.circle : {}),
  };

  return <Image style={[styles.image, stylesExtended]} source={src} />;
};

export default CustomIcon;
