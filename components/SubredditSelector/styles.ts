import { StyleSheet, Dimensions } from 'react-native';

import { offWhite, black, grey, opacity } from 'constants/styles';

const { height: deviceHeight } = Dimensions.get('screen');

export default StyleSheet.create({
  subredditSelector: { alignItems: 'flex-end' },
  // TODO: Replace text with icon, remove fixed width, make icon component, fix width there
  subredditDropdownTextContainer: { height: 51, width: 51 },
  subredditDropdownText: { fontSize: 24, textAlign: 'center' },
  dropdownArrow: {
    marginRight: 10,
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
    opacity,
  },
  subredditList: {
    alignItems: 'flex-end',
  },
  visibleList: {
    maxHeight: deviceHeight / 3,
  },
  hiddenList: {
    display: 'none',
    opacity: 0,
  },
  outerList: {
    overflow: 'hidden',
  },
  innerList: { width: '100%' },
  textContainer: { padding: 10 },
  separator: { height: 1, backgroundColor: black },
  highlighted: { backgroundColor: grey },
});
