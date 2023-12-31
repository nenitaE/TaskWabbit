import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import taskTypesReducer from './taskTypes';
import taskersReducer from './taskers';
import tasks from './tasks';
import taskerProfileReducer from './taskerProfile';
import reviewReducer from './reviews';

const rootReducer = combineReducers({
  session,
  reviewReducer,
  tasks,
  taskerProfile: taskerProfileReducer,
  taskTypes: taskTypesReducer,
  taskers: taskersReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
