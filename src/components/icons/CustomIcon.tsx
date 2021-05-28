import React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';

type Props = {
  size?: {width: number; height: number};
  circle: boolean;
  src: ImageSourcePropType;
};

const CustomIcon = ({circle, src, size}: Props) => {
  const defaultWidth = 16;
  const defaultHeight = 16;
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
    ...(circle ? styles.circle : {}),
  };

  return <Image style={[styles.image, stylesExtended]} source={src} />;
};

export default CustomIcon;
