import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

type Version = string;
type ClusterPlatform = string;
type CustomerSuccessAssociate = string;
type Ebs = number;
type AccountName = string;
type NetworkType = string;
type InstallType = string;
type LastCheckIn = Date;

type Description = React.ReactNode;

export type Item<T> =
  | {
      value: T;
      description: Description;
    }
  | T;

export type ClusterParameters = {
  version: Array<Item<Version>>;
  desiredVersion: Array<Item<Version>>;
  initialVersion: Array<Item<Version>>;
  platform: Array<Item<ClusterPlatform>>;
  managed: string;
  associate: Array<Item<CustomerSuccessAssociate>>;
  ebs: Array<Item<Ebs>>;
  account: Array<Item<AccountName>>;
  network: Array<Item<NetworkType>>;
  install: Array<Item<InstallType>>;
  lastCheckIn: LastCheckIn;
};

export type Form = {
  title: string;
  component: string;
};

interface WizardState {
  params: ClusterParameters;
  // multiselect forms
  forms: Array<Form>;
  submitted: boolean;
}

const initialState: WizardState = {
  params: {
    version: [],
    desiredVersion: [],
    initialVersion: [],
    platform: [],
    managed: 'all',
    associate: [],
    ebs: [],
    account: [],
    network: [],
    install: [],
    lastCheckIn: 'all',
  },
  forms: [
    { title: 'Version', component: 'version' },
    { title: 'Desired version', component: 'desiredVersion' },
    { title: 'Initial version', component: 'initialVersion' },
    { title: 'Platform', component: 'platform' },
    { title: 'Customer success associate', component: 'associate' },
    { title: 'EBS', component: 'ebs' },
    { title: 'Account', component: 'account' },
    { title: 'Network type', component: 'network' },
    { title: 'Install type', component: 'install' },
  ],
  submitted: false,
};

export const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    updateParams: (state, action: PayloadAction<ClusterParameters>) => {
      Object.assign(state.params, action.payload);
    },
    updateParamsComponent: (
      state,
      action: PayloadAction<{ component: string; params: Array<Item> }>
    ) => {
      state.params[action.payload.component] = action.payload.params;
    },
    resetWizard: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateParams, updateParamsComponent, resetWizard } =
  wizardSlice.actions;
export const selectParams = (state: RootState): ClusterParameters =>
  state.wizard.params;
export const selectSubmitted = (state: RootState): boolean =>
  state.wizard.submitted;
export const selectParamsComponent =
  (component: string) =>
  (state: RootState): Array<Item> =>
    state.wizard.params[component];
export const selectForms = (state: RootState): Array<Form> =>
  state.wizard.forms;
export default wizardSlice.reducer;
