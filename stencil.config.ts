import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'pin-panel',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
    { copy: 'assets'},
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
