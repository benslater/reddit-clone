import React from 'react';
import { Text, TextProps } from 'react-native';

import styles from './styles';

interface CustomTextProps extends TextProps {
  // TODO: Type this correctly
  children: any;
}

const CustomText = ({ children, style }: CustomTextProps) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default CustomText;
