import React from 'react';
import { View, ViewProps } from 'react-native';

import styles from './styles';

interface FloatingViewProps extends ViewProps {
  children: any;
}

const FloatingView = ({ children, style, ...rest }: FloatingViewProps) => {
  return (
    <View style={[styles.view, style]} {...rest}>
      {children}
    </View>
  );
};

export default FloatingView;
