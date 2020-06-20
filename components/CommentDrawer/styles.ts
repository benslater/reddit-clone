import { StyleSheet } from 'react-native';
import { offWhite, borderRadius } from 'constants/styles';

export default StyleSheet.create({
  commentDrawer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 200,
    opacity: 1,
    height: '90%',
    backgroundColor: offWhite,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  commentDrawerHeader: {
    padding: 20,
  },
  // TODO: Duplicate of icon style in root level styles. Extract to Icon component.
  icon: { height: 30, width: 30 },
});
