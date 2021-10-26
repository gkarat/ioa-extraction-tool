import { SelectVariant } from '@patternfly/react-core';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

import {
  ClusterPlatform,
  CustomerSuccessAssociate,
  Ebs,
  Managed,
  Version,
} from './wizard';

export interface ClustersTableFilters {
  uuid: string;
  ebs?: Array<Ebs>;
  version?: Array<Version>;
  desiredVersion?: Array<Version>;
  managed: Managed;
  platform?: Array<ClusterPlatform>;
  associate?: Array<CustomerSuccessAssociate>;
  limit: number;
  offset: number;
}

export const FILTERS = {
  uuid: {
    name: 'UUID',
    type: SelectVariant.typeahead,
  },
  ebs: {
    name: 'EBS',
    type: SelectVariant.typeaheadMulti,
  },
  version: {
    name: 'Version',
    type: SelectVariant.typeaheadMulti,
  },
  desiredVersion: {
    name: 'Desired version',
    type: SelectVariant.typeaheadMulti,
  },
  managed: {
    name: 'Managed by Red Hat',
    type: SelectVariant.single,
    values: [
      { key: 'all', name: 'All' },
      { key: 'managed', name: 'True' },
      { key: 'non-managed', name: 'False' },
    ],
  },
  platform: {
    name: 'Platform',
    type: SelectVariant.typeaheadMulti,
  },
  associate: {
    name: 'Customer success associate',
    type: SelectVariant.typeaheadMulti,
  },
};

type ChosenRow = {
  uuid: string;
  rowIndex: number;
};

interface ClustersTableState {
  filters: ClustersTableFilters;
  activeToggle: string;
  selected?: ChosenRow;
}

const initialState: ClustersTableState = {
  filters: {
    uuid: '',
    managed: 'all',
    limit: 10,
    offset: 0,
  },
  activeToggle: 'uuid',
};

export const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<ClustersTableFilters>) => {
      Object.assign(state.filters, action.payload);
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    resetFilter: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (key === 'uuid') {
        state.filters['uuid'] = '';
      } else if (key === 'managed') {
        state.filters['managed'] = 'all';
      } else {
        const updated = {};
        Object.entries(state.filters).forEach(([k, v]) => {
          k !== key && (updated[k] = v);
        });
        state.filters = updated;
      }
    },
    chooseCluster: (state, action: PayloadAction<ChosenRow>) => {
      state.selected = action.payload;
    },
    resetSelectedCluster: (state) => {
      state.selected = undefined;
    },
    updateActiveToggle: (state, action: PayloadAction<string>) => {
      state.activeToggle = action.payload;
    },
  },
});

// actions
export const {
  updateFilters,
  resetFilters,
  resetFilter,
  chooseCluster,
  resetSelectedCluster,
  updateActiveToggle,
} = sampleSlice.actions;

// selectors
export const selectFilters = (state: RootState): ClustersTableFilters =>
  state.wizard.sample.filters;
export const selectSelected = (state: RootState): string =>
  state.wizard.sample.selected;
export const selectActiveToggle = (state: RootState): string =>
  state.wizard.sample.activeToggle;

// reducer
export default sampleSlice.reducer;
