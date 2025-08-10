import dark from './dark';
import light from './light';

export const themes = { light, dark };

export type ThemeKey = keyof typeof dark;