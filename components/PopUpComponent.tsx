import globalStyles from '@/app/Styles/global-styles';
import { usePopup } from '@/contexts/PopUpContext';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { ReactNode, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './CustomButton';

type PopUpProps = {
    title: string;
    content: string;
    handleConfirm?: ((decision: boolean) => void) | null;
    children?: ReactNode;
};

const PopUpComponent: React.FC<PopUpProps> = ({ title, content, handleConfirm, children }) => {
  const {textData, themeData} = useContext(UserPrefsContext);
  const {hidePopup} = usePopup();

  return (
    <View style={styles.overlay}>
      <View style={[styles.background,{backgroundColor: themeData.popupoverlay}]} />
      <View style={[styles.container,{backgroundColor: themeData.bc2,}]}>
        <Text style={[globalStyles.textXXL, styles.header,{color: themeData.text1,}]}>{title}</Text>
        <Text style={[globalStyles.textXL, styles.text,{color: themeData.text1,}]}>{content}</Text>
        {children}
        {handleConfirm ? (
          <View style={styles.buttonsRow}>
            <CustomButton style={{ backgroundColor: themeData.error }} text={textData.popupDefault.buttonNotConfirm} handlePress={() => handleConfirm(false)}/>
            <CustomButton style={{ backgroundColor: themeData.succes }} text={textData.popupDefault.buttonConfirm} handlePress={() => handleConfirm(true)}/>
          </View>
        ) : (
          <CustomButton style={{ backgroundColor: themeData.secondary }} text={textData.popupDefault.buttonInfo} handlePress={hidePopup}/>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // duży priorytet
        elevation: 9999, // Android
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        padding: 20,
        width: '80%',
        borderRadius: 20,
        elevation: 10,
        zIndex: 10000,
    },
    header: {
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10,
    },
});

export default PopUpComponent;
