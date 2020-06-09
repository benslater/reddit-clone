import React from 'react';
import { View, ViewProps, Animated } from 'react-native';

import styles from './styles';

interface FloatingViewProps extends ViewProps {
  children?: any;
  animated?: boolean;
}

const FloatingView = ({
  children,
  style,
  animated,
  ...rest
}: FloatingViewProps) => {
  const Component = animated ? Animated.View : View;
  return (
    <Component style={[styles.view, style]} {...rest}>
      {children}
    </Component>
  );
};

export default FloatingView;
