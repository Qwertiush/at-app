import { StatusBar, StyleSheet } from 'react-native';

export const colors = {
  bc: '#E9C579',
  bc2: '#EBE0D4',
  secondary: '#eb9239ff',
  text1: '#333333',
  text2: '#918686',
  text3: '#EBE0D4',
  highlight: '#eec055ff',
  succes: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
}

const baseText = {
  fontFamily: 'Helvetica',
  color:  colors.text1,
}
const baseTextSecondary = {
  ...baseText,
  color: colors.text2,
}

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
    backgroundColor: colors.bc2,
    padding: 10,
    borderRadius: 20
  },
  textXS: { 
    ...baseText,
    fontSize: 8
   },
  textS: { 
    ...baseText,
    fontSize: 12
   },
  textM: { 
    ...baseText,
    fontSize: 16
   },
  textXL: { 
    ...baseText,
    fontSize: 20
   },
   textXXL: { 
    ...baseText,
    fontSize: 30
   },
   input: {
    ...baseText,
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.text2,
    borderRadius: 5,
    width: '100%',
   }
});
