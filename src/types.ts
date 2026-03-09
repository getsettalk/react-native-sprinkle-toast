import type { SprinkleStyle } from './Sprinkles';
/**
 * Defines the status types for the toast, influencing its default color and iconography.
 */
export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'simple';

/**
 * Determines the vertical alignment of the toast on the screen.
 */
export type ToastPosition = 'top' | 'bottom' | 'center';

/**
 * Configuration options for the Animated Toast component.
 */
export interface ToastOptions {
  /** * Unique identifier for the toast instance (Internal use). 
   */
  id?: string;

  /** * The text message to be displayed within the toast. 
   */
  message: string;

  /** * The category of the toast. Affects color and behavior.
   * @default 'simple'
   */
  type?: ToastType;

  /** * Visibility duration in milliseconds before the toast auto-hides.
   * @default 3000
   */
  duration?: number;

  /** * The screen location where the toast will appear.
   * @default 'top'
   */
  position?: ToastPosition;

  /** * Whether to display an animated progress bar at the bottom of the toast.
   * @default true
   */
  showProgress?: boolean;

  /** * Whether to show a close icon ('X') for manual dismissal.
   * @default true
   */
  showCloseButton?: boolean;

  /** * Custom hex or RGB color for the animated progress bar. 
   */
  progressBarColor?: string;

  /** * Custom background color for the toast container. 
   */
  backgroundColor?: string;

  /** * Custom color for the message text and close button. 
   */
  textColor?: string;

  /** * Enables particle/confetti effects for success-type toasts.
   * @default false
   */
  showSprinkles?: boolean;

  /** * Visual style of the particles (e.g., stars, emojis).
   * @default 'default'
   */
  sprinkleStyle?: SprinkleStyle;

  /** * If true, particles will fly beyond the boundaries of the toast box.
   * @default false
   */
  sprinkleOverflow?: boolean;

  /** * Duration of the sprinkle animation in milliseconds.
   * @default 1200
   */
  sprinkleDuration?: number;

  /** * If true, prevents multiple toasts with the exact same message from stacking.
   * @default false
   */
  preventDuplicates?: boolean;

  /** * Callback function executed after the toast is fully dismissed. 
   */
  onClose?: () => void;
}