import { configureStore } from '@reduxjs/toolkit';

import wizardReducer from './wizardSlice';
import apiReducer from './apiSlice';
import clustersTableReducer from '../components/ClustersTable/clustersTableSlice';

const store = configureStore({
  reducer: {
    wizard: wizardReducer,
    apiMock: apiReducer,
    clustersTable: clustersTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
