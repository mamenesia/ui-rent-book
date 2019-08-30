import {
  combineReducers
} from 'redux';

import books from './books';
import genres from './genres';
import user from './user';
import history from './history';

const rootReducer = combineReducers({
  books,
  genres,
  user,
  history
});

export default rootReducer;