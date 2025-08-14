import { usePopup } from '@/contexts/PopUpContext';
import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import React, { ReactNode, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';
import CustomIconButton from './CustomIconButton';
import CustomImage from './CustomPrymitives/CustomImage';
import TextXL from './CustomPrymitives/Text/TextXL';
import TextXXL from './CustomPrymitives/Text/TextXXL';

type PopUpProps = {
    title: string;
    content: string;
    handleConfirm?: ((decision: boolean) => void) | null;
    children?: ReactNode;
    clear?: boolean;
};

const PopUpComponent: React.FC<PopUpProps> = ({ title, content, handleConfirm, children, clear }) => {
  const {textData, themeData} = useContext(UserPrefsContext);
  const {hidePopup} = usePopup();

  return (
    <View style={styles.overlay}>
      <View
        style={[styles.background, { backgroundColor: themeData.popupoverlay }]}
      />
      <View
        style={[
          styles.headerRow,
          { backgroundColor: themeData.secondary }
        ]}
      >
        <CustomImage
          source={require('@/assets/images/icons/logo.png')}
          dimentions={{ width: 50, height: 50 }}
        />
        <CustomIconButton
          style={[
            styles.closeButton,
            { backgroundColor: themeData.error }
          ]}
          iconSource={require('@/assets/images/icons/delete.png')}
          handlePress={hidePopup}
        />
      </View>
      <View
        style={[styles.container, { backgroundColor: themeData.bc2 }]}
      >
        {!clear && (
          <>
            <TextXXL
              style={[styles.headerText, { color: themeData.text1 }]}
            >
              {title}
            </TextXXL>
            <TextXL
              style={[styles.contentText, { color: themeData.text1 }]}
            >
              {content}
            </TextXL>
          </>
        )}
        {children}
        {handleConfirm && (
          <View style={styles.buttonsRow}>
            <CustomButton
              style={{ backgroundColor: themeData.error }}
              text={textData.popupDefault.buttonNotConfirm}
              handlePress={() => handleConfirm(false)}
            />
            <CustomButton
              style={{ backgroundColor: themeData.succes }}
              text={textData.popupDefault.buttonConfirm}
              handlePress={() => handleConfirm(true)}
            />
          </View>
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
    zIndex: 9999,
    elevation: 9999
  },
  background: {
    ...StyleSheet.absoluteFillObject
  },
  headerRow: {
    width: '80%',
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center'
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginBottom: 5
  },
  container: {
    paddingHorizontal: 20,
    width: '80%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    zIndex: 10000
  },
  headerText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  contentText: {
    textAlign: 'center',
    marginBottom: 20
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10
  }
});

export default PopUpComponent;
