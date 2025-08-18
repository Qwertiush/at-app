import { StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer:{
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    width: '100%'
  },
  contentContainerFL:{
    paddingTop: StatusBar.currentHeight,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
  },
  centeredV: { 
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    minWidth: '100%',
    paddingVertical: 20,
  },
  centerElement:{
    alignSelf: 'center',
  },
  textContainer:{
    padding: 10,
    borderRadius: 20
  }
});
