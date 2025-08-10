import { UserPrefsContext } from '@/contexts/UserPrefsContext';
import { Picker } from '@react-native-picker/picker';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type ThemeDropDownProps = {
    elements: {name: string, value: string}[];
    defaultValue: string;
    callBack: (value: string) => void;
}

const ThemedDropdown: React.FC<ThemeDropDownProps> = ({elements, callBack, defaultValue}) => {
  const { themeData } = useContext(UserPrefsContext);
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleCallBack = (elementValue: string) => {
    setSelectedValue(elementValue);
    callBack(elementValue);
  }

  return (
    <View style={[
      styles.container,
      {
        borderColor: themeData.secondary,
        backgroundColor: themeData.bc2
      }
    ]}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => handleCallBack(itemValue)}
        style={[styles.picker, { color: themeData.text1 }]}
        dropdownIconColor={themeData.text1} // Android
        itemStyle={{ color: themeData.text1 }} // iOS
      >
        {elements.map((element) =>
            <Picker.Item key={element.name} label={element.name} value={element.value} />
        )}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderWidth: 1,
    borderRadius: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default ThemedDropdown;
