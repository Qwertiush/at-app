import { StyleSheet } from 'react-native';

export const colors = {
  bc: '#ada',
  bc2: '#2e3a1f',
  base: '#6b8e23',
  secondary: '#d4a017',
  text1: '#333333',
  text2: '#5a5a5a',
  text3: '#c9e2d3ff',
  highlight: '#e0e0e0',
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
    backgroundColor: colors.bc,
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
