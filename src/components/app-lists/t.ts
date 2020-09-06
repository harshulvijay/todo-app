import { createStore } from '@stencil/store';

const { state,  } = createStore({
  apples: 7,
  oranges: 9,
});

state.oranges = 10;
