import { combineReducers } from 'redux';

import books from './books';
import genres from './genres';

const rootReducer = combineReducers({
  books,
  genres
});

export default rootReducer;
