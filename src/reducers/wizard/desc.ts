import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/appStore';

type DescState = {
  name: string;
  description: string;
};

const initialState: DescState = {
  name: '',
  description: '',
};

export const descSlice = createSlice({
  name: 'desc',
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

// actions
export const { updateName, updateDescription } = descSlice.actions;

// selectors
export const selectName = (state: RootState) => state.wizard.desc.name;
export const selectDesc = (state: RootState) => state.wizard.desc.description;
export const selectDescription = (state: RootState) => state.wizard.desc;

// reducer
export default descSlice.reducer;
