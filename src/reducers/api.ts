// tentative, without RTK and real server usage
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { ClusterParameters, Item } from './wizard';

import totalResponse from '../../server/total';
import clustersResponse from '../../server/clusters';

interface ApiSliceState {
  wizard: {
    options: ClusterParameters;
    total: number;
    clusters: Array<ClusterParameters>;
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
    total: totalResponse.total,
    clusters: clustersResponse.clusters,
  },
};

export const apiSlice = createSlice({
  name: 'apiMock',
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

// actions
export const { updateOptions, updateOptionsComponent } = apiSlice.actions;

// selectors
export const selectOptions = (state: RootState): ClusterParameters =>
  state.apiMock.wizard.options;
export const selectOptionsComponent =
  (component: string) =>
  (state: RootState): Array<Item> =>
    state.apiMock.wizard.options[component];
export const selectTotal = (state: RootState): number =>
  state.apiMock.wizard.total;
export const selectCluters = (state: RootState): Array<ClusterParameters> =>
  state.apiMock.wizard.clusters;

// reducer
export default apiSlice.reducer;
