// tentative, without RTK and real server usage
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { ClusterParameters, Item } from './wizardSlice';

interface ApiSliceState {
  wizard: {
    options: ClusterParameters;
  };
}

const initialState: ApiSliceState = {
  wizard: {
    options: {
      version: ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6'],
      desiredVersion: ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6'],
      initialVersion: ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6'],
      platform: [],
      associate: [],
      ebs: [],
      account: [],
      network: [],
      install: [],
    },
  },
};

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    updateOptions: (state, action: PayloadAction<ClusterParameters>) => {
      Object.assign(state.wizard.options, action.payload);
    },
    updateOptionsComponent: (
      state,
      action: PayloadAction<{ component: string; options: Array<Item> }>
    ) => {
      state.wizard.options[action.payload.component] = action.payload.options;
    },
  },
});

export const { updateOptions, updateOptionsComponent } = apiSlice.actions;
export const selectOptions = (state: RootState): ClusterParameters =>
  state.api.wizard.options;
export const selectOptionsComponent =
  (component: string) =>
  (state: RootState): Array<Item> =>
    state.api.wizard.options[component];

export default apiSlice.reducer;
