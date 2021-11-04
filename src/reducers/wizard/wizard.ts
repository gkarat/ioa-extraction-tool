import { combineReducers } from 'redux';

import descReducer from './desc';
import paramsReducer from './params';
import sampleReducer from './sample';
import queryReducer from './query';

export default combineReducers({
  params: paramsReducer,
  sample: sampleReducer,
  query: queryReducer,
  desc: descReducer,
});
