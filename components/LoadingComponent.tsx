import CustomImage from '@/components/CustomPrymitives/CustomImage'; // Twój komponent
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';

const LoadingComponent = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loopAnimation.start();

    return () => loopAnimation.stop();
  }, [rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <CustomImage
          source={require('../assets/images/icons/loading.png')}
          dimentions={{ width: 100, height: 100 }}
        />
      </Animated.View>
    </View>
  );
};

export default LoadingComponent;
