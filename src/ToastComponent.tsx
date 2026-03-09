import React, { useEffect, useRef } from 'react';
import { 
  Animated, 
  Text, 
  StyleSheet, 
  Dimensions, 
  View, 
  TouchableOpacity, 
  useColorScheme,
  Platform 
} from 'react-native';
import type { ToastOptions, ToastType } from './types';

const { width } = Dimensions.get('window');

interface Props extends ToastOptions {
  onHide: () => void;
}

const ToastComponent: React.FC<Props> = ({ 
  message, type = 'simple', duration = 3000, backgroundColor, textColor, onHide 
}) => {
  const isDark = useColorScheme() === 'dark';
  const animatedValue = useRef(new Animated.Value(0)).current;
  const progressValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance Animation
    Animated.spring(animatedValue, {
      toValue: 1,
      tension: 40,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Progress Bar Animation
    Animated.timing(progressValue, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false, 
    }).start();

    const timer = setTimeout(() => {
      closeToast();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const closeToast = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onHide());
  };

  const getThemeColors = (t: ToastType) => {
    const colors = {
      success: '#2ecc71',
      error: '#e74c3c',
      info: '#3498db',
      warning: '#f1c40f',
      simple: isDark ? '#FFF' : '#333',
    };
    return colors[t];
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, Platform.OS === 'ios' ? 60 : 40],
  });

  const progressBarWidth = progressValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const bgColor = backgroundColor || getThemeColors(type);
  const txtColor = textColor || (type === 'simple' ? (isDark ? '#000' : '#FFF') : '#FFF');

  return (
    <Animated.View 
      style={[
        styles.container, 
        { transform: [{ translateY }], opacity: animatedValue, backgroundColor: bgColor }
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.text, { color: txtColor }]}>{message}</Text>
        <TouchableOpacity onPress={closeToast}>
          <Text style={[styles.closeIcon, { color: txtColor }]}>✕</Text>
        </TouchableOpacity>
      </View>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width: progressBarWidth, backgroundColor: txtColor, opacity: 0.4 }]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden', // Progress bar ke liye zaroori
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    zIndex: 99999,
  },
  content: { flexDirection: 'row', padding: 12, alignItems: 'center', justifyContent: 'space-between' },
  text: { fontSize: 14, fontWeight: '600', flex: 1 },
  closeIcon: { fontSize: 18, marginLeft: 10, fontWeight: 'bold' },
  progressContainer: { height: 3, width: '100%', backgroundColor: 'rgba(0,0,0,0.05)' },
  progressBar: { height: '100%' }
});

export default ToastComponent;