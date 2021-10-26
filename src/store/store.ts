import { configureStore } from '@reduxjs/toolkit';

import wizardReducer from '../reducers/wizard/wizard';
import apiReducer from '../reducers/api';

const store = configureStore({
  reducer: {
    wizard: wizardReducer,
    apiMock: apiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
