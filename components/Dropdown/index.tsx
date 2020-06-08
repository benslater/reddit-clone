import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import FloatingView from 'components/FloatingView';
import Text from 'components/Text';

import styles from './styles';

interface DropdownProps extends TouchableOpacityProps {}

// TODO: This is pointless. Delete.
const Dropdown = ({ onPress }: DropdownProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FloatingView>
        <Text style={styles.text}>/r/</Text>
      </FloatingView>
    </TouchableOpacity>
  );
};

export default Dropdown;
