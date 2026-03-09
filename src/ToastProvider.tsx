import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { ToastItem } from './ToastItem';
import type { ToastOptions } from './types';
import { setToastRef } from './ToastController'; 

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const addToast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => {
      if (options.preventDuplicates && prev.some(t => t.message === options.message)) {
        return prev;
      }
      return [...prev, { ...options, id }];
    });
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAll = useCallback(() => setToasts([]), []);

  useEffect(() => {
    setToastRef({ addToast, clearAll });
    return () => setToastRef(null);
  }, [addToast, clearAll]);

  return (
    <View style={{ flex: 1 }}>
      {children}
      <View style={styles.overlay} pointerEvents="box-none">
        {toasts.map(t => (
          <ToastItem key={t.id} {...t} onRemove={removeToast} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999999,
    elevation: 999999,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});