import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, StyleSheet, View, Easing, ColorValue, Text, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOAST_WIDTH = SCREEN_WIDTH * 0.9;

export type SprinkleStyle = 'default' | 'stars' | 'emojis' | 'minimal';

interface Props {
  style?: SprinkleStyle;
  customColor?: ColorValue;
  overflow?: boolean;
  duration?: number; 
}

export const Sprinkles: React.FC<Props> = ({ 
  style = 'default', 
  customColor, 
  overflow = false,
  duration = 1200 // Default duration 1.2 seconds
}) => {
  const particleCount = style === 'emojis' ? 10 : 20;
  const particles = Array.from({ length: particleCount });
  
  const animations = useRef<Animated.Value[]>(
    particles.map(() => new Animated.Value(0))
  ).current;

  const confettiColors = ['#FFD700', '#FF69B4', '#00FA9A', '#1E90FF', '#FF4500', '#9B59B6'];

  const particleMeta = useMemo(() => particles.map(() => ({
    emoji: ['🎉', '✨', '🔥', '💎', '🚀', '⭐', '🎈'][Math.floor(Math.random() * 7)],
    startX: (Math.random() - 0.5) * (TOAST_WIDTH * 0.85), 
    startY: (Math.random() - 0.5) * 30,
    moveX: (Math.random() - 0.5) * 60,
    moveY: overflow ? (Math.random() - 1) * 80 : (Math.random() - 0.5) * 40, 
    randomRotate: `${Math.random() * 360}deg`,
    // Delay 30% random between 0 and 30% of the total duration to create a more natural effect
    randomDelay: Math.random() * (duration * 0.3),
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)]
  })), [style, overflow, duration]);

  useEffect(() => {
    const anims = animations.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: duration + particleMeta[i].randomDelay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    );
    Animated.parallel(anims).start();
  }, [animations, duration]);

  const getParticleStyle = (index: number, anim: Animated.Value) => {
    const meta = particleMeta[index];
    const opacity = anim.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: [0, 1, 1, 0],
    });
    const translateX = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [meta.startX, meta.startX + meta.moveX],
    });
    const translateY = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [meta.startY, meta.startY + meta.moveY],
    });
    const scale = anim.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: [0.3, 1, 1, 0],
    });

    return {
      position: 'absolute' as const,
      opacity,
      transform: [{ translateX }, { translateY }, { scale }, { rotate: meta.randomRotate }],
    };
  };

  return (
    <View style={styles.container} pointerEvents="none">
       {particles.map((_, i) => {
         const anim = animations[i];
         const pStyle = getParticleStyle(i, anim);

         if (style === 'emojis') {
             return (
                 <Animated.View key={i} style={pStyle}>
                     <Text style={{ fontSize: 16 }}>{particleMeta[i].emoji}</Text>
                 </Animated.View>
             );
         }

         return (
           <Animated.View 
             key={i} 
             style={[
                pStyle, 
                { 
                    width: style === 'stars' ? 4 : 6, 
                    height: style === 'stars' ? 4 : 6, 
                    borderRadius: 3,
                    backgroundColor: customColor || (style === 'stars' ? '#FFF' : particleMeta[i].color),
                    shadowColor: style === 'stars' ? '#FFF' : 'transparent',
                    shadowRadius: 4, shadowOpacity: 0.8, elevation: 5
                }
             ]} 
           />
         );
       })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
});