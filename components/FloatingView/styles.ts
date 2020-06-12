import { StyleSheet } from 'react-native';

import { offWhite, black, borderRadius, opacity } from 'constants/styles';

export default StyleSheet.create({
  view: {
    backgroundColor: offWhite,
    opacity,
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padded: {
    padding: 10,
  },
});
