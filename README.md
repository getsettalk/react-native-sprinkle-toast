<img width="1408" height="768" alt="Gemini_Generated_Image_tj47zbtj47zbtj47" src="https://github.com/user-attachments/assets/401cb34d-bd50-48f7-91f2-cd60e033f378" />


# react-native-sprinkle-toast

Premium, ultra-slim, and highly customizable animated pill toast for React Native. This library features interactive animations, beautiful particle effects, and a modern aesthetic inspired by contemporary mobile UI trends.



## Features

- **Sprinkle Effects**: Beautiful particle and star animations for success notifications.
- **Modern Design**: Slim, pill-shaped design optimized for floating UI.
- **Fully Customizable**: Control colors, durations, positioning, and progress bar visibility.
- **High Performance**: Optimized using the React Native Animated API with native driver support.
- **TypeScript Support**: Full type definitions for a seamless developer experience.
- **Compact Layout**: Minimal height and smart padding for a non-intrusive user interface.

## Installation

```bash
npm install react-native-sprinkle-toast
# or
yarn add react-native-sprinkle-toast
```

# Quick Setup
Wrap your root component with the ToastProvider:

```jsx
import { ToastProvider } from 'react-native-sprinkle-toast';

export default function App() {
  return (
    <ToastProvider>
      <Navigation />
    </ToastProvider>
  );
}
```

# Usage
Import the Toast controller anywhere in your application:

```jsx
import { Toast } from 'react-native-sprinkle-toast';

// Simple Toast
Toast.show({ message: "Operation successful" });

// Success Toast with Particles
Toast.show({
  message: "Payment Received",
  type: 'success',
  showSprinkles: true,
  sprinkleStyle: 'stars',
  sprinkleOverflow: true,
  sprinkleDuration: 2000,
  position: 'top',
});

// Error Toast with Bottom Position
Toast.show({
  message: "Connection failed",
  type: 'error',
  showProgress: false,
  position: 'bottom',
});
```

# Properties (ToastOptions)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| message | string | Required | The text message to be displayed. |
| type | ToastType | 'simple' | Options: 'success', 'error', 'info', 'warning', 'simple'. |
| duration | number | 3000 | Visibility duration in milliseconds. |
| position | string | 'top' | Options: 'top', 'bottom', 'center'. |
| showProgress | boolean | true | Determines if the animated progress bar is visible. |
| showSprinkles | boolean | false | Enables particle effects (primarily for success type). |
| sprinkleStyle | string | 'default' | Options: 'default', 'stars', 'emojis', 'minimal'. |
| sprinkleOverflow | boolean | false | Allows particles to fly beyond the toast boundaries. |
| sprinkleDuration | number | 1200 | Duration of the particle animation. |
| backgroundColor | string | - | Custom hex or RGB background color. |
| textColor | string | - | Custom color for message text and icons. |

# Contributing
Contributions are welcome. Please feel free to open an issue or submit a pull request on the repository.

## License
MIT License. See the LICENSE file for more details.
