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
type Managed = 'all' | 'non-managed' | 'managed';

export {
  Version,
  ClusterPlatform,
  CustomerSuccessAssociate,
  Ebs,
  AccountName,
  NetworkType,
  InstallType,
  LastCheckIn,
  Managed,
};

type Description = React.ReactNode;

export type Item<T> =
  | {
      value: T;
      description: Description;
    }
  | T;

export type ClusterParameters = {
  uuid: string;
  version: Array<Item<Version>>;
  desiredVersion: Array<Item<Version>>;
  initialVersion: Array<Item<Version>>;
  platform: Array<Item<ClusterPlatform>>;
  managed: Managed;
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
  isRequired: boolean;
};

interface WizardState {
  params: ClusterParameters;
  // multiselect forms
  multiselectForms: Array<Form>;
  radioForms: Array<Form>;
  current: number;
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
  multiselectForms: [
    { title: 'Version', component: 'version', isRequired: true },
    { title: 'Desired version', component: 'desiredVersion' },
    { title: 'Initial version', component: 'initialVersion' },
    { title: 'Platform', component: 'platform' },
    { title: 'Customer success associate', component: 'associate' },
    { title: 'EBS', component: 'ebs' },
    { title: 'Account', component: 'account' },
    { title: 'Network type', component: 'network' },
    { title: 'Install type', component: 'install' },
  ],
  radioForms: [
    { title: 'Managed by Red Hat', component: 'managed' },
    { title: 'Last check in', component: 'lastCheckIn' },
  ],
  current: 1,
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
    updateCurrent: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
  },
});

// actions
export const {
  updateParams,
  updateParamsComponent,
  resetWizard,
  updateCurrent,
} = wizardSlice.actions;

// selectors
export const selectParams = (state: RootState): ClusterParameters =>
  state.wizard.params;
export const selectSubmitted = (state: RootState): boolean =>
  state.wizard.submitted;
export const selectParamsComponent =
  (component: string) =>
  (state: RootState): Array<Item> =>
    state.wizard.params[component];
export const selectMultiselectForms = (state: RootState): Array<Form> =>
  state.wizard.multiselectForms;
export const selectRadioForms = (state: RootState): Array<Form> =>
  state.wizard.radioForms;
export const selectCurrent = (state: RootState): number => state.wizard.current;

// reducer
export default wizardSlice.reducer;
