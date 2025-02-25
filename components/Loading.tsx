import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('window');

interface LoadingProps {
  isVisible?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isVisible = true }) => {
  if (!isVisible) return null; // If not visible, render nothing

  return (
    <View style={styles.container}>
      <LottieView 
        source={require('../assets/lotties/loading.json')} 
        autoPlay 
        loop 
        style={styles.lottie} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(173, 216, 230, 0.7)', // Light blue with low opacity
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  lottie: {
    width: width * 0.6,
    height: height * 0.3,
  },
});

export default Loading;
