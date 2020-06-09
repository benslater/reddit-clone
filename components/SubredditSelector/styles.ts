import { StyleSheet, Dimensions } from 'react-native';

import { offWhite, black, grey } from 'constants/styles';

const { height: deviceHeight } = Dimensions.get('screen');

export default StyleSheet.create({
  dropdownArrow: {
    position: 'absolute',
    top: -25,
    right: 10,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: offWhite,
  },
  subredditList: {
    position: 'absolute',
    top: 90,
    right: 20,
  },
  visibleList: {
    maxHeight: deviceHeight / 2,
  },
  hiddenList: {
    display: 'none',
    opacity: 0,
  },
  innerList: { width: '100%' },
  textContainer: { paddingVertical: 10 },
  separator: { height: 1, backgroundColor: black },
  highlighted: { backgroundColor: grey },
});
