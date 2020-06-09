import { StyleSheet } from 'react-native';

import { offWhite, black } from 'constants/styles';

export default StyleSheet.create({
  view: {
    backgroundColor: offWhite,
    opacity: 0.8,
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
