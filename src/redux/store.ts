import { configureStore } from '@reduxjs/toolkit';

import wizardReducer from './wizardSlice';
import apiReducer from './apiSlice';

const store = configureStore({
  reducer: {
    wizard: wizardReducer,
    api: apiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
