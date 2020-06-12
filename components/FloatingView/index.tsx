import React from 'react';
import { View, ViewProps, Animated } from 'react-native';

import styles from './styles';

interface FloatingViewProps extends ViewProps {
  children?: any;
  animated?: boolean;
  noPadding?: boolean;
}

const FloatingView = ({
  children,
  style,
  animated,
  noPadding = false,
  ...rest
}: FloatingViewProps) => {
  const Component = animated ? Animated.View : View;
  return (
    <Component
      style={[styles.view, !noPadding && styles.padded, style]}
      {...rest}>
      {children}
    </Component>
  );
};

export default FloatingView;
