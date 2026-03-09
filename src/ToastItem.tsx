import React, { useEffect, useRef } from 'react';
import { 
  Animated, 
  Text, 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Dimensions, 
  Platform, 
  ViewStyle, 
  useColorScheme 
} from 'react-native';
import { ToastOptions, ToastType } from './types';
import { Sprinkles } from './Sprinkles';

const { width } = Dimensions.get('window');

export const ToastItem: React.FC<ToastOptions & { onRemove: (id: string) => void }> = (props) => {
  const { 
    id, 
    message, 
    type = 'simple', 
    duration = 3000, 
    position = 'top',
    showProgress = true, 
    showCloseButton = true, 
    backgroundColor, 
    textColor, 
    progressBarColor, 
    onRemove, 
    showSprinkles, 
    sprinkleStyle,
    sprinkleOverflow = false ,
    sprinkleDuration = 1200 
  } = props;

  const isDark = useColorScheme() === 'dark';
  const opacity = useRef(new Animated.Value(0)).current;
  const transAnim = useRef(new Animated.Value(position === 'top' ? -50 : 50)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance Animation (Fade + Slide)
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(transAnim, { toValue: 0, friction: 8, useNativeDriver: true })
    ]).start();

    // Progress Bar Animation
    if (showProgress) {
      Animated.timing(progressWidth, { 
        toValue: 1, 
        duration: duration, 
        useNativeDriver: false 
      }).start();
    }

    // Auto-hide timer
    const timer = setTimeout(() => hide(), duration);
    return () => clearTimeout(timer);
  }, []);

  const hide = () => {
    Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => onRemove(id!));
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

  const getPositionStyle = (): ViewStyle => {
    switch (position) {
      case 'top': return { top: Platform.OS === 'android' ? 50 : 60 };
      case 'bottom': return { bottom: 60 };
      case 'center': return { top: '45%' as any };
      default: return { top: 40 };
    }
  };

  const finalBgColor = backgroundColor || getThemeColors(type);
  const finalTextColor = textColor || (type === 'simple' ? (isDark ? '#000' : '#FFF') : '#FFF');

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <Animated.View 
        style={[
          styles.card, 
          getPositionStyle(),
          { 
            opacity, 
            transform: [{ translateY: transAnim }], 
            backgroundColor: finalBgColor,
            // Overflow 'visible' allow us to sprinkles out of the toast bounds, otherwise they get clipped
            overflow: sprinkleOverflow ? 'visible' : 'hidden' 
          }
        ]}
      >
        {/* Sprinkles Container - Renders behind or over the text based on Z-index */}
        {type === 'success' && showSprinkles && (
          <Sprinkles 
            style={sprinkleStyle} 
            customColor={textColor} 
            overflow={sprinkleOverflow} 
            duration={sprinkleDuration}
          />
        )}

        <View style={styles.row}>
          <Text style={[styles.msg, { color: finalTextColor }]}>{message}</Text>
          {showCloseButton && (
            <TouchableOpacity onPress={hide} style={styles.closeArea}>
              <Text style={{color: finalTextColor, fontSize: 18, fontWeight: 'bold'}}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Smart Progress Bar */}
        {showProgress && (
          <View style={styles.progContainer}>
            <View style={styles.progBg}>
              <Animated.View 
                style={[
                  styles.progBar, 
                  { 
                    width: progressWidth.interpolate({ 
                        inputRange: [0, 1], 
                        outputRange: ['0%', '100%'] 
                    }), 
                    backgroundColor: progressBarColor || finalTextColor,
                  }
                ]} 
              />
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { 
    ...StyleSheet.absoluteFillObject, 
    zIndex: 9999999, 
    elevation: 10 
  },
  card: { 
    position: 'absolute', 
    width: width * 0.9, 
    alignSelf: 'center', 
    borderRadius: 12, 
    elevation: 10, 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 10, 
    shadowOffset: { width: 0, height: 4 },
    zIndex: 10,
  },
  row: { 
    flexDirection: 'row', 
    padding: 10, 
    paddingBottom: 16, // Extra padding for progress bar space
    alignItems: 'center' 
  },
  msg: { 
    flex: 1, 
    fontWeight: '600', 
    fontSize: 14 
  },
  closeArea: { 
    paddingLeft: 10 
  },
  progContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    // Card ki radius se matching clipping
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden', 
  },
  progBg: { 
    height: '100%', 
    backgroundColor: 'rgba(0,0,0,0.1)' 
  },
  progBar: { 
    height: '100%', 
    opacity: 0.7 
  }
});