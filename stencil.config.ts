import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { less } from '@stencil/less';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.scss',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: { swSrc: 'src/sw.js' },
      baseUrl: 'https://myapp.local/',
    },
  ],
  plugins: [sass(), /* less() */],
};
