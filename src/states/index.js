import { combineReducers } from 'redux';

import { reduce as BrandSelectReducer } from './BrandNumberState';

// Register your redux store under a unique namespace
export const namespace = 'outbound-dialer-brand';

// Combine the reducers
export default combineReducers({
  BrandSelector: BrandSelectReducer
});


