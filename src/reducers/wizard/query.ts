import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OutputQuery } from 'json-to-extraction-query/src/components/App';
import { RootState } from '../../store/appStore';

type QueryState = {
  path: string;
  columnPaths: string[];
  columnNames: string[];
};

const initialState: QueryState = {
  path: '',
  columnPaths: [],
  columnNames: [],
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    updateQuery: (state, action: PayloadAction<OutputQuery>) => {
      state.columnNames = action.payload.columnNames;
      state.columnPaths = action.payload.columnPaths;
      state.path = action.payload.path;
    },
  },
});

// actions
export const { updateQuery } = querySlice.actions;

// selectors
export const selectQuery = (state: RootState): OutputQuery =>
  state.wizard.query;

// reducer
export default querySlice.reducer;
