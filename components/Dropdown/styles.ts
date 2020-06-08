import { StyleSheet } from 'react-native';

import { offWhite } from 'constants/styles';

export default StyleSheet.create({
  container: {
    // position: 'relative',
  },
  text: { fontSize: 24, textAlign: 'center' },
  list: {},
  visibleList: {
    backgroundColor: offWhite,
    ...StyleSheet.absoluteFillObject,
  },
  hiddenList: {
    display: 'none',
  },
});
