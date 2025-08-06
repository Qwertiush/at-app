import globalStyles, { colors } from "@/app/Styles/global-styles";
import { Image, ImageSourcePropType, Text, View } from "react-native";

type TabsIconProps = {
  icon: ImageSourcePropType
  name?: string,
  focused?: boolean,
}

const TabsIcon: React.FC<TabsIconProps> = ({ icon, name, focused }) => {
  return (
    <View style={{ 
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100%',
      paddingTop: 8,
    }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={focused ? { width: 30, height: 30 } : { width: 24, height: 24 }}
        tintColor={focused ? colors.secondary : colors.text2}
      />
      <Text style={focused ?[globalStyles.textXS, { marginTop: 2, color: colors.secondary }]:[globalStyles.textS, { marginTop: 2, color: colors.text2, width: 50,textAlign: 'center' }]}>{name}</Text>
    </View>
  );
};

export default TabsIcon;