import { createStore } from '@stencil/store';

type ThemeStoreObject = {
  themeID: number[];
  currentTheme: number[];
};

const { state, onChange } = createStore<ThemeStoreObject>({
  themeID: [-1],
  currentTheme: [-1],
});

export { state as ThemeStore, onChange as onThemeChange };
