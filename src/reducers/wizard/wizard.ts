import { combineReducers } from 'redux';

import { paramsSlice } from './params';
import { sampleSlice } from './sample';

export default combineReducers({
  params: paramsSlice.reducer,
  sample: sampleSlice.reducer,
});
