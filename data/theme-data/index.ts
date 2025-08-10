import dark from './dark';
import green from './green';
import light from './light';

export const themes = { light, dark, green };

export type ThemeKey = keyof typeof dark;