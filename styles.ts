import { StyleSheet, Dimensions } from 'react-native';
import { purple } from 'constants/styles';

const { width: deviceWidth } = Dimensions.get('screen');

export default StyleSheet.create({
  fullscreen: {
    flex: 1,
  },
  purpleBackground: {
    backgroundColor: purple,
  },
  contentContainer: { position: 'relative', width: deviceWidth },
  headerContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 0,
    paddingLeft: 20,
    zIndex: 100,
  },
  icon: { height: 30, width: 30 },
  titleContainer: {
    maxWidth: '50%',
    maxHeight: 100,
  },
  mainImage: { ...StyleSheet.absoluteFillObject },
  subredditDropdownText: { fontSize: 24, textAlign: 'center' },
});
