import { createTheme } from './utils';

export interface _ThemeMeta {
  _id: string;
}

export interface Theme {
  meta: _ThemeMeta;
  colors: {
    primary: string;
    secondary: string;
  };
  wallpaper: string;
}

const a: Theme = {
  meta: {
    _id: 'a',
  },
  colors: {
    primary: 'red',
    secondary: 'blue',
  },
  wallpaper: 'assets/bg.png',
};

const b = createTheme(
  {
    primary: 'red',
    secondary: 'blue',
  },
  'assets/bg1.jpg',
);

const c = createTheme(
  {
    primary: 'red',
    secondary: 'blue',
  },
  'assets/bg3.png',
);

const d = createTheme(
  {
    primary: 'red',
    secondary: 'blue',
  },
  'assets/bg4.png',
);

const e = createTheme(
  {
    primary: 'red',
    secondary: 'blue',
  },
  'assets/bg5.png',
);

const f = createTheme(
  {
    primary: 'red',
    secondary: 'blue',
  },
  'assets/bg6.png',
);

const g = createTheme(
  {
    primary: 'red',
    secondary: 'blue',
  },
  'assets/bg7.png',
);

export const Themes = [a, b, c, d, e, f, g];
