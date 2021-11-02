import { combineReducers } from 'redux';

import descReducer from './desc';
import paramsReducer from './params';
import sampleReducer from './sample';

export default combineReducers({
  params: paramsReducer,
  sample: sampleReducer,
  desc: descReducer,
});
