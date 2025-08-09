import globalStyles, { colors } from '@/app/Styles/global-styles';
import { usePopup } from '@/contexts/PopUpContext';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from './CustomButton';

type PopUpProps = {
    title: string;
    content: string;
    handleConfirm?: ((decision: boolean) => void) | null;
};

const PopUpComponent: React.FC<PopUpProps> = ({ title, content, handleConfirm }) => {
  const {textData} = useContext(UserPrefsContext);
  const {hidePopup} = usePopup();

  return (
    <View style={styles.overlay}>
      <View style={styles.background} />
      <View style={styles.container}>
        <Text style={[globalStyles.textXXL, styles.header]}>{title}</Text>
        <Text style={[globalStyles.textXL, styles.text]}>{content}</Text>
        {handleConfirm ? (
          <View style={styles.buttonsRow}>
            <CustomButton style={{ backgroundColor: colors.error }} text={textData.popupDefault.buttonNotConfirm} handlePress={() => handleConfirm(false)}/>
            <CustomButton style={{ backgroundColor: colors.succes }} text={textData.popupDefault.buttonConfirm} handlePress={() => handleConfirm(true)}/>
          </View>
        ) : (
          <CustomButton style={{ backgroundColor: colors.succes }} text={textData.popupDefault.buttonInfo} handlePress={hidePopup}/>
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
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        backgroundColor: colors.secondary,
        padding: 20,
        width: '80%',
        borderRadius: 20,
        elevation: 10,
        zIndex: 10000,
    },
    header: {
        textAlign: 'center',
        color: colors.text3,
        marginBottom: 10,
    },
    text: {
        textAlign: 'center',
        color: colors.text3,
        marginBottom: 20,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10,
    },
});

export default PopUpComponent;
