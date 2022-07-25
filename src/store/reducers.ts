import { combineReducers } from 'redux';

import { reducer as customSelect } from '../forms/Main/reducer';

export const reducer = combineReducers({
  customSelect,
});

export type reducerType = ReturnType<typeof reducer>;
export default reducer;
