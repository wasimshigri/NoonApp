import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import colors from './colors';

export interface MyTheme extends Theme {
  colors: Theme['colors'] & {
    secondary: string; 
  },
  textSizes: {
    small: number;
    medium: number;
    large: number;
    xLarge: number;
    xxLarge: number;
  };
}

export const MyLightTheme: MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors
  },
  textSizes: {
    small: 12,
    medium: 14,
    large: 16,
    xLarge: 18,
    xxLarge: 22
  }
};
